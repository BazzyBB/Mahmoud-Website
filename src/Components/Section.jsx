import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import { useLocation } from "react-router-dom";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { navLinks } from "../data/site";
import { projects } from "../data/projects";
import Icon from "./Icons";
import { img } from "../utils/image";

export function Eyebrow({ children, center }) {
  const { t } = useLanguage();
  return <p className={`eyebrow ${center ? "eyebrow-center" : ""}`}>{t(children)}</p>;
}

export function PageHero({ eyebrow, title, intro, image }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const project = projects.find(p => pathname === `/Gallery/${p.slug}`);
  const label = project?.shortTitle || navLinks.find(l => l.to === pathname)?.label || eyebrow;
  return (
    <section className="page-hero" style={image ? { "--hero-img": `url("${img(image, { w: 1800, q: 70 })}")` } : undefined}>
      <div className="container page-hero-inner">
        <nav className="breadcrumb-nav" aria-label={t("Breadcrumb")}><ol><li><Link to="/">{t("Home")}</Link></li>{project && <li><Link to="/Gallery">{t("Our Work")}</Link></li>}<li aria-current="page">{t(label)}</li></ol></nav>
        <Eyebrow>{t(eyebrow)}</Eyebrow>
        <h1>{t(title)}</h1>
        {intro && <p className="lead">{t(intro)}</p>}
      </div>
    </section>
  );
}

export function StoryBanner() {
  const { t } = useLanguage();
  return (
    <section className="story-banner" style={{ "--banner-img": `url("${img("/Assets/Background.jpg", { w: 2000, q: 70 })}")` }}>
      <div className="container story-banner-inner" data-reveal>
        <p>{t(" Whether you're furnishing a cozy reading nook, upgrading a living room, or designing a statement piece, we're committed to delivering furniture that not only fits your space—but becomes a part of your story. ")}</p>
        <p className="story-quote">{t("Let's make something extraordinary—just for you.")}</p>
      </div>
    </section>
  );
}

export function CtaBand({ onClick }) {
  const { t } = useLanguage();
  return (
    <section className="cta-band" aria-labelledby="cta-heading">
      <div className="container cta-inner" data-reveal>
        <div>
          <p className="cta-kicker">{t("Ready to start your custom project?")}</p>
          <h2 id="cta-heading">{t("Let's bring your vision to life.")}</h2>
        </div>
        <Link className="btn btn-primary" to="/ContactUs#quote-request" onClick={onClick}>
          <Icon name="mail" size={18} />{t(" Get a Quote ")}</Link>
      </div>
    </section>
  );
}
