import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { renderDocument } from '../scripts/prerender.mjs';

// Verify the browser discovers the same responsive LCP request in the head
// and in the prerendered body, without depending on client-side JavaScript.
const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { renderPage } = await server.ssrLoadModule('/src/entry-server.jsx');
  const template = fs.readFileSync('index.html', 'utf8');
  const home = renderDocument(template, renderPage('/'));
  const hero = home.match(/<img\b[^>]*class="hero-photo"[^>]*>/)[0];
  const preload = home.match(/<link rel="preload" as="image"[^>]*>/)[0];
  const value = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
  assert.equal(value(preload, 'href'), value(hero, 'src'));
  assert.equal(value(preload, 'imagesrcset'), value(hero, 'srcSet'));
  assert.equal(value(preload, 'imagesizes'), value(hero, 'sizes'));
  assert.equal(value(hero, 'loading'), 'eager');
  assert.equal(value(hero, 'fetchpriority'), 'high');
  assert.ok(preload.includes('640w'));
  assert.equal((home.match(/class="hero-photo"/g) || []).length, 1, 'Inactive slides do not download photos on first render');
  assert.ok(home.indexOf(preload) < home.indexOf('</head>'));
  assert.ok(!renderDocument(template, renderPage('/ContactUs')).includes('as="image"'));
  assert.ok(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(template + fs.readFileSync('src/index.css', 'utf8')));
  for (const [, path] of template.matchAll(/href="(\/src\/assets\/fonts\/[^" ]+)"/g)) {
    assert.equal(fs.readFileSync(`.${path}`).subarray(0, 4).toString(), 'wOF2');
  }
  assert.ok(renderPage('/admin').body.includes('Administrator sign-in'), 'Admin still prerenders after code splitting');
  console.log('PASS: Responsive LCP preload, eager hero, inactive slide requests, self-hosted WOFF2 fonts and admin rendering.');
} finally {
  await server.close();
}
