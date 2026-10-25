// PE — Exits et marché 2026
import { q, theme } from '../fabriques.js';

export default theme('pe', 'sortie', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Quelles sont les voies d'exit d'un LBO ?`, {
    courte: `<p><strong>Trade sale</strong> (cession à un industriel), <strong>SBO</strong> (cession à un autre fonds), <strong>IPO</strong> (introduction en bourse), et des solutions de liquidité partielle : <strong>dividend recap</strong>, cession minoritaire, <strong>continuation vehicle</strong>.</p>`,
    complete: `<ul><li>Le choix dépend du marché : en 2025-2026, les cessions entre fonds et les solutions de liquidité dominent ; l'IPO reste marginale en France.</li></ul>`,
    points: [[`Trade sale`, ['trade sale', 'industriel', 'strateg']], [`SBO`, ['sbo', 'secondaire', 'fonds']], [`IPO`, ['ipo', 'bourse']], [`Liquidité partielle (recap, continuation)`, ['recap', 'continuation', 'minoritaire', 'partiel']]],
  }),
  q('102', 1, `Trade sale ou SBO : avantages de chacun pour le fonds vendeur ?`, {
    courte: `<p><strong>Trade sale</strong> : un industriel peut payer plus grâce aux <strong>synergies</strong> et achète 100 % (exit totale), mais le process peut être plus long (concurrence, intégration). <strong>SBO</strong> : process rapide et rodé, le management peut réinvestir et rester, mais le prix est limité par l'IRR et la dette de l'acheteur.</p>`,
    points: [[`Trade sale : synergies, prix`, ['synergie', 'industriel', 'prix']], [`SBO : rapidité, management qui réinvestit`, ['rapid', 'management', 'reinvest', 'sbo']], [`SBO limité par IRR / dette`, ['irr', 'dette', 'limite']]],
  }),
  q('103', 1, `Quels sont les avantages et inconvénients d'une IPO comme exit ?`, {
    courte: `<p><strong>Avantages</strong> : valorisation potentiellement élevée, visibilité, possibilité de garder une participation pour l'upside. <strong>Inconvénients</strong> : exit <strong>partielle</strong> (lock-up, cessions étalées), dépendance aux <strong>marchés</strong>, coût, exigences de gouvernance et de communication.</p>`,
    complete: `<p>Le guide Chambers 2026 note que le marché des IPO reste marginal en France (Exosens et Planisware en 2024 parmi les dernières introductions de sociétés sous LBO).</p>`,
    points: [[`Valorisation / upside`, ['valorisation', 'upside', 'visibilit']], [`Exit partielle / lock-up`, ['partiel', 'lock']], [`Dépend des marchés / coût`, ['marche', 'cout']]],
  }),
  q('104', 1, `Quelle est la durée de détention typique d'une participation, et comment évolue-t-elle ?`, {
    courte: `<p>Souvent <strong>4 à 6 ans</strong>, mais elle <strong>augmente</strong> quand les exits sont difficiles (écart de valorisation, marché de la dette, IPO fermées) : pression sur les prorogations de fonds, recherche de solutions de liquidité (secondaires, continuation vehicles, dividend recaps).</p>`,
    points: [[`4 à 6 ans`, ['4', '6 ans', 'cinq']], [`En hausse`, ['hausse', 'augment', 'allong']], [`Conséquences : liquidité, prorogations`, ['continuation', 'secondaire', 'prorog', 'liquidit']]],
  }),
  q('105', 1, `Pourquoi un fonds vendeur fait-il faire une VDD et souscrit-il une W&I insurance ?`, {
    courte: `<p>Pour un <strong>process rapide et compétitif</strong> (tous les acheteurs sur la même base, moins de renégociation) et une <strong>sortie « clean »</strong> : grâce à la W&I, il ne garde quasiment pas de garantie résiduelle ni d'escrow, et peut distribuer tout le produit de cession à ses LP.</p>`,
    points: [[`Process rapide et compétitif`, ['rapide', 'competit', 'process']], [`Sortie clean`, ['clean', 'propre']], [`Pas de garantie résiduelle / distribution aux LP`, ['garantie', 'escrow', 'lp', 'distribu']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Quelle est ta lecture du marché du private equity en France en 2026 ?`, {
    duree: 150,
    courte: `<p>D'après le guide Chambers Private Equity 2026 : un <strong>record en 2025</strong> (83,2 Md€ sur 1 082 opérations) puis un <strong>début 2026 plus mitigé</strong> (25,2 Md€ sur 470 opérations au S1) ; les <strong>add-ons</strong> font plus de 50 % des deals ; les <strong>exits</strong> sont difficiles (valeur en baisse 4 années de suite), d'où l'essor des <strong>continuation vehicles</strong> et des secondaires ; le <strong>fundraising</strong> est plus dur ; le <strong>private credit</strong> finance beaucoup de deals ; la fiscalité des management packages a changé (163 bis H).</p>`,
    complete: `<ul><li>Termine par <strong>ton avis</strong> et un deal que tu as analysé dans ta veille.</li><li>Autres faits du guide : investisseurs américains = 25,7 % de la valeur des deals au S1 2026 ; sponsor-to-sponsor = 76,9 % de la valeur des sorties au T1 2026 ; deals cités : Antin / Idex, Eurazeo / Aroma-Zone, Ardian / Akuo, Advent / Kereis.</li></ul>`,
    conseil: `Cite ta source : « d'après le guide Chambers 2026 ». Mets ces chiffres à jour avec ta veille.`,
    points: [[`2025 record, 2026 plus mitigé`, ['record', '2025', 'mitige', 'ralenti']], [`Add-ons > 50 %`, ['add-on', 'build', '50']], [`Exits difficiles / continuation`, ['exit', 'sortie', 'continuation', 'secondaire']], [`Financement / fundraising`, ['private credit', 'dette privee', 'levee', 'fundraising']], [`Avis personnel`, ['avis', 'je pense', 'selon moi']]],
  }),
  q('202', 2, `Continuation vehicle : quel est le principal enjeu de gouvernance ?`, {
    courte: `<p>Le <strong>conflit d'intérêts</strong> : le GP est à la fois <strong>vendeur</strong> (pour l'ancien fonds) et <strong>acheteur</strong> (pour le nouveau véhicule). Parades : <strong>prix testé</strong> de façon indépendante (process concurrentiel, fairness opinion), consultation du <strong>LPAC</strong>, choix laissé aux LP (vendre ou rouler), transparence sur les frais et le carry.</p>`,
    points: [[`Conflit d'intérêts (vendeur et acheteur)`, ['conflit', 'vendeur', 'acheteur']], [`Prix testé / fairness opinion`, ['fairness', 'independant', 'prix']], [`LPAC`, ['lpac']], [`Choix laissé aux LP`, ['choix', 'lp', 'rouler', 'vendre']]],
  }),
  q('203', 2, `Qu'est-ce qu'un dual track ?`, {
    courte: `<p>Préparer <strong>en parallèle</strong> une <strong>IPO</strong> et une <strong>cession</strong> (trade sale ou SBO) : on maximise la tension concurrentielle et on garde une alternative si l'une des voies se ferme. Coûteux, mais utile pour les gros actifs.</p>`,
    points: [[`IPO et cession en parallèle`, ['parallele', 'ipo', 'cession']], [`Tension concurrentielle / alternative`, ['concurren', 'alternative', 'tension']], [`Coûteux`, ['cout', 'couteux']]],
  }),
  q('204', 2, `Pourquoi un fonds ferait-il une exit partielle (cession minoritaire) ?`, {
    courte: `<p>Pour <strong>rendre du cash aux LP</strong> (DPI) sans vendre à un prix jugé trop bas, garder l'<strong>upside</strong> sur la partie conservée, faire entrer un <strong>co-investisseur</strong> pour financer la croissance, ou <strong>tester la valorisation</strong> sur le marché.</p>`,
    points: [[`Cash / DPI pour les LP`, ['dpi', 'cash', 'lp', 'distribu']], [`Garder l'upside`, ['upside', 'garder']], [`Co-investisseur / valorisation`, ['co-invest', 'valorisation', 'tester']]],
  }),
  q('205', 2, `Qu'est-ce qui a changé dans le contrôle des concentrations en France en 2026, selon le guide Chambers ?`, {
    courte: `<p>Depuis le <strong>1er septembre 2026</strong> (loi n° 2026-403), les seuils sont relevés : <strong>250 M€</strong> de chiffre d'affaires mondial cumulé (contre 150 M€) et <strong>80 M€</strong> en France pour au moins deux parties (contre 50 M€). Effet pour le PE : moins de notifications pour les petits add-ons, donc des closings plus rapides.</p>`,
    complete: `<p>Information issue d'une source secondaire : à vérifier sur Légifrance avant d'en faire un argument central.</p>`,
    points: [[`Seuils relevés (250 M€ / 80 M€)`, ['250', '80', 'seuil']], [`Septembre 2026`, ['2026', 'septembre']], [`Effet : moins de notifications pour les add-ons`, ['notification', 'add-on', 'rapide']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Tu prépares l'exit d'une participation dans deux ans. Que fais-tu dès maintenant ?`, {
    courte: `<p>L'<strong>exit readiness</strong> : fiabiliser le <strong>reporting</strong> et les KPI (données mensuelles, LTM), construire une <strong>equity story</strong> chiffrée (croissance, add-ons intégrés, pipeline), renforcer l'<strong>équipe</strong> (DAF, n°2), nettoyer le <strong>juridique</strong> et les sujets ESG, anticiper les <strong>adjustments</strong> et le NWC (VDD, vendor assistance), identifier les <strong>acheteurs</strong> potentiels, choisir le bon <strong>timing</strong>.</p>`,
    points: [[`Reporting / KPI fiables`, ['reporting', 'kpi', 'donnees']], [`Equity story`, ['equity story', 'histoire', 'croissance']], [`Équipe / juridique / ESG`, ['equipe', 'juridique', 'esg', 'daf']], [`VDD / adjustments anticipés`, ['vdd', 'adjust', 'nwc', 'vendor']], [`Acheteurs / timing`, ['acheteur', 'timing', 'marche']]],
  }),
  q('302', 3, `Le marché des exits est fermé et le fonds arrive en fin de vie. Quelles options ?`, {
    courte: `<p><strong>Prolonger</strong> le fonds (accord des LP), <strong>continuation vehicle</strong> (GP-led secondary), <strong>dividend recap</strong> ou <strong>NAV financing</strong> pour rendre du cash, <strong>cession partielle</strong> ou minoritaire, <strong>vente à un fonds secondaire</strong> d'un portefeuille, ou accepter une exit à un prix plus bas.</p>`,
    complete: `<ul><li>Arbitrage : chaque option a un coût (prix, levier, conflit d'intérêts) qu'il faut expliquer aux LP.</li></ul>`,
    points: [[`Prolongation`, ['prolong', 'prorog']], [`Continuation vehicle / secondaire`, ['continuation', 'secondaire']], [`Dividend recap / NAV`, ['recap', 'nav']], [`Cession partielle / prix plus bas`, ['partiel', 'minoritaire', 'prix']]],
  }),
  q('303', 3, `Pourquoi les sponsor-to-sponsor dominent-ils les exits, et quelles sont leurs limites ?`, {
    courte: `<p>Parce que les fonds ont du <strong>dry powder</strong> à investir, que les process sont <strong>rapides</strong> et rodés, que les industriels sont plus prudents et que l'IPO est fermée (selon le guide Chambers 2026 : 76,9 % de la valeur des sorties au T1 2026 en France). Limites : le prix est contraint par l'<strong>IRR</strong> et la <strong>dette</strong> de l'acheteur ; les leviers « faciles » ont déjà été utilisés par le premier fonds, d'où la question : <strong>où est la valeur pour le nouveau fonds</strong> ?</p>`,
    points: [[`Dry powder / process rapides`, ['dry powder', 'rapide', 'capital']], [`Industriels prudents / IPO fermée`, ['industriel', 'ipo', 'prudent']], [`Prix contraint par IRR / dette`, ['irr', 'dette', 'prix']], [`Leviers déjà utilisés`, ['levier', 'deja', 'valeur']]],
  }),
]);
