// Fiches, conseils, mon pitch, mes questions, paramètres.
import { echapper, normaliser, duree, aujourdhui } from '../outils.js';
import { MATIERES, LISTE_MATIERES, nomTheme, definirMesQuestions, detecterPoints, NIVEAUX, corrigeHtml } from '../moteur.js';
import { lexiqueTrie } from '../contenu/glossaire.js';
import { lire, sauver, appelApi, remplacer, modeStockage, exporter, monterReglageIa } from '../etat.js';
import { enteteMatiere, toast } from './ui.js';
import { FICHES } from '../contenu/fiches.js';
import { CONSEILS, SOURCES } from '../contenu/conseils.js';
import { definirIa, lireAVoixHaute, lexiqueHtml } from '../exercice.js';

// ------------------------------------------------------------------------------------------- Fiches
export function vueFiches(app, m, theme) {
  const themes = MATIERES[m].themes;
  const actif = themes.find((t) => t.id === theme) || themes[0];
  app.className = `m-${m}`;
  app.innerHTML = `${enteteMatiere(m, 'fiches')}
    <div class="fiches">
      <nav>${themes.map((t) => `<a href="#/${m}/fiches/${t.id}" class="${t.id === actif.id ? 'actif' : ''}">${echapper(t.nom)}</a>`).join('')}</nav>
      <div class="carte"><div class="titre-section"><h2>${echapper(actif.nom)}</h2><div class="ligne"><button class="bouton petit discret" data-imprimer>🖨 Imprimer</button>${actif.id !== 'cas' ? `<a class="bouton petit principal" href="#/${m}/theme/${actif.id}">S'entraîner sur ce thème</a>` : `<a class="bouton petit principal" href="#/${m}/cas">Faire une étude de cas</a>`}</div></div>
        ${FICHES[m][actif.id] || '<p class="muet">Fiche à venir.</p>'}${lexiqueHtml((() => { const d = document.createElement('div'); d.innerHTML = FICHES[m][actif.id] || ''; return d.textContent; })())}</div>
    </div>`;
  app.querySelector('[data-imprimer]').addEventListener('click', () => window.print());
}

// ------------------------------------------------------------------------------------------- Conseils
export function vueConseils(app, onglet = 'commun') {
  const noms = { commun: 'Méthode et préparation', ts: 'Transaction Services', pe: 'Private Equity' };
  app.className = onglet === 'commun' ? '' : `m-${onglet}`;
  app.innerHTML = `<h1>Conseils pour être prêt vite</h1>
    <div class="seg" style="margin-bottom:18px">${Object.entries(noms).map(([id, nom]) => `<button data-o="${id}" class="${id === onglet ? 'actif' : ''}">${nom}</button>`).join('')}</div>
    ${CONSEILS[onglet].map((s) => `<div class="carte"><h2>${echapper(s.titre)}</h2>${s.contenu}</div>`).join('')}
    <div class="carte section"><h3>Sources consultées (octobre 2026)</h3><ul>${SOURCES.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${echapper(s.nom)}</a></li>`).join('')}</ul>
      <p class="note">Les retours d'entretiens sont anecdotiques et varient selon les bureaux ; les chiffres de marché viennent d'une source secondaire (guide Chambers 2026) : cite-les avec leur source et mets-les à jour avec ta veille.</p></div>`;
  app.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => vueConseils(app, b.dataset.o)));
}

