// Portfolio content for Live Wood Studio. Each project gets its own
// indexable page at /Gallery/:slug.

const a = (file) => `/Assets/${file}`;

export const projects = [
  {
    slug: "live-edge-walnut-epoxy-river-dining-table",
    category: "Tables",
    tag: "Live-Edge Tables",
    title: "Live-Edge Walnut Dining Table with Metallic Epoxy River",
    shortTitle: "Live-Edge Walnut River Table",
    summary:
      "American black walnut slab with a metallic black-and-gold epoxy river, live edges and a matching walnut trestle base.",
    seoDescription:
      "Custom live-edge dining table in American black walnut with a metallic black and gold epoxy river, handcrafted in Dallas, TX by Live Wood Studio.",
    cover: a("ED1.JPG"),
    images: ["ED1.JPG", "ED2.JPG", "ED3.JPG", "ED4.JPG", "ED5.JPG", "ED6.JPG"].map(a),
    specs: [
      ["Wood", "American black walnut"],
      ["Feature", "Metallic black & gold epoxy river"],
      ["Base", "Matching walnut trestle"],
      ["Finish", "Crystal-clear protective topcoat"],
    ],
    description: [
      "This striking dining table showcases the natural beauty of premium American black walnut, expertly crafted to highlight the wood's rich grain patterns and warm honey tones. The centerpiece feature is a dramatic epoxy river that flows through the length of the table, created with metallic black and gold epoxy that catches and reflects light beautifully, creating an almost liquid metal appearance.",
      "The live-edge design preserves the organic contours of the original wood, while the sleek epoxy inlay provides a modern contrast that bridges rustic charm with contemporary elegance. The entire surface is protected with a crystal-clear finish that enhances the wood's natural depth and ensures the metallic elements maintain their lustrous shine.",
      "Supported by a robust trestle-style base crafted from matching walnut, this table combines both form and function with its sturdy construction and timeless design. The warm walnut perfectly complements the cool metallic accents, creating a sophisticated piece that serves as both functional furniture and artistic statement.",
    ],
  },
  {
    slug: "custom-jewelry-display-cabinet-system",
    category: "Cabinets & Displays",
    tag: "Cabinets & Displays",
    title: "Custom Cabinet & Display System — Oak with Cotton White Finish",
    shortTitle: "Jewelry Showroom Cabinet System",
    summary:
      "Ten 4-ft linear display cabinets, two towers and a display table in white oak with tempered glass and integrated LED lighting.",
    seoDescription:
      "Custom oak display cabinet system with tempered glass and LED lighting for a jewelry showroom. Commercial casework and custom cabinets in Dallas, TX.",
    cover: a("JS1.JPG"),
    images: ["JS1.JPG", "JS2.JPG", "JS3.JPG", "JS4.JPG", "JS5.JPG"].map(a),
    specs: [
      ["Construction", "Oak veneered plywood, white oak tops"],
      ["Glass", '3/8" tempered glass'],
      ["Lighting", "Custom-integrated LED"],
      ["Scope", "10 linear cabinets, 2 towers, 5-ft display table"],
    ],
    description: [
      "This sophisticated cabinet system combines the natural warmth of oak with clean, contemporary design to create elegant storage and display solutions. The cabinets feature oak veneered plywood construction with beautiful white oak tops finished in a refined cotton white that provides a neutral backdrop for any space.",
      "Each cabinet is topped with crystal-clear 3/8\" tempered glass for optimal durability and security, while custom-integrated LED lighting creates perfect illumination for displayed items. The lighting system is designed to minimize shadows and provide even, flattering light distribution across the entire surface.",
      "The modular system includes ten 4-foot linear cabinets that can be configured to suit any space, complemented by two tower units for vertical storage options and a 5-foot display table for featured pieces or larger collections. The cotton white finish provides a timeless, sophisticated aesthetic while the oak construction ensures lasting durability — clean lines and professional presentation that elevate the perceived value of any space.",
    ],
  },
  {
    slug: "walnut-diamond-setting-bench",
    category: "Jeweler Benches",
    tag: "Diamond Setting Benches",
    title: "Diamond Setting Bench — Built for Precision and Comfort",
    shortTitle: "Walnut Diamond Setting Bench",
    summary:
      "A 2\" solid walnut jeweler's workstation with a stainless catch tray, adjustable-height base and integrated dust collection.",
    seoDescription:
      "Custom diamond setting bench and jeweler's workbench in solid walnut with stainless catch tray, adjustable height and GoldVault dust collection. Built in Dallas, TX.",
    cover: a("DS1.JPG"),
    images: ["DS1.JPG", "DS2.JPG", "DS3.JPG", "DS4.JPG", "DS5.JPG"].map(a),
    specs: [
      ["Wood", '2" thick stacked solid walnut'],
      ["Tray", "Recessed stainless steel catch tray"],
      ["Base", "Adjustable sit / stand height"],
      ["Extras", "GoldVault dust collection, drawers & shelving"],
    ],
    description: [
      "Our custom Diamond Setting Bench is designed with the professional jeweler in mind, combining strength, beauty, and functionality into the ultimate workstation. Handcrafted from 2\" thick solid walnut, stacked for unmatched durability and elegance, this bench provides a sturdy foundation that will last for generations.",
      "The centerpiece of this bench is its ergonomic design, with a recessed stainless steel catch tray to secure diamonds, gemstones, and precious filings. The layout includes custom-fitted spaces for essential machines, ensuring your tools are always within reach and neatly organized.",
      "For maximum comfort, the bench is built on an adjustable height base, allowing you to work at the perfect level whether sitting or standing. The thoughtful cut-out design supports a natural posture, reducing strain during long hours of precision work. To keep your workspace clean and efficient, the bench integrates a GoldVault dust collection system, recovering valuable materials while maintaining a safe, dust-free environment. Drawers and shelving provide practical storage, keeping your tools organized and your bench uncluttered.",
    ],
  },
  {
    slug: "geometric-oak-block-epoxy-table",
    category: "Tables",
    tag: "Unique Centerpieces",
    title: "Geometric Block Table — Oak with Metallic Black Epoxy",
    shortTitle: "Geometric Oak Block Table",
    summary:
      "Individual 2-inch oak blocks bonded with metallic black epoxy in a woven, brick-like pattern on a sculpted oak trestle.",
    seoDescription:
      "Modern geometric coffee table of 2-inch oak blocks with metallic black epoxy lines and a cotton white finish. Custom furniture by Live Wood Studio, Dallas.",
    cover: a("OB1.JPG"),
    images: ["OB1.JPG", "OB2.JPG", "OB3.JPG", "OB4.JPG"].map(a),
    specs: [
      ["Wood", "Precision-cut 2\" oak blocks"],
      ["Inlay", "Metallic black epoxy lines"],
      ["Finish", "Cotton white"],
      ["Base", "Trestle-style oak"],
    ],
    description: [
      "This striking contemporary table showcases innovative design through its unique geometric construction of individual 2-inch oak blocks, each carefully positioned and bonded with metallic black epoxy that creates bold linear patterns throughout the surface. The result is a mesmerizing brick-like weave pattern that transforms traditional woodworking into modern art.",
      "Each oak block is precision-cut and finished with a sophisticated cotton white finish that highlights the wood's natural grain while providing a clean, contemporary aesthetic. The metallic black epoxy flowing between each block creates dramatic contrast lines that catch and reflect light, adding depth and visual movement to the surface — an almost textile-like appearance, reminiscent of a woven basket or herringbone design.",
      "Supported by a classic trestle-style base crafted from matching oak with the same cotton white finish, this table combines traditional joinery techniques with cutting-edge design concepts. The substantial construction ensures stability while the unique surface treatment makes it a true conversation piece.",
    ],
  },
  {
    slug: "mixed-hardwood-mosaic-epoxy-table",
    category: "Tables",
    tag: "Unique Centerpieces",
    title: "Mixed Hardwood Epoxy Table — Multi-Species Mosaic Design",
    shortTitle: "Mixed Hardwood Mosaic Table",
    summary:
      "Walnut, cherry, maple, white oak, red oak and mahogany set in a crystal-clear epoxy mosaic with matching mixed-hardwood legs.",
    seoDescription:
      "Custom mosaic coffee table combining six North American hardwoods in crystal-clear epoxy. One-of-a-kind epoxy furniture handcrafted in Dallas, TX.",
    cover: a("OM1.JPG"),
    images: ["OM1.JPG", "OM2.jpeg", "OM3.JPG", "OM4.jpeg"].map(a),
    specs: [
      ["Woods", "Walnut, cherry, maple, white & red oak, mahogany"],
      ["Surface", "Crystal-clear epoxy encapsulation"],
      ["Legs", "Matching mixed hardwoods"],
      ["Style", "Organic mosaic pattern"],
    ],
    description: [
      "This stunning coffee table showcases the artistry of combining six distinct North American hardwoods in a captivating mosaic pattern, all unified within a crystal-clear epoxy matrix. The intricate design features carefully selected pieces of walnut, cherry, maple, white oak, red oak, and mahogany, each contributing its unique color, grain pattern, and character.",
      "The varied species create a spectacular range of tones — from the deep chocolate browns of walnut to the warm honey hues of maple, the rich burgundy of cherry, the golden tones of both oak varieties, and the reddish-brown elegance of mahogany. Each piece is precisely cut and arranged to form an organic, puzzle-like pattern that celebrates diversity while maintaining visual harmony.",
      "The entire surface is encapsulated in premium epoxy resin that protects the wood and creates a perfectly smooth, glass-like finish that enhances natural color and grain. Supported by robust legs crafted from the same mixed hardwoods, this table extends the artistic concept throughout its entire structure — a true centerpiece that showcases the natural beauty and variety of North American hardwoods.",
    ],
  },
  {
    slug: "white-oak-retail-display-table",
    category: "Cabinets & Displays",
    tag: "Retail Displays",
    title: "Retail Display Table — White Oak with Cotton White Finish",
    shortTitle: "White Oak Retail Display",
    summary:
      "A tiered white oak display with horizontal slat detailing and black metal legs, made to showcase high-end merchandise.",
    seoDescription:
      "Custom retail display table in white oak with cotton white finish and black metal legs. Boutique and jewelry store fixtures built in Dallas, TX.",
    cover: a("SF1.JPG"),
    images: ["SF1.JPG", "SF2.JPG", "SF3.JPG", "SF4.JPG"].map(a),
    specs: [
      ["Wood", "White oak"],
      ["Finish", "Cotton white"],
      ["Legs", "Black metal"],
      ["Design", "Tiered with horizontal slat detailing"],
    ],
    description: [
      "This sophisticated retail display table combines minimalist design with premium craftsmanship to create an ideal showcase for high-end merchandise. Constructed from beautiful white oak and finished in an elegant cotton white that highlights the wood's natural grain while maintaining a clean, contemporary aesthetic that complements any retail environment.",
      "The design features a distinctive tiered construction with horizontal slat detailing that creates visual interest while maintaining the clean lines essential for product display. The upper surface provides an elevated platform perfect for jewelry, accessories, or other premium items, while the lower tier offers additional display space or storage.",
      "Sleek black metal legs provide a striking contrast to the light oak, creating a modern industrial accent that elevates the overall design. The cotton white finish keeps displayed products the focal point, while the quality construction projects an image of craftsmanship and attention to detail that reflects positively on the merchandise.",
    ],
  },
];

export const categories = ["All", "Tables", "Cabinets & Displays", "Jeweler Benches"];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const services = [
  {
    title: "Live-Edge & Epoxy River Tables",
    text: "Dining, conference and coffee tables cut from hand-selected slabs, finished to let the grain and natural edge lead.",
    image: a("ED2.JPG"),
  },
  {
    title: "Custom Cabinets & Built-Ins",
    text: "Cabinetry, shelving and built-ins measured and built for your room — not pulled from a catalog.",
    image: a("JS2.JPG"),
  },
  {
    title: "Jewelry & Retail Display Fixtures",
    text: "Showcases, display tables and casework with tempered glass and integrated LED lighting for stores and showrooms.",
    image: a("SF4.JPG"),
  },
  {
    title: "Diamond Setting & Jeweler's Benches",
    text: "Ergonomic, adjustable workstations with catch trays and dust collection, designed around how setters actually work.",
    image: a("DS4.JPG"),
  },
];
