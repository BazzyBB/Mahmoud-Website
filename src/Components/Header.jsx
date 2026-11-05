import { useLanguage } from "../i18n/LanguageContext";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LocalizedNavLink as NavLink } from "../i18n/LanguageContext";
import Logo from "./Logo";
import Icon from "./Icons";
import { navLinks, SITE } from "../data/site";
import { useAnalytics } from "../hooks/useAnalytics";

export default function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { trackButtonClick } = useAnalytics();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (event.key === "Escape") { setOpen(false); document.querySelector(".menu-toggle")?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} role="banner">
      <a className="skip-link" href="#main">{t("Skip to content")}</a>
      <div className="container header-inner">
        <Logo />

        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label={t("Main navigation")}>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : undefined)}>
                  {t(l.label)}
                </NavLink>
              </li>
            ))}

          </ul>
          <a className="btn btn-outline nav-phone-mobile" href={SITE.phoneHref}>
            <Icon name="phone" size={18} /> {t(SITE.phoneDisplay)}
          </a>
        </nav>

        <NavLink className="btn btn-primary header-quote" to="/ContactUs#quote-request">Get a Quote</NavLink>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={t(open ? "Close navigation menu" : "Open navigation menu")}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          <span /><span /><span />
        </button>
      </div>
      {open && <div className="menu-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}
