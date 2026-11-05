import React from 'react';
import { LocalizedLink as Link, useLanguage } from '../i18n/LanguageContext';
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import { Eyebrow } from '../Components/Section';
import { AreaLinks } from '../Components/ServiceAreaLinks';
import { areaGroups, areaByKey, coverageNotice, serviceAreas } from '../data/service-areas';
import { SITE } from '../data/site';
import Icon from '../Components/Icons';

export function AreaBreadcrumbs({ area }) {
  const { t } = useLanguage();
  return <nav className="breadcrumb-nav" aria-label={t('Breadcrumb')}><ol>
    <li><Link to="/">{t('Home')}</Link></li>
    <li>{area ? <Link to="/service-areas">{t('Service Areas')}</Link> : <span aria-current="page">{t('Service Areas')}</span>}</li>
    {area && <li aria-current="page">{area.city}, TX</li>}
  </ol></nav>;
}

export function AreaContact({ title = 'Start Your Custom Project', intro = 'Tell us about your space, the piece you have in mind and your project address. We can discuss the design and confirm availability before you plan the next step.' }) {
  const { t } = useLanguage();
  return <section className="area-contact-band" aria-labelledby="area-contact-heading"><div className="container area-contact-inner">
    <div><Eyebrow>From a place to a piece</Eyebrow><h2 id="area-contact-heading">{t(title)}</h2><p>{t(intro)}</p></div>
    <div className="area-contact-actions"><Link className="btn btn-primary" to="/ContactUs">{t('Get a Custom Quote')}<Icon name="arrow" size={18} /></Link><a href={SITE.phoneHref}><Icon name="phone" size={18} /><span dir="ltr">{SITE.phoneDisplay}</span></a></div>
  </div></section>;
}

export default function ServiceAreas() {
  const { t } = useLanguage();
  const list = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Proposed DFW project areas',
    itemListElement: serviceAreas.map((area, index) => ({ '@type': 'ListItem', position: index + 1, name: `${area.city}, TX`, url: `${SITE.url}${area.path}` })),
  };
  return <>
    <SEOHead canonical="/service-areas" jsonLd={[breadcrumbs([['Home', '/'], ['Service Areas', '/service-areas']]), list]} />
    <main id="main">
      <section className="area-directory-hero"><div className="container">
        <AreaBreadcrumbs /><Eyebrow>Dallas studio. Individual projects.</Eyebrow>
        <h1>{t('Custom Woodworking & Cabinetry Service Areas in Dallas–Fort Worth')}</h1>
        <p className="lead">{t('Explore a starting point for your custom cabinets, handcrafted furniture or display project. Each location guide offers practical ideas for preparing a project enquiry.')}</p>
        <p className="area-coverage-note">{t(coverageNotice)}</p>
      </div></section>
      <section className="section area-directory" aria-label={t('Browse service areas')}><div className="container">
        {areaGroups.map((group, index) => <section className="area-group" key={group.title} aria-labelledby={`area-group-${index}`}>
          <div className="area-group-label"><span className="area-index" aria-hidden="true">0{index + 1}</span><h2 id={`area-group-${index}`}>{t(group.title)}</h2></div>
          <AreaLinks areas={group.cities.map(areaByKey)} />
        </section>)}
      </div></section>
      <section className="area-planning-note"><div className="container split">
        <div><Eyebrow>A useful first conversation</Eyebrow><h2>{t('Your address is the beginning. Your brief makes it personal.')}</h2></div>
        <div><p>{t('Share approximate dimensions, photographs, intended use and a budget range. Ask about service availability, site measurements and delivery or installation responsibilities before setting a project schedule.')}</p><p>{t('Live Wood Studio is based in Dallas. These guides do not represent separate workshops or showrooms in the listed cities.')}</p><Link className="text-link" to="/Services">{t('Explore our woodworking services')}<Icon name="arrow" size={18} /></Link></div>
      </div></section>
      <AreaContact />
    </main>
  </>;
}
