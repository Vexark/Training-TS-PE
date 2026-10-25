// Sprint de calcul mental : questions éclair à 4 choix (répondre vite, comme en entretien).
import { nombre, pct, fois } from '../outils.js';
import { propositions } from './commun.js';

const m = (x, dec = 1) => `${nombre(x, dec)} M€`;

const SPRINT_TS = [
  (r) => { const e = r.entre(4, 25, 0.5), k = r.choix([6, 7, 8, 9, 10, 12]); const b = e * k; return { q: `EBITDA ${m(e)} × ${k} = Enterprise Value ?`, ...propositions(r, b, (x) => m(x)), expl: `${nombre(e)} × ${k} = ${m(b)}` }; },
  (r) => { const ve = r.entier(60, 300), dn = r.entier(10, Math.round(ve * 0.6)); return { q: `EV ${m(ve, 0)}, net debt ${m(dn, 0)} : Equity Value ?`, ...propositions(r, ve - dn, (x) => m(x, 0), [0.1, -0.1, 0.2, -0.2, 0.3]), expl: `${ve} − ${dn} = ${ve - dn}` }; },
  (r) => { const ca = r.entier(40, 200), e = r.entre(ca * 0.05, ca * 0.25, 1); const b = e / ca; return { q: `Revenue ${m(ca, 0)}, EBITDA ${m(e, 0)} : EBITDA margin ?`, ...propositions(r, b, (x) => pct(x, 1)), expl: `${e} / ${ca} = ${pct(b)}` }; },
  (r) => { const ttc = r.choix([36.5, 73, 109.5, 146]), d = r.choix([30, 40, 45, 50, 60, 75, 90]); const cr = ttc * d / 365; return { q: `Revenue TTC ${m(ttc)}, créances clients ${m(cr)} : DSO ?`, ...propositions(r, d, (x) => `${nombre(x, 0)} j`, [0.2, -0.2, 0.4, -0.35]), expl: `${nombre(cr)} / ${nombre(ttc)} × 365 = ${d} jours` }; },
  (r) => { const p = r.choix([0.4, 0.8, 1.2, 1.6, 2, 2.4, 4]); return { q: `Provision pour litige ${m(p)}, IS 25 % : montant retenu en net debt ?`, ...propositions(r, p * 0.75, (x) => m(x, 2), [0.333, -0.25, 0.1, -0.5]), expl: `Net d'impôt : ${nombre(p)} × 75 % = ${m(p * 0.75, 2)}` }; },
  (r) => { const peg = r.entre(5, 20, 0.5), c = peg + r.choix([-3, -2, -1.5, -1, 1, 1.5, 2]); return { q: `Peg ${m(peg)}, NWC au closing ${m(c)} : price adjustment ?`, choix: [`${c - peg > 0 ? '+' : '−'}${nombre(Math.abs(c - peg))} M€`, `${c - peg > 0 ? '−' : '+'}${nombre(Math.abs(c - peg))} M€`, '0 M€', `${c - peg > 0 ? '+' : '−'}${nombre(Math.abs(c - peg) * 2)} M€`], bonne: 0, melanger: true, expl: `NWC closing − peg = ${nombre(c)} − ${nombre(peg)} : ${c < peg ? 'le prix baisse' : 'le prix monte'}` }; },
  (r) => { const a = r.choix([0.2, 0.3, 0.4, 0.5, 0.8, 1]), k = r.choix([7, 8, 9, 10, 12]); return { q: `Ajustement de −${m(a)} d'EBITDA à ${k}x : impact sur le prix ?`, ...propositions(r, a * k, (x) => `−${m(x)}`, [-0.5, 0.5, -0.875, 1]), expl: `${nombre(a)} × ${k} = ${m(a * k)} de moins` }; },
  (r) => { const a = r.entier(5, 40), g = r.choix([0.05, 0.1, 0.15, 0.2, 0.25, 0.3]); const b = a * (1 + g); return { q: `L'EBITDA passe de ${m(a, 0)} à ${m(b)} : croissance ?`, ...propositions(r, g, (x) => pct(x, 0), [0.4, -0.4, 1, -0.6]), expl: `${nombre(b)} / ${a} − 1 = ${pct(g, 0)}` }; },
  (r) => { const e = r.entier(8, 30), c = r.entre(e * 0.4, e * 0.95, 1); return { q: `EBITDA ${m(e, 0)}, operating cash flow ${m(c, 0)} : conversion ?`, ...propositions(r, c / e, (x) => pct(x, 0), [0.2, -0.2, 0.35, -0.35]), expl: `${c} / ${e} = ${pct(c / e, 0)}` }; },
  (r) => { const e = r.entier(10, 40), l = r.entre(e * 0.1, e * 0.25, 1); return { q: `EBITDA post-IFRS 16 ${m(e, 0)}, loyers ${m(l, 0)} : EBITDA pre-IFRS 16 ?`, ...propositions(r, e - l, (x) => m(x, 0), [0.15, -0.15, 0.3, l / (e - l) * 2]), expl: `${e} − ${l} = ${e - l} (on remet les loyers en charges)` }; },
];

