// Banque de questions — PRIVATE EQUITY (LBO, mid-cap France).
// Questions d'entretien classées facile (incontournables) / moyen / difficile, corrections complètes.
// Sources : guides d'entretien (Copeps, Leland, Financial Edge), guide Chambers Private Equity 2026 (France),
// publications sur l'article 163 bis H du CGI (HLC, Rothschild Martin Maurel), pratiques de place.
import metier from './pe/metier.js';
import lbo from './pe/lbo.js';
import rendement from './pe/rendement.js';
import dette from './pe/dette.js';
import valo from './pe/valo.js';
import these from './pe/these.js';
import mgmt from './pe/mgmt.js';
import sortie from './pe/sortie.js';
import fit from './pe/fit.js';
import { avecComplements } from './complements.js';

export const THEMES_PE = [
  { id: 'metier', nom: 'L\'industrie du PE (GP / LP, fees, carry)', poids: 1, court: 'PE industry' },
  { id: 'lbo', nom: 'Mécanique du LBO et value creation', poids: 1.5, court: 'LBO' },
  { id: 'rendement', nom: 'Returns (IRR, MOIC) et paper LBO', poids: 1.5, court: 'Returns' },
  { id: 'dette', nom: 'LBO financing et dette', poids: 1.1, court: 'Debt' },
  { id: 'valo', nom: 'Valuation et pricing', poids: 1.1, court: 'Valuation' },
  { id: 'these', nom: 'Investment thesis et due diligence', poids: 1.3, court: 'Thesis' },
  { id: 'mgmt', nom: 'Management package et governance', poids: 0.9, court: 'MIP' },
  { id: 'sortie', nom: 'Exits et marché 2026', poids: 0.9, court: 'Exits' },
  { id: 'fit', nom: 'Fit et motivation', poids: 1.2, court: 'Fit' },
  { id: 'cas', nom: 'Études de cas', poids: 1.3, court: 'Cas' },
];

// Les compléments (réponse complète, exemple, pièges, relances) sont fusionnés au chargement
export const QUESTIONS_PE = avecComplements([...metier, ...lbo, ...rendement, ...dette, ...valo, ...these, ...mgmt, ...sortie, ...fit]);
