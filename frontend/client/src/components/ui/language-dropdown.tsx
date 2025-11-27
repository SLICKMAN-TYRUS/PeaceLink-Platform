import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
  { code: "dik", label: "Dinka" },
  { code: "juba", label: "Juba Arabic" },
  { code: "nuer", label: "Nuer" },
  { code: "shiluk", label: "Shiluk" },
  { code: "bari", label: "Bari" },
];

export function LanguageDropdown() {
  const [selected, setSelected] = useState("en");

  return (
    <div style={{ position: "fixed", top: 16, left: 16, zIndex: 50 }}>
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow focus:outline-none"
        aria-label="Select language"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
}
