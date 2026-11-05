import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icons";
import { navLinks, SITE } from "../data/site";
import { useAnalytics } from "../hooks/useAnalytics";

export default function Header() {
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
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container header-inner">
        <Logo />

        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : undefined)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a className="btn btn-outline nav-phone-mobile" href={SITE.phoneHref}>
            <Icon name="phone" size={18} /> {SITE.phoneDisplay}
          </a>
        </nav>

        <a
          className="header-phone"
          href={SITE.phoneHref}
          aria-label={`Call Live Wood Studio at ${SITE.phoneDisplay}`}
          onClick={() => trackButtonClick("header_phone")}
        >
          <Icon name="phone" size={18} />
          <span>{SITE.phoneDisplay}</span>
        </a>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
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
