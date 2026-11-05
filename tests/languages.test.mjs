import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
  const { localizedTo, translate } = await server.ssrLoadModule('/src/i18n/LanguageContext.jsx');
  const { translations } = await server.ssrLoadModule('/src/i18n/translations.js');
  const { projects, services, categories } = await server.ssrLoadModule('/src/data/projects.js');
  const { faqs, dedications, processSteps, navLinks } = await server.ssrLoadModule('/src/data/site.js');
  const { projectTypes, validateSubmission } = await server.ssrLoadModule('/netlify/lib/quote-validation.mts');
  const copy = [
    ...projects.flatMap(p => [p.title, p.tag, p.shortTitle, p.summary, ...p.description, ...p.specs.flat()]),
    ...services.flatMap(s => [s.title, s.text]), ...faqs.flatMap(f => [f.q, f.a]),
    ...dedications.flatMap(d => [d.title, d.text]), ...processSteps.flatMap(p => [p.title, p.text]),
    ...navLinks.map(n => n.label), ...categories, ...projectTypes,
  ];
  for (const language of ['es', 'ar']) {
    for (const text of copy) assert.ok(translations[language][text.replace(/\s+/g, ' ').trim()], `${language}: ${text}`);
    for (const path of [...INDEXABLE_PATHS, '/missing']) {
      const { body, head } = renderPage(`${path}?lang=${language}`);
      assert.ok(body.includes(`lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}"`));
      assert.ok(body.includes(`href="/Gallery?lang=${language}"`), 'Navigation retains language');
      assert.ok(body.includes(`aria-label="${language === 'es' ? 'Idioma: Español' : 'اللغة: العربية'}"`), 'Menu reflects selected language');
      assert.ok(body.includes('class="language-flag"'), 'Selected language has a flag');
      assert.ok(body.includes('Crafted with care by'), 'Agency signature stays English');
      assert.ok(body.includes('href="https://htxgrowth.com"'));
      assert.ok(body.includes(language === 'es' ? 'Nuestro trabajo' : 'أعمالنا'));
      assert.ok(!body.includes('Tarafından'));
      assert.ok(!head.includes('rel="canonical" href="https://livewoodstudio.com/?lang='), 'Existing canonical URLs remain stable');
    }
    const contact = renderPage(`/ContactUs?lang=${language}`).body;
    for (const type of projectTypes) {
      const escaped = type.replaceAll('&', '&amp;');
      assert.ok(contact.includes(`value="${escaped}"`), `Form still submits English enum: ${type}`);
    }
    assert.ok(contact.includes(language === 'es' ? 'Número de teléfono' : 'رقم الهاتف'));
  }
  assert.ok(renderPage('/').body.includes('Custom woodworking.'));
  assert.ok(renderPage('/?lang=invalid').body.includes('Custom woodworking.'));
  assert.equal(localizedTo('/Services#service-2', 'ar'), '/Services?lang=ar#service-2');
  assert.equal(localizedTo('/Gallery?sort=latest', 'es'), '/Gallery?sort=latest&lang=es');
  assert.equal(localizedTo('/admin', 'es'), '/admin');
  assert.equal(localizedTo('https://htxgrowth.com', 'ar'), 'https://htxgrowth.com');
  assert.equal(translate('Call Live Wood Studio at (469) 888-1330', 'ar'), 'اتصل بـ Live Wood Studio على (469) 888-1330');
  assert.equal(translate('2 of 3', 'es'), '2 de 3');
  assert.equal(translate('Live Wood Studio', 'ar'), 'Live Wood Studio');
  const result = validateSubmission({ submissionId: '664617b3-e5ce-4cef-b73e-463a53885f7c', name: 'عميل الاستوديو', email: 'client@example.test', projectType: projectTypes[0], message: 'أرغب في طاولة خشبية مخصصة لغرفة الطعام.' });
  assert.equal(result.name, 'عميل الاستوديو');
  assert.equal(result.projectType, projectTypes[0]);
  assert.ok(renderPage('/admin?lang=ar').body.includes('Administrator sign-in'), 'Admin authentication remains independent');
  console.log('BAŞARILI: Tüm genel sayfalar üç dilde işlendi; çeviri kapsamı, Arapça yönü, dil bağlantıları, İngilizce varsayılan, HTX Growth imzası ve teklif formu değerleri doğrulandı.');
} finally { await server.close(); }
