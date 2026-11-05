import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { img, srcSet } from '../utils/image';
import { projects } from '../data/projects';

const slides = [
  { project: projects[0], image: '/Assets/ED2.JPG', title: <>Custom woodworking.<br /><em>Made in Dallas.</em></>, text: 'Live-edge walnut. Flowing metallic epoxy. A dining table with a character entirely its own.' },
  { project: projects[1], image: '/Assets/JS1.JPG', title: <>Your space.<br /><em>Precisely</em> crafted.</>, text: 'Custom cabinetry and illuminated displays, designed around your space and the things you treasure.' },
  { project: projects[2], image: '/Assets/DS4.JPG', title: <>Made by hand.<br />Built for <em>yours.</em></>, text: 'Solid walnut workstations that bring thoughtful design and everyday precision together.' },
];

export default function HeroSlider() {
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
  return <section className="hero" aria-roledescription="carousel" aria-label="Handcrafted projects"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setHovered(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false); }}
    onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}
    onTouchStart={e => { touch.current = e.touches[0].clientX; }}
    onTouchEnd={e => { if (touch.current !== null) { const delta = touch.current - e.changedTouches[0].clientX; if (Math.abs(delta) > 50) move(delta > 0 ? 1 : -1); } touch.current = null; }}>
    {slides.map((slide, i) => <div className={`hero-slide ${i === active ? 'is-active' : ''}`} key={slide.image} aria-hidden={i !== active} inert={i !== active ? '' : undefined} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
      <img className="hero-photo" src={img(slide.image, { w: 1920, q: 80 })} srcSet={srcSet(slide.image, [800, 1200, 1920], { q: 80 })} sizes="100vw" alt={slide.project.title} fetchpriority={i === 0 ? 'high' : 'auto'} />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <p className="eyebrow">Dallas, Texas · Custom Woodworking</p>
        {i === 0 ? <h1>{slide.title}</h1> : <h2 className="hero-title">{slide.title}</h2>}
        <p className="lead">{slide.text}</p>
        <div className="hero-actions"><Link to="/ContactUs" className="btn btn-primary" tabIndex={i === active ? 0 : -1}>Start your project <span>↗</span></Link><Link to={`/Gallery/${slide.project.slug}`} className="hero-work-link" tabIndex={i === active ? 0 : -1}>Discover this piece <span>→</span></Link></div>
      </div>
    </div>)}
    <div className="container hero-bottom">
      <div className="slide-pagination" aria-label="Choose a slide">{slides.map((s, i) => <button key={s.image} className={i === active ? 'active' : ''} aria-label={`Show ${s.project.shortTitle}`} aria-current={i === active ? 'true' : undefined} onClick={() => { setActive(i); setPaused(true); }}><span>0{i + 1}</span><i /></button>)}</div>
      <div className="slider-controls"><span className="slider-caption">Made to order. Made to last.</span><button aria-label="Previous slide" onClick={() => move(-1)}>←</button><button aria-label={paused || reduced ? 'Play slideshow' : 'Pause slideshow'} onClick={() => { setReduced(false); setPaused(p => !p); }}>{paused || reduced ? '▷' : 'Ⅱ'}</button><button aria-label="Next slide" onClick={() => move(1)}>→</button></div>
    </div>
    <span className="sr-only" aria-live={paused ? 'polite' : 'off'}>{slides[active].project.shortTitle}</span>
  </section>;
}
