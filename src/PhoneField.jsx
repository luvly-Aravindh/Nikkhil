import { COUNTRIES, sanitizePhone, phoneMaxLen } from "./lib.js";

/* Country-code dropdown + number input. Both controls inherit the form's
   existing .fld input/select styling; .phone-field only lays them out in a row.
   Validation rules are applied dynamically from the selected country. */
export default function PhoneField({ id, dial, value, onDial, onChange, invalid }) {
  const blockNonDigit = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key && e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
  };
  return (
    <div className={"phone-field" + (invalid ? " is-invalid" : "")}>
      <select
        className="phone-cc"
        aria-label="Country code"
        value={dial}
        onChange={(e) => { onDial(e.target.value); onChange(sanitizePhone(e.target.value, value)); }}
      >
        {COUNTRIES.map((c) => (
          <option key={c.iso} value={c.dial}>{c.flag} {c.dial}</option>
        ))}
      </select>
      <input
        id={id}
        className="phone-num"
        type="tel"
        autoComplete="tel"
        inputMode="numeric"
        maxLength={phoneMaxLen(dial)}
        value={value}
        aria-invalid={!!invalid}
        onKeyDown={blockNonDigit}
        onPaste={(e) => { e.preventDefault(); onChange(sanitizePhone(dial, (e.clipboardData || window.clipboardData)?.getData("text") || "")); }}
        onChange={(e) => onChange(sanitizePhone(dial, e.target.value))}
      />
    </div>
  );
}
