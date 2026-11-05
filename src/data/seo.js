import { SITE } from './site';
import { projects, services } from './projects';
import { serviceAreas } from './service-areas';

export const SEO_PAGES = {
  '/': { title: 'Custom Woodworking & Furniture in Houston, TX', description: 'Custom furniture, live-edge tables, cabinets and jewelry displays handcrafted in Houston. Explore Live Wood Studio’s work and discuss your Greater Houston project.' },
  '/Services': { title: 'Custom Cabinets & Woodworking in Houston', description: 'Explore custom cabinets, live-edge tables, retail displays and jeweler benches made in Houston. Choose materials and plan your project with Live Wood Studio.' },
  '/Gallery': { title: 'Custom Furniture Portfolio in Houston', description: 'See walnut river tables, custom cabinetry, retail displays and jeweler benches built by Live Wood Studio in Houston. Explore photos and project details.' },
  '/AboutUs': { title: 'About Our Houston Woodworking Studio', description: 'Meet Live Wood Studio, crafting custom tables, cabinetry and display furniture for homeowners, designers and businesses throughout Greater Houston.' },
  '/Process': { title: 'Custom Furniture Design & Build Process', description: 'See how a custom woodworking project moves from consultation and wood selection to handcrafting, finishing and installation in Greater Houston.' },
  '/Materials': { title: 'Walnut vs White Oak: Furniture Wood Guide', description: 'Compare walnut, white oak and mixed hardwoods through real furniture projects. Explore grain, epoxy and finish choices with Live Wood Studio in Houston.' },
  '/ContactUs': { title: 'Custom Furniture Quotes in Houston', description: 'Discuss your custom furniture, cabinets or display project with Live Wood Studio in Houston. Call (469) 888-1330 or send your dimensions and ideas.' },
};
const projectTitles = [
  'Walnut Epoxy River Table in Houston',
  'Jewelry Display Cabinets in Houston',
  'Custom Walnut Diamond Setting Bench',
  'Geometric Oak Coffee Table in Houston',
  'Mixed Hardwood Mosaic Epoxy Table',
  'White Oak Retail Display Table in Houston',
];
const projectDescriptions = [
  'Explore a custom walnut dining table with live edges and a metallic epoxy river. See project photos and discuss a made-to-order table in Houston.',
  'See custom white oak jewelry display cabinets with tempered glass and LED lighting. Explore a studio cabinet project and discuss your casework.',
  'Explore a solid walnut diamond setting bench with adjustable height, catch tray and tool storage. Plan a custom jeweler workstation in Houston.',
  'See a geometric oak coffee table with metallic black epoxy and a cotton white finish. Explore this custom furniture project from Live Wood Studio.',
  'Explore a mosaic coffee table combining six hardwoods in clear epoxy. See photos and materials from this custom Live Wood Studio project in Houston.',
  'See a tiered white oak retail display table with black metal legs. Explore custom store fixtures made by Live Wood Studio in Houston, Texas.',
];
projects.forEach((p, i) => {
  SEO_PAGES[`/Gallery/${p.slug}`] = { title: projectTitles[i], description: projectDescriptions[i] };
});
SEO_PAGES['/service-areas'] = {
  title: 'Custom Woodworking & Cabinetry Service Areas in Greater Houston',
  description: 'Explore Greater Houston project guides for custom cabinetry, handcrafted furniture and woodworking. Confirm service availability with Live Wood Studio.',
};
serviceAreas.forEach(area => {
  SEO_PAGES[area.path] = { title: area.title, description: area.meta };
});
SEO_PAGES['/privacy-policy'] = { title: 'Privacy Policy', description: 'Learn how Live Wood Studio uses quote request details and how to contact the studio about your submitted information.' };
SEO_PAGES['/sitemap'] = { title: 'Website Sitemap', description: 'Find Live Wood Studio services, six portfolio projects, Houston service area guides and contact information.' };
export const INDEXABLE_PATHS = Object.keys(SEO_PAGES);
export const absoluteUrl = path => `${SITE.url}${path === '/' ? '' : path}`;

export function pageGraph(path, title, description, image) {
  const url = absoluteUrl(path);
  const businessId = `${SITE.url}/#business`;
  const websiteId = `${SITE.url}/#website`;
  const project = projects.find(p => path === `/Gallery/${p.slug}`);
  const serviceNodes = services.map((s, i) => ({
    '@type': 'Service', '@id': `${SITE.url}/Services#service-${i + 1}`,
    name: s.title, description: s.text, url: `${SITE.url}/Services#service-${i + 1}`,
    provider: { '@id': businessId }, areaServed: SITE.serviceAreas,
  }));
  const business = {
    '@type': 'LocalBusiness', '@id': businessId, name: SITE.name,
    url: SITE.url, telephone: '+14698881330',
    description: 'Houston custom woodworking studio crafting made-to-order furniture, tables, cabinetry, retail displays and jeweler benches.',
    logo: `${SITE.url}/Assets/lws-logo.png`, image: `${SITE.url}/Assets/ED1.JPG`,
    areaServed: SITE.serviceAreas.map(name => ({ '@type': 'City', name })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Custom woodworking services', itemListElement: serviceNodes.map(s => ({ '@type': 'Offer', itemOffered: { '@id': s['@id'] } })) },
  };
  const type = path === '/AboutUs' ? 'AboutPage' : path === '/ContactUs' ? 'ContactPage' : ['/Gallery', '/service-areas'].includes(path) ? 'CollectionPage' : 'WebPage';
  const page = {
    '@type': type, '@id': `${url}#webpage`, url, name: title, description,
    inLanguage: 'en-US', isPartOf: { '@id': websiteId }, about: { '@id': businessId },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
  };
  const graph = [business, { '@type': 'WebSite', '@id': websiteId, url: SITE.url, name: SITE.name, inLanguage: 'en-US', publisher: { '@id': businessId } }, page, ...serviceNodes];
  if (project) {
    const id = `${url}#project`;
    page.mainEntity = { '@id': id };
    graph.push({ '@type': 'CreativeWork', '@id': id, name: project.title, description: project.summary, url, image: project.images.map(p => `${SITE.url}${p}`), creator: { '@id': businessId }, about: project.specs.map(([key, value]) => `${key}: ${value}`) });
  }
  if (path === '/Gallery') {
    page.mainEntity = { '@type': 'ItemList', itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.shortTitle, url: `${SITE.url}/Gallery/${p.slug}` })) };
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
