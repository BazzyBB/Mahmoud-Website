import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import Logo from "./Logo";
import Icon from "./Icons";
import { navLinks, SITE } from "../data/site";
import { areaGroups, areaByKey } from '../data/service-areas';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <Logo />
          <div className="footer-contact">
            <a href={SITE.phoneHref}><Icon name="phone" size={20} /> {t(SITE.phoneDisplay)}</a>
            <Link to="/ContactUs"><Icon name="mail" size={20} />{t(" Contact Us")}</Link>
            <span className="footer-area"><Icon name="pin" size={20} />{t(" Dallas–Fort Worth, Texas")}</span>
          </div>
        </div>
        <p className="footer-blurb">{t(" Live Wood Studio is a custom woodworking studio in Dallas, TX building live-edge tables, epoxy river tables, custom cabinets, jewelry display cases and diamond setting benches for homes and businesses across ")}{t(SITE.serviceAreas.slice(0, -1).join(", "))}{t(" and ")}{t(SITE.serviceAreas.at(-1))}.
        </p>
        <nav className="footer-service-areas" aria-label={t('Primary service area guides')}>
          <div><h2>{t('Service Areas')}</h2><Link className="footer-area-all" to="/service-areas">{t('View All Service Areas')} ↗</Link></div>
          <ul>{areaGroups[0].cities.map(key => { const area = areaByKey(key); return <li key={key}><Link to={area.path}>{area.city}, TX</Link></li>; })}</ul>
        </nav>
        <div className="footer-bottom">
          <span>&copy; {t(new Date().getFullYear())}{t(" Live Wood Studio. All rights reserved.")}</span>
          <nav aria-label={t("Footer navigation")}>
            <ul>
              {navLinks.map((l) => (
                <li key={l.to}><Link to={l.to}>{t(l.label)}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="footer-credit" lang="en" dir="ltr">
          Crafted with care by <a href="https://htxgrowth.com" target="_blank" rel="noopener noreferrer">HTX Growth</a>
        </p>
      </div>
    </footer>
  );
}
