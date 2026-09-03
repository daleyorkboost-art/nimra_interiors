const asset = (name) => `/assets/collections/${name}`;

export const collections = [
  { slug: 'gold-silver', title: 'Gold & Silver', description: 'Metallic finishes and softly reflective surfaces for statement drapery and upholstery.', images: ['gold3.webp', 'gold2.webp', 'gold1.webp'].map(asset) },
  { slug: 'sheers', title: 'Sheers', description: 'Translucent weaves that soften daylight while preserving a sense of openness.', images: ['sheers2.webp', 'sheers3.webp', 'sheers1.webp'].map(asset) },
  { slug: 'linen-cottons', title: 'Linen and Cottons', description: 'Relaxed, breathable textiles with natural movement and an understated finish.', images: ['linen3.webp', 'linen2.webp'].map(asset) },
  { slug: 'lines-textures', title: 'Lines & Textures', description: 'Graphic constructions, raised weaves and patterns designed to be read up close.', images: ['fabric4.webp', 'fabrics1.webp', 'fabrics2.webp', 'fabrics3.webp'].map(asset) },
  { slug: 'natural-cottons', title: 'Natural Cottons', description: 'Honest cotton textures in quiet neutrals, selected for versatile interior use.', images: ['naturalcotton2.webp', 'naturalcootton1.webp', 'naturalcotton3.webp'].map(asset) },
  { slug: 'borders', title: 'Borders', description: 'Embroidered and geometric trims that give curtains, cushions and panels a precise finish.', images: ['borders5.webp', 'borders4.webp', 'borders2.webp', 'broders1.webp'].map(asset) },
  { slug: 'outdoors', title: 'Outdoor Fabrics', description: 'Weather-ready textiles for terraces, balconies and high-use environments.', images: ['/assets/products/outdoor-shades.jpg'] },
];

export const findCollection = (slug) => collections.find((collection) => collection.slug === slug);
