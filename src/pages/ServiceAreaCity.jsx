import React from 'react';
import { useParams } from 'react-router-dom';
import { LocalizedLink as Link, useLanguage } from '../i18n/LanguageContext';
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import { Eyebrow } from '../Components/Section';
import { AreaLinks } from '../Components/ServiceAreaLinks';
import ProjectCard from '../Components/ProjectCard';
import Icon from '../Components/Icons';
import { AreaBreadcrumbs, AreaContact } from './ServiceAreas';
import NotFound from './NotFound';
import { getArea, areaByKey, coverageNotice } from '../data/service-areas';
import { projects, services } from '../data/projects';
import { SITE } from '../data/site';
import { img, srcSet } from '../utils/image';

export default function ServiceAreaCity() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const area = getArea(slug);
  if (!area) return <NotFound />;
  const reference = projects[area.gallery[0]];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: area.faqs.map(([q, a]) => ({ '@type': 'Question', name: t(q), acceptedAnswer: { '@type': 'Answer', text: t(a) } })) };
  // No areaServed assertion: address-specific coverage is not yet confirmed.
  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE.url}${area.path}#project-enquiry`,
    name: `Custom woodworking project enquiry for ${area.city}, TX`,
    serviceType: 'Custom woodworking project consultation', url: `${SITE.url}${area.path}`,
    description: `Discuss a proposed ${area.city} woodworking project with Live Wood Studio. Coordinate measurements, delivery and installation for the project address.`,
    provider: { '@id': `${SITE.url}/#business` },
  };
  return <>
    <SEOHead canonical={area.path} ogImage={reference.cover} jsonLd={[
      breadcrumbs([['Home', '/'], ['Service Areas', '/service-areas'], [`${area.city}, TX`, area.path]]), serviceSchema, faqSchema,
    ]} />
    <main id="main">
      <section className="area-city-hero"><div className="container">
        <AreaBreadcrumbs area={area} />
        <div className="area-city-hero-grid">
          <div><Eyebrow>Considered craft. A place of your own.</Eyebrow><h1>{t(area.h1)}</h1><p className="lead">{t(area.lead)}</p>
            <div className="area-hero-actions"><Link className="btn btn-dark" to="/ContactUs#quote-request">{t('Get a Quote')}<Icon name="arrow" size={18} /></Link><a className="text-link" href={SITE.phoneHref}><span dir="ltr">{SITE.phoneDisplay}</span></a></div>
          </div>
          <figure><img src={img(reference.cover, { w: 900, h: 900, fit: 'cover' })} srcSet={srcSet(reference.cover, [480, 720, 1000])} sizes="(max-width: 900px) 100vw, 38vw" width="900" height="900" alt={t(reference.title)} fetchpriority="high" /><figcaption>{t('From the studio portfolio. A design reference, not a claimed local installation.')}</figcaption></figure>
        </div>
        <p className="area-coverage-note">{t(coverageNotice)}</p>
      </div></section>
      <section className="section"><div className="container area-editorial">
        <article><Eyebrow>Your local project brief</Eyebrow><h2>{t(area.heading)}</h2>{area.paragraphs.map(paragraph => <p key={paragraph}>{t(paragraph)}</p>)}</article>
        <aside className="area-brief" aria-labelledby="area-brief-heading"><Icon name="pencil" size={30} /><h3 id="area-brief-heading">{t('Bring these to the conversation')}</h3><ul>{area.checklist.map(item => <li key={item}>{t(item)}</li>)}</ul><Link className="text-link" to="/Process">{t('Understand the process')}</Link></aside>
      </div></section>
      <section className="area-services-section"><div className="container">
        <div className="area-section-intro"><div><Eyebrow>From the brief to the build</Eyebrow><h2>{t('Woodworking to discuss for your space')}</h2></div><p>{t('Explore the relevant services, then ask the studio to confirm the scope that fits your project.')}</p></div>
        <div className="area-service-list">{area.services.map(([index, text], order) => <article key={index}><span className="area-index" aria-hidden="true">0{order + 1}</span><div><h3>{t(services[index].title)}</h3><p>{t(text)}</p><Link className="text-link" to={`/Services#service-${index + 1}`}>{t('Explore service details')}<Icon name="arrow" size={16} /></Link></div></article>)}</div>
      </div></section>
      <section className="section"><div className="container area-benefits-layout">
        <div><Eyebrow>A direct conversation with the studio</Eyebrow><h2>{t('A piece with your decisions built in.')}</h2><p>{t('Work from a clear brief, compare real material options and agree the details of your piece before moving forward.')}</p></div>
        <ul className="area-benefits">
          <li><Icon name="pencil" size={24} /><div><h3>{t('Designed around your use')}</h3><p>{t(area.checklist[0])}. {t('Your priorities give the design a practical starting point.')}</p></div></li>
          <li><Icon name="search" size={24} /><div><h3>{t('Materials you can discuss')}</h3><p>{t('Compare walnut, white oak and mixed hardwoods through actual studio work. Confirm samples and finish details for your own piece.')}</p><Link className="text-link" to="/Materials">{t('Explore the material guide')}</Link></div></li>
          <li><Icon name="tools" size={24} /><div><h3>{t('A defined project scope')}</h3><p>{t('Discuss dimensions, construction, hardware and site responsibilities together. Ask what is included before accepting a proposal.')}</p></div></li>
        </ul>
      </div></section>
      <section className="section area-project-section"><div className="container">
        <div className="section-head"><Eyebrow>Real work. Useful references.</Eyebrow><h2>{t('Explore the craft behind the conversation')}</h2><p>{t('Authentic Live Wood Studio projects, shown for design and material reference. Project locations are not attributed to this city.')}</p></div>
        <div className="project-grid">{area.gallery.map(index => <ProjectCard key={projects[index].slug} project={projects[index]} reveal={false} />)}</div>
        <Link className="text-link" to="/Gallery">{t('Explore the Full Portfolio')}<Icon name="arrow" size={18} /></Link>
      </div></section>
      <section className="section faq"><div className="container faq-inner">
        <div className="faq-intro"><Eyebrow>Before you enquire</Eyebrow><h2>{t('Questions for your project')}</h2><p>{t('Practical details to discuss before choosing dimensions, materials or a delivery date.')}</p></div>
        <div className="faq-list">{area.faqs.map(([q, a]) => <details key={q}><summary><h3>{t(q)}</h3><Icon name="plus" size={20} className="faq-icon" /></summary><p>{t(a)}</p></details>)}</div>
      </div></section>
      <section className="section area-nearby"><div className="container"><Eyebrow>Around Greater Houston</Eyebrow><h2>{t('Explore nearby project guides')}</h2><AreaLinks areas={area.nearby.map(areaByKey)} /><Link className="text-link" to="/service-areas">{t('View All Service Areas')}<Icon name="arrow" size={18} /></Link></div></section>
      <AreaContact />
    </main>
  </>;
}
