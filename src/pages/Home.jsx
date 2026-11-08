import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import QuoteRequestForm from "../Components/QuoteRequestForm.jsx";
import HeroSlider from "../Components/HeroSlider.jsx";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead from "../Components/SEOHead.jsx";
import Icon from "../Components/Icons.jsx";
import { Eyebrow, StoryBanner } from "../Components/Section.jsx";
import { featuredProjects, services } from "../data/projects.js";
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
        ogImage="/Assets/residential/kitchen-wide.jpg"
        jsonLd={faqSchema}
      />
      <main id="main">
        <HeroSlider />
        <div className="craft-strip"><div className="container"><span>{t("HANDCRAFTED IN HOUSTON")}</span><span>{t("Natural hardwoods")}</span><span>{t("Made for your space")}</span><Link to="/Process">{t("From idea to heirloom")}</Link></div></div>

        <ContactActions />
        {/* PHOTO GALLERY */}
        <section id="home-gallery" className="section home-gallery" aria-labelledby="home-gallery-heading">
          <div className="container">
            <div className="home-gallery-heading" data-reveal>
              <div>
                <Eyebrow>{t("Our Work")}</Eyebrow>
                <h2 id="home-gallery-heading">{t("Wood. Detail.")}<br /><em>{t("A space of your own.")}</em></h2>
              </div>
              <div className="home-gallery-intro">
                <p>{t("A closer look at our cabinetry, furniture and the details that bring a room together. Explore a few pieces from our portfolio.")}</p>
                <Link className="text-link" to="/Gallery" onClick={() => trackButtonClick("home_view_gallery", "/")}>
                  {t("Explore the Full Portfolio")} <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
            <div className="home-gallery-grid">
              {featuredProjects.map((project, index) => (
                <Link key={project.slug} to={`/Gallery/${project.slug}`} className="home-gallery-tile">
                  <figure>
                    <img
                      src={img(project.cover, { w: index === 0 ? 1000 : 700, q: 80 })}
                      srcSet={srcSet(project.cover, [400, 700, 1000], { q: 80 })}
                      sizes={index === 1 || index === 2 ? "(max-width: 600px) 100vw, (max-width: 980px) 40vw, 25vw" : "(max-width: 600px) 100vw, (max-width: 980px) 60vw, 50vw"}
                      alt={t(project.imageAlts?.[0] || `${project.shortTitle} by Live Wood Studio, Houston`)}
                      loading="lazy"
                      decoding="async"
                      width="1000"
                      height="800"
                    />
                    <figcaption>
                      <span className="home-gallery-caption"><span className="home-gallery-tag">{t(project.tag)}</span><span className="home-gallery-title">{t(project.shortTitle)}</span></span>
                      <span className="home-gallery-arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
            <div className="home-gallery-footer">
              <span>{t("Natural materials. Thoughtful details. Made for your space.")}</span>
              <Link className="text-link" to="/Gallery">{t("View all projects")} <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section services" aria-labelledby="services-heading">
          <div className="container">
            <div className="section-head" data-reveal>
              <Eyebrow>{t("What We Build")}</Eyebrow>
              <h2 id="services-heading">{t("Custom Woodworking Services in Greater Houston")}</h2>
              <p>{t(" Live Wood Studio creates custom wood furniture and cabinetry in Houston, TX. From a statement dining table to a fitted room or showroom, start with your space and how you use it. ")}</p>
            </div>
            <p className="service-home-links">Plan <Link className="context-link" to="/Services/custom-kitchens">custom kitchens</Link>, <Link className="context-link" to="/Services/libraries-custom-built-ins">libraries and built-ins</Link> or <Link className="context-link" to="/Services/outdoor-kitchens">outdoor kitchens</Link> with our <strong>Houston custom woodworking studio</strong>. For <strong>custom wood furniture in Houston</strong>, compare <Link className="context-link" to="/Services/live-edge-tables">live-edge dining tables</Link> and <Link className="context-link" to="/Services/epoxy-tables">epoxy river tables</Link>. Explore <Link className="context-link" to="/Services">all 20 services</Link> for your next project.</p>
            <div className="service-grid">
              {services.map((s, i) => (
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
                    <h3><Link to={["/Services/live-edge-tables", "/Services/custom-cabinets-closets", "/Services/custom-showcases", "/Services#service-4", "/Gallery", "/Services"][i]}>{t(s.title)}</Link></h3>
                    <p>{t(s.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-split section" aria-labelledby="about-heading">
          <div className="container split">
            <figure className="split-media framed" data-reveal>
              <img
                src={img("/Assets/residential/built-in-bench.jpg", { w: 900, q: 80 })}
                srcSet={srcSet("/Assets/residential/built-in-bench.jpg", [480, 900, 1300], { q: 80 })}
                sizes="(max-width: 900px) 100vw, 45vw"
                alt={t("Natural wood built-in cabinetry framing an olive green upholstered bench")}
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
