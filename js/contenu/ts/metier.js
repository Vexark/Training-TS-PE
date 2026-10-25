// TS — Le métier et la Financial Due Diligence
import { q, theme } from '../fabriques.js';

export default theme('ts', 'metier', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Qu'est-ce que le Transaction Services ?`, {
    courte: `<p>Le Transaction Services, c'est le conseil financier sur les deals : on aide un acheteur (souvent un fonds de private equity), un vendeur ou des banques à comprendre <strong>ce que vaut vraiment la société</strong> qui change de mains. Le cœur du métier est la <strong>Financial Due Diligence</strong>.</p>`,
    complete: `<ul>
      <li><strong>Buy-side due diligence</strong> pour un acheteur : sécuriser l'adjusted EBITDA, la net debt et le NWC, repérer les red flags.</li>
      <li><strong>Vendor Due Diligence (VDD)</strong> pour un vendeur : préparer la vente et la rendre plus rapide.</li>
      <li><strong>Support à la négociation</strong> : définitions de net debt et de NWC dans le SPA, mécanisme de prix (locked box ou completion accounts), completion accounts après le closing.</li>
      <li>Parfois : revue du business plan, accompagnement des banques (lenders), carve-outs.</li>
    </ul>
    <p>Les clients : fonds de private equity (beaucoup en mid-cap), corporates, banques. Les équipes sont dans les Big 4 et dans des cabinets indépendants.</p>`,
    pieges: [`Dire que le TS « audite » la cible : on ne certifie rien, on analyse ce qui change le prix.`, `Oublier le lien avec le prix : c'est LA raison d'être du métier.`],
    relances: [[`Qui sont vos clients ?`, `Surtout des fonds de PE (buy-side), des vendeurs (VDD), des corporates qui font des acquisitions et des banques qui financent les LBO.`], [`Quelle différence avec le M&A ?`, `Le M&A (banque d'affaires) organise la transaction et négocie le prix ; le TS fournit l'analyse financière détaillée sur laquelle s'appuient prix, financement et SPA.`]],
    points: [[`Conseil financier sur les deals`, ['deal', 'transaction', 'acquisition', 'cession']], [`Financial Due Diligence au cœur`, ['due diligence', 'fdd', 'dd']], [`Lien avec le prix / SPA`, ['prix', 'spa', 'valeur']], [`Clients : fonds, corporates, banques`, ['fonds', 'private equity', 'corporate', 'banque']]],
  }),
  q('102', 1, `Qu'est-ce qu'une Financial Due Diligence et à quoi sert-elle ?`, {
    courte: `<p>C'est l'analyse financière d'une cible avant un deal. Elle répond à trois questions qui font le prix : <strong>quel est l'EBITDA récurrent</strong> (Quality of Earnings), <strong>quel est le niveau normal de working capital</strong> (normalised NWC), <strong>quelle est la vraie net debt</strong> (debt-like items compris).</p>`,
    complete: `<ul>
      <li><strong>Quality of Earnings</strong> : partir de l'EBITDA reported et identifier les adjustments (one-offs, normalisation, pro forma) → adjusted EBITDA, base du prix (EV = multiple × adjusted EBITDA).</li>
      <li><strong>Net Working Capital</strong> : analyse mensuelle, saisonnalité, normalised NWC qui servira de NWC peg dans le SPA.</li>
      <li><strong>Net debt</strong> : dette financière − cash libre, + debt-like items (provisions, pension liabilities, impôt dû, earn-outs…) : chaque euro réduit l'Equity Value d'un euro.</li>
      <li><strong>Cash flows</strong> et cash conversion ; revue du business plan si demandée.</li>
    </ul>
    <p>Elle sert à <strong>sécuriser le prix</strong>, à <strong>négocier le SPA</strong> (définitions, garanties, specific indemnities) et à <strong>convaincre les banques</strong> qui financent le deal.</p>`,
    exemple: `<p>Le vendeur présente 10 M€ d'EBITDA. La FDD trouve 0,6 M€ de one-offs favorables (une plus-value de cession dans l'EBITDA) et 2 M€ de debt-like items. À 9x : prix des titres réduit de 0,6 × 9 + 2 = <strong>7,4 M€</strong>.</p>`,
    pieges: [`Confondre avec un audit (opinion sur les comptes).`, `Ne citer que l'EBITDA : NWC et net debt changent aussi le prix.`],
    relances: [[`Pourquoi travailler sur du LTM ?`, `Parce que c'est la base la plus récente : le prix se fixe sur les 12 derniers mois, pas sur un exercice clos depuis 9 mois.`]],
    points: [[`Quality of Earnings / adjusted EBITDA`, ['quality of earnings', 'qoe', 'adjusted ebitda', 'ebitda ajuste', 'normatif', 'recurrent']], [`Normalised NWC / peg`, ['nwc', 'working capital', 'bfr', 'peg']], [`Net debt et debt-like items`, ['net debt', 'dette nette', 'debt-like', 'debt like']], [`Sert au prix, au SPA et au financement`, ['prix', 'spa', 'banque', 'financement', 'negoci']]],
  }),
  q('103', 1, `Quelle est la différence entre un audit et une Financial Due Diligence ?`, {
    courte: `<p>L'audit donne une <strong>opinion sur la régularité des comptes annuels</strong> (obligation légale, tournée vers le passé). La FDD est <strong>contractuelle et orientée décision</strong> : elle cherche ce qui crée ou détruit de la valeur pour un deal, sans rien certifier.</p>`,
    complete: `<table class="tableau"><thead><tr><th></th><th>Audit</th><th>Financial Due Diligence</th></tr></thead><tbody>
      <tr><td>Objectif</td><td>Certifier que les comptes sont réguliers et sincères</td><td>Éclairer un prix et une décision d'investissement</td></tr>
      <tr><td>Client</td><td>La société (obligation légale)</td><td>L'acheteur, le vendeur ou les banques</td></tr>
      <tr><td>Données</td><td>Comptes annuels, seuil de materiality global</td><td>Données mensuelles, LTM, reporting de gestion</td></tr>
      <tr><td>Livrable</td><td>Opinion (certification)</td><td>Rapport + databook : adjusted EBITDA, NWC, net debt, red flags</td></tr>
      <tr><td>Regard</td><td>Conformité au référentiel (PCG, IFRS)</td><td>Récurrence, normalisation, impact prix</td></tr></tbody></table>`,
    pieges: [`Dénigrer l'audit : la FDD s'appuie souvent sur des comptes audités.`, `Dire que la FDD « vérifie les comptes » : elle ne fait pas de tests d'audit exhaustifs.`],
    relances: [[`Un rapport de FDD peut-il dire que les comptes sont faux ?`, `Il peut identifier des erreurs (cut-off, provisions manquantes) et en chiffrer l'impact, mais il ne donne pas d'opinion d'audit ; ses limites sont écrites dans le rapport.`]],
    points: [[`Audit = opinion sur la régularité des comptes`, ['opinion', 'certif', 'regularit', 'sincer']], [`FDD = orientée valeur / prix / décision`, ['valeur', 'prix', 'decision', 'deal']], [`Données mensuelles / LTM vs comptes annuels`, ['mensuel', 'ltm']], [`La FDD ne certifie rien`, ['certifi', 'pas un audit', 'ne certifie']]],
  }),
  q('104', 1, `Quelle est la différence entre une buy-side due diligence et une Vendor Due Diligence ?`, {
    courte: `<p>La <strong>buy-side DD</strong> est commandée par l'acheteur pour identifier les risques et négocier. La <strong>VDD</strong> est commandée par le vendeur avant la vente et remise à tous les acheteurs du process pour accélérer les enchères et maîtriser le message.</p>`,
    complete: `<ul>
      <li><strong>Buy-side</strong> : le client est l'acheteur ; on cherche les red flags, on challenge les adjustments du vendeur, on prépare les demandes de SPA (debt-like items, specific indemnities, mécanisme de prix).</li>
      <li><strong>VDD</strong> : le client est le vendeur ; le rapport est diffusé à tous les acheteurs (via une hold harmless letter), l'acheteur final et ses banques obtiennent une reliance letter. Avantages : un seul travail au lieu de 5, process plus rapide, moins de mauvaises surprises en fin de course, messages maîtrisés.</li>
      <li>En pratique, l'acheteur fait souvent une <strong>DD de confirmation (top-up)</strong> plus légère par-dessus la VDD.</li>
    </ul>`,
    pieges: [`Croire que la VDD est « complaisante » : un cabinet crédible présente des adjustments défendables, sinon chaque acheteur les démonte.`],
    relances: [[`Pourquoi un vendeur paierait-il une VDD ?`, `Pour mettre plusieurs acheteurs en concurrence sur la même base d'information, gagner du temps et éviter qu'un acheteur ne découvre tardivement un problème et baisse son prix.`], [`Qu'est-ce qu'une reliance letter ?`, `L'engagement du cabinet de VDD envers l'acheteur final et ses banques : ils peuvent s'appuyer sur le rapport, avec une responsabilité plafonnée.`]],
    points: [[`Client : acheteur vs vendeur`, ['acheteur', 'vendeur', 'buy', 'sell']], [`VDD remise à tous les acheteurs / accélère le process`, ['enchere', 'process', 'tous les acheteurs', 'rapide', 'auction']], [`Buy-side : risques et négociation`, ['risque', 'red flag', 'negoci']], [`Reliance / hold harmless letters`, ['reliance', 'hold harmless']], [`Top-up / confirmatory DD`, ['top-up', 'top up', 'confirm']]],
    conseil: `Question citée dans des retours d'entretiens KPMG. Donne un exemple concret : « en auction process, la banque du vendeur fait faire une VDD pour que 5 fonds fassent une offre sur la même base ».`,
  }),
  q('105', 1, `Quels sont les grands chantiers d'une Financial Due Diligence ?`, {
    courte: `<p>Trois chantiers qui font le prix — <strong>Quality of Earnings, Net Working Capital, net debt</strong> — plus l'analyse des <strong>cash flows</strong> et, souvent, la revue du <strong>business plan</strong>.</p>`,
    complete: `<ol>
      <li><strong>Quality of Earnings</strong> : EBITDA reported → adjusted EBITDA (one-offs, normalisation, pro forma, erreurs de cut-off) ; analyse du revenue (price-volume-mix, récurrence, customer concentration) et des marges.</li>
      <li><strong>Net Working Capital</strong> : NWC mensuel, DSO / DIO / DPO, saisonnalité, éléments non opérationnels → normalised NWC (le futur peg).</li>
      <li><strong>Net debt</strong> : dette financière, cash libre, debt-like et cash-like items → adjusted net debt.</li>
      <li><strong>Cash flows</strong> : cash conversion, capex (maintenance vs growth), impôt.</li>
      <li><strong>Business plan</strong> : cohérence avec l'historique, hypothèses clés, sensibilités.</li>
    </ol>
    <p>Ces chantiers sont liés : un même élément ne doit jamais être compté deux fois (dans l'EBITDA et dans la net debt, ou dans la net debt et le NWC).</p>`,
    pieges: [`Lister les chantiers sans dire pourquoi ils comptent : chacun a un impact prix différent (EBITDA × multiple ; net debt et NWC euro pour euro).`],
    relances: [[`Lequel a le plus d'impact sur le prix ?`, `En général la Quality of Earnings, car chaque euro d'EBITDA est multiplié par le multiple (8-10x), alors que net debt et NWC jouent euro pour euro.`]],
    points: [[`Quality of Earnings`, ['quality of earnings', 'qoe', 'ebitda']], [`Net Working Capital`, ['nwc', 'working capital', 'bfr']], [`Net debt`, ['net debt', 'dette nette', 'debt-like']], [`Cash flows / business plan`, ['cash', 'business plan', 'bp', 'capex']], [`Pas de double comptage`, ['double', 'coheren']]],
  }),
  q('106', 1, `Qu'est-ce qu'un red flag report ?`, {
    courte: `<p>Un rapport <strong>court et rapide</strong> qui ne remonte que les <strong>points majeurs ou bloquants</strong>, souvent en début de mission, pour que le client décide vite s'il continue (et sur quoi concentrer la suite).</p>`,
    complete: `<ul><li>Utilisé en phase préliminaire ou quand le calendrier est très serré.</li><li>Contenu typique : écart majeur entre EBITDA reported et adjusted, debt-like items importants, problème de cut-off, dépendance à un client, litige, trésorerie tendue.</li><li>Chaque red flag est chiffré si possible et relié à son impact : prix, SPA (specific indemnity, escrow) ou décision (stop / go).</li></ul>`,
    pieges: [`Y mettre tout ce qu'on a vu : un red flag report qui fait 80 pages n'en est plus un.`],
    relances: [[`Donne un exemple de red flag.`, `Le premier client fait 35 % du revenue et son contrat expire dans 6 mois ; ou 1,5 M€ d'impôt dû des exercices passés non payé.`]],
    points: [[`Rapport court et rapide`, ['court', 'rapide', 'synthe']], [`Points bloquants / majeurs`, ['bloquant', 'majeur', 'red flag']], [`Aide à décider (continuer ou non)`, ['decid', 'continuer', 'go']]],
  }),
  q('107', 1, `Que contient un databook ?`, {
    courte: `<p>Le <strong>databook</strong> est le fichier Excel joint au rapport qui contient <strong>toutes les analyses chiffrées</strong> : P&L retraité et EBITDA bridge, NWC mensuel, net debt, cash flows, analyses du revenue.</p>`,
    complete: `<ul><li>Il sert de référence chiffrée au rapport (chaque chiffre du rapport doit s'y retrouver) et de base aux modèles du client (modèle LBO du fonds, modèle des banques).</li><li>Typiquement : P&L mensuel / annuel / LTM, adjustments détaillés, balance sheet, NWC mensuel avec DSO / DIO / DPO, tableau de net debt, cash flow et cash conversion, revenue par client / produit / zone.</li><li>Les juniors en TS passent beaucoup de temps à le construire et à le fiabiliser (contrôles de cohérence, sources).</li></ul>`,
    relances: [[`Quel contrôle fais-tu sur un databook ?`, `Rapprocher les totaux avec les comptes (balance, liasse), vérifier que le P&L mensuel se somme au P&L annuel, que le bilan s'équilibre, et que chaque chiffre du rapport renvoie au databook.`]],
    points: [[`Fichier Excel des analyses chiffrées`, ['excel', 'chiffr', 'analyse']], [`P&L / EBITDA bridge / NWC / net debt`, ['p&l', 'ebitda', 'nwc', 'net debt', 'dette']], [`Base du modèle du client`, ['modele', 'client', 'banque']]],
  }),
  q('108', 1, `Qu'est-ce que le LTM et pourquoi l'utilise-t-on en FDD ?`, {
    courte: `<p><strong>LTM = Last Twelve Months</strong> : les 12 derniers mois glissants disponibles (par exemple octobre N-1 à septembre N). C'est la base la plus récente de la performance, donc celle sur laquelle on fixe le prix.</p>`,
    complete: `<ul><li>Un exercice clos au 31 décembre peut avoir 9 mois de retard quand le deal se signe en septembre : le LTM capte la tendance récente.</li><li>Calcul : exercice N-1 + YTD N − YTD N-1 (même période l'année d'avant).</li><li>On regarde aussi le NTM / budget pour juger la dynamique, mais le prix se fonde le plus souvent sur l'adjusted EBITDA LTM (ou un EBITDA « current trading »).</li></ul>`,
    exemple: `<p>EBITDA 2025 : 10 ; janvier-septembre 2026 : 8,4 ; janvier-septembre 2025 : 7,6. LTM septembre 2026 = 10 + 8,4 − 7,6 = <strong>10,8</strong>.</p>`,
    relances: [[`Et si les derniers mois sont exceptionnellement bons ?`, `On vérifie la saisonnalité et le cut-off, on regarde le current trading et le budget : un LTM gonflé par un pic ponctuel doit être retraité ou discuté.`]],
    points: [[`Last Twelve Months / 12 derniers mois`, ['12 derniers mois', 'last twelve', 'glissant']], [`Base la plus récente pour le prix`, ['recent', 'prix', 'actuel']], [`Calcul N-1 + YTD N − YTD N-1`, ['ytd', 'n-1']]],
  }),
  q('109', 1, `Décris les grandes étapes d'un auction process (processus de cession organisé).`, {
    courte: `<p>Teaser et NDA → Information Memorandum → <strong>Non-Binding Offers</strong> → second tour (data room, VDD, management presentation, Q&A) → <strong>binding offers</strong> avec commentaires sur le SPA → exclusivité → <strong>signing</strong> → conditions precedent → <strong>closing</strong>.</p>`,
    complete: `<ol><li><strong>Préparation</strong> : la banque du vendeur prépare l'equity story, souvent une VDD.</li>
      <li><strong>Tour 1</strong> : teaser anonyme, NDA, Information Memorandum, offres indicatives (Non-Binding Offers, fourchette de prix).</li>
      <li><strong>Tour 2</strong> (3-5 acheteurs) : data room, VDD, management presentation, visites, Q&A ; l'acheteur fait sa buy-side DD (ou top-up) ; binding offers + mark-up du SPA + financement engagé.</li>
      <li><strong>Négociation</strong> avec un acheteur en exclusivité, finalisation du SPA.</li>
      <li><strong>Signing</strong>, puis levée des conditions precedent (autorité de concurrence, contrôle des investissements étrangers…), puis <strong>closing</strong> (paiement, transfert des titres).</li></ol>
    <p>Le TS intervient surtout au tour 2 (DD) et entre signing et closing (completion accounts le cas échéant).</p>`,
    pieges: [`Oublier la différence signing / closing.`, `Oublier où intervient la DD.`],
    relances: [[`Pourquoi deux tours ?`, `Pour mettre plusieurs acheteurs en concurrence au tour 1 sans leur ouvrir toutes les informations, puis ne donner l'accès complet qu'aux plus sérieux.`]],
    points: [[`Teaser / NDA / IM`, ['teaser', 'nda', 'memorandum', 'im ']], [`Offres indicatives (tour 1)`, ['indicati', 'non-binding', 'nbo', 'tour 1', 'premier tour']], [`Data room / DD / management presentation (tour 2)`, ['data room', 'due diligence', 'management presentation', 'tour 2', 'second tour']], [`Binding offer / SPA`, ['binding', 'offre ferme', 'spa']], [`Signing puis closing`, ['signing', 'closing']]],
  }),
  q('110', 1, `Quelles autres due diligences sont menées en parallèle de la Financial Due Diligence ?`, {
    courte: `<p>La <strong>legal</strong>, la <strong>tax</strong>, la <strong>sociale / HR</strong>, la <strong>commercial due diligence</strong>, et selon le dossier l'<strong>IT / cyber</strong>, l'<strong>ESG / environnementale</strong>, l'<strong>assurance</strong>, l'<strong>opérationnelle</strong>.</p>`,
    complete: `<ul><li><strong>Legal</strong> : contrats, litiges, propriété intellectuelle, conformité → nourrit le SPA.</li><li><strong>Tax</strong> : risques fiscaux, impôt dû, tax losses, structuration (intégration fiscale) → specific indemnities, debt-like.</li><li><strong>Sociale</strong> : URSSAF, contrats de travail, pensions.</li><li><strong>Commercial due diligence (CDD)</strong> : marché, positionnement, crédibilité du business plan.</li><li><strong>IT, ESG, environnement, assurances</strong> selon les risques.</li></ul>
    <p>Le TS doit <strong>coordonner</strong> ses constats avec les autres : un litige vu par la legal DD peut devenir un debt-like ; un risque fiscal vu par la tax DD peut aller dans une specific indemnity.</p>`,
    relances: [[`Qu'est-ce que l'audit légal vient faire là ?`, `Rien : l'audit légal est une obligation de la société, ce n'est pas une due diligence d'acquisition.`]],
    points: [[`Legal et tax`, ['legal', 'juridique', 'tax', 'fiscal']], [`Commercial due diligence`, ['commercial', 'cdd', 'strateg', 'marche']], [`Sociale / IT / ESG`, ['social', 'hr', 'it', 'esg', 'environ']], [`Coordination avec la FDD`, ['coordin', 'lien', 'ensemble']]],
  }),
  q('111', 1, `Qu'est-ce qu'une data room et comment l'utilises-tu ?`, {
    courte: `<p>La <strong>data room</strong> (souvent virtuelle : VDR) est l'espace sécurisé où le vendeur met les documents de la cible à disposition des acheteurs pendant le process : comptes, reporting, contrats, PV, documents fiscaux et sociaux.</p>`,
    complete: `<ul><li>Au début de la mission, on la cartographie et on la compare à notre Information Request List pour lister les manques.</li><li>Les questions passent par un process de <strong>Q&A</strong> encadré (questions écrites, réponses du management via la banque du vendeur).</li><li>Tout est tracé (qui consulte quoi) et confidentiel (NDA).</li></ul>`,
    relances: [[`Qu'est-ce que tu cherches en premier ?`, `Les balances générales mensuelles, le reporting mensuel, les comptes audités, le détail de la dette et les contrats de financement, les PV d'assemblées, la liste des litiges.`]],
    points: [[`Espace sécurisé de documents`, ['documents', 'secur', 'virtuel', 'vdr']], [`Q&A encadré`, ['q&a', 'question']], [`Comparaison avec la request list`, ['request', 'irl', 'manque', 'liste']]],
  }),
  q('112', 1, `Qui sont les clients d'une équipe Transaction Services ?`, {
    courte: `<p>Surtout des <strong>fonds de private equity</strong> (buy-side sur leurs LBO, et VDD quand ils vendent), des <strong>corporates</strong> qui font des acquisitions ou des cessions (carve-outs), et des <strong>banques / fonds de private credit</strong> qui financent les deals.</p>`,
    complete: `<ul><li>En mid-cap, les fonds sont des clients récurrents : la relation se construit deal après deal.</li><li>Les corporates attendent souvent plus d'accompagnement sur l'intégration et les carve-outs.</li><li>Les lenders s'appuient sur la FDD (via reliance) pour dimensionner la dette et les covenants.</li></ul>`,
    points: [[`Fonds de private equity`, ['fonds', 'private equity', 'pe']], [`Corporates (acquisitions, carve-outs)`, ['corporate', 'industriel', 'groupe', 'carve']], [`Banques / lenders`, ['banque', 'lender', 'preteur', 'private credit']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Décris les étapes d'une mission de buy-side Financial Due Diligence.`, {
    courte: `<p>Cadrage (périmètre, materiality, calendrier) → Information Request List et data room → entretiens avec le DAF → analyses (QoE, NWC, net debt, cash flows, business plan) → remontée des red flags au fil de l'eau → rapport et databook → support au SPA et aux lenders.</p>`,
    complete: `<ol><li><strong>Cadrage</strong> : lettre de mission, sociétés et périodes couvertes (ex. FY24, FY25, LTM), seuil de materiality, livrables, calendrier (souvent 3 à 5 semaines).</li>
      <li><strong>Collecte</strong> : Information Request List, data room, Q&A.</li>
      <li><strong>Entretiens</strong> avec le DAF, le contrôle de gestion, parfois le commissaire aux comptes (revue de ses dossiers).</li>
      <li><strong>Analyses</strong> : EBITDA bridge et adjustments, revenue (price-volume-mix, concentration), NWC mensuel, net debt et debt-like items, cash conversion, business plan.</li>
      <li><strong>Points d'étape</strong> avec le client : red flags dès qu'ils apparaissent, coordination avec les DD legal / tax / CDD.</li>
      <li><strong>Rapport</strong> : executive summary (messages chiffrés et impact prix), chapitres détaillés, databook ; présentation au client et aux banques.</li>
      <li><strong>Support SPA</strong> : définitions de net debt et de NWC, liste des debt-like, mécanisme de prix, specific indemnities.</li></ol>`,
    pieges: [`Oublier la communication au fil de l'eau : un fonds n'attend pas le rapport final pour apprendre un red flag.`],
    relances: [[`Combien de temps dure une mission ?`, `Souvent 3 à 6 semaines en buy-side, selon la taille et la qualité des données ; moins pour une top-up sur une VDD.`]],
    points: [[`Cadrage et materiality`, ['cadrage', 'perimetre', 'materialit', 'lettre de mission']], [`Collecte : IRL, data room, Q&A`, ['request', 'data room', 'q&a', 'irl']], [`Entretiens avec le management`, ['entretien', 'daf', 'management']], [`Analyses QoE / NWC / net debt`, ['qoe', 'ebitda', 'nwc', 'net debt']], [`Rapport + support SPA`, ['rapport', 'spa', 'databook']]],
  }),
  q('202', 2, `Pourquoi un fonds paie-t-il une Financial Due Diligence alors que les comptes sont déjà audités ?`, {
    courte: `<p>Parce que l'audit dit que les comptes sont <strong>réguliers</strong>, pas que l'EBITDA est <strong>récurrent</strong>, ni quel est le NWC <strong>normal</strong>, ni quelle est la <strong>vraie net debt</strong>. Or ce sont ces trois chiffres qui font le prix.</p>`,
    complete: `<ul><li>L'audit travaille sur des comptes annuels avec un seuil de materiality global ; la FDD travaille en mensuel et en LTM, avec un seuil adapté au deal.</li><li>La FDD retraite : one-offs, normalisation (dirigeant, loyers), pro forma, cut-off.</li><li>Elle identifie les debt-like items, qui ne sont pas des « erreurs » comptables mais réduisent le prix.</li><li>Elle nourrit le SPA et le financement : les lenders demandent une FDD (reliance).</li><li>Le rapport coût / bénéfice est énorme : à 10x, 100 k€ d'EBITDA surévalué = 1 M€ de prix payé en trop.</li></ul>`,
    exemple: `<p>Une plus-value de cession de 0,5 M€ incluse dans l'EBITDA est parfaitement auditée… mais non récurrente : à 9x, elle gonflerait le prix de 4,5 M€.</p>`,
    pieges: [`Dire que l'audit est « inutile » ou « pas fiable ».`],
    points: [[`Audit ≠ récurrence / normatif`, ['recurren', 'normatif', 'regularit']], [`Mensuel / LTM vs annuel`, ['mensuel', 'ltm']], [`Debt-like items identifiés`, ['debt-like', 'debt like', 'net debt']], [`Impact prix (EBITDA × multiple)`, ['multiple', 'prix', 'x ']], [`Lenders / SPA`, ['banque', 'lender', 'spa']]],
  }),
  q('203', 2, `Qu'est-ce qu'une reliance letter et une hold harmless letter ?`, {
    courte: `<p>Avec une VDD : la <strong>hold harmless letter</strong> est signée par chaque acheteur potentiel qui lit le rapport (il renonce à tout recours contre le cabinet) ; la <strong>reliance letter</strong> est donnée à l'acheteur final et à ses banques, qui peuvent s'appuyer sur le rapport comme s'ils étaient clients, avec une responsabilité plafonnée.</p>`,
    complete: `<ul><li>Pourquoi : le cabinet a été payé par le vendeur ; sans ces lettres, il serait exposé à des recours de tiers qu'il ne connaît pas.</li><li>La reliance permet à l'acheteur de ne faire qu'une DD de confirmation et aux banques de financer sur la base de la VDD.</li><li>Les termes (plafond de responsabilité, durée) se négocient entre le cabinet, l'acheteur et les lenders.</li></ul>`,
    points: [[`Hold harmless : lecteurs, renonciation à recours`, ['hold harmless', 'renonc', 'recours']], [`Reliance : acheteur final et banques`, ['reliance', 'acheteur final', 'banque', 'lender']], [`Responsabilité plafonnée`, ['plafon', 'cap', 'responsabilit']]],
  }),
  q('204', 2, `Comment fixes-tu le seuil de materiality d'une mission et pourquoi est-ce important ?`, {
    courte: `<p>On le fixe <strong>avec le client</strong> en début de mission, souvent en pourcentage de l'EBITDA (ou un montant fixe). En dessous, on n'analyse pas en détail et on ne présente pas : c'est ce qui permet de livrer à temps et de garder des messages clairs.</p>`,
    complete: `<ul><li>Exemple : sur 20 M€ d'EBITDA, ne présenter que les adjustments > 100-200 k€ (en les cumulant si plusieurs petits vont dans le même sens).</li><li>Le seuil peut être plus bas pour certains sujets sensibles (impôt, litiges) ou pour la net debt (impact euro pour euro).</li><li>On garde la trace des éléments sous le seuil : cumulés, ils peuvent devenir significatifs.</li></ul>`,
    pieges: [`Appliquer le même seuil à l'EBITDA et à la net debt sans réfléchir : 100 k€ d'EBITDA valent 900 k€ de prix à 9x, 100 k€ de dette valent 100 k€.`],
    points: [[`Fixé avec le client`, ['client', 'cadrage']], [`En % de l'EBITDA ou montant`, ['%', 'pourcentage', 'ebitda', 'montant']], [`Sert à prioriser / livrer à temps`, ['priori', 'temps', 'clair', 'focus']], [`Attention aux petits éléments cumulés`, ['cumul', 'agreg']]],
  }),
  q('205', 2, `Le DAF de la cible refuse de te transmettre la balance générale mensuelle. Que fais-tu ?`, {
    courte: `<p>Je comprends <strong>pourquoi</strong> (confidentialité, disponibilité, charge de travail), je propose une <strong>alternative</strong> (données agrégées, consultation à l'écran, clean room), j'<strong>escalade</strong> vite à mon manager pour qu'il en parle au client et à la banque du vendeur, et si rien n'arrive je <strong>documente la limite</strong> dans le rapport avec son impact.</p>`,
    complete: `<ul><li>Rester courtois : le DAF est souvent débordé pendant un process et c'est une relation à préserver.</li><li>Alternatives : extraction agrégée par compte, données anonymisées (salaires), accès en lecture seule, clean room pour les données concurrentielles sensibles.</li><li>Escalade : c'est au manager / associé de passer par le client et le conseil M&A du vendeur.</li><li>Limitation de scope : « Nous n'avons pas eu accès à… ; par conséquent nous n'avons pas pu analyser la saisonnalité du NWC » + impact possible sur les conclusions.</li></ul>`,
    pieges: [`Insister seul jusqu'au conflit.`, `Ne rien dire et livrer un rapport incomplet sans le signaler.`],
    conseil: `Question de mise en situation : on teste ton calme, ton sens du client et ta capacité à escalader au bon moment.`,
    points: [[`Comprendre la raison`, ['raison', 'pourquoi', 'confidentialit']], [`Proposer une alternative`, ['alternati', 'agreg', 'clean room', 'propos']], [`Escalader au manager / client`, ['manager', 'associe', 'client', 'escalad', 'remonter']], [`Documenter la limite (scope)`, ['limit', 'scope', 'perimetre', 'rapport']]],
  }),
  q('206', 2, `Comment le travail TS s'articule-t-il avec les avocats sur le SPA ?`, {
    courte: `<p>Le TS fournit la <strong>matière chiffrée</strong> que les avocats traduisent en clauses : définitions de net debt et de NWC (avec annexe illustrative), liste des debt-like items, NWC peg, mécanisme de prix (locked box ou completion accounts), leakage, specific indemnities pour les risques identifiés.</p>`,
    complete: `<ul><li><strong>Définitions</strong> : chaque compte du bilan est affecté à la net debt, au NWC ou à « autre », avec un exemple chiffré à une date de référence (illustrative closing statement).</li><li><strong>Peg</strong> : on propose le niveau de normalised NWC et sa méthode (moyenne LTM, saisonnalisation).</li><li><strong>Locked box</strong> : on analyse le bilan de référence et on aide à lister leakages et permitted leakages.</li><li><strong>Garanties</strong> : nos red flags deviennent des demandes de specific indemnity ou d'escrow.</li><li><strong>Après closing</strong> : préparation ou revue des completion accounts, support en cas de litige.</li></ul>`,
    points: [[`Définitions net debt / NWC`, ['definition', 'net debt', 'nwc', 'annexe']], [`Peg`, ['peg', 'normalis']], [`Mécanisme de prix / leakage`, ['locked', 'completion', 'leakage']], [`Garanties / specific indemnities`, ['indemn', 'garantie', 'escrow', 'gap']]],
  }),
  q('207', 2, `Pourquoi un vendeur commande-t-il une Vendor Due Diligence ?`, {
    courte: `<p>Pour <strong>maximiser le prix et la certitude du deal</strong> : mettre tous les acheteurs sur la même base d'information, accélérer le process, éviter les mauvaises surprises tardives (qui font baisser le prix en exclusivité) et contrôler le message (adjustments présentés et défendus).</p>`,
    complete: `<ul><li><strong>Concurrence</strong> : 5 acheteurs peuvent faire une offre rapide et comparable.</li><li><strong>Anticipation</strong> : le vendeur découvre ses propres problèmes avant les acheteurs et peut les traiter (corriger, expliquer, provisionner).</li><li><strong>Moins de « retrade »</strong> : un acheteur qui découvre un problème en exclusivité renégocie le prix (« price chip ») ; la VDD réduit ce risque.</li><li><strong>Financement</strong> : les banques de l'acheteur s'appuient sur la VDD (reliance).</li><li>Souvent accompagnée de <strong>vendor assistance</strong> : préparation des données, du NWC, du business plan.</li></ul>`,
    points: [[`Même information pour tous / concurrence`, ['concurren', 'tous les acheteurs', 'meme base']], [`Process plus rapide`, ['rapide', 'temps', 'accelere']], [`Moins de surprises / de renégociation`, ['surprise', 'renegoci', 'retrade', 'baisse de prix']], [`Contrôle du message`, ['message', 'controle', 'maitris']]],
  }),
  q('208', 2, `Que demandes-tu en priorité dans ton Information Request List ?`, {
    courte: `<p>Les données qui alimentent les trois chantiers dès le jour 1 : <strong>balances générales mensuelles</strong> (ou reporting mensuel) sur 2-3 ans, <strong>comptes audités</strong> et liasses fiscales, <strong>détail de la dette</strong> et contrats de financement, <strong>balances âgées</strong> clients / fournisseurs, <strong>revenue par client</strong>, PV d'assemblées, liste des litiges, business plan.</p>`,
    complete: `<ul><li>QoE : P&L mensuel, grand livre des comptes sensibles (exceptionnel, honoraires, autres produits), contrats importants, rémunération du dirigeant, conventions avec les parties liées.</li><li>NWC : bilans mensuels, balances âgées, détail des stocks et provisions.</li><li>Net debt : tableaux d'emprunts, leasing, engagements hors bilan, impôt et URSSAF, earn-outs, litiges.</li><li>Business plan et budget, avec les hypothèses.</li></ul>`,
    points: [[`Données mensuelles (balances / reporting)`, ['mensuel', 'balance', 'reporting']], [`Comptes audités / liasses`, ['audit', 'liasse', 'comptes']], [`Dette / financements / hors bilan`, ['dette', 'emprunt', 'financement', 'hors bilan']], [`Balances âgées / revenue par client`, ['agee', 'client', 'revenue']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `En VDD, le vendeur fait pression pour que tu présentes des adjustments très favorables. Comment gères-tu ?`, {
    courte: `<p>Je rappelle que la valeur d'une VDD tient à sa <strong>crédibilité</strong> : un adjustment non défendable sera refait par chaque acheteur, décrédibilisera tout le rapport et se retournera contre le vendeur. Je présente donc ce qui est <strong>documenté</strong>, et je peux montrer à part ce qui relève du « management view ».</p>`,
    complete: `<ul><li><strong>Distinguer</strong> : adjustments documentés (factures, contrats, historique) vs vision du management (run-rate, synergies, pro forma non prouvés) présentée séparément et clairement étiquetée.</li><li><strong>Argumenter avec l'intérêt du vendeur</strong> : un acheteur qui découvre un adjustment fragile en exclusivité baisse son prix et soupçonne tout le reste.</li><li><strong>Escalader</strong> à l'associé : c'est lui qui tient la ligne avec le client et la banque du vendeur.</li><li><strong>Indépendance</strong> : le cabinet engage sa responsabilité (reliance) et sa réputation auprès des fonds, qui sont aussi ses clients buy-side.</li></ul>`,
    pieges: [`Céder « pour faire plaisir au client ».`, `Refuser sèchement sans proposer de présentation alternative.`],
    relances: [[`Et si le client menace de changer de cabinet ?`, `C'est la décision de l'associé ; mais un cabinet qui signe des VDD complaisantes perd sa crédibilité auprès des fonds acheteurs, donc sa valeur pour les vendeurs.`]],
    points: [[`La crédibilité fait la valeur de la VDD`, ['credib', 'confiance']], [`Séparer documenté vs vision management`, ['document', 'management view', 'separ', 'etiquet']], [`Intérêt du vendeur (éviter le retrade)`, ['retrade', 'renegoci', 'baisse', 'interet']], [`Escalade à l'associé`, ['associe', 'manager', 'escalad']], [`Indépendance / responsabilité`, ['independ', 'responsab', 'reputation']]],
  }),
  q('302', 3, `La veille de la remise du rapport, tu découvres un problème majeur (par exemple 2 M€ d'impôt non déclaré). Que fais-tu ?`, {
    courte: `<p>J'<strong>alerte immédiatement</strong> mon manager avec les faits et un premier chiffrage, on <strong>vérifie</strong> rapidement (sources, échanges avec le DAF), puis l'associé <strong>prévient le client</strong> avant la remise. Le rapport est mis à jour (red flag + impact prix / SPA), quitte à décaler la remise de quelques heures.</p>`,
    complete: `<ol><li><strong>Qualifier</strong> : certitude, montant, période, documents à l'appui.</li><li><strong>Chiffrer l'impact</strong> : debt-like (2 M€ + pénalités et intérêts de retard, nets ou non), éventuel effet sur l'EBITDA si récurrent.</li><li><strong>Coordonner</strong> avec la tax DD.</li><li><strong>Recommandation</strong> : debt-like ou specific indemnity + escrow, impact sur le prix et la négociation.</li><li><strong>Communiquer</strong> : un fonds préfère une mauvaise nouvelle tôt qu'un rapport parfait en retard ou incomplet.</li></ol>`,
    pieges: [`Le garder pour la version suivante du rapport.`, `Le communiquer au client sans validation du manager.`],
    points: [[`Alerter immédiatement le manager`, ['alert', 'manager', 'immediat']], [`Vérifier et chiffrer`, ['verif', 'chiffr', 'montant', 'impact']], [`Traitement : debt-like / specific indemnity / escrow`, ['debt-like', 'debt like', 'indemn', 'escrow', 'garantie']], [`Prévenir le client via l'associé`, ['client', 'associe', 'prevenir']]],
  }),
  q('303', 3, `Quelles sont les limites d'une Financial Due Diligence ?`, {
    courte: `<p>Elle repose sur les <strong>informations fournies</strong> par la cible, dans un <strong>temps court</strong>, sans tests d'audit exhaustifs ; elle ne <strong>certifie</strong> rien et ne prédit pas le futur (le business plan reste une projection).</p>`,
    complete: `<ul><li><strong>Accès</strong> : data room incomplète, management peu disponible, données sensibles en clean room.</li><li><strong>Temps</strong> : 3 à 6 semaines, priorités fixées par la materiality.</li><li><strong>Nature</strong> : analyse et entretiens, pas de circularisation exhaustive ni d'inventaire physique.</li><li><strong>Futur</strong> : la FDD dit ce que l'EBITDA historique vaut ; elle teste la cohérence du business plan sans le garantir.</li><li><strong>Fraude</strong> : une DD n'est pas conçue pour détecter une fraude organisée.</li></ul>
    <p>D'où l'importance des garanties du SPA (W&I, specific indemnities) et des autres DD.</p>`,
    points: [[`Dépend des informations fournies`, ['information', 'fourni', 'acces', 'management']], [`Temps limité / materiality`, ['temps', 'materialit', 'semaines']], [`Pas d'audit / pas de certification`, ['audit', 'certif']], [`Ne garantit pas le futur`, ['futur', 'business plan', 'projection']], [`Complétée par les garanties du SPA`, ['garantie', 'w&i', 'spa', 'indemn']]],
  }),
  q('304', 3, `Comment adapterais-tu une Financial Due Diligence pour un carve-out ?`, {
    courte: `<p>Dans un carve-out, il n'existe pas de comptes historiques séparés : il faut <strong>reconstituer</strong> le P&L et le bilan de la division, analyser les <strong>allocations de coûts</strong> du groupe, chiffrer les <strong>stand-alone costs</strong> et les besoins de <strong>TSA</strong>, définir précisément le périmètre du NWC et de la net debt, et souvent recommander des <strong>completion accounts</strong>.</p>`,
    complete: `<ul><li><strong>Comptes « carve-out »</strong> : construction à partir du reporting de gestion du groupe ; vérifier le périmètre (quelles entités, quels contrats, quels salariés).</li><li><strong>Allocations</strong> : management fees, fonctions centrales, achats groupés, assurances : prix de marché ? clés de répartition ?</li><li><strong>Stand-alone costs</strong> : coût futur des fonctions à recréer (IT, paie, trésorerie, juridique) → adjustment négatif de l'EBITDA.</li><li><strong>TSA</strong> : services transitoires facturés par le vendeur après closing (coût et durée).</li><li><strong>Ventes / achats intragroupe</strong> : conditions futures (contrats à long terme ?).</li><li><strong>Bilan</strong> : NWC souvent mal isolé (cash pooling), pas de cash propre : peg et net debt à définir avec soin ; completion accounts plus protecteurs.</li></ul>`,
    points: [[`Pas de comptes séparés : reconstitution`, ['reconstit', 'separ', 'perimetre', 'carve']], [`Allocations de coûts du groupe`, ['allocation', 'repartition', 'groupe']], [`Stand-alone costs`, ['stand-alone', 'stand alone']], [`TSA`, ['tsa', 'transitoire']], [`Completion accounts / définitions NWC et dette`, ['completion', 'peg', 'nwc', 'cash pooling']]],
  }),
  q('305', 3, `Comment l'IA change-t-elle, selon toi, le métier de la due diligence ?`, {
    courte: `<p>Elle accélère la <strong>partie mécanique</strong> (extraction de données, analyse de contrats, premières tendances, contrôles de cohérence du databook), ce qui laisse plus de temps au <strong>jugement</strong> : quels adjustments sont défendables, quel impact sur le prix, quelle recommandation. La responsabilité et la relation client restent humaines.</p>`,
    complete: `<ul><li><strong>Gains</strong> : lecture de centaines de contrats (clauses de changement de contrôle, garanties), catégorisation du grand livre, détection d'anomalies (écritures inhabituelles, cut-off), production plus rapide du databook.</li><li><strong>Limites</strong> : confidentialité des data rooms (outils internes sécurisés), fiabilité (hallucinations → tout chiffre doit être sourcé et vérifié), responsabilité du cabinet.</li><li><strong>Impact sur les juniors</strong> : moins de saisie, plus d'analyse et de communication ; savoir vérifier et challenger un résultat devient clé.</li></ul>`,
    conseil: `Question d'actualité de plus en plus posée : montre que tu en vois l'intérêt ET les limites, avec un exemple concret.`,
    points: [[`Automatise la partie mécanique`, ['extraction', 'automat', 'mecanique', 'donnees', 'contrat']], [`Plus de temps pour le jugement`, ['jugement', 'analyse', 'recommandation']], [`Limites : confidentialité, fiabilité`, ['confidentialit', 'fiabil', 'hallucin', 'verif']], [`Responsabilité humaine`, ['responsab', 'humain', 'client']]],
  }),
]);