// ------------------------------------------------------------------------------------------- Mon pitch
export function vuePitch(app, m = 'ts') {
  const etat = lire();
  const questions = MATIERES[m].questions.filter((q) => q.theme === 'fit' && q.type === 'ouverte');
  const mes = (etat.pitch[m] ||= {});
  app.className = `m-${m}`;
  app.innerHTML = `<h1>Mon pitch et mes réponses de fit</h1>
    <p class="muet">Écris TES réponses (avec tes vraies expériences et ta veille de deals), puis répète-les à voix haute avec le chrono. Elles sont gardées sur ce PC.</p>
    <div class="seg" style="margin-bottom:18px">${LISTE_MATIERES.map((x) => `<button data-m="${x}" class="${x === m ? 'actif' : ''}">${MATIERES[x].nom}</button>`).join('')}</div>
    <p class="note">${questions.filter((q) => (mes[q.id] || '').trim()).length} / ${questions.length} réponses rédigées.</p>
    ${questions.map((q) => `<div class="carte" data-q="${q.id}">
      <div class="titre-section"><h3>${q.q}</h3><span class="pastille">${duree(q.duree)}</span></div>
      <textarea class="reponse" placeholder="Ma réponse…">${echapper(mes[q.id] || '')}</textarea>
      <div class="ligne" style="margin-top:8px"><span class="note" data-compte></span><span class="espace"></span>
        <button class="bouton petit" data-repeter>🎤 Répéter à voix haute (${duree(q.duree)})</button><button class="bouton petit discret" data-structure>Voir la structure attendue</button></div>
      <div data-repetition></div>
      <div class="corrige cache" data-modele>${corrigeHtml(q)}${q.conseil ? `<div class="conseil-recruteur">${q.conseil}</div>` : ''}</div>
    </div>`).join('')}`;
  app.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => vuePitch(app, b.dataset.m)));
  app.querySelectorAll('[data-q]').forEach((carte) => {
    const q = questions.find((x) => x.id === carte.dataset.q);
    const zone = carte.querySelector('textarea');
    const compte = carte.querySelector('[data-compte]');
    const majCompte = () => {
      const n = zone.value.trim().split(/\s+/).filter(Boolean).length;
      const couverts = detecterPoints(zone.value, q.points).filter(Boolean).length;
      compte.textContent = n ? `${n} mots ≈ ${duree(n / 2.5)} à l'oral · ${couverts}/${q.points.length} points attendus repérés` : '';
    };
    majCompte();
    zone.addEventListener('input', () => { mes[q.id] = zone.value; majCompte(); sauver(); });
    carte.querySelector('[data-structure]').addEventListener('click', () => carte.querySelector('[data-modele]').classList.toggle('cache'));
    carte.querySelector('[data-repeter]').addEventListener('click', () => {
      const z = carte.querySelector('[data-repetition]');
      if (z.childElementCount) { z.innerHTML = ''; return; }
      const debut = Date.now();
      z.innerHTML = `<div class="corrige"><div class="ligne"><span class="chrono" data-c>${duree(q.duree)}</span><span>Dis ta réponse à voix haute, sans lire. Arrête-toi au signal.</span><span class="espace"></span><button class="bouton petit" data-lire>🔊 Question</button><button class="bouton petit" data-stop>Terminer</button></div>
        <ul class="points-cles" style="margin-top:10px">${q.points.map((p, i) => `<li><input type="checkbox" id="r-${q.id}-${i}"><label for="r-${q.id}-${i}">${echapper(p.t)}</label></li>`).join('')}</ul><p class="note">Coche ce que tu as dit.</p></div>`;
      const c = z.querySelector('[data-c]');
      const tic = setInterval(() => {
        if (!document.body.contains(c)) return clearInterval(tic);
        const reste = q.duree - (Date.now() - debut) / 1000;
        c.textContent = reste >= 0 ? duree(reste) : `+${duree(-reste)}`;
        c.classList.toggle('depasse', reste < 0);
      }, 500);
      z.querySelector('[data-lire]').addEventListener('click', () => lireAVoixHaute(q.q));
      z.querySelector('[data-stop]').addEventListener('click', () => { clearInterval(tic); c.textContent = `Durée : ${duree((Date.now() - debut) / 1000)}`; });
    });
  });
}

