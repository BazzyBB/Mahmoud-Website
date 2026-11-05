// Serves photos through Netlify Image CDN so visitors get resized WebP/AVIF
// files instead of the multi-megabyte originals. Falls back to the original
// file during plain `vite` development where the CDN endpoint isn't available.
const useCdn = import.meta.env.PROD || import.meta.env.SSR;

export function img(src, { w, h, fit, q = 75 } = {}) {
  if (!useCdn) return src;
  const params = new URLSearchParams({ url: src });
  if (w) params.set("w", String(w));
  if (h) params.set("h", String(h));
  if (fit) params.set("fit", fit);
  if (q) params.set("q", String(q));
  return `/.netlify/images?${params.toString()}`;
}

export function srcSet(src, widths = [480, 800, 1200, 1600], opts = {}) {
  if (!useCdn) return undefined;
  return widths.map((w) => `${img(src, { ...opts, w })} ${w}w`).join(", ");
}
