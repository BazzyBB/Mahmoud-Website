import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { HelmetProvider } from 'react-helmet-async';
import SiteRoutes from './SiteRoutes';
import Admin from './pages/Admin';
export { INDEXABLE_PATHS } from './data/seo';

export function renderPage(path) {
  const context = {};
  const body = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location={path}><SiteRoutes AdminComponent={Admin} /></StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = context;
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map(tag => tag.toString()).join('\n');
  return { body, head };
}
