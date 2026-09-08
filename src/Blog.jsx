import { useEffect, useRef, useState } from "react";
import { BLOGS } from "./blogData.js";

const preview = (b) => (b.intro && b.intro[0]) || "";

export default function Blog({ onBook, active }) {
  const root = useRef(null);
  const [openId, setOpenId] = useState(null);
  const current = BLOGS.find((b) => b.id === openId) || null;

  // Scroll-reveal. Re-runs when the tab becomes active or the open post changes,
  // so freshly rendered elements animate in.
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = root.current ? root.current.querySelectorAll("[data-breveal]:not(.in)") : [];
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active, openId]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "auto" });
  const open = (id) => { setOpenId(id); toTop(); };
  const back = () => { setOpenId(null); toTop(); };

  // ---- List / preview view ----
  if (!current) {
    return (
      <div className="blog-view" ref={root}>
        <section className="blog-hero">
          <div className="wrap">
            <p className="blog-eyebrow" data-breveal>The Journal</p>
            <h1 data-breveal>Guides for buying with clarity.</h1>
            <p data-breveal>Practical, honest reading for buyers weighing a home in Mumbai. No inventory pitches, just the questions worth asking before you commit.</p>
          </div>
        </section>

        <section className="blog-body">
          <div className="blog-cards">
            {BLOGS.map((b) => (
              <article className="blog-card" key={b.id} data-breveal onClick={() => open(b.id)}>
                <div className="blog-card-fig">
                  <img src={b.image} alt={b.imageAlt} loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <h2 className="blog-card-title">{b.title}</h2>
                  <div className="article-meta">{b.readTime}</div>
                  <p className="blog-card-desc">{preview(b)}</p>
                  <span className="blog-card-link">Read the guide &#8594;</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ---- Full article / detail view ----
  const b = current;
  return (
    <div className="blog-view" ref={root}>
      <section className="blog-body">
        <article className="article article-solo">
          <button className="blog-back" onClick={back}>&#8592; All guides</button>

          <div className="article-head">
            <p className="blog-eyebrow" data-breveal>{b.eyebrow}</p>
            <h2 className="title" data-breveal>{b.title}</h2>
            <div className="article-meta" data-breveal>{b.readTime}</div>
          </div>

          <figure className="article-fig" data-breveal>
            <img src={b.image} alt={b.imageAlt} loading="lazy" />
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>

          <div className="article-content">
            {b.intro.map((p, i) => (<p key={i} className={i === 0 ? "lead" : ""} data-breveal>{p}</p>))}

            {b.glance && (
              <div className="glance" data-breveal>
                <div className="glance-note">{b.glance.note}</div>
                {[b.glance.left, b.glance.right].map((c, ci) => (
                  <div className="glance-col" key={ci}><h4>{c.title}</h4><ul>{c.points.map((pt, pi) => <li key={pi}>{pt}</li>)}</ul></div>
                ))}
              </div>
            )}

            {b.sections.map((s, si) => (
              <div key={si}>
                <h3 className="sec" data-breveal>{s.h}</h3>
                {s.body.map((p, pi) => <p key={pi} data-breveal>{p}</p>)}
              </div>
            ))}

            {b.faqs && b.faqs.length > 0 && (
              <div className="faq-block">
                <div className="faq-h" data-breveal>Frequently asked questions</div>
                {b.faqs.map((f, fi) => (<div className="faq-item" key={fi} data-breveal><div className="q">{f.q}</div><div className="a">{f.a}</div></div>))}
              </div>
            )}

            <div className="article-cta" data-breveal>
              <h3>{b.outro.h}</h3>
              {b.outro.body.map((p, i) => <p key={i}>{p}</p>)}
              <button className="btn btn-solid" onClick={onBook}>{b.outro.cta} &#8594;</button>
            </div>

            {b.disclaimer && <p className="article-disclaimer" data-breveal>{b.disclaimer}</p>}

            <div className="blog-back-foot"><button className="blog-back" onClick={back}>&#8592; All guides</button></div>
          </div>
        </article>
      </section>
    </div>
  );
}
