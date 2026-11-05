import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { renderDocument } from './prerender.mjs';

// Check real route rendering without building or writing deploy artifacts.
const server = await createServer({ configFile: false, ssr: { noExternal: ['react-helmet-async'] }, server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
  const { SEO_PAGES } = await server.ssrLoadModule('/src/data/seo.js');
  const pages = new Map(INDEXABLE_PATHS.map(path => [path, renderPage(path)]));
  const titles = new Set();
  const descriptions = new Set();
  const template = fs.readFileSync('index.html', 'utf8');
  for (const [path, page] of pages) {
    const html = renderDocument(template, page);
    assert.equal((html.match(/<title\b/g) || []).length, 1, `One title: ${path}`);
    assert.equal((page.body.match(/<h1\b/g) || []).length, 1, `One H1: ${path}`);
    const title = page.head.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
    assert.ok(title && !titles.has(title), `Unique title: ${path}`);
    titles.add(title);
    const description = SEO_PAGES[path].description;
    assert.ok(description.length >= 90 && description.length <= 165, `Description length: ${path}`);
    assert.ok(!descriptions.has(description), `Unique description: ${path}`);
    descriptions.add(description);
    assert.equal((page.head.match(/name="description"/g) || []).length, 1);
    assert.equal((page.head.match(/rel="canonical"/g) || []).length, 1);
    const canonical = page.head.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, `https://livewoodstudio.com${path === '/' ? '' : path}`);
    assert.ok(!page.head.includes('name="keywords"'));
    const schemas = [...page.head.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
    const graph = schemas.flatMap(s => s['@graph'] || [s]);
    assert.equal(graph.filter(s => s['@type'] === 'LocalBusiness').length, 1);
    assert.ok(graph.some(s => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(s['@type'])));
    if (path.startsWith('/Gallery/')) assert.ok(graph.some(s => s['@type'] === 'CreativeWork'));
    const localIds = graph.map(s => s['@id']).filter(Boolean);
    assert.equal(new Set(localIds).size, localIds.length, `Unique schema IDs: ${path}`);
    for (const match of page.body.matchAll(/href="(\/[^"]*)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), 'https://livewoodstudio.com');
      if (url.pathname === '/sitemap.xml') continue;
      const target = pages.get(url.pathname);
      assert.ok(target, `Internal link ${url.pathname} from ${path}`);
      if (url.hash) assert.ok(target.body.includes(`id="${url.hash.slice(1)}"`), `Anchor ${url.hash} from ${path}`);
    }
    for (const match of page.body.matchAll(/src="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), 'https://livewoodstudio.com');
      const asset = url.pathname === '/.netlify/images' ? url.searchParams.get('url') : url.pathname;
      if (asset?.startsWith('/Assets/')) assert.ok(fs.existsSync(`public${asset}`), `Image ${asset}`);
    }
    console.log(`PASS ${path}`);
  }
  const faq = JSON.parse(renderPage('/').head.match(/<script[^>]*type="application\/ld\+json"[^>]*>(\{"@context":"https:\/\/schema.org","@type":"FAQPage".*?)<\/script>/s)[1]);
  for (const question of faq.mainEntity) assert.ok(pages.get('/').body.includes(question.name.replaceAll('&', '&amp;')), 'FAQ question is visible');
  const sitemapPaths = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
  assert.deepEqual([...sitemapPaths].sort(), [...INDEXABLE_PATHS].sort(), 'Sitemap matches indexable routes');
  const escapeText = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
  for (const question of faq.mainEntity) assert.ok(pages.get('/').body.includes(escapeText(question.acceptedAnswer.text)), 'FAQ answer is visible');
  const missing = renderPage('/does-not-exist');
  assert.ok(missing.head.includes('noindex'));
  assert.ok(!missing.head.includes('rel="canonical"'));
  assert.ok(fs.readFileSync('netlify.toml', 'utf8').includes('status = 404'));
  console.log(`PASS: ${pages.size} pages; unique metadata, H1s, JSON-LD, contextual links, image files and 404 configuration.`);
} finally {
  await server.close();
}
