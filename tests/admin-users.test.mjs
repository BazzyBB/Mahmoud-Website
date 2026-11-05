import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { manageUsers } = await server.ssrLoadModule('/netlify/lib/admin-users.mts');
  const caller = { id: '664617b3-e5ce-4cef-b73e-463a53885f7c', email: 'owner@example.test', appMetadata: { roles: ['admin'] } };
  const member = { id: '564617b3-e5ce-4cef-b73e-463a53885f7c', email: 'member@example.test', appMetadata: { roles: ['editor'], provider: 'email', authorization: { roles: ['member'] } } };
  let writes = [];
  let reads = 0;
  let current = caller;
  const identity = {
    getUser: async id => { reads++; return id === caller.id ? current : member; },
    listUsers: async () => [caller, member],
    updateUser: async (id, attributes) => { writes.push({ id, attributes }); return member; },
  };
  const request = (body, origin = 'https://livewoodstudio.com') => new Request('https://livewoodstudio.com/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
  const get = () => new Request('https://livewoodstudio.com/api/admin/users');
  assert.equal((await manageUsers(get(), null, identity)).status, 401);
  assert.equal((await manageUsers(request({ userId: member.id, role: 'admin' }), member, identity)).status, 403);
  assert.equal((await manageUsers(get(), { ...member, userMetadata: { roles: ['admin'] } }, identity)).status, 403);
  assert.equal(reads, 0, 'Unauthorized callers cannot access Identity admin operations');
  current = member;
  assert.equal((await manageUsers(get(), caller, identity)).status, 403, 'Revoked admin session is rejected');
  current = caller;
  const listed = await manageUsers(get(), caller, identity);
  assert.equal(listed.status, 200);
  assert.deepEqual((await listed.json()).users, [{ id: caller.id, email: caller.email, admin: true }, { id: member.id, email: member.email, admin: false }]);
  for (const body of [null, {}, { userId: 'bad', role: 'admin' }, { userId: member.id, role: 'owner' }]) assert.equal((await manageUsers(request(body), caller, identity)).status, 400);
  assert.equal((await manageUsers(request({ userId: member.id, role: 'admin' }, 'https://other.test'), caller, identity)).status, 400);
  assert.equal(writes.length, 0);
  assert.equal((await manageUsers(request({ userId: member.id, role: 'admin' }), caller, identity)).status, 200);
  assert.deepEqual(writes, [{ id: member.id, attributes: { app_metadata: { ...member.appMetadata, roles: ['editor', 'admin'] } } }]);
  const unavailable = { ...identity, getUser: async () => { throw new Error('Private upstream error'); } };
  const failed = await manageUsers(get(), caller, unavailable);
  assert.equal(failed.status, 503);
  assert.equal(failed.headers.get('cache-control'), 'private, no-store');
  assert.ok(!(await failed.text()).includes('Private upstream error'));
  console.log('BAŞARILI: Rol ekleme yetkileri, iptal edilmiş yönetici oturumu, profil üzerinden yetki yükseltme engeli, istek doğrulaması, mevcut rollerin korunması ve özel hata yanıtları kontrol edildi.');
} finally { await server.close(); }
