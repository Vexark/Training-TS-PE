// Pages d'une matière : « Aujourd'hui » (programme du jour), « S'entraîner », « Simulation d'entretien ».
import { echapper, aujourdhui, dateLisible, duree, ecartJours } from '../outils.js';
import { MATIERES, FORMATS, construireSession, instancier, stats, alertes, PALIERS, erreurs, nomTheme, courtTheme, dealsDisponibles, element } from '../moteur.js';
import { libelleType, pastilleScore } from '../exercice.js';
import { lire, sauver } from '../etat.js';
import { enteteMatiere, listeAlertes, pct0 } from './ui.js';
import { CONSEILS_DU_JOUR } from '../contenu/conseils.js';
import { titreRun } from './run.js';

export function indexSession(etat, m, jour = aujourdhui()) {
  return etat.sessions[jour]?.[m]?.nb || 0;
}

export function blocPalier(etat, m, st) {
  const n = etat.paliers?.[m] || 1;
  const actuel = PALIERS[n - 1];
  const suivant = PALIERS[n];
  if (!suivant) return `<div class="etiquette">Palier ${n} / 6</div><b>${actuel.noms[m]}</b><div class="jauge bon"><i style="width:100%"></i></div><div class="note">Palier maximum atteint 🏆</div>`;
  const avance = suivant.conditions.reduce((a, c) => a + Math.min(1, c.avance(st)), 0) / suivant.conditions.length;
  return `<div class="etiquette">Palier ${n} / 6 · prochain : ${suivant.noms[m]}</div><b>${actuel.noms[m]}</b>
    <div class="jauge" style="margin:6px 0"><i style="width:${Math.round(avance * 100)}%"></i></div>
    <div class="note">${suivant.conditions.some((c) => !c.ok(st)) ? `Il te manque : ${suivant.conditions.filter((c) => !c.ok(st)).map((c) => echapper(c.texte.toLowerCase())).join(' · ')}` : 'Conditions remplies : termine une série pour valider'}</div>`;
}

// ------------------------------------------------------------------------------------------- Aujourd'hui
export function vueAujourdhui(app, m) {
  const etat = lire();
  const jour = aujourdhui();
  const st = stats(etat, m, jour);
  const format = etat.reglages.format || 'standard';
  const enCours = etat.en_cours[m];
  const sessionEnCours = enCours?.mode === 'session' && enCours.date === jour ? enCours : null;
  const programme = sessionEnCours || construireSession(etat, m, format, jour, indexSession(etat, m, jour));
  const conseils = CONSEILS_DU_JOUR[m];
  const conseil = conseils[(ecartJours('2026-01-01', jour) + (m === 'pe' ? 7 : 0)) % conseils.length];
  app.className = `m-${m}`;
  app.innerHTML = `${enteteMatiere(m, '')}
    ${enCours && !sessionEnCours ? `<div class="alerte orange" style="margin-bottom:16px"><span class="icone">⏸</span><span class="texte">Série en cours : ${echapper(titreRun(enCours))} (${enCours.pos} / ${enCours.items.length}).</span><a class="bouton petit principal" href="#/${m}/run">Reprendre</a></div>` : ''}
    <div class="grille deux">
      <div class="carte">
        <div class="titre-section"><h2>Programme du ${dateLisible(jour)}</h2>${st.faiteAujourdhui ? '<span class="pastille bon">✓ Objectif du jour atteint</span>' : '<span class="pastille attention">À faire</span>'}</div>
        ${sessionEnCours ? '' : `<div class="ligne" style="margin-bottom:10px"><div class="seg" data-formats>${Object.entries(FORMATS).map(([id, f]) => `<button data-format="${id}" class="${id === format ? 'actif' : ''}">${f.nom} <span class="muet petit">${f.duree}</span></button>`).join('')}</div></div>`}
        <div class="programme-blocs">${(() => {
          // programme regroupé par bloc (échauffement, faciles, moyennes, calculs, difficiles, cas)
          const blocs = [];
          programme.items.forEach((it, i) => {
            const e = element(it.cle);
            let b = blocs.find((x) => x.role === it.role);
            if (!b) { b = { role: it.role, n: 0, faits: 0, themes: new Set(), revisions: 0, titre: '' }; blocs.push(b); }
            b.n += 1;
            if (sessionEnCours && i < sessionEnCours.pos) b.faits += 1;
            if (it.rev) b.revisions += 1;
            if (e?.genre === 'cas') b.titre = instancier(it.cle, it.graine)?.titre || '';
            else if (e) b.themes.add(courtTheme(m, e.theme));
          });
          return blocs.map((b) => `<div class="bloc-programme"><span class="nombre">${b.n}</span><div style="flex:1"><b>${echapper(b.role)}</b>
            <div class="themes">${echapper(b.titre || [...b.themes].join(' · '))}${b.revisions ? ` · dont ${b.revisions} révision${b.revisions > 1 ? 's' : ''}` : ''}</div></div>
            ${sessionEnCours ? `<span class="${b.faits === b.n ? 'fait' : 'muet'}">${b.faits} / ${b.n}</span>` : ''}</div>`).join('');
        })()}</div>
        <p class="note" style="margin:8px 0 0">${programme.items.length} exercices au total.</p>
        <div class="ligne" style="margin-top:14px">
          ${sessionEnCours ? `<a class="bouton principal grand" href="#/${m}/run">Reprendre (${sessionEnCours.pos} / ${sessionEnCours.items.length})</a>`
            : `<a class="bouton principal grand" href="#/${m}/session?format=${format}" data-demarrer>${st.faiteAujourdhui ? 'Nouvelle série' : 'Commencer la session'}</a>`}
          <span class="note">Tirés au hasard chaque jour : beaucoup de questions faciles (celles qui tombent à coup sûr), puis moyennes et difficiles ; tes révisions et points faibles passent en premier.</span>
        </div>
      </div>
      <div class="carte">
        <div class="etiquette">Indice de préparation ${MATIERES[m].court}</div>
        <div class="hero">${st.indice}<small>%</small></div>
        <div style="margin:14px 0">${blocPalier(etat, m, st)}</div>
        <div class="chiffres-cles">
          <div><span class="etiquette">Série</span><b>🔥 ${st.serie} j</b></div>
          <div><span class="etiquette">Révisions dues</span><b>${st.revisionsDues}</b></div>
          <div><span class="etiquette">Précision 7 j</span><b>${st.precision7 === null ? '—' : pct0(st.precision7)}</b></div>
        </div>
        <a class="bouton" href="#/${m}/progression">Voir ma progression</a>
      </div>
    </div>
    <div class="section"><div class="titre-section"><h2>Alertes</h2></div>${listeAlertes(alertes(etat, m))}</div>
    <div class="section carte"><div class="conseil-recruteur" style="margin:0">${echapper(conseil)}</div>
      ${st.faible ? `<p style="margin:10px 0 0">Ton point faible du moment : <strong>${echapper(st.faible.nom)}</strong> — <a href="#/${m}/fiches/${st.faible.id}">relire la fiche</a> · <a href="#/${m}/theme/${st.faible.id}">s'entraîner</a></p>` : ''}</div>`;
  app.querySelectorAll('[data-format]').forEach((b) => b.addEventListener('click', () => {
    etat.reglages.format = b.dataset.format;
    sauver();
    vueAujourdhui(app, m);
  }));
}

