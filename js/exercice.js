// Affichage d'un exercice (saisie), notation, et corrigé. Les mêmes fonctions servent aux sessions,
// aux études de cas (étape par étape) et aux simulations d'entretien (corrigé seulement à la fin).
import { echapper, lireNombre, nombre, moyenne, duree } from './outils.js';
import { champJuste, detecterPoints, nomType, NIVEAUX } from './moteur.js';
import { appelApi } from './etat.js';
import { termesDans } from './contenu/glossaire.js';

const LETTRES = ['A', 'B', 'C', 'D', 'E', 'F'];
const Reconnaissance = window.SpeechRecognition || window.webkitSpeechRecognition;
let iaDisponible = false;
export const definirIa = (ok) => { iaDisponible = ok; };

export const texteDe = (htmlTexte) => { const d = document.createElement('div'); d.innerHTML = htmlTexte || ''; return d.textContent.replace(/\s+/g, ' ').trim(); };
export const classeScore = (s) => (s >= 0.7 ? 'reussi' : s >= 0.4 ? 'moyen' : 'rate');
export const pastilleScore = (s) => `<span class="pastille ${s >= 0.7 ? 'bon' : s >= 0.4 ? 'attention' : 'critique'}">${s >= 0.7 ? '✓' : s >= 0.4 ? '≈' : '✗'} ${Math.round(s * 100)} %</span>`;

// ---------------------------------------------------------------------------------------------------
// Notation (0 à 1)
// ---------------------------------------------------------------------------------------------------
export function noter(inst, d) {
  switch (inst.type) {
    case 'qcm': return d?.choix === inst.bonne ? 1 : 0;
    case 'tri': return inst.items.filter((it, i) => d?.choix?.[i] === it.c).length / Math.max(1, inst.items.length);
    case 'calcul': return inst.champs.filter((c, i) => champJuste(c, d?.valeurs?.[i])).length / Math.max(1, inst.champs.length);
    case 'ouverte': {
      if (d?.auto !== undefined && d?.auto !== null) return d.auto; // « je savais / en partie / je ne savais pas »
      if (d?.noteIa !== undefined && d?.noteIa !== null) return Math.max(0, Math.min(10, d.noteIa)) / 10;
      const coches = d?.coches || detecterPoints(d?.texte || '', inst.points);
      return coches.filter(Boolean).length / Math.max(1, inst.points.length);
    }
    case 'cas': return moyenne(inst.etapes.map((e, i) => noter(e, d?.etapes?.[i])));
    default: return 0;
  }
}

// ---------------------------------------------------------------------------------------------------
// Voix : lire la question (voix Windows, rien n'est envoyé) / dicter sa réponse (dictée d'Edge)
// ---------------------------------------------------------------------------------------------------
export function lireAVoixHaute(texte) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texte);
  u.lang = 'fr-FR';
  const voix = speechSynthesis.getVoices().find((v) => v.lang?.startsWith('fr'));
  if (voix) u.voice = voix;
  u.rate = 1.02;
  speechSynthesis.speak(u);
}

function brancherDictee(bouton, zoneTexte) {
  if (!Reconnaissance) { bouton.remove(); return () => {}; }
  let reco = null;
  const arreter = () => { reco?.stop(); reco = null; bouton.classList.remove('actif'); bouton.textContent = '🎤 Dicter'; };
  bouton.addEventListener('click', () => {
    if (reco) return arreter();
    reco = new Reconnaissance();
    reco.lang = 'fr-FR'; reco.continuous = true; reco.interimResults = false;
    reco.onresult = (ev) => {
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) zoneTexte.value += `${zoneTexte.value && !zoneTexte.value.endsWith(' ') ? ' ' : ''}${ev.results[i][0].transcript.trim()}`;
      }
      zoneTexte.dispatchEvent(new Event('input'));
    };
    reco.onerror = () => arreter();
    reco.onend = () => { if (reco) { try { reco.start(); } catch { arreter(); } } };
    try { reco.start(); bouton.classList.add('actif'); bouton.textContent = '⏹ Arrêter la dictée'; } catch { arreter(); }
  });
  return arreter;
}

