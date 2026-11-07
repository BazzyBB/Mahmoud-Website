import { SEO_PAGES } from './seo';
import { woodworkingServices } from './woodworking-services';
import { projects } from './projects';
import { serviceAreas, areaByKey } from './service-areas';

// Query ownership groups synonyms under the existing canonical URL.
export const keywordOwners = [
  ['Custom Woodworking Houston TX', '/'],
  ['Custom Furniture Houston TX', '/'],
  ['Custom Cabinets Houston TX', '/Services/custom-cabinets-closets'],
  ['Custom Cabinet Makers Houston', '/Services/custom-cabinets-closets'],
  ['Custom Wood Furniture Houston', '/'],
  ['Custom Built-ins Houston', '/Services/libraries-custom-built-ins'],
  ['Woodworking Near Me', '/'],
  ['Custom Furniture Makers Near Me', '/'],
  ['Epoxy River Tables Houston', '/Services/epoxy-tables'],
  ['Live Edge Tables Houston', '/Services/live-edge-tables'],
  ['Custom Dining Tables Houston', '/Services/live-edge-tables'],
  ['Custom Kitchen Cabinets Houston', '/Services/custom-kitchens'],
  ['Custom Closets Houston', '/Services/custom-cabinets-closets'],
  ['Custom Floating Shelves Houston', '/Services/floating-shelves'],
  ['Custom Wood Staircases Houston', '/Services/custom-staircases'],
  ['Custom Bathroom Vanities Houston', '/Services/floating-vanities'],
  ['Custom Barn Doors Houston', '/Services/barn-doors'],
  ['Custom Outdoor Kitchens Houston', '/Services/outdoor-kitchens'],
  ['Custom Fireplace Mantels Houston', '/Services/custom-mantels'],
  ['Custom Wood Desks Houston', '/Services/custom-desks'],
  ['Custom Wood Beams Houston', '/Services/exposed-ceilings-wood-beams'],
  ['Custom Accent Walls Houston', '/Services/accent-walls'],
  ['Custom Wood Bookshelves Houston', '/Services/libraries-custom-built-ins'],
];

const corePages = {
  '/': ['Custom Woodworking Houston TX', 'Commercial / local provider selection', ['Custom Furniture Houston TX', 'Custom Wood Furniture Houston', 'Woodworking Near Me', 'Custom Furniture Makers Near Me'], ['/Services', '/Gallery', '/Process', '/service-areas', '/ContactUs#quote-request'], 'Explain made-to-order wood furniture and cabinetry; show authentic work, material choices, service links, coverage, quote preparation and customer-intent FAQs. Keep broad Houston provider queries here.'],
  '/Services': ['Houston woodworking services directory', 'Commercial / service discovery', ['custom woodworking services', 'architectural woodwork services Houston'], woodworkingServices.map(s => s.path), 'Organize the existing 20 capabilities with useful summaries, honest photo captions and links to the specific service owner. Keep specialist jeweler and retail work visible.'],
  '/Gallery': ['Live Wood Studio project portfolio', 'Commercial investigation / proof of work', ['woodworking project photos', 'custom furniture portfolio'], projects.map(p => `/Gallery/${p.slug}`), 'Provide project filters, authentic images and specific case examples. Keep general service purchase queries on their service pages.'],
  '/AboutUs': ['Live Wood Studio Houston', 'Brand / trust', ['Houston woodworking studio', 'custom furniture maker background'], ['/Gallery', '/Process', '/service-areas', '/ContactUs'], 'Present the existing studio story and capabilities. Add only client-verified maker biographies, credentials or workshop information.'],
  '/Process': ['custom furniture design and build process', 'Informational / pre-purchase', ['woodworking project consultation', 'custom furniture installation planning'], ['/Materials', '/Services', '/Gallery', '/ContactUs#quote-request'], 'Explain the actual five-step process, approvals, finish selection and site coordination; confirm specific schedules through the proposal.'],
  '/Materials': ['walnut vs white oak for custom furniture', 'Informational / commercial research', ['furniture wood comparison', 'epoxy finish options'], ['/Services/wood-staining-sealing', '/Process', '/Gallery', '/ContactUs'], 'Compare grain and finish choices through actual projects, sample limitations and care discussions; link to the relevant commercial services.'],
  '/ContactUs': ['Live Wood Studio custom project quote', 'Transactional / lead submission', ['custom woodworking quote Houston', 'custom furniture consultation'], ['/Services', '/Materials', '/privacy-policy'], 'Keep the working quote form, phone/text actions and a brief requesting dimensions, materials, budget range and project address.'],
  '/service-areas': ['Greater Houston woodworking service areas', 'Local / coverage discovery', ['Houston cabinetry service coverage', 'woodworking delivery planning'], serviceAreas.map(a => a.path), 'Explain actual Greater Houston coverage, link the distinct local project guides, and clarify address-specific access and installation planning.'],
  '/privacy-policy': ['Live Wood Studio privacy policy', 'Utility / brand', ['quote request data privacy'], ['/ContactUs'], 'Maintain accurate information about quote submissions and privacy requests; do not use this page to target commercial service phrases.'],
  '/sitemap': ['Live Wood Studio website sitemap', 'Navigational / utility', ['website navigation'], Object.keys(SEO_PAGES), 'Keep a crawlable directory of the existing public pages.'],
};

