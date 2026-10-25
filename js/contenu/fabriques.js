// Fabriques pour écrire les questions de façon compacte.
// Niveaux : 1 = facile (les incontournables, qui tombent à coup sûr), 2 = moyen, 3 = difficile.
// Pas de vrai/faux ni de QCM : en entretien, on te pose des questions ouvertes.

const DUREES = { 1: 60, 2: 90, 3: 150 };

// Question d'entretien. c = { courte, complete, exemple, pieges: [...], relances: [[question, réponse], ...],
//   points: [[point attendu, [mots-clés sans accents]], ...], conseil, duree }
export const q = (id, niveau, question, c) => ({
  id, niveau, type: 'ouverte', q: question,
  duree: c.duree || DUREES[niveau],
  courte: c.courte || '', complete: c.complete || '', exemple: c.exemple || '',
  pieges: c.pieges || [], relances: c.relances || [],
  points: (c.points || []).map(([t, mots]) => ({ t, mots })),
  conseil: c.conseil || '',
});

// Calcul. champs : [[label, réponse, unité, tolérance, décimales], ...]
export const calcul = (id, niveau, question, champs, explication, conseil = '') => ({
  id, niveau, type: 'calcul', q: question,
  champs: champs.map(([label, reponse, unite, tol, dec = 1], i) => ({ id: `c${i}`, label, reponse, unite, tol, dec })),
  explication, conseil,
});

// Classement (comme dans les cas pratiques TS : « classe ces éléments »). items : [[texte, catégorie, pourquoi], ...]
export const classer = (id, niveau, question, categories, items, explication = '', conseil = '') => ({
  id, niveau, type: 'tri', q: question, categories,
  items: items.map(([t, c, pourquoi]) => ({ t, c, pourquoi })), explication, conseil,
});

// Ajoute matière, thème et identifiant complet (ex. « ts-qoe-101 ») à toutes les questions d'un thème
export function theme(matiere, themeId, questions) {
  const vus = new Set();
  return questions.map((x) => {
    const id = `${matiere}-${themeId}-${x.id}`;
    if (vus.has(id)) throw new Error(`Identifiant en double : ${id}`);
    vus.add(id);
    return { ...x, id, m: matiere, theme: themeId };
  });
}