// ------------------------------------------------------------------------------------------- Mes questions
export function vueMesQuestions(app) {
  const etat = lire();
  const liste = etat.mes_questions;
  app.className = '';
  app.innerHTML = `<h1>Mes questions</h1>
    <p class="muet">Ajoute tes propres questions d'entretien (tirées de tes cours, de tes documents, d'un entretien passé…). Elles entrent dans les sessions du jour et les révisions espacées, au niveau que tu choisis.</p>
    <div class="carte"><h2>Nouvelle question d'entretien</h2>
      <form class="formulaire" data-form>
        <div class="ligne"><label>Matière <select name="m">${LISTE_MATIERES.map((m) => `<option value="${m}">${MATIERES[m].nom}</option>`).join('')}</select></label>
          <label>Thème <select name="theme"></select></label>
          <label>Niveau <select name="niveau"><option value="1">Facile (les bases)</option><option value="2" selected>Moyen</option><option value="3">Difficile</option></select></label></div>
        <label>Question <textarea name="q" required placeholder="Ex. : Qu'est-ce qu'un NWC peg et comment fonctionne-t-il dans le prix ?"></textarea></label>
        <label>Réponse courte (ce que tu dirais en 30 secondes) <textarea name="courte" required></textarea></label>
        <label>Réponse complète (facultatif) <textarea name="complete"></textarea></label>
        <label>Points clés attendus (un par ligne) <textarea name="points" placeholder="Niveau de référence du NWC dans le SPA&#10;Moyenne mensuelle LTM&#10;Ajustement euro pour euro du prix"></textarea></label>
        <label>Conseil (facultatif) <textarea name="conseil"></textarea></label>
        <div><button class="bouton principal" type="submit">Ajouter la question</button></div>
      </form></div>
    <div class="carte section"><h2>Mes questions (${liste.length})</h2>${liste.length ? `<table class="tableau"><thead><tr><th>Matière</th><th>Thème</th><th>Niveau</th><th>Question</th><th></th></tr></thead><tbody>${liste.map((q) => `<tr><td>${MATIERES[q.m].court}</td><td>${echapper(nomTheme(q.m, q.theme))}</td><td>${echapper(NIVEAUX[q.niveau] || '')}</td><td>${q.q}</td><td><button class="bouton petit danger" data-suppr="${q.id}">Supprimer</button></td></tr>`).join('')}</tbody></table>` : '<p class="muet">Aucune pour l\'instant.</p>'}
      <p class="note">Tu as des documents de cours (PDF, Word) ? Dépose-les dans le dossier <code>docs</code> de l'application et demande à Claude de les transformer en questions.</p></div>`;
  const form = app.querySelector('[data-form]');
  const majThemes = () => { form.theme.innerHTML = MATIERES[form.m.value].themes.filter((t) => t.id !== 'cas').map((t) => `<option value="${t.id}">${echapper(t.nom)}</option>`).join(''); };
  majThemes();
  form.m.addEventListener('change', majThemes);
  const paragraphes = (texte) => echapper(texte.trim()).split(/\n{2,}/).map((x) => `<p>${x.replace(/\n/g, '<br>')}</p>`).join('');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const points = f.points.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!f.q.trim() || !f.courte.trim()) return toast('Indique au moins la question et la réponse courte.', true);
    const q = {
      id: `perso-${Date.now()}`, m: f.m, theme: f.theme, niveau: Number(f.niveau), type: 'ouverte',
      q: echapper(f.q.trim()), courte: paragraphes(f.courte), complete: f.complete.trim() ? paragraphes(f.complete) : '',
      pieges: [], relances: [], conseil: echapper(f.conseil.trim()), duree: { 1: 60, 2: 90, 3: 150 }[Number(f.niveau)],
      points: (points.length ? points : [f.courte.trim().slice(0, 80)]).map((t) => ({ t, mots: normaliser(t).split(/[^a-z0-9%€-]+/).filter((mot) => mot.length >= 5).slice(0, 4) })),
      cree_le: aujourdhui(),
    };
    etat.mes_questions.push(q);
    definirMesQuestions(etat.mes_questions);
    sauver(true);
    toast('Question ajoutée : elle apparaîtra dans tes sessions.');
    vueMesQuestions(app);
  });
  app.querySelectorAll('[data-suppr]').forEach((b) => b.addEventListener('click', () => {
    if (!confirm('Supprimer cette question ?')) return;
    etat.mes_questions = etat.mes_questions.filter((q) => q.id !== b.dataset.suppr);
    definirMesQuestions(etat.mes_questions);
    sauver(true);
    vueMesQuestions(app);
  }));
}

