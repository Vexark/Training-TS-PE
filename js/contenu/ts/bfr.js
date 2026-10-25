// TS — Net Working Capital (NWC) et cash
import { q, calcul, classer, theme } from '../fabriques.js';

export default theme('ts', 'bfr', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Qu'est-ce que le Net Working Capital ?`, {
    courte: `<p>Le <strong>NWC</strong> (BFR en français) est le cash immobilisé par le cycle d'exploitation : <strong>créances clients + stocks − dettes fournisseurs</strong>, plus ou moins les autres créances et dettes d'exploitation (TVA, dettes sociales, deferred revenue…).</p>`,
    complete: `<ul><li>Un NWC positif doit être financé (la société paie ses fournisseurs avant d'encaisser ses clients) ; un NWC négatif finance l'activité (grande distribution, abonnements payés d'avance).</li><li>En FDD on distingue le <strong>trade working capital</strong> (clients, stocks, fournisseurs) et les autres éléments d'exploitation ; on <strong>exclut</strong> les éléments non opérationnels (impôt sur les sociétés, dividendes, capex creditors, intérêts) qui vont en net debt ou ailleurs.</li><li>Il compte dans le prix via le <strong>NWC peg</strong>.</li></ul>`,
    pieges: [`Inclure la trésorerie ou la dette financière dans le NWC.`],
    relances: [[`Pourquoi l'acheteur s'y intéresse-t-il ?`, `Parce qu'il achète la société avec un certain niveau de NWC ; si le vendeur le livre trop bas au closing, l'acheteur devra remettre du cash : d'où le peg.`]],
    points: [[`Créances + stocks − fournisseurs`, ['creance', 'stock', 'fournisseur']], [`Cash immobilisé par l'exploitation`, ['immobilis', 'exploitation', 'cycle']], [`Exclusion des éléments non opérationnels`, ['impot', 'dividende', 'non operationnel', 'exclu']], [`Lien avec le prix (peg)`, ['peg', 'prix']]],
  }),
  q('102', 1, `Qu'est-ce que le normalised NWC ?`, {
    courte: `<p>Le niveau <strong>« normal »</strong> de NWC dont l'activité a besoin, en général la <strong>moyenne mensuelle des 12 derniers mois</strong> (LTM), retraitée des éléments non opérationnels ou non récurrents. Il sert à fixer le <strong>NWC peg</strong> du SPA.</p>`,
    complete: `<ul><li>Pourquoi une moyenne : neutraliser la saisonnalité et le window dressing de la clôture.</li><li>Retraitements : créance de cession d'immobilisation, dettes d'impôt, overdue payables anormales, primes exceptionnelles, éléments reclassés en net debt.</li><li>Ajustements possibles pour la croissance (NWC rapporté au revenue futur) ou une saisonnalité très forte (peg mensuel).</li></ul>`,
    points: [[`Niveau normal nécessaire à l'activité`, ['normal', 'necessaire', 'besoin']], [`Moyenne mensuelle LTM`, ['moyenne', 'mensuel', 'ltm', '12 mois']], [`Retraitements non opérationnels`, ['retrait', 'non operationnel', 'non recurrent']], [`Sert au peg`, ['peg', 'spa']]],
  }),
  q('103', 1, `Qu'est-ce qu'un NWC peg et comment fonctionne-t-il dans le prix ?`, {
    courte: `<p>Le <strong>peg</strong> est le niveau de NWC de référence fixé dans le SPA (souvent le normalised NWC). Au closing, on compare le NWC réellement livré au peg : <strong>ajustement de prix euro pour euro</strong> (NWC livré − peg). Livré en dessous : le prix baisse ; au-dessus : il monte.</p>`,
    complete: `<ul><li>Il protège l'acheteur contre un vendeur qui <strong>transformerait du NWC en cash</strong> juste avant le closing (relance clients, retard fournisseurs), cash qu'il récupérerait via une net debt plus faible.</li><li>Il protège aussi le vendeur qui livre un NWC élevé (stocks constitués avant une saison).</li><li>Avec des completion accounts, l'ajustement se fait après le closing ; en locked box, il n'y a pas d'ajustement de NWC (le bilan est figé).</li></ul>`,
    exemple: `<p>Peg 10 M€, NWC livré 8 M€ → prix <strong>−2 M€</strong>.</p>`,
    points: [[`Niveau de référence dans le SPA`, ['reference', 'spa', 'cible', 'target']], [`Ajustement euro pour euro`, ['euro pour euro', 'ajustement']], [`Sens : livré < peg → prix baisse`, ['baisse', 'inferieur', 'dessous']], [`Protège contre la conversion NWC → cash`, ['protege', 'window', 'cash']]],
  }),
  q('104', 1, `Comment calcule-t-on le DSO, le DIO et le DPO ?`, {
    courte: `<p><strong>DSO</strong> = créances clients TTC / revenue TTC × 365. <strong>DIO</strong> = stocks / coût des ventes × 365. <strong>DPO</strong> = dettes fournisseurs TTC / achats TTC × 365. Le cycle de conversion du cash ≈ DSO + DIO − DPO.</p>`,
    complete: `<ul><li>Comparer des grandeurs homogènes (TTC avec TTC) et préciser la base (365 ou 360 jours).</li><li>Analyse fine : DSO mensuel, méthode de l'épuisement du revenue (plus juste avec une saisonnalité), balance âgée.</li><li>Lecture : un DSO qui s'allonge = clients qui paient moins bien ou revenue de mauvaise qualité ; un DIO qui monte = stocks lents ; un DPO qui baisse = perte de crédit fournisseur.</li></ul>`,
    exemple: `<p>Revenue 36,5 M€ HT (TVA 20 %), créances TTC 6,57 M€ → DSO = 6,57 / 43,8 × 365 ≈ <strong>55 jours</strong>.</p>`,
    pieges: [`Diviser des créances TTC par un revenue HT.`],
    points: [[`DSO = créances / revenue × 365`, ['dso', 'creance']], [`DIO = stocks / coût des ventes × 365`, ['dio', 'stock', 'cout des ventes']], [`DPO = fournisseurs / achats × 365`, ['dpo', 'fournisseur', 'achat']], [`HT / TTC cohérents`, ['ttc', 'ht', 'homogen']]],
  }),
  q('105', 1, `Pourquoi utilise-t-on une moyenne mensuelle sur 12 mois plutôt que le NWC de clôture ?`, {
    courte: `<p>Pour neutraliser la <strong>saisonnalité</strong> (le NWC d'une date peut être au plus haut ou au plus bas) et le <strong>window dressing</strong> de fin d'exercice (relances clients, fournisseurs payés en retard) qui rend le NWC de clôture artificiellement bas.</p>`,
    complete: `<ul><li>La moyenne LTM reflète le besoin réel sur un cycle complet.</li><li>Elle exige des bilans mensuels fiables (ou au minimum les postes clients, stocks, fournisseurs mensuels).</li><li>Limite : en forte croissance, la moyenne passée sous-estime le besoin futur.</li></ul>`,
    points: [[`Saisonnalité`, ['saison']], [`Window dressing à la clôture`, ['window', 'cloture', 'artificiel']], [`Besoin réel sur un cycle`, ['cycle', 'reel', 'moyenne']]],
  }),
  q('106', 1, `Le NWC augmente de 3 M€ sur l'année. Quel impact sur le cash ?`, {
    courte: `<p><strong>−3 M€</strong> sur le cash flow from operations : une hausse du NWC immobilise du cash (plus de créances ou de stocks, ou moins de dettes fournisseurs).</p>`,
    complete: `<ul><li>Normal en croissance (le NWC suit le revenue) ; anormal si le DSO ou le DIO se dégradent.</li><li>Dans un DCF ou un paper LBO, la hausse du NWC se retranche de l'EBITDA pour obtenir le free cash flow.</li></ul>`,
    points: [[`Cash −3`, ['-3', '−3', 'baisse']], [`Hausse du NWC = cash immobilisé`, ['immobilis', 'consomme']], [`Normal en croissance / à analyser sinon`, ['croissance', 'dso', 'dio']]],
  }),
  q('107', 1, `Qu'est-ce qu'un NWC négatif ? Donne un exemple.`, {
    courte: `<p>Un NWC négatif signifie que la société <strong>encaisse ses clients avant de payer ses fournisseurs</strong> : le cycle d'exploitation la finance. Exemples : grande distribution (clients au comptant, fournisseurs à 60 jours), écoles et abonnements payés d'avance (deferred revenue).</p>`,
    complete: `<ul><li>Avantage : la croissance génère du cash.</li><li>Risque : si l'activité baisse, ce financement se retourne et la trésorerie fond très vite.</li><li>En deal : la trésorerie d'une société à NWC négatif est en partie « l'argent des clients et fournisseurs » : l'acheteur refusera de la payer comme du cash libre (débat sur le peg et le minimum cash).</li></ul>`,
    points: [[`Encaisse avant de payer`, ['encaiss', 'avant', 'payer']], [`Exemple (distribution, abonnements, écoles)`, ['distribution', 'abonnement', 'ecole', 'supermarche', 'avance']], [`Risque si l'activité baisse`, ['baisse', 'retourne', 'risque']]],
  }),
  q('108', 1, `Qu'est-ce que le window dressing ?`, {
    courte: `<p>Des manœuvres de fin de période pour <strong>embellir le bilan</strong> : retarder le paiement des fournisseurs, accélérer les encaissements clients (escomptes, relances), réduire les stocks. La trésorerie de la date est gonflée et le NWC artificiellement bas.</p>`,
    complete: `<ul><li>Avant une cession, cela gonfle la trésorerie au closing (donc l'Equity Value via la net debt).</li><li>Parades : peg fondé sur une moyenne, analyse du NWC mensuel et des balances âgées, reclassement de la part anormale des overdue payables en debt-like.</li></ul>`,
    points: [[`Manœuvre de fin de période`, ['fin de periode', 'cloture', 'embellir']], [`Retarder fournisseurs / accélérer clients`, ['fournisseur', 'retard', 'client', 'encaiss']], [`Trésorerie gonflée, NWC bas`, ['tresorerie', 'cash', 'gonfl']], [`Parade : peg moyen / overdue en debt-like`, ['peg', 'moyenne', 'debt-like', 'overdue']]],
  }),
  q('109', 1, `Pourquoi le NWC augmente-t-il quand une société grandit ?`, {
    courte: `<p>Parce que les créances et les stocks sont <strong>proportionnels à l'activité</strong> : à délais constants (DSO, DIO), plus de revenue = plus de créances et de stocks à financer. La croissance consomme donc du cash.</p>`,
    complete: `<ul><li>Si le NWC représente 20 % du revenue, chaque euro de revenue supplémentaire immobilise 0,20 € de cash.</li><li>À intégrer dans le business plan (variation de NWC) et dans le peg (une moyenne historique sous-estime le besoin d'une société en forte croissance).</li></ul>`,
    points: [[`Créances et stocks proportionnels à l'activité`, ['proportion', 'activite', 'creance', 'stock']], [`La croissance consomme du cash`, ['consomme', 'cash', 'immobilis']], [`NWC en % du revenue`, ['%', 'pourcentage']]],
  }),
  q('110', 1, `Qu'est-ce que la saisonnalité du NWC et pourquoi est-ce important en deal ?`, {
    courte: `<p>Le NWC varie au cours de l'année avec l'activité (stocks constitués avant une saison, créances au pic des ventes). La <strong>date de closing</strong> peut donc tomber sur un point haut ou bas, d'où l'importance d'un <strong>peg</strong> bien défini (moyenne, voire peg mensuel).</p>`,
    complete: `<ul><li>Exemple : un fabricant de jouets constitue ses stocks à l'automne, encaisse en janvier.</li><li>L'acheteur doit aussi prévoir le <strong>financement du pic</strong> (RCF, affacturage).</li></ul>`,
    points: [[`Variation du NWC dans l'année`, ['variation', 'annee', 'pic', 'saison']], [`Date de closing sur un point haut ou bas`, ['date', 'closing']], [`Peg moyen / mensuel`, ['peg', 'moyenne', 'mensuel']], [`Financement du pic`, ['rcf', 'financement', 'affacturage']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Juste avant le closing, le vendeur retarde le paiement de ses fournisseurs. Quel effet, avec et sans peg ?`, {
    courte: `<p>La trésorerie au closing monte (donc la net debt baisse et l'Equity Value monte) mais le NWC baisse d'autant. <strong>Avec un peg</strong>, le NWC livré inférieur au peg fait baisser le prix du même montant : <strong>effet neutralisé</strong>. <strong>Sans peg</strong>, le vendeur encaisse le retard de paiement : l'acheteur paiera les fournisseurs après le closing.</p>`,
    complete: `<ul><li>Si les retards sont importants et anormaux, l'acheteur peut aussi demander à reclasser la part anormale en <strong>debt-like</strong> (overdue payables) — en veillant à ne pas compter deux fois avec le peg.</li><li>En locked box, ce type de manœuvre après la locked box date ne change pas le prix (bilan figé) ; le risque porte sur la date de référence.</li></ul>`,
    exemple: `<p>Le vendeur retarde 1,5 M€ de paiements : cash +1,5 → Equity Value +1,5 ; NWC −1,5 sous le peg → prix −1,5. Résultat : 0.</p>`,
    points: [[`Cash monte / net debt baisse`, ['cash', 'tresorerie', 'net debt', 'monte']], [`NWC baisse d'autant`, ['nwc', 'bfr', 'baisse']], [`Avec peg : neutralisé`, ['neutralis', 'peg', 'compense']], [`Sans peg : gain pour le vendeur`, ['sans peg', 'vendeur', 'gagne']]],
  }),
  q('202', 2, `La cible utilise un affacturage déconsolidant. Comment le traites-tu en FDD ?`, {
    courte: `<p>Les créances cédées sortent du bilan : <strong>NWC artificiellement bas</strong> et trésorerie plus haute. C'est un <strong>financement</strong> : je réintègre les créances cédées dans le NWC (et le peg) et le montant financé en <strong>net debt</strong> (debt-like), de façon cohérente.</p>`,
    complete: `<ul><li>Vérifier : montant moyen et à la clôture (souvent maximisé en fin de mois), coût (dans l'EBITDA ou en financier ?), garantie du factor, clause de changement de contrôle (le programme peut s'arrêter au closing).</li><li>Si l'acheteur garde le programme, certains acceptent de le laisser hors net debt à condition que le peg soit calculé de la même façon (cohérence).</li><li>Risque de liquidité : l'arrêt de l'affacturage « consomme » immédiatement du cash.</li></ul>`,
    points: [[`Créances hors bilan : NWC bas`, ['hors bilan', 'sortent', 'nwc', 'bas']], [`C'est un financement → net debt`, ['financement', 'net debt', 'dette', 'debt-like']], [`Cohérence avec le peg`, ['peg', 'coheren']], [`Coût, changement de contrôle, liquidité`, ['cout', 'changement de controle', 'liquidit']]],
  }),
  q('203', 2, `Quels éléments du bilan exclus-tu du NWC, et pourquoi ?`, {
    courte: `<p>Les éléments <strong>non opérationnels</strong> ou <strong>liés au financement / à l'investissement</strong> : impôt sur les sociétés (courant et passé), dividendes à payer, capex creditors, intérêts courus, créances de cession d'actifs, comptes courants avec les actionnaires, éléments exceptionnels (litige réglé à encaisser). Ils vont en net debt (debt-like / cash-like) ou sont exclus.</p>`,
    complete: `<ul><li>Logique : le NWC doit refléter le <strong>cycle d'exploitation récurrent</strong> ; tout le reste fausse le peg.</li><li>Cas discutés : TVA (souvent dans le NWC), deferred revenue (NWC, débat debt-like), primes annuelles (NWC ou debt-like selon les dates), provisions d'exploitation récurrentes.</li><li>Chaque compte doit avoir une seule affectation (NWC, net debt, autre), reprise dans le SPA.</li></ul>`,
    points: [[`Impôt sur les sociétés`, ['impot', 'is ']], [`Dividendes / intérêts / comptes courants`, ['dividende', 'interet', 'compte courant']], [`Capex creditors / créances de cession`, ['immobilisation', 'capex', 'cession']], [`Raison : cycle d'exploitation récurrent`, ['exploitation', 'recurren', 'operationnel']]],
  }),
  q('204', 2, `Comment traites-tu les primes annuelles (bonus accruals) de l'exercice écoulé, payées après le closing ?`, {
    courte: `<p>C'est un coût de la <strong>période du vendeur</strong> payé avec le cash de l'acheteur : beaucoup d'acheteurs les classent en <strong>debt-like</strong>. Si on les laisse dans le NWC, il faut que le peg (moyenne mensuelle) les intègre correctement, sinon l'acheteur paie deux fois ou le vendeur est pénalisé.</p>`,
    complete: `<ul><li>Le profil mensuel des accruals de primes est en « dents de scie » (provisionnés au fil de l'année, payés en une fois) : la moyenne LTM ne correspond pas au niveau à la date de closing.</li><li>Solution propre : sortir les primes du NWC (et du peg) et traiter le solde dû au closing en debt-like (net de charges sociales et d'impôt selon la convention).</li></ul>`,
    points: [[`Coût de la période du vendeur`, ['periode du vendeur', 'passe', 'vendeur']], [`Debt-like fréquent`, ['debt-like', 'debt like']], [`Cohérence avec le peg (profil en dents de scie)`, ['peg', 'moyenne', 'coheren', 'double']]],
  }),
  calcul('205', 2, `Revenue TTC 60 M€, DSO 75 jours. Le plan de l'acheteur ramène le DSO à 60 jours. Quel cash est libéré (une seule fois) ?`, [
    ['Cash libéré', 2.47, 'M€', 0.03, 2],
  ], `<p>60 / 365 × (75 − 60) = 60 / 365 × 15 = <strong>2,47 M€</strong>.</p>
    <p><strong>À dire au recruteur</strong> : c'est un gain de trésorerie <strong>ponctuel</strong> (le NWC baisse une fois), pas un gain annuel d'EBITDA ; il n'entre donc pas dans l'adjusted EBITDA mais dans le cash flow du business plan (et ne doit pas être « payé » au vendeur via le peg).</p>`),
  q('206', 2, `Des dettes fournisseurs sont payées à 150 jours alors que la norme du secteur est 60 jours. NWC ou debt-like ?`, {
    courte: `<p>La <strong>part anormale</strong> (au-delà des conditions normales) est un <strong>financement caché</strong> par les fournisseurs : on peut la reclasser en <strong>debt-like</strong>. La part normale reste dans le NWC.</p>`,
    complete: `<ul><li>Analyse : balance âgée fournisseurs, conditions contractuelles, historique (retards nouveaux = signal de tension de trésorerie).</li><li>Cohérence : si on reclasse en debt-like, on retire la part anormale du NWC au closing <strong>et</strong> du calcul du peg.</li><li>Risque opérationnel : fournisseurs qui exigeront un paiement immédiat après le closing.</li></ul>`,
    exemple: `<p>Achats TTC 36,5 M€ par an : 90 jours de retard anormal ≈ 36,5 / 365 × 90 = <strong>9 M€</strong> de financement caché.</p>`,
    points: [[`Part anormale = financement`, ['anormal', 'financement', 'cache']], [`Reclassement en debt-like`, ['debt-like', 'debt like', 'reclass']], [`Cohérence avec le peg`, ['peg', 'coheren']], [`Signal de tension de trésorerie`, ['tension', 'tresorerie', 'signal']]],
  }),
  q('207', 2, `Qu'est-ce que le minimum cash (ou trapped cash) et pourquoi en discute-t-on ?`, {
    courte: `<p>Le <strong>minimum cash</strong> est la trésorerie nécessaire au fonctionnement courant (caisses des magasins, décalages intra-mois) ; le <strong>trapped cash</strong> est la trésorerie non disponible librement (nantie, filiale étrangère avec contraintes de rapatriement, dépôts). L'acheteur refuse de les payer comme du <strong>cash libre</strong> dans la net debt.</p>`,
    complete: `<ul><li>Négociation : le vendeur veut que tout le cash soit déduit de la net debt (augmente l'Equity Value) ; l'acheteur veut en exclure une partie.</li><li>Méthode : analyse du cash quotidien / mensuel, niveau minimum observé, contraintes juridiques et fiscales (retenues à la source sur dividendes).</li></ul>`,
    points: [[`Minimum cash = fonctionnement courant`, ['fonctionnement', 'caisse', 'minimum']], [`Trapped cash = non disponible`, ['nanti', 'bloque', 'filiale', 'rapatri', 'trapped']], [`Pas payé comme du cash libre`, ['cash libre', 'net debt', 'exclu']]],
  }),
  classer('208', 2, `Classe chaque poste du bilan.`,
    ['NWC opérationnel', 'Net debt (ou debt-like)', 'Au cas par cas'], [
      [`Créances clients`, 0, `Cœur du NWC.`],
      [`Stocks`, 0, `Cœur du NWC.`],
      [`Dettes fournisseurs dans les délais habituels`, 0, `Cœur du NWC.`],
      [`TVA et salaires du mois à payer`, 0, `Dettes courantes d'exploitation.`],
      [`Impôt sur les sociétés dû au titre d'exercices passés`, 1, `Lié aux résultats passés : debt-like.`],
      [`Capex creditors échus (machines déjà livrées)`, 1, `Investissement passé non payé : debt-like.`],
      [`Dividendes votés non versés`, 1, `Dette envers les actionnaires.`],
      [`Créance de CIR`, 2, `Cash-like si encaissable à court terme ; sinon hors NWC, à négocier.`],
      [`Primes annuelles de l'exercice passé, payées après le closing`, 1, `Souvent traitées en debt-like.`],
      [`Fournisseurs payés à 150 jours alors que la norme est 60 jours`, 2, `La part anormale peut être reclassée en debt-like.`],
    ], `<p>La frontière NWC / net debt se négocie : ce qui est en net debt baisse le prix euro pour euro, ce qui est en NWC entre dans le peg. L'important est de ne jamais compter un élément deux fois.</p>`),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Le NWC de la cible est très saisonnier (pic en juin) et le closing est prévu au 31 décembre, point bas. Quels sont les enjeux pour l'acheteur ?`, {
    courte: `<p>Au 31 décembre, le NWC est bas et la trésorerie haute. Avec un peg égal à la moyenne annuelle, le NWC livré sera <strong>sous le peg → prix en baisse</strong>, ce qui compense l'acheteur qui devra financer la remontée du NWC jusqu'au pic de juin. Le vendeur poussera pour un peg bas (ou « de décembre ») afin de garder ce cash : c'est le cœur de la négociation.</p>`,
    complete: `<ul><li><strong>Solution technique</strong> : un <strong>peg mensualisé</strong> (un niveau cible par mois de closing possible).</li><li><strong>Financement</strong> : l'acheteur doit prévoir le pic (RCF, affacturage) dans sa structure de dette.</li><li><strong>Net debt</strong> : la trésorerie saisonnière de décembre n'est pas du cash « excédentaire » : sans peg adapté, l'acheteur la paierait au vendeur puis devrait la remettre en juin.</li><li><strong>Locked box</strong> : la locked box date doit aussi tenir compte de la saisonnalité.</li></ul>`,
    exemple: `<p>NWC moyen 12 M€, NWC au 31/12 : 7 M€. Peg = moyenne → ajustement −5 M€ : l'acheteur paie 5 M€ de moins, qu'il réinjectera dans le NWC d'ici juin.</p>`,
    points: [[`NWC bas / cash haut au closing`, ['bas', 'cash', 'tresorerie', 'haut']], [`Sous le peg → prix en baisse`, ['peg', 'baisse', 'inferieur']], [`Enjeu de négociation du peg`, ['negoci', 'vendeur', 'peg bas']], [`Peg mensualisé`, ['mensualis', 'mensuel', 'par mois']], [`Financement du pic`, ['rcf', 'financement', 'pic', 'affacturage']]],
  }),
  q('302', 3, `Comment négocier le peg quand la cible est en forte croissance ?`, {
    courte: `<p>Une moyenne LTM <strong>sous-estime</strong> le NWC nécessaire au niveau d'activité futur. L'acheteur peut demander un peg fondé sur le <strong>NWC en % du revenue</strong> appliqué au revenue récent (ou prévu au closing), plutôt qu'une moyenne historique en valeur. Le vendeur préférera la moyenne historique.</p>`,
    complete: `<ul><li>Logique acheteur : si le revenue LTM moyen est 100 et le revenue annualisé au closing 130, le besoin en NWC est 30 % plus élevé que la moyenne.</li><li>Logique vendeur : la croissance future profite à l'acheteur, qui doit la financer.</li><li>Compromis : moyenne des 3 ou 6 derniers mois, ou NWC en jours de revenue appliqué au dernier trimestre annualisé.</li><li>Toujours chiffrer les deux options pour le client.</li></ul>`,
    exemple: `<p>NWC = 20 % du revenue. Revenue LTM moyen 100 → peg 20 ; revenue des 3 derniers mois annualisé 130 → peg « dynamique » 26. Écart de prix : 6.</p>`,
    points: [[`La moyenne LTM sous-estime le besoin`, ['sous-estim', 'moyenne', 'croissance']], [`Peg en % du revenue récent`, ['%', 'pourcentage', 'revenue', 'jours']], [`Positions acheteur vs vendeur`, ['acheteur', 'vendeur']], [`Compromis (3-6 derniers mois)`, ['compromis', 'derniers mois', 'trimestre']]],
  }),
  q('303', 3, `Une école privée a un NWC très négatif (frais de scolarité encaissés d'avance) et 15 M€ de trésorerie en septembre. Comment traites-tu ce cash dans le prix ?`, {
    courte: `<p>Ce cash est en grande partie <strong>l'argent des familles</strong> pour des cours pas encore donnés (deferred revenue) : l'acheteur devra assurer l'année scolaire sans réencaisser. Il ne veut pas le payer comme du <strong>cash libre</strong>. Solutions : garder le deferred revenue dans le NWC avec un <strong>peg moyen</strong> (en septembre, le NWC est bien plus négatif que le peg → l'ajustement de prix à la baisse compense le cash saisonnier), traiter une partie du deferred revenue en <strong>debt-like</strong> (au moins le coût restant à servir), ou choisir une date de closing neutre.</p>`,
    complete: `<ul><li>Analyse mensuelle : profil du cash et du deferred revenue sur l'année scolaire.</li><li>Approche « coût à servir » : debt-like = coût des cours restant à donner (pas le prix payé par les familles, la marge revenant à l'acheteur).</li><li>Cohérence : avec un peg moyen et la net debt réelle du closing, le cash saisonnier de septembre est compensé par l'ajustement de NWC ; c'est avec un peg du mois de septembre (ou en locked box, sans ajustement de NWC) que l'acheteur paierait ce cash saisonnier.</li><li>Risque : baisse des inscriptions → le financement par les familles se retourne.</li></ul>`,
    points: [[`Cash = argent des familles (deferred revenue)`, ['deferred revenue', 'avance', 'famille', 'produits constates']], [`Pas du cash libre`, ['cash libre', 'pas payer', 'exclu']], [`Peg adapté ou debt-like (coût à servir)`, ['peg', 'debt-like', 'cout', 'servir']], [`Date de closing / saisonnalité`, ['date', 'septembre', 'saison']]],
  }),
  q('304', 3, `Le DSO de la cible s'est dégradé de 15 jours en un an. Comment l'analyses-tu ?`, {
    courte: `<p>Je cherche si c'est un <strong>effet de mix</strong> (nouveaux clients ou pays avec des délais plus longs), une <strong>dégradation réelle</strong> (clients qui paient mal, litiges, créances douteuses non provisionnées), un <strong>effet de cut-off</strong> (revenue facturé en fin de période) ou la <strong>fin d'un affacturage</strong>. Chaque cause a un traitement différent.</p>`,
    complete: `<ul><li><strong>Balance âgée</strong> : part des créances > 60 / 90 jours, top débiteurs, litiges.</li><li><strong>DSO par segment</strong> : client, pays, canal.</li><li><strong>Revenue de fin de période</strong> et avoirs postérieurs.</li><li><strong>Conséquences</strong> : provision complémentaire (impact EBITDA et NWC), peg (le NWC moyen inclut des créances douteuses ?), business plan (le cash conversion futur).</li></ul>`,
    points: [[`Effet mix (nouveaux clients / pays)`, ['mix', 'nouveaux clients', 'pays', 'segment']], [`Dégradation réelle / créances douteuses`, ['douteu', 'retard', 'provision', 'litige']], [`Cut-off / fin d'affacturage`, ['cut-off', 'cut off', 'affacturage', 'factoring']], [`Balance âgée`, ['balance agee', 'age']], [`Conséquences : EBITDA, peg, BP`, ['ebitda', 'peg', 'business plan']]],
  }),
  q('305', 3, `Peg unique ou peg mensualisé : quels avantages et inconvénients ?`, {
    courte: `<p>Le <strong>peg unique</strong> (moyenne LTM) est simple et, combiné à la <strong>net debt réelle du closing</strong>, neutre face à la saisonnalité : un NWC au-dessus de la moyenne est payé au vendeur, mais le cash qui l'a financé manque dans la net debt. Le <strong>peg mensualisé</strong> (un niveau par mois) colle à la saisonnalité mais n'est cohérent qu'avec une <strong>net debt normalisée</strong> ; sinon il pénalise le vendeur qui signe au pic de NWC (et l'acheteur au creux). Il est aussi plus complexe à calculer et à négocier.</p>`,
    complete: `<ul><li>Principe clé : <strong>cohérence peg / net debt</strong>. Peg moyen ↔ net debt réelle du closing ; peg mensualisé ↔ net debt normalisée (moyenne).</li><li>Peg unique : la solution la plus courante ; vérifier que la moyenne LTM reflète bien le niveau normal (croissance, changement de délais clients ou fournisseurs).</li><li>Peg mensualisé : quand les parties raisonnent sur une net debt normalisée ; il exige des données mensuelles fiables et se négocie mois par mois.</li><li>Alternative : peg unique + fourchette (collar) sans ajustement dans une bande, pour éviter les petits litiges.</li></ul>`,
    exemple: `<p>NWC moyen 100, net debt moyenne 50, EV 500. Closing au pic : NWC 130, net debt 80. Peg moyen : 500 − 80 + (130 − 100) = 450, comme en moyenne d'année. Peg du mois (130) avec la net debt réelle : 500 − 80 + 0 = 420 → le vendeur perd 30, que l'acheteur récupérera quand le NWC redescendra.</p>`,
    points: [[`Cohérence peg / net debt`, ['coheren', 'net debt', 'dette']], [`Peg unique : simple, neutre avec la net debt réelle`, ['simple', 'unique', 'moyenne']], [`Peg mensualisé : suit la saisonnalité, avec une net debt normalisée`, ['mensualis', 'mensuel', 'saison']], [`Complexité / données mensuelles`, ['complex', 'donnees']], [`Collar / fourchette`, ['collar', 'fourchette', 'bande']]],
  }),
]);
