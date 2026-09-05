import PropCard from "./PropCard.jsx";
import Emi from "./Emi.jsx";
import { HOME_CARDS, MARQUEE, DEV_LOGOS, REVIEWS, FAQS, STEPS, LEDGER } from "./data.js";
import { bg } from "./lib.js";

export default function HomeView({ onBook, onSell, onCard, onProperties }) {
  return (
    <div id="home-view">
      <section className="hero" id="top">
        <div className="hero-img" id="heroimg" style={{ backgroundImage: "url('/img/img-19.jpg')" }}>
          <div className="hero-day" style={{ backgroundImage: "url('/img/img-20.jpg')" }}></div>
        </div>
        <div className="wrap">
          <span className="eyebrow">Private Residential Advisory &nbsp;·&nbsp; Mumbai</span>
          <h1>Mumbai's finest addresses, secured on <em>your side</em> of the table.</h1>
          <p className="sub">A private, buyer-side advisor for the city's most sought-after homes. Honest counsel, a curated shortlist, and a price negotiated in your favour.</p>
          <div className="hero-act">
            <button className="btn btn-solid" onClick={onBook}>Request a Consultation <span className="arw">&#8594;</span></button>
            <a className="btn btn-line" href="#residences">View Residences</a>
          </div>
          <div className="trust"><span>Advising since 2014</span><span>Buyer-side only</span><span>South Mumbai &amp; beyond</span><span>&#8377;3.5 Cr to &#8377;200 Cr</span></div>
        </div>
      </section>

      <section className="cream" id="about" data-anim="left">
        <div className="wrap about-grid">
          <div className="about-photo"><img src="/img/img-21.jpeg" alt="Nikhil Bora" /><div className="cap">Nikhil Bora &nbsp;·&nbsp; Private Residential Advisory</div></div>
          <div className="about-body">
            <span className="eyebrow">The Advisor</span>
            <h2>A decade at the top of South Mumbai's <em>market</em>.</h2>
            <p>For more than ten years, Nikhil Bora has worked at the forefront of South Mumbai's high-end residential market. A finance professional with a background in banking before real estate, he brings the analytical rigour of the numbers to every transaction, and the calm of someone who has closed complex deals many times over.</p>
            <p>His work rests on two things: winning trust the honest way, and keeping the client relationships that follow for years. The aim is simple. Exceptional service, real market insight, and the right home secured on your terms, across South Mumbai and beyond.</p>
            <div className="about-tags"><span className="tag">Property Specialist</span><span className="tag">Banking &amp; Finance background</span><span className="tag">Residential &amp; Commercial</span><span className="tag">Buyer-side representation</span></div>
          </div>
        </div>
      </section>

      <section id="approach" data-anim="right">
        <div className="wrap">
          <div className="head"><span className="eyebrow">The Approach</span><h2>I represent <em>you</em>. That changes everything.</h2>
            <p className="appr-intro">Most brokers answer to the builder and the commission. I answer to the person buying the home. That single fact decides which residences you are shown, what I tell you about each one, and the price you finally pay.</p></div>
          <div className="ledger">
            <div className="r"><div className="hd a">The usual broker</div><div className="hd b">With Nikhil Bora</div></div>
            {LEDGER.map(([a, b], i) => (<div className="r" key={i}><div className="a">{a}</div><div className="b">{b}</div></div>))}
          </div>
          <div className="myth"><p>The myth is that a middleman costs you more. The opposite is true. My clients have saved lakhs on price, because I negotiate for you, not for the sale.</p></div>
        </div>
      </section>

      <section className="cream partners" data-anim="zoom">
        <div className="wrap">
          <div className="head"><span className="eyebrow">In Partnership With</span><h2>The developers behind <em>every address</em>.</h2><p className="intro">Direct access to inventory from Mumbai's most trusted, top-rated developers.</p></div>
          <div className="dev-grid">
            {DEV_LOGOS.map((d, i) => (<div className="dev-cell" key={i}><img className="dev-logo" src={d.src} width={d.w} height={d.h} loading="lazy" decoding="async" alt={d.alt} /></div>))}
          </div>
        </div>
      </section>

      <section className="cream" id="residences" data-anim="rise">
        <div className="wrap">
          <div className="head"><span className="eyebrow">The Residences</span><h2>Find your <em>address</em>.</h2><p className="intro">A selection from the current portfolio. See the full list of residences across South Bombay and beyond.</p></div>
          <div className="res-grid" id="res-grid">{HOME_CARDS.map((c, i) => (<PropCard key={i} card={c} onOpen={onCard} />))}</div>
          <div className="res-more"><button className="btn btn-solid" onClick={onProperties}>View all properties <span className="arw">&#8594;</span></button></div>
        </div>
      </section>

      <section id="emi" data-anim="blur">
        <div className="wrap"><div className="head"><span className="eyebrow">Home Loan Assistance</span><h2>Plan the numbers <em>before you fall in love</em>.</h2><p className="intro">From sanction to disbursement, I connect you with the right lenders and sharper rates. Start with the monthly picture below.</p></div>
          <Emi />
          <div className="emi-cta"><button className="btn btn-solid" onClick={onBook}>Talk to me about a home loan <span className="arw">&#8594;</span></button></div>
        </div>
      </section>

      <section className="sellers" id="sellers" data-anim="up">
        <div className="wrap"><span className="eyebrow">Sellers</span><h2>Own a residence? <em>List it</em> with Nikhil.</h2><p>An honest valuation and qualified, serious buyers, handled personally from the first call through to registration.</p>
          <button className="btn btn-solid" onClick={onSell}>List Your Property <span className="arw">&#8594;</span></button></div>
      </section>

      <section id="calibre" data-anim="fade">
        <div className="wrap"><div className="head"><span className="eyebrow">The Calibre</span><h2>Homes worth <em>holding out for</em>.</h2></div>
          <div className="calibre-scroll"><div className="marquee">
            {[...MARQUEE, ...MARQUEE].map((t, i) => { const b = bg(t.img); return (
              <button key={i} className={`ptile ${b.className}${i >= MARQUEE.length ? " dup" : ""}`} style={b.style} onClick={() => onCard({ prop: t.prop, img: t.img })} aria-label={`${t.nm}, ${t.lo}`}>
                <span className="cap"><span className="nm">{t.nm}</span><span className="lo">{t.lo}</span></span><span className="view">View details &#8594;</span>
              </button>); })}
          </div></div>
          <p className="calibre-hint">Tap any residence to see the details</p>
        </div>
      </section>

      <section className="cream" id="process" data-anim="left" data-anim-alt="right">
        <div className="wrap"><div className="head"><span className="eyebrow">How It Works</span><h2>Four steps. <em>One visit that matters.</em></h2></div>
          <div className="steps">{STEPS.map(([no, h, p], i) => (<div className="step" key={i}><div className="no">{no}</div><div><h3>{h}</h3><p>{p}</p></div></div>))}</div>
          <div className="anim in" data-a="up" style={{ marginTop: 44 }}><button className="btn btn-line" onClick={onBook}>Request a Consultation <span className="arw">&#8594;</span></button></div>
        </div>
      </section>

      <section id="standard" data-anim="zoom" data-anim-alt="up">
        <div className="wrap"><div className="head"><span className="eyebrow">The Standard</span><h2>Trust is the only thing <em>I sell</em>.</h2></div>
          <div className="pr3">
            <div className="pr"><h3><em>Transparency</em></h3><p>You see the real price, the real comparables and the real flaws. Nothing is hidden to protect a sale.</p></div>
            <div className="pr"><h3><em>Loyalty</em></h3><p>One client at a time on your side. Your budget stays confidential, and your interest comes before the deal.</p></div>
            <div className="pr"><h3><em>Ethics</em></h3><p>Everything in writing. A fully compliant, fully documented purchase, whether you are in Mumbai or abroad.</p></div>
          </div>
          <div className="facts"><span>Advising since <b>2014</b></span><span><b>Buyer-side</b> only</span><span>South Mumbai &amp; beyond</span><span>&#8377;3.5 Cr to &#8377;200 Cr</span></div>
        </div>
      </section>

      <section className="cream" id="reviews" data-anim="up" data-anim-alt="zoom">
        <div className="wrap"><div className="head"><span className="eyebrow">In Their Words</span><h2>What buyers say about <em>working with me</em>.</h2></div>
          <div className="rev-grid">{REVIEWS.map((r, i) => (
            <div className="rev" key={i}><div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><q>{r.q}</q>
              <div className="who"><img src={r.img} alt="" /><div><div className="nm">{r.nm}</div><div className="lo">{r.lo}</div></div></div></div>))}</div>
        </div>
      </section>

      <section className="cream" id="questions" data-anim="right">
        <div className="wrap"><div className="head"><span className="eyebrow">Questions</span><h2>The things worth asking <em>first</em>.</h2></div>
          <div className="faq">{FAQS.map(([q, a], i) => (
            <details className="qa" key={i}><summary>{q}<span className="pl">+</span></summary><div className="an"><p>{a}</p></div></details>))}</div>
        </div>
      </section>

      <section id="book" data-anim="left">
        <div className="wrap"><div className="head"><span className="eyebrow">By Appointment</span><h2>Request a private <em>consultation</em>.</h2></div>
          <div className="book-grid">
            <div className="book"><p className="intro">Tell me what you are looking for, then choose a time that suits you. I will come to the meeting prepared with an honest view of your options.</p>
              <div className="book-act"><button className="btn btn-solid" onClick={onBook}>Request a Consultation <span className="arw">&#8594;</span></button></div></div>
            <div className="contacts">
              <a className="cbtn" href="https://wa.me/919167243606?text=Hi%20Nikhil%2C%20I%27d%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener">
                <svg className="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.4-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.9.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" /></svg>
                <span className="t"><small>WhatsApp</small><span>+91 91672 43606</span></span></a>
              <a className="cbtn" href="tel:+919167243606">
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" /></svg>
                <span className="t"><small>Call</small><span>Speak with Nikhil directly</span></span></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
