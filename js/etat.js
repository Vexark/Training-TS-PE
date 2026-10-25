// Version téléphone : remplace js/etat.js. Pas de serveur local : la progression est gardée
// 1) sur le compte claude.ai (base privée de la page, synchronisée entre appareils) et
// 2) dans une copie locale du téléphone (démarrage rapide, secours si la base ne répond pas).
// Les réponses sont rangées par jour (un document par jour) ; le reste de l'état en morceaux de 200 000 caractères.
import { aujourdhui } from './outils.js';
import { resume, definirMesQuestions } from './moteur.js';

export const REGLAGES_DEFAUT = {
  heures_rappel: [12, 19], heure_serie: 21, notifications: true,
  matieres_du_jour: ['ts', 'pe'], format: 'standard',
  date_entretien_ts: null, date_entretien_pe: null,
  voix_recruteur: false, theme: 'systeme',
};

const CLE_LOCALE = 'training-ts-pe-etat';
const TAILLE_MORCEAU = 200000;

let etat = null;
let minuterie = null;
let enErreur = false;
let base = null; // collection privée de l'utilisateur dans la base de la page (null : copie locale seulement)
const ecrits = new Map(); // dernier contenu écrit par document (on ne réécrit que ce qui a changé)
const auditeurs = new Set();

export const lire = () => etat;
export const surErreurSauvegarde = (f) => auditeurs.add(f);
export const modeStockage = () => (base ? 'compte' : 'local');

// Complète un fichier ancien ou vide avec tous les champs attendus (jamais de plantage)
export function migrer(d) {
  const e = d && typeof d === 'object' ? d : {};
  e.version = 1;
  e.cree_le ||= aujourdhui();
  for (const cle of ['reponses', 'simulations', 'sprints', 'mes_questions']) if (!Array.isArray(e[cle])) e[cle] = [];
  for (const cle of ['cartes', 'sessions', 'indices', 'paliers', 'badges', 'en_cours', 'pitch']) if (!e[cle] || typeof e[cle] !== 'object' || Array.isArray(e[cle])) e[cle] = {};
  e.reglages = { ...REGLAGES_DEFAUT, ...(e.reglages || {}) };
  return e;
}

// ------------------------------------------------------------------ capacités de la page claude.ai
const capacite = (nom) => (window.claude?.use ? window.claude.use(nom).catch(() => null) : Promise.resolve(null));
const avecDelai = (promesse, ms) => Promise.race([promesse, new Promise((r) => setTimeout(() => r(null), ms))]);

function lireLocal() {
  try { const t = localStorage.getItem(CLE_LOCALE); return t ? JSON.parse(t) : null; } catch { return null; }
}
function ecrireLocal() {
  try { localStorage.setItem(CLE_LOCALE, JSON.stringify(etat)); } catch { /* stockage du navigateur indisponible */ }
}

async function ouvrirBase() {
  const [db, user] = await Promise.all([capacite('db'), capacite('user')]);
  if (!db || !user) return null;
  const id = await user.id();
  return id ? db.collection(`data/users/${id}`) : null;
}

// Relit l'état complet depuis la base (null si la base est vide)
async function lireBase(col) {
  const snap = await col.get();
  if (snap.empty) return null;
  const morceaux = [];
  const reponses = [];
  for (const doc of snap.docs) {
    const d = doc.data();
    if (doc.id.startsWith('etat-')) morceaux[Number(doc.id.slice(5))] = d.p;
    else if (doc.id.startsWith('rep-')) reponses.push(...(d.r || []));
    ecrits.set(doc.id, doc.id.startsWith('etat-') ? d.p : JSON.stringify(d.r || []));
  }
  if (!morceaux.length || morceaux.some((m) => typeof m !== 'string')) return null;
  const e = JSON.parse(morceaux.join(''));
  e.reponses = reponses;
  return e;
}

