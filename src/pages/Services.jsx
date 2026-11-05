import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import { PageHero, Eyebrow, CtaBand } from '../Components/Section';
import { services, projects } from '../data/projects';
import { img } from '../utils/image';

const details = [
  { slug: projects[0].slug, choices: ['Dining, coffee & conference tables', 'Natural live edges or clean geometric forms', 'Wood species, dimensions & epoxy colors'] },
  { slug: projects[1].slug, choices: ['Cabinets, shelving & built-ins', 'Storage designed for your room', 'Material, finish & hardware selection'] },
  { slug: projects[5].slug, choices: ['Jewelry showcases & retail display tables', 'Tempered glass & integrated lighting', 'Individual fixtures or showroom casework'] },
  { slug: projects[2].slug, choices: ['Solid walnut work surfaces', 'Adjustable-height workstation layouts', 'Catch trays, storage & dust collection'] },
];

export default function Services() {
  return <>
    <SEOHead canonical="/Services" jsonLd={breadcrumbs([['Home', '/'], ['Services', '/Services']])} />
    <main id="main">
      <PageHero eyebrow="Our Services" title="Custom Woodworking & Cabinets in Dallas" intro="Furniture, cabinetry and specialist workstations. Designed for your space, handcrafted in Dallas." image="/Assets/JS2.JPG" />
      <section className="section"><div className="container service-details">
        {services.map((service, i) => <article className="service-detail" id={`service-${i + 1}`} key={service.title}>
          <img src={img(service.image, { w: 900 })} alt={service.title} loading="lazy" width="900" height="720" />
          <div className="service-detail-copy">
            <Eyebrow>0{i + 1} / Made to order</Eyebrow>
            <h2>{service.title}</h2><p>{service.text}</p>
            <ul className="service-options">{details[i].choices.map(c => <li key={c}>{c}</li>)}</ul>
            <Link className="text-link" to={`/Gallery/${details[i].slug}`}>{projects.find(p => p.slug === details[i].slug).shortTitle} <span aria-hidden="true">↗</span></Link>
          </div>
        </article>)}
      </div></section>
      <section className="planning-band"><div className="container split">
        <div><Eyebrow>Before we begin</Eyebrow><h2>A little preparation.<br />A better starting point.</h2></div>
        <div><p>For <strong>made-to-order furniture and cabinetry</strong>, bring your approximate dimensions, a few inspiration photos, how you plan to use the piece, and your preferred budget and timing. We can discuss materials and the details together.</p><div className="planning-links"><Link className="text-link" to="/Materials">Explore materials ↗</Link><Link className="text-link" to="/Process">Understand the process ↗</Link></div></div>
      </div></section>
      <CtaBand />
    </main>
  </>;
}
