// Moteur de l'entraînement : banques d'exercices, programme du jour, révisions espacées, statistiques,
// indice de préparation, paliers, badges et alertes. Tout est calculé à partir de l'historique des réponses.
import { QUESTIONS_TS, THEMES_TS } from './contenu/ts.js';
import { QUESTIONS_PE, THEMES_PE } from './contenu/pe.js';
import { GENERATEURS_TS, CAS_TS } from './generateurs/ts.js';
import { GENERATEURS_PE, CAS_PE } from './generateurs/pe.js';
import { hasard, aujourdhui, ajouterJours, ecartJours, moyenne, normaliser, markdown, heureParis, meur, fois, echapper } from './outils.js';

export const MATIERES = {
  ts: { id: 'ts', nom: 'Transaction Services', court: 'TS', themes: THEMES_TS, questions: QUESTIONS_TS, generateurs: GENERATEURS_TS, cas: CAS_TS },
  pe: { id: 'pe', nom: 'Private Equity', court: 'PE', themes: THEMES_PE, questions: QUESTIONS_PE, generateurs: GENERATEURS_PE, cas: CAS_PE },
};
export const LISTE_MATIERES = ['ts', 'pe'];

export const FORMATS = {
  express: { nom: 'Express', duree: '≈ 15 min', fit: 0, faciles: 8, moyennes: 4, difficiles: 2, calculs: 1, tri: 0, cas: 0 },
  standard: { nom: 'Standard', duree: '≈ 45 min', fit: 1, faciles: 15, moyennes: 10, difficiles: 5, calculs: 3, tri: 1, cas: 1 },
  intensif: { nom: 'Intensif', duree: '≈ 90 min', fit: 2, faciles: 25, moyennes: 15, difficiles: 8, calculs: 5, tri: 1, cas: 1 },
};
export const NIVEAUX = { 1: 'Facile', 2: 'Moyen', 3: 'Difficile' };

const INTERVALLES = [1, 2, 4, 8, 16, 32]; // jours avant la prochaine révision, selon la « boîte » (Leitner)
const DEMI_VIE = 21; // une réponse d'il y a 21 jours pèse deux fois moins qu'une réponse d'aujourd'hui
const PART_SIMULATION = 0.15; // part des simulations d'entretien dans l'indice de préparation

// ---------------------------------------------------------------------------------------------------
// Index de tous les exercices (questions écrites, générateurs, études de cas, mes questions, deals)
// ---------------------------------------------------------------------------------------------------
let index = new Map();
let deals = [];
let mesQuestions = [];

function reconstruireIndex() {
  index = new Map();
  for (const m of LISTE_MATIERES) {
    const mat = MATIERES[m];
    for (const q of mat.questions) index.set(q.id, { genre: 'question', m, theme: q.theme, niveau: q.niveau, q });
    for (const g of mat.generateurs) index.set(g.id, { genre: 'generateur', m, theme: g.theme, niveau: g.niveau, g });
    index.set(mat.cas.id, { genre: 'cas', m, theme: 'cas', niveau: 3, g: mat.cas });
  }
  for (const q of mesQuestions) index.set(q.id, { genre: 'question', m: q.m, theme: q.theme, niveau: q.niveau || 2, q, perso: true });
}
reconstruireIndex();

export function definirMesQuestions(liste) {
  mesQuestions = (liste || []).filter((q) => q && q.id && MATIERES[q.m]);
  reconstruireIndex();
}
export function definirDeals(liste) { deals = Array.isArray(liste) ? liste : []; }
export const dealsDisponibles = () => deals;

export function element(cle) {
  if (cle?.startsWith('deal:')) {
    const [, m, id] = cle.split(':');
    const deal = deals.find((d) => String(d.id) === id);
    return deal ? { genre: 'deal', m, theme: 'fit', niveau: 2, deal } : null;
  }
  return index.get(cle) || null;
}

export const nomTheme = (m, theme) => MATIERES[m].themes.find((t) => t.id === theme)?.nom || theme;
export const courtTheme = (m, theme) => MATIERES[m].themes.find((t) => t.id === theme)?.court || theme;

export function questionsDuTheme(m, theme) {
  return [...index.values()].filter((e) => e.m === m && e.theme === theme && e.genre === 'question');
}
export function generateursDuTheme(m, theme) {
  return MATIERES[m].generateurs.filter((g) => g.theme === theme);
}

// Nombre d'exercices différents à voir pour « couvrir » un thème
function cibleCouverture(m, theme) {
  if (theme === 'cas') return 5;
  const n = questionsDuTheme(m, theme).length + generateursDuTheme(m, theme).length * 3;
  return Math.max(3, Math.min(20, n));
}

// ---------------------------------------------------------------------------------------------------
// Création d'un exercice prêt à afficher, à partir de sa clé et d'une graine (toujours le même résultat)
// ---------------------------------------------------------------------------------------------------
const NOMS_TYPES = { qcm: 'QCM', vf: 'Vrai ou faux', tri: 'Classement', calcul: 'Calcul', ouverte: 'Question d\'entretien', cas: 'Étude de cas' };
export const nomType = (type) => NOMS_TYPES[type] || type;

const bloc = (icone, titre, contenu, classe = '') => `<div class="bloc-corrige ${classe}"><div class="etiquette-bloc">${icone} ${titre}</div>${contenu}</div>`;

// Correction complète d'une question d'entretien : réponse courte, réponse complète, exemple, pièges, relances
export function corrigeHtml(q) {
  if (q.reponse && !q.courte && !q.complete) return q.reponse; // ancien format (mes questions)
  return [
    q.courte ? bloc('✅', 'Réponse courte — à dire en 30 secondes', q.courte, 'courte') : '',
    q.complete ? bloc('📘', 'Réponse complète — pour développer', q.complete) : '',
    q.exemple ? bloc('🔢', 'Exemple chiffré', q.exemple) : '',
    q.pieges?.length ? bloc('⚠️', 'Pièges à éviter', `<ul>${q.pieges.map((x) => `<li>${x}</li>`).join('')}</ul>`, 'pieges') : '',
    q.relances?.length ? bloc('🔁', 'Relances possibles du recruteur', `<dl class="relances">${q.relances.map(([qq, rr]) => `<dt>${qq}</dt><dd>${rr}</dd>`).join('')}</dl>`) : '',
  ].join('');
}

