// Route through the local proxy on localhost (dev or preview), direct in prod.
const ON_LOCALHOST = typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
const DESK_URL = ON_LOCALHOST ? "/desk-api/v1/lead" : "https://deskbackend.getnos.io/v1/lead";
const API_KEY = "lh_xiF7hDhoHbFCAQHwnKOHHKgC3EPGyv10JF_wnTIyius";
let submitting = false;

function clean(fields) {
  const out = {};
  for (const [k, v] of Object.entries(fields || {})) {
    if (v === undefined || v === null) continue;
    const s = typeof v === "string" ? v.trim() : String(v);
    if (s !== "") out[k] = s;
  }
  return out;
}

export async function submitLead(fields) {
  if (submitting) return { duplicate: true, skipped: true };
  submitting = true;
  const payload = { form: "contact", honeypot: "", page: typeof window !== "undefined" ? window.location.href : "", ...clean(fields) };
  console.log("[desk] POST", DESK_URL, payload);
  try {
    let res;
    try {
      res = await fetch(DESK_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` }, body: JSON.stringify(payload) });
    } catch (err) {
      console.error("[desk] Request blocked before reaching Desk:", err && err.message);
      throw new Error("Request blocked before reaching Desk. Please try again.");
    }
    let data = {};
    try { data = await res.json(); } catch { data = {}; }
    if (data.duplicate) { console.warn(`[desk] Duplicate ignored. leadId: ${data.leadId || "unknown"}. Change phone/email to test.`); return data; }
    if (res.status === 403 && /origin/i.test(data.message || "")) {
      console.error(`[desk] Add "${window.location.origin}" to this project's Allowed Origins in Desk.`);
      throw new Error(data.message || "Origin not allowed");
    }
    if (!res.ok) throw new Error(data.message || `Lead submit failed (${res.status})`);
    console.log("[desk] Lead accepted. leadId:", data.leadId);
    return data;
  } finally { submitting = false; }
}
