import { useMemo, useState } from "react";

const money = (x) => "\u20b9" + Math.round(x).toLocaleString("en-IN");
const cr = (x) => (x >= 1e7 ? "\u20b9" + (x / 1e7).toFixed(2) + " Cr" : "\u20b9" + (x / 1e5).toFixed(2) + " L");
const pct = (v) => (+v).toFixed(2).replace(/0+$/, "").replace(/\.$/, "") + "%";

export default function Emi() {
  const [amt, setAmt] = useState(50000000);
  const [rate, setRate] = useState(8.5);
  const [ten, setTen] = useState(20);
  const d = useMemo(() => {
    const P = +amt, R = +rate / 1200, N = +ten * 12;
    const emi = R > 0 ? (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1) : P / N;
    const total = emi * N, interest = total - P;
    return { emi, total, interest, P, deg: (P / total) * 360 };
  }, [amt, rate, ten]);
  return (
    <div className="emi-card">
      <div className="emi-inputs">
        <div className="emi-field"><div className="emi-lab"><label>Loan amount</label><span className="emi-val">{cr(amt)}</span></div>
          <input type="range" min="2500000" max="500000000" step="500000" value={amt} onChange={(e) => setAmt(+e.target.value)} aria-label="Loan amount" /></div>
        <div className="emi-field"><div className="emi-lab"><label>Interest rate</label><span className="emi-val">{pct(rate)}</span></div>
          <input type="range" min="6" max="12" step="0.05" value={rate} onChange={(e) => setRate(+e.target.value)} aria-label="Interest rate" /></div>
        <div className="emi-field"><div className="emi-lab"><label>Loan tenure</label><span className="emi-val">{ten} yr</span></div>
          <input type="range" min="1" max="30" step="1" value={ten} onChange={(e) => setTen(+e.target.value)} aria-label="Loan tenure" /></div>
      </div>
      <div className="emi-out">
        <div className="emi-donut" style={{ "--emi-deg": d.deg + "deg" }}>
          <div className="emi-donut-hole"><span className="emi-hole-lab">Monthly EMI</span><span className="emi-hole-val">{money(d.emi)}</span></div>
        </div>
        <div className="emi-legend">
          <div className="emi-leg"><span className="emi-dot dot-p"></span>Principal <b>{money(d.P)}</b></div>
          <div className="emi-leg"><span className="emi-dot dot-i"></span>Total interest <b>{money(d.interest)}</b></div>
          <div className="emi-leg emi-tot">Total payable <b>{money(d.total)}</b></div>
        </div>
      </div>
    </div>
  );
}
