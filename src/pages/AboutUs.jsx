import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead, { breadcrumbs } from "../Components/SEOHead.jsx";
import Icon from "../Components/Icons.jsx";
import { Eyebrow, PageHero, StoryBanner, CtaBand } from "../Components/Section.jsx";
import { Dedications } from "./Home.jsx";
import { img, srcSet } from "../utils/image.js";

const materials = ["American black walnut", "White oak", "Red oak", "Hard maple", "Cherry", "Mahogany", "Metallic & clear epoxy", "Tempered glass & LED"];

const workshopPhotos = [
  {
    image: "/Assets/workshop-slab-preparation.jpg",
    width: 1208, height: 1596,
    title: "Preparing the slab",
    text: "A slab on the router sled, with its natural grain and openings still visible before the surface is finished.",
    alt: "Wood slab beneath a router sled on the workshop bench, showing natural grain and openings",
  },
  {
    image: "/Assets/workshop-base-assembly.jpg",
    width: 1290, height: 947,
    title: "Shaping the base",
    text: "A sculpted wooden base takes shape on the bench, showing the curved supports and angled brace up close.",
    alt: "Unfinished wooden table base with curved supports and an angled brace on a workshop bench",
  },
  {
    image: "/Assets/workshop-epoxy-tabletop.jpg",
    width: 1271, height: 952,
    title: "The surface detail",
    text: "Dark epoxy follows the wood’s natural openings, while the finished surface brings out the depth of the grain.",
    alt: "Finished wood tabletop with dark epoxy inlays resting on a padded workshop bench",
  },
];

export default function AboutUs() {
  const { t } = useLanguage();
  const { trackButtonClick } = useAnalytics();

  return (
    <>
      <SEOHead
        canonical="/AboutUs"
        jsonLd={breadcrumbs([["Home", "/"], ["About Us", "/AboutUs"]])}
      />
      <main id="main">
        <PageHero
          eyebrow="About Us"
          title={t("Your Custom Woodworking Studio in Houston")}
          intro="A Houston woodworking studio devoted to bespoke pieces—made to order, built by hand, and designed around you."
          image="/Assets/walnut-epoxy-river-table-6.jpg"
        />

        <section className="section about-split">
          <div className="container split">
            <div className="split-text" data-reveal>
              <Eyebrow>{t("Our Story")}</Eyebrow>
              <h2>{t("Our Passion, Your Vision")}</h2>
              <p>{t(" At Live Wood Studio, our passion is crafting furniture that is as unique as the spaces they inhabit. We specialize in custom woodworking, tailoring each piece to your distinctive vision. Our ")}<strong>{t("Houston woodworking studio")}</strong>{t(" makes ")}{t(' ')}<Link className="context-link" to="/Gallery">{t("custom tables, cabinetry and display furniture")}</Link>{t(". Explore our ")}<Link className="context-link" to="/Services">{t("woodworking services")}</Link>{t(" to find the right starting point for your space. ")}</p>
              <p>{t(" Every project begins with a conversation. We listen attentively to your ideas, preferences, and the ambiance you want to create. From there, our experienced artisans select the finest materials—celebrated for their natural beauty and durability—and bring your concept to life with precision and care. ")}</p>
              <p>Based in Houston, we work with homeowners, interior designers, jewelers and retailers across Greater Houston. Explore our <Link className="context-link" to="/service-areas">local service-area guides</Link>, from <Link className="context-link" to="/service-areas/cypress-tx">Cypress</Link> to <Link className="context-link" to="/service-areas/league-city-tx">League City</Link>, for practical advice on preparing your project.</p>
            </div>
            <figure className="split-media framed stacked" data-reveal>
              <img
                src={img("/Assets/mixed-hardwood-mosaic-table-3.jpg", { w: 900 })}
                srcSet={srcSet("/Assets/mixed-hardwood-mosaic-table-3.jpg", [480, 900, 1300])}
                sizes="(max-width: 900px) 100vw, 45vw"
                alt={t("Mixed hardwood mosaic epoxy table detail by Live Wood Studio")}
                loading="lazy"
                width="900"
                height="675"
              />
            </figure>
          </div>
        </section>

        <section id="inside-the-workshop" className="section workshop-story" aria-labelledby="workshop-heading">
          <div className="container">
            <div className="workshop-heading" data-reveal>
              <div>
                <Eyebrow>Inside the Workshop</Eyebrow>
                <h2 id="workshop-heading">The craft behind the finished piece.</h2>
              </div>
              <p>A closer look at our workbench: slab preparation, a sculpted base and an epoxy tabletop. These workshop details show the work that goes into custom wood furniture.</p>
            </div>
            <div className="workshop-grid">
              {workshopPhotos.map((photo, index) => (
                <figure className="workshop-photo" key={photo.image} data-reveal>
                  <a href={photo.image} aria-label={`View full photo: ${photo.title}`}>
                    <img
                      src={img(photo.image, { w: 1000 })}
                      srcSet={srcSet(photo.image, [480, 800, 1200])}
                      sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) calc((100vw - 100px) / 2), 600px"
                      alt={photo.alt} width={photo.width} height={photo.height}
                      loading="lazy" decoding="async"
                    />
                    <span className="workshop-view">View full photo</span>
                  </a>
                  <figcaption>
                    <span className="workshop-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{photo.title}</h3><p>{photo.text}</p></div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link className="text-link" to="/Gallery">See the finished projects</Link>
          </div>
        </section>

        <Dedications />

        <section className="section materials" aria-labelledby="materials-heading">
          <div className="container split">
            <figure className="split-media framed" data-reveal>
              <img
                src={img("/Assets/walnut-epoxy-river-table-3.jpg", { w: 900 })}
                srcSet={srcSet("/Assets/walnut-epoxy-river-table-3.jpg", [480, 900, 1300])}
                sizes="(max-width: 900px) 100vw, 45vw"
                alt={t("Close-up of walnut slab and metallic epoxy river")}
                loading="lazy"
                width="900"
                height="675"
              />
            </figure>
            <div className="split-text" data-reveal>
              <Eyebrow>{t("Materials")}</Eyebrow>
              <h2 id="materials-heading">{t("Chosen for Beauty, Built for Generations")}</h2>
              <p>{t(" We work with premium North American hardwoods and finish them to highlight their natural grain and character—then pair them with epoxy, glass, metal and lighting when a design calls for it. ")}</p>
              <ul className="chip-list">
                {materials.map((m) => <li key={m}>{t(m)}</li>)}
              </ul>
              <Link className="text-link" to="/Process">{t("See how we work ")}<Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </section>

        <StoryBanner />
        <CtaBand onClick={() => trackButtonClick("contact_us_about", "/AboutUs")} />
      </main>
    </>
  );
}
