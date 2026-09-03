import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, ArrowRight, BriefcaseBusiness, ChevronDown, ChevronLeft, ChevronRight, Menu, Sparkles, X} from 'lucide-react';
import {collections, findCollection} from './collections';
import {blinds, findBlind} from './blinds';
import './styles.css';

const A = '/assets/';
const nav = [['Home', '/'], ['Products', '/products'], ['Trade', '/trade'], ['About Us', '/about'], ['Contact', '/contact']];
const productGroups = [
  {label: 'Fabrics', to: '/fabrics', copy: 'Drapery, upholstery and decorative textiles', items: collections},
  {label: 'Blinds', to: '/blinds', copy: 'Tailored systems for light and privacy', items: blinds},
];

function Link({to, children, className = '', onClick, ...props}) {
  return <a {...props} href={to} className={className} onClick={(event) => {
    if (to.startsWith('/')) {
      event.preventDefault(); history.pushState({}, '', to);
      window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({top: 0, behavior: 'instant'});
    }
    onClick?.(event);
  }}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const close = (event) => event.key === 'Escape' && setOpen(false);
    addEventListener('keydown', close);
    return () => { document.body.classList.remove('menu-open'); removeEventListener('keydown', close); };
  }, [open]);
  return <><div className="consultation-bar"><div className="page-width"><span><Sparkles /> Thoughtful material guidance, from first sample to final installation.</span><Link to="/contact">Book a consultation <ArrowRight /></Link></div></div><header className="site-header"><div className="header-inner">
    <Link to="/" className="brand" aria-label="Nimra Interiors home"><img src={`${A}nimra-logo-4k.jpeg`} alt="Nimra Interiors" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, to]) => <div className="nav-item" key={label}><Link to={to}>{label}{label === 'Products' && <ChevronDown />}</Link>{label === 'Products' && <div className="products-mega">{productGroups.map((group) => <div className="mega-group" key={group.label}><Link to={group.to} className="mega-heading"><span>{group.label}</span><small>{group.copy}</small></Link>{group.items.map((item) => <Link key={item.slug} to={`${group.to}/${item.slug}`}><span>{item.title}</span><ArrowRight /></Link>)}</div>)}</div>}</div>)}</nav>
    <Link to="/contact" className="header-enquire">Book a visit <ArrowRight /></Link>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
  </div><nav id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`} aria-hidden={!open}>{nav.map(([label, to]) => <div className="mobile-nav-group" key={label}><div className="mobile-nav-row"><Link to={to} onClick={() => setOpen(false)}>{label}</Link>{label === 'Products' ? <button onClick={() => setMobileSection(mobileSection === label ? null : label)} aria-expanded={mobileSection === label} aria-label="Toggle product categories"><ChevronDown /></button> : <ArrowRight />}</div>{label === 'Products' && <div className={`mobile-submenu ${mobileSection === label ? 'open' : ''}`}>{productGroups.map((group) => <div key={group.label}><Link className="mobile-group-title" to={group.to} onClick={() => setOpen(false)}>{group.label}</Link>{group.items.map((item) => <Link key={item.slug} to={`${group.to}/${item.slug}`} onClick={() => setOpen(false)}>{item.title}</Link>)}</div>)}</div>}</div>)}</nav></header></>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><div className="footer-logo"><img src={`${A}nimra-logo-4k.jpeg`} alt="Nimra Interiors" /></div><p>Fabrics, blinds and considered details for beautifully finished interiors.</p></div>
    <div className="footer-nav"><span>Explore</span>{nav.slice(1).map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}</div>
    <div className="footer-nav"><span>Collections</span>{collections.slice(0, 4).map((item) => <Link key={item.slug} to={`/fabrics/${item.slug}`}>{item.title}</Link>)}</div>
    <div className="footer-nav"><span>Blinds</span>{blinds.map((item) => <Link key={item.slug} to={`/blinds/${item.slug}`}>{item.title}</Link>)}</div>
    <div className="footer-base"><small>© {new Date().getFullYear()} Nimra Interiors</small><small>Fabrics · Blinds · Interior applications</small></div>
  </footer>;
}

function SectionHeading({label, title, copy, action}) {
  return <div className="section-heading"><span className="section-label">{label}</span><div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{action}</div>;
}

function Hero() {
  return <section className="home-hero"><div className="hero-image"><img src={`${A}hero.webp`} alt="Layered curtains in a contemporary interior" /></div><div className="hero-copy">
    <span className="section-label">Nimra Interiors · Bespoke Furnishings</span><h1>Timeless interiors begin with the right materials.</h1><p>Premium furnishing fabrics and made-to-measure blinds, thoughtfully guided from first selection to final installation.</p>
    <div className="hero-actions"><Link to="/products" className="button dark">Explore products <ArrowRight /></Link><Link to="/contact" className="text-link">Book a consultation <ArrowRight /></Link></div>
  </div></section>;
}

function CollectionCard({collection, index, basePath}) {
  const cover = collection.images[0];
  return <Link to={`/${basePath}/${collection.slug}`} className={`collection-card card-${index + 1}`}>
    {cover ? <img src={cover} alt={`${collection.title} collection`} loading="lazy" /> : <div className="image-pending"><span>Photography to be added</span></div>}
    <div className="collection-meta"><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{collection.title}</h3><p>{collection.description}</p></div><ArrowRight /></div>
  </Link>;
}

function CollectionGrid({items = collections, basePath = 'fabrics', className = ''}) { return <div className={`collection-grid ${className}`}>{items.map((item, index) => <CollectionCard key={item.slug} collection={item} index={index} basePath={basePath} />)}</div>; }

function Intro() {
  return <section className="intro-section page-width"><SectionHeading label="A considered service" title="Guidance that brings every detail into focus." /><div className="intro-copy"><p>Explore fabrics, compare samples, refine your palette and plan made-to-measure window treatments with one attentive team.</p><Link to="/contact" className="text-link">Plan your consultation <ArrowRight /></Link></div></section>;
}

function BlindsPreview() {
  return <section className="blinds-section"><div className="page-width"><SectionHeading label="Made to measure" title="Beautifully tailored shading for every opening." copy="Discover indoor and outdoor systems designed to balance light, privacy and everyday comfort." action={<Link to="/blinds" className="text-link">Explore all blinds <ArrowRight /></Link>} /><CollectionGrid items={blinds} basePath="blinds" className="blind-grid" /></div></section>;
}

function FeaturedCollection() {
  const featured = collections.find((item) => item.slug === 'lines-textures');
  return <section className="featured-collection page-width"><img src="/assets/collections/fabrics2.webp" alt="Orange and ivory woven geometric fabric detail" loading="lazy" /><div><span className="section-label">Featured collection</span><h2>Lines & Textures</h2><p>Graphic constructions, raised weaves and tactile surfaces designed to bring pattern and material depth into an interior scheme.</p><Link to={`/fabrics/${featured.slug}`} className="text-link">View the collection <ArrowRight /></Link></div></section>;
}

function ApplicationsStrip() {
  const applications = [['Curtains & drapery', 'Sheers, statement fabrics and layered window treatments.'], ['Window shading', 'Roller, zebra, honey comb and outdoor blind formats.'], ['Upholstery', 'Textures for seating, headboards and soft furnishing.'], ['Interior accents', 'Borders and materials for cushions, panels and finishing details.']];
  return <section className="applications-section"><div className="page-width"><SectionHeading label="Applications" title="Selected around how a space needs to look and live." action={<Link to="/applications" className="text-link">View applications <ArrowRight /></Link>} /><div className="application-list">{applications.map(([name, copy], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function AboutPreview() {
  return <section className="about-preview page-width"><img src={`${A}craft.webp`} alt="Fabric and furnishing material details" loading="lazy" /><div><span className="section-label">Our approach</span><h2>Material first. Chosen with the whole interior in mind.</h2><p>We look at colour, hand, light and application together, so the fabric feels connected to the room rather than added at the end.</p><Link to="/about" className="text-link">Read about Nimra <ArrowRight /></Link></div></section>;
}

function CustomerJourney() {
  const steps = [['Discover', 'Browse curated fabrics and blind systems by product category.'], ['Consult', 'Tell us about your room, palette, dimensions and practical needs.'], ['Sample', 'Compare texture, colour and light in the context of your space.'], ['Complete', 'Move ahead with a clear product direction and installation plan.']];
  return <section className="journey-section"><div className="page-width"><SectionHeading label="From idea to finished room" title="A simpler way to choose well." copy="Personal guidance keeps the process clear and the final result cohesive." /><div className="journey-grid">{steps.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function Testimonials() {
  const quotes = [
    ['The team helped us move from dozens of ideas to one calm, cohesive scheme. The fabric looks even better in the room.', 'Residential client', 'Curtains & sheers'],
    ['Clear advice, beautiful samples and an easy process from selection through final measurements.', 'Homeowner', 'Made-to-measure blinds'],
    ['A dependable material partner who understands the detail, timelines and finish our projects demand.', 'Interior design studio', 'Trade partner'],
  ];
  return <section className="testimonials page-width"><SectionHeading label="Client stories" title="Chosen with care. Remembered for how it feels." copy="Personal attention, clear advice and details that feel right at home." /><div className="testimonial-grid">{quotes.map(([quote, name, project]) => <blockquote key={project}><div className="quote-mark">“</div><p>{quote}</p><footer><strong>{name}</strong><span>{project}</span></footer></blockquote>)}</div></section>;
}

function EnquiryCTA() {
  return <section className="enquiry-cta"><div className="page-width"><span className="section-label">Enquiries</span><h2>Looking for the right fabric or blind for your space?</h2><p>Share the application, palette and product direction you have in mind.</p><Link to="/contact" className="button light">Start an enquiry <ArrowRight /></Link></div></section>;
}

function Home() {
  return <><Hero /><Intro /><section className="collections-section page-width"><SectionHeading label="Fabric library" title="Texture, colour and character for every room." copy="Seven curated material families for drapery, upholstery and finishing details." action={<Link to="/products" className="text-link">View all products <ArrowRight /></Link>} /><CollectionGrid /></section><BlindsPreview /><FeaturedCollection /><CustomerJourney /><Testimonials /><AboutPreview /><EnquiryCTA /></>;
}

function PageHero({eyebrow, title, copy}) { return <section className="page-hero page-width"><span className="section-label">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></section>; }

function ProductsPage() {
  return <><PageHero eyebrow="Products" title="Materials for every layer of the room." copy="Begin with a category, then discover collections chosen for their beauty, versatility and lasting appeal." /><section className="product-directory page-width">{productGroups.map((group, index) => <article key={group.label}><div className="directory-intro"><span>0{index + 1}</span><div><h2>{group.label}</h2><p>{group.copy}. Explore each range for distinctive finishes and applications suited to your space.</p><Link to={group.to} className="text-link">View all {group.label.toLowerCase()} <ArrowRight /></Link></div></div><CollectionGrid items={group.items.slice(0, 4)} basePath={group.to.slice(1)} /></article>)}</section><EnquiryCTA /></>;
}

function FabricsPage() {
  return <><PageHero eyebrow="Fabrics" title="Texture, depth and distinction." copy="Explore eight expressive fabric families for curtains, upholstery and the finishing touches that make a room feel complete." /><section className="collections-section page-width catalogue"><CollectionGrid /></section><EnquiryCTA /></>;
}

function BlindsPage() {
  return <><PageHero eyebrow="Blinds" title="Light and privacy, beautifully balanced." copy="Explore four tailored blind systems designed for calm interiors, comfortable light and effortless everyday use." /><section className="collections-section page-width catalogue"><CollectionGrid items={blinds} basePath="blinds" className="blind-grid" /></section><EnquiryCTA /></>;
}

function TradePage() {
  const benefits = [['Dedicated support', 'A single point of contact for samples, specifications and product queries.'], ['Curated sampling', 'Focused options prepared around your palette, performance needs and project brief.'], ['Project continuity', 'Responsive coordination from early specification through measurements and fulfilment.']];
  return <><section className="trade-hero"><div className="page-width"><div><span className="section-label">Nimra Trade</span><h1>A material partner for design-led businesses.</h1><p>We collaborate with interior designers, architects, decorators, contractors and hospitality teams on considered residential and commercial spaces.</p><Link to="/contact" className="button dark">Start a trade conversation <ArrowRight /></Link></div><img src="/assets/trade-consultation.jpg" alt="Designer and client reviewing material samples" /></div></section><section className="trade-benefits page-width"><SectionHeading label="Built for collaboration" title="Responsive support around the way your studio works." /><div>{benefits.map(([title, copy], index) => <article key={title}><BriefcaseBusiness /><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="trade-steps"><div className="page-width"><span className="section-label">Trade enquiries</span><h2>Bring us your brief.</h2><p>Share your business type, project stage, application and approximate requirements. We’ll help identify the most relevant next step.</p><Link to="/contact" className="button light">Discuss a project <ArrowRight /></Link></div></section><Testimonials /></>;
}

function CollectionPage({collection, type = 'Fabric', backPath = '/fabrics', backLabel = 'All fabrics'}) {
  const [selected, setSelected] = useState(null);
  useEffect(() => { const close = (event) => event.key === 'Escape' && setSelected(null); addEventListener('keydown', close); return () => removeEventListener('keydown', close); }, []);
  const move = (step) => setSelected((selected + step + collection.images.length) % collection.images.length);
  return <><section className="collection-hero page-width"><Link to={backPath} className="back-link"><ArrowLeft /> {backLabel}</Link><span className="section-label">{type} collection</span><h1>{collection.title}</h1><p>{collection.description}</p></section>
    <section className="gallery-section page-width">{collection.images.length ? <div className="fabric-gallery">{collection.images.map((image, index) => <button key={image} onClick={() => setSelected(index)} aria-label={`Open ${collection.title} image ${index + 1}`}><img src={image} alt={`${collection.title} detail ${index + 1}`} /></button>)}</div> : <div className="empty-gallery"><span>Collection photography pending</span><h2>Images for this collection will be added shortly.</h2><p>Enquire about this category while the online gallery is being prepared.</p></div>}</section>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${collection.title} image gallery`}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close gallery"><X /></button>{collection.images.length > 1 && <button className="lightbox-prev" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button>}<img src={collection.images[selected]} alt={`${collection.title} detail ${selected + 1}`} /><span>{selected + 1} / {collection.images.length}</span>{collection.images.length > 1 && <button className="lightbox-next" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button>}</div>}<RelatedCollections current={collection.slug} type={type} /><EnquiryCTA /></>;
}