// ------------------------------------------------------------------------------------------- Lexique
export function vueLexique(app, filtre = '') {
  const termes = lexiqueTrie();
  app.className = '';
  app.innerHTML = `<h1>Lexique anglais → français</h1>
    <p class="muet">Les ${termes.length} termes financiers utilisés en entretien (et dans les corrections), avec leur équivalent et leur définition.</p>
    <div class="formulaire" style="margin-bottom:14px"><input type="text" data-filtre placeholder="Chercher un terme (ex. peg, leakage, carry, covenant…)" value="${echapper(filtre)}"></div>
    <div class="carte lexique-page"><dl data-liste></dl></div>`;
  const zone = app.querySelector('[data-liste]');
  const afficher = (texte) => {
    const t = normaliser(texte);
    zone.innerHTML = termes.filter((x) => !t || normaliser(`${x.t} ${x.fr} ${x.d}`).includes(t))
      .map((x) => `<div><dt>${echapper(x.t)} <span class="muet petit">· ${echapper(x.fr)}</span></dt><dd>${echapper(x.d)}</dd></div>`).join('') || '<p class="muet">Aucun terme trouvé.</p>';
  };
  const champ = app.querySelector('[data-filtre]');
  champ.addEventListener('input', () => afficher(champ.value));
  afficher(filtre);
  champ.focus();
}