const SPRINT_PE = [
  (r) => { const [x, n] = r.choix([[2, 5], [3, 5], [2.5, 5], [2, 3], [2, 4], [3, 4], [1.5, 3], [4, 5], [2, 6], [3, 3]]); const t = x ** (1 / n) - 1; return { q: `${fois(x)} en ${n} ans : IRR ?`, ...propositions(r, Math.round(t * 100), (v) => `${nombre(v, 0)} %`, [0.25, -0.25, 0.5, -0.4]), expl: `${nombre(x)}^(1/${n}) − 1 ≈ ${pct(t, 0)}` }; },
  (r) => { const [t, n] = r.choix([[0.2, 5], [0.25, 4], [0.15, 5], [0.3, 3], [0.2, 3], [0.25, 5]]); const x = (1 + t) ** n; return { q: `IRR ${pct(t, 0)} pendant ${n} ans : multiple ?`, ...propositions(r, x, (v) => fois(v, 1), [0.25, -0.2, 0.45, -0.35]), expl: `(1 + ${pct(t, 0)})^${n} ≈ ${fois(x, 2)}` }; },
  (r) => { const e = r.choix([10, 12, 15, 20, 25, 30]), l = r.choix([3, 3.5, 4, 4.5, 5, 5.5]); return { q: `EBITDA ${m(e, 0)}, leverage ${fois(l)} : dette d'acquisition ?`, ...propositions(r, e * l, (v) => m(v, 0)), expl: `${e} × ${nombre(l)} = ${nombre(e * l, 0)}` }; },
  (r) => { const k = r.choix([8, 9, 10, 12]), l = r.choix([3, 4, 5]); return { q: `Rachat à ${k}x avec ${l}x de dette : part de l\'equity (frais ignorés) ?`, ...propositions(r, (k - l) / k, (v) => pct(v, 0), [0.2, -0.2, 0.4, -0.4]), expl: `(${k} − ${l}) / ${k} = ${pct((k - l) / k, 0)}` }; },
  (r) => { const a = r.choix([40, 50, 60, 80, 100]), x = r.choix([1.5, 2, 2.5, 2.8, 3, 3.5]); return { q: `Equity ${m(a, 0)} à l'entrée, ${m(a * x, 0)} à l\'exit : MOIC ?`, ...propositions(r, x, (v) => fois(v, 1), [0.2, -0.2, 0.4, -0.3]), expl: `${nombre(a * x, 0)} / ${a} = ${fois(x)}` }; },
  (r) => { const e = r.choix([10, 15, 20, 25, 40]), l = r.choix([3, 3.5, 4, 4.5, 5, 6]); return { q: `Net debt ${m(e * l, 0)}, EBITDA ${m(e, 0)} : leverage ?`, ...propositions(r, l, (v) => fois(v, 1), [0.2, -0.2, 0.35, -0.3]), expl: `${nombre(e * l, 0)} / ${e} = ${fois(l)}` }; },
  (r) => { const p = r.choix([50, 80, 100, 150, 200, 250]); return { q: `Profit du fonds ${m(p, 0)}, catch-up complet, carried 20 % : part du GP ?`, ...propositions(r, p * 0.2, (v) => m(v, 0), [0.5, -0.5, 1, 1.5]), expl: `20 % × ${p} = ${nombre(p * 0.2, 0)}` }; },
  (r) => { const e = r.choix([12, 15, 18, 20, 24]), k = r.choix([8, 9, 10]), d = r.choix([30, 40, 50, 60]); return { q: `Sortie : EBITDA ${m(e, 0)} à ${k}x, net debt ${m(d, 0)}. Equity ?`, ...propositions(r, e * k - d, (v) => m(v, 0), [0.15, -0.15, 0.3, -0.3]), expl: `${e} × ${k} − ${d} = ${e * k - d}` }; },
  (r) => { const t = r.choix([6, 8, 9, 12, 18, 24]); return { q: `Règle de 72 : à ${t} % par an, en combien de temps l'argent double-t-il ?`, ...propositions(r, 72 / t, (v) => `${nombre(v, 0)} ans`, [0.5, -0.33, 1, -0.5]), expl: `72 / ${t} = ${nombre(72 / t, 0)} ans` }; },
  (r) => { const e0 = r.choix([10, 20]), k = r.choix([8, 10]), e5 = e0 * r.choix([1.5, 2]); return { q: `EBITDA ${m(e0, 0)} → ${m(e5, 0)}, multiple constant ${k}x : valeur créée par la croissance ?`, ...propositions(r, (e5 - e0) * k, (v) => m(v, 0), [0.5, -0.5, 1, -0.25]), expl: `(${e5} − ${e0}) × ${k} = ${(e5 - e0) * k}` }; },
];

// Crée une question de sprint (graine → toujours la même question)
export function questionSprint(matiere, r) {
  const q = r.choix(matiere === 'ts' ? SPRINT_TS : SPRINT_PE)(r);
  if (q.melanger) { // propositions écrites à la main : on mélange l'ordre
    const ordre = r.melanger(q.choix.map((_, i) => i));
    return { ...q, choix: ordre.map((i) => q.choix[i]), bonne: ordre.indexOf(q.bonne) };
  }
  return q;
}
