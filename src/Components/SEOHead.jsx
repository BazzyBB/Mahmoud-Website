import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO_PAGES, pageGraph } from "../data/seo";
import { SITE } from "../data/site";
import { useLanguage } from '../i18n/LanguageContext';

const DEFAULT_IMAGE = "/Assets/ED1.JPG";

export default function SEOHead({ title, description, canonical = "/", ogImage = DEFAULT_IMAGE, ogType = "website", jsonLd }) {
  const { t, language } = useLanguage();
  title = SEO_PAGES[canonical]?.title || title;
  description = SEO_PAGES[canonical]?.description || description;
  title = t(title);
  description = t(description);
  const fullTitle = title ? `${title} | Live Wood Studio` : "Live Wood Studio | Custom Woodworking & Cabinets in Dallas, TX";
  const url = `${SITE.url}${canonical === "/" ? "" : canonical}`;
  const image = ogImage.startsWith("http") ? ogImage : `${SITE.url}${ogImage}`;
  const extras = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const schemas = [pageGraph(canonical, fullTitle, description, image), ...extras];

  return (
    <Helmet htmlAttributes={{ lang: language, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={{ en: 'en_US', es: 'es_ES', ar: 'ar' }[language]} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s).replace(/</g, "\\u003c")}</script>
      ))}
    </Helmet>
  );
}

export const breadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${SITE.url}${path === "/" ? "" : path}`,
  })),
});
