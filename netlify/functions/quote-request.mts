import type { Config } from '@netlify/functions';
import { getDb } from '../../db/index.js';
import { quotes } from '../../db/schema.js';
import { validateSubmission } from '../lib/quote-validation.mjs';
import { json, readJson } from '../lib/http.mjs';

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  let values;
  try {
    const body = await readJson(req);
    if (typeof body?.website === 'string' && body.website.trim()) return json({ success: true });
    values = validateSubmission(body);
  } catch (error) {
    return json({ error: error instanceof SyntaxError ? 'Please check your project details.' : (error as Error).message }, 400);
  }
  try {
    await getDb().insert(quotes).values(values).onConflictDoNothing({ target: quotes.submissionId });
    return json({ success: true }, 201);
  } catch {
    return json({ error: 'Your request could not be saved. Please try again or call 1 (281) 250-4799.' }, 503);
  }
};

export const config: Config = {
  path: '/api/quote-request',
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: 'ip' },
};
