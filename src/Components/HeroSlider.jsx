import { useLanguage } from "../i18n/LanguageContext";
import React, { useEffect, useRef, useState } from 'react';
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { img, srcSet } from '../utils/image';
import { getProject } from '../data/projects';

function getSlides(t) { return [
  { project: getProject('natural-wood-kitchen-cabinetry'), label: 'Kitchens', category: 'Custom Kitchen Cabinetry', image: '/Assets/residential/kitchen-wide.jpg', position: '62% center', title: <>Custom Woodworking & Furniture<br /><em>in Houston, TX</em></>, text: 'Custom kitchens, built-in cabinets, live-edge tables and retail displays. Woodwork designed around your space, from the first idea to the final detail.', link: 'Explore kitchen cabinetry' },
  { project: getProject('hallway-library-shelving'), label: 'Built-ins', category: 'Built-in Cabinets & Shelving', image: '/Assets/residential/hallway-library.jpg', position: '40% center', title: <>{t("A place for everything.")}<br /><em>{t("Made for your home.")}</em></>, text: 'Libraries, fitted cabinets, floating shelves and seating with storage. Turn an unused wall into a useful, considered part of your home.', link: 'Explore built-in storage' },
  { project: getProject('live-edge-walnut-epoxy-river-dining-table'), label: 'Tables', category: 'Live-edge & Epoxy Tables', image: '/Assets/walnut-epoxy-river-table-1.jpg', position: 'center', alt: 'Handcrafted walnut dining table with a dark epoxy river and sculpted wood base', title: <>{t("Distinctive grain.")}<br /><em>{t("A table of your own.")}</em></>, text: 'Live-edge walnut, expressive hardwoods and epoxy details. Explore custom dining and statement tables built around the character of the wood.', link: 'Explore custom tables' },
  { project: getProject('custom-jewelry-display-cabinet-system'), label: 'Retail', category: 'Retail Displays & Showcases', image: '/Assets/jewelry-display-cabinets-1.jpg', position: '65% center', title: <>{t("Let your products shine.")}<br /><em>{t("We build the setting.")}</em></>, text: 'Custom jewelry showcases, display cabinets and retail furniture. Thoughtful woodwork that presents your products and supports your everyday work.', link: 'Explore retail displays' },
]; }

export default function HeroSlider() {
  const { t } = useLanguage();
  const slides = getSlides(t);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touch = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused || hovered || reduced) return;
    const timer = setInterval(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, hovered, reduced, active]);
  const move = delta => { setActive(i => (i + delta + slides.length) % slides.length); setPaused(true); };
  return <section className="hero hero-showcase" aria-roledescription="carousel" aria-label={t("Handcrafted projects")}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setHovered(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false); }}
    onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}
    onTouchStart={e => { touch.current = e.touches[0].clientX; }}
    onTouchEnd={e => { if (touch.current !== null) { const delta = touch.current - e.changedTouches[0].clientX; if (Math.abs(delta) > 50) move(delta > 0 ? 1 : -1); } touch.current = null; }}>
    {slides.map((slide, i) => <div className={`hero-slide ${i === active ? 'is-active' : ''}`} key={slide.image} aria-hidden={i !== active} inert={i !== active ? '' : undefined} aria-roledescription="slide" aria-label={t(`${i + 1} of ${slides.length}`)}>
      <div className="hero-visual">{(i === 0 || i === active) && <img loading="eager" width="1920" height="1280" className="hero-photo" style={{ objectPosition: slide.position }} src={img(slide.image, { w: 1920, q: 80 })} srcSet={srcSet(slide.image, [640, 800, 960, 1200, 1600, 1920], { q: 80 })} sizes="100vw" alt={t(slide.alt || slide.project.imageAlts?.[0] || slide.project.title)} fetchpriority={i === 0 ? 'high' : 'low'} />}</div>
      <div className="hero-shade" />
      <div className="container hero-inner">
        <p className="eyebrow">{t(slide.category)}<span className="hero-location">{t("Houston, TX")}</span></p>
        {i === 0 ? <h1>{t(slide.title)}</h1> : <h2 className="hero-title">{t(slide.title)}</h2>}
        <p className="lead">{t(slide.text)}</p>
        <div className="hero-actions"><Link to="/ContactUs#quote-request" className="btn btn-primary" tabIndex={i === active ? 0 : -1}>{t("Get a Quote")}</Link><Link to={`/Gallery/${slide.project.slug}`} className="hero-work-link" tabIndex={i === active ? 0 : -1}>{t(slide.link)}{' '}<span>→</span></Link></div>
      </div>
    </div>)}
    <div className="container hero-bottom">
      <div className="slide-pagination" aria-label={t("Choose a slide")}>{slides.map((s, i) => <button key={s.image} className={i === active ? 'active' : ''} aria-label={t(`Show ${s.project.shortTitle}`)} aria-current={i === active ? 'true' : undefined} onClick={() => { setActive(i); setPaused(true); }}><span className="slide-number">0{t(i + 1)}</span><span className="slide-label">{t(s.label)}</span><i /></button>)}</div>
      <div className="slider-controls"><span className="slider-caption">{t("Made to order. Made to last.")}</span><button aria-label={t("Previous slide")} onClick={() => move(-1)}>←</button><button aria-label={t(paused || reduced ? 'Play slideshow' : 'Pause slideshow')} onClick={() => { if (paused || reduced) { setReduced(false); setPaused(false); } else { setPaused(true); } }}>{t(paused || reduced ? '▷' : 'Ⅱ')}</button><button aria-label={t("Next slide")} onClick={() => move(1)}>→</button></div>
    </div>
    <span className="sr-only" aria-live={paused ? 'polite' : 'off'}>{t(slides[active].project.shortTitle)}</span>
  </section>;
}
