import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Anchor, ArrowUpRight, ArrowRight, Phone, MapPin, Fish, Users, Check, Menu, X, Waves, Sun, ChevronDown, Mail, ShieldCheck, Compass } from 'lucide-react';
import './styles.css';

export const phone = 'tel:+19045374000';
export const phoneLabel = '(904) 537-4000';
export const email = 'knottyseafishingcharters@yahoo.com';
export const siteUrl = 'https://charterfoshing.vercel.app';
export const defaultTitle = 'Knotty Sea | Offshore Fishing Charters in Port Orange, FL';
export const defaultDescription =
  'Private offshore fishing charters in Port Orange, FL — up to 6 guests with Captain Mike aboard Salty Dog. Trips from $1,300. Request your preferred date.';

export const trips = [
  { name: 'A little escape. A lot of action.', duration: '4–5', price: 1300, label: 'HALF-DAY ADVENTURE', desc: 'An easy way to get offshore. A great choice for families, first-timers, and a morning well spent.', icon: Sun },
  { name: 'Go further. Reel in more.', duration: '6–7', price: 1700, label: 'EXTENDED ADVENTURE', desc: 'More time to explore the fishing grounds, try different techniques, and find your next big catch.', icon: Compass },
  { name: 'Make a whole day of it.', duration: '8–9', price: 2100, label: 'FULL-DAY EXPERIENCE', desc: 'Settle into the offshore rhythm. Our full-day trip gives you more time to chase the action.', icon: Fish, popular: true },
  { name: 'For the serious angler.', duration: '10–11', price: 2500, label: 'ULTIMATE OFFSHORE', desc: 'Our longest day on the water. For anglers who want to make the most of every offshore opportunity.', icon: Waves }
];

export const faqs = [
  ['Is this a private charter?', 'Yes. The listed price is for the whole boat, for up to six guests—not per person. Bring your own crew and enjoy the boat to yourselves.'],
  ['Do I need fishing experience or a license?', 'First-timers are welcome. Captain Mike and the crew will help you get comfortable with the gear. Rods, tackle, bait, and fishing licenses are included.'],
  ['What should I bring?', 'Bring sunscreen, sunglasses, a hat, non-slip shoes, and your preferred food and drinks. Bottled water and iced cooler space are provided. Ask the captain about any special needs before your trip.'],
  ['Can we keep the fish we catch?', 'Eligible catches can be kept within current regulations, seasons, and limits. The crew cleans, bags, and ices your fish. Species and catches vary with conditions; catches are never guaranteed.'],
  ['What if the weather is bad?', 'Your captain will assess conditions before departure. Contact Captain Mike to confirm weather, rescheduling, cancellation, and deposit terms before booking. A trip request does not reserve a date or take payment.'],
  ['Where do we meet?', 'The listed meeting address is 5999 S Ridgewood Avenue, Port Orange, FL 32127. Confirm the exact dock and arrival time with Captain Mike before traveling. Free parking is listed as available.']
];

/* ---------- per-page SEO ---------- */
function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}
export function useSeo({ title, description }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    const url = siteUrl + (pathname === '/' ? '/' : pathname);
    setMeta('property', 'og:url', url);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, pathname]);
}

/* ---------- scroll behaviour on navigation ---------- */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/* ---------- booking dialog context ---------- */
const BookingContext = createContext(() => {});
export const useBooking = () => useContext(BookingContext);