export const keywordArchitecture = Object.entries(SEO_PAGES).map(([url, metadata]) => {
  const service = woodworkingServices.find(s => s.path === url);
  const area = serviceAreas.find(a => a.path === url);
  const project = projects.find(p => `/Gallery/${p.slug}` === url);
  let data = corePages[url];
  let type = 'Core';
  if (service) {
    type = 'Service';
    data = [service.primaryKeyword, 'Commercial / quote-ready service research', service.supportingKeywords,
      ['/Services', `/Gallery/${service.project}`, ...service.related.map(slug => `/Services/${slug}`), areaByKey(service.city).path, '/Materials', '/Process', '/ContactUs#quote-request'],
      `${service.heading}. Discuss ${service.choices.join('; ').toLowerCase()}. Answer cost and planning questions. ${service.photoStatus === 'related' ? 'Use a clearly labeled related reference until an exact service image is supplied.' : service.photoStatus === 'finish-reference' ? 'Use the finished-surface reference; add a verified process example when supplied.' : 'Use the existing direct project example.'}`];
  } else if (area) {
    type = 'Local guide';
    data = [area.key === 'houston' ? 'Houston woodworking project planning' : area.h1, 'Local commercial / site-specific planning',
      area.serviceSlugs.map(slug => `${woodworkingServices.find(s => s.slug === slug).title} ${area.city}`),
      ['/service-areas', ...area.serviceSlugs.map(slug => `/Services/${slug}`), ...area.nearby.map(key => areaByKey(key).path), '/ContactUs#quote-request'],
      `${area.heading}. Cover ${area.checklist.join('; ').toLowerCase()}. Keep the existing original local advice and FAQs; never assign portfolio work to this city without project confirmation.`];
  } else if (project) {
    type = 'Project';
    const related = woodworkingServices.filter(s => s.project === project.slug);
    data = [`${project.shortTitle} project photos`, 'Commercial investigation / specific project', [project.tag, `${project.category.toLowerCase()} design details`],
      ['/Gallery', ...related.map(s => s.path), '/Materials', '/ContactUs'],
      `Show ${project.summary} Retain actual specifications and descriptive image text. Add dimensions, location or installation details only if the client confirms them. Link back to the relevant service rather than positioning the photo collection as a second service page.`];
  }
  const [primaryKeyword, intent, supportingKeywords, internalLinks, recommendedContent] = data;
  return { url, type, primaryKeyword, intent, supportingKeywords, internalLinks: [...new Set(internalLinks)], recommendedContent, title: metadata.title, metaDescription: metadata.description, ownedQueries: keywordOwners.filter(([, path]) => path === url).map(([keyword]) => keyword) };
});
