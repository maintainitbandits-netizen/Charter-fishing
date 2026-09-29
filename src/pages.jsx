import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Anchor, Phone, Mail, MapPin, Users } from 'lucide-react';
import {
  useSeo, defaultTitle, defaultDescription,
  phone, phoneLabel, email,
  Benefits, TripGrid, PricingNote, AboutSection, ExperienceGrid, FaqList,
  VisitSection, FinalCta, PageHero, ExploreBand
} from './site.jsx';
import { posts, getPost } from './blog.js';

/* ================= HOME ================= */
export function Home() {
  useSeo({ title: defaultTitle, description: defaultDescription });
  return (
    <>
      <section className="hero" id="home">
        <img className="hero-image" src="/images/offshore-hero.jpg" alt="An offshore sportfishing boat cruising across the Atlantic, illustrative scene" fetchpriority="high" />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="eyebrow light"><span /> GOOD TIMES. TIGHT LINES.</div>
          <h1>A little saltwater.<br />A great big <span>story.</span></h1>
          <p>Leave the everyday at the dock. Head offshore with<br className="desktop-break" /> Captain Mike for a fishing trip you’ll talk about long<br className="desktop-break" /> after the last cast.</p>
          <div className="hero-actions">
            <a href="#charters" className="button lime">Find your adventure <ArrowUpRight size={18} /></a>
            <a className="hero-call" href={phone}><Phone size={17} /> Talk to the captain</a>
          </div>
          <div className="hero-proof">
            <span><Users size={16} /> Your crew. Your private charter.</span>
            <i />
            <span><MapPin size={16} /> Port Orange, FL</span>
          </div>
        </div>
        <div className="hero-bottom wrap">
          <span>THE ATLANTIC IS CALLING.</span>
          <a href="#charters">SCROLL TO EXPLORE <ArrowRight size={15} /></a>
        </div>
        <div className="ocean-stamp">
          <Anchor size={26} />
          <span>LESS SCROLLING<br />MORE REELING</span>
        </div>
      </section>
      <Benefits />
      <section className="section charters wrap" id="charters">
        <div className="section-top">
          <div>
            <div className="eyebrow">PICK YOUR PERFECT DAY</div>
            <h2>Your crew. Your kind of adventure.</h2>
          </div>
          <p>From your first cast to your next big catch,<br />there’s a trip with your name on it.</p>
        </div>
        <TripGrid />
        <PricingNote />
      </section>
      <AboutSection />
      <section className="section wrap experience" id="experience">
        <div className="section-top">
          <div>
            <div className="eyebrow">A DIFFERENT KIND OF OUT OF OFFICE</div>
            <h2>Find your offshore happy place.</h2>
          </div>
          <Link to="/charters" className="text-link">Explore the trips <ArrowUpRight size={18} /></Link>
        </div>
        <ExperienceGrid />
        <p className="season-note">The captain tailors techniques to your trip and conditions. Species, availability, and catches vary by season.</p>
      </section>
      <section className="faq-section" id="faq">
        <div className="wrap faq-grid">
          <div>
            <div className="eyebrow">A FEW THINGS BEFORE WE CAST OFF</div>
            <h2>Good questions.<br />Straight answers.</h2>
            <p>New to offshore fishing? We’ve got you.</p>
            <a href={phone} className="text-link"><Phone size={16} /> Ask Captain Mike <ArrowUpRight size={17} /></a>
          </div>
          <FaqList />
        </div>
      </section>
      <VisitSection />
      <FinalCta />
    </>
  );
}