export function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? 'brand-footer' : ''}`} to="/" aria-label="Knotty Sea home"><span className="brand-icon"><Anchor size={32} strokeWidth={1.5} /></span><span>KNOTTY SEA<small>FISHING CHARTERS</small></span></Link>;
}

const navItems = [
  { to: '/charters', label: 'Our charters' },
  { to: '/about', label: 'The Knotty Sea difference' },
  { to: '/experience', label: 'The experience' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/blog', label: 'Blog' }
];

export function Layout() {
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(null);
  const [prepared, setPrepared] = useState(false);
  const [mailLink, setMailLink] = useState('');
  const [draft, setDraft] = useState({});
  const dialog = useRef(null);
  const previousFocus = useRef(null);

  function openBooking(index = '') {
    previousFocus.current = document.activeElement;
    setPrepared(false);
    setDraft({});
    setBooking(index);
    setMenu(false);
  }
  function closeBooking() {
    setBooking(null);
    previousFocus.current?.focus();
  }
  useEffect(() => {
    if (booking === null) return;
    dialog.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; };
  }, [booking]);
  function prepare(e) {
    e.preventDefault();
    const d = new FormData(e.target);
    setDraft(Object.fromEntries(d));
    const body = `Hi Captain Mike,\n\nI'd like to request a fishing trip.\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nTrip: ${d.get('trip')}${/^[0-9]/.test(d.get('trip')) ? ' hours' : ''}\nPreferred date: ${d.get('date')}\nGuests: ${d.get('guests')}\nNotes: ${d.get('notes')}\n\nPlease confirm availability, current pricing, departure details, and your booking policies.`;
    setMailLink(`mailto:${email}?subject=${encodeURIComponent('Fishing charter availability request')}&body=${encodeURIComponent(body)}`);
    setPrepared(true);
  }
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const closeMenu = () => setMenu(false);

  return (
    <BookingContext.Provider value={openBooking}>
      <a className="skip" href="#main">Skip to content</a>
      <div className="topbar"><span><MapPin size={12} /> PORT ORANGE, FLORIDA</span><span>Family owned. Ocean obsessed.</span><a href={phone}><Phone size={12} /> {phoneLabel}</a></div>
      <header>
        <div className="nav wrap">
          <Brand />
          <nav className={menu ? 'open' : ''} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}>{item.label}</NavLink>
            ))}
          </nav>
          <button className="button nav-cta" onClick={() => openBooking()}>Let’s go fishing <ArrowUpRight size={17} /></button>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
        </div>
      </header>
      <main id="main"><Outlet /></main>
      <footer>
        <div className="wrap footer-main">
          <Brand footer />
          <p>Family owned. Captain led.<br />Unforgettable days on the Atlantic.</p>
          <div>
            <Link to="/charters">Our charters</Link>
            <Link to="/about">About us</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div>
            <a href={phone}>{phoneLabel}</a>
            <a href={`mailto:${email}`}>{email}</a>
            <Link to="/contact">Contact &amp; directions</Link>
            <span>Port Orange, Florida</span>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Knotty Sea Fishing Charters. All rights reserved.</span>
          <span>Saltwater. Sunshine. Stories worth telling.</span>
        </div>
      </footer>
      {booking !== null && (
        <dialog ref={dialog} className="booking-dialog" onCancel={closeBooking} onClick={(e) => { if (e.target === dialog.current) closeBooking(); }} aria-labelledby="booking-title">
          <button className="close-button" aria-label="Close trip request" onClick={closeBooking}><X /></button>
          <div className="eyebrow">YOUR NEXT GREAT DAY STARTS HERE</div>
          <h2 id="booking-title">Let’s get you offshore.</h2>
          {prepared ? (
            <div className="prepared">
              <span className="success-icon"><Mail size={30} /></span>
              <h3>Your request is ready to email.</h3>
              <p>Nothing has been sent yet. Open your email app below, then send your request to Captain Mike. Your date is not reserved until the captain confirms.</p>
              <a className="button" href={mailLink}>Open email &amp; send request <ArrowUpRight size={17} /></a>
              <button className="text-link" onClick={() => setPrepared(false)}>Edit request</button>
              <p className="form-note">No email app? Call <a href={phone}>{phoneLabel}</a> or email <a href={`mailto:${email}`}>{email}</a>.</p>
            </div>
          ) : (
            <>
              <p>Tell Captain Mike what you have in mind. He’ll confirm availability and help plan the details.</p>
              <form onSubmit={prepare}>
                <div className="form-grid">
                  <label>Your name<input name="name" defaultValue={draft.name || ''} required autoComplete="name" placeholder="Full name" /></label>
                  <label>Email address<input name="email" defaultValue={draft.email || ''} required type="email" autoComplete="email" placeholder="you@example.com" /></label>
                  <label>Phone number<input name="phone" defaultValue={draft.phone || ''} required type="tel" autoComplete="tel" placeholder="(555) 123-4567" /></label>
                  <label>Preferred date<input name="date" defaultValue={draft.date || ''} required type="date" min={minDate} /></label>
                  <label>Choose your adventure<select name="trip" defaultValue={draft.trip || (booking === '' ? '' : trips[booking].duration)} required>
                    <option value="" disabled>Select a trip</option>
                    {trips.map((t) => <option key={t.duration} value={t.duration}>{t.duration} hours · ${t.price.toLocaleString()} / boat</option>)}
                    <option value="Help me choose">Help me choose</option>
                  </select></label>
                  <label>Your crew<select name="guests" defaultValue={draft.guests || '2'}>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}</select></label>
                </div>
                <label>Anything we should know? <span>(optional)</span><textarea name="notes" defaultValue={draft.notes || ''} rows="3" placeholder="First-time anglers, kids in your crew, or a species you’d love to target…" /></label>
                <p className="form-note">This prepares an email in your email app. No payment is collected, and no date is reserved. Confirm current rates and policies with the captain.</p>
                <button type="submit" className="button">Prepare trip request <ArrowUpRight size={17} /></button>
              </form>
            </>
          )}
        </dialog>
      )}
    </BookingContext.Provider>
  );
}