export async function charger() {
  const local = lireLocal();
  base = await avecDelai(ouvrirBase(), 12000);
  let distant = null;
  if (base) {
    try { distant = await avecDelai(lireBase(base), 15000); } catch { distant = null; }
  }
  // la version la plus récente gagne (téléphone hors ligne puis retour du réseau, ou autre appareil)
  const choisi = distant && (!local || (distant.maj_le || 0) >= (local.maj_le || 0)) ? distant : local;
  etat = migrer(choisi);
  definirMesQuestions(etat.mes_questions);
  return etat;
}

// Sauvegarde groupée (300 ms) : appelée après chaque réponse
export function sauver(immediat = false) {
  clearTimeout(minuterie);
  if (immediat) return envoyer();
  minuterie = setTimeout(envoyer, 300);
  return Promise.resolve();
}

async function envoyer() {
  minuterie = null;
  if (!etat) return;
  etat.resume = resume(etat);
  etat.maj_le = Date.now();
  ecrireLocal();
  if (!base) return;
  try {
    const { reponses, ...reste } = etat;
    const texte = JSON.stringify(reste);
    const docs = new Map();
    for (let i = 0; i * TAILLE_MORCEAU < texte.length; i++) docs.set(`etat-${i}`, texte.slice(i * TAILLE_MORCEAU, (i + 1) * TAILLE_MORCEAU));
    const parJour = new Map();
    for (const r of reponses) { const j = `rep-${String(r.d || 'sans-date').slice(0, 10)}`; (parJour.get(j) || parJour.set(j, []).get(j)).push(r); }
    // n'écrit que les documents modifiés, un à la fois
    for (const [id, p] of docs) if (ecrits.get(id) !== p) { await base.doc(id).set({ p }); ecrits.set(id, p); }
    for (const [id, r] of parJour) { const t = JSON.stringify(r); if (ecrits.get(id) !== t) { await base.doc(id).set({ r }); ecrits.set(id, t); } }
    // morceaux et jours devenus inutiles (état plus court, remise à zéro)
    for (const id of [...ecrits.keys()]) if ((id.startsWith('etat-') && !docs.has(id)) || (id.startsWith('rep-') && !parJour.has(id))) { await base.doc(id).delete(); ecrits.delete(id); }
    enErreur = false;
  } catch (err) {
    if (!enErreur) auditeurs.forEach((f) => f(new Error(`synchronisation avec ton compte impossible (${err.code || err.message}) ; la copie du téléphone est à jour`)));
    enErreur = true;
  }
}

// ------------------------------------------------------------------ remplace les appels au serveur du PC
const PROMPT_IA = (c) => `Tu es recruteur en ${c.matiere === 'pe' ? 'private equity (fonds mid-cap)' : 'Transaction Services (Big 4 / cabinet de conseil)'}.
Corrige la réponse orale d'un candidat, en français, avec les termes financiers en anglais.
Question : ${c.question}
Réponse modèle : ${c.reponse_modele}
Points attendus : ${c.points.join(' ; ')}
Réponse du candidat : ${c.reponse_candidat}
Réponds uniquement en JSON : {"note": entier de 0 à 10, "points_couverts": [..], "points_manquants": [..], "erreurs": [..], "conseil": "une phrase", "reponse_ideale": "réponse idéale en 6 phrases maximum"}`;

// Clé Gemini gardée dans le téléphone (app installée) : envoi seulement quand l'utilisateur demande une correction
const CLE_GEMINI = 'training-cle-gemini';
const cleGemini = () => { try { return localStorage.getItem(CLE_GEMINI) || ''; } catch { return ''; } };
const MODELES_GEMINI = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite'];

async function corrigerGemini(corps) {
  let derniere = null;
  for (const modele of MODELES_GEMINI) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modele}:generateContent?key=${encodeURIComponent(cleGemini())}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: PROMPT_IA(corps) }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 2048, responseMimeType: 'application/json' } }),
    }).catch(() => null);
    if (!r) throw new Error('pas de connexion : la correction IA a besoin du réseau');
    if (r.status === 429 || r.status === 404 || r.status >= 500) { derniere = r.status; continue; } // modèle saturé : on essaie le suivant
    const json = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(json.error?.message || `Gemini a répondu ${r.status}`);
    const texte = json.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
    return { ...JSON.parse(texte), modele: `Gemini (${modele})` };
  }
  throw new Error(derniere === 429 ? 'quota Gemini du jour atteint, réessaie plus tard' : 'Gemini ne répond pas pour le moment');
}

