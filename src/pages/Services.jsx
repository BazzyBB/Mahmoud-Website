import { useLanguage } from "../i18n/LanguageContext";
import React from 'react';
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import { PageHero, Eyebrow, CtaBand } from '../Components/Section';
import { services, projects } from '../data/projects';
import { img, srcSet } from '../utils/image';

const details = [
  { slug: projects[0].slug, choices: ['Dining, coffee & conference tables', 'Natural live edges or clean geometric forms', 'Wood species, dimensions & epoxy colors'] },
  { slug: projects[1].slug, choices: ['Cabinets, shelving & built-ins', 'Storage designed for your room', 'Material, finish & hardware selection'] },
  { slug: projects[5].slug, choices: ['Jewelry showcases & retail display tables', 'Tempered glass & integrated lighting', 'Individual fixtures or showroom casework'] },
  { slug: projects[2].slug, choices: ['Solid walnut work surfaces', 'Adjustable-height workstation layouts', 'Catch trays, storage & dust collection'] },
  { slug: projects[3].slug, choices: ['Coffee, dining and accent furniture', 'Dimensions tailored to your space', 'Hardwood and finish selection'] },
  { slug: projects[4].slug, choices: ['Original designs and distinctive materials', 'A brief built around your idea', 'Construction and care discussed together'] },
];

export default function Services() {
  const { t } = useLanguage();
  return <>
    <SEOHead canonical="/Services" jsonLd={breadcrumbs([['Home', '/'], ['Services', '/Services']])} />
    <main id="main">
      <PageHero eyebrow="Our Services" title={t("Custom Woodworking & Cabinets in Houston")} intro="Furniture, cabinetry and specialist workstations. Designed for your space, handcrafted in Houston." image="/Assets/JS2.JPG" />
      <section className="section"><div className="container service-details">
        {services.map((service, i) => <article className="service-detail" id={`service-${i + 1}`} key={service.title}>
          <img src={img(service.image, { w: 900 })} srcSet={srcSet(service.image, [480, 900, 1300])} sizes="(max-width: 980px) 100vw, 50vw" alt={t(service.title)} loading="lazy" width="900" height="720" />
          <div className="service-detail-copy">
            <Eyebrow>0{t(i + 1)}{t(" / Made to order")}</Eyebrow>
            <h2>{t(service.title)}</h2><p>{t(service.text)}</p>
            <ul className="service-options">{details[i].choices.map(c => <li key={c}>{t(c)}</li>)}</ul>
            <Link className="text-link" to={`/Gallery/${details[i].slug}`}>{t(projects.find(p => p.slug === details[i].slug).shortTitle)}</Link>
          </div>
        </article>)}
      </div></section>
      <section className="planning-band"><div className="container split">
        <div><Eyebrow>{t("Before we begin")}</Eyebrow><h2>{t("A little preparation.")}<br />{t("A better starting point.")}</h2></div>
        <div><p>{t("For ")}<strong>{t("made-to-order furniture and cabinetry")}</strong>{t(", bring your approximate dimensions, a few inspiration photos, how you plan to use the piece, and your preferred budget and timing. We can discuss materials and the details together.")}</p><div className="planning-links"><Link className="text-link" to="/Materials">{t("Explore materials")}</Link><Link className="text-link" to="/Process">{t("Understand the process")}</Link></div></div>
      </div></section>
      <CtaBand />
    </main>
  </>;
}
