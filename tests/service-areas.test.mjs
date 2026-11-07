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
  assert.equal(serviceAreas.length, 15);
  assert.equal(new Set(serviceAreas.map(area => area.slug)).size, 15);
  assert.equal(new Set(areaGroups.flatMap(group => group.cities)).size, 15);
  assert.deepEqual(new Set(areaGroups.flatMap(group => group.cities)), new Set(serviceAreas.map(area => area.key)), "Directory groups include each location once");
  const directory = renderPage('/service-areas');
  const home = renderPage('/').body;
  for (const area of serviceAreas) assert.ok(directory.body.includes(`href="${area.path}"`));
  for (const key of featuredAreaKeys) assert.ok(home.includes(`href="${areaByKey(key).path}"`));
  assert.ok(home.indexOf('id="home-areas-heading"') < home.indexOf('id="quick-quote"'), 'Homepage area grid precedes final quote form');
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
    assert.ok(body.includes('href="/ContactUs#quote-request"'));
    assert.ok(body.includes('href="tel:+14698881330"'));
    assert.ok(body.includes('Project locations are not attributed to this city.'));
    for (const key of area.nearby) assert.ok(body.includes(`href="${areaByKey(key).path}"`));
    const schemas = [...head.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    const graph = schemas.flatMap(schema => schema['@graph'] || [schema]);
    const business = graph.find(node => node['@type'] === 'LocalBusiness');
    assert.ok(!business.address, 'No unverified office address');
    assert.equal(business.telephone, '+14698881330');
    assert.ok(business.areaServed.some(area => area.name === 'Houston'), 'Confirmed Houston coverage is included');
    assert.ok(!JSON.stringify(graph).includes('Dallas'));
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

  assert.ok(fs.readFileSync('netlify.toml', 'utf8').includes('status = 404'));
  assert.ok(fs.readFileSync('public/robots.txt', 'utf8').includes('Sitemap: https://livewoodstudio.com/sitemap.xml'));
  console.log('PASS: Fifteen Greater Houston service areas, distinct content, metadata, links, breadcrumbs and verified business schema.');
} finally { await server.close(); }
