// Briques communes aux exercices générés (tableaux, champs de réponse, propositions de QCM).
import { arrondi, nombre } from '../outils.js';

// Une cellule « chiffrée » (alignée à droite) : 12,5 · −0,3 M€ · 24 % · 3,5x · 0 (piège) · —
const CHIFFRE = /^[+−-]?\s?[\d\s  .,]+\s?(M€|%|x|j|jours)?(\s\(.*\))?$|^—$/;

// Tableau HTML : lignes = tableaux de cellules ; une ligne qui commence par '!' est mise en gras (total)
export function tableau(entetes, lignes, classe = '') {
  const tete = entetes ? `<thead><tr>${entetes.map((e) => `<th>${e}</th>`).join('')}</tr></thead>` : '';
  const corps = lignes.map((l) => {
    const total = typeof l[0] === 'string' && l[0].startsWith('!');
    const cellules = l.map((c, i) => {
      const texte = i === 0 && total ? c.slice(1) : c;
      return `<td${i > 0 && CHIFFRE.test(String(texte).trim()) ? ' class="num"' : ''}>${texte}</td>`;
    }).join('');
    return `<tr${total ? ' class="total"' : ''}>${cellules}</tr>`;
  }).join('');
  return `<table class="tableau ${classe}">${tete}<tbody>${corps}</tbody></table>`;
}

// Un champ de réponse chiffrée : tol = écart accepté (même unité que la réponse)
export function champ(id, label, reponse, unite, tol, dec = 1) {
  return { id, label, reponse: arrondi(reponse, 10 ** -Math.max(dec, 2)), unite, tol, dec };
}

export const signe = (x, dec = 1) => (x > 0 ? '+' : x < 0 ? '−' : '') + nombre(Math.abs(x), dec);

// Propositions de QCM chiffré : la bonne + 3 « pièges » plausibles, toutes différentes une fois affichées
export function propositions(r, bonne, formater, ecarts = [-0.3, -0.15, 0.15, 0.3, 0.5, -0.5]) {
  const affichees = new Set([formater(bonne)]);
  const choix = [bonne];
  for (const e of r.melanger(ecarts)) {
    if (choix.length >= 4) break;
    const v = bonne * (1 + e);
    const f = formater(v);
    if (!affichees.has(f) && v > 0) { affichees.add(f); choix.push(v); }
  }
  // filet de sécurité (réponse nulle ou propositions qui s'affichent pareil) : écarts additifs, nombre d'essais borné
  for (let k = 1; choix.length < 4 && k < 200; k++) {
    const v = bonne === 0 ? k * (k % 2 ? 1 : -1) : bonne * (1 + 0.37 * k);
    if (!affichees.has(formater(v))) { affichees.add(formater(v)); choix.push(v); }
  }
  const melange = r.melanger(choix);
  return { choix: melange.map(formater), bonne: melange.indexOf(bonne) };
}

// Mois en français (BFR mensuel)
export const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
export const MOIS_LONGS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
