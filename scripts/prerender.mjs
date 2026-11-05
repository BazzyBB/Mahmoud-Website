import { createServer } from 'vite';

export function renderDocument(template, { head, body }) {
  if (!template.includes('<div id="root"></div>')) throw new Error('Missing React root in HTML template.');
  return template.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

// Render the same React routes used in the browser into deployable HTML assets.
export function prerenderPages() {
  return {
    name: 'live-wood-static-pages',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') throw new Error('Missing Vite HTML entry for static rendering.');
      const template = String(index.source).replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
      const server = await createServer({
        configFile: false,
        root: process.cwd(),
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
        ssr: { noExternal: ['react-helmet-async'] },
        optimizeDeps: { noDiscovery: true, include: [] },
      });
      try {
        const { renderPage, INDEXABLE_PATHS } = await server.ssrLoadModule('/src/entry-server.jsx');
        for (const path of [...INDEXABLE_PATHS, '/admin', '/__missing__']) {
          const { head, body } = renderPage(path);
          const html = renderDocument(template, { head, body });
          if (!html.includes('<main')) throw new Error(`Empty static page: ${path}`);
          if (path === '/') index.source = html;
          else this.emitFile({ type: 'asset', fileName: path === '/__missing__' ? '404.html' : `${path.slice(1)}.html`, source: html });
        }
        const urls = INDEXABLE_PATHS.map(path => `  <url><loc>https://livewoodstudio.com${path === '/' ? '/' : path}</loc></url>`).join('\n');
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      } finally {
        await server.close();
      }
    },
  };
}
