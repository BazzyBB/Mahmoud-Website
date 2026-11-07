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