/* ================= CHARTERS ================= */
export function Charters() {
  useSeo({
    title: 'Charter Trips & Rates | Knotty Sea Fishing Charters',
    description: 'Private fishing charters from $1,300–$2,500 in Port Orange, FL — half-day to full-day trips for up to 6 guests. Gear, bait, licenses and fish cleaning included.'
  });
  return (
    <>
      <PageHero
        eyebrow="PICK YOUR PERFECT DAY"
        title="Four trips. One private boat."
        lead="Half-day to full-day private charters out of Port Orange, Florida — rates are per boat for up to six guests and confirmed by the captain."
      />
      <Benefits />
      <section className="section charters wrap">
        <div className="section-top">
          <div>
            <div className="eyebrow">YOUR CHARTER OPTIONS</div>
            <h2>Your crew. Your kind of adventure.</h2>
          </div>
          <p>From your first cast to your next big catch,<br />there’s a trip with your name on it.</p>
        </div>
        <TripGrid />
        <PricingNote />
        <div className="how-steps">
          <div><span>01</span><strong>Send a trip request</strong><p>Pick a trip and tell us your date and crew — the site prepares your email to the captain.</p></div>
          <div><span>02</span><strong>Captain confirms</strong><p>Availability, current rates, departure details, and policies come straight from Captain Mike.</p></div>
          <div><span>03</span><strong>Meet us at the dock</strong><p>5999 S Ridgewood Avenue, Port Orange — free parking. Confirm your arrival time with the captain.</p></div>
        </div>
      </section>
      <section className="faq-section">
        <div className="wrap faq-grid">
          <div>
            <div className="eyebrow">BEFORE YOU BOOK</div>
            <h2>Good questions.<br />Straight answers.</h2>
            <p>New to offshore fishing? We’ve got you.</p>
            <Link to="/faqs" className="text-link">See all FAQs <ArrowUpRight size={17} /></Link>
          </div>
          <FaqList limit={2} />
        </div>
      </section>
      <ExploreBand />
      <FinalCta />
    </>
  );
}

/* ================= ABOUT ================= */
export function About() {
  useSeo({
    title: 'About Captain Mike & Salty Dog | Knotty Sea Charters',
    description: 'Family-owned Knotty Sea Fishing Charters, Port Orange FL — meet Captain Mike, Salty Dog, and a crew focused on private trips for up to 6 guests.'
  });
  return (
    <>
      <PageHero
        eyebrow="THE KNOTTY SEA DIFFERENCE"
        title="Family owned. Ocean obsessed."
        lead="A private boat, a captain who cares, and a simple idea — a great day of fishing starts with people who look after your crew."
      />
      <Benefits />
      <AboutSection moreLink={false} />
      <ExploreBand />
      <FinalCta />
    </>
  );
}

/* ================= EXPERIENCE ================= */
export function Experience() {
  useSeo({
    title: 'Offshore Fishing Techniques | Knotty Sea, Port Orange FL',
    description: 'Offshore trolling, reef & wreck fishing, and bottom fishing with Knotty Sea — techniques tailored to your crew, the season, and the conditions.'
  });
  return (
    <>
      <PageHero
        eyebrow="THE EXPERIENCE"
        title="Where the water takes us."
        lead="Offshore trolling, reef and wreck fishing, and bottom fishing — shaped around your crew, the season, and the conditions on the day."
      />
      <section className="section wrap experience">
        <div className="section-top">
          <div>
            <div className="eyebrow">A DIFFERENT KIND OF OUT OF OFFICE</div>
            <h2>Find your offshore happy place.</h2>
          </div>
          <Link to="/charters" className="text-link">Explore the trips <ArrowUpRight size={18} /></Link>
        </div>
        <ExperienceGrid />
        <p className="season-note">The captain tailors techniques to your trip and conditions. Species, availability, and catches vary by season.</p>
      </section>
      <ExploreBand />
      <FinalCta />
    </>
  );
}

