// TS — IFRS et sujets d'actualité
import { q, theme } from '../fabriques.js';

export default theme('ts', 'ifrs', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Explique IFRS 16 en deux phrases.`, {
    courte: `<p>Côté preneur, presque toutes les locations sont <strong>au bilan</strong> : un droit d'utilisation à l'actif et une <strong>lease liability</strong> au passif. Les loyers sont remplacés au P&L par de la <strong>D&A</strong> et des <strong>intérêts</strong> : l'EBITDA monte, la dette aussi.</p>`,
    complete: `<ul><li>Cash flow : la part « remboursement » des loyers passe en financing → le cash flow from operations augmente, sans changer le cash total.</li><li>Exemptions : contrats courts (≤ 12 mois) et de faible valeur.</li><li>En deal : choisir pre- ou post-IFRS 16 et rester cohérent (EBITDA, net debt, multiple, covenants).</li></ul>`,
    points: [[`Locations au bilan (droit d'utilisation + lease liability)`, ['bilan', 'droit d utilisation', 'lease liability', 'dette locative']], [`Loyers → D&A + intérêts`, ['d&a', 'amortissement', 'interet']], [`EBITDA et dette en hausse`, ['ebitda', 'hausse', 'dette']]],
  }),
  q('102', 1, `Quel est le principe d'IFRS 15 (revenue) ?`, {
    courte: `<p>Le revenue est reconnu quand le <strong>contrôle</strong> du bien ou du service est <strong>transféré</strong> au client, selon 5 étapes : identifier le contrat, les obligations de performance, le prix, l'allouer aux obligations, reconnaître le revenue quand (ou au fur et à mesure que) chaque obligation est remplie.</p>`,
    complete: `<ul><li>Sujets FDD : reconnaissance à l'avancement (projets), contrats multi-éléments (logiciel + maintenance), remises et rebates, agent vs principal, cut-off.</li><li>Un changement de méthode peut déplacer du revenue entre périodes : à neutraliser pour comparer.</li></ul>`,
    points: [[`Transfert du contrôle`, ['controle', 'transfert']], [`5 étapes`, ['5 etapes', 'cinq', 'obligation', 'contrat']], [`Sujets : avancement, multi-éléments, agent/principal`, ['avancement', 'multi', 'agent', 'principal']]],
  }),
  q('103', 1, `Qu'est-ce qu'IFRS 18 et quand s'applique-t-elle ?`, {
    courte: `<p><strong>IFRS 18</strong> remplace IAS 1 (présentation des états financiers) pour les exercices ouverts à compter du <strong>1er janvier 2027</strong>, avec retraitement des comparatifs. Elle impose de nouvelles <strong>catégories</strong> et de nouveaux <strong>sous-totaux</strong> au compte de résultat et l'encadrement des <strong>MPM</strong> (indicateurs comme l'adjusted EBITDA).</p>`,
    complete: `<ul><li>Catégories : exploitation, investissement, financement, impôt, activités abandonnées.</li><li>Sous-totaux obligatoires : résultat opérationnel, résultat avant financement et impôt.</li><li>MPM : publiés dans une note auditée, avec justification, calcul et rapprochement avec les sous-totaux IFRS.</li></ul>`,
    conseil: `Sujet d'actualité idéal pour montrer ta veille : prépare 3 phrases dessus.`,
    points: [[`Remplace IAS 1`, ['ias 1', 'remplace']], [`1er janvier 2027`, ['2027']], [`Catégories / sous-totaux`, ['categorie', 'sous-total', 'sous total']], [`MPM`, ['mpm', 'indicateur', 'adjusted']]],
  }),
  q('104', 1, `Le goodwill est-il amorti en IFRS ?`, {
    courte: `<p><strong>Non</strong> : en IFRS, le goodwill n'est pas amorti ; il fait l'objet d'un <strong>impairment test</strong> au moins une fois par an (IAS 36). En PCG, le fonds commercial est présumé à durée non limitée (non amorti mais testé), avec des exceptions.</p>`,
    complete: `<ul><li>Une dépréciation de goodwill n'affecte ni le cash ni l'EBITDA, mais réduit le résultat et les capitaux propres.</li><li>Signal : une dépréciation importante suggère qu'une acquisition passée a été payée trop cher ou sous-performe.</li></ul>`,
    points: [[`Non amorti`, ['non', 'pas amorti']], [`Impairment test annuel`, ['impairment', 'test', 'deprecia']], [`Pas d'effet cash / EBITDA`, ['cash', 'ebitda']]],
  }),
  q('105', 1, `Quelles sont les principales différences PCG / IFRS à connaître en FDD ?`, {
    courte: `<p><strong>IFRS 16</strong> (locations au bilan), <strong>goodwill</strong> (non amorti en IFRS), <strong>pensions</strong> (provisionnées en IFRS, parfois en annexe en PCG), <strong>coûts de développement</strong> (capitalisation obligatoire sous critères en IFRS), <strong>résultat exceptionnel</strong> (n'existe pas en IFRS), présentation du <strong>CIR</strong>.</p>`,
    complete: `<ul><li>Pour comparer deux périodes ou deux cibles, on ramène les chiffres à une convention commune.</li><li>Les covenants bancaires définissent leur propre référentiel (souvent figé à la signature : « frozen GAAP »).</li></ul>`,
    points: [[`IFRS 16`, ['ifrs 16', 'location']], [`Goodwill`, ['goodwill']], [`Pensions`, ['pension', 'retraite']], [`Développement / exceptionnel / CIR`, ['developpement', 'exceptionnel', 'cir']]],
  }),
  q('106', 1, `Qu'est-ce qu'un deferred tax asset ?`, {
    courte: `<p>Un <strong>impôt différé actif</strong> : une économie d'impôt future reconnue au bilan, par exemple sur des <strong>tax losses carried forward</strong> ou des différences temporaires (provisions non encore déductibles). On ne le reconnaît que si son utilisation future est <strong>probable</strong> (IAS 12).</p>`,
    complete: `<ul><li>En deal, ce n'est pas du cash : sa valeur dépend des bénéfices futurs, du calendrier et des règles d'utilisation (plafonnement).</li><li>L'acheteur ne le paie généralement pas à sa valeur comptable.</li></ul>`,
    points: [[`Économie d'impôt future`, ['economie', 'impot', 'futur']], [`Exemple : déficits reportables`, ['deficit', 'tax losses', 'report']], [`Utilisation probable`, ['probable', 'benefice']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Pourquoi un TS doit-il s'intéresser à IFRS 18 ?`, {
    courte: `<p>Parce qu'IFRS 18 touche directement nos chiffres : les <strong>MPM</strong> (dont l'adjusted EBITDA) seront publiés, justifiés et <strong>réconciliés</strong> dans une note auditée ; les <strong>comparatifs</strong> seront retraités ; et les définitions d'EBITDA utilisées dans les <strong>covenants</strong>, les <strong>earn-outs</strong> et les <strong>SPA</strong> devront être revues.</p>`,
    complete: `<ul><li><strong>Bridges historiques</strong> : les séries d'EBITDA d'avant et d'après 2027 ne seront pas présentées de la même façon → réconcilier.</li><li><strong>Plus de transparence</strong> : un adjusted EBITDA publié et audité devient une base de discussion, mais les adjustments de la FDD restent spécifiques au deal.</li><li><strong>Contrats</strong> : figer le référentiel (« frozen GAAP ») ou prévoir l'effet du changement de norme.</li></ul>`,
    conseil: `Formule à retenir : « IFRS 18 ne tue pas l'adjusted EBITDA, il oblige à l'expliquer et à le réconcilier ».`,
    points: [[`MPM publiés et réconciliés`, ['mpm', 'reconcil', 'publi']], [`Comparatifs retraités`, ['comparati', 'retrait']], [`Covenants / earn-outs / SPA à revoir`, ['covenant', 'earn', 'spa']], [`Frozen GAAP`, ['frozen', 'fige', 'referentiel']]],
  }),
  q('202', 2, `IFRS 15 : quel est l'impact d'un passage de « principal » à « agent » ?`, {
    courte: `<p>En <strong>agent</strong>, la société ne reconnaît en revenue que sa <strong>commission</strong> (net) au lieu du montant total (brut) : le <strong>revenue baisse</strong> fortement, la <strong>marge en valeur ne change pas</strong>, le taux de marge en % monte.</p>`,
    complete: `<ul><li>Critère : la société contrôle-t-elle le bien ou le service avant de le transférer (risque de stock, liberté de prix, responsabilité principale) ?</li><li>FDD : retraiter les périodes pour comparer la croissance et les marges ; attention aux multiples d'EV/Sales.</li></ul>`,
    exemple: `<p>Plateforme : 100 de ventes, commission 15. Principal : revenue 100, marge 15 (15 %). Agent : revenue 15, marge 15 (100 %).</p>`,
    points: [[`Agent : revenue = commission`, ['commission', 'net', 'agent']], [`Revenue baisse, marge en valeur inchangée`, ['baisse', 'inchang', 'marge']], [`Critère : contrôle du bien`, ['controle', 'risque', 'stock']], [`Retraiter pour comparer`, ['retrait', 'compar']]],
  }),
  q('203', 2, `IFRS 16 : quel impact sur le cash flow statement et la cash conversion ?`, {
    courte: `<p>La part <strong>remboursement</strong> de la lease liability passe en <strong>financing</strong> : le cash flow from operations augmente mécaniquement, sans que la trésorerie totale change. La cash conversion « EBITDA − capex » paraît meilleure : il faut déduire les loyers pour comparer avec une société en PCG.</p>`,
    complete: `<ul><li>Les intérêts sur la lease liability sont en operating ou en financing selon le choix de présentation.</li><li>En FDD : présenter un free cash flow « après loyers » (pre-IFRS 16) pour juger la capacité de remboursement de la dette financière.</li></ul>`,
    points: [[`Remboursement des leases en financing`, ['financing', 'financement', 'remboursement']], [`Cash flow from operations en hausse`, ['operations', 'exploitation', 'hausse']], [`Trésorerie totale inchangée`, ['inchang', 'meme']], [`Déduire les loyers pour comparer`, ['loyer', 'compar', 'pre-ifrs']]],
  }),
  q('204', 2, `Pourquoi la CSRD intéresse-t-elle les deals ?`, {
    courte: `<p>Elle impose la publication d'informations <strong>ESG vérifiées</strong> (normes ESRS) : les acheteurs et les LP des fonds s'y appuient, et les <strong>risques réglementaires et de transition</strong> (coûts de mise en conformité, émissions, chaîne d'approvisionnement) entrent dans la DD et parfois dans le prix.</p>`,
    complete: `<ul><li>Le paquet <strong>Omnibus</strong> (2025-2026) a réduit le périmètre des sociétés concernées et décalé des obligations ; selon le guide Chambers 2026, des ESRS révisées (beaucoup moins de points de données) ont été adoptées par la Commission en juillet 2026, encore soumises au Parlement et au Conseil.</li><li>En pratique : ESG DD, KPI ESG dans le reporting, sustainability-linked loans.</li></ul>`,
    points: [[`Informations ESG publiées et vérifiées`, ['esg', 'durabilit', 'publi', 'esrs']], [`Risques réglementaires / transition`, ['risque', 'transition', 'reglement']], [`Omnibus / périmètre réduit`, ['omnibus', 'reduit', 'perimetre']]],
  }),
  q('205', 2, `Pensions (IAS 19) : qu'est-ce qui est concerné en France et pourquoi est-ce un sujet de deal ?`, {
    courte: `<p>En France, surtout les <strong>indemnités de fin de carrière</strong> (IFC) prévues par les conventions collectives. En IFRS elles sont provisionnées (calcul actuariel) ; en PCG elles peuvent ne figurer qu'en annexe. Pour l'acheteur, c'est une dette envers les salariés liée au passé : un <strong>debt-like</strong> (net of tax).</p>`,
    complete: `<ul><li>Le montant dépend des hypothèses (taux d'actualisation, augmentations de salaires, turnover, âge de départ).</li><li>Enjeu bien plus lourd dans les pays à régimes à prestations définies (Allemagne, Royaume-Uni).</li></ul>`,
    points: [[`Indemnités de fin de carrière`, ['fin de carriere', 'ifc', 'retraite']], [`Provisionnées en IFRS / annexe en PCG`, ['provision', 'annexe', 'pcg']], [`Debt-like net of tax`, ['debt-like', 'debt like', 'net']], [`Hypothèses actuarielles`, ['actuari', 'hypothese', 'taux']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Tu compares deux cibles, l'une en PCG, l'autre en IFRS. Comment les rends-tu comparables ?`, {
    courte: `<p>Je ramène les deux à une <strong>convention commune</strong> (souvent pre-IFRS 16) en retraitant les postes qui diffèrent : <strong>loyers</strong> (IFRS 16), <strong>coûts de développement capitalisés</strong>, <strong>CIR</strong> et autres subventions, <strong>pensions</strong>, <strong>résultat exceptionnel</strong> reclassé, définition de l'EBITDA (bad debts, provisions sur stocks).</p>`,
    complete: `<ul><li>EBITDA : même définition (avant / après loyers, R&D capitalisée ou non, CIR dedans ou dehors).</li><li>Net debt : mêmes éléments (leases, pensions, affacturage).</li><li>NWC : mêmes conventions (deferred revenue, provisions).</li><li>Multiples de comparables : vérifier leur convention (post-IFRS 16 pour les cotées).</li></ul>`,
    points: [[`Convention commune`, ['convention', 'commune', 'meme']], [`Loyers / IFRS 16`, ['loyer', 'ifrs 16']], [`R&D / CIR / pensions / exceptionnel`, ['r&d', 'developpement', 'cir', 'pension', 'exceptionnel']], [`Cohérence EBITDA, net debt, NWC, multiples`, ['net debt', 'nwc', 'multiple', 'coheren']]],
  }),
  q('302', 3, `Sous IFRS 18, l'adjusted EBITDA devient un MPM publié. Quel impact sur les covenants et les earn-outs ?`, {
    courte: `<p>Les contrats qui renvoient à « l'EBITDA tel que publié » risquent de voir leur base <strong>changer de définition</strong> au passage à IFRS 18. Il faut <strong>figer la définition</strong> (frozen GAAP, exemple chiffré en annexe) ou prévoir un mécanisme d'ajustement, et réconcilier l'EBITDA contractuel avec le MPM publié.</p>`,
    complete: `<ul><li>Covenants : un EBITDA calculé différemment peut créer ou masquer un bris de covenant sans changement économique.</li><li>Earn-outs : le vendeur et l'acheteur peuvent se disputer sur la version de l'EBITDA à retenir.</li><li>Positif : le MPM publié et audité réduit l'opacité des adjustments du management.</li></ul>`,
    points: [[`Changement de définition`, ['definition', 'change']], [`Figer / frozen GAAP / annexe`, ['frozen', 'fige', 'annexe']], [`Covenants : bris sans changement économique`, ['covenant', 'bris']], [`Earn-outs : litiges`, ['earn', 'litige']]],
  }),
  q('303', 3, `Pourquoi mélanger multiples pre-IFRS 16 et post-IFRS 16 est-il un piège ? Illustre.`, {
    courte: `<p>Parce qu'un EBITDA post-IFRS 16 est <strong>plus élevé</strong> (loyers exclus) et va avec une dette plus élevée (lease liabilities) et des multiples <strong>plus bas</strong>. Appliquer un multiple « pre » à un EBITDA « post » (ou oublier les leases en net debt) <strong>surévalue</strong> la société.</p>`,
    exemple: `<p>EBITDA pre 16, loyers 4 → EBITDA post 20 ; lease liability 22 ; dette financière nette 50. Multiple de comparables pre-IFRS 16 : 9x.<br>Bon calcul (pre) : 9 × 16 − 50 = <strong>94</strong>.<br>Erreur : 9 × 20 − 50 = 130 (+36 de valeur fictive) ; même en ajoutant les leases (130 − 22 = 108), on reste trop haut car le multiple « post » devrait être plus bas (~8,3x).</p>`,
    complete: `<ul><li>Règle : EBITDA, multiple, net debt et covenants sur la <strong>même convention</strong>.</li><li>Les multiples des sociétés cotées publiés par les data providers sont souvent post-IFRS 16 : vérifier.</li></ul>`,
    points: [[`EBITDA post plus élevé / multiples plus bas`, ['plus eleve', 'plus bas', 'multiple']], [`Leases en dette`, ['lease', 'dette locative']], [`Exemple chiffré de surévaluation`, ['exemple', 'sureval', '9 x', '9x']], [`Même convention partout`, ['meme convention', 'coheren']]],
  }),
]);
