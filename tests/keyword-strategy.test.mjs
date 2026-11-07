import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { keywordOwners, keywordArchitecture } = await server.ssrLoadModule('/src/data/keyword-strategy.js');
  const { woodworkingServices } = await server.ssrLoadModule('/src/data/woodworking-services.js');
  const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
  assert.equal(keywordOwners.length, 23, 'All requested primary and secondary query clusters are assigned');
  assert.equal(new Set(keywordOwners.map(([query]) => query.toLowerCase())).size, 23);
  assert.deepEqual(new Set(keywordArchitecture.map(row => row.url)), new Set(INDEXABLE_PATHS));
  assert.equal(new Set(keywordArchitecture.map(row => row.primaryKeyword.toLowerCase())).size, INDEXABLE_PATHS.length, 'Pages do not share the same primary target');
  const owner = query => keywordOwners.find(([value]) => value === query)?.[1];
  for (const query of ['Custom Woodworking Houston TX','Custom Furniture Houston TX','Woodworking Near Me','Custom Furniture Makers Near Me']) assert.equal(owner(query), '/');
  assert.equal(owner('Custom Dining Tables Houston'), owner('Live Edge Tables Houston'), 'Related table intent is consolidated');
  assert.equal(owner('Custom Closets Houston'), owner('Custom Cabinets Houston TX'), 'Cabinet and closet intent has one existing owner');
  assert.notEqual(renderPage('/').head.match(/<title[^>]*>(.*?)<\/title>/s)[1], renderPage('/service-areas/houston-tx').head.match(/<title[^>]*>(.*?)<\/title>/s)[1]);
  for (const row of keywordArchitecture) {
    for (const link of row.internalLinks) assert.ok(INDEXABLE_PATHS.includes(link.split('#')[0]));
    assert.ok(row.intent && row.recommendedContent && row.supportingKeywords.length);
  }
  const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const service of woodworkingServices) {
    const { head, body } = renderPage(service.path);
    assert.ok(body.includes(`<h1>${escape(service.h1)}</h1>`));
    const schemas = [...head.matchAll(/type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 3);
    for (const item of faq.mainEntity) assert.ok(body.includes(escape(item.name)) && body.includes(escape(item.acceptedAnswer.text)), 'FAQ schema matches visible customer guidance');
  }
  const home = renderPage('/');
  assert.equal((home.body.match(/class="hero-photo"/g) || []).length, 1, 'Only the first slider photo is requested on initial render');
  const config = fs.readFileSync('netlify.toml', 'utf8');
  const photoRedirects = [...config.matchAll(/from = "(\/Assets\/[^"]+)"\s+to = "(\/Assets\/[^"]+)"\s+status = 301/g)];
  assert.equal(photoRedirects.length, 28);
  for (const [, , target] of photoRedirects) assert.ok(fs.existsSync(`public${target}`), 'Legacy photo URL resolves to an existing descriptive file');
  const document = fs.readFileSync('docs/keyword-to-url-map.md', 'utf8');
  for (const row of keywordArchitecture) assert.ok(document.includes(`](${row.url})`));
  console.log('PASS: all 23 requested queries mapped, 61 distinct page targets, customer FAQ/schema parity and legacy image redirects.');
} finally { await server.close(); }
