import { useEffect, useRef, useState } from "react";
import { PROPS } from "./data.js";
import { bg } from "./lib.js";

/* One residence card. Rotates through the property's images when it has more
   than one and is on screen. onOpen(card) is handled by the app. */
export default function PropCard({ card, onOpen }) {
  const imgs = card.prop && PROPS[card.prop] && PROPS[card.prop].imgs && PROPS[card.prop].imgs.length > 1 ? PROPS[card.prop].imgs : null;
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!imgs) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current; if (!el) return;
    let t = null;
    const start = () => { if (t) return; t = setInterval(() => { if (!document.hidden) setIdx((i) => (i + 1) % imgs.length); }, 4000 + Math.floor(Math.random() * 2800)); };
    const stop = () => { if (t) { clearInterval(t); t = null; } };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.35 });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }, [imgs]);

  const key = imgs ? imgs[idx] : card.img;
  const b = card.np ? { className: "", style: {} } : bg(key);
  if (card.phClass === "bg-kalpataru_ext") b.style = { ...b.style, backgroundPosition: "right center" };

  return (
    <article ref={ref} className={`pcard${card.np ? " np" : ""}`} onClick={() => onOpen(card)} style={{ cursor: "pointer" }}>
      <div className={`ph ${b.className}`} style={{ ...b.style, transition: "opacity .3s ease" }}></div>
      {card.dev && <span className="dev">{card.dev}</span>}
      {card.npLoc && <span className="np-loc">{card.npLoc}</span>}
      {card.badge && <span className="badge">{card.badge}</span>}
      {card.statusLabel && <span className="status">{card.statusLabel}</span>}
      <div className="bd">
        <h3>{card.name}</h3>
        <div className="loc">{card.locText}</div>
        {card.meta && <div className="meta">{card.meta}</div>}
        <div className="foot">
          {card.price2 && <span className="price2">{card.price2}</span>}
          <span className="vw">{card.vw}</span>
        </div>
      </div>
    </article>
  );
}
