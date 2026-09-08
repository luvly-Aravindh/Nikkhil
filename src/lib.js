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