// ------------------------------------------------------------------------------------------- Paramètres
export async function vueParametres(app) {
  const etat = lire();
  const r = etat.reglages;
  app.className = '';
  app.innerHTML = `<h1>Paramètres</h1>
    <div class="grille deux">
      <div class="carte"><h2>Objectif quotidien</h2><div class="formulaire">
        <div class="ligne">${LISTE_MATIERES.map((m) => `<label class="case"><input type="checkbox" data-objectif="${m}" ${r.matieres_du_jour.includes(m) ? 'checked' : ''}> Session ${MATIERES[m].court} chaque jour</label>`).join('')}</div>
        <label>Format par défaut <select data-format><option value="express">Express (≈ 15 min)</option><option value="standard">Standard (≈ 45 min)</option><option value="intensif">Intensif (≈ 90 min)</option></select></label>
        <label class="case"><input type="checkbox" data-voix ${r.voix_recruteur ? 'checked' : ''}> En simulation, le recruteur lit les questions à voix haute</label>
      </div></div>
      <div class="carte"><h2>Dates d'entretien</h2><div class="formulaire">
        ${LISTE_MATIERES.map((m) => `<label>Entretien ${MATIERES[m].nom} <input type="date" data-entretien="${m}" value="${r[`date_entretien_${m}`] || ''}"></label>`).join('')}
        <p class="note">Compte à rebours sur l'accueil, alertes à J−14, J−7, J−3, J−1 avec ta priorité du moment.</p>
      </div></div>
      <div class="carte pc"><h2>Alertes Windows</h2><div class="formulaire">
        <label class="case"><input type="checkbox" data-notif ${r.notifications ? 'checked' : ''}> Activer les alertes</label>
        <div><div class="etiquette">Rappel si la session du jour n'est pas faite, à :</div><div class="heures" data-heures>${Array.from({ length: 16 }, (_, i) => i + 7).map((h) => `<button type="button" data-h="${h}" class="${r.heures_rappel.includes(h) ? 'actif' : ''}">${h}h</button>`).join('')}</div></div>
        <label>« Ta série s'arrête ce soir » à <select data-serie>${[18, 19, 20, 21, 22].map((h) => `<option value="${h}" ${r.heure_serie === h ? 'selected' : ''}>${h}h</option>`).join('')}</select></label>
        <p class="note">Aussi : bilan chaque lundi à 9h, palier atteint. Les alertes ne marchent que si l'application tourne (démarrage automatique conseillé).</p>
        <div class="ligne"><button class="bouton" data-test>🔔 Tester une alerte</button><label class="case"><input type="checkbox" data-demarrage> Lancer avec Windows</label></div>
      </div></div>
      <div class="carte"><h2>Correction IA</h2><div data-ia-mobile></div></div>
      <div class="carte pc"><h2>Correction IA (optionnelle)</h2><div class="formulaire">
        <p class="note">Gemini (clé gratuite) corrige tes réponses orales comme un recruteur : note sur 10, points manquants, réponse idéale. Rien n'est envoyé sans que tu cliques sur « Corriger avec l'IA ».</p>
        <div data-ia-etat class="note">Vérification…</div>
        <label>Clé API Gemini <input type="password" data-cle placeholder="AIza…" autocomplete="off"></label>
        <div class="ligne"><button class="bouton" data-cle-ok>Enregistrer la clé</button><button class="bouton cache" data-cle-cockpit>Reprendre la clé du Cockpit PEA</button><button class="bouton discret" data-cle-suppr>Retirer la clé</button></div>
      </div></div>
      <div class="carte"><h2>Apparence</h2><div class="seg" data-theme>${[['systeme', 'Comme le téléphone'], ['light', 'Clair'], ['dark', 'Sombre']].map(([v, n]) => `<button data-t="${v}" class="${(r.theme || 'systeme') === v ? 'actif' : ''}">${n}</button>`).join('')}</div></div>
      <div class="carte"><h2>Mes données</h2><div class="formulaire">
        <p class="note">${etat.reponses.length} réponses enregistrées depuis le ${new Date(etat.cree_le).toLocaleDateString('fr-FR')}. ${modeStockage() === 'compte' ? 'Synchronisée avec ton compte claude.ai et copiée sur ce téléphone.' : 'Gardée dans ce téléphone.'} Pour reprendre ta progression du PC : « Exporter » sur le PC, puis « Importer » ici.</p>
        <div class="ligne"><button class="bouton" data-export>⬇ Exporter</button><label class="bouton">⬆ Importer<input type="file" accept="application/json" data-import class="cache"></label><button class="bouton danger" data-reset>Tout effacer</button></div>
        <div class="ligne pc"><button class="bouton discret" data-arreter>⏻ Arrêter l'application</button></div>
      </div></div>
    </div>`;
  const $ = (s) => app.querySelector(s);
  $('[data-format]').value = r.format || 'standard';
  app.querySelectorAll('[data-objectif]').forEach((c) => c.addEventListener('change', () => {
    r.matieres_du_jour = LISTE_MATIERES.filter((m) => app.querySelector(`[data-objectif="${m}"]`).checked);
    sauver();
  }));
  $('[data-format]').addEventListener('change', (ev) => { r.format = ev.target.value; sauver(); });
  $('[data-voix]').addEventListener('change', (ev) => { r.voix_recruteur = ev.target.checked; sauver(); });
  app.querySelectorAll('[data-entretien]').forEach((c) => c.addEventListener('change', () => { r[`date_entretien_${c.dataset.entretien}`] = c.value || null; sauver(); toast('Date enregistrée.'); }));
  $('[data-notif]').addEventListener('change', (ev) => { r.notifications = ev.target.checked; sauver(); });
  app.querySelectorAll('[data-h]').forEach((b) => b.addEventListener('click', () => {
    const h = Number(b.dataset.h);
    r.heures_rappel = r.heures_rappel.includes(h) ? r.heures_rappel.filter((x) => x !== h) : [...r.heures_rappel, h].sort((a, c) => a - c);
    b.classList.toggle('actif');
    sauver();
  }));
  $('[data-serie]').addEventListener('change', (ev) => { r.heure_serie = Number(ev.target.value); sauver(); });
  $('[data-test]').addEventListener('click', () => appelApi('/api/test-alerte', {}).then(() => toast('Alerte envoyée : regarde en bas à droite de l\'écran.')).catch((e) => toast(e.message, true)));
  appelApi('/api/demarrage-auto').then((x) => { $('[data-demarrage]').checked = x.actif; }).catch(() => {});
  $('[data-demarrage]').addEventListener('change', (ev) => appelApi('/api/demarrage-auto', { actif: ev.target.checked }).then((x) => toast(x.actif ? 'L\'application se lancera avec Windows.' : 'Démarrage automatique retiré.')).catch((e) => toast(e.message, true)));

  const majIa = () => appelApi('/api/ia').then((x) => {
    definirIa(x.cle);
    $('[data-ia-etat]').innerHTML = x.cle ? '<span class="pastille bon">✓ Clé Gemini enregistrée</span>' : '<span class="pastille">Aucune clé</span> Crée une clé gratuite sur aistudio.google.com.';
    $('[data-cle-cockpit]').classList.toggle('cache', !x.cle_cockpit || x.cle);
  }).catch(() => {});
  majIa();
  monterReglageIa($('[data-ia-mobile]'), definirIa, toast);
  $('[data-cle-ok]').addEventListener('click', () => { const cle = $('[data-cle]').value.trim(); if (!cle) return; appelApi('/api/ia/cle', { cle }).then(() => { $('[data-cle]').value = ''; toast('Clé enregistrée sur ce PC.'); majIa(); }).catch((e) => toast(e.message, true)); });
  $('[data-cle-cockpit]').addEventListener('click', () => appelApi('/api/ia/cle', { depuis_cockpit: true }).then(() => { toast('Clé reprise du Cockpit PEA.'); majIa(); }).catch((e) => toast(e.message, true)));
  $('[data-cle-suppr]').addEventListener('click', () => appelApi('/api/ia/cle', { cle: '' }).then(() => { toast('Clé retirée.'); majIa(); }));

  app.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => {
    r.theme = b.dataset.t;
    appliquerTheme(r.theme);
    sauver();
    vueParametres(app);
  }));
  $('[data-export]').addEventListener('click', () => {
    exporter(`training-ts-pe-${aujourdhui()}.json`, JSON.stringify(etat, null, 1))
      .then(() => toast('Fichier proposé au téléchargement.')).catch((e) => toast(`Export impossible : ${e.message}`, true));
  });
  $('[data-import]').addEventListener('change', async (ev) => {
    const fichier = ev.target.files[0];
    if (!fichier) return;
    try {
      const d = JSON.parse(await fichier.text());
      if (!Array.isArray(d.reponses)) throw new Error('fichier non reconnu');
      if (!confirm(`Remplacer ta progression actuelle par ce fichier (${d.reponses.length} réponses) ?`)) return;
      await remplacer(d);
      toast('Progression importée.');
      location.hash = '#/';
    } catch (err) { toast(`Import impossible : ${err.message}`, true); }
  });
  $('[data-reset]').addEventListener('click', async () => {
    const b = $('[data-reset]'); if (b.dataset.arme !== '1') { b.dataset.arme = '1'; b.textContent = 'Toucher encore pour tout effacer'; return; }
    await remplacer({ reglages: etat.reglages });
    toast('Progression remise à zéro.');
    location.hash = '#/';
  });
  $('[data-arreter]').addEventListener('click', () => { if (confirm('Arrêter l\'application ? Les alertes s\'arrêteront aussi.')) appelApi('/api/arreter', {}).then(() => { document.body.innerHTML = '<main><h1>Application arrêtée</h1><p>Relance-la avec start.bat.</p></main>'; }); });
}

export function appliquerTheme(theme) {
  try {
    if (theme === 'light' || theme === 'dark') { document.documentElement.dataset.theme = theme; localStorage.setItem('training-theme', theme); } else { delete document.documentElement.dataset.theme; localStorage.removeItem('training-theme'); }
  } catch { /* stockage indisponible : le thème suit Windows */ }
}
