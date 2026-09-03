export const blinds = [
  { slug: 'roller-shades', title: 'Roller Shades', description: 'A tailored, compact shade for precise daylight, glare and privacy control.', images: ['/assets/products/roller-shades.jpg'], details: [] },
  { slug: 'zebra-blinds', title: 'Zebra Blinds', description: 'Alternating sheer and opaque bands for effortless, adjustable light control.', images: ['/assets/products/zebra-blinds.png'], details: [] },
  { slug: 'honey-comb-blinds', title: 'Honeycomb Blinds', description: 'Insulating cellular shades with a soft architectural profile.', images: ['/assets/products/honeycomb-shades.webp'], details: [] },
  { slug: 'outdoor-shades', title: 'Outdoor Shades', description: 'Durable exterior shading for balconies, terraces and open-air rooms.', images: ['/assets/products/outdoor-shades-new.jpg'], details: [] },
];

export const findBlind = (slug) => blinds.find((blind) => blind.slug === slug);
