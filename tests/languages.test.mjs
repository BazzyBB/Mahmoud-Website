import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({configFile:false,server:{middlewareMode:true,hmr:false},appType:'custom',ssr:{noExternal:['react-helmet-async']},optimizeDeps:{noDiscovery:true,include:[]}});
try {
  const {renderPage, INDEXABLE_PATHS} = await server.ssrLoadModule('/src/entry-server.jsx');
  const {languages, localizedTo} = await server.ssrLoadModule('/src/i18n/LanguageContext.jsx');
  const {navLinks} = await server.ssrLoadModule('/src/data/site.js');
  assert.deepEqual(languages.map(item=>item.code), ['en']);
  assert.deepEqual(navLinks.map(link=>link.label), ['Home','About Us','Services','Projects / Gallery','Contact Us']);
  for(const path of INDEXABLE_PATHS) {
    const english = renderPage(path);
    for(const language of ['es','ar']) {
      const page=renderPage(`${path}?lang=${language}`);
      assert.equal(page.body,english.body,`English content for legacy language URL: ${path}`);
      assert.equal(page.head,english.head);
    }
    assert.ok(english.body.includes('lang="en" dir="ltr"'));
    assert.ok(!english.body.includes('language-switcher'));
    assert.ok(!/Dallas|DFW|Fort Worth/.test(english.body+english.head));
    assert.ok(english.body.includes('href="sms:+14698881330"'));
    assert.ok(english.body.includes('href="tel:+14698881330"'));
    assert.ok(english.body.includes('href="/ContactUs#quote-request"'));
  }
  assert.equal(localizedTo('/Services#service-2','ar'),'/Services#service-2');
  assert.ok(renderPage('/admin?lang=ar').body.includes('Administrator sign-in'));
  const home=renderPage('/').body;
  const markers=['class="hero"','id="services-heading"','id="work-heading"','id="about-heading"','id="home-process-heading"','id="home-areas-heading"','id="quick-quote"'];
  let previous=-1;
  for(const marker of markers){const position=home.indexOf(marker);assert.ok(position>previous,`Homepage order: ${marker}`);previous=position;}
  console.log('PASS: English-only routes, legacy language URLs, navigation, contact actions and homepage sequence.');
} finally {await server.close();}
