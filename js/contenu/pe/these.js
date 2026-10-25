// PE — Investment thesis et due diligence
import { q, theme } from '../fabriques.js';

export default theme('pe', 'these', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Comment structures-tu une investment thesis ?`, {
    courte: `<p><strong>Conclusion d'abord</strong> (« j'investirais, parce que… »), puis : <strong>marché</strong> (taille, croissance, cyclicité), <strong>positionnement</strong> et moat, <strong>modèle économique</strong> (récurrence, marges, cash conversion), <strong>management</strong>, <strong>leviers de value creation</strong>, <strong>risques et parades</strong>, <strong>rendement</strong> (base / downside) et <strong>exit</strong>.</p>`,
    complete: `<ul><li>3 arguments forts valent mieux que 10 faibles.</li><li>Chaque risque doit avoir sa parade (DD, structuration, prix, management package).</li></ul>`,
    conseil: `Un comité veut un avis tranché, pas un inventaire.`,
    points: [[`Conclusion d'abord`, ['conclusion', 'j investirais', 'avis']], [`Marché / positionnement`, ['marche', 'position', 'moat', 'concurren']], [`Modèle économique`, ['recurren', 'marge', 'cash', 'modele']], [`Leviers de value creation`, ['levier', 'creation de valeur', 'value creation', 'build']], [`Risques / rendement / exit`, ['risque', 'irr', 'moic', 'exit', 'sortie']]],
  }),
  q('102', 1, `Qu'est-ce qu'un moat ? Donne des exemples.`, {
    courte: `<p>Un <strong>avantage concurrentiel durable</strong> qui protège les marges : <strong>coûts de changement</strong> élevés (logiciel métier), <strong>effets de réseau</strong>, <strong>marque</strong>, <strong>réglementation / accréditations</strong> (laboratoires, certification), <strong>échelle et densité</strong> (maillage d'agences), <strong>technologie / brevets</strong>, <strong>contrats longs</strong>.</p>`,
    points: [[`Avantage durable qui protège les marges`, ['durable', 'protege', 'avantage']], [`Coûts de changement / réseau`, ['changement', 'reseau']], [`Réglementation / accréditations`, ['reglement', 'accredit', 'licence']], [`Échelle / marque / technologie`, ['echelle', 'densit', 'marque', 'technolog', 'brevet']]],
  }),
  q('103', 1, `Quelles sont les 5 forces de Porter ?`, {
    courte: `<p>La <strong>rivalité</strong> entre concurrents, la menace des <strong>nouveaux entrants</strong>, la menace des <strong>substituts</strong>, le <strong>pouvoir de négociation des clients</strong> et celui des <strong>fournisseurs</strong>. C'est un cadre rapide pour juger l'attractivité d'un marché pendant un cas.</p>`,
    points: [[`Rivalité`, ['rivalit', 'concurren']], [`Nouveaux entrants`, ['entrant']], [`Substituts`, ['substitut']], [`Pouvoir clients et fournisseurs`, ['client', 'fournisseur', 'pouvoir']]],
  }),
  q('104', 1, `À quoi sert une commercial due diligence (CDD) ?`, {
    courte: `<p>À <strong>valider le marché</strong> (taille, croissance, drivers), le <strong>positionnement</strong> de la cible (parts de marché, satisfaction clients, concurrence) et les <strong>hypothèses de croissance du business plan</strong>. Elle est souvent confiée à des cabinets de conseil en stratégie (interviews de clients, concurrents, experts, enquêtes).</p>`,
    points: [[`Valider le marché`, ['marche', 'taille', 'croissance']], [`Positionnement / concurrence`, ['position', 'concurren', 'part de marche']], [`Hypothèses du business plan`, ['business plan', 'hypothese', 'bp']], [`Interviews clients / experts`, ['interview', 'client', 'expert', 'conseil']]],
  }),
  q('105', 1, `Qu'est-ce qu'un 100-day plan ?`, {
    courte: `<p>Le plan d'actions des <strong>100 premiers jours après le closing</strong> : gouvernance (board, reporting mensuel, KPI), <strong>quick wins</strong> (achats, pricing), <strong>recrutements clés</strong> (DAF), lancement des chantiers de la thèse (add-ons, international), sécurisation de la relation avec le management et les prêteurs.</p>`,
    points: [[`100 premiers jours post-closing`, ['100', 'premiers jours', 'closing']], [`Gouvernance / reporting`, ['gouvernance', 'reporting', 'board', 'kpi']], [`Quick wins`, ['quick', 'rapide']], [`Recrutements / chantiers de la thèse`, ['recrut', 'chantier', 'these']]],
  }),
  q('106', 1, `Base case, downside case, upside case : à quoi servent-ils ?`, {
    courte: `<p>Le <strong>base case</strong> est le scénario central (souvent le business plan du management ajusté par le fonds). Le <strong>downside case</strong> teste la structure : les covenants tiennent-ils ? perd-on du capital ? L'<strong>upside case</strong> montre le potentiel. Le comité regarde surtout que le downside <strong>préserve le capital</strong>.</p>`,
    points: [[`Base = scénario central`, ['central', 'base']], [`Downside : covenants / capital`, ['downside', 'covenant', 'capital', 'perte']], [`Upside : potentiel`, ['upside', 'potentiel']]],
  }),
  q('107', 1, `Qu'est-ce que le key man risk et comment le traites-tu ?`, {
    courte: `<p>La <strong>dépendance</strong> de la société à une personne (souvent le fondateur-dirigeant) : relations clients, savoir-faire, décisions. Parades : <strong>management package</strong> et rollover pour le retenir, <strong>recrutements</strong> pour structurer l'équipe (DAF, directeur des opérations), plan de <strong>succession</strong>, <strong>earn-out</strong>, clauses de non-concurrence, assurance homme-clé.</p>`,
    points: [[`Dépendance à une personne`, ['dependance', 'personne', 'fondateur', 'dirigeant']], [`Management package / rollover`, ['management package', 'mip', 'rollover', 'reinvest']], [`Recrutements / succession`, ['recrut', 'succession', 'equipe']], [`Earn-out / non-concurrence`, ['earn', 'non-concurrence', 'non concurrence']]],
  }),
  q('108', 1, `Quels red flags cherches-tu dans une cible de LBO ?`, {
    courte: `<p><strong>Customer concentration</strong> (un client > 20 % avec un contrat court), <strong>key man risk</strong>, <strong>cyclicité</strong> forte, <strong>capex</strong> lourds ou en retard, <strong>NWC</strong> qui dérive, dépendance <strong>réglementaire</strong> ou à un fournisseur, marge en baisse inexpliquée, EBITDA de mauvaise qualité (beaucoup d'adjustments), litiges, risques ESG.</p>`,
    points: [[`Concentration clients`, ['concentration', 'client']], [`Key man`, ['key man', 'dirigeant', 'fondateur']], [`Cyclicité / capex / NWC`, ['cycl', 'capex', 'nwc', 'bfr']], [`Qualité de l'EBITDA / réglementation`, ['ebitda', 'adjust', 'reglement', 'litige']]],
  }),
  q('109', 1, `Qu'est-ce qu'une management presentation et que cherches-tu à y apprendre ?`, {
    courte: `<p>La réunion où l'équipe dirigeante présente la société et son business plan aux acheteurs (au second tour d'un process). J'y cherche la <strong>qualité du management</strong> (vision, maîtrise des chiffres, cohésion), la <strong>crédibilité du business plan</strong> et les <strong>risques</strong> que les documents ne disent pas.</p>`,
    points: [[`Présentation de l'équipe et du BP`, ['equipe', 'dirigeant', 'business plan', 'presentation']], [`Qualité du management`, ['qualite', 'management', 'vision', 'chiffre']], [`Crédibilité du BP / risques`, ['credib', 'risque', 'hypothese']]],
  }),
  q('110', 1, `Pourquoi la cash conversion est-elle centrale dans une thèse de LBO ?`, {
    courte: `<p>Parce que c'est le <strong>cash</strong>, pas l'EBITDA, qui rembourse la dette : une forte cash conversion (peu de capex, NWC maîtrisé) permet plus de <strong>levier</strong>, un <strong>deleveraging</strong> plus rapide et donc un meilleur IRR. Deux sociétés au même EBITDA peuvent supporter des dettes très différentes.</p>`,
    points: [[`Le cash rembourse la dette`, ['cash', 'rembours', 'dette']], [`Capex / NWC`, ['capex', 'nwc', 'bfr']], [`Plus de levier / deleveraging`, ['levier', 'leverage', 'deleverag', 'desendett']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Quelles questions poses-tu au dirigeant lors d'une management presentation ?`, {
    courte: `<p>Sur la <strong>croissance</strong> (d'où vient-elle, quelle visibilité : backlog, récurrence), la <strong>concurrence</strong> et le pricing power, les <strong>clients</strong> (concentration, churn), l'<strong>organisation</strong> (personnes clés, recrutements), les <strong>hypothèses du business plan</strong> et l'historique de réalisation des budgets, le <strong>M&A</strong> (pipeline, capacité d'intégration), les <strong>risques</strong> et la <strong>motivation</strong> du dirigeant (horizon, réinvestissement).</p>`,
    points: [[`Croissance et visibilité`, ['croissance', 'visibilit', 'backlog', 'recurren']], [`Concurrence / pricing power`, ['concurren', 'prix', 'pricing']], [`Clients`, ['client', 'concentration', 'churn']], [`Équipe / BP / historique`, ['equipe', 'business plan', 'budget', 'historique']], [`M&A / motivation`, ['acquisition', 'motivation', 'reinvest', 'horizon']]],
  }),
  q('202', 2, `Investirais-tu dans une société de location de matériel pour le BTP ? Quels points regardes-tu ?`, {
    duree: 150,
    courte: `<p>Je regarde la <strong>cyclicité</strong> du BTP (logement neuf vs rénovation, travaux publics), l'intensité en <strong>capex</strong> (flotte, valeur de revente), le <strong>taux d'utilisation</strong> et les prix, la <strong>densité du réseau</strong> d'agences (build-up dans un marché fragmenté) et la <strong>structure financière</strong>. Conclusion : oui si le prix reflète la cyclicité, avec un levier prudent et une stratégie de densification.</p>`,
    complete: `<ul><li>KPI : taux d'utilisation, prix de location, âge moyen du parc, coût de maintenance, EBITDA − capex.</li><li>Risques : bas de cycle, financement de la flotte (crédit-bail), obsolescence (électrification des machines).</li><li>Leviers : add-ons régionaux, mix vers la rénovation et les infrastructures, pricing, digitalisation de la location.</li></ul>`,
    points: [[`Cyclicité du BTP`, ['cycl', 'btp', 'construction']], [`Capex / flotte / valeur de revente`, ['capex', 'flotte', 'parc', 'revente']], [`Taux d'utilisation / prix`, ['utilisation', 'prix']], [`Réseau / build-up`, ['reseau', 'agence', 'build', 'fragment']], [`Avis tranché + levier prudent`, ['oui', 'non', 'levier', 'conclusion']]],
  }),
  q('203', 2, `Une société a 60 % de revenus récurrents sous contrats pluriannuels. Qu'est-ce que ça change pour un fonds ?`, {
    courte: `<p>Plus de <strong>visibilité</strong> sur le revenue et le cash → le fonds peut accepter un <strong>multiple plus élevé</strong>, les prêteurs un <strong>levier plus élevé</strong>, et le downside case est moins sévère. C'est le premier moteur de multiple en PE.</p>`,
    complete: `<ul><li>À vérifier : durée et renouvellement des contrats, clauses de résiliation et de changement de contrôle, indexation des prix, churn historique.</li></ul>`,
    points: [[`Visibilité`, ['visibil', 'previsib']], [`Multiple plus élevé`, ['multiple']], [`Levier plus élevé`, ['levier', 'leverage', 'dette']], [`Vérifier les contrats`, ['contrat', 'resiliation', 'renouvel', 'indexation']]],
  }),
  q('204', 2, `Quels thèmes te paraissent porteurs pour le PE en Europe en 2026, et lesquels risqués ?`, {
    courte: `<p>Exemples à défendre avec tes propres arguments : <strong>logiciels B2B verticaux</strong> et IA appliquée, <strong>santé</strong> (vieillissement), <strong>transition énergétique</strong> et efficacité énergétique, <strong>services B2B récurrents</strong> (testing, inspection, certification), <strong>cybersécurité</strong>, <strong>défense / souveraineté</strong>, consolidation de marchés fragmentés. Risques : <strong>taux</strong>, <strong>droits de douane</strong>, consommation, secteurs très cycliques ou dépendants des aides publiques.</p>`,
    complete: `<p>Structure : 1 thème → pourquoi maintenant (moteurs) → 1 exemple de deal récent (ta Veille de deal) → 1 risque.</p>`,
    points: [[`Au moins 2 thèmes argumentés`, ['logiciel', 'sante', 'energ', 'cyber', 'defense', 'service']], [`Pourquoi maintenant`, ['pourquoi', 'moteur', 'tendance']], [`Exemple de deal`, ['deal', 'exemple']], [`Risques`, ['risque', 'taux', 'douane', 'cycl']]],
  }),
  q('205', 2, `Qu'apporte une ESG due diligence dans un LBO ?`, {
    courte: `<p>Elle identifie les <strong>risques</strong> environnementaux, sociaux et de gouvernance (pollution, conformité, sécurité, chaîne d'approvisionnement), vérifie la <strong>conformité</strong> (CSRD selon la taille, taxonomie), et bâtit un <strong>plan d'amélioration</strong> avec des KPI — parfois lié à la marge de la dette via un <strong>sustainability-linked loan</strong>. Les LP l'exigent dans leur reporting.</p>`,
    points: [[`Risques E, S, G`, ['environnement', 'social', 'gouvernance', 'risque']], [`Conformité (CSRD)`, ['csrd', 'conformit', 'taxonomie']], [`Plan d'amélioration / KPI`, ['plan', 'kpi', 'amelior']], [`Sustainability-linked loan / LP`, ['sustainability', 'marge', 'lp']]],
  }),
  q('206', 2, `Pour un réseau de franchise, quels KPI regardes-tu ?`, {
    courte: `<p>Le <strong>revenue like-for-like</strong> du réseau (magasins existants), le rythme d'<strong>ouvertures</strong> et de <strong>fermetures</strong>, la <strong>rentabilité des franchisés</strong> (sinon les fermetures suivront), le niveau des <strong>redevances</strong>, la durée des contrats et le <strong>churn</strong> des franchisés.</p>`,
    points: [[`Like-for-like`, ['like-for-like', 'perimetre constant', 'lfl']], [`Ouvertures / fermetures`, ['ouverture', 'fermeture']], [`Rentabilité des franchisés`, ['rentabilit', 'franchise']], [`Redevances / contrats`, ['redevance', 'contrat', 'churn']]],
  }),
  q('207', 2, `Comment évalues-tu une équipe de management ?`, {
    courte: `<p>Sur son <strong>historique</strong> (budgets tenus, crises traversées), sa <strong>maîtrise des chiffres</strong> et du marché, sa <strong>complétude</strong> (DAF, commercial, opérations), sa <strong>capacité à exécuter le plan</strong> (acquisitions, international), son <strong>alignement</strong> (réinvestissement personnel) — via les rencontres, des références et parfois un cabinet d'évaluation.</p>`,
    points: [[`Historique / budgets tenus`, ['historique', 'budget']], [`Maîtrise des chiffres`, ['chiffre', 'maitrise']], [`Équipe complète`, ['daf', 'complet', 'equipe']], [`Alignement / références`, ['align', 'reinvest', 'reference']]],
  }),
  q('208', 2, `Comment estimes-tu la taille d'un marché (market sizing) ?`, {
    courte: `<p>En <strong>top-down</strong> (marché global × part pertinente) et en <strong>bottom-up</strong> (nombre de clients cibles × panier moyen × fréquence), puis je recoupe. Je distingue le <strong>TAM</strong> (marché adressable total), le <strong>SAM</strong> (réellement servable) et le <strong>SOM</strong> (part atteignable).</p>`,
    exemple: `<p>Logiciel pour cabinets dentaires en France : ~25 000 cabinets × 150 €/mois × 12 ≈ <strong>45 M€</strong> de marché annuel.</p>`,
    points: [[`Top-down`, ['top-down', 'top down']], [`Bottom-up`, ['bottom-up', 'bottom up', 'nombre de clients']], [`TAM / SAM / SOM`, ['tam', 'sam', 'som']], [`Recoupement`, ['recoup', 'croise']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Pitch-moi un IC memo en 3 minutes : quelle structure ?`, {
    duree: 180,
    courte: `<p>1) <strong>Recommandation</strong> et chiffres clés (prix, multiple, equity, IRR / MOIC). 2) La <strong>société</strong> en 3 phrases. 3) La <strong>thèse</strong> en 3 points. 4) Le <strong>plan de value creation</strong> (pont EBITDA, add-ons). 5) La <strong>structure</strong> (dette, management package). 6) Les <strong>rendements</strong> (base / downside, sensitivities). 7) Les <strong>risques clés et parades</strong>. 8) Les <strong>conclusions des DD</strong> et les points ouverts.</p>`,
    points: [[`Recommandation + chiffres clés`, ['recommand', 'irr', 'moic', 'prix']], [`Thèse en 3 points`, ['these', 'trois', '3']], [`Value creation / structure`, ['creation', 'value', 'dette', 'structure']], [`Rendements base / downside`, ['base', 'downside', 'sensib']], [`Risques / DD`, ['risque', 'dd', 'due diligence']]],
  }),
  q('302', 3, `Comment challenges-tu le business plan du management ?`, {
    courte: `<p>Je le compare à l'<strong>historique</strong> (le management a-t-il tenu ses budgets ?), je le décompose en <strong>drivers</strong> (prix, volumes, nouveaux clients, ouvertures) et je teste chacun face au <strong>marché</strong> (CDD), je vérifie la cohérence des <strong>coûts, du capex et du NWC</strong> avec la croissance, puis je construis un <strong>sponsor case</strong> plus prudent et un downside.</p>`,
    complete: `<ul><li>Signaux d'alerte : « hockey stick » après des années plates, marges qui montent sans explication, capex qui baisse alors que la croissance accélère.</li><li>Le prix se fixe sur le sponsor case, pas sur le management case.</li></ul>`,
    points: [[`Comparer à l'historique`, ['historique', 'budget']], [`Décomposer en drivers`, ['driver', 'prix', 'volume', 'decompos']], [`Tester face au marché (CDD)`, ['marche', 'cdd', 'commercial']], [`Cohérence coûts / capex / NWC`, ['capex', 'nwc', 'cout', 'coheren']], [`Sponsor case / downside`, ['sponsor', 'downside', 'prudent']]],
  }),
  q('303', 3, `Quelles questions poses-tu à un client de la cible lors d'une customer call (CDD) ?`, {
    courte: `<p>Pourquoi il a choisi la cible et quelles <strong>alternatives</strong> il a considérées ; sa <strong>satisfaction</strong> (qualité, prix, service) ; la <strong>part de ses achats</strong> chez la cible et son évolution prévue ; sa <strong>sensibilité au prix</strong> (accepterait-il une hausse ?) ; le <strong>coût de changer</strong> de fournisseur ; les <strong>besoins futurs</strong> que la cible pourrait servir.</p>`,
    points: [[`Raisons du choix / alternatives`, ['choix', 'alternative', 'pourquoi']], [`Satisfaction`, ['satisfaction', 'qualite', 'service']], [`Part des achats / évolution`, ['part', 'evolution', 'volume']], [`Sensibilité au prix / coût de changement`, ['prix', 'changer', 'changement']], [`Besoins futurs`, ['besoin', 'futur']]],
  }),
  q('304', 3, `Société cyclique ou non cyclique : qu'est-ce que ça change dans la structuration d'un LBO ?`, {
    courte: `<p>Pour une cible <strong>cyclique</strong> : levier plus <strong>bas</strong>, covenants avec plus de <strong>headroom</strong>, dette plus amortissable ou plus de RCF, valorisation sur un EBITDA <strong>mid-cycle</strong>, downside case sévère, timing d'entrée et d'exit cruciaux. Pour une cible <strong>non cyclique</strong> et récurrente : plus de levier, multiples plus élevés, cov-lite ou covenants plus larges possibles.</p>`,
    points: [[`Levier plus bas si cyclique`, ['levier', 'bas', 'moins de dette']], [`Headroom / covenants`, ['headroom', 'covenant']], [`EBITDA mid-cycle`, ['mid-cycle', 'cycle', 'normatif']], [`Downside / timing`, ['downside', 'timing', 'entree', 'exit']]],
  }),
  q('305', 3, `Un dossier affiche 25 % d'IRR dans le base case mais un fort key man risk. Recommandes-tu d'investir ?`, {
    courte: `<p>Pas sur le seul IRR : je regarde le <strong>downside</strong> si le dirigeant part (IRR, covenants) et je cherche des <strong>parades</strong> : rollover significatif et management package avec vesting, recrutement d'un n°2 / DAF dès le closing, plan de succession, earn-out, non-concurrence. Si les parades sont crédibles : <strong>go sous conditions</strong> ; sinon le rendement ne compense pas le risque.</p>`,
    points: [[`Pas sur le seul IRR`, ['pas', 'seul', 'irr']], [`Downside si départ`, ['downside', 'depart', 'scenario']], [`Parades (rollover, MIP, recrutement, earn-out)`, ['rollover', 'mip', 'management package', 'recrut', 'earn']], [`Go sous conditions / no-go`, ['go', 'condition', 'no-go']]],
  }),
]);