function RelatedCollections({current, type}) {
  const items = (type === 'Blind' ? blinds : collections).filter((item) => item.slug !== current).slice(0, 3);
  const basePath = type === 'Blind' ? 'blinds' : 'fabrics';
  return <section className="related-section page-width"><SectionHeading label="Continue browsing" title={`Related ${type === 'Blind' ? 'blinds' : 'fabrics'}.`} /><CollectionGrid items={items} basePath={basePath} className="related-grid" /></section>;
}

function ApplicationsPage() {
  return <><PageHero eyebrow="Applications" title="Products, considered in context." copy="The right fabric or blind depends on where it will be used, how it should perform and how it sits within the wider interior." /><section className="application-detail page-width"><article><span>01</span><h2>Curtains & drapery</h2><p>Build window treatments around transparency, light control, fall and decorative finish—from sheer layers to more substantial statement textiles.</p></article><article><span>02</span><h2>Window shading</h2><p>Use roller, zebra, honey comb or outdoor formats according to the opening and the required balance of daylight and privacy.</p></article><article><span>03</span><h2>Upholstery</h2><p>Choose surface, scale and texture for seating, headboards and other upholstered elements while considering the demands of the setting.</p></article><article><span>04</span><h2>Interior accents</h2><p>Use borders and decorative materials to connect cushions, panels and smaller furnishing details to the broader room palette.</p></article></section><EnquiryCTA /></>;
}

