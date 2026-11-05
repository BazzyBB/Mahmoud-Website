import type { Config, Context } from '@netlify/functions';
import { getUser } from '@netlify/identity';
import { and, count, desc, eq, ilike, or } from 'drizzle-orm';
import { getDb } from '../../db/index.js';
import { quotes } from '../../db/schema.js';
import { isAdmin, statuses, uuidPattern, validateUpdate } from '../lib/quote-validation.mjs';
import { json, readJson } from '../lib/http.mjs';

export default async (req: Request, context: Context) => {
  if (!['GET', 'PATCH'].includes(req.method)) return json({ error: 'Method not allowed.' }, 405);
  const user = await getUser();
  if (!user) return json({ error: 'Please sign in.' }, 401);
  if (!isAdmin(user)) return json({ error: 'This account does not have administrator access.' }, 403);
  const id = context.params?.id;
  if (id && !uuidPattern.test(id)) return json({ error: 'Quote request not found.' }, 404);
  if (req.method === 'PATCH' && !id) return json({ error: 'Please select a quote request.' }, 400);
  let update;
  if (req.method === 'PATCH') {
    try { update = validateUpdate(await readJson(req)); }
    catch { return json({ error: 'Please check the status and notes.' }, 400); }
  }
  try {
    const db = getDb();
    if (id) {
      const [quote] = update
        ? await db.update(quotes).set({ ...update, updatedAt: new Date() }).where(eq(quotes.id, id)).returning()
        : await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
      return quote ? json({ quote }) : json({ error: 'Quote request not found.' }, 404);
    }
    const params = new URL(req.url).searchParams;
    const status = params.get('status') || '';
    const search = (params.get('search') || '').trim();
    const page = Number(params.get('page') || 1);
    if ((status && !statuses.includes(status as typeof statuses[number])) || search.length > 120 || !Number.isInteger(page) || page < 1 || page > 100000) return json({ error: 'Invalid filter.' }, 400);
    const pattern = `%${search.replace(/[\\%_]/g, '\\$&')}%`;
    const where = and(
      status ? eq(quotes.status, status as typeof statuses[number]) : undefined,
      search ? or(ilike(quotes.name, pattern), ilike(quotes.email, pattern), ilike(quotes.subject, pattern)) : undefined,
    );
    const [items, [totalRow], counts] = await Promise.all([
      db.select({ id: quotes.id, name: quotes.name, email: quotes.email, subject: quotes.subject, projectType: quotes.projectType, status: quotes.status, createdAt: quotes.createdAt }).from(quotes).where(where).orderBy(desc(quotes.createdAt), desc(quotes.id)).limit(20).offset((page - 1) * 20),
      db.select({ total: count() }).from(quotes).where(where),
      db.select({ status: quotes.status, count: count() }).from(quotes).groupBy(quotes.status),
    ]);
    return json({ items, total: totalRow.total, counts, page, pageSize: 20 });
  } catch {
    return json({ error: 'Quote requests are currently unavailable. Please try again.' }, 503);
  }
};

export const config: Config = { path: ['/api/admin/quotes', '/api/admin/quotes/:id'] };
