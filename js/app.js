// Point d'entrée : chargement, navigation (#/…), en-tête.
import { aujourdhui } from './outils.js';
import { MATIERES, LISTE_MATIERES, construireSession, construireTheme, construireListe, construireSimulation,
  revisionsDues, erreurs, definirDeals, dealsDisponibles, nouveautes, serieGlobale, stats, element } from './moteur.js';
import { charger, lire, sauver, surErreurSauvegarde, appelApi } from './etat.js';
import { definirIa } from './exercice.js';
import { toast } from './vues/ui.js';
import { vueAccueil } from './vues/accueil.js';
import { vueAujourdhui, vueEntrainement, vueSimulation, indexSession } from './vues/matiere.js';
import { afficherRun, titreRun } from './vues/run.js';
import { vueProgression } from './vues/progression.js';
import { vueSprint } from './vues/sprint.js';
import { vueFiches, vueConseils, vuePitch, vueMesQuestions, vueParametres, appliquerTheme, vueLexique } from './vues/divers.js';

const app = document.getElementById('app');

function majEntete(route) {
  const liens = [['#/', 'Accueil', ''], ['#/ts', 'TS', 'ts'], ['#/pe', 'PE', 'pe'], ['#/lexique', 'Lexique', ''], ['#/conseils', 'Conseils', ''], ['#/pitch', 'Pitch', ''], ['#/mes-questions', 'Mes Q.', ''], ['#/parametres', 'Réglages', '']];
  const courant = `#/${route[0] || ''}`;
  document.getElementById('nav').innerHTML = liens.map(([href, nom, m]) =>
    `<a href="${href}" class="${courant === href ? 'actif' : ''}">${m ? `<span class="point" style="background:var(--${m})"></span>` : ''}${nom}</a>`).join('');
  const n = serieGlobale(lire());
  document.getElementById('serie-entete').textContent = n ? `🔥 ${n} jour${n > 1 ? 's' : ''}` : '';
}

// Lance une nouvelle série pour la matière (en remplaçant une série commencée, après confirmation)
function demarrer(m, run) {
  const etat = lire();
  const actuel = etat.en_cours[m];
  if (actuel && actuel.pos > 0 && actuel.pos < actuel.items.length && actuel.id !== run.id) {
    if (!confirm(`Tu as une série en cours (${titreRun(actuel)}, ${actuel.pos} / ${actuel.items.length}). L'abandonner pour commencer celle-ci ?`)) {
      location.replace(`#/${m}/run`);
      return;
    }
  }
  if (!run.items.length) { toast('Rien à faire ici pour le moment.'); location.replace(`#/${m}`); return; }
  run.indiceDebut = stats(etat, m).indice; // pour afficher le gain dans le bilan
  etat.en_cours[m] = run;
  sauver();
  location.replace(`#/${m}/run`);
}

