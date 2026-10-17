// RenterSmartHome Score: our editorial 1-5 rating for a product, from five
// renter criteria scored 1-10 (see /how-we-score/). Criteria that don't apply
// (e.g. smart-home compatibility for an adhesive hook) are left out and the
// remaining weights are rescaled so they still add up to 100%.
export const CRITERIA = [
  { key: 'install', label: 'Install footprint', weight: 0.3 },
  { key: 'reversibility', label: 'Reversibility', weight: 0.25 },
  { key: 'value', label: 'Value and subscriptions', weight: 0.2 },
  { key: 'compatibility', label: 'Smart home compatibility', weight: 0.15 },
  { key: 'portability', label: 'Portability', weight: 0.1 },
];

// Criterion labels in the other site languages (English labels live in CRITERIA).
export const CRITERIA_LABELS = {
  de: { install: 'Montageaufwand', reversibility: 'Rückbaubarkeit', value: 'Preis und Abos', compatibility: 'Smart-Home-Kompatibilität', portability: 'Mitnahme beim Umzug' },
  es: { install: 'Huella de instalación', reversibility: 'Reversibilidad', value: 'Precio y suscripciones', compatibility: 'Compatibilidad domótica', portability: 'Portabilidad' },
  nl: { install: 'Installatie-impact', reversibility: 'Omkeerbaarheid', value: 'Prijs en abonnementen', compatibility: 'Smart home-compatibiliteit', portability: 'Meeneembaarheid' },
};

/** Label of a criterion in a language, falling back to English. */
export function criterionLabel(key, lang = 'en') {
  return CRITERIA_LABELS[lang]?.[key] ?? CRITERIA.find((c) => c.key === key)?.label ?? key;
}

/** Score = sum(criterion x weight) / sum(weights used) / 2, rounded to 0.1 (out of 5). */
export function renterScore(scores) {
  if (!scores) return null;
  let total = 0;
  let weights = 0;
  for (const c of CRITERIA) {
    const v = scores[c.key];
    if (typeof v !== 'number') continue;
    total += v * c.weight;
    weights += c.weight;
  }
  if (!weights) return null;
  return Math.round((total / weights / 2) * 10) / 10;
}
