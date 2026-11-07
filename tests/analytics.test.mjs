import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { createPageViewTracker, isPrivateAnalyticsVisit } = await server.ssrLoadModule('/src/utils/analytics.js');
  const events = [];
  const visit = createPageViewTracker((...event) => events.push(event));
  const url = path => new URL(path, 'https://livewoodstudio.com');
  assert.equal(visit(url('/'), 'Home'), true);
  assert.equal(visit(url('/'), 'Home'), false, 'Repeated effect does not duplicate the initial page view');
  assert.equal(visit(url('/#quick-quote'), 'Home'), false, 'An in-page jump is not a new page view');
  assert.equal(visit(url('/Services'), 'Services'), true);
  assert.equal(visit(url('/'), 'Home'), true, 'Returning from another route is a new page view');
  assert.equal(events.length, 3);
  assert.deepEqual(events[1], ['event', 'page_view', { page_path: '/Services', page_title: 'Services', page_location: 'https://livewoodstudio.com/Services' }]);
  assert.equal(isPrivateAnalyticsVisit(url('/admin')), true);
  assert.equal(visit(url('/admin'), 'Admin'), false);
  assert.equal(events.length, 3, 'Administrator visits do not reach analytics');
  assert.equal(visit(url('/'), 'Home'), true, 'Returning from private routes starts a fresh public visit');
  assert.equal(events.length, 4);
  for (const field of ['invite_token', 'recovery_token', 'confirmation_token', 'access_token', 'email_change_token']) {
    assert.equal(isPrivateAnalyticsVisit(url('/#' + field + '=')), true, 'Authentication callbacks remain excluded');
    assert.equal(visit(url('/#' + field + '='), 'Home'), false);
  }
  assert.equal(events.length, 4, 'Authentication callbacks do not emit page views');
  const jump = createPageViewTracker((...event) => events.push(event));
  jump(url('/Services#service-4'), 'Services');
  assert.equal(events.at(-1)[2].page_location, 'https://livewoodstudio.com/Services', 'URL fragments are excluded from page-view events');
  console.log('PASS: single page-view events, public route transitions, fragment exclusion and private admin visits.');
} finally { await server.close(); }
