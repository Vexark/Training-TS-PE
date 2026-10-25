// TS — Pricing mechanisms et SPA
import { q, calcul, theme } from '../fabriques.js';

export default theme('ts', 'prix', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Qu'est-ce qu'un SPA ?`, {
    courte: `<p>Le <strong>Share Purchase Agreement</strong> est le contrat de cession des titres : il fixe le <strong>prix et son mécanisme d'ajustement</strong> (locked box ou completion accounts), les <strong>déclarations et garanties</strong> du vendeur (warranties & indemnities), les <strong>conditions precedent</strong>, les engagements entre signing et closing et le calendrier.</p>`,
    complete: `<ul><li>Rôle du TS : fournir les définitions chiffrées (net debt, NWC, peg, leakage), analyser le bilan de référence, puis préparer ou revoir les completion accounts.</li><li>Rôle des avocats : rédaction, garanties, conditions, droit applicable.</li></ul>`,
    points: [[`Contrat de cession des titres`, ['contrat', 'cession', 'titres']], [`Prix et mécanisme d'ajustement`, ['prix', 'locked', 'completion', 'ajustement']], [`Garanties du vendeur`, ['garantie', 'warrant', 'gap', 'indemn']], [`Conditions / engagements signing-closing`, ['condition', 'signing', 'closing']]],
  }),
  q('102', 1, `Qu'est-ce que le mécanisme de locked box ?`, {
    courte: `<p>Le prix est fixé à la signature sur la base d'un <strong>bilan de référence passé</strong> (locked box date) et <strong>n'est pas ajusté après le closing</strong>. L'acheteur porte économiquement la société depuis la locked box date et il est protégé par l'<strong>interdiction du leakage</strong> (sorties de valeur vers le vendeur), remboursable euro pour euro.</p>`,
    complete: `<ul><li>Souvent un <strong>ticking fee</strong> rémunère le vendeur pour le cash généré entre la locked box date et le closing.</li><li>Avantages : certitude du prix, simplicité, rapidité → favorable au vendeur, fréquent dans les auction processes.</li><li>Inconvénient pour l'acheteur : pas de rattrapage → la DD du bilan de référence doit être très solide.</li></ul>`,
    points: [[`Prix figé sur un bilan de référence`, ['bilan de reference', 'fige', 'locked box date', 'passe']], [`Pas d'ajustement après closing`, ['pas d ajustement', 'apres le closing']], [`Protection par l'interdiction du leakage`, ['leakage', 'fuite']], [`Ticking fee`, ['ticking']]],
  }),
  q('103', 1, `Qu'est-ce qu'un leakage ?`, {
    courte: `<p>Toute <strong>sortie de valeur de la cible vers le vendeur</strong> (ou ses parties liées) entre la locked box date et le closing : dividendes, management fees, bonus de cession, frais du vendeur payés par la cible, abandons de créances, prêts au vendeur. Le vendeur doit le <strong>rembourser euro pour euro</strong>.</p>`,
    complete: `<ul><li>Ne sont pas du leakage : les opérations normales avec des tiers (achats, remboursement d'une échéance bancaire).</li><li>Les sorties prévues et acceptées sont listées en <strong>permitted leakage</strong> (salaire normal du dirigeant, loyer de marché).</li></ul>`,
    points: [[`Sortie de valeur vers le vendeur / parties liées`, ['sortie', 'vendeur', 'partie']], [`Entre locked box date et closing`, ['locked box', 'closing']], [`Exemples`, ['dividende', 'management fees', 'bonus', 'frais']], [`Remboursé euro pour euro`, ['rembours', 'euro pour euro']]],
  }),
  q('104', 1, `Qu'est-ce que le mécanisme de completion accounts ?`, {
    courte: `<p>Un <strong>prix provisoire</strong> est payé au closing, puis <strong>ajusté après le closing</strong> sur la base des comptes établis à la date de closing : net debt réelle et NWC réel comparé au peg.</p>`,
    complete: `<ul><li>Calendrier type : projet de completion accounts 60-90 jours après le closing (souvent par l'acheteur), période de contestation, puis <strong>expert determination</strong> en cas de désaccord.</li><li>Avantage : le prix reflète la situation réelle au transfert → protecteur pour l'acheteur.</li><li>Inconvénients : coût, délai, incertitude pour le vendeur, litiges.</li></ul>`,
    points: [[`Prix provisoire puis ajusté`, ['provisoire', 'ajust']], [`Comptes à la date de closing`, ['date de closing', 'comptes', 'closing']], [`Net debt et NWC réels vs peg`, ['net debt', 'nwc', 'peg']], [`Expert en cas de désaccord`, ['expert', 'desaccord', 'litige']]],
  }),
  q('105', 1, `Qu'est-ce qu'un earn-out ?`, {
    courte: `<p>Un <strong>complément de prix</strong> payé plus tard si la cible atteint des objectifs (EBITDA, revenue…). Il sert à <strong>combler un valuation gap</strong> : le vendeur croit à son business plan, l'acheteur paie le surplus seulement s'il se réalise.</p>`,
    complete: `<ul><li>Fréquent pour les petites tailles (le guide Chambers 2026 note qu'en France les earn-outs sont plus fréquents sous 100 M€ de valeur) et quand le fondateur reste.</li><li>Points sensibles : définition de l'agrégat, contrôle de la gestion par l'acheteur, durée, plafond, litiges.</li></ul>`,
    points: [[`Complément de prix conditionnel`, ['complement', 'conditionnel', 'objectif', 'plus tard']], [`Comble un valuation gap`, ['valuation gap', 'ecart', 'attentes']], [`Indicateurs (EBITDA, revenue)`, ['ebitda', 'revenue', 'chiffre']]],
  }),
  q('106', 1, `Qu'est-ce qu'un escrow ?`, {
    courte: `<p>Un <strong>séquestre</strong> : une partie du prix est bloquée chez un tiers (banque, avocat) pendant une période, pour garantir que le vendeur pourra payer d'éventuelles indemnisations (garanties, specific indemnities, ajustement de prix).</p>`,
    complete: `<ul><li>Utile quand le vendeur est une personne physique ou un fonds qui va distribuer le prix à ses LP.</li><li>Alternatives : garantie bancaire, W&I insurance, retenue sur un earn-out.</li></ul>`,
    points: [[`Partie du prix bloquée chez un tiers`, ['bloque', 'tiers', 'sequestre']], [`Garantit les indemnisations`, ['garanti', 'indemn']], [`Utile si vendeur peu solvable / fonds`, ['vendeur', 'fonds', 'solvab']]],
  }),
  q('107', 1, `Que sont les warranties & indemnities (la GAP) ?`, {
    courte: `<p>Le vendeur fait des <strong>déclarations</strong> sur la société (comptes, contrats, litiges, impôts…) et s'engage à <strong>indemniser l'acheteur</strong> si elles se révèlent fausses ou si un passif d'origine antérieure apparaît. En France on parle souvent de <strong>garantie d'actif et de passif (GAP)</strong>.</p>`,
    complete: `<ul><li>Encadrement : <strong>de minimis</strong> (seuil par réclamation), <strong>basket</strong> (franchise globale), <strong>cap</strong> (plafond), durée (souvent plus longue pour le fiscal et le social).</li><li>Les risques <strong>connus</strong> grâce à la DD sont plutôt traités par une <strong>specific indemnity</strong> ou une baisse de prix.</li><li>De plus en plus remplacée ou complétée par une <strong>W&I insurance</strong>.</li></ul>`,
    points: [[`Déclarations du vendeur`, ['declaration', 'vendeur']], [`Indemnisation si fausses / passif antérieur`, ['indemn', 'passif', 'anterieur']], [`De minimis, basket, cap, durée`, ['de minimis', 'basket', 'cap', 'plafond', 'franchise', 'duree']], [`Risques connus → specific indemnity`, ['specific', 'specifique', 'connu']]],
  }),
  q('108', 1, `Quelle est la différence entre signing et closing ?`, {
    courte: `<p>Au <strong>signing</strong>, acheteur et vendeur signent le SPA : ils sont engagés. Au <strong>closing</strong>, les titres sont transférés et le prix payé, une fois les <strong>conditions precedent</strong> levées (autorisation de concurrence, contrôle des investissements étrangers, financement).</p>`,
    complete: `<ul><li>Entre les deux : <strong>interim covenants</strong> (gestion normale), éventuelle <strong>MAC clause</strong>.</li><li>En locked box, l'acheteur porte économiquement la société depuis la locked box date ; en completion accounts, depuis le closing.</li></ul>`,
    points: [[`Signing = signature du SPA, engagement`, ['signing', 'signature', 'engag']], [`Closing = transfert des titres et paiement`, ['closing', 'transfert', 'paiement']], [`Conditions precedent entre les deux`, ['condition', 'concurrence', 'autorisation']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Locked box ou completion accounts : compare les deux mécanismes.`, {
    duree: 150,
    courte: `<p><strong>Locked box</strong> : prix figé sur un bilan passé, pas d'ajustement, protection par le leakage, souvent un ticking fee → certitude et rapidité, favorable au vendeur. <strong>Completion accounts</strong> : prix ajusté après closing sur la net debt et le NWC réels → protecteur pour l'acheteur, mais plus long, plus coûteux, source de litiges.</p>`,
    complete: `<table class="tableau"><thead><tr><th></th><th>Locked box</th><th>Completion accounts</th></tr></thead><tbody>
      <tr><td>Prix</td><td>Fixé au signing</td><td>Provisoire, ajusté après closing</td></tr>
      <tr><td>Référence</td><td>Bilan à la locked box date</td><td>Comptes à la date de closing</td></tr>
      <tr><td>Risque entre les deux</td><td>Porté par l'acheteur (protégé par le leakage)</td><td>Porté par le vendeur</td></tr>
      <tr><td>Compensation</td><td>Ticking fee pour le vendeur</td><td>Ajustement net debt + NWC vs peg</td></tr>
      <tr><td>Pour qui</td><td>Vendeur (fonds), auction process</td><td>Acheteur, carve-out, bilan volatil</td></tr>
      <tr><td>Inconvénients</td><td>DD du bilan de référence critique</td><td>Coût, délai, litiges, expert</td></tr></tbody></table>`,
    pieges: [`Dire qu'il y a un peg en locked box : le NWC est figé dans le prix.`],
    relances: [[`Lequel recommanderais-tu pour un carve-out ?`, `Completion accounts : pas de comptes séparés fiables et un bilan qui bouge, l'acheteur veut payer la situation réelle au closing.`]],
    conseil: `Question quasi certaine en TS. Termine par une recommandation selon le contexte : c'est ce qui distingue les bons candidats.`,
    points: [[`Locked box : prix figé, pas d'ajustement`, ['fige', 'bilan de reference', 'pas d ajustement']], [`Leakage / ticking fee`, ['leakage', 'ticking']], [`Completion : ajustement post-closing net debt + NWC`, ['apres le closing', 'post-closing', 'ajust', 'nwc']], [`Qui est favorisé`, ['vendeur', 'acheteur', 'favor']], [`Inconvénients (coût, litiges / DD critique)`, ['litige', 'cout', 'expert', 'critique']]],
  }),
  q('202', 2, `Qu'est-ce qu'un permitted leakage et un ticking fee ?`, {
    courte: `<p>Le <strong>permitted leakage</strong> est une sortie de valeur vers le vendeur <strong>listée et acceptée</strong> dans le SPA (salaire normal du dirigeant, loyer de marché, management fees déjà prévus) : déjà intégrée dans le prix, non remboursable. Le <strong>ticking fee</strong> rémunère le vendeur pour le <strong>cash généré</strong> entre la locked box date et le closing (taux annuel × prix des titres × jours / 365, ou montant par jour).</p>`,
    complete: `<ul><li>La liste des permitted leakages est <strong>fermée</strong> : tout le reste est remboursable.</li><li>Le ticking fee est de plus en plus contesté par les acheteurs (le guide Chambers 2026 note que les acheteurs contestent de plus en plus les intérêts sur la locked box) ; il peut être limité au cash réellement généré.</li></ul>`,
    exemple: `<p>Prix des titres 80 M€, ticking fee 6 % par an, closing 90 jours après la locked box date : 80 × 6 % × 90 / 365 = <strong>1,18 M€</strong>.</p>`,
    points: [[`Permitted leakage : listé, accepté, non remboursable`, ['liste', 'accepte', 'permitted', 'non rembours']], [`Exemples (salaire normal, loyer de marché)`, ['salaire', 'loyer', 'marche']], [`Ticking fee : cash généré entre les deux dates`, ['ticking', 'cash genere', 'entre']], [`Calcul (taux × prix × jours / 365)`, ['taux', '365', 'jours']]],
  }),
  q('203', 2, `Dans quels cas préfère-t-on des completion accounts ?`, {
    courte: `<p>Quand le <strong>bilan risque de bouger</strong> beaucoup ou n'est pas fiable : <strong>carve-out</strong> (pas de comptes séparés), forte <strong>saisonnalité</strong> du NWC, cible en <strong>difficulté</strong> (trésorerie volatile), <strong>closing lointain</strong> (autorisations longues), ou acheteur en position de force (pas d'enchères).</p>`,
    complete: `<ul><li>Logique : les completion accounts transfèrent au vendeur le risque d'évolution du bilan jusqu'au closing.</li><li>À l'inverse, en auction process avec un vendeur fonds et un bilan stable audité, la locked box s'impose souvent.</li></ul>`,
    points: [[`Carve-out`, ['carve']], [`Saisonnalité / bilan volatil`, ['saison', 'volatil', 'bouge']], [`Cible en difficulté / closing lointain`, ['difficulte', 'lointain', 'long']], [`Acheteur en position de force`, ['acheteur', 'force', 'pas d enchere']]],
  }),
  q('204', 2, `Quels sont les pièges dans la rédaction d'un earn-out basé sur l'EBITDA ?`, {
    courte: `<p>La <strong>définition de l'EBITDA</strong> (méthodes comptables figées, IFRS 16, liste des adjustments autorisés), le <strong>contrôle de la gestion</strong> par l'acheteur (qui peut déplacer des coûts ou des revenus), la <strong>mécanique</strong> (paliers, plafond, durée), les <strong>changements de normes</strong> et le <strong>règlement des litiges</strong>.</p>`,
    complete: `<ul><li>Joindre un <strong>exemple chiffré</strong> en annexe (« l'EBITDA 2025 calculé selon cette définition est de X »).</li><li>Clauses de gestion : interdiction de transférer des coûts du groupe, maintien de l'équipe, budget minimal.</li><li>Effets de seuil : un palier « tout ou rien » incite aux manipulations ; préférer une formule linéaire.</li><li>IFRS 18 (2027) changera la présentation du compte de résultat des groupes IFRS : figer le référentiel.</li><li>Côté FDD : un earn-out probable est un élément de prix ; un earn-out dû sur une acquisition passée est un debt-like.</li></ul>`,
    points: [[`Définition précise de l'EBITDA / annexe chiffrée`, ['definition', 'annexe', 'methode']], [`Contrôle de la gestion par l'acheteur`, ['gestion', 'controle', 'manipul', 'cout']], [`Paliers / plafond / durée`, ['palier', 'plafond', 'duree', 'lineaire']], [`Changements de normes`, ['norme', 'ifrs']], [`Litiges / expert`, ['litige', 'expert']]],
  }),
  q('205', 2, `Comment fonctionne une W&I insurance et quelles sont ses limites ?`, {
    courte: `<p>Une <strong>assurance</strong> souscrite (souvent par l'acheteur) qui couvre les déclarations et garanties du vendeur : en cas de passif, l'acheteur est indemnisé par l'assureur. Le vendeur (souvent un fonds) peut sortir <strong>« clean »</strong>, sans garantie résiduelle ni escrow.</p>`,
    complete: `<ul><li>L'assureur s'appuie sur les rapports de DD : une DD de qualité est une condition de la couverture.</li><li><strong>Limites</strong> : les risques <strong>déjà connus</strong> (identifiés en DD) sont exclus ; exclusions types (pensions sous-financées, certains risques fiscaux ou environnementaux, ajustements de prix) ; franchise et plafond ; prime (souvent ~1 % de la couverture).</li><li>Les risques connus restent à traiter par prix, debt-like ou specific indemnity.</li></ul>`,
    points: [[`Assurance des garanties du vendeur`, ['assurance', 'garantie', 'declaration']], [`Sortie clean pour le vendeur`, ['clean', 'propre', 'fonds']], [`Appui sur la DD`, ['dd', 'due diligence', 'rapport']], [`Exclut les risques connus`, ['connu', 'exclu', 'identifi']]],
  }),
  q('206', 2, `Qu'est-ce que la MAC clause et les interim covenants ?`, {
    courte: `<p>Entre signing et closing : les <strong>interim covenants</strong> obligent le vendeur à gérer la cible <strong>normalement</strong> (pas de dividende, d'investissement majeur, d'embauche clé, de nouvel endettement sans accord) ; la <strong>MAC clause</strong> (Material Adverse Change) permet à l'acheteur de ne pas réaliser le closing si un événement grave dégrade la cible.</p>`,
    complete: `<ul><li>En locked box, les interim covenants complètent l'interdiction du leakage.</li><li>Les MAC clauses sont souvent étroites et rarement invoquées avec succès ; en France, elles sont moins fréquentes qu'aux États-Unis.</li></ul>`,
    points: [[`Interim covenants : gestion normale`, ['gestion normale', 'interim', 'engagement']], [`MAC : événement grave`, ['mac', 'material adverse', 'grave']], [`Entre signing et closing`, ['signing', 'closing']]],
  }),
  calcul('207', 2, `Locked box au 31/12, prix des titres 80 M€, closing au 31/03 (90 jours). Entre-temps : dividende au vendeur 3 ; management fees au vendeur 0,5 ; salaire normal du dirigeant 0,1 (permitted leakage). Ticking fee 5 % par an. Leakage à rembourser et ticking fee ?`, [
    ['Leakage à rembourser', 3.5, 'M€', 0.05],
    ['Ticking fee', 0.99, 'M€', 0.02, 2],
  ], `<p><strong>Leakage</strong> = dividende 3 + management fees 0,5 = <strong>3,5 M€</strong> (le salaire est un permitted leakage, déjà dans le prix).</p>
    <p><strong>Ticking fee</strong> = 80 × 5 % × 90 / 365 = <strong>0,99 M€</strong>.</p>
    <p><strong>Prix net</strong> payé par l'acheteur ≈ 80 + 0,99 − 3,5 = 77,5 M€.</p>`),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Le vendeur propose une locked box sur un bilan à 9 mois, avec un closing prévu dans 6 mois. Que recommandes-tu à l'acheteur ?`, {
    courte: `<p>Accepter seulement avec des protections fortes : <strong>fiabiliser le bilan de référence</strong> (DD approfondie, revue des écritures de clôture), <strong>leakage</strong> défini largement avec une liste fermée de permitted leakages, <strong>ticking fee</strong> limité, <strong>interim covenants</strong> stricts, escrow si nécessaire. Sinon proposer des <strong>completion accounts</strong> ou une locked box plus récente.</p>`,
    complete: `<ul><li>15 mois séparent la référence du closing : beaucoup de choses peuvent changer (NWC, trésorerie, résultats).</li><li>Le bilan à 9 mois n'est probablement pas audité : risque de cut-off, de provisions incomplètes.</li><li>Ticking fee : le conditionner au cash réellement généré, ou le refuser si l'activité est risquée.</li><li>Garanties : déclaration spécifique « pas de leakage » + remboursement euro pour euro, escrow si le vendeur va distribuer le prix.</li></ul>`,
    points: [[`Fiabiliser le bilan de référence`, ['bilan de reference', 'fiabil', 'revue', 'audit']], [`Leakage large + liste fermée`, ['leakage', 'liste fermee', 'permitted']], [`Ticking fee limité`, ['ticking']], [`Interim covenants / escrow`, ['interim', 'escrow', 'gestion']], [`Alternative : completion accounts`, ['completion', 'plus recent']]],
  }),
  q('302', 3, `Comment se règle un désaccord sur les completion accounts ?`, {
    courte: `<p>Selon le process prévu au SPA : la partie désignée (souvent l'<strong>acheteur</strong>, qui contrôle désormais la société) prépare les completion accounts ; l'autre partie a un <strong>délai pour contester</strong> (objection notice) ; les parties négocient ; à défaut, un <strong>expert indépendant</strong> (souvent un cabinet d'audit) tranche, dans les limites de sa mission (expert determination, pas un arbitrage).</p>`,
    complete: `<ul><li>Clé : des <strong>principes comptables convenus</strong> (hiérarchie : règles spécifiques du SPA > méthodes historiques > normes) et un <strong>exemple chiffré</strong> en annexe réduisent les litiges.</li><li>Les désaccords fréquents : provisions, cut-off, classement net debt / NWC, valorisation des stocks.</li><li>Rôle du TS : préparer ou revoir les completion accounts, chiffrer les points contestés, assister devant l'expert.</li></ul>`,
    points: [[`Préparation par une partie (souvent l'acheteur)`, ['acheteur', 'prepar']], [`Délai de contestation`, ['contest', 'delai', 'objection']], [`Expert indépendant`, ['expert']], [`Principes comptables convenus / annexe`, ['principe', 'annexe', 'hierarchie', 'methode']]],
  }),
  q('303', 3, `Acheteur et vendeur divergent de 20 % sur le prix. Comment structurer le deal pour le faire aboutir ?`, {
    courte: `<p>En partageant le risque sur ce qui fait l'écart : <strong>earn-out</strong> (si l'écart vient du business plan), <strong>vendor loan</strong> (paiement différé), <strong>rollover</strong> du vendeur (il réinvestit et profite de l'upside), <strong>deferred consideration</strong>, ou structuration du capital (actions de préférence).</p>`,
    complete: `<ul><li>Diagnostiquer d'abord la source de l'écart : adjusted EBITDA (FDD), multiple, croissance future, debt-like items ?</li><li>Earn-out : adapté si le fondateur reste et que l'agrégat est mesurable.</li><li>Vendor loan : améliore l'IRR de l'acheteur (moins d'equity) et montre la confiance du vendeur.</li><li>Rollover : le vendeur garde 10-30 % aux côtés du fonds.</li><li>Le guide Chambers 2026 cite earn-outs, rollovers vendeurs et vendor loans comme outils pour combler les écarts de valorisation en France.</li></ul>`,
    points: [[`Diagnostiquer la source de l'écart`, ['source', 'diagnostic', 'ecart', 'pourquoi']], [`Earn-out`, ['earn']], [`Vendor loan / paiement différé`, ['vendor loan', 'credit vendeur', 'differ']], [`Rollover du vendeur`, ['rollover', 'reinvest', 'roll']]],
  }),
  q('304', 3, `De minimis, basket, cap : explique la mécanique d'indemnisation d'une garantie.`, {
    courte: `<p>Le <strong>de minimis</strong> écarte les petites réclamations (sous X k€ chacune) ; le <strong>basket</strong> est une franchise globale : on n'indemnise qu'au-delà d'un cumul (franchise « déductible » : seulement l'excédent ; « non déductible » ou « tipping » : tout dès le seuil franchi) ; le <strong>cap</strong> plafonne l'indemnisation totale (souvent 10-30 % du prix, plus pour les garanties fondamentales).</p>`,
    complete: `<ul><li>Durées : 18-24 mois en général, plus longues pour le fiscal et le social (délais de prescription).</li><li>Les specific indemnities échappent souvent au de minimis et au basket.</li></ul>`,
    exemple: `<p>De minimis 20 k€, basket déductible 300 k€, cap 5 M€. Réclamations : 15 k€ (écartée), 250 k€ et 200 k€ → cumul 450 k€ → indemnisation 450 − 300 = <strong>150 k€</strong> (en tipping : 450 k€).</p>`,
    points: [[`De minimis : seuil par réclamation`, ['de minimis', 'seuil', 'reclamation']], [`Basket : franchise globale (déductible / tipping)`, ['basket', 'franchise', 'deductible', 'tipping']], [`Cap : plafond`, ['cap', 'plafond']], [`Durées / specific indemnities à part`, ['duree', 'specific', 'specifique']]],
  }),
  q('305', 3, `La DD identifie un risque fiscal de 2 M€ (redressement possible). Debt-like, specific indemnity ou baisse de prix : comment choisir ?`, {
    courte: `<p>Selon la <strong>certitude</strong> et la <strong>chiffrabilité</strong> : risque quasi certain et chiffré → <strong>debt-like</strong> (ou baisse de prix) ; risque incertain → <strong>specific indemnity</strong> (le vendeur paie seulement si le risque se réalise), idéalement garantie par un <strong>escrow</strong>. La W&I ne le couvrira pas (risque connu).</p>`,
    complete: `<ul><li>Debt-like : protège l'acheteur immédiatement mais fait payer le vendeur même si le risque ne se réalise pas → il s'y opposera si la probabilité est faible.</li><li>Specific indemnity : pas de franchise, durée calée sur la prescription fiscale, escrow pour la solvabilité.</li><li>Négociation : partage (50 % en debt-like, 50 % en indemnité), montant probabilisé.</li><li>Vérifier aussi si le problème est récurrent (impact sur l'impôt futur, donc le business plan).</li></ul>`,
    points: [[`Critère : certitude et chiffrage`, ['certitude', 'probab', 'chiffr']], [`Certain → debt-like / baisse de prix`, ['debt-like', 'debt like', 'baisse']], [`Incertain → specific indemnity + escrow`, ['indemn', 'specifique', 'escrow']], [`W&I ne couvre pas les risques connus`, ['w&i', 'assurance', 'connu']]],
  }),
]);
