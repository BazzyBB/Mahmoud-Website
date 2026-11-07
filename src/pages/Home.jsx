import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import QuoteRequestForm from "../Components/QuoteRequestForm.jsx";
import HeroSlider from "../Components/HeroSlider.jsx";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead from "../Components/SEOHead.jsx";
import Icon from "../Components/Icons.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";
import { Eyebrow, StoryBanner } from "../Components/Section.jsx";
import { projects, services } from "../data/projects.js";
import { dedications, faqs, SITE, processSteps } from "../data/site.js";
import { img, srcSet } from "../utils/image.js";
import ContactActions from '../Components/ContactActions';
import HomepageServiceAreas from '../Components/ServiceAreaLinks';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Dedications() {
  const { t } = useLanguage();
  return (
    <section className="dedications" aria-labelledby="dedicated-heading">
      <div className="container">
        <h2 id="dedicated-heading" className="rule-heading"><span>{t("We Are Dedicated To")}</span></h2>
        <ul className="dedication-grid">
          {dedications.map((d) => (
            <li key={d.title} data-reveal>
              <Icon name={d.icon} size={40} strokeWidth={1.3} className="dedication-icon" />
              <h3>{t(d.title)}</h3>
              <p>{t(d.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { trackButtonClick } = useAnalytics();

  return (
    <>
      <SEOHead
        canonical="/"
        jsonLd={faqSchema}
      />
      <main id="main">
        <HeroSlider />
        <div className="craft-strip"><div className="container"><span>{t("HANDCRAFTED IN HOUSTON")}</span><span>{t("Natural hardwoods")}</span><span>{t("Made for your space")}</span><Link to="/Process">{t("From idea to heirloom")}</Link></div></div>

        <ContactActions />
        {/* SERVICES */}
        <section className="section services" aria-labelledby="services-heading">
          <div className="container">
            <div className="section-head" data-reveal>
              <Eyebrow>{t("What We Build")}</Eyebrow>
              <h2 id="services-heading">{t("Custom Woodworking Services in Greater Houston")}</h2>
              <p>{t(" From a single statement table to a full showroom fit-out, every piece is designed around your space and built by hand. ")}</p>
            </div>
            <div className="service-grid">
              {services.map((s) => (
                <article className="service-card" key={s.title} data-reveal>
                  <div className="service-img">
                    <img
                      src={img(s.image, { w: 600, h: 420, fit: "cover" })}
                      srcSet={srcSet(s.image, [300, 600, 900], { h: 420, fit: "cover" })}
                      sizes="(max-width: 980px) 110px, 220px"
                      alt={t(`${s.title} by Live Wood Studio, Houston`)}
                      loading="lazy"
                      width="600"
                      height="420"
                    />
                  </div>
                  <div className="service-body">
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* OUR WORK */}
        <section className="section work-preview" aria-labelledby="work-heading">
          <div className="container">
            <div className="section-head center" data-reveal>
              <Eyebrow center>{t("Our Work")}</Eyebrow>
              <h2 id="work-heading">{t("Custom Pieces, Lasting Impressions")}</h2>
              <p>{t("A selection of tables, cabinetry and display pieces we've designed and built in our Houston studio.")}</p>
            </div>
            <div className="project-grid">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="center mt-lg">
              <Link className="btn btn-dark" to="/Gallery" onClick={() => trackButtonClick("home_view_gallery", "/")}>{t(" Explore the Full Portfolio ")}<Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-split section" aria-labelledby="about-heading">
          <div className="container split">
            <figure className="split-media framed" data-reveal>
              <img
                src={img("/Assets/DS4.JPG", { w: 900, q: 75 })}
                srcSet={srcSet("/Assets/DS4.JPG", [480, 900, 1300])}
                sizes="(max-width: 900px) 100vw, 45vw"
                alt={t("Solid walnut diamond setting bench handcrafted by Live Wood Studio in Houston")}
                loading="lazy"
                width="900"
                height="675"
              />
            </figure>
            <div className="split-text" data-reveal>
              <Eyebrow>{t("About Us")}</Eyebrow>
              <h2 id="about-heading">{t("Custom Furniture, Handcrafted in Houston")}</h2>
              <p>{t(" At Live Wood Studio, our passion is crafting furniture that is as unique as the spaces they inhabit. Our ")}<strong>{t("custom woodworking in Houston")}</strong>{t(" brings your ideas to life, from a ")}<Link className="context-link" to="/Gallery/live-edge-walnut-epoxy-river-dining-table">{t("live-edge walnut dining table")}</Link>{t(" to ")}{t(' ')}<Link className="context-link" to="/Services#service-2">{t("custom cabinets and built-ins")}</Link>{t(". Every piece is made for your space, rather than selected from a catalog. ")}</p>
              <p>{t(" Every project begins with a conversation. We listen attentively to your ideas, preferences, and the ambiance you want to create. From there, our experienced artisans select the finest materials—celebrated for their natural beauty and durability—and bring your concept to life with precision and care. ")}</p>
              <Link className="text-link" to="/AboutUs">{t(" More about the studio ")}<Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </section>



        <Dedications />
        <section className="section home-process" aria-labelledby="home-process-heading"><div className="container">
          <Eyebrow>Our craftsmanship & process</Eyebrow><h2 id="home-process-heading">From your first idea to the final detail.</h2>
          <ol className="home-process-grid">{processSteps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
          <Link className="text-link" to="/Process">Explore our process</Link>
          <p className="home-workshop-link"><Link className="text-link" to="/AboutUs#inside-the-workshop">See how it’s made: inside the workshop</Link></p>
        </div></section>
        <StoryBanner />

        <section className="planning-band"><div className="container split">
          <div><Eyebrow>{t("Wood & finishes")}</Eyebrow><h2>{t("The right material.")}<br />{t("Your kind of character.")}</h2></div>
          <div><p>{t("Explore walnut, white oak and mixed hardwoods through our completed work. Find a starting point for the colors, grain and details of your own piece.")}</p><Link className="text-link" to="/Materials">{t("Explore the material guide ")}<Icon name="arrow" size={18} /></Link><br /><Link className="text-link" to="/Services">{t("View all services ")}<Icon name="arrow" size={18} /></Link></div>
        </div></section>

        {/* FAQ */}
        <section className="section faq" aria-labelledby="faq-heading">
          <div className="container faq-inner">
            <div className="faq-intro" data-reveal>
              <Eyebrow>{t("Questions")}</Eyebrow>
              <h2 id="faq-heading">{t("Frequently Asked Questions")}</h2>
              <p>{t(" Have something else in mind? Call us at ")}<a href={SITE.phoneHref}>{t(SITE.phoneDisplay)}</a>{t(" — we're happy to talk through your idea. ")}</p>
            </div>
            <div className="faq-list" data-reveal>
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    <h3>{t(f.q)}</h3>
                    <Icon name="plus" size={20} className="faq-icon" />
                  </summary>
                  <p>{t(f.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <HomepageServiceAreas />
        <section id="quick-quote" className="section quick-quote" aria-labelledby="quick-quote-heading">
          <div className="container quick-quote-layout">
            <div className="quick-quote-intro">
              <Eyebrow>Get a Custom Quote</Eyebrow>
              <h2 id="quick-quote-heading">{t("A custom piece.")}<br /><em>{t("A quick conversation.")}</em></h2>
              <p>{t("Request a quick quote for your table, cabinetry or display. Tell us what you have in mind and our Houston studio can discuss materials, dimensions and next steps with you.")}</p>
              <a className="text-link" href={SITE.phoneHref}>{t("Prefer to talk? ")}{t(SITE.phoneDisplay)}</a>
            </div>
            <QuoteRequestForm compact />
          </div>
        </section>

      </main>
    </>
  );
}