// ---------------------------------------------------------------------------------------------------
// Saisie
// ---------------------------------------------------------------------------------------------------
// options : simulation (pas de corrigé), voix (lire la question), surValide(details)
export function monterSaisie(zone, inst, options = {}) {
  const nettoyages = [];
  const fin = (details) => { nettoyages.forEach((f) => f()); options.surValide?.(details); };
  zone.innerHTML = '';
  if (inst.type === 'cas') { monterCas(zone, inst, options, fin); return { detruire: () => nettoyages.forEach((f) => f()) }; }

  const enonce = document.createElement('div');
  enonce.className = `enonce${inst.type === 'ouverte' && inst.genre === 'question' ? ' question' : ''}`;
  enonce.innerHTML = `${inst.sansCalculatrice ? '<p><span class="pastille attention">✎ Sans calculatrice</span></p>' : ''}${inst.enonce}`;
  zone.append(enonce);
  const actions = document.createElement('div');
  actions.className = 'ligne';
  actions.style.marginTop = '14px';
  const valider = document.createElement('button');
  valider.className = 'bouton principal';

  if (inst.type === 'qcm') {
    const liste = document.createElement('div');
    liste.className = `choix-liste${inst.vf ? ' vf-liste' : ''}`;
    if (inst.vf) zone.classList.add('vf');
    let choisi = null;
    inst.choix.forEach((texte, i) => {
      const b = document.createElement('button');
      b.className = 'choix';
      b.innerHTML = `<span class="lettre">${inst.vf ? '' : LETTRES[i]}</span><span>${echapper(texte)}</span>`;
      b.addEventListener('click', () => { choisi = i; liste.querySelectorAll('.choix').forEach((x, k) => x.classList.toggle('selection', k === i)); valider.disabled = false; });
      b.addEventListener('dblclick', () => valider.click());
      liste.append(b);
    });
    zone.append(liste);
    valider.textContent = 'Valider';
    valider.disabled = true;
    valider.addEventListener('click', () => { if (choisi !== null) fin({ choix: choisi }); });
    const clavier = (ev) => {
      if (ev.target.closest('input, textarea')) return;
      const k = ev.key.toUpperCase();
      const i = inst.vf ? { V: 0, F: 1 }[k] : LETTRES.indexOf(k) >= 0 ? LETTRES.indexOf(k) : Number(ev.key) - 1;
      if (i >= 0 && i < inst.choix.length) liste.children[i].click();
      else if (ev.key === 'Enter' && choisi !== null) { ev.preventDefault(); valider.click(); }
    };
    document.addEventListener('keydown', clavier);
    nettoyages.push(() => document.removeEventListener('keydown', clavier));
    actions.innerHTML = `<span class="note">${inst.vf ? 'Touches <kbd>V</kbd> / <kbd>F</kbd>' : 'Touches <kbd>A</kbd>–<kbd>D</kbd>'} puis <kbd>Entrée</kbd></span>`;
  } else if (inst.type === 'tri') {
    const choix = inst.items.map(() => null);
    inst.items.forEach((it, i) => {
      const ligne = document.createElement('div');
      ligne.className = 'tri-ligne';
      ligne.innerHTML = `<div class="texte">${echapper(it.t)}</div><div class="seg">${inst.categories.map((c, k) => `<button type="button" data-k="${k}">${echapper(c)}</button>`).join('')}</div>`;
      ligne.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
        choix[i] = Number(b.dataset.k);
        ligne.querySelectorAll('button').forEach((x) => x.classList.toggle('actif', x === b));
        valider.disabled = choix.some((c) => c === null);
      }));
      zone.append(ligne);
    });
    valider.textContent = 'Valider le classement';
    valider.disabled = true;
    valider.addEventListener('click', () => fin({ choix: [...choix] }));
  } else if (inst.type === 'calcul') {
    const champs = document.createElement('div');
    champs.className = 'champs';
    inst.champs.forEach((c, i) => {
      const l = document.createElement('label');
      l.className = 'champ';
      l.innerHTML = `<span>${echapper(c.label)}</span><input type="text" inputmode="decimal" autocomplete="off" data-i="${i}" placeholder="0"><span class="unite">${echapper(c.unite || '')}</span>`;
      champs.append(l);
    });
    zone.append(champs);
    const entrees = [...champs.querySelectorAll('input')];
    entrees.forEach((e, i) => e.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') { ev.preventDefault(); if (i < entrees.length - 1) entrees[i + 1].focus(); else valider.click(); }
    }));
    setTimeout(() => entrees[0]?.focus(), 30);
    valider.textContent = 'Valider';
    valider.addEventListener('click', () => fin({ saisies: entrees.map((e) => e.value), valeurs: entrees.map((e) => lireNombre(e.value)) }));
    actions.innerHTML = '<span class="note">Virgule ou point acceptés · <kbd>Entrée</kbd> pour passer au champ suivant</span>';
  } else if (inst.type === 'ouverte') {
    const outils = document.createElement('div');
    outils.className = 'ligne';
    outils.innerHTML = `<span class="chrono" data-chrono>${duree(inst.duree)}</span><span class="note">Réponds à voix haute comme face au recruteur. Écrire est facultatif (utile pour la correction IA).</span><span class="espace"></span>
      <button type="button" class="bouton petit discret" data-lire>🔊 Lire la question</button><button type="button" class="bouton petit micro" data-micro>🎤 Dicter</button>`;
    const texte = document.createElement('textarea');
    texte.className = 'reponse';
    texte.placeholder = 'Facultatif : écris ta réponse (1 phrase de conclusion, 3 points, 1 exemple chiffré)…';
    const compteur = document.createElement('div');
    compteur.className = 'note';
    texte.addEventListener('input', () => { const n = texte.value.trim().split(/\s+/).filter(Boolean).length; compteur.textContent = `${n} mot${n > 1 ? 's' : ''} ≈ ${duree(n / 2.5)} à l'oral`; });
    zone.append(outils, texte, compteur);
    const chrono = outils.querySelector('[data-chrono]');
    const debut = Date.now();
    const tic = setInterval(() => {
      const reste = inst.duree - (Date.now() - debut) / 1000;
      chrono.textContent = reste >= 0 ? duree(reste) : `+${duree(-reste)}`;
      chrono.classList.toggle('depasse', reste < 0);
    }, 500);
    nettoyages.push(() => clearInterval(tic));
    outils.querySelector('[data-lire]').addEventListener('click', () => lireAVoixHaute(texteDe(inst.enonce)));
    if (options.voix) setTimeout(() => lireAVoixHaute(texteDe(inst.enonce)), 300);
    nettoyages.push(brancherDictee(outils.querySelector('[data-micro]'), texte));
    nettoyages.push(() => window.speechSynthesis?.cancel());
    texte.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.ctrlKey) valider.click(); });
    // Entrée (hors zone de texte) : voir la correction — idéal pour enchaîner les questions faciles à l'oral
    const clavier = (ev) => { if (ev.key === 'Enter' && !ev.target.closest('textarea, input') && !valider.disabled) { ev.preventDefault(); valider.click(); } };
    setTimeout(() => document.addEventListener('keydown', clavier), 150);
    nettoyages.push(() => document.removeEventListener('keydown', clavier));
    valider.textContent = options.simulation ? 'Réponse suivante' : 'Voir la correction';
    valider.addEventListener('click', () => fin({ texte: texte.value }));
    actions.innerHTML = '<span class="note"><kbd>Entrée</kbd> pour voir la correction (<kbd>Ctrl</kbd> + <kbd>Entrée</kbd> depuis la zone de texte)</span>';
  }
  actions.prepend(valider);
  zone.append(actions);
  return { detruire: () => nettoyages.forEach((f) => f()) };
}