function AboutPage() {
  return <><PageHero eyebrow="About Us" title="A considered approach to furnished interiors." copy="Nimra Interiors brings together distinctive fabrics, tailored blinds and personal guidance for spaces with lasting character." /><section className="about-page page-width"><img src={`${A}light.webp`} alt="Light passing through layered fabric" /><div><h2>Every choice begins with the room.</h2><p>We consider the visual and practical role of each fabric or blind: how it responds to light, how it feels at close range, and how naturally it works with the surrounding finishes.</p></div></section><EnquiryCTA /></>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <><PageHero eyebrow="Contact" title="Let’s shape your space together." copy="Share a few details about your room, application and preferred style, and we’ll help you find the right direction." /><section className="contact-page page-width"><div><span className="section-label">Enquiry form</span><h2>Start with a few details.</h2><p>Tell us about the room, window or furnishing application you are considering. Trade studios are welcome to include their business name and project stage.</p></div>{sent ? <div className="form-note" role="status"><h3>Your enquiry is ready.</h3><p>Thank you for sharing your project details. We look forward to helping you take the next step.</p><button className="text-link" onClick={() => setSent(false)}>Send another enquiry <ArrowRight /></button></div> : <form onSubmit={(event) => {event.preventDefault(); setSent(true);}}><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label><label>Interested in<select name="collection" defaultValue=""><option value="">Select a product or service</option><option>Trade partnership</option><option>Product consultation</option><optgroup label="Fabrics">{collections.map((item) => <option key={item.slug}>{item.title}</option>)}</optgroup><optgroup label="Blinds">{blinds.map((item) => <option key={item.slug}>{item.title}</option>)}</optgroup></select></label><label className="wide">Project details<textarea name="message" rows="5" required /></label><button className="button dark" type="submit">Prepare enquiry <ArrowRight /></button></form>}</section></>;
}

