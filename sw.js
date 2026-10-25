// Service worker : copie de toute l'app dans le téléphone pour qu'elle marche sans réseau.
const VERSION = 'training-81fe02658bfc';
const FICHIERS = ["./", "index.html", "style.css", "manifest.json", "icone-192.png", "icone-512.png", "js/app.js", "js/contenu/complements-pe.js", "js/contenu/complements-relances.js", "js/contenu/complements.js", "js/contenu/conseils.js", "js/contenu/fabriques.js", "js/contenu/fiches.js", "js/contenu/glossaire.js", "js/contenu/pe.js", "js/contenu/pe/dette.js", "js/contenu/pe/fit.js", "js/contenu/pe/lbo.js", "js/contenu/pe/metier.js", "js/contenu/pe/mgmt.js", "js/contenu/pe/rendement.js", "js/contenu/pe/sortie.js", "js/contenu/pe/these.js", "js/contenu/pe/valo.js", "js/contenu/ts.js", "js/contenu/ts/bfr.js", "js/contenu/ts/comptes.js", "js/contenu/ts/dette.js", "js/contenu/ts/fit.js", "js/contenu/ts/ifrs.js", "js/contenu/ts/metier.js", "js/contenu/ts/prix.js", "js/contenu/ts/qoe.js", "js/contenu/ts/valo.js", "js/etat.js", "js/exercice.js", "js/generateurs/commun.js", "js/generateurs/pe.js", "js/generateurs/secteurs.js", "js/generateurs/sprint.js", "js/generateurs/ts.js", "js/graphiques.js", "js/moteur.js", "js/outils.js", "js/vues/accueil.js", "js/vues/divers.js", "js/vues/matiere.js", "js/vues/progression.js", "js/vues/run.js", "js/vues/sprint.js", "js/vues/ui.js"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((cles) => Promise.all(cles.filter((c) => c !== VERSION).map((c) => caches.delete(c)))).then(() => self.clients.claim()));
});
// réseau d'abord (mises à jour), copie du téléphone si pas de réseau ; les appels à Gemini ne sont jamais mis en cache
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { const copie = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copie)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))));
});
