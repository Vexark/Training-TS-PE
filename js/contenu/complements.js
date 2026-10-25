// Compléments de correction (réponse complète, exemple, pièges, relances du recruteur) pour les questions dont le
// corrigé initial ne contenait que la réponse courte. Fusionnés au chargement : un champ déjà rempli n'est jamais écrasé.
import { COMPLEMENTS_PE } from './complements-pe.js';
import { COMPLEMENTS_RELANCES } from './complements-relances.js';

export const COMPLEMENTS = {
  // ================================================================ TRANSACTION SERVICES
  'ts-dette-205': {
    complete: `<ul><li><strong>Pourquoi debt-like</strong> : c'est le vendeur qui décide de récompenser ses managers pour la vente ; si la cible le paie avec sa trésorerie après le closing, l'acheteur financerait la décision du vendeur.</li>
      <li><strong>Montant</strong> : bonus brut + charges sociales patronales (souvent ~45 % en France), éventuellement net de l'économie d'impôt s'il est déductible.</li>
      <li><strong>EBITDA</strong> : s'il a été provisionné en charges sur la période LTM, on le réintègre (one-off) — sans double counting avec la net debt.</li>
      <li><strong>Locked box</strong> : payé après la locked box date, c'est un leakage (sauf s'il est listé en permitted leakage et déjà déduit du prix).</li></ul>`,
    exemple: `<p>Bonus de 1 M€ brut, charges 45 % → coût 1,45 M€ ; net d'IS à 25 % : ~1,09 M€ en debt-like.</p>`,
    pieges: [`Oublier les charges sociales.`, `Le retirer de l'EBITDA ET l'oublier en net debt (ou l'inverse).`],
    relances: [[`Et si le bonus est payé par le vendeur directement ?`, `Alors aucun impact pour l'acheteur : ni debt-like ni leakage (à vérifier dans le SPA).`]],
  },
  'ts-valo-107': {
    complete: `<ul><li><strong>Control premium</strong> : le contrôle permet de décider de la stratégie, de l'allocation du cash, des dividendes, du management : cela a une valeur (souvent 20-40 % au-dessus du cours de bourse dans les OPA).</li>
      <li><strong>Synergies</strong> : un industriel en rétrocède une partie au vendeur pour gagner le deal.</li>
      <li><strong>Mécanique de marché</strong> : un cours de bourse reflète l'échange de petites quantités entre minoritaires ; une transaction porte sur 100 % du capital, en enchères.</li></ul>`,
    pieges: [`Appliquer un multiple boursier à une acquisition de contrôle sans l'ajuster.`, `Comparer des transactions de périodes de marché très différentes.`],
    relances: [[`Dans quel cas un multiple de transaction pourrait-il être plus bas ?`, `Vente forcée (vendeur en difficulté), marché de la dette fermé, petite taille ou actif de moindre qualité par rapport aux cotées.`]],
  },
  'ts-valo-109': {
    complete: `<ul><li>Prix des titres = EV − net debt, et EV = multiple × adjusted EBITDA.</li>
      <li>Un adjustment d'EBITDA est réputé <strong>récurrent</strong> : il est capitalisé au multiple. Un debt-like est un montant <strong>ponctuel</strong> : il se déduit une fois.</li>
      <li>Conséquence pratique : le vendeur conteste en priorité les adjustments d'EBITDA, et la FDD doit être particulièrement documentée sur ces points.</li></ul>`,
    exemple: `<p>Multiple 9x : −0,3 M€ d'EBITDA → −2,7 M€ de prix ; +0,3 M€ de debt-like → −0,3 M€ de prix.</p>`,
    pieges: [`Appliquer le multiple à un debt-like.`],
    relances: [[`Un élément peut-il toucher les deux ?`, `Oui, mais il ne faut le compter qu'une fois : un litige récurrent réduit l'EBITDA (coût normal), un litige ponctuel provisionné va en debt-like.`]],
  },
  'ts-valo-110': {
    complete: `<ul><li><strong>Gordon growth</strong> : TV = FCF(n+1) / (WACC − g), avec g ≤ croissance de long terme de l'économie (souvent 1,5-2,5 %).</li>
      <li><strong>Exit multiple</strong> : TV = multiple × EBITDA(n) ; plus proche de la pratique des fonds, mais il « importe » le sentiment du marché.</li>
      <li>On actualise ensuite la TV (de l'année n) au WACC, comme les autres flux.</li>
      <li>Contrôle croisé : le multiple implicite de la TV Gordon doit être cohérent avec les multiples de marché.</li></ul>`,
    exemple: `<p>FCF(n+1) = 10, WACC 8 %, g 2 % → TV = 10 / 6 % = 167, à actualiser sur n années.</p>`,
    pieges: [`Oublier d'actualiser la terminal value.`, `Un g supérieur ou proche du WACC (valeur qui explose).`],
    relances: [[`Pourquoi pèse-t-elle autant ?`, `Parce qu'elle représente tous les flux au-delà de 5-10 ans, alors que l'horizon explicite n'en couvre que quelques années.`]],
  },
  'ts-valo-206': {
    complete: `<ul><li>IFRS 16 change la <strong>présentation</strong> (loyers → D&A + intérêts, lease liability au bilan), pas les cash flows réels.</li>
      <li>Deux conventions valables : <strong>pre-IFRS 16</strong> (EBITDA après loyers, leases hors net debt, multiples pre) ou <strong>post-IFRS 16</strong> (EBITDA avant loyers, leases dans la net debt, multiples post — plus bas).</li>
      <li>Les erreurs typiques : EBITDA post × multiple pre ; ou EBITDA post sans déduire les lease liabilities.</li></ul>`,
    exemple: `<p>EBITDA pre 16, loyers 4, lease liability 22, net debt 50, multiple pre 9x → Equity 94. En post : EV = 144 + 22 = 166, multiple post 8,3x × 20 = 166 → Equity = 166 − 50 − 22 = 94.</p>`,
    pieges: [`Mélanger les conventions.`],
    relances: [[`Laquelle préfèrent les fonds ?`, `Souvent pre-IFRS 16, pour comparer avec l'historique et les covenants bancaires définis avant loyers.`]],
  },
  'ts-fit-105': {
    complete: `<ul><li><strong>Trajectoire</strong> : 2-3 ans pour devenir senior (piloter des workstreams, encadrer), puis manager (piloter des missions, relation client).</li>
      <li><strong>Expertise</strong> : un ou deux secteurs (santé, logiciel, industrie…) ou un type de deal (carve-outs, VDD).</li>
      <li><strong>Contribution</strong> : former les juniors, participer au développement commercial.</li>
      <li>Formule : « Dans 5 ans, je veux être celui ou celle à qui l'on confie une DD complexe de bout en bout. »</li></ul>`,
    pieges: [`Annoncer que tu veux partir en PE dans 2 ans.`, `Une réponse floue (« je ne sais pas encore »).`],
    relances: [[`Et si une opportunité en fonds se présentait ?`, `Réponse honnête et mesurée : « Mon objectif aujourd'hui est de devenir un très bon professionnel du TS ; je jugerai le moment venu, mais ce n'est pas mon plan. »`]],
  },
  'ts-fit-107': {
    complete: `<ul><li><strong>Ce que l'audit t'a apporté / t'apporterait</strong> : rigueur, connaissance des normes, compréhension des process comptables.</li>
      <li><strong>Ce que tu cherches en plus</strong> : un regard économique (qu'est-ce qui est récurrent ? que vaut la société ?), un impact direct sur une décision et un prix, le rythme des deals, le contact avec des investisseurs.</li>
      <li><strong>Exemple</strong> : une analyse de ta veille où l'adjusted EBITDA ou un debt-like changeait le prix.</li></ul>`,
    pieges: [`Dénigrer l'audit (« c'est répétitif »).`],
    relances: [[`Qu'est-ce qui te manquerait de l'audit ?`, `La vision complète d'un cycle de clôture et le temps d'approfondir un sujet ; le TS demande d'aller vite à l'essentiel.`]],
  },
  'ts-fit-108': {
    complete: `<ul><li>Montre que tu connais la réalité : pics de charge avant les remises de rapport, journées longues certaines semaines, périodes plus calmes ensuite.</li>
      <li>Donne un exemple vécu où tu as tenu un rythme intense (concours, stage, projet) et ce que tu en as appris.</li>
      <li>Explique tes leviers : organisation, priorités claires, hygiène de vie, communication avec l'équipe.</li></ul>`,
    pieges: [`Dire « aucun problème, je peux travailler 100 heures par semaine » (peu crédible).`, `Montrer de la réticence.`],
    relances: [[`Comment gères-tu deux deadlines en même temps ?`, `Je clarifie les priorités avec les managers concernés, j'annonce tôt ce qui est réaliste et je découpe le travail.`]],
  },
  'ts-fit-202': {
    complete: `<ul><li><strong>Situation</strong> (1 phrase) : « En stage, la veille d'un comité, … ».</li><li><strong>Tâche</strong> : ce qui était attendu, l'échéance, les enjeux.</li>
      <li><strong>Action</strong> (le cœur, 60 % du temps) : comment tu as priorisé, découpé, demandé de l'aide ou des arbitrages, contrôlé la qualité.</li>
      <li><strong>Résultat</strong> : chiffré si possible (livré à temps, qualité, retour du manager) + la leçon que tu appliques depuis.</li></ul>`,
    pieges: [`Raconter ce que « l'équipe » a fait sans dire ce que TU as fait.`, `Une histoire sans résultat.`],
    relances: [[`Que ferais-tu différemment ?`, `Une vraie réponse (anticiper, alerter plus tôt) montre ta capacité à apprendre.`]],
  },
  'ts-fit-204': {
    complete: `<ul><li><strong>Executive summary</strong> : les 5-6 messages clés chiffrés, leur impact sur le prix et le SPA, les points ouverts.</li>
      <li><strong>Hiérarchie</strong> : d'abord ce qui change la valeur ou la décision ; le détail en annexe et dans le databook.</li>
      <li><strong>Lisibilité</strong> : un graphique par message (EBITDA bridge, NWC mensuel), des titres qui disent la conclusion.</li>
      <li><strong>Traçabilité et limites</strong> : sources, périmètre, informations non obtenues.</li></ul>`,
    pieges: [`Décrire un rapport exhaustif de 150 pages comme « idéal ».`],
    relances: [[`Que lit un partner de fonds en premier ?`, `L'executive summary et l'EBITDA bridge : il veut savoir en 5 minutes si le prix tient.`]],
  },
  'ts-fit-206': {
    complete: `<ul><li>Choisis un exemple réel (projet de groupe, stage) avec une vraie pression (délai, enjeu).</li>
      <li>Montre des comportements précis : tu clarifies qui fait quoi, tu fais des points courts et réguliers, tu alertes tôt, tu aides un collègue en difficulté, tu gardes ton calme.</li>
      <li>Termine par le résultat et ce que l'équipe en a retiré.</li></ul>`,
    pieges: [`Généralités sans exemple (« je suis très team player »).`],
    relances: [[`Et si un collègue ne fait pas sa part ?`, `J'en parle d'abord avec lui en privé pour comprendre, puis, si ça bloque le livrable, j'en informe le manager de façon factuelle.`]],
  },
  'ts-fit-302': {
    complete: `<ul><li><strong>Technique</strong> : « Je peux expliquer et calculer un adjusted EBITDA, un NWC peg, une adjusted net debt, la différence locked box / completion accounts » (cite 2 exemples de l'entraînement).</li>
      <li><strong>Pratique</strong> : ta veille hebdomadaire de deals (analyse et publication), Excel, une expérience concrète.</li>
      <li><strong>Savoir-être</strong> : rigueur, rapidité d'apprentissage, communication.</li>
      <li><strong>Engagement</strong> : « Les trois premiers mois, je veux être fiable sur le databook et autonome sur une section du rapport. »</li></ul>`,
    pieges: [`Rester abstrait.`, `Dépasser la minute.`],
    relances: [[`Qu'est-ce qui te manque encore ?`, `Une réponse honnête et un plan (par exemple : l'expérience des data rooms réelles, que je compense par des cas pratiques).`]],
  },
  'ts-fit-303': {
    complete: `<ul><li><strong>Préparer</strong> : historique de l'élément, documents, impact chiffré sur le prix, comparaison avec ce que contestera l'autre partie.</li>
      <li><strong>Échanger</strong> : en privé, avec des faits ; écouter (contexte client, stratégie de négociation).</li>
      <li><strong>Proposer</strong> : présenter l'adjustment séparément (« management view »), avec ses limites et sa sensibilité.</li>
      <li><strong>Décider</strong> : si le point est majeur et que le désaccord persiste, l'associé tranche ; ensuite, on applique la décision.</li></ul>`,
    pieges: [`Contourner le manager en allant voir l'associé directement.`, `Céder sans rien dire alors que c'est significatif.`],
    relances: [[`Et si c'est vraiment contraire à l'éthique ?`, `On ne signe pas un chiffre qu'on sait faux : escalade à l'associé et, si besoin, aux instances qualité du cabinet.`]],
  },
  'ts-dette-110': {
    complete: `<ul><li><strong>Net debt comptable</strong> : emprunts bancaires, obligations, découverts, dettes de crédit-bail − trésorerie et équivalents, à la date du bilan.</li>
      <li><strong>+ debt-like items</strong> : dividendes votés non versés, litiges probables, dettes fiscales et sociales échues, earn-outs et compléments de prix à payer, bonus de deal, capex en retard…</li>
      <li><strong>− cash-like items</strong> : créances fiscales remboursables, dépôts de garantie récupérables…</li>
      <li><strong>Corrections du cash</strong> : trapped cash (non disponible), cash minimum opérationnel, chèques émis non encaissés, window dressing, saisonnalité.</li>
      <li><strong>But</strong> : refléter tout ce que l'acheteur devra réellement payer ; Equity Value = EV − adjusted net debt.</li></ul>`,
    pieges: [`Prendre la net debt à une date de clôture favorable (cash au plus haut) sans normaliser.`, `Compter un même élément en debt-like et dans le NWC (double counting).`],
    relances: [[`Qu'est-ce que le window dressing ?`, `Des manœuvres de fin de période (fournisseurs payés en retard, clients relancés) qui gonflent le cash au bilan ; la FDD les neutralise.`]],
  },
  'ts-valo-202': {
    complete: `<ul><li>L'EV est calculée sur 100 % de l'EBITDA consolidé, y compris les filiales détenues partiellement.</li>
      <li>La part des minoritaires dans ces filiales ne revient pas aux actionnaires de la société : on la déduit, idéalement à sa valeur de marché (pas seulement comptable).</li>
      <li>Symétrie : on <strong>ajoute</strong> la valeur des participations non consolidées (associates, mises en équivalence), dont l'EBITDA n'est pas dans l'EBITDA consolidé.</li></ul>`,
    pieges: [`Retenir la valeur comptable des minority interests quand la filiale vaut beaucoup plus.`, `Oublier d'ajouter les associates.`],
    relances: [[`Et si l'EBITDA retenu est déjà proportionnel à la détention ?`, `Alors on ne déduit pas les minority interests : on les compterait deux fois.`]],
  },
  'ts-valo-204': {
    complete: `<ul><li><strong>g</strong> : au plus la croissance nominale de long terme (inflation + croissance réelle, ~2 %) ; si g s'approche du WACC, la TV explose.</li>
      <li><strong>FCF terminal normatif</strong> : marges stables (pas une année de pic), capex ≈ D&A (un peu plus si croissance), NWC qui suit le revenue, impôt normatif.</li>
      <li><strong>Cohérence croissance / réinvestissement</strong> : croître de g demande de réinvestir g / ROIC du NOPAT.</li>
      <li><strong>Contrôles</strong> : multiple implicite (TV / EBITDA de l'année n) comparé au marché ; part de la TV dans l'EV (souvent 60-80 %).</li></ul>`,
    pieges: [`Mettre le FCF de l'année n au lieu de n+1 au numérateur.`, `Oublier d'actualiser la TV sur n années.`],
    relances: [[`Quel est le multiple implicite de ta TV ?`, `TV / EBITDA de l'année n : s'il dépasse nettement les multiples de marché, g ou le WACC sont trop optimistes.`]],
  },
  'ts-fit-104': {
    complete: `<ul><li><strong>Qualités</strong> : deux, utiles en TS (rigueur, résistance à la pression, esprit de synthèse, curiosité), chacune avec une preuve : « rigueur : en stage, j'ai repéré une écriture en double qui changeait l'EBITDA de 3 % ».</li>
      <li><strong>Défaut</strong> : réel, non rédhibitoire, avec ce que tu fais pour progresser et un signe de progrès.</li>
      <li>Une minute maximum, ton naturel.</li></ul>`,
    relances: [[`Comment ton dernier manager te décrirait-il ?`, `De façon cohérente avec tes qualités, avec un exemple : c'est souvent vérifié lors des prises de références.`]],
  },
  'ts-fit-203': {
    complete: `<ul><li><strong>Alerter tout de suite</strong> le manager : quel chiffre, pourquoi, quel impact.</li>
      <li><strong>Mesurer l'impact</strong> : sur l'EBITDA, la net debt, le NWC, le prix, et sur les conclusions du rapport.</li>
      <li><strong>Proposer la correction</strong>, vérifiée par une autre personne.</li>
      <li><strong>Communication au client</strong> : décidée par le manager ou l'associé (erratum, appel), rapidement et en transparence.</li>
      <li><strong>Ensuite</strong> : comprendre la cause et renforcer les contrôles (revue à quatre yeux, contrôles de cohérence).</li></ul>`,
    relances: [[`Et si l'impact est minime ?`, `Je le signale quand même : c'est au manager de juger s'il faut informer le client ; la confiance repose sur la transparence.`]],
  },
  'ts-fit-205': {
    complete: `<ul><li><strong>Big 4</strong> (Deloitte, EY, KPMG, PwC) : grands deals et cross-border, formation structurée, marque, mobilité interne.</li>
      <li><strong>Réseaux et cabinets indépendants</strong> (par exemple Forvis Mazars, Grant Thornton, ou des spécialistes du TS comme Eight Advisory ou Accuracy) : équipes plus petites, responsabilités plus tôt, contact direct avec les associés et les fonds, deals mid-cap variés.</li>
      <li><strong>Ta réponse</strong> : relie le choix à ce que tu cherches (apprendre vite, exposition aux fonds mid-cap…) et à ce cabinet précisément.</li></ul>`,
    relances: [[`Pourquoi pas l'autre type de cabinet ?`, `Sans dénigrer : « Les deux forment très bien ; je cherche surtout X, que je trouve davantage ici. »`]],
  },
};

// Tous les compléments (TS ci-dessus, PE dans complements-pe.js, pièges et relances dans complements-relances.js)
// Fusion champ par champ : une même question peut avoir sa réponse complète dans un fichier et ses relances dans un autre
const TOUS = {};
for (const source of [COMPLEMENTS, COMPLEMENTS_PE, COMPLEMENTS_RELANCES]) {
  for (const [id, c] of Object.entries(source)) TOUS[id] = { ...TOUS[id], ...c };
}

// Fusionne les compléments dans une banque de questions (sans écraser un champ déjà rempli)
export function avecComplements(questions) {
  return questions.map((q) => {
    const c = TOUS[q.id];
    if (!c) return q;
    return {
      ...q,
      complete: q.complete || c.complete || '',
      exemple: q.exemple || c.exemple || '',
      pieges: q.pieges?.length ? q.pieges : (c.pieges || []),
      relances: q.relances?.length ? q.relances : (c.relances || []),
    };
  });
}