function NotFound() { return <section className="not-found page-width"><span className="section-label">404</span><h1>Page not found.</h1><Link to="/" className="button dark">Return home <ArrowRight /></Link></section>; }

function App() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, '') || '/');
  useEffect(() => { const update = () => setPath(location.pathname.replace(/\/$/, '') || '/'); addEventListener('popstate', update); return () => removeEventListener('popstate', update); }, []);
  useEffect(() => { const item = path.startsWith('/fabrics/') ? findCollection(path.split('/').pop()) : path.startsWith('/blinds/') ? findBlind(path.split('/').pop()) : null; document.title = item ? `${item.title} — Nimra Interiors` : path === '/' ? 'Nimra Interiors — Fabrics & Blinds' : `${path.slice(1).replace('-', ' ')} — Nimra Interiors`; }, [path]);
  const collection = path.startsWith('/fabrics/') ? findCollection(path.split('/').pop()) : null;
  const blind = path.startsWith('/blinds/') ? findBlind(path.split('/').pop()) : null;
  let content = <NotFound />;
  if (path === '/') content = <Home />; else if (path === '/products') content = <ProductsPage />; else if (path === '/fabrics') content = <FabricsPage />; else if (collection) content = <CollectionPage collection={collection} />; else if (path === '/blinds') content = <BlindsPage />; else if (blind) content = <CollectionPage collection={blind} type="Blind" backPath="/blinds" backLabel="All blinds" />; else if (path === '/trade') content = <TradePage />; else if (path === '/about') content = <AboutPage />; else if (path === '/contact') content = <ContactPage />;
  return <><Header /><main>{content}</main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