/* ---------- shared page pieces ---------- */
export function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="eyebrow light"><span /> {eyebrow}</div>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
        <Anchor className="page-hero-anchor" size={190} strokeWidth={0.6} />
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section className="inclusions" aria-label="Trip benefits">
      <div className="wrap benefit-grid">
        {[[Users, 'Up to 6 guests', 'One boat. All yours.'], [Fish, 'Gear & licenses included', 'Just bring your sense of adventure.'], [Anchor, 'Captain-led adventures', 'Local knowledge. Personal service.'], [Waves, 'Dock-to-dish service', 'We clean and bag your catch.']].map(([Icon, title, sub]) => (
          <div className="benefit" key={title}><Icon size={25} strokeWidth={1.4} /><div><strong>{title}</strong><span>{sub}</span></div></div>
        ))}
      </div>
    </section>
  );
}

export function TripGrid() {
  const openBooking = useBooking();
  return (
    <div className="trip-grid">
      {trips.map((t, i) => (
        <article className={`trip-card ${t.popular ? 'popular' : ''}`} key={t.duration}>
          {t.popular && <span className="popular-label">THE FULL-DAY FAVORITE <Fish size={13} /></span>}
          <div className="trip-label"><t.icon size={19} /><span>{t.label}</span></div>
          <div className="duration">{t.duration}<span>hours</span></div>
          <h3>{t.name}</h3>
          <p>{t.desc}</p>
          <div className="trip-guests"><Users size={15} /> Private charter · up to 6 guests</div>
          <div className="price"><strong>${t.price.toLocaleString()}</strong><span>/ boat</span></div>
          <button className={`button ${t.popular ? 'lime' : 'outline'}`} onClick={() => openBooking(i)}>Request this trip <ArrowUpRight size={17} /></button>
        </article>
      ))}
    </div>
  );
}

export function PricingNote() {
  return (
    <div className="pricing-note">
      <ShieldCheck size={16} />
      <span>No per-person surprises. Equipment, bait, licenses &amp; fish cleaning included.</span>
      <span className="confirm-note">Rates subject to captain confirmation.</span>
    </div>
  );
}

