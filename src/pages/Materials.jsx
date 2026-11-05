import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import { PageHero, Eyebrow, CtaBand } from '../Components/Section';
import { img } from '../utils/image';

const materials = [
  { title: 'American black walnut', image: '/Assets/ED3.JPG', description: 'Rich brown tones and expressive grain give walnut its distinctive character. Our river table pairs a natural live edge with metallic epoxy.', link: 'live-edge-walnut-epoxy-river-dining-table' },
  { title: 'White oak', image: '/Assets/OB2.JPG', description: 'A lighter palette with visible grain. Explore it in cotton-white display furniture and the geometric block table.', link: 'geometric-oak-block-epoxy-table' },
  { title: 'Mixed hardwoods', image: '/Assets/OM3.JPG', description: 'Walnut, cherry, maple, white oak, red oak and mahogany bring contrasting colors and grain into a single mosaic surface.', link: 'mixed-hardwood-mosaic-epoxy-table' },
];

export default function Materials() {
  return <>
    <SEOHead canonical="/Materials" jsonLd={breadcrumbs([['Home', '/'], ['Materials', '/Materials']])} />
    <main id="main">
      <PageHero eyebrow="Materials & Finishes" title="Walnut or White Oak? A Furniture Wood Guide" intro="A guide to the woods and details in our work. Every board is different; your piece begins with that character." image="/Assets/OM3.JPG" />
      <section className="section"><div className="container">
        <div className="section-head"><Eyebrow>Find your direction</Eyebrow><h2>Warm walnut.<br />Quiet oak. Something unexpected.</h2><p>These are examples from completed projects, rather than exact color samples. Natural variation, lighting and your screen all affect how a wood or finish appears.</p></div>
        <div className="material-grid">{materials.map(m => <article className="material-card" key={m.title}>
          <img src={img(m.image, { w: 800 })} alt={`${m.title} in a completed Live Wood Studio project`} loading="lazy" width="800" height="600" />
          <h3>{m.title}</h3><p>{m.description}</p><Link className="text-link" to={`/Gallery/${m.link}`}>View {m.title.toLowerCase()} furniture ↗</Link>
        </article>)}</div>
      </div></section>
      <section className="section wood-comparison"><div className="container">
        <Eyebrow>Compare your options</Eyebrow><h2>Walnut vs white oak for custom furniture</h2>
        <p><strong>Walnut and white oak</strong> both appear in our completed work. The right choice depends on the grain and color you want, the design, and how the piece will be used.</p>
        <div className="comparison-scroll"><table className="wood-table"><caption>Wood choices illustrated by Live Wood Studio projects</caption><thead><tr><th scope="col">Consideration</th><th scope="col">American black walnut</th><th scope="col">White oak</th></tr></thead><tbody>
          <tr><th scope="row">Visual character</th><td>Rich brown tones and expressive grain.</td><td>A lighter palette with visible grain.</td></tr>
          <tr><th scope="row">Examples from our work</th><td><Link className="context-link" to="/Gallery/live-edge-walnut-epoxy-river-dining-table">Walnut epoxy river dining table</Link> and <Link className="context-link" to="/Gallery/walnut-diamond-setting-bench">walnut jeweler bench</Link>.</td><td><Link className="context-link" to="/Gallery/custom-jewelry-display-cabinet-system">White oak showroom cabinetry</Link> and <Link className="context-link" to="/Gallery/white-oak-retail-display-table">retail display furniture</Link>.</td></tr>
          <tr><th scope="row">Details to discuss</th><td>Live edges, epoxy colors, surface finish and dimensions.</td><td>Finish color, cabinet construction, hardware and dimensions.</td></tr>
        </tbody></table></div>
        <p>For an accurate comparison, discuss actual boards and finish samples during your <Link className="context-link" to="/Process">custom furniture design consultation</Link>. The photos show finished examples, not guaranteed color matches.</p>
      </div></section>
      <section className="planning-band"><div className="container split">
        <div><Eyebrow>The finishing details</Eyebrow><h2>More than a choice of wood.</h2></div>
        <div className="finish-list">
          <article><h3>Epoxy & natural edges</h3><p>Clear epoxy can reveal a mosaic of hardwoods; metallic epoxy brings contrast to a river table. Discuss color, edge style and the overall surface with the studio.</p></article>
          <article><h3>Glass, lighting & hardware</h3><p>For display cabinetry, consider what needs to be visible, how it should be illuminated, and the storage you need below.</p></article>
          <article><h3>Daily use & care</h3><p>Tell us how you intend to use your piece. Confirm the selected finish and its care instructions with the studio before using cleaning products or treatments.</p></article>
        </div>
      </div></section>
      <section className="section"><div className="container consultation-note"><Eyebrow>Your consultation</Eyebrow><h2>You don’t need all the answers yet.</h2><p>Start with your room dimensions and a few reference images. We can talk through wood, finish, size and the practical details together.</p><Link className="btn btn-dark" to="/ContactUs">Discuss your project ↗</Link></div></section>
      <CtaBand />
    </main>
  </>;
}
