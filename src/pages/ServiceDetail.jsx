import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import { Eyebrow, CtaBand } from '../Components/Section';
import ServiceCard from '../Components/ServiceCard';
import { getService } from '../data/woodworking-services';
import { getProject } from '../data/projects';
import { areaByKey } from '../data/service-areas';
import { SITE } from '../data/site';
import { img, srcSet } from '../utils/image';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;
  const project = getProject(service.project);
  const area = areaByKey(service.city);
  return <>
    <SEOHead canonical={service.path} ogImage={service.image} jsonLd={[breadcrumbs([['Home', '/'], ['Services', '/Services'], [service.title, service.path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${SITE.url}${service.path}#faq`, mainEntity: service.faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) }]} />
    <main id="main">
      <section className="area-city-hero service-landing-hero"><div className="container">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li><li><Link to="/Services">Services</Link></li><li aria-current="page">{service.title}</li></ol></nav>
        <div className="area-city-hero-grid"><div><Eyebrow>Made to order · Greater Houston</Eyebrow><h1>{service.h1}</h1><p className="lead">{service.summary}</p>
          <div className="area-hero-actions"><Link className="btn btn-dark" to="/ContactUs#quote-request">Request a Quote</Link><a className="text-link" href={SITE.phoneHref}>{SITE.phoneDisplay}</a></div>
        </div><figure><img src={img(service.image, { w: 1000 })} srcSet={srcSet(service.image, [480, 720, 1000])} sizes="(max-width: 760px) 100vw, 40vw" width="1000" height="800" alt={service.alt} fetchpriority="high" /><figcaption>{service.photoNote}</figcaption></figure></div>
      </div></section>
      <section className="section"><div className="container area-editorial"><article><Eyebrow>The details that make it yours</Eyebrow><h2>{service.heading}</h2><p>Plan <strong>{service.title.toLowerCase()} in Greater Houston</strong> with Live Wood Studio. Your room, intended use and material preferences guide the conversation.</p>{service.paragraphs.map(text => <p key={text}>{text}</p>)}</article>
        <aside className="area-brief"><h3>Your project brief</h3><ul>{service.choices.map(choice => <li key={choice}>{choice}</li>)}</ul><Link className="text-link" to="/ContactUs#quote-request">Discuss your requirements</Link></aside>
      </div></section>
      <section className="planning-band"><div className="container split"><div><Eyebrow>Photography from the portfolio</Eyebrow><h2>A useful starting point</h2></div><div><p>{service.photoNote} Explore the collection for more views and details, then tell us which elements suit your brief.</p><Link className="text-link" to={`/Gallery/${project.slug}`}>View {project.shortTitle}</Link></div></div></section>
      <section className="section"><div className="container area-editorial"><article><h2>Planning your {area.city} project</h2><p>For <strong>{service.title.toLowerCase()} in {area.city}, TX</strong>, start with {service.choices[0].toLowerCase()}. Include your project address and access photographs so measurements, delivery and installation can be discussed for the actual site.</p><p>Read our <Link className="context-link" to={area.path}>{area.city} project guide</Link> or explore <Link className="context-link" to="/service-areas">all Greater Houston service areas</Link>. The studio also serves surrounding communities; project scope and scheduling are confirmed through a direct conversation.</p></article><aside className="area-brief"><h3>From idea to proposal</h3><p>Compare <Link className="context-link" to="/Materials">wood and finish options</Link>, review the <Link className="context-link" to="/Process">design and build process</Link>, and share dimensions, budget range and timing. Agree materials, hardware and site responsibilities before work begins.</p></aside></div></section>
      <section className="section faq"><div className="container"><h2>Before you request a quote</h2>{service.faqs.map(faq => <details className="service-question" key={faq.q}><summary><h3>{faq.q}</h3></summary><p>{faq.a}</p></details>)}</div></section>
      <section className="section"><div className="container"><Eyebrow>Consider the whole space</Eyebrow><h2>Related woodworking services</h2><div className="woodworking-service-grid">{service.related.map(key => <ServiceCard service={getService(key)} key={key} />)}</div><Link className="text-link" to="/Services">Explore all 20 services</Link></div></section>
      <CtaBand />
    </main>
  </>;
}
