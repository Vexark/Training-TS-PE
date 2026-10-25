// Petits outils partagés : formats français, hasard « reproductible », dates de Paris, HTML.

// --- Formats (français : 1 234,5) ------------------------------------------------------------
export function nombre(n, dec = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
export const meur = (n, dec = 1) => `${nombre(n, dec)} M€`;
export const pct = (x, dec = 1) => `${nombre(x * 100, dec)} %`;
export const fois = (x, dec = 1) => `${nombre(x, dec)}x`;
export const jours = (n) => `${nombre(n, 0)} j`;

// Lit une saisie française (« 12,5 », « 12.5 », « 1 234 », « 25 % », « 2,4x »)
export function lireNombre(texte) {
  if (texte === null || texte === undefined) return NaN;
  const propre = String(texte).replace(/[\s  ]/g, '').replace(/[−–]/g, '-').replace(/[%x€MmkKj]/g, '').replace(',', '.');
  if (propre === '' || propre === '-' || propre === '+') return NaN;
  return Number(propre);
}

// --- Hasard reproductible : même graine = même exercice (la session du jour ne change pas si on recharge)
export function hacher(texte) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < texte.length; i++) {
    const c = texte.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return h1 >>> 0;
}

export function hasard(graine) {
  let a = typeof graine === 'number' ? graine >>> 0 : hacher(String(graine));
  const suivant = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = {
    suivant,
    // entier entre min et max inclus
    entier: (min, max) => min + Math.floor(suivant() * (max - min + 1)),
    // nombre entre min et max, arrondi au pas (ex. 0,1)
    entre: (min, max, pas = 0.1) => arrondi(min + suivant() * (max - min), pas),
    choix: (liste) => liste[Math.floor(suivant() * liste.length)],
    melanger: (liste) => {
      const copie = [...liste];
      for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(suivant() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
      }
      return copie;
    },
    // k éléments différents
    plusieurs: (liste, k) => r.melanger(liste).slice(0, Math.min(k, liste.length)),
    vrai: (proba = 0.5) => suivant() < proba,
  };
  return r;
}

export function arrondi(x, pas = 0.1) {
  const n = Math.round(x / pas) * pas;
  const dec = Math.max(0, Math.round(-Math.log10(pas)));
  return Number(n.toFixed(dec));
}

// --- Dates (fuseau Europe/Paris) -----------------------------------------------------------------
const FORMAT_JOUR = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' });
const FORMAT_HEURE = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', hour12: false });

export const aujourdhui = (instant = new Date()) => FORMAT_JOUR.format(instant);
export const heureParis = (instant = new Date()) => Number(FORMAT_HEURE.format(instant));
export const maintenantIso = () => new Date().toISOString();

export function ajouterJours(iso, n) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export function ecartJours(isoA, isoB) {
  return Math.round((new Date(`${isoB}T12:00:00Z`) - new Date(`${isoA}T12:00:00Z`)) / 86400000);
}
export function dateLisible(iso, options = { weekday: 'long', day: 'numeric', month: 'long' }) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { ...options, timeZone: 'UTC' });
}
export const dateCourte = (iso) => dateLisible(iso, { day: 'numeric', month: 'short' });

export function duree(secondes) {
  const s = Math.max(0, Math.round(secondes));
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min${s % 60 ? ` ${String(s % 60).padStart(2, '0')}` : ''}`;
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`;
}

// --- HTML ------------------------------------------------------------------------------------------
export function echapper(texte) {
  return String(texte ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Gabarit HTML : les valeurs ${} sont échappées sauf si elles viennent de html`` ou brut()
class Brut { constructor(t) { this.t = t; } toString() { return this.t; } }
export const brut = (t) => new Brut(t);
export function html(morceaux, ...valeurs) {
  let sortie = morceaux[0];
  valeurs.forEach((v, i) => {
    if (v instanceof Brut) sortie += v.t;
    else if (Array.isArray(v)) sortie += v.map((x) => (x instanceof Brut ? x.t : echapper(x))).join('');
    else if (v === false || v === null || v === undefined) sortie += '';
    else sortie += echapper(v);
    sortie += morceaux[i + 1];
  });
  return new Brut(sortie);
}

// Markdown très simple (analyses de la Veille de deal) : titres, gras, listes, liens [n]
export function markdown(texte) {
  const lignes = echapper(texte || '').split(/\r?\n/);
  let sortie = '', liste = false;
  for (const ligne of lignes) {
    let l = ligne.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
    if (/^\s*[-*]\s+/.test(l)) {
      if (!liste) { sortie += '<ul>'; liste = true; }
      sortie += `<li>${l.replace(/^\s*[-*]\s+/, '')}</li>`;
      continue;
    }
    if (liste) { sortie += '</ul>'; liste = false; }
    if (/^#{1,6}\s/.test(l)) sortie += `<h4>${l.replace(/^#{1,6}\s/, '')}</h4>`;
    else if (l.trim()) sortie += `<p>${l}</p>`;
  }
  if (liste) sortie += '</ul>';
  return sortie;
}

// Enlève accents et majuscules (détection des mots-clés dans les réponses libres)
export function normaliser(texte) {
  return String(texte || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
}

export function moyenne(liste) {
  return liste.length ? liste.reduce((a, b) => a + b, 0) / liste.length : 0;
}

export function mediane(liste) {
  const t = [...liste].sort((a, b) => a - b);
  const m = Math.floor(t.length / 2);
  return t.length % 2 ? t[m] : (t[m - 1] + t[m]) / 2;
}

// TRI d'une suite de flux annuels (flux[0] = mise, négative), par dichotomie
export function tri(flux) {
  const van = (r) => flux.reduce((s, f, t) => s + f / (1 + r) ** t, 0);
  let bas = -0.99, haut = 5;
  if (van(bas) * van(haut) > 0) return NaN;
  for (let i = 0; i < 200; i++) {
    const mil = (bas + haut) / 2;
    if (van(bas) * van(mil) <= 0) haut = mil; else bas = mil;
  }
  return (bas + haut) / 2;
}
