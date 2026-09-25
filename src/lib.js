// Shared helpers.

// Background for a property image key: an http/data URL becomes an inline
// background-image; anything else is a CSS class (bg-<key>) from original.css.
export function bg(key) {
  if (!key) return { className: "", style: {} };
  if (key.indexOf("http") === 0 || key.indexOf("data:") === 0) return { className: "", style: { backgroundImage: `url('${key}')` } };
  return { className: `bg-${key}`, style: {} };
}

export function normalisePhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function phoneGuards(setter) {
  return {
    inputMode: "numeric", maxLength: 10,
    onKeyDown: (e) => { if (e.ctrlKey || e.metaKey || e.altKey) return; if (e.key && e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault(); },
    onPaste: (e) => { e.preventDefault(); setter(normalisePhone((e.clipboardData || window.clipboardData)?.getData("text") || "")); },
    onChange: (e) => setter(e.target.value.replace(/\D/g, "").slice(0, 10)),
  };
}


/* ---- Phone: country codes + per-country rules ----
   India (+91): exactly 10 digits, must start 6/7/8/9.
   Any other country: 7 to 14 digits. */
export const COUNTRIES = [
  { iso: "IN", flag: "\uD83C\uDDEE\uD83C\uDDF3", name: "India", dial: "+91" },
  { iso: "GB", flag: "\uD83C\uDDEC\uD83C\uDDE7", name: "UK", dial: "+44" },
  { iso: "US", flag: "\uD83C\uDDFA\uD83C\uDDF8", name: "USA", dial: "+1" },
  { iso: "AE", flag: "\uD83C\uDDE6\uD83C\uDDEA", name: "UAE", dial: "+971" },
  { iso: "SG", flag: "\uD83C\uDDF8\uD83C\uDDEC", name: "Singapore", dial: "+65" },
  { iso: "AU", flag: "\uD83C\uDDE6\uD83C\uDDFA", name: "Australia", dial: "+61" },
  { iso: "SA", flag: "\uD83C\uDDF8\uD83C\uDDE6", name: "Saudi Arabia", dial: "+966" },
  { iso: "QA", flag: "\uD83C\uDDF6\uD83C\uDDE6", name: "Qatar", dial: "+974" },
  { iso: "MY", flag: "\uD83C\uDDF2\uD83C\uDDFE", name: "Malaysia", dial: "+60" },
  { iso: "DE", flag: "\uD83C\uDDE9\uD83C\uDDEA", name: "Germany", dial: "+49" },
  { iso: "FR", flag: "\uD83C\uDDEB\uD83C\uDDF7", name: "France", dial: "+33" },
];

export const isIndiaDial = (dial) => dial === "+91";
export const phoneMaxLen = (dial) => (isIndiaDial(dial) ? 10 : 14);

// Strip to digits and clamp to the selected country's rules while typing/pasting.
export function sanitizePhone(dial, raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (isIndiaDial(dial)) {
    if (d.length > 10 && d.startsWith("91")) d = d.slice(2);   // pasted +91...
    else if (d.length === 11 && d.startsWith("0")) d = d.slice(1); // pasted 0...
    d = d.replace(/^[0-5]+/, "");                                // must start 6-9
    return d.slice(0, 10);
  }
  return d.slice(0, 14);
}

export function validatePhone(dial, digits) {
  const d = String(digits || "");
  return isIndiaDial(dial) ? /^[6-9][0-9]{9}$/.test(d) : /^[0-9]{7,14}$/.test(d);
}

export function phoneError(dial) {
  return isIndiaDial(dial)
    ? "Enter a valid 10-digit mobile number starting 6, 7, 8 or 9."
    : "Enter a valid phone number (7 to 14 digits).";
}