export async function appelApi(chemin, corps) {
  if (chemin === '/api/ia') return { cle: !!(await capacite('sample')) || !!cleGemini() };
  if (chemin === '/api/ia/corriger') {
    const sample = await capacite('sample');
    const r = sample ? { ...(await sample.json(PROMPT_IA(corps), { modelTier: 'default' })), modele: 'Claude' }
      : cleGemini() ? await corrigerGemini(corps) : null;
    if (!r) throw new Error('ajoute ta clé Gemini dans Réglages');
    return { ...r, note: Math.max(0, Math.min(10, Math.round(Number(r.note) || 0))) };
  }
  throw new Error('disponible seulement sur le PC');
}

// Réglage de la correction IA, selon l'endroit où tourne l'app (page claude.ai ou app installée)
export async function monterReglageIa(zone, definirIa, toast) {
  if (await capacite('sample')) {
    zone.innerHTML = '<p class="note">Écris (ou dicte) ta réponse, puis touche « Corriger avec l\'IA » sous la correction : Claude te note sur 10 et te dit ce qui manque. Rien n\'est envoyé sans ce geste.</p>';
    return;
  }
  const maj = () => {
    const ok = !!cleGemini();
    definirIa(ok);
    zone.querySelector('[data-ia-mobile-etat]').innerHTML = ok ? '<span class="pastille bon">✓ Clé Gemini enregistrée sur ce téléphone</span>' : '<span class="pastille">Aucune clé</span>';
  };
  zone.innerHTML = `<p class="note">Gemini (clé gratuite sur aistudio.google.com, la même que sur le PC) corrige tes réponses écrites ou dictées : note sur 10, points manquants. Envoi seulement quand tu touches « Corriger avec l'IA ».</p>
    <div data-ia-mobile-etat class="note"></div>
    <div class="formulaire"><label>Clé API Gemini <input id="cle-gemini" type="password" placeholder="AIza…" autocomplete="off"></label>
    <div class="ligne"><button class="bouton" data-cle-mobile>Enregistrer</button><button class="bouton discret" data-cle-mobile-suppr>Retirer</button></div></div>`;
  zone.querySelector('[data-cle-mobile]').addEventListener('click', () => {
    const v = zone.querySelector('#cle-gemini').value.trim();
    if (!v) return;
    try { localStorage.setItem(CLE_GEMINI, v); } catch { /* indisponible */ }
    zone.querySelector('#cle-gemini').value = '';
    toast('Clé enregistrée sur ce téléphone.');
    maj();
  });
  zone.querySelector('[data-cle-mobile-suppr]').addEventListener('click', () => { try { localStorage.removeItem(CLE_GEMINI); } catch { /* indisponible */ } toast('Clé retirée.'); maj(); });
  maj();
}

// Export : fichier proposé au téléchargement (page claude.ai : via la plateforme ; app installée : téléchargement classique)
export async function exporter(nom, contenu) {
  const downloads = await capacite('downloads');
  if (downloads) { await downloads.save({ filename: nom, data: contenu }); return; }
  const lien = document.createElement('a');
  lien.href = URL.createObjectURL(new Blob([contenu], { type: 'application/json' }));
  lien.download = nom;
  lien.click();
}

// Remplace toute la progression (import d'une sauvegarde)
export function remplacer(nouvel) {
  etat = migrer(nouvel);
  definirMesQuestions(etat.mes_questions);
  return sauver(true);
}

const vider = () => { if (minuterie) { clearTimeout(minuterie); envoyer(); } };
window.addEventListener('pagehide', vider);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') vider(); });