// ------------------------------------------------------------------------------------------- S'entraîner
export function vueEntrainement(app, m) {
  const etat = lire();
  const st = stats(etat, m);
  const nbErreurs = erreurs(etat, m).length;
  const nbPerso = (etat.mes_questions || []).filter((q) => q.m === m).length;
  const deals = dealsDisponibles();
  const carte = (lien, icone, titre, texte, actif = true) => `<a class="carte" href="${actif ? lien : '#'}" style="text-decoration:none;${actif ? '' : 'opacity:.55;pointer-events:none'}"><div style="font-size:1.6rem">${icone}</div><h3 style="margin:6px 0 4px">${titre}</h3><div class="note">${texte}</div></a>`;
  app.className = `m-${m}`;
  app.innerHTML = `${enteteMatiere(m, 'entrainement')}
    <div class="grille quatre">
      ${carte(`#/${m}/revisions`, '🔁', 'Révisions', st.revisionsDues ? `${st.revisionsDues} exercice${st.revisionsDues > 1 ? 's' : ''} à revoir aujourd'hui (révision espacée)` : 'Rien à revoir aujourd\'hui', st.revisionsDues > 0)}
      ${carte(`#/${m}/erreurs`, '🎯', 'Mes erreurs', nbErreurs ? `${nbErreurs} exercice${nbErreurs > 1 ? 's' : ''} raté${nbErreurs > 1 ? 's' : ''} à refaire` : 'Aucune erreur en attente', nbErreurs > 0)}
      ${carte(`#/${m}/cas`, '🧩', 'Étude de cas', m === 'ts' ? 'Due diligence complète d\'une société fictive (≈ 20 min)' : 'Faut-il investir ? LBO complet d\'une société fictive (≈ 25 min)')}
      ${carte(`#/${m}/deal`, '📰', 'Pitch d\'un deal', deals.length ? `Un deal de ta Veille de deal (${deals.length} disponibles), corrigé par ta propre analyse` : 'Aucun deal trouvé dans la Veille de deal', deals.length > 0)}
    </div>
    ${nbPerso ? `<p style="margin-top:12px"><a class="bouton" href="#/${m}/perso">📝 Mes questions (${nbPerso})</a></p>` : ''}
    <div class="carte section">
      <div class="titre-section"><h2>Par thème</h2><span class="note">Maîtrise = précision récente × couverture du thème × fraîcheur</span></div>
      ${MATIERES[m].themes.map((t) => {
        const x = st.maitrises[t.id];
        const etatTheme = x.n === 0 ? '<span class="pastille">Jamais vu</span>' : x.maitrise >= 0.7 ? '<span class="pastille bon">✓ Fort</span>' : x.maitrise >= 0.4 ? '<span class="pastille attention">≈ À consolider</span>' : '<span class="pastille critique">! Faible</span>';
        return `<div class="theme-ligne"><div><div class="nom">${echapper(t.nom)}</div><div class="detail">${x.n ? `précision ${pct0(x.precision)} · couverture ${pct0(x.couverture)} · ${x.n} réponse${x.n > 1 ? 's' : ''}` : 'pas encore travaillé'} ${etatTheme}</div></div>
          <div class="jauge"><i style="width:${Math.round(x.maitrise * 100)}%"></i></div><b class="num">${pct0(x.maitrise)}</b>
          <div class="ligne"><a class="bouton petit" href="#/${m}/theme/${t.id}">S'entraîner</a><a class="bouton petit discret" href="#/${m}/fiches/${t.id}">Fiche</a></div></div>`;
      }).join('')}
    </div>
    <div class="carte section">
      <div class="titre-section"><h2>Exercices chiffrés</h2><span class="note">Nouveaux chiffres à chaque fois, corrigé détaillé</span></div>
      <div class="grille trois">${MATIERES[m].generateurs.map((g) => {
        const c = etat.cartes[g.id];
        return `<a class="tuile" href="#/${m}/gen/${g.id}" style="text-decoration:none"><span class="libelle">${echapper(nomTheme(m, g.theme))} · ${'★'.repeat(g.niveau)}</span><b style="display:block;margin-top:2px">${echapper(g.titre)}</b><span class="sous">${c ? `fait ${c.n} fois · dernier score ${Math.round((c.s || 0) * 100)} %` : 'jamais fait'}</span></a>`;
      }).join('')}</div>
    </div>`;
}

// ------------------------------------------------------------------------------------------- Simulation
export function vueSimulation(app, m) {
  const etat = lire();
  const simus = (etat.simulations || []).filter((s) => s.m === m).slice().reverse();
  const deroule = m === 'ts'
    ? ['Présentation (2 min)', 'Motivation : pourquoi le TS / pourquoi nous', '3 questions techniques orales (EBITDA, BFR, dette, prix…)', '1 calcul (ajustements, dette nette, BFR ou locked box)', 'Cas pratique de due diligence (≈ 20 min)', 'Question comportementale', '« Avez-vous des questions ? »']
    : ['Présentation (2 min)', 'Motivation : pourquoi le PE / pourquoi ce fonds', 'Paper LBO sans calculatrice (≈ 10 min)', '3 questions techniques orales (LBO, dette, management package, marché…)', 'Cas : faut-il investir ? (ou pitch d\'un deal de ta veille)', 'Question de jugement', '« Avez-vous des questions ? »'];
  app.className = `m-${m}`;
  app.innerHTML = `${enteteMatiere(m, 'simulation')}
    <div class="grille deux">
      <div class="carte">
        <h2>Comme un vrai entretien</h2>
        <p>Enchaînement sans corrigé (comme face au recruteur), chronométré, puis débrief complet à la fin : tu compares chaque réponse au corrigé et tu t'auto-évalues. Compte 45 à 60 minutes.</p>
        <ol>${deroule.map((d) => `<li>${echapper(d)}</li>`).join('')}</ol>
        <label class="case"><input type="checkbox" data-voix ${etat.reglages.voix_recruteur ? 'checked' : ''}> Le recruteur lit les questions à voix haute</label>
        <p class="note">Conseil : réponds à voix haute, debout, comme en entretien. Tu peux dicter tes réponses avec le micro (dictée d'Edge).</p>
        <a class="bouton principal grand" href="#/${m}/simulation/go">Démarrer la simulation</a>
      </div>
      <div class="carte">
        <h2>Mes simulations</h2>
        ${simus.length ? `<table class="tableau"><thead><tr><th>Date</th><th class="num">Score</th><th>Par bloc</th><th class="num">Durée</th></tr></thead><tbody>
          ${simus.slice(0, 12).map((s) => `<tr><td>${new Date(s.d).toLocaleDateString('fr-FR')}</td><td class="num">${pastilleScore(s.score)}</td><td class="petit">${Object.entries(s.detail || {}).map(([b, v]) => `${echapper(b)} ${Math.round(v * 100)} %`).join(' · ')}</td><td class="num">${duree(s.duree || 0)}</td></tr>`).join('')}
          </tbody></table>` : '<p class="muet">Aucune simulation pour l\'instant. Fais-en une par semaine au début, puis une par jour la dernière semaine avant un entretien.</p>'}
      </div>
    </div>`;
  app.querySelector('[data-voix]').addEventListener('change', (ev) => { etat.reglages.voix_recruteur = ev.target.checked; sauver(); });
}