// Étude de cas : contexte toujours visible, étapes l'une après l'autre (corrigé de chaque étape sauf en simulation)
function monterCas(zone, inst, options, fin) {
  const details = { etapes: [] };
  zone.innerHTML = `<details class="contexte" open><summary>📁 Dossier : ${echapper(inst.titre)}</summary>${inst.contexte}</details>
    <div class="etapes-cas">${inst.etapes.map((e, i) => `<span data-e="${i}">${echapper(e.titre || `Étape ${i + 1}`)}</span>`).join('')}</div><div data-etape></div>`;
  const zoneEtape = zone.querySelector('[data-etape]');
  const marquer = (i) => zone.querySelectorAll('.etapes-cas span').forEach((s, k) => { s.classList.toggle('courante', k === i); s.classList.toggle('faite', k < i); });
  const etape = (i) => {
    if (i >= inst.etapes.length) return fin(details);
    marquer(i);
    const e = inst.etapes[i];
    zoneEtape.innerHTML = `<h3>${echapper(e.titre || `Étape ${i + 1}`)}</h3><div data-saisie></div><div data-corrige></div>`;
    monterSaisie(zoneEtape.querySelector('[data-saisie]'), e, {
      simulation: options.simulation,
      surValide: (d) => {
        details.etapes[i] = d;
        if (options.simulation) return etape(i + 1);
        zoneEtape.querySelector('[data-saisie]').querySelectorAll('button, input, textarea').forEach((x) => { x.disabled = true; });
        const zc = zoneEtape.querySelector('[data-corrige]');
        const suivant = () => etape(i + 1);
        monterCorrige(zc, e, d, { interactif: e.type === 'ouverte', matiere: inst.m, surValideEval: suivant, libelleSuite: i + 1 < inst.etapes.length ? 'Étape suivante' : 'Terminer le cas' });
        if (e.type !== 'ouverte') {
          const b = document.createElement('button');
          b.className = 'bouton principal';
          b.style.marginTop = '12px';
          b.textContent = i + 1 < inst.etapes.length ? 'Étape suivante →' : 'Terminer le cas';
          b.addEventListener('click', suivant);
          zc.append(b);
          b.focus();
        }
      },
    });
  };
  etape(0);
}