/* ================= FAQS ================= */
export function Faqs() {
  useSeo({
    title: 'Fishing Charter FAQs | Knotty Sea Fishing Charters',
    description: 'Answers about private charters, licenses, weather, what to bring, keeping your catch, and where we meet in Port Orange, FL.'
  });
  return (
    <>
      <PageHero
        eyebrow="BEFORE WE CAST OFF"
        title="Good questions. Straight answers."
        lead="Private charters, licenses, weather, what to bring, and where we meet — everything to know before you book."
      />
      <section className="faq-section">
        <div className="wrap faq-grid">
          <div>
            <div className="eyebrow">A FEW THINGS BEFORE WE CAST OFF</div>
            <h2>New to offshore<br />fishing?</h2>
            <p>We’ve got you — and Captain Mike is one call away.</p>
            <a href={phone} className="text-link"><Phone size={16} /> Ask Captain Mike <ArrowUpRight size={17} /></a>
          </div>
          <FaqList />
        </div>
      </section>
      <ExploreBand />
      <FinalCta />
    </>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  useSeo({
    title: 'Contact & Directions | Knotty Sea Fishing Charters',
    description: 'Call (904) 537-4000 or email Knotty Sea Fishing Charters — meet us at 5999 S Ridgewood Avenue, Port Orange, FL 32127.'
  });
  return (
    <>
      <PageHero
        eyebrow="LET’S TALK FISHING"
        title="Plan your trip with Captain Mike."
        lead="Call, email, or find us at the dock in Port Orange — every trip request gets a personal reply from the captain."
      />
      <div className="contact-grid wrap section">
        <a className="contact-card" href={phone}><Phone size={24} /><strong>Call the captain</strong><span>{phoneLabel}</span></a>
        <a className="contact-card" href={`mailto:${email}`}><Mail size={24} /><strong>Email us</strong><span>{email}</span></a>
        <div className="contact-card"><MapPin size={24} /><strong>Meet at the dock</strong><span>5999 S Ridgewood Avenue<br />Port Orange, FL 32127</span></div>
      </div>
      <VisitSection />
      <ExploreBand />
      <FinalCta />
    </>
  );
}

/* ================= BLOG ================= */
export function Blog() {
  useSeo({
    title: 'Fishing Charters Blog | Knotty Sea Fishing Charters',
    description: 'Trip notes, seasonal updates, and offshore know-how from the Knotty Sea crew in Port Orange, FL.'
  });
  return (
    <>
      <PageHero
        eyebrow="FROM THE DOCK"
        title="Stories, tips & trip notes."
        lead="Trip prep, seasonal updates, and tales from the water — published with the captain’s approval."
      />
      <section className="section wrap">
        <div className="blog-list">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <time dateTime={post.date}>{post.dateLabel}</time>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link className="text-link" to={`/blog/${post.slug}`}>Read the full story <ArrowUpRight size={17} /></Link>
            </article>
          ))}
        </div>
      </section>
      <ExploreBand />
      <FinalCta />
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  useSeo({
    title: post ? `${post.title} | Knotty Sea` : 'Post not found | Knotty Sea',
    description: post ? post.excerpt : 'This blog post could not be found.'
  });
  if (!post) {
    return <NotFound />;
  }
  const others = posts.filter((p) => p.slug !== post.slug);
  return (
    <>
      <section className="post-hero">
        <div className="wrap">
          <Link className="back-link" to="/blog">← All posts</Link>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </section>
      <article className="post wrap section">
        {post.paragraphs.map((text, i) => <p key={i}>{text}</p>)}
        <div className="post-cta">
          <Link className="button" to="/charters">See charter trips <ArrowUpRight size={17} /></Link>
          <a className="text-link" href={phone}><Phone size={16} /> {phoneLabel}</a>
        </div>
      </article>
      <section className="more-posts">
        <div className="wrap">
          <div className="eyebrow">MORE FROM THE BLOG</div>
          <div className="blog-list compact">
            {others.map((p) => (
              <article className="blog-card" key={p.slug}>
                <time dateTime={p.date}>{p.dateLabel}</time>
                <h2>{p.title}</h2>
                <Link className="text-link" to={`/blog/${p.slug}`}>Read the full story <ArrowUpRight size={17} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

/* ================= 404 ================= */
export function NotFound() {
  useSeo({ title: 'Page not found | Knotty Sea Fishing Charters', description: 'This page could not be found.' });
  return (
    <>
      <section className="not-found wrap">
        <div className="eyebrow">404 · DEEP WATER</div>
        <h1>Well, that’s deep water.</h1>
        <p>The page you’re after doesn’t exist — but the fish do. Head back to solid ground and try one of these:</p>
        <div className="not-found-links">
          <Link className="button" to="/">Back to home <ArrowUpRight size={17} /></Link>
          <Link className="button outline" to="/charters">See charter trips</Link>
          <Link className="button outline" to="/blog">Read the blog</Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
