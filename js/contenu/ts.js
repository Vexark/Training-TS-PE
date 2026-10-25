// Banque de questions — TRANSACTION SERVICES (Financial Due Diligence).
// Questions d'entretien classées facile (incontournables) / moyen / difficile, corrections complètes.
// Sources : retours d'entretiens Big 4 et cabinets indépendants (Glassdoor), pratiques de place, normes PCG / IFRS,
// guide Chambers Private Equity 2026 (France) pour les faits de marché.
import metier from './ts/metier.js';
import comptes from './ts/comptes.js';
import qoe from './ts/qoe.js';
import bfr from './ts/bfr.js';
import dette from './ts/dette.js';
import prix from './ts/prix.js';
import ifrs from './ts/ifrs.js';
import valo from './ts/valo.js';
import fit from './ts/fit.js';
import { avecComplements } from './complements.js';

export const THEMES_TS = [
  { id: 'metier', nom: 'Le métier TS et la Financial Due Diligence', poids: 1, court: 'Métier TS' },
  { id: 'comptes', nom: 'Accounting et 3 financial statements', poids: 1.2, court: 'Accounting' },
  { id: 'qoe', nom: 'Quality of Earnings (adjusted EBITDA)', poids: 1.5, court: 'QoE' },
  { id: 'bfr', nom: 'Net Working Capital (NWC) et cash', poids: 1.3, court: 'NWC' },
  { id: 'dette', nom: 'Net debt et debt-like items', poids: 1.4, court: 'Net debt' },
  { id: 'prix', nom: 'Pricing mechanisms et SPA', poids: 1.1, court: 'SPA' },
  { id: 'ifrs', nom: 'IFRS et sujets d\'actualité', poids: 0.8, court: 'IFRS' },
  { id: 'valo', nom: 'Valuation et EV-to-Equity bridge', poids: 0.9, court: 'Valuation' },
  { id: 'fit', nom: 'Fit et motivation', poids: 1.2, court: 'Fit' },
  { id: 'cas', nom: 'Études de cas', poids: 1.3, court: 'Cas' },
];

// Les compléments (réponse complète, exemple, pièges, relances) sont fusionnés au chargement
export const QUESTIONS_TS = avecComplements([...metier, ...comptes, ...qoe, ...bfr, ...dette, ...prix, ...ifrs, ...valo, ...fit]);
