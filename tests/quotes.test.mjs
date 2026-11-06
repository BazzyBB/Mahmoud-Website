import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const validation = await server.ssrLoadModule('/netlify/lib/quote-validation.mts');
  const { readJson } = await server.ssrLoadModule('/netlify/lib/http.mts');
  const { default: submit } = await server.ssrLoadModule('/netlify/functions/quote-request.mts');
  const { default: admin } = await server.ssrLoadModule('/netlify/functions/admin-quotes.mts');
  const sample = { submissionId: '664617b3-e5ce-4cef-b73e-463a53885f7c', name: 'Studio Client', email: 'CLIENT@example.com', phoneNumber: '+1 (469) 555-0123', subject: 'Walnut dining table', projectType: 'Live-edge & epoxy tables', message: 'A custom walnut table for a family dining room.' };
  assert.equal(validation.validateSubmission(sample).email, 'client@example.com');
  for (const patch of [{ name: '' }, { email: 'invalid' }, { message: 'short' }, { submissionId: 'invalid' }, { projectType: 'invalid' }, { message: 'a'.repeat(5001) }, { phoneNumber: 'javascript:bad' }]) {
    assert.throws(() => validation.validateSubmission({ ...sample, ...patch }));
  }
  const cleaned = validation.validateSubmission({ ...sample, status: 'completed', notes: 'Injected note' });
  assert.ok(!('status' in cleaned) && !('notes' in cleaned), 'Public input cannot set internal fields');
  assert.equal(validation.isAdmin(null), false);
  assert.equal(validation.isAdmin({ roles: ['customer'] }), false);
  assert.equal(validation.isAdmin({ userMetadata: { roles: ['admin'] } }), false, 'User-editable metadata cannot grant access');
  assert.equal(validation.isAdmin({ appMetadata: { roles: ['admin'] } }), true);
  assert.equal(validation.isAdmin({ roles: ['admin'] }), true);
  assert.equal(validation.isAdmin({ appMetadata: { authorization: { roles: ['admin'] } } }), true);
  assert.equal(validation.isAdmin({ userMetadata: { authorization: { roles: ['admin'] } } }), false);
  assert.equal(validation.isAdmin({ appMetadata: { authorization: null } }), false);
  assert.throws(() => validation.validateUpdate({ status: 'deleted', notes: '' }));
  assert.throws(() => validation.validateUpdate({ status: 'new', notes: 'a'.repeat(5001) }));
  assert.deepEqual(validation.validateUpdate({ status: 'contacted', notes: ' Discuss dimensions ' }), { status: 'contacted', notes: 'Discuss dimensions' });
  const request = (body, headers = {}) => new Request('https://livewoodstudio.com/api/quote-request', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  await assert.rejects(readJson(request(sample, { Origin: 'https://another.example' })));
  await assert.rejects(readJson(request({ message: 'a'.repeat(17000) })));
  assert.equal((await submit(new Request('https://livewoodstudio.com/api/quote-request'))).status, 405);
  assert.equal((await submit(request({ ...sample, email: 'invalid' }))).status, 400);
  const trap = await submit(request({ website: 'spam.example' }));
  assert.equal(trap.status, 200);
  assert.equal((await trap.json()).success, true);
  const denied = await admin(new Request('https://livewoodstudio.com/api/admin/quotes'), { params: {} });
  assert.equal(denied.status, 401, 'No session cannot read customer data');
  assert.equal(denied.headers.get('cache-control'), 'private, no-store');
  globalThis.netlifyIdentityContext = { user: { sub: '664617b3-e5ce-4cef-b73e-463a53885f7c', email: 'member@example.com', app_metadata: { roles: ['member'] } } };
  try {
    const forbidden = await admin(new Request('https://livewoodstudio.com/api/admin/quotes'), { params: {} });
    assert.equal(forbidden.status, 403, 'Signed-in non-admin cannot read customer data');
  } finally { delete globalThis.netlifyIdentityContext; }
  const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
  for (const path of ['/', '/ContactUs']) {
    const page = renderPage(path);
    assert.ok(!/recaptcha|quote-verification/i.test(page.body), 'Quote form has no CAPTCHA requirement');
    assert.ok(page.body.includes('id="quote-name"'));
    assert.ok(page.body.includes('id="quote-message"'));
    assert.equal((page.body.match(/id="quote-email"/g) || []).length, 1);
  }
  const panel = renderPage('/admin');
  assert.ok(panel.head.includes('noindex, nofollow'));
  assert.ok(!INDEXABLE_PATHS.includes('/admin'));
  assert.ok(!panel.body.includes(sample.email));
  console.log('PASS: Input limits, email validation, internal field protection, trusted admin roles, status/notes validation, origin and body-size checks, honeypot, anonymous API rejection and private panel rendering.');
} finally { await server.close(); }
