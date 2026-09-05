import { useEffect, useMemo, useRef, useState } from "react";
import HomeView from "./HomeView.jsx";
import PropView from "./PropView.jsx";
import { BookModal, SellModal, PropertyModal, Lightbox } from "./Modals.jsx";
import { PROPS, CONTACT } from "./data.js";

export default function App() {
  const [view, setView] = useState(typeof location !== "undefined" && location.hash === "#properties" ? "properties" : "home");
  const [menu, setMenu] = useState(false);
  const [book, setBook] = useState(false);
  const [bookStep, setBookStep] = useState(1);
  const [sell, setSell] = useState(false);
  const [activeProp, setActiveProp] = useState(null); // {key, img}
  const [pmIdx, setPmIdx] = useState(0);
  const [lb, setLb] = useState(false);

  const imgs = useMemo(() => {
    if (!activeProp) return [];
    const p = PROPS[activeProp.key];
    return p && p.imgs && p.imgs.length ? p.imgs : [activeProp.img];
  }, [activeProp]);

  const openBook = () => { setMenu(false); setBookStep(1); setBook(true); };
  const openSell = () => { setMenu(false); setSell(true); };
  const openProp = (key, img) => { const p = PROPS[key]; if (!p) { openBook(); return; } const list = p.imgs && p.imgs.length ? p.imgs : [img]; setActiveProp({ key, img }); setPmIdx(Math.max(0, list.indexOf(img || list[0]))); };
  const onCard = (card) => { if (card.prop) openProp(card.prop, card.img); else openBook(); };
  const goProperties = () => { setMenu(false); setView("properties"); window.scrollTo(0, 0); if (history.replaceState) history.replaceState(null, "", "#properties"); };
  const goHome = () => { setView("home"); if (history.replaceState) history.replaceState(null, "", "#"); };
  const navAnchor = (hash) => (ev) => { ev.preventDefault(); setMenu(false); if (view === "properties") { goHome(); setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 60); } else { document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }); } };

  // nav scrolled + progress bar + hero parallax
  useEffect(() => {
    const nav = document.getElementById("nav");
    const prog = document.getElementById("prog");
    const hero = document.getElementById("heroimg");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    const fx = () => {
      const y = window.scrollY || 0, vh = window.innerHeight;
      const h = document.documentElement.scrollHeight - vh;
      if (nav) nav.classList.toggle("scrolled", y > 40);
      if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      if (!reduce && hero && y < vh) hero.style.transform = "translate3d(0," + y * 0.08 + "px,0)";
      ticking = false;
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(fx); } };
    fx();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req, { passive: true });
    return () => { window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  });

  // scroll-reveal (ported): tag ITEM children of [data-anim] then IntersectionObserver
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ITEM = ".head > *, .about-photo, .about-body > *, .appr-intro, .ledger .r, .pt, .pcard, .res-more, .emi-card, .emi-cta, .rev, .pr, .facts, .step, details.qa, .prop-hero .wrap > *, .sellers .wrap > *, .book-grid > *, .myth";
    document.querySelectorAll("[data-anim]").forEach((sec) => {
      const st = sec.getAttribute("data-anim") || "up", alt = sec.getAttribute("data-anim-alt");
      Array.prototype.forEach.call(sec.querySelectorAll(ITEM), (el, i) => {
        if (el.closest(".marquee") || el.classList.contains("anim")) return;
        el.classList.add("anim"); el.setAttribute("data-a", alt && i % 2 ? alt : st); el.style.transitionDelay = (i % 8) * 65 + "ms";
      });
    });
    const els = Array.prototype.slice.call(document.querySelectorAll(".anim"));
    if (!reduce && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: "0px 0px -55px 0px" });
      els.forEach((el) => { if (el.closest("#prop-view")) el.classList.add("in"); else io.observe(el); });
      return () => io.disconnect();
    }
    els.forEach((el) => el.classList.add("in"));
  }, [view]);

  // body scroll lock when any overlay is open
  const anyModal = book || sell || !!activeProp || lb;
  useEffect(() => { document.body.style.overflow = anyModal ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [anyModal]);

  // Escape closes the topmost overlay
  useEffect(() => {
    const onKey = (e) => { if (e.key !== "Escape") return; if (lb) setLb(false); else if (activeProp) setActiveProp(null); else if (sell) setSell(false); else if (book) setBook(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb, activeProp, sell, book]);

  // footer year
  useEffect(() => { const y = document.getElementById("yr"); if (y) y.textContent = new Date().getFullYear(); }, []);

  return (
    <>
      <div className="prog" id="prog"></div>

      <header className="nav" id="nav">
        <a href="#top" className="brand" aria-label="NB Realtor - where trust meets address" onClick={(e) => { if (view === "properties") { e.preventDefault(); goHome(); } }}>
          <img className="logo" src="/img/img-18.png" alt="NB Realtor" /><span className="bt"><span className="nm">Realtor</span><span className="sb">Where Trust Meets Address</span></span>
        </a>
        <nav className={`lk${menu ? " open" : ""}`} id="lk">
          <a className="l" href="#about" onClick={navAnchor("#about")}>About</a>
          <a className="l" href="#approach" onClick={navAnchor("#approach")}>Approach</a>
          <a className="l" href="#properties" onClick={(e) => { e.preventDefault(); goProperties(); }}>Properties</a>
          <a className="l" href="#reviews" onClick={navAnchor("#reviews")}>Reviews</a>
          <a className="l" href="#emi" onClick={navAnchor("#emi")}>Calculator</a>
          <span className="nav-ctas"><button className="btn btn-line nav-cta nav-list" onClick={openSell}>List Property</button><button className="btn btn-solid nav-cta" onClick={openBook}>Request a Consultation</button></span>
        </nav>
        <button className="burger" id="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><span></span><span></span><span></span></button>
      </header>

      <div hidden={view !== "home"}><HomeView onBook={openBook} onSell={openSell} onCard={onCard} onProperties={goProperties} /></div>
      <div hidden={view !== "properties"}><PropView onCard={onCard} /></div>

      <footer className="ft">
        <div className="wrap">
          <div className="ft-top">
            <div><div className="ftbrand"><img className="ftlogo" src="/img/img-42.png" alt="NB Realtor - where trust meets address" /></div>
              <p className="ft-tag">Buyer-side advisory for Mumbai's finest homes. Honest counsel, curated options, a price negotiated on your side.</p></div>
            <div className="ft-meta">
              <div>South Mumbai &amp; beyond</div><div>Advising since 2014</div>
              <div><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">WhatsApp &#8250;</a></div>
              <div><a onClick={openBook} style={{ cursor: "pointer" }}>Request a consultation &#8250;</a></div>
            </div>
          </div>
          <div className="ft-bot"><span>&#169; <span id="yr"></span> Nikhil Bora · Private residential advisory</span><span>Marine Drive photograph &#183; Dr Vikramjit Kakati, CC BY-SA 4.0 &#183; cropped</span></div>
        </div>
      </footer>

      <SellModal open={sell} onClose={() => setSell(false)} />
      <PropertyModal activeProp={activeProp} imgs={imgs} idx={pmIdx} setIdx={setPmIdx} onClose={() => setActiveProp(null)} onEnquire={() => { setActiveProp(null); openBook(); }} onOpenLb={() => imgs.length && setLb(true)} lbOpen={lb} />
      <BookModal open={book} step={bookStep} setStep={setBookStep} onClose={() => setBook(false)} />
      <Lightbox open={lb} imgs={imgs} idx={pmIdx} setIdx={setPmIdx} onClose={() => setLb(false)} />
    </>
  );
}
