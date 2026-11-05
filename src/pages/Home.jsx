import React from "react";
import QuoteRequestForm from "../Components/QuoteRequestForm.jsx";
import HeroSlider from "../Components/HeroSlider.jsx";
import { Link } from "react-router-dom";
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead from "../Components/SEOHead.jsx";
import Icon from "../Components/Icons.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";
import { Eyebrow, StoryBanner, CtaBand } from "../Components/Section.jsx";
import { projects, services } from "../data/projects.js";
import { dedications, faqs, SITE } from "../data/site.js";
import { img, srcSet } from "../utils/image.js";

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
  return (
    <section className="dedications" aria-labelledby="dedicated-heading">
      <div className="container">
        <h2 id="dedicated-heading" className="rule-heading"><span>We Are Dedicated To</span></h2>
        <ul className="dedication-grid">
          {dedications.map((d) => (
            <li key={d.title} data-reveal>
              <Icon name={d.icon} size={40} strokeWidth={1.3} className="dedication-icon" />
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { trackButtonClick } = useAnalytics();

  return (
    <>
      <SEOHead
        canonical="/"
        jsonLd={faqSchema}
      />
      <main id="main">
        <HeroSlider />
        <div className="craft-strip"><div className="container"><span>HANDCRAFTED IN DALLAS</span><span>Natural hardwoods</span><span>Made for your space</span><Link to="/Process">From idea to heirloom ↗</Link></div></div>

        <section id="quick-quote" className="section quick-quote" aria-labelledby="quick-quote-heading">
          <div className="container quick-quote-layout">
            <div className="quick-quote-intro">
              <Eyebrow>Your idea starts here</Eyebrow>
              <h2 id="quick-quote-heading">A custom piece.<br /><em>A quick conversation.</em></h2>
              <p>Request a quick quote for your table, cabinetry or display. Tell us what you have in mind and our Dallas studio can discuss materials, dimensions and next steps with you.</p>
              <a className="text-link" href={SITE.phoneHref}>Prefer to talk? {SITE.phoneDisplay} ↗</a>
            </div>
            <QuoteRequestForm compact />
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
                alt="Solid walnut diamond setting bench handcrafted by Live Wood Studio in Dallas"
                loading="lazy"
                width="900"
                height="675"
              />
            </figure>
            <div className="split-text" data-reveal>
              <Eyebrow>About Us</Eyebrow>
              <h2 id="about-heading">Custom Furniture, Handcrafted in Dallas</h2>
              <p>
                At Live Wood Studio, our passion is crafting furniture that is as unique as the spaces they
                inhabit. Our <strong>custom woodworking in Dallas</strong> brings your ideas to life,
                from a <Link className="context-link" to="/Gallery/live-edge-walnut-epoxy-river-dining-table">live-edge walnut dining table</Link> to
                {' '}<Link className="context-link" to="/Services#service-2">custom cabinets and built-ins</Link>.
                Every piece is made for your space, rather than selected from a catalog.
              </p>
              <p>
                Every project begins with a conversation. We listen attentively to your ideas, preferences,
                and the ambiance you want to create. From there, our experienced artisans select the finest
                materials—celebrated for their natural beauty and durability—and bring your concept to life
                with precision and care.
              </p>
              <Link className="text-link" to="/AboutUs">
                More about the studio <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </section>

        <Dedications />

        {/* OUR WORK */}
        <section className="section work-preview" aria-labelledby="work-heading">
          <div className="container">
            <div className="section-head center" data-reveal>
              <Eyebrow center>Our Work</Eyebrow>
              <h2 id="work-heading">Custom Pieces, Lasting Impressions</h2>
              <p>A selection of tables, cabinetry and display pieces we've designed and built in our Dallas studio.</p>
            </div>
            <div className="project-grid">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="center mt-lg">
              <Link className="btn btn-dark" to="/Gallery" onClick={() => trackButtonClick("home_view_gallery", "/")}>
                Explore the Full Portfolio <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <StoryBanner />

        {/* SERVICES */}
        <section className="section services" aria-labelledby="services-heading">
          <div className="container">
            <div className="section-head" data-reveal>
              <Eyebrow>What We Build</Eyebrow>
              <h2 id="services-heading">Custom Woodworking Services in Dallas–Fort Worth</h2>
              <p>
                From a single statement table to a full showroom fit-out, every piece is designed around your
                space and built by hand.
              </p>
            </div>
            <div className="service-grid">
              {services.map((s) => (
                <article className="service-card" key={s.title} data-reveal>
                  <div className="service-img">
                    <img
                      src={img(s.image, { w: 600, h: 420, fit: "cover" })}
                      alt={`${s.title} by Live Wood Studio, Dallas`}
                      loading="lazy"
                      width="600"
                      height="420"
                    />
                  </div>
                  <div className="service-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="planning-band"><div className="container split">
          <div><Eyebrow>Wood &amp; finishes</Eyebrow><h2>The right material.<br />Your kind of character.</h2></div>
          <div><p>Explore walnut, white oak and mixed hardwoods through our completed work. Find a starting point for the colors, grain and details of your own piece.</p><Link className="text-link" to="/Materials">Explore the material guide <Icon name="arrow" size={18} /></Link><br /><Link className="text-link" to="/Services">View all services <Icon name="arrow" size={18} /></Link></div>
        </div></section>

        {/* FAQ */}
        <section className="section faq" aria-labelledby="faq-heading">
          <div className="container faq-inner">
            <div className="faq-intro" data-reveal>
              <Eyebrow>Questions</Eyebrow>
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              <p>
                Have something else in mind? Call us at <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> — we're
                happy to talk through your idea.
              </p>
            </div>
            <div className="faq-list" data-reveal>
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    <h3>{f.q}</h3>
                    <Icon name="plus" size={20} className="faq-icon" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaBand onClick={() => trackButtonClick("cta_contact", "/")} />
      </main>
    </>
  );
}