function depuisQuestion(q, r) {
  const base = { titre: nomTheme(q.m, q.theme), conseil: q.conseil || '', perso: q.perso };
  const enonce = `<p>${q.q}</p>`;
  if (q.type === 'qcm') { // anciennes questions perso seulement
    const ordre = r.melanger(q.choix.map((_, i) => i));
    return { ...base, type: 'qcm', enonce, choix: ordre.map((i) => q.choix[i]), bonne: ordre.indexOf(q.bonne ?? 0), explication: `<p>${q.explication}</p>` };
  }
  if (q.type === 'vf') return { ...base, type: 'qcm', vf: true, enonce, choix: ['Vrai', 'Faux'], bonne: q.vrai ? 0 : 1, explication: `<p>${q.explication}</p>` };
  if (q.type === 'tri') return { ...base, type: 'tri', enonce, categories: q.categories, items: r.melanger(q.items), explication: q.explication || '' };
  if (q.type === 'calcul') return { ...base, type: 'calcul', enonce, champs: q.champs, explication: q.explication };
  return { ...base, type: 'ouverte', enonce, duree: q.duree || 120, reponse: corrigeHtml(q), points: q.points || [] };
}

const TYPES_OPERATION = { lbo_primaire: 'LBO primaire', lbo_secondaire: 'LBO secondaire', mbo: 'MBO', build_up: 'Build-up', sortie: 'Sortie', growth: 'Capital-développement', minoritaire: 'Prise de participation minoritaire', industriel: 'Acquisition industrielle', opa: 'Offre publique' };
const ROLES = { acquereur: 'Acquéreur', vendeur: 'Vendeur', co_investisseur: 'Co-investisseur', preteur: 'Prêteur', management: 'Management' };

