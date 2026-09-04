import { useEffect, useRef, useState } from "react";
import { PROPS, AREAS, CONTACT } from "./data.js";
import { bg, phoneGuards, normalisePhone, EMAIL_RE } from "./lib.js";
import { submitLead } from "./api/submitLead.js";

const err = { color: "#c0392b", fontSize: "12.5px", marginTop: "5px", display: "block" };
const wa = (lines) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;

/* ---------- Consultation (book) modal, 2 steps ---------- */
export function BookModal({ open, step, setStep, onClose }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", type: "To live in", budget: "\u20b93.5 Cr to \u20b95 Cr", area: "", msg: "" });
  const [e, setE] = useState({});
  const [busy, setBusy] = useState(false);
  const [waLink, setWaLink] = useState("#");
  const set = (k) => (v) => { const val = typeof v === "string" ? v : v.target.value; setF((d) => ({ ...d, [k]: val })); setE((x) => (x[k] ? { ...x, [k]: undefined } : x)); };
  const nameRef = useRef(null);
  useEffect(() => { if (open && step === 1) setTimeout(() => nameRef.current && nameRef.current.focus(), 60); }, [open, step]);

  async function submit(ev) {
    ev.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Please enter your name."; else if (f.name.trim().length < 2) er.name = "Name looks too short.";
    if (!f.phone) er.phone = "Please enter your phone number."; else if (!/^[0-9]{10}$/.test(f.phone)) er.phone = "Enter a valid 10-digit mobile number.";
    if (f.email.trim() && !EMAIL_RE.test(f.email.trim())) er.email = "Enter a valid email address.";
    setE(er); if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await submitLead({ form_type: "consultation", subject: `New Lead - Nikhil Bora Consultation`, name: f.name.trim(), phone: `+91${f.phone}`, email: f.email.trim(), buying_for: f.type, budget: f.budget, preferred_area: f.area, message: f.msg.trim() });
    } catch (err2) { console.error("Lead submit failed:", err2); }
    setBusy(false);
    setWaLink(wa(["Hi Nikhil, I would like to book a consultation.", "", "Name: " + f.name.trim(), "Phone: +91" + f.phone, f.email.trim() ? "Email: " + f.email.trim() : "", "Buying for: " + f.type, "Budget: " + f.budget, "Preferred area: " + f.area, f.msg.trim() ? "Looking for: " + f.msg.trim() : ""]));
    setStep(2);
  }

  const tidyReady = CONTACT.tidycal.indexOf("REPLACE-ME") === -1;
  return (
    <div className={`ov${open ? " on" : ""}`} id="ov" role="dialog" aria-modal="true" aria-label="Request a consultation" onClick={(ev) => ev.target.id === "ov" && onClose()}>
      <div className="modal">
        <button className="x" aria-label="Close" onClick={onClose}>&#215;</button>
        <div className="pad">
          <div style={{ display: step === 1 ? "block" : "none" }}>
            <span className="eyebrow">By Appointment</span><h3>Request a <em>consultation</em>.</h3><p className="sub">A few details first, then pick a time that suits you.</p>
            <form className="mform" noValidate onSubmit={submit}>
              <div className="frow">
                <div className="fld"><label htmlFor="m-name">Your name</label><input id="m-name" ref={nameRef} type="text" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={!!e.name} />{e.name && <small style={err}>{e.name}</small>}</div>
                <div className="fld"><label htmlFor="m-phone">Phone / WhatsApp</label><input id="m-phone" type="tel" autoComplete="tel" value={f.phone} {...phoneGuards(set("phone"))} aria-invalid={!!e.phone} />{e.phone && <small style={err}>{e.phone}</small>}</div>
              </div>
              <div className="fld"><label htmlFor="m-email">Email</label><input id="m-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={!!e.email} />{e.email && <small style={err}>{e.email}</small>}</div>
              <div className="frow">
                <div className="fld"><label htmlFor="m-type">Buying for</label><select id="m-type" value={f.type} onChange={set("type")}>{["To live in","Investment","Sky mansion","NRI purchase","Commercial"].map((o) => <option key={o}>{o}</option>)}</select></div>
                <div className="fld"><label htmlFor="m-budget">Budget</label><select id="m-budget" value={f.budget} onChange={set("budget")}>{["\u20b93.5 Cr to \u20b95 Cr","\u20b95 Cr to \u20b910 Cr","\u20b910 Cr to \u20b915 Cr","\u20b915 Cr to \u20b920 Cr","\u20b920 Cr to \u20b930 Cr","\u20b930 Cr+"].map((o) => <option key={o}>{o}</option>)}</select></div>
              </div>
              <div className="fld"><label htmlFor="m-area">Preferred area</label><select id="m-area" value={f.area} onChange={set("area")}><option value="" disabled>Select area</option>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></div>
              <div className="fld"><label htmlFor="m-msg">Anything specific</label><textarea id="m-msg" placeholder="Floor, view, layout, timelines, a particular project." value={f.msg} onChange={set("msg")} /></div>
              <button className="btn btn-solid" type="submit" disabled={busy}>{busy ? "Sending..." : <>Continue to scheduling <span className="arw">&#8594;</span></>}</button>
              <p className="mnote">Your details go straight to Nikhil. No call centre, no spam.</p>
            </form>
          </div>
          <div className="step2" style={{ display: step === 2 ? "block" : "none" }}>
            <button className="back" onClick={() => setStep(1)}>&#8592; Details</button>
            <span className="eyebrow">Almost There</span><h3>Choose a <em>time</em>.</h3>
            <div className="summary"><b>{f.name}</b> &nbsp;·&nbsp; {f.budget} &nbsp;·&nbsp; {f.area}</div>
            <div className="sched">{tidyReady
              ? <iframe src={`${CONTACT.tidycal}${CONTACT.tidycal.indexOf("?") === -1 ? "?" : "&"}name=${encodeURIComponent(f.name)}&email=${encodeURIComponent(f.email)}`} title="Schedule a consultation" loading="lazy" />
              : <div className="sched-ph"><div className="ic">&#9788;</div><h4>Live scheduling connects here</h4><p>Your calendar loads in this space once your TidyCal link is added. Until then, send your brief on WhatsApp below and Nikhil will confirm a time.</p></div>}</div>
            <div className="wa-alt">Prefer to message first? <a href={waLink} target="_blank" rel="noopener">Send your brief on WhatsApp</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sell / list property modal ---------- */
export function SellModal({ open, onClose }) {
  const [f, setF] = useState({ name: "", phone: "", project: "", loc: "", carpet: "", parking: "None", furnish: "Unfurnished", notes: "" });
  const [e, setE] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("#");
  const set = (k) => (v) => { const val = typeof v === "string" ? v : v.target.value; setF((d) => ({ ...d, [k]: val })); setE((x) => (x[k] ? { ...x, [k]: undefined } : x)); };
  useEffect(() => { if (open) { setDone(false); } }, [open]);

  async function submit(ev) {
    ev.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Please enter your name."; else if (f.name.trim().length < 2) er.name = "Name looks too short.";
    if (!f.phone) er.phone = "Please enter your phone number."; else if (!/^[0-9]{10}$/.test(f.phone)) er.phone = "Enter a valid 10-digit mobile number.";
    setE(er); if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await submitLead({ form_type: "sell_listing", subject: `New Listing - Nikhil Bora`, name: f.name.trim(), phone: `+91${f.phone}`, project: f.project.trim(), location: f.loc, carpet_sqft: f.carpet.trim(), parking: f.parking, furnishing: f.furnish, notes: f.notes.trim() });
    } catch (err2) { console.error("Lead submit failed:", err2); }
    setBusy(false);
    setWaLink(wa(["Hi Nikhil, I would like to list my property.", "", "Name: " + f.name.trim(), "Phone: +91" + f.phone, "Building / project: " + f.project.trim(), f.loc ? "Location: " + f.loc : "", f.carpet.trim() ? "Carpet area: " + f.carpet.trim() + " sq ft" : "", "Parking: " + f.parking, "Furnishing: " + f.furnish, f.notes.trim() ? "Notes: " + f.notes.trim() : ""]));
    setDone(true);
  }

  return (
    <div className={`ov${open ? " on" : ""}`} id="sov" role="dialog" aria-modal="true" aria-label="List your property" onClick={(ev) => ev.target.id === "sov" && onClose()}>
      <div className="modal">
        <button className="x" aria-label="Close" onClick={onClose}>&#215;</button>
        <div className="pad">
          <span className="eyebrow">List With Nikhil</span><h3>List your property.</h3>
          <p className="msub">Share a few details about your home. Nikhil will call you personally to value it and bring qualified buyers to the table.</p>
          {!done ? (
            <form noValidate onSubmit={submit}>
              <div className="frow">
                <div className="fld"><label htmlFor="s-name">Your name</label><input id="s-name" type="text" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={!!e.name} />{e.name && <small style={err}>{e.name}</small>}</div>
                <div className="fld"><label htmlFor="s-phone">Phone / WhatsApp</label><input id="s-phone" type="tel" autoComplete="tel" value={f.phone} {...phoneGuards(set("phone"))} aria-invalid={!!e.phone} />{e.phone && <small style={err}>{e.phone}</small>}</div>
              </div>
              <div className="frow">
                <div className="fld"><label htmlFor="s-project">Building / project</label><input id="s-project" type="text" value={f.project} onChange={set("project")} /></div>
                <div className="fld"><label htmlFor="s-loc">Location</label><select id="s-loc" value={f.loc} onChange={set("loc")}><option value="" disabled>Select area</option>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></div>
              </div>
              <div className="frow">
                <div className="fld"><label htmlFor="s-carpet">Carpet area (sq ft)</label><input id="s-carpet" type="text" inputMode="numeric" value={f.carpet} onChange={(ev) => set("carpet")(ev.target.value.replace(/[^\d]/g, ""))} /></div>
                <div className="fld"><label htmlFor="s-parking">Parking</label><select id="s-parking" value={f.parking} onChange={set("parking")}>{["None","1","2","3 or more"].map((o) => <option key={o}>{o}</option>)}</select></div>
              </div>
              <div className="fld"><label htmlFor="s-furnish">Furnishing</label><select id="s-furnish" value={f.furnish} onChange={set("furnish")}>{["Unfurnished","Semi-furnished","Fully furnished"].map((o) => <option key={o}>{o}</option>)}</select></div>
              <div className="fld"><label htmlFor="s-notes">Anything else</label><textarea id="s-notes" placeholder="Floor, views, asking price, timeline." value={f.notes} onChange={set("notes")} /></div>
              <button className="btn btn-solid" type="submit" disabled={busy}>{busy ? "Sending..." : <>Submit property details <span className="arw">&#8594;</span></>}</button>
              <p className="mnote">Your details go straight to Nikhil. He will call you personally.</p>
            </form>
          ) : (
            <div className="sell-done">
              <div className="ic">&#10003;</div><h4>Thank you</h4>
              <p>Your property details are ready for Nikhil. Send them across and he will call you personally.</p>
              <a className="btn btn-solid" href={waLink} target="_blank" rel="noopener">Send details on WhatsApp <span className="arw">&#8594;</span></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Property details modal + lightbox ---------- */
export function PropertyModal({ activeProp, imgs, idx, setIdx, onClose, onEnquire, onOpenLb, lbOpen }) {
  const hover = useRef(false);
  useEffect(() => {
    if (!activeProp || lbOpen || imgs.length < 2) return;
    const t = setInterval(() => { if (!hover.current) setIdx((i) => (i + 1) % imgs.length); }, 3200);
    return () => clearInterval(t);
  }, [activeProp, lbOpen, imgs, setIdx]);
  useEffect(() => { const m = document.querySelector(".pmodal"); if (activeProp && m) m.scrollTop = 0; }, [activeProp]);

  if (!activeProp) return null;
  const p = PROPS[activeProp.key] || {};
  const b = bg(imgs[idx]);
  return (
    <div className={`ov${activeProp ? " on" : ""}`} id="pov" role="dialog" aria-modal="true" aria-label="Residence details" onClick={(ev) => ev.target.id === "pov" && onClose()}>
      <div className="modal pmodal">
        <button className="x" aria-label="Close" onClick={onClose}>&#215;</button>
        <div className="pm-media" onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
          <div className={`pm-img ${b.className}`} style={{ ...b.style, cursor: "zoom-in" }} onClick={onOpenLb}></div>
          <span className="pm-zoom" aria-hidden="true">&#10530;</span>
          {imgs.length > 1 && <div className="pm-thumbs">{imgs.map((k, i) => { const tb = bg(k); return <button key={i} className={`pth ${tb.className}${i === idx ? " on" : ""}`} style={tb.style} aria-label="View photo" onClick={() => setIdx(i)} />; })}</div>}
        </div>
        <div className="pad">
          <span className="eyebrow">{p.dev}</span><h3>{p.name}</h3><div className="pm-loc">{p.loc}</div><p className="pm-desc">{p.desc}</p>
          <div className="pm-specs">{p.specs && p.specs.length
            ? p.specs.map((s, i) => <div className="row" key={i}><span className="k">{s[0]}</span><span className="v">{s[1]}</span></div>)
            : <p className="pm-onreq">Configurations and pricing shared privately, on request.</p>}</div>
          <button className="btn btn-solid" onClick={onEnquire}>Enquire about this residence <span className="arw">&#8594;</span></button>
        </div>
      </div>
    </div>
  );
}

export function Lightbox({ open, imgs, idx, setIdx, onClose }) {
  const b = imgs.length ? bg(imgs[idx]) : { className: "", style: {} };
  const go = (d) => setIdx((i) => (i + d + imgs.length) % imgs.length);
  return (
    <div className={`pmlb${open ? " on" : ""}`} id="pmlb" aria-hidden={!open} role="dialog" aria-label="Photo" onClick={(ev) => ev.target.id === "pmlb" && onClose()}>
      <div className={`pmlb-img ${b.className}`} style={b.style} onClick={() => (imgs.length > 1 ? go(1) : onClose())}></div>
      <button className="pmlb-x" aria-label="Close" onClick={onClose}>&#215;</button>
      <button className="pmlb-nav pmlb-prev" aria-label="Previous" style={{ display: imgs.length > 1 ? "" : "none" }} onClick={(ev) => { ev.stopPropagation(); go(-1); }}>&#8249;</button>
      <button className="pmlb-nav pmlb-next" aria-label="Next" style={{ display: imgs.length > 1 ? "" : "none" }} onClick={(ev) => { ev.stopPropagation(); go(1); }}>&#8250;</button>
    </div>
  );
}