export function AboutSection({ moreLink = true }) {
  return (
    <section className="about-section" id="about">
      <div className="wrap about-grid">
        <div className="about-image">
          <img src="/images/offshore-hero.jpg" alt="Illustrative offshore sportfishing adventure" loading="lazy" />
          <div className="image-note">THE BEST DAYS START AT THE DOCK. <Anchor size={23} /></div>
        </div>
        <div className="about-copy">
          <div className="eyebrow">NOT JUST A CHARTER. YOUR DAY ON THE WATER.</div>
          <h2>Real people.<br />Reel good memories.</h2>
          <p>Welcome aboard Knotty Sea. We’re a family-owned operation with a simple idea: a great day of fishing starts with people who care about your experience.</p>
          <p>Join Captain Mike aboard <strong>Salty Dog</strong>. Whether you’re helping your kids land their first fish or chasing your next offshore adventure, you’ll get a private trip and a crew focused on you.</p>
          <div className="about-checks">
            <span><Check /> Beginners &amp; families welcome</span>
            <span><Check /> Onboard bathroom</span>
            <span><Check /> Rods, tackle &amp; bait provided</span>
            <span><Check /> Water &amp; iced cooler space</span>
          </div>
          {moreLink
            ? <Link to="/about" className="text-link">More about the Knotty Sea difference <ArrowUpRight size={18} /></Link>
            : <a href={phone} className="text-link">Meet your captain. Give Mike a call. <ArrowUpRight size={18} /></a>}
        </div>
      </div>
    </section>
  );
}

export function ExperienceGrid() {
  return (
    <div className="experience-grid">
      {[[Compass, '01', 'Follow the blue water', 'Offshore trolling', 'Cover open water in search of pelagic species. Every season brings a different possibility.'], [Fish, '02', 'See what’s below', 'Reef & wreck fishing', 'Explore the structure where fish gather, with guidance from your captain.'], [Waves, '03', 'Go a little deeper', 'Bottom fishing & deep dropping', 'Discover a different side of offshore fishing, including electric-reel techniques.']].map(([Icon, num, title, sub, desc]) => (
        <article key={num}>
          <div className="experience-icon"><Icon size={32} strokeWidth={1.3} /><span>{num}</span></div>
          <small>{sub}</small>
          <h3>{title}</h3>
          <p>{desc}</p>
        </article>
      ))}
    </div>
  );
}

export function FaqList({ limit }) {
  const items = typeof limit === 'number' ? faqs.slice(0, limit) : faqs;
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}<ChevronDown size={18} /></summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function VisitSection() {
  return (
    <section className="visit wrap" id="visit">
      <div>
        <div className="eyebrow">YOUR ADVENTURE STARTS HERE</div>
        <h2>Meet us in Port Orange.</h2>
        <p>5999 S Ridgewood Avenue<br />Port Orange, FL 32127</p>
        <span>Free parking · Confirm your dock and arrival time with the captain.</span>
      </div>
      <a className="map-panel" href="https://www.google.com/maps/search/?api=1&query=5999+S+Ridgewood+Ave+Port+Orange+FL+32127" target="_blank" rel="noreferrer">
        <MapPin size={32} />
        <strong>Port Orange, Florida</strong>
        <span>Open directions in Google Maps <ArrowUpRight size={16} /></span>
      </a>
    </section>
  );
}

export function FinalCta() {
  const openBooking = useBooking();
  return (
    <section className="final-cta">
      <div className="wrap">
        <div>
          <div className="eyebrow light">MAKE ROOM FOR A LITTLE ADVENTURE</div>
          <h2>The fish aren’t going<br />to catch themselves.</h2>
          <p>Your next great story starts with a day on the water.</p>
        </div>
        <div className="cta-actions">
          <button className="button lime" onClick={() => openBooking()}>Let’s plan your trip <ArrowUpRight size={19} /></button>
          <a href={phone}><Phone size={16} /> {phoneLabel}</a>
        </div>
        <Anchor className="cta-anchor" size={230} strokeWidth={0.6} />
      </div>
    </section>
  );
}

const exploreLinks = [
  { to: '/about', title: 'The Knotty Sea difference', sub: 'Captain Mike, Salty Dog, and a family-owned crew.' },
  { to: '/experience', title: 'The experience', sub: 'Offshore trolling, reef & wreck, bottom fishing.' },
  { to: '/faqs', title: 'Straight answers', sub: 'Private charters, weather, what to bring, where we meet.' }
];

export function ExploreBand() {
  return (
    <section className="explore-band">
      <div className="wrap">
        <div className="eyebrow">KEEP EXPLORING</div>
        <div className="explore-grid">
          {exploreLinks.map((l) => (
            <Link className="explore-card" to={l.to} key={l.to}>
              <span><strong>{l.title}</strong><small>{l.sub}</small></span>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
