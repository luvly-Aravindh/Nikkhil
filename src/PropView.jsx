import { useMemo, useState } from "react";
import PropCard from "./PropCard.jsx";
import { PROP_CARDS } from "./data.js";

const LOCS = ["Parel","Dadar","Wadala West","Sewri","Sion","Lower Parel","Worli","Mahalaxmi","Prabhadevi","Matunga","Mahim"];
const STATUSES = ["Ready to move","Under construction","New launch"];
const BUDS = [["b1","\u20b93.5 Cr to \u20b95 Cr"],["b2","\u20b95 Cr to \u20b910 Cr"],["b3","\u20b910 Cr to \u20b915 Cr"],["b4","\u20b915 Cr to \u20b920 Cr"],["b5","\u20b920 Cr to \u20b930 Cr"],["b6","\u20b930 Cr+"]];

export default function PropView({ onCard }) {
  const [loc, setLoc] = useState("all");
  const [status, setStatus] = useState("all");
  const [bud, setBud] = useState("all");
  const shown = useMemo(() => PROP_CARDS.filter((c) => {
    const okL = loc === "all" || (c.loc || "") === loc;
    const okS = status === "all" || (c.status || "") === status;
    const cb = c.bud || "";
    const okB = bud === "all" || cb === "any" || cb.split(",").indexOf(bud) > -1;
    return okL && okS && okB;
  }), [loc, status, bud]);

  return (
    <div id="prop-view">
      <section className="prop-hero" id="prop-top" data-anim="rise"><div className="wrap"><span className="eyebrow">The Portfolio</span><h1>Every address, <em>in one place</em>.</h1><p>The current residences across South Bombay and beyond. Filter by location, status and budget, or open any tower for the details.</p></div></section>
      <section className="cream" id="properties" data-anim="up"><div className="wrap">
        <div className="filters"><div className="fgrid">
          <div className="ff"><label htmlFor="f-loc">Location</label>
            <select id="f-loc" value={loc} onChange={(e) => setLoc(e.target.value)}><option value="all">All locations</option>{LOCS.map((l) => <option key={l} value={l}>{l}</option>)}</select></div>
          <div className="ff"><label htmlFor="f-status">Status</label>
            <select id="f-status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Any status</option>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          <div className="ff"><label htmlFor="f-bud">Budget</label>
            <select id="f-bud" value={bud} onChange={(e) => setBud(e.target.value)}><option value="all">Any budget</option>{BUDS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></div>
          <button className="fclear" onClick={() => { setLoc("all"); setStatus("all"); setBud("all"); }}>Clear</button>
        </div><div className="fcount">{shown.length} {shown.length === 1 ? "property" : "properties"}</div></div>
        <div className="res-grid" id="prop-grid">{shown.map((c, i) => <PropCard key={i} card={c} onOpen={onCard} />)}</div>
        {shown.length === 0 && <p className="fnone">No properties match. Widen the location, status or budget.</p>}
      </div></section>
    </div>
  );
}
