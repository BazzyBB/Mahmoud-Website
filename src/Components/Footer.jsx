import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icons";
import { navLinks, SITE } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <Logo />
          <div className="footer-contact">
            <a href={SITE.phoneHref}><Icon name="phone" size={20} /> {SITE.phoneDisplay}</a>
            <Link to="/ContactUs"><Icon name="mail" size={20} /> Contact Us</Link>
            <span className="footer-area"><Icon name="pin" size={20} /> Dallas–Fort Worth, Texas</span>
          </div>
        </div>
        <p className="footer-blurb">
          Live Wood Studio is a custom woodworking studio in Dallas, TX building live-edge tables,
          epoxy river tables, custom cabinets, jewelry display cases and diamond setting benches for
          homes and businesses across {SITE.serviceAreas.slice(0, -1).join(", ")} and {SITE.serviceAreas.at(-1)}.
        </p>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Live Wood Studio. All rights reserved.</span>
          <nav aria-label="Footer navigation">
            <ul>
              {navLinks.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
