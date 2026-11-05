import type { admin, User } from '@netlify/identity';
import { isAdmin, uuidPattern } from './quote-validation.mjs';
import { json, readJson } from './http.mjs';

export async function manageUsers(req: Request, caller: User | null, identity: typeof admin) {
  if (!['GET', 'PATCH'].includes(req.method)) return json({ error: 'Bu işlem desteklenmiyor.' }, 405);
  if (!caller) return json({ error: 'Lütfen giriş yapın.' }, 401);
  if (!isAdmin(caller)) return json({ error: 'Rol eklemek için mevcut bir yönetici hesabı gerekir.' }, 403);
  try {
    // Check current server-controlled roles as well as the session, so revoked
    // administrators cannot keep assigning roles using an older session.
    const current = await identity.getUser(caller.id);
    if (!isAdmin(current)) return json({ error: 'Yönetici yetkiniz bulunmuyor. Tekrar giriş yapın.' }, 403);
    if (req.method === 'GET') {
      const page = Number(new URL(req.url).searchParams.get('page') || 1);
      if (!Number.isInteger(page) || page < 1 || page > 10000) return json({ error: 'Geçersiz sayfa.' }, 400);
      const users = await identity.listUsers({ page, perPage: 20 });
      return json({ users: users.map(user => ({ id: user.id, email: user.email, admin: isAdmin(user) })), page, hasMore: users.length === 20 });
    }
    let body;
    try { body = await readJson(req); }
    catch { return json({ error: 'Geçersiz istek.' }, 400); }
    if (!body || typeof body.userId !== 'string' || !uuidPattern.test(body.userId) || body.role !== 'admin') return json({ error: 'Bir kullanıcı ve admin rolünü seçin.' }, 400);
    const target = await identity.getUser(body.userId);
    // Only grant the recognized role, preserving existing roles and metadata.
    const metadata = target.appMetadata || {};
    const roles = Array.isArray(metadata.roles) ? metadata.roles.filter((role): role is string => typeof role === 'string') : [];
    await identity.updateUser(target.id, { app_metadata: { ...metadata, roles: [...new Set([...roles, 'admin'])] } });
    return json({ success: true });
  } catch {
    return json({ error: 'Kullanıcı yönetimi şu anda kullanılamıyor. Lütfen tekrar deneyin.' }, 503);
  }
}
