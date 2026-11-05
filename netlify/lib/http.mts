export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
}

export async function readJson(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) throw new Error('JSON required.');
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) throw new Error('Invalid request origin.');
  if (Number(req.headers.get('content-length') || 0) > 16000) throw new Error('Request too large.');
  const text = await req.text();
  if (new TextEncoder().encode(text).length > 16000) throw new Error('Request too large.');
  return JSON.parse(text);
}
