import { useLanguage } from "../i18n/LanguageContext";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Icon from "./Icons";
import { SITE } from "../data/site";

// Fades sections in as they scroll into view. Elements opt in with data-reveal.
function useReveal(pathname) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => { el.classList.add("reveal-pending"); io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);
}

export default function Layout() {
  const { t, language } = useLanguage();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useReveal(pathname);

  return (
    <div className="site-wrapper" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <Outlet />
      <Footer />
      <a
        className="floating-call"
        href={SITE.phoneHref}
        aria-label={t(`Call Live Wood Studio at ${SITE.phoneDisplay}`)}
      >
        <Icon name="phone" size={27} strokeWidth={1.8} />
        <span className="floating-call-label">{t("Call us · ")}{t(SITE.phoneDisplay)}</span>
      </a>
    </div>
  );
}