function routeMatiere(m, route, parametres) {
  const etat = lire();
  const page = route[1] || '';
  const jour = aujourdhui();
  switch (page) {
    case '': return vueAujourdhui(app, m);
    case 'run': return afficherRun(app, m);
    case 'session': {
      const actuel = etat.en_cours[m];
      if (actuel?.mode === 'session' && actuel.date === jour && !parametres.get('nouvelle')) return location.replace(`#/${m}/run`);
      const format = parametres.get('format') || etat.reglages.format || 'standard';
      return demarrer(m, construireSession(etat, m, format, jour, indexSession(etat, m, jour)));
    }
    case 'theme': return demarrer(m, construireTheme(etat, m, route[2]));
    case 'gen': {
      const g = MATIERES[m].generateurs.find((x) => x.id === route[2]);
      if (!g) return location.replace(`#/${m}/entrainement`);
      const graine = Date.now();
      return demarrer(m, { ...construireListe(m, 'theme', [g.id], graine), theme: g.theme, items: [0, 1, 2].map((i) => ({ cle: g.id, graine: `${graine}|${i}`, role: 'Exercice chiffré' })) });
    }
    case 'revisions': return demarrer(m, construireListe(m, 'revisions', revisionsDues(etat, m).slice(0, 20)));
    case 'erreurs': return demarrer(m, construireListe(m, 'erreurs', erreurs(etat, m).slice(0, 15)));
    case 'cas': return demarrer(m, construireListe(m, 'cas', [MATIERES[m].cas.id]));
    case 'deal': {
      const deals = dealsDisponibles();
      if (!deals.length) { toast('Aucun deal analysé trouvé dans la Veille de deal.', true); return location.replace(`#/${m}/entrainement`); }
      return demarrer(m, construireListe(m, 'deal', [`deal:${m}:${deals[Math.floor(Math.random() * deals.length)].id}`]));
    }
    case 'perso': return demarrer(m, construireListe(m, 'perso', etat.mes_questions.filter((q) => q.m === m).map((q) => q.id)));
    case 'entrainement': return vueEntrainement(app, m);
    case 'simulation':
      if (route[2] === 'go') return demarrer(m, construireSimulation(etat, m));
      return vueSimulation(app, m);
    case 'sprint': return vueSprint(app, m);
    case 'progression': return vueProgression(app, m);
    case 'fiches': return vueFiches(app, m, route[2]);
    default: return vueAujourdhui(app, m);
  }
}

function afficher() {
  const [chemin, requete = ''] = location.hash.replace(/^#\/?/, '').split('?');
  const route = chemin.split('/').filter(Boolean);
  const parametres = new URLSearchParams(requete);
  window.speechSynthesis?.cancel();
  document.querySelectorAll('.voile').forEach((v) => v.remove()); // fenêtre de félicitations restée ouverte
  majEntete(route);
  window.scrollTo(0, 0);
  try {
    if (MATIERES[route[0]]) routeMatiere(route[0], route, parametres);
    else if (route[0] === 'conseils') vueConseils(app);
    else if (route[0] === 'pitch') vuePitch(app, parametres.get('m') || 'ts');
    else if (route[0] === 'mes-questions') vueMesQuestions(app);
    else if (route[0] === 'lexique') vueLexique(app, parametres.get('q') || '');
    else if (route[0] === 'parametres') vueParametres(app);
    else vueAccueil(app);
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="carte"><h2>Oups, cette page a rencontré un problème</h2><p class="muet">${String(err.message || err)}</p><a class="bouton" href="#/">Retour à l'accueil</a></div>`;
  }
}

async function demarrage() {
  try {
    await charger();
  } catch (err) {
    app.innerHTML = `<div class="carte"><h2>Chargement impossible</h2><p>Recharge la page.</p><p class="muet">${String(err.message)}</p></div>`;
    return;
  }
  const etat = lire();
  appliquerTheme(etat.reglages.theme);
  surErreurSauvegarde((err) => toast(`Attention : ${err.message}.`, true, 8000));
  // séries commencées avec des exercices qui n'existent plus (ancienne banque de questions) : abandonnées
  for (const m of LISTE_MATIERES) {
    const run = etat.en_cours[m];
    if (run && run.items.some((it) => !it.cle.startsWith('deal:') && !element(it.cle))) delete etat.en_cours[m];
  }
  // instantané quotidien des indices (courbes de progression), même sans exercice aujourd'hui
  for (const m of LISTE_MATIERES) nouveautes(etat, m);
  sauver();
  // deals de la Veille de deal (lecture seule) et correction IA : attendus 3 s au plus, pour reprendre une série qui en contient
  const deals = appelApi('/api/deals').then((x) => definirDeals(x.deals)).catch(() => {});
  appelApi('/api/ia').then((x) => definirIa(x.cle)).catch(() => {});
  await Promise.race([deals, new Promise((r) => setTimeout(r, 3000))]);
  window.addEventListener('hashchange', afficher);
  afficher();
}

demarrage();