function depuisDeal(deal, m) {
  const parRole = {};
  for (const a of deal.acteurs || []) (parRole[a.role] ||= []).push(a.nom);
  const faits = [
    `<li><strong>Opération</strong> : ${echapper(TYPES_OPERATION[deal.type] || deal.type)}${deal.date ? `, annoncée le ${echapper(new Date(deal.date).toLocaleDateString('fr-FR'))}` : ''}</li>`,
    deal.secteur || deal.pays ? `<li><strong>Secteur / pays</strong> : ${echapper([deal.secteur, deal.pays].filter(Boolean).join(' · '))}</li>` : '',
    ...Object.entries(parRole).map(([role, noms]) => `<li><strong>${ROLES[role] || role}</strong> : ${echapper(noms.slice(0, 4).join(', '))}</li>`),
    deal.valorisation ? `<li><strong>Valeur</strong> : ${meur(deal.valorisation, 0)}${deal.multiple ? ` (${fois(deal.multiple)} l'EBITDA)` : ''}</li>` : '',
  ].join('');
  const consigne = m === 'ts'
    ? 'Présente ce deal en 2 minutes comme en entretien, puis dis ce que tu aurais regardé en due diligence financière.'
    : 'Présente ce deal en 2 minutes comme en entretien PE : logique de l\'opération, création de valeur, risques, et ton avis (aurais-tu investi à ce prix ?).';
  return {
    type: 'ouverte', titre: `Pitch d'un deal de ta veille : ${deal.cible}`, duree: 150,
    enonce: `<p>${consigne}</p><ul class="faits">${faits}</ul>${deal.resume ? `<p class="note">${echapper(deal.resume)}</p>` : ''}`,
    reponse: `<p><strong>Ton analyse dans la Veille de deal</strong> (sert de corrigé) :</p><div class="analyse-veille">${markdown(deal.finale)}</div>`,
    points: [
      { t: 'Acteurs et type d\'opération', mots: ['fonds', 'acquereur', 'vendeur', 'lbo', 'rachat', normaliser(deal.cible).split(' ')[0]] },
      { t: 'Chiffres clés (valeur, multiple, taille)', mots: ['valeur', 'multiple', 'md', 'm€', 'millions', 'milliard', 'ebitda', 'chiffre d affaires'] },
      { t: 'Logique stratégique / création de valeur', mots: ['strateg', 'logique', 'creation de valeur', 'croissance', 'build', 'synergie'] },
      { t: m === 'ts' ? 'Points de due diligence (EBITDA, BFR, dette)' : 'Risques et structuration', mots: m === 'ts' ? ['due diligence', 'ebitda', 'bfr', 'dette', 'normatif'] : ['risque', 'dette', 'levier', 'structur'] },
      { t: 'Ton avis argumenté', mots: ['avis', 'je pense', 'selon moi', 'j aurais', 'a mon sens'] },
    ],
    conseil: 'Réutilise ce pitch : un recruteur demande presque toujours « un deal récent qui vous a marqué ».',
  };
}

export function instancier(cle, graine) {
  const e = element(cle);
  if (!e) return null;
  const r = hasard(graine);
  let inst;
  if (e.genre === 'question') inst = depuisQuestion({ ...e.q, m: e.m, perso: e.perso }, r);
  else if (e.genre === 'deal') inst = depuisDeal(e.deal, e.m);
  else inst = e.g.creer(r);
  return { ...inst, cle, m: e.m, theme: e.theme, niveau: e.niveau, graine: String(graine), genre: e.genre };
}

// ---------------------------------------------------------------------------------------------------
// Correction
// ---------------------------------------------------------------------------------------------------
export function champJuste(champ, saisie) {
  return Number.isFinite(saisie) && Math.abs(saisie - champ.reponse) <= champ.tol + 1e-9;
}

// Points clés trouvés dans une réponse libre (aide à l'auto-évaluation, jamais une note définitive)
export function detecterPoints(texte, points) {
  const t = ` ${normaliser(texte)} `;
  return points.map((p) => (p.mots || []).some((mot) => mot && t.includes(normaliser(mot))));
}

// ---------------------------------------------------------------------------------------------------
// Enregistrement d'une réponse : historique + révision espacée + XP
// ---------------------------------------------------------------------------------------------------
export function xpPour(type, score) {
  if (type === 'cas') return Math.round(60 * score);
  return Math.round(10 * score) + (score >= 0.999 ? 5 : 0);
}

export function enregistrerReponse(etat, inst, score, duree, mode, instant = new Date()) {
  const jour = aujourdhui(instant);
  const s = Math.max(0, Math.min(1, Number(score) || 0));
  etat.reponses.push({ k: inst.cle, m: inst.m, t: inst.theme, ty: inst.type, d: instant.toISOString(), s: Math.round(s * 1000) / 1000, du: Math.round(duree || 0), mo: mode });
  if (!inst.cle.startsWith('deal:')) {
    const c = etat.cartes[inst.cle] || { b: 0, n: 0, ok: 0 };
    if (s >= 0.7) c.b = c.n ? Math.min(5, c.b + 1) : 2;
    else if (s >= 0.4) c.b = Math.max(0, c.b - 1);
    else c.b = 0;
    c.due = ajouterJours(jour, INTERVALLES[c.b]);
    c.n += 1;
    if (s >= 0.7) c.ok += 1;
    c.der = jour;
    c.s = s;
    etat.cartes[inst.cle] = c;
  }
  return xpPour(inst.type, s);
}

// Une série (session, entraînement, simulation…) terminée : la journée compte pour la série
export function marquerJournee(etat, m, resultats, instant = new Date(), forcer = false) {
  const jour = aujourdhui(instant);
  const nb = resultats.length;
  const compte = forcer || nb >= 5 || resultats.some((x) => x.type === 'cas');
  const j = (etat.sessions[jour] ||= {});
  const s = (j[m] ||= { faite: false, nb: 0, exercices: 0, score: 0, duree: 0 });
  const total = s.exercices + nb;
  s.score = total ? (s.score * s.exercices + resultats.reduce((a, x) => a + x.s, 0)) / total : 0;
  s.exercices = total;
  s.nb += 1;
  s.duree += resultats.reduce((a, x) => a + (x.du || 0), 0);
  if (compte) s.faite = true;
  if (heureParis(instant) < 8) s.tot = true;
}

// ---------------------------------------------------------------------------------------------------
// Statistiques
// ---------------------------------------------------------------------------------------------------
const poidsRecence = (jour, iso) => 0.5 ** (Math.max(0, ecartJours(iso.slice(0, 10), jour)) / DEMI_VIE);

export function maitrises(etat, m, jour = aujourdhui()) {
  const parTheme = {};
  for (const t of MATIERES[m].themes) parTheme[t.id] = { sw: 0, sws: 0, n: 0, vus: new Set(), parGen: {}, dernier: null, recents: [] };
  for (const r of etat.reponses) {
    if (r.m !== m || !parTheme[r.t] || r.mo === 'sprint') continue;
    const p = parTheme[r.t];
    const w = poidsRecence(jour, r.d);
    p.sw += w; p.sws += w * r.s; p.n += 1;
    const e = element(r.k);
    if (e?.genre === 'generateur' || e?.genre === 'cas') p.parGen[r.k] = (p.parGen[r.k] || 0) + 1;
    else p.vus.add(r.k);
    if (!p.dernier || r.d > p.dernier) p.dernier = r.d;
    if (ecartJours(r.d.slice(0, 10), jour) <= 7) p.recents.push(r.s);
  }
  const res = {};
  for (const t of MATIERES[m].themes) {
    const p = parTheme[t.id];
    const distincts = p.vus.size + Object.values(p.parGen).reduce((a, n) => a + Math.min(3, n), 0);
    const cible = cibleCouverture(m, t.id);
    const precision = p.sw ? p.sws / p.sw : 0;
    const couverture = Math.min(1, distincts / cible);
    const age = p.dernier ? ecartJours(p.dernier.slice(0, 10), jour) : null;
    const fraicheur = age === null ? 0 : age <= 7 ? 1 : Math.max(0.6, 1 - (age - 7) / 60);
    res[t.id] = { maitrise: precision * couverture * fraicheur, precision, couverture, fraicheur, n: p.n, distincts, cible, age, precision7: p.recents.length ? moyenne(p.recents) : null };
  }
  return res;
}

export function indicePreparation(etat, m, jour = aujourdhui()) {
  const mt = maitrises(etat, m, jour);
  const themes = MATIERES[m].themes;
  const technique = themes.reduce((a, t) => a + t.poids * mt[t.id].maitrise, 0) / themes.reduce((a, t) => a + t.poids, 0);
  const simus = (etat.simulations || []).filter((s) => s.m === m).slice(-5).map((s) => s.score).sort((a, b) => b - a).slice(0, 2);
  const simulation = simus.length ? moyenne(simus) * (simus.length === 2 ? 1 : 0.75) : 0;
  return { indice: Math.round(100 * ((1 - PART_SIMULATION) * technique + PART_SIMULATION * simulation)), technique, simulation, maitrises: mt };
}

function serieMatiere(etat, m, jour) {
  const faite = (j) => etat.sessions[j]?.[m]?.faite;
  let n = 0;
  let j = faite(jour) ? jour : ajouterJours(jour, -1);
  while (faite(j)) { n += 1; j = ajouterJours(j, -1); }
  return n;
}

export function serieGlobale(etat, jour = aujourdhui()) {
  const faite = (j) => LISTE_MATIERES.some((m) => etat.sessions[j]?.[m]?.faite);
  let n = 0;
  let j = faite(jour) ? jour : ajouterJours(jour, -1);
  while (faite(j)) { n += 1; j = ajouterJours(j, -1); }
  return n;
}

function meilleureSerie(etat, m) {
  const jours = Object.keys(etat.sessions).filter((j) => etat.sessions[j]?.[m]?.faite).sort();
  let best = 0, cur = 0, prec = null;
  for (const j of jours) {
    cur = prec && ajouterJours(prec, 1) === j ? cur + 1 : 1;
    best = Math.max(best, cur);
    prec = j;
  }
  return best;
}

export function revisionsDues(etat, m, jour = aujourdhui()) {
  return Object.entries(etat.cartes)
    .filter(([cle, c]) => c.due <= jour && element(cle)?.m === m)
    .sort((a, b) => (a[1].due < b[1].due ? -1 : 1))
    .map(([cle]) => cle);
}

export function stats(etat, m, jour = aujourdhui()) {
  const rep = etat.reponses.filter((r) => r.m === m && r.mo !== 'sprint');
  const { indice, technique, simulation, maitrises: mt } = indicePreparation(etat, m, jour);
  const depuis = (n) => rep.filter((r) => ecartJours(r.d.slice(0, 10), jour) < n);
  const cas = rep.filter((r) => r.ty === 'cas');
  const simus = (etat.simulations || []).filter((s) => s.m === m);
  const sprints = (etat.sprints || []).filter((s) => s.m === m);
  const vus = MATIERES[m].themes.filter((t) => mt[t.id].n > 0);
  const avecDonnees = MATIERES[m].themes.filter((t) => mt[t.id].n >= 3);
  const faible = [...avecDonnees].sort((a, b) => mt[a.id].maitrise - mt[b.id].maitrise)[0] || null;
  const activite = {};
  for (const r of rep) { const j = r.d.slice(0, 10); activite[j] = (activite[j] || 0) + 1; }
  const xp = rep.reduce((a, r) => a + xpPour(r.ty, r.s), 0) + simus.reduce((a, s) => a + Math.round(150 * s.score), 0) + sprints.reduce((a, s) => a + 2 * s.score, 0);
  // Précision par niveau (30 derniers jours, questions d'entretien et exercices écrits)
  const parNiveau = {};
  for (const n of [1, 2, 3]) {
    const liste = depuis(30).filter((r) => element(r.k)?.genre === 'question' && element(r.k)?.niveau === n);
    parNiveau[n] = { n: liste.length, precision: liste.length ? moyenne(liste.map((r) => r.s)) : null };
  }
  return {
    indice, technique, simulation, maitrises: mt, xp, parNiveau,
    exercices: rep.length,
    sessions: Object.values(etat.sessions).filter((j) => j?.[m]?.faite).length,
    precision7: depuis(7).length ? moyenne(depuis(7).map((r) => r.s)) : null,
    precision30: depuis(30).length ? moyenne(depuis(30).map((r) => r.s)) : null,
    tempsMoyen: rep.length ? moyenne(rep.filter((r) => r.ty !== 'cas').map((r) => r.du)) : 0,
    tempsTotal: rep.reduce((a, r) => a + (r.du || 0), 0),
    serie: serieMatiere(etat, m, jour), meilleureSerie: meilleureSerie(etat, m),
    casFaits: cas.length, casBons: cas.filter((r) => r.s >= 0.7).length, casTres: cas.filter((r) => r.s >= 0.8).length, casMax: cas.length ? Math.max(...cas.map((r) => r.s)) : 0,
    simulations: simus, meilleureSimulation: simus.length ? Math.max(...simus.map((s) => s.score)) : 0,
    sprintRecord: sprints.length ? Math.max(...sprints.map((s) => s.score)) : 0,
    revisionsDues: revisionsDues(etat, m, jour).length,
    themesVus: vus.length, faible: faible ? { id: faible.id, nom: faible.nom, court: faible.court, maitrise: mt[faible.id].maitrise } : null,
    jamaisVus: MATIERES[m].themes.filter((t) => mt[t.id].n === 0),
    activite,
    sessionsRecentes: Array.from({ length: 10 }, (_, i) => ajouterJours(jour, -i)).filter((j) => etat.sessions[j]?.[m]?.faite).length,
    faiteAujourdhui: !!etat.sessions[jour]?.[m]?.faite,
  };
}

// Questions le plus souvent ratées (dernière réponse < 60 %)
export function erreurs(etat, m) {
  const derniere = {};
  for (const r of etat.reponses) if (r.m === m && r.mo !== 'sprint' && !r.k.startsWith('deal:')) derniere[r.k] = r;
  return Object.values(derniere).filter((r) => r.s < 0.6 && element(r.k)).sort((a, b) => a.s - b.s).map((r) => r.k);
}

// ---------------------------------------------------------------------------------------------------
// Paliers et badges
// ---------------------------------------------------------------------------------------------------
const tousThemes = (st, seuil) => Object.values(st.maitrises).every((x) => x.maitrise >= seuil);
const simusAu = (st, seuil) => st.simulations.filter((s) => s.score >= seuil).length;

export const PALIERS = [
  { n: 1, noms: { ts: 'Candidat', pe: 'Candidat' }, conditions: [] },
  { n: 2, noms: { ts: 'Stagiaire', pe: 'Stagiaire' }, conditions: [
    { texte: '3 jours avec une session terminée', ok: (st) => st.sessions >= 3, avance: (st) => st.sessions / 3 },
    { texte: '50 exercices faits', ok: (st) => st.exercices >= 50, avance: (st) => st.exercices / 50 },
  ] },
  { n: 3, noms: { ts: 'Analyste junior', pe: 'Analyste junior' }, conditions: [
    { texte: 'Indice de préparation ≥ 35 %', ok: (st) => st.indice >= 35, avance: (st) => st.indice / 35 },
    { texte: '6 thèmes travaillés', ok: (st) => st.themesVus >= 6, avance: (st) => st.themesVus / 6 },
    { texte: '2 études de cas faites', ok: (st) => st.casFaits >= 2, avance: (st) => st.casFaits / 2 },
  ] },
  { n: 4, noms: { ts: 'Analyste', pe: 'Analyste' }, conditions: [
    { texte: 'Indice de préparation ≥ 50 %', ok: (st) => st.indice >= 50, avance: (st) => st.indice / 50 },
    { texte: 'Tous les thèmes ≥ 30 %', ok: (st) => tousThemes(st, 0.3), avance: (st) => Math.min(...Object.values(st.maitrises).map((x) => x.maitrise)) / 0.3 },
    { texte: '1 simulation d\'entretien ≥ 50 %', ok: (st) => simusAu(st, 0.5) >= 1, avance: (st) => Math.min(1, st.meilleureSimulation / 0.5) },
    { texte: 'Record de sprint ≥ 8 bonnes réponses', ok: (st) => st.sprintRecord >= 8, avance: (st) => st.sprintRecord / 8 },
  ] },
  { n: 5, noms: { ts: 'Prêt pour l\'entretien', pe: 'Prêt pour l\'entretien' }, conditions: [
    { texte: 'Indice de préparation ≥ 70 %', ok: (st) => st.indice >= 70, avance: (st) => st.indice / 70 },
    { texte: 'Tous les thèmes ≥ 55 %', ok: (st) => tousThemes(st, 0.55), avance: (st) => Math.min(...Object.values(st.maitrises).map((x) => x.maitrise)) / 0.55 },
    { texte: '2 simulations ≥ 70 %', ok: (st) => simusAu(st, 0.7) >= 2, avance: (st) => simusAu(st, 0.7) / 2 },
    { texte: '5 études de cas ≥ 70 %', ok: (st) => st.casBons >= 5, avance: (st) => st.casBons / 5 },
    { texte: '7 sessions sur les 10 derniers jours', ok: (st) => st.sessionsRecentes >= 7, avance: (st) => st.sessionsRecentes / 7 },
  ] },
  { n: 6, noms: { ts: 'Niveau senior', pe: 'Niveau associate' }, conditions: [
    { texte: 'Indice de préparation ≥ 85 %', ok: (st) => st.indice >= 85, avance: (st) => st.indice / 85 },
    { texte: 'Tous les thèmes ≥ 75 %', ok: (st) => tousThemes(st, 0.75), avance: (st) => Math.min(...Object.values(st.maitrises).map((x) => x.maitrise)) / 0.75 },
    { texte: '3 simulations ≥ 80 %', ok: (st) => simusAu(st, 0.8) >= 3, avance: (st) => simusAu(st, 0.8) / 3 },
    { texte: 'Record de sprint ≥ 15', ok: (st) => st.sprintRecord >= 15, avance: (st) => st.sprintRecord / 15 },
    { texte: '10 études de cas ≥ 80 %', ok: (st) => st.casTres >= 10, avance: (st) => st.casTres / 10 },
  ] },
];

// Palier mérité aujourd'hui (le premier dont une condition n'est pas remplie arrête la montée)
export function palierMerite(st) {
  let n = 1;
  for (const p of PALIERS.slice(1)) {
    if (p.conditions.every((c) => c.ok(st))) n = p.n; else break;
  }
  return n;
}

export const BADGES = [
  { id: 'premiere', icone: '🚀', nom: 'Premier pas', texte: 'Première session terminée', ok: (st) => st.sessions >= 1 },
  { id: 'serie3', icone: '🔥', nom: 'Lancé', texte: '3 jours d\'affilée', ok: (st) => st.meilleureSerie >= 3 },
  { id: 'serie7', icone: '🔥', nom: 'Une semaine', texte: '7 jours d\'affilée', ok: (st) => st.meilleureSerie >= 7 },
  { id: 'serie14', icone: '🏃', nom: 'Endurant', texte: '14 jours d\'affilée', ok: (st) => st.meilleureSerie >= 14 },
  { id: 'serie30', icone: '🏆', nom: 'Inarrêtable', texte: '30 jours d\'affilée', ok: (st) => st.meilleureSerie >= 30 },
  { id: 'cent', icone: '💯', nom: 'Centurion', texte: '100 exercices', ok: (st) => st.exercices >= 100 },
  { id: 'cinqcents', icone: '📚', nom: 'Bosseur', texte: '500 exercices', ok: (st) => st.exercices >= 500 },
  { id: 'cas', icone: '🧩', nom: 'Cas solide', texte: 'Une étude de cas ≥ 90 %', ok: (st) => st.casMax >= 0.9 },
  { id: 'simu', icone: '🎤', nom: 'Convaincant', texte: 'Simulation d\'entretien ≥ 80 %', ok: (st) => st.meilleureSimulation >= 0.8 },
  { id: 'sprint', icone: '⚡', nom: 'Calculateur', texte: '15 bonnes réponses en sprint', ok: (st) => st.sprintRecord >= 15 },
  { id: 'expert', icone: '🎯', nom: 'Spécialiste', texte: 'Un thème maîtrisé à 80 %', ok: (st) => Object.values(st.maitrises).some((x) => x.maitrise >= 0.8) },
  { id: 'complet', icone: '🗺️', nom: 'Tour complet', texte: 'Tous les thèmes travaillés', ok: (st) => st.jamaisVus.length === 0 },
];

// Met à jour paliers et badges ; renvoie les nouveautés à célébrer
export function nouveautes(etat, m, jour = aujourdhui()) {
  const st = stats(etat, m, jour);
  const sortie = [];
  etat.paliers ||= {};
  etat.badges ||= {};
  const avant = etat.paliers[m] || 1;
  const merite = palierMerite(st);
  if (merite > avant) {
    etat.paliers[m] = merite;
    const p = PALIERS[merite - 1];
    sortie.push({ genre: 'palier', titre: `Palier ${merite} atteint : ${p.noms[m]}`, texte: `${MATIERES[m].court} — bravo, continue !` });
  }
  const badges = (etat.badges[m] ||= {});
  for (const b of BADGES) {
    if (!badges[b.id] && b.ok(st)) {
      badges[b.id] = jour;
      sortie.push({ genre: 'badge', titre: `${b.icone} Badge ${b.nom}`, texte: `${b.texte} (${MATIERES[m].court})` });
    }
  }
  (etat.indices ||= {})[m] ||= {};
  etat.indices[m][jour] = st.indice;
  return sortie;
}

// ---------------------------------------------------------------------------------------------------
// Alertes affichées dans l'application (les alertes Windows sont envoyées par le serveur)
// ---------------------------------------------------------------------------------------------------
export function alertes(etat, m, instant = new Date()) {
  const jour = aujourdhui(instant);
  const heure = heureParis(instant);
  const st = stats(etat, m, jour);
  const nom = MATIERES[m].court;
  const a = [];
  const lien = (route, libelle) => ({ route, libelle });
  const dateEntretien = etat.reglages?.[`date_entretien_${m}`];
  if (dateEntretien) {
    const n = ecartJours(jour, dateEntretien);
    if (n >= 0 && n <= 30) a.push({ niveau: n <= 3 ? 'rouge' : n <= 10 ? 'orange' : 'info', icone: '🎯', texte: `Entretien ${nom} ${n === 0 ? 'aujourd\'hui' : n === 1 ? 'demain' : `dans ${n} jours`} — indice ${st.indice} %${st.faible ? `, priorité : ${st.faible.court}` : ''}.`, action: lien(`#/${m}/simulation`, 'Simulation') });
  }
  if (!st.faiteAujourdhui && (etat.reglages?.matieres_du_jour || ['ts', 'pe']).includes(m)) {
    a.push({ niveau: heure >= 19 ? 'rouge' : heure >= 12 ? 'orange' : 'info', icone: '📚', texte: `Session ${nom} du jour pas encore faite.`, action: lien(`#/${m}/session`, 'Commencer') });
  }
  if (st.serie >= 2 && !st.faiteAujourdhui && heure >= 18) a.push({ niveau: 'rouge', icone: '🔥', texte: `Ta série ${nom} de ${st.serie} jours s'arrête à minuit.`, action: lien(`#/${m}/session?format=express`, 'Express 10 min') });
  if (st.revisionsDues >= 5) a.push({ niveau: st.revisionsDues >= 15 ? 'orange' : 'info', icone: '🔁', texte: `${st.revisionsDues} révisions ${nom} en attente (la courbe de l'oubli n'attend pas).`, action: lien(`#/${m}/revisions`, 'Réviser') });
  if (st.faible && st.faible.maitrise < 0.5) a.push({ niveau: st.faible.maitrise < 0.3 ? 'rouge' : 'orange', icone: '⚠️', texte: `Point faible ${nom} : ${st.faible.nom} (${Math.round(st.faible.maitrise * 100)} %).`, action: lien(`#/${m}/theme/${st.faible.id}`, 'Travailler') });
  const bases = st.parNiveau[1];
  if (bases.n >= 15 && bases.precision < 0.75) a.push({ niveau: bases.precision < 0.5 ? 'rouge' : 'orange', icone: '🧱', texte: `Tes bases ${nom} (questions faciles, celles qui tombent à coup sûr) ne sont réussies qu'à ${Math.round(bases.precision * 100)} % sur 30 jours : vise 90 %.`, action: lien(`#/${m}/erreurs`, 'Mes erreurs') });
  if (st.exercices >= 20 && st.jamaisVus.length) a.push({ niveau: 'info', icone: '🧭', texte: `Thème${st.jamaisVus.length > 1 ? 's' : ''} ${nom} jamais travaillé${st.jamaisVus.length > 1 ? 's' : ''} : ${st.jamaisVus.map((t) => t.court).join(', ')}.`, action: lien(`#/${m}/theme/${st.jamaisVus[0].id}`, 'Découvrir') });
  // Baisse de précision : 7 derniers jours vs les 21 précédents
  const rep = etat.reponses.filter((r) => r.m === m && r.mo !== 'sprint');
  const recent = rep.filter((r) => ecartJours(r.d.slice(0, 10), jour) < 7).map((r) => r.s);
  const avant = rep.filter((r) => { const e = ecartJours(r.d.slice(0, 10), jour); return e >= 7 && e < 28; }).map((r) => r.s);
  if (recent.length >= 10 && avant.length >= 10 && moyenne(recent) < moyenne(avant) - 0.1) {
    a.push({ niveau: 'orange', icone: '📉', texte: `Ta précision ${nom} baisse : ${Math.round(moyenne(recent) * 100)} % cette semaine contre ${Math.round(moyenne(avant) * 100)} % avant.`, action: lien(`#/${m}/erreurs`, 'Mes erreurs') });
  }
  const derniereSimu = st.simulations.at(-1);
  if (st.indice >= 40 && (!derniereSimu || ecartJours(derniereSimu.d.slice(0, 10), jour) > 7)) a.push({ niveau: 'info', icone: '🎤', texte: `Pas de simulation d'entretien ${nom} depuis ${derniereSimu ? 'plus de 7 jours' : 'le début'} : c'est le meilleur test.`, action: lien(`#/${m}/simulation`, 'Simuler') });
  const prochain = PALIERS[(etat.paliers?.[m] || 1)];
  if (prochain) {
    const manque = prochain.conditions.filter((c) => !c.ok(st));
    if (manque.length && manque.length <= 2 && manque.every((c) => c.avance(st) >= 0.6)) a.push({ niveau: 'vert', icone: '🏅', texte: `Palier ${prochain.n} (${prochain.noms[m]}) tout proche : il te manque ${manque.map((c) => c.texte.toLowerCase()).join(' et ')}.`, action: lien(`#/${m}/progression`, 'Voir') });
  }
  const ordre = { rouge: 0, orange: 1, vert: 2, info: 3 };
  return a.sort((x, y) => ordre[x.niveau] - ordre[y.niveau]);
}

// Résumé lu par le serveur pour les alertes Windows
export function resume(etat, jour = aujourdhui()) {
  const sortie = { maj: new Date().toISOString() };
  for (const m of LISTE_MATIERES) {
    const st = stats(etat, m, jour);
    sortie[m] = { indice: st.indice, palier: etat.paliers?.[m] || 1, revisions_dues: st.revisionsDues, faible: st.faible ? { nom: st.faible.nom, maitrise: st.faible.maitrise } : null };
  }
  return sortie;
}

// ---------------------------------------------------------------------------------------------------
// Programmes : session du jour, thème, révisions, erreurs, cas, simulation
// ---------------------------------------------------------------------------------------------------
function derniereFois(etat, m) {
  const der = {};
  for (const r of etat.reponses) if (r.m === m) der[r.k] = r.d.slice(0, 10);
  return der;
}

function derniersScores(etat, m) {
  const s = {};
  for (const r of etat.reponses) if (r.m === m) s[r.k] = r.s;
  return s;
}

// Choisit des exercices par priorité : révision due, raté récemment, thème faible, jamais vu, ancienneté.
// On évite ce qui a été vu il y a moins de 2 jours (sauf révision due) et on répartit sur plusieurs thèmes.
function selectionneur(etat, m, jour, r) {
  const mt = maitrises(etat, m, jour);
  const der = derniereFois(etat, m);
  const scores = derniersScores(etat, m);
  const pris = new Set();
  const ageDe = (cle) => (der[cle] ? ecartJours(der[cle], jour) : 9999);
  const due = (cle) => { const c = etat.cartes[cle]; return !!c && c.due <= jour; };
  const priorite = (cle, theme) => {
    const age = ageDe(cle);
    let p = r.suivant();
    if (due(cle)) p += 3;
    if (scores[cle] !== undefined && scores[cle] < 0.6 && age >= 1) p += 2;
    if (age === 9999) p += 1.2;
    p += 1.5 * (1 - (mt[theme]?.maitrise ?? 0));
    p += Math.min(age, 30) / 30;
    if (age < 2 && !due(cle)) p -= 5;
    return p;
  };
  // candidats : [{ cle, theme }] → n exercices, au plus « plafond » par thème au premier passage
  const choisir = (candidats, n) => {
    if (n <= 0) return [];
    const tries = candidats.filter((c) => c.cle && !pris.has(c.cle)).map((c) => ({ ...c, p: priorite(c.cle, c.theme) })).sort((a, b) => b.p - a.p);
    const nbThemes = new Set(tries.map((c) => c.theme)).size || 1;
    const plafond = Math.ceil(n / nbThemes) + 1;
    const parTheme = {};
    const choisis = [];
    for (const passe of [0, 1]) {
      for (const c of tries) {
        if (choisis.length >= n) break;
        if (pris.has(c.cle)) continue;
        if (passe === 0 && (parTheme[c.theme] || 0) >= plafond) continue;
        parTheme[c.theme] = (parTheme[c.theme] || 0) + 1;
        pris.add(c.cle);
        choisis.push({ cle: c.cle, rev: due(c.cle) });
      }
    }
    return choisis;
  };
  return { choisir, pris, mt, der };
}

const questionsMatiere = (m) => [...index.values()].filter((e) => e.m === m && e.genre === 'question');
const candidat = (e) => ({ cle: e.q?.id || e.g?.id, theme: e.theme });

export function construireSession(etat, m, format = 'standard', jour = aujourdhui(), idx = 0) {
  const f = FORMATS[format] || FORMATS.standard;
  const r = hasard(`${jour}|${m}|${idx}|${format}`);
  const { choisir } = selectionneur(etat, m, jour, r);
  const qs = questionsMatiere(m);
  const orales = (niveau) => qs.filter((e) => e.q.type === 'ouverte' && e.theme !== 'fit' && e.niveau === niveau).map(candidat);
  const items = [];
  const ajouter = (liste, role) => liste.forEach((x) => items.push({ cle: x.cle, graine: `${jour}|${m}|${idx}|${x.cle}`, role, rev: x.rev }));

  // 1. Échauffement : une question de fit (en intensif, aussi le pitch d'un deal de ta veille)
  let nbFit = f.fit;
  if (nbFit >= 2 && deals.length) { items.push({ cle: `deal:${m}:${r.choix(deals).id}`, graine: `${jour}|${m}|${idx}|deal`, role: 'Échauffement : pitch d\'un deal' }); nbFit -= 1; }
  ajouter(choisir(qs.filter((e) => e.theme === 'fit' && e.niveau <= 2).map(candidat), nbFit), 'Échauffement (fit)');
  // 2. Les bases : beaucoup de questions faciles, celles qui tombent à coup sûr
  ajouter(choisir(orales(1), f.faciles), 'Facile — les bases');
  // 3. Niveau intermédiaire (+ un classement façon cas pratique TS)
  ajouter(choisir(orales(2), f.moyennes), 'Moyen');
  ajouter(choisir(qs.filter((e) => e.q.type === 'tri').map(candidat), f.tri), 'Moyen — classement');
  // 4. Calculs : générateurs (chiffres nouveaux à chaque fois) et calculs écrits
  const calculs = [...MATIERES[m].generateurs.map((g) => ({ cle: g.id, theme: g.theme })), ...qs.filter((e) => e.q.type === 'calcul').map(candidat)];
  ajouter(choisir(calculs, f.calculs), 'Calcul');
  // 5. Les questions difficiles
  ajouter(choisir(orales(3), f.difficiles), 'Difficile');
  // 6. Étude de cas du jour
  if (f.cas) items.push({ cle: MATIERES[m].cas.id, graine: `${jour}|${m}|${idx}|cas`, role: 'Étude de cas du jour' });

  return { id: `${jour}#${idx}`, date: jour, m, mode: 'session', format, items, pos: 0, resultats: [], debut: new Date().toISOString() };
}

export function construireTheme(etat, m, theme, graine = Date.now()) {
  const jour = aujourdhui();
  const r = hasard(`theme|${m}|${theme}|${graine}`);
  const { choisir } = selectionneur(etat, m, jour, r);
  const items = [];
  const ajouter = (liste, role) => liste.forEach((x) => items.push({ cle: x.cle, graine: `${graine}|${x.cle}|${items.length}`, role, rev: x.rev }));
  if (theme === 'cas') ajouter([{ cle: MATIERES[m].cas.id }], 'Étude de cas');
  else {
    const qs = questionsDuTheme(m, theme);
    const orales = (n) => qs.filter((e) => e.q.type === 'ouverte' && e.niveau === n).map(candidat);
    ajouter(choisir(orales(1), 6), 'Facile — les bases');
    ajouter(choisir(orales(2), 5), 'Moyen');
    ajouter(choisir(qs.filter((e) => e.q.type !== 'ouverte').map(candidat), 2), 'Moyen — exercice');
    ajouter(choisir(generateursDuTheme(m, theme).map((g) => ({ cle: g.id, theme })), 2), 'Calcul');
    ajouter(choisir(orales(3), 3), 'Difficile');
    if (theme === 'fit' && deals.length) items.push({ cle: `deal:${m}:${r.choix(deals).id}`, graine: `${graine}|deal`, role: 'Pitch d\'un deal' });
  }
  return { id: `theme-${theme}-${graine}`, date: jour, m, mode: 'theme', theme, items, pos: 0, resultats: [], debut: new Date().toISOString() };
}

export function construireListe(m, mode, cles, graine = Date.now()) {
  const items = cles.map((cle, i) => ({ cle, graine: `${graine}|${cle}|${i}`, role: mode === 'revisions' ? 'Révision' : mode === 'erreurs' ? 'À refaire' : '' }));
  return { id: `${mode}-${graine}`, date: aujourdhui(), m, mode, items, pos: 0, resultats: [], debut: new Date().toISOString() };
}

// Simulation d'entretien : déroulé proche d'un vrai entretien (fit → technique de plus en plus dur → cas → fit),
// corrigé seulement à la fin
export function construireSimulation(etat, m, graine = Date.now()) {
  const jour = aujourdhui();
  const r = hasard(`simulation|${m}|${graine}`);
  const { choisir } = selectionneur(etat, m, jour, r);
  const qs = questionsMatiere(m);
  const blocs = [];
  const ajouter = (liste, bloc) => liste.forEach((x) => { if (x?.cle && element(x.cle) && !blocs.some((b) => b.cle === x.cle)) blocs.push({ cle: x.cle, graine: `${graine}|${x.cle}`, role: bloc, bloc }); });
  const un = (ids) => choisir(ids.filter((id) => element(id)).map((id) => ({ cle: id, theme: element(id).theme })), 1);
  const techniques = m === 'ts' ? ['comptes', 'qoe', 'bfr', 'dette', 'prix', 'valo', 'ifrs', 'metier'] : ['lbo', 'rendement', 'dette', 'valo', 'these', 'mgmt', 'metier', 'sortie'];
  const orales = (n) => qs.filter((e) => e.q.type === 'ouverte' && e.niveau === n && techniques.includes(e.theme)).map(candidat);
  ajouter([{ cle: `${m}-fit-101` }], 'Fit');
  ajouter(un([`${m}-fit-102`, `${m}-fit-103`]), 'Fit');
  if (m === 'pe') ajouter([{ cle: 'gen-pe-paper' }], 'Technique');
  ajouter(choisir(orales(1), 2), 'Technique');
  ajouter(choisir(orales(2), 2), 'Technique');
  ajouter(choisir(orales(3), 1), 'Technique');
  if (m === 'ts') ajouter([{ cle: r.choix(['gen-ts-ebitda', 'gen-ts-dette', 'gen-ts-bfr', 'gen-ts-lockedbox']) }], 'Technique');
  if (m === 'pe' && deals.length && r.vrai(0.5)) ajouter([{ cle: `deal:pe:${r.choix(deals).id}` }], 'Cas pratique');
  else ajouter([{ cle: MATIERES[m].cas.id }], 'Cas pratique');
  ajouter(m === 'ts' ? un(['ts-fit-202', 'ts-fit-203', 'ts-fit-303']) : un(['pe-fit-301', 'pe-fit-302', 'pe-fit-205']), 'Fit');
  ajouter([{ cle: m === 'ts' ? 'ts-fit-106' : 'pe-fit-104' }], 'Fit');
  return { id: `simulation-${graine}`, date: jour, m, mode: 'simulation', items: blocs, pos: 0, resultats: [], debut: new Date().toISOString() };
}

export const POIDS_BLOCS = { Fit: 0.25, Technique: 0.35, 'Cas pratique': 0.4 };

export function scoreSimulation(resultats) {
  const parBloc = {};
  for (const x of resultats) (parBloc[x.bloc] ||= []).push(x.s);
  let total = 0, poids = 0;
  const detail = {};
  for (const [bloc, scores] of Object.entries(parBloc)) {
    detail[bloc] = moyenne(scores);
    total += (POIDS_BLOCS[bloc] || 0.2) * detail[bloc];
    poids += POIDS_BLOCS[bloc] || 0.2;
  }
  return { score: poids ? total / poids : 0, detail };
}
