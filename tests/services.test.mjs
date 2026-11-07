import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { woodworkingServices } = await server.ssrLoadModule('/src/data/woodworking-services.js');
  const { serviceAreas } = await server.ssrLoadModule('/src/data/service-areas.js');
  const { getProject } = await server.ssrLoadModule('/src/data/projects.js');
  const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
  assert.equal(woodworkingServices.length, 20);
  assert.equal(new Set(woodworkingServices.map(service => service.slug)).size, 20);
  const directory = renderPage('/Services').body;
  const paragraphs = new Set();
  for (const service of woodworkingServices) {
    assert.ok(INDEXABLE_PATHS.includes(service.path));
    assert.ok(directory.includes(`href="${service.path}"`));
    const { body, head } = renderPage(service.path);
    assert.ok(body.includes('<strong>'), 'Service keywords have semantic emphasis');
    assert.ok(body.includes(service.photoNote.replaceAll('&', '&amp;')));
    assert.ok(body.includes(`href="/Gallery/${getProject(service.project).slug}"`));
    assert.ok(serviceAreas.some(area => area.key === service.city));
    for (const paragraph of service.paragraphs) {
      assert.ok(!paragraphs.has(paragraph), 'Service advice is original');
      paragraphs.add(paragraph);
    }
    const schemas = [...head.matchAll(/type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    const nodes = schemas.flatMap(schema => schema['@graph'] || [schema]);
    const ownService = nodes.find(node => node['@type'] === 'Service' && node.url === `https://livewoodstudio.com${service.path}`);
    assert.equal(ownService?.serviceType, service.title);
    assert.ok(ownService.areaServed.some(place => place.name === 'La Porte'));
    const breadcrumb = nodes.find(node => node['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb.itemListElement[1].item, 'https://livewoodstudio.com/Services');
    assert.ok(nodes.some(node => node['@type'] === 'Organization'));
    assert.ok(!nodes.some(node => node.review || node.aggregateRating || node.address));
    if (service.photoStatus === 'related') assert.match(service.photoNote, /Related/i, 'Related photos are not passed off as exact projects');
  }
  for (const key of ['houston','cypress','the-woodlands','houston-heights','league-city','sugar-land','richmond','friendswood','katy','pearland','kingwood','webster','galveston','la-porte']) {
    const area = serviceAreas.find(area => area.key === key);
    assert.ok(area, `Required service area ${key}`);
    const { body } = renderPage(area.path);
    for (const slug of area.serviceSlugs) assert.ok(body.includes(`href="/Services/${slug}"`));
  }
  for (const path of ['/Services/unknown-service', '/service-areas/unknown-tx']) assert.ok(renderPage(path).head.includes('noindex'));
  console.log('PASS: 20 service pages, original guidance, honest photo references, service schema, required communities and contextual links.');
} finally { await server.close(); }