// ---------------------------------------------------------------------------------------------------
// Corrigé
// ---------------------------------------------------------------------------------------------------
// options : interactif (auto-évaluation des questions orales), surChange(score), surValideEval(), libelleSuite, matiere
export function monterCorrige(zone, inst, d, options = {}) {
  zone.innerHTML = '';
  const boite = document.createElement('div');
  zone.append(boite);
  const s = noter(inst, d);
  const conseil = inst.conseil ? `<div class="conseil-recruteur">${inst.conseil}</div>` : '';

  if (inst.type === 'qcm') {
    boite.className = `corrige ${classeScore(s)}`;
    boite.innerHTML = `<div class="verdict">${s ? '✓ Bonne réponse' : `✗ Réponse attendue : ${echapper(inst.choix[inst.bonne])}`}</div>${d?.choix !== undefined && !s ? `<p class="note">Ta réponse : ${echapper(inst.choix[d.choix] ?? '—')}</p>` : ''}${inst.explication}${conseil}${lexiqueHtml(`${texteDe(inst.enonce)} ${inst.choix.join(' ')} ${texteDe(inst.explication)}`)}`;
    (options.racine || zone.parentElement)?.querySelectorAll('.choix').forEach((b, i) => { b.disabled = true; if (i === inst.bonne) b.classList.add('juste'); else if (i === d?.choix) b.classList.add('faux'); });
  } else if (inst.type === 'tri') {
    boite.className = `corrige ${classeScore(s)}`;
    boite.innerHTML = `<div class="verdict">${Math.round(s * inst.items.length)} / ${inst.items.length} bien classés</div>
      ${inst.items.map((it, i) => `<div class="tri-ligne ${d?.choix?.[i] === it.c ? 'juste' : 'faux'}"><div class="texte">${echapper(it.t)}</div><div><span class="pastille">${echapper(inst.categories[it.c])}</span></div>${d?.choix?.[i] !== it.c ? `<div class="pourquoi">Tu avais mis : ${echapper(inst.categories[d?.choix?.[i]] ?? '—')}. ${echapper(it.pourquoi || '')}</div>` : `<div class="pourquoi">${echapper(it.pourquoi || '')}</div>`}</div>`).join('')}
      ${inst.explication || ''}${conseil}${lexiqueHtml(`${texteDe(inst.enonce)} ${inst.items.map((it) => `${it.t} ${it.pourquoi || ''}`).join(' ')} ${texteDe(inst.explication)}`)}`;
  } else if (inst.type === 'calcul') {
    boite.className = `corrige ${classeScore(s)}`;
    boite.innerHTML = `<div class="verdict">${Math.round(s * inst.champs.length)} / ${inst.champs.length} réponse${inst.champs.length > 1 ? 's' : ''} juste${s * inst.champs.length > 1 ? 's' : ''}</div>
      <table class="tableau"><thead><tr><th>Question</th><th class="num">Ta réponse</th><th class="num">Attendu</th><th></th></tr></thead><tbody>
      ${inst.champs.map((c, i) => { const ok = champJuste(c, d?.valeurs?.[i]); return `<tr><td>${echapper(c.label)}</td><td class="num">${echapper(d?.saisies?.[i] || '—')}</td><td class="num">${nombre(c.reponse, c.dec ?? 1)} ${echapper(c.unite || '')}</td><td>${ok ? '<span class="pastille bon">✓</span>' : '<span class="pastille critique">✗</span>'}</td></tr>`; }).join('')}
      </tbody></table><h4>Corrigé détaillé</h4><div class="defile">${inst.explication}</div>${conseil}${lexiqueHtml(`${texteDe(inst.enonce)} ${inst.champs.map((c) => c.label).join(' ')} ${texteDe(inst.explication)} ${texteDe(inst.conseil)}`)}`;
    (options.racine || zone.parentElement)?.querySelectorAll('.champ').forEach((l, i) => l.classList.add(champJuste(inst.champs[i], d?.valeurs?.[i]) ? 'juste' : 'faux'));
  } else if (inst.type === 'ouverte') {
    d.coches ||= detecterPoints(d.texte || '', inst.points);
    boite.className = 'corrige';
    const interactif = options.interactif !== false;
    const aEcrit = !!d.texte?.trim();
    const majVerdict = () => {
      const sc = noter(inst, d);
      boite.className = `corrige ${classeScore(sc)}`;
      const source = d.auto != null ? 'ton auto-évaluation' : d.noteIa != null ? `la note de l'IA : ${d.noteIa}/10` : `${d.coches.filter(Boolean).length} / ${inst.points.length} points attendus cochés`;
      boite.querySelector('[data-verdict]').innerHTML = `Score retenu : ${pastilleScore(sc)} <span class="note">(${source})</span>`;
      options.surChange?.(sc);
    };
    boite.innerHTML = `
      ${interactif ? `<div class="auto-eval"><span class="etiquette">Après avoir lu la correction : comment t'en es-tu sorti ?</span>
        <button type="button" class="bouton petit eval-bon" data-auto-val="1">✓ Je savais <kbd>1</kbd></button>
        <button type="button" class="bouton petit eval-moyen" data-auto-val="0.5">≈ En partie <kbd>2</kbd></button>
        <button type="button" class="bouton petit eval-rate" data-auto-val="0">✗ Je ne savais pas <kbd>3</kbd></button></div>` : ''}
      <div class="verdict" data-verdict></div>
      ${aEcrit ? `<details><summary class="note">Ta réponse écrite</summary><div class="reponse-donnee">${echapper(d.texte)}</div></details>` : ''}
      <div class="modele">${inst.reponse}</div>${conseil}
      <details class="points-attendus" ${aEcrit ? 'open' : ''}><summary>🎯 Les ${inst.points.length} points que le recruteur attend — coche ceux que tu as couverts (note plus fine)</summary>
        <ul class="points-cles">${inst.points.map((p, i) => `<li><input type="checkbox" id="pt-${inst.cle}-${i}" data-i="${i}" ${d.coches[i] ? 'checked' : ''} ${interactif ? '' : 'disabled'}><label for="pt-${inst.cle}-${i}">${echapper(p.t)}</label></li>`).join('')}</ul>
        ${aEcrit ? '<p class="note">Cases pré-cochées d\'après les mots-clés de ta réponse écrite : vérifie-les.</p>' : ''}
        <div class="ligne" data-actions-fines></div></details>
      ${lexiqueHtml(`${texteDe(inst.enonce)} ${texteDe(inst.reponse)} ${texteDe(inst.conseil)} ${inst.points.map((p) => p.t).join(' ')}`)}
      <div data-ia></div><div class="ligne" data-actions style="margin-top:12px"></div>`;
    const zoneActions = boite.querySelector('[data-actions]');
    let fini = false;
    const finaliser = () => {
      if (fini) return;
      fini = true;
      document.removeEventListener('keydown', clavier);
      boite.querySelectorAll('.points-cles input, .auto-eval button, [data-ia] button, [data-actions-fines] button').forEach((x) => { x.disabled = true; });
      options.surValideEval(noter(inst, d));
    };
    boite.querySelectorAll('[data-auto-val]').forEach((b) => b.addEventListener('click', () => {
      d.auto = Number(b.dataset.autoVal);
      boite.querySelectorAll('[data-auto-val]').forEach((x) => x.classList.toggle('choisi', x === b));
      majVerdict();
      if (options.surValideEval) finaliser();
    }));
    boite.querySelectorAll('.points-cles input').forEach((c) => c.addEventListener('change', () => { d.coches[Number(c.dataset.i)] = c.checked; d.auto = null; majVerdict(); }));
    // touches 1 / 2 / 3 : auto-évaluation express (seulement pendant une session, une question à la fois)
    const clavier = (ev) => {
      if (!document.body.contains(boite)) return document.removeEventListener('keydown', clavier);
      if (ev.target.closest('textarea, input')) return;
      const b = boite.querySelector(`[data-auto-val="${{ 1: '1', 2: '0.5', 3: '0' }[ev.key]}"]`);
      if (b && !b.disabled) { ev.preventDefault(); b.click(); }
    };
    if (options.surValideEval && interactif) {
      setTimeout(() => document.addEventListener('keydown', clavier), 150);
      const b = document.createElement('button');
      b.className = 'bouton';
      b.textContent = options.libelleSuite ? `Valider selon les points cochés · ${options.libelleSuite}` : 'Valider selon les points cochés';
      b.addEventListener('click', () => { d.auto = null; majVerdict(); finaliser(); });
      boite.querySelector('[data-actions-fines]').append(b);
    }
    if (iaDisponible && interactif && aEcrit) {
      const b = document.createElement('button');
      b.className = 'bouton';
      b.textContent = '🤖 Corriger avec l\'IA';
      b.title = 'Envoie la question, la réponse modèle et ta réponse à l\'IA (seulement quand tu touches le bouton)';
      b.addEventListener('click', () => corrigerIa(boite.querySelector('[data-ia]'), inst, d, b, majVerdict, options.matiere || inst.m));
      zoneActions.append(b);
    }
    majVerdict();
  } else if (inst.type === 'cas') {
    const parEtape = inst.etapes.map((e, i) => noter(e, d?.etapes?.[i]));
    boite.className = `corrige ${classeScore(s)}`;
    boite.innerHTML = `<div class="verdict">Score du cas : ${pastilleScore(s)}</div><ul class="liste-resultats">${inst.etapes.map((e, i) => `<li><details><summary>${pastilleScore(parEtape[i])} ${echapper(e.titre || `Étape ${i + 1}`)}</summary><div data-etape-corrige="${i}"></div></details></li>`).join('')}</ul>${conseil}`;
    boite.querySelectorAll('[data-etape-corrige]').forEach((z) => {
      const i = Number(z.dataset.etapeCorrige);
      const di = (d.etapes[i] ||= {});
      monterCorrige(z, inst.etapes[i], di, { interactif: options.interactif, matiere: inst.m, surChange: () => options.surChange?.(noter(inst, d)) });
    });
  }
  return s;
}

