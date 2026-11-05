import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { prerenderPages } from '../scripts/prerender.mjs';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
  const { serviceAreas, areaGroups, featuredAreaKeys, areaByKey, coverageNotice } = await server.ssrLoadModule('/src/data/service-areas.js');
  const { SEO_PAGES } = await server.ssrLoadModule('/src/data/seo.js');
  const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  assert.equal(serviceAreas.length, 18);
  assert.equal(new Set(serviceAreas.map(area => area.slug)).size, 18);
  assert.equal(new Set(areaGroups.flatMap(group => group.cities)).size, 18);
  assert.ok(areaGroups.every(group => group.cities.length === 6));
  const directory = renderPage('/service-areas');
  const home = renderPage('/').body;
  for (const area of serviceAreas) assert.ok(directory.body.includes(`href="${area.path}"`));
  for (const key of featuredAreaKeys) assert.ok(home.includes(`href="${areaByKey(key).path}"`));
  assert.ok(home.indexOf('id="home-areas-heading"') < home.indexOf('class="cta-band"'), 'Homepage area grid precedes final CTA');
  const uniqueCopy = new Set();
  const questions = new Set();
  for (const area of serviceAreas) {
    assert.match(area.path, /^\/service-areas\/[a-z-]+-tx$/);
    assert.ok(INDEXABLE_PATHS.includes(area.path));
    const { body, head } = renderPage(area.path);
    assert.ok(body.includes(escape(coverageNotice)), `${area.city}: coverage stays conditional`);
    const editorial = [area.lead, ...area.paragraphs, ...area.faqs.flat(), ...area.checklist, ...area.services.map(([, text]) => text)].join(' ');
    assert.ok(editorial.split(/\s+/).length >= 200, `${area.city}: substantive original content`);
    for (const paragraph of [area.lead, ...area.paragraphs]) {
      assert.ok(!uniqueCopy.has(paragraph), `${area.city}: original introduction and planning advice`);
      uniqueCopy.add(paragraph);
      assert.ok(body.includes(escape(paragraph)));
    }
    assert.equal((body.match(/<h1\b/g) || []).length, 1);
    assert.ok(body.includes('href="/ContactUs"'));
    assert.ok(body.includes('href="tel:+14698881330"'));
    assert.ok(body.includes('Project locations are not attributed to this city.'));
    for (const key of area.nearby) assert.ok(body.includes(`href="${areaByKey(key).path}"`));
    const schemas = [...head.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    const graph = schemas.flatMap(schema => schema['@graph'] || [schema]);
    const business = graph.find(node => node['@type'] === 'LocalBusiness');
    assert.equal(business.address.addressLocality, 'Dallas', 'No fabricated city office');
    assert.equal(business.telephone, '+14698881330');
    assert.ok(!('areaServed' in business), 'Proposed city coverage is not asserted in schema');
    assert.ok(graph.filter(node => node['@type'] === 'Service').every(node => !('areaServed' in node)));
    assert.ok(!graph.some(node => node.aggregateRating || node.review), 'No fabricated reviews');
    const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb.itemListElement.length, 3);
    assert.equal(breadcrumb.itemListElement[2].item, `https://livewoodstudio.com${area.path}`);
    const faq = graph.find(node => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 3);
    for (const entry of faq.mainEntity) {
      assert.ok(body.includes(escape(entry.name)) && body.includes(escape(entry.acceptedAnswer.text)), 'FAQ schema matches visible answers');
      assert.ok(!questions.has(entry.name), 'Each city has distinct FAQ questions');
      questions.add(entry.name);
    }
    assert.equal(SEO_PAGES[area.path].description, area.meta);
  }
  const missing = renderPage('/service-areas/not-a-city-tx');
  assert.ok(missing.head.includes('noindex'));
  assert.ok(!missing.head.includes('rel="canonical"'));

  // Exercise the real prerender plugin in memory: no build or deploy artifacts.
  await server.close();
  const emitted = new Map();
  const plugin = prerenderPages();
  await plugin.generateBundle.call({ emitFile(asset) { assert.ok(!emitted.has(asset.fileName)); emitted.set(asset.fileName, asset.source); } }, {}, { 'index.html': { type: 'asset', source: fs.readFileSync('index.html', 'utf8') } });
  for (const area of serviceAreas) {
    const html = emitted.get(`${area.path.slice(1)}.html`);
    assert.ok(html && html.includes(escape(area.h1)) && html.includes(escape(area.paragraphs[0])), `Prerendered content: ${area.path}`);
    assert.ok(emitted.get('sitemap.xml').includes(`https://livewoodstudio.com${area.path}`));
  }
  assert.ok(emitted.has('service-areas.html') && emitted.has('404.html'));
  assert.ok(fs.readFileSync('netlify.toml', 'utf8').includes('status = 404'));
  assert.ok(fs.readFileSync('public/robots.txt', 'utf8').includes('Sitemap: https://livewoodstudio.com/sitemap.xml'));
  console.log('BAŞARILI: 18 şehir, 3 bölge grubu, özgün içerikler ve 54 farklı soru; iç bağlantılar, doğru schema, gerçek ön işleme çıktısı ve site haritası doğrulandı.');
} finally { await server.close(); }