async function corrigerIa(zone, inst, d, bouton, majVerdict, matiere) {
  bouton.disabled = true;
  bouton.textContent = '🤖 Correction en cours…';
  zone.innerHTML = '<div class="ia-retour note">L\'IA lit ta réponse (quelques secondes)…</div>';
  try {
    const r = await appelApi('/api/ia/corriger', {
      matiere, question: texteDe(inst.enonce), reponse_modele: texteDe(inst.reponse),
      points: inst.points.map((p) => p.t), reponse_candidat: d.texte,
    });
    const liste = (titre, x) => (x?.length ? `<h4>${titre}</h4><ul>${x.map((t) => `<li>${echapper(t)}</li>`).join('')}</ul>` : '');
    zone.innerHTML = `<div class="ia-retour"><div class="verdict">🤖 Note de l'IA : ${echapper(r.note)}/10 <span class="muet petit">(${echapper(r.modele || 'Gemini')})</span></div>
      ${liste('Ce que tu as bien couvert', r.points_couverts)}${liste('Ce qui manque', r.points_manquants)}${liste('Erreurs ou imprécisions', r.erreurs)}
      ${r.conseil ? `<p><strong>Conseil :</strong> ${echapper(r.conseil)}</p>` : ''}${r.reponse_ideale ? `<details><summary>Réponse idéale selon l'IA</summary><p style="white-space:pre-wrap">${echapper(r.reponse_ideale)}</p></details>` : ''}
      <button class="bouton petit" data-appliquer>Utiliser la note de l'IA (${echapper(r.note)}/10) comme score</button></div>`;
    zone.querySelector('[data-appliquer]').addEventListener('click', (ev) => { d.noteIa = Number(r.note); d.auto = null; ev.target.disabled = true; majVerdict(); });
    bouton.textContent = '🤖 Corrigé par l\'IA';
  } catch (err) {
    zone.innerHTML = `<div class="ia-retour"><span class="pastille critique">✗</span> ${echapper(err.message)}</div>`;
    bouton.disabled = false;
    bouton.textContent = '🤖 Réessayer la correction IA';
  }
}

export const libelleType = (inst) => (inst.vf ? 'Vrai ou faux' : nomType(inst.type));
export const libelleNiveau = (inst) => NIVEAUX[inst.niveau] || '';

// Lexique : définition de chaque terme financier employé dans la question et sa correction
export function lexiqueHtml(texte) {
  const termes = termesDans(texte || '');
  if (!termes.length) return '';
  return `<details class="lexique" open><summary>📖 Lexique — les ${termes.length} terme${termes.length > 1 ? 's' : ''} employé${termes.length > 1 ? 's' : ''}, définis</summary><dl>${termes.map((t) => `<div><dt>${echapper(t.t)}${t.fr ? ` <span class="fr">· ${echapper(t.fr)}</span>` : ''}</dt><dd>${echapper(t.d)}</dd></div>`).join('')}</dl></details>`;
}
