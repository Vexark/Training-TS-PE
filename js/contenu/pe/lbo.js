// PE — Mécanique du LBO et value creation
import { q, calcul, theme } from '../fabriques.js';

export default theme('pe', 'lbo', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Explique ce qu'est un LBO.`, {
    courte: `<p>Un <strong>Leveraged Buy-Out</strong> est le rachat d'une société par une <strong>HoldCo</strong> créée pour l'occasion, financée par de l'<strong>equity</strong> (fonds + management) et majoritairement par une <strong>dette d'acquisition</strong>. La dette est remboursée grâce aux <strong>cash flows de la cible</strong>, remontés à la HoldCo (dividendes, tax consolidation). À l'exit, le fonds récupère la valeur de l'equity, augmentée par la croissance de l'EBITDA et le deleveraging.</p>`,
    complete: `<ul><li><strong>Levier financier</strong> : la dette coûte moins que la rentabilité de l'actif → le rendement de l'equity augmente.</li><li><strong>Levier fiscal</strong> : intérêts déductibles via la tax consolidation (dans les limites légales).</li><li><strong>Levier juridique</strong> : contrôler la société avec une mise réduite.</li><li><strong>Levier managérial</strong> : le management investit (management package) et s'aligne avec le fonds.</li></ul>`,
    exemple: `<p>EBITDA 20, prix 10x = 200 ; dette 4x = 80 ; equity 120. Cinq ans plus tard : EBITDA 30, exit 10x = 300, dette résiduelle 30 → equity 270 → <strong>2,25x</strong>, ~18 % d'IRR.</p>`,
    pieges: [`Dire que la dette est portée par la cible sans parler de la HoldCo.`, `Oublier que la dette doit être remboursée par les cash flows (d'où le profil de cible).`],
    relances: [[`Pourquoi ne pas tout financer en equity ?`, `L'IRR serait plus bas : avec moins d'equity pour la même plus-value absolue, le rendement de l'equity augmente (tant que la rentabilité de l'actif dépasse le coût de la dette).`]],
    conseil: `Question citée dans tous les guides d'entretien PE : explique-la étape par étape, puis donne un exemple chiffré.`,
    points: [[`HoldCo / NewCo`, ['holding', 'holdco', 'newco']], [`Equity + dette d'acquisition`, ['equity', 'fonds propres', 'dette']], [`Remboursement par les cash flows de la cible`, ['cash flow', 'dividende', 'rembours', 'flux']], [`Effets de levier`, ['levier', 'leverage', 'fiscal', 'juridique']], [`Exemple chiffré`, ['x', 'exemple', 'irr', 'moic']]],
  }),
  q('102', 1, `Quels sont les 3 leviers de value creation d'un LBO ?`, {
    courte: `<p><strong>EBITDA growth</strong> (croissance organique, build-ups, pricing, efficacité opérationnelle), <strong>multiple expansion</strong> (revendre à un multiple plus élevé), <strong>deleveraging</strong> (rembourser la dette avec les cash flows).</p>`,
    complete: `<ul><li>Depuis la hausse des taux de 2022-2023, la multiple expansion est moins fiable et le deleveraging plus coûteux : l'<strong>EBITDA growth</strong> (organique et buy-and-build) porte l'essentiel de la value creation.</li><li>Les comités préfèrent un dossier qui marche <strong>sans</strong> multiple expansion.</li></ul>`,
    points: [[`EBITDA growth`, ['ebitda', 'croissance']], [`Multiple expansion`, ['multiple']], [`Deleveraging`, ['deleverag', 'desendett', 'dette', 'rembours']], [`EBITDA growth prioritaire aujourd'hui`, ['priorit', 'taux', 'operationnel']]],
  }),
  q('103', 1, `Quel est le profil de cible idéal pour un LBO ?`, {
    courte: `<p>Des <strong>cash flows stables et prévisibles</strong> (revenus récurrents, peu cyclique), une <strong>forte cash conversion</strong> (peu de capex, NWC maîtrisé), une <strong>position de marché solide</strong> (moat), un <strong>management de qualité</strong>, des <strong>leviers de croissance</strong> (organique, build-ups) et une <strong>exit</strong> identifiable.</p>`,
    pieges: [`Proposer une start-up non rentable ou une société très cyclique avec beaucoup de capex sans adapter le levier.`],
    points: [[`Cash flows stables et prévisibles`, ['stable', 'previsib', 'recurren']], [`Cash conversion élevée`, ['cash conversion', 'capex', 'nwc', 'bfr']], [`Position de marché / moat`, ['position', 'leader', 'moat', 'barriere']], [`Management`, ['management', 'dirigeant']], [`Leviers de croissance / exit`, ['croissance', 'build', 'exit', 'sortie']]],
  }),
  q('104', 1, `Pourquoi la dette augmente-t-elle l'IRR ?`, {
    courte: `<p>Parce que, pour une même plus-value en valeur absolue, l'<strong>equity investie est plus faible</strong> : le rendement en pourcentage augmente, tant que la <strong>rentabilité de l'actif dépasse le coût de la dette</strong> (après impôt). Formule : <strong>Re = Ra + (Ra − i) × D/E</strong>.</p>`,
    exemple: `<p>Actif à 10 % de rendement, dette à 5 %, D/E = 1,5 → Re = 10 % + 5 % × 1,5 = <strong>17,5 %</strong>. Si l'actif ne rapporte plus que 4 % : Re = 4 % − 1 % × 1,5 = 2,5 %.</p>`,
    points: [[`Moins d'equity pour la même plus-value`, ['moins d equity', 'mise', 'plus faible']], [`Tant que rentabilité > coût de la dette`, ['cout de la dette', 'superieur', 'rentabilite']], [`Formule Re = Ra + (Ra − i) × D/E`, ['ra', 'd/e', 'formule']], [`Le levier amplifie aussi les pertes`, ['perte', 'amplif', 'risque']]],
  }),
  q('105', 1, `À quoi sert la HoldCo (NewCo) dans un LBO ?`, {
    courte: `<p>C'est la société créée pour <strong>acheter la cible</strong> : elle reçoit l'equity du fonds et du management, <strong>porte la dette d'acquisition</strong> et rembourse grâce aux <strong>dividendes</strong> remontés de la cible (OpCo), avec la <strong>tax consolidation</strong> pour déduire ses intérêts des bénéfices de la cible.</p>`,
    complete: `<ul><li>Elle permet de séparer la dette d'acquisition des dettes opérationnelles de la cible.</li><li>Conséquence : <strong>structural subordination</strong> des prêteurs de la HoldCo.</li><li>Il peut y avoir plusieurs étages (TopCo pour le management package, MidCo pour une dette PIK, BidCo pour la senior).</li></ul>`,
    points: [[`Achète la cible`, ['achat', 'rachat', 'acquier']], [`Porte la dette d'acquisition`, ['dette', 'porte']], [`Dividendes remontés / tax consolidation`, ['dividende', 'integration fiscale', 'tax consolidation', 'remont']]],
  }),
  q('106', 1, `Qu'est-ce que le buy-and-build ?`, {
    courte: `<p>Une stratégie où une <strong>platform</strong> rachète des sociétés plus petites (<strong>add-ons</strong>), souvent à des multiples plus bas, pour créer un leader : value creation par la <strong>taille</strong> (pouvoir de négociation, densité), les <strong>synergies</strong> et le <strong>multiple arbitrage</strong> (l'ensemble se revend à un multiple plus élevé).</p>`,
    complete: `<ul><li>Particulièrement adapté aux marchés <strong>fragmentés</strong> (services B2B, santé, TIC, distribution spécialisée).</li><li>Selon le guide Chambers 2026, les add-ons représentaient plus de 50 % du nombre de deals PE en France au S1 2026.</li><li>Risques : intégration, surpayer les cibles, dette d'acquisition qui monte.</li></ul>`,
    points: [[`Platform + add-ons`, ['plateforme', 'platform', 'add-on', 'acquisition']], [`Multiple arbitrage`, ['multiple', 'arbitrage']], [`Synergies / taille`, ['synergie', 'taille']], [`Marchés fragmentés`, ['fragment']]],
  }),
  q('107', 1, `MBO, MBI, OBO, SBO : quelles différences ?`, {
    courte: `<p><strong>MBO</strong> : le management en place rachète avec un fonds. <strong>MBI</strong> : une équipe externe reprend avec un fonds. <strong>OBO</strong> : le dirigeant-actionnaire cède une partie de ses titres à une HoldCo qu'il contrôle avec un fonds (il encaisse et garde la main). <strong>SBO</strong> : un fonds revend à un autre fonds (secondary buyout).</p>`,
    points: [[`MBO : management en place`, ['mbo', 'en place']], [`MBI : management externe`, ['mbi', 'externe']], [`OBO : dirigeant-actionnaire`, ['obo', 'owner', 'dirigeant']], [`SBO : fonds à fonds`, ['sbo', 'secondaire', 'fonds a fonds', 'sponsor']]],
  }),
  q('108', 1, `Qu'est-ce qu'un dividend recap ?`, {
    courte: `<p>La société (ou la HoldCo) <strong>se réendette</strong> pour verser un <strong>dividende</strong> aux actionnaires : le fonds récupère du cash <strong>sans exit</strong>. L'IRR et le DPI augmentent ; le multiple change peu (voire baisse avec le coût de la nouvelle dette) ; le risque financier augmente.</p>`,
    points: [[`Réendettement pour verser un dividende`, ['reendett', 'dette', 'dividende']], [`Cash sans exit`, ['sans exit', 'sans sortie', 'sans cession']], [`IRR / DPI en hausse, multiple stable`, ['irr', 'tri', 'dpi', 'multiple']], [`Risque financier en hausse`, ['risque']]],
  }),
  q('109', 1, `Qu'est-ce qu'un add-on, et pourquoi est-il souvent moins cher que la platform ?`, {
    courte: `<p>Une société plus petite rachetée par une participation (bolt-on). Elle est souvent moins chère car <strong>plus petite</strong> (moins d'acheteurs, plus de risque, moins de structuration), parfois <strong>moins professionnalisée</strong>, et le vendeur (souvent un fondateur) n'organise pas toujours d'enchères.</p>`,
    exemple: `<p>Platform achetée 10x ; add-ons achetés 6-7x. Une fois intégrés, l'EBITDA des add-ons est valorisé au multiple de l'ensemble à l'exit.</p>`,
    points: [[`Société plus petite rachetée par la participation`, ['petite', 'rachet', 'participation', 'bolt']], [`Moins chère : taille, risque, moins d'acheteurs`, ['taille', 'risque', 'acheteur', 'enchere']], [`Valorisée au multiple de l'ensemble à l'exit`, ['multiple', 'ensemble', 'exit']]],
  }),
  q('110', 1, `Qu'est-ce qu'un primary LBO et qu'est-ce qui le rend attractif ?`, {
    courte: `<p>Le premier passage sous LBO d'une société, vendue par un <strong>fondateur</strong>, une <strong>famille</strong> ou un <strong>groupe</strong>. Attractif car il y a souvent beaucoup de <strong>leviers « faciles »</strong> : professionnalisation (DAF, reporting), pricing, build-ups, international — et parfois un prix d'entrée plus raisonnable qu'en SBO.</p>`,
    points: [[`Premier LBO`, ['premier', 'primaire', 'primary']], [`Vendeur fondateur / famille / groupe`, ['fondateur', 'famille', 'groupe']], [`Leviers de professionnalisation`, ['professionnalis', 'daf', 'reporting', 'levier']]],
  }),
  q('111', 1, `Pourquoi un fonds n'utilise-t-il pas 100 % de dette ?`, {
    courte: `<p>Parce que les <strong>prêteurs</strong> ne le permettent pas (ils exigent un coussin d'equity : souvent 40-60 % des ressources en mid-cap), que la société doit pouvoir <strong>servir sa dette</strong> même si la performance baisse, et que trop de levier augmente le <strong>risque de défaut</strong> et fait perdre l'equity.</p>`,
    points: [[`Exigence des prêteurs / coussin d'equity`, ['preteur', 'banque', 'coussin', '%']], [`Capacité à servir la dette`, ['servir', 'rembours', 'cash flow', 'capacite']], [`Risque de défaut`, ['defaut', 'risque', 'covenant']]],
  }),
  q('112', 1, `Comment le fonds crée-t-il de la valeur opérationnelle dans une participation ?`, {
    courte: `<p>Par un plan concret avec le management : <strong>croissance</strong> (commerciale, nouveaux marchés, international, digital), <strong>pricing</strong>, <strong>efficacité</strong> (achats, productivité, organisation), <strong>buy-and-build</strong>, <strong>professionnalisation</strong> (DAF, reporting, gouvernance, recrutements clés) et pilotage du <strong>cash</strong> (NWC, capex).</p>`,
    complete: `<ul><li>Outils : 100-day plan, KPI suivis mensuellement, board trimestriel, équipes « value creation » / operating partners dans les grands fonds.</li></ul>`,
    points: [[`Croissance commerciale / international`, ['croissance', 'commercial', 'international', 'digital']], [`Pricing / efficacité`, ['prix', 'pricing', 'achat', 'productivit']], [`Buy-and-build`, ['build', 'acquisition']], [`Professionnalisation / cash`, ['daf', 'reporting', 'cash', 'nwc', 'gouvernance']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `À quoi sert la tax consolidation (intégration fiscale) dans un LBO, et quelles sont ses limites ?`, {
    courte: `<p>Si la HoldCo détient <strong>au moins 95 %</strong> de la cible, elles forment un groupe fiscal : les <strong>intérêts de la dette d'acquisition</strong> s'imputent sur les <strong>bénéfices de la cible</strong>, ce qui réduit l'impôt. Limites : plafonnement de la déductibilité (le plus élevé de <strong>3 M€ ou 30 % de l'EBITDA fiscal</strong>), amendement Charasse, règles de sous-capitalisation.</p>`,
    exemple: `<p>Intérêts 4 M€, EBITDA fiscal 10 M€ → plafond = max(3 ; 3) = 3 M€ déductibles ; 1 M€ reportable. À 25 %, l'économie d'impôt est de 0,75 M€ au lieu de 1 M€.</p>`,
    points: [[`Seuil de 95 %`, ['95']], [`Intérêts imputés sur les bénéfices de la cible`, ['interet', 'benefice', 'impute', 'deduct']], [`Plafond 3 M€ / 30 % EBITDA fiscal`, ['3 m', '30 %', '30%', 'plafon']], [`Charasse / sous-capitalisation`, ['charasse', 'sous-capital']]],
  }),
  q('202', 2, `Qu'est-ce que la structural subordination ?`, {
    courte: `<p>Les prêteurs de la <strong>HoldCo</strong> n'ont de droits que sur les titres de la cible : ils sont payés <strong>après tous les créanciers de la cible</strong> (fournisseurs, salariés, dettes opérationnelles), car la HoldCo ne perçoit que des dividendes. Leur risque est donc plus élevé.</p>`,
    complete: `<ul><li>Parades : nantissement des titres, garanties de la cible (upstream guarantees, limitées par le droit des sociétés), dette logée au plus près de l'OpCo, interdiction de dette prioritaire à l'OpCo.</li></ul>`,
    points: [[`Prêteurs HoldCo payés après la cible`, ['apres', 'cible', 'creancier']], [`HoldCo ne perçoit que des dividendes`, ['dividende']], [`Parades : nantissement, garanties`, ['nantiss', 'garantie', 'surete']]],
  }),
  q('203', 2, `Qu'est-ce que l'amendement Charasse et quand s'applique-t-il ?`, {
    courte: `<p>Une règle anti-abus qui limite la déduction des frais financiers quand une HoldCo rachète une société à des <strong>actionnaires qui contrôlent (ou contrôleront) la HoldCo</strong> : typiquement un <strong>OBO</strong> où le dirigeant « se revend » sa société. Les frais financiers sont alors partiellement réintégrés (en général pendant plusieurs années).</p>`,
    points: [[`Anti-abus sur la déduction des intérêts`, ['deduct', 'frais financiers', 'interet', 'abus']], [`Rachat à ses propres actionnaires`, ['propres actionnaires', 'soi-meme', 'controle']], [`Cas typique : OBO`, ['obo', 'owner']]],
  }),
  calcul('204', 2, `Une platform achetée 10x l'EBITDA rachète un add-on de 2 M€ d'EBITDA à 6x. À l'exit, l'ensemble est valorisé 10x. Valeur créée par le seul multiple arbitrage sur l'add-on ?`, [
    ['Valeur créée', 8, 'M€', 0.05],
  ], `<p>Payé 2 × 6 = 12 ; valorisé 2 × 10 = 20 ; gain = 2 × (10 − 6) = <strong>8 M€</strong>, avant toute synergie.</p>
    <p><strong>À dire au recruteur</strong> : c'est l'un des moteurs du buy-and-build, mais il suppose que l'add-on soit vraiment intégré (sinon l'acheteur final ne paiera pas 10x pour cet EBITDA) et que le multiple de l'ensemble tienne.</p>`),
  q('205', 2, `Dividend recap : quel effet sur l'IRR et le MOIC ? Illustre.`, {
    courte: `<p>L'<strong>IRR augmente</strong> (le cash revient plus tôt), le <strong>DPI</strong> augmente, mais le <strong>MOIC change peu ou baisse</strong> : la dette supplémentaire et ses intérêts réduisent la valeur de l'equity à l'exit.</p>`,
    exemple: `<p>Equity 100. Sans recap : exit à 250 en année 5 → 2,5x, IRR 20,1 %. Avec recap : dividende de 50 en année 3, exit à 192,5 (dette + intérêts) → MOIC 2,43x, IRR ≈ 21,6 % : IRR en hausse, multiple en baisse.</p>`,
    points: [[`IRR en hausse (cash plus tôt)`, ['irr', 'tri', 'hausse', 'plus tot']], [`MOIC stable ou en baisse`, ['moic', 'multiple', 'baisse']], [`DPI en hausse`, ['dpi']], [`Exemple chiffré`, ['exemple', 'x', '%']]],
  }),
  q('206', 2, `Plus de levier signifie-t-il toujours plus d'IRR ?`, {
    courte: `<p><strong>Non</strong>. Le levier amplifie le rendement <strong>dans les deux sens</strong> : si l'EBITDA baisse ou si le coût de la dette dépasse la rentabilité de l'actif, l'IRR s'effondre ; trop de dette mène aux bris de covenants, au défaut et à la perte de l'equity. Et la dette a un coût qui monte avec le levier.</p>`,
    points: [[`Non`, ['non']], [`Amplifie dans les deux sens`, ['deux sens', 'amplif', 'pertes']], [`Covenants / défaut`, ['covenant', 'defaut']], [`Coût de la dette qui monte`, ['cout', 'taux', 'marge']]],
  }),
  q('207', 2, `Quelles sont les spécificités d'un public-to-private ?`, {
    courte: `<p>Le rachat d'une société cotée via une <strong>offre publique</strong> (OPA), suivi du retrait de la cote si le fonds dépasse les seuils (en France, retrait obligatoire à 90 % du capital et des droits de vote). Spécificités : <strong>prime</strong> sur le cours, information limitée (pas de DD complète), certitude du financement exigée, risque de ne pas atteindre les seuils.</p>`,
    points: [[`Offre publique sur une société cotée`, ['opa', 'offre publique', 'cotee']], [`Prime sur le cours`, ['prime', 'cours']], [`Seuils de retrait (90 %)`, ['90', 'retrait', 'seuil']], [`DD limitée / financement certain`, ['dd', 'information', 'financement', 'certain']]],
  }),
  q('208', 2, `Comment le cash remonte-t-il de l'OpCo vers la HoldCo pour rembourser la dette ?`, {
    courte: `<p>Par des <strong>dividendes</strong> (limités aux bénéfices distribuables), des <strong>management fees</strong> ou refacturations intragroupe, des <strong>prêts intragroupe</strong> (upstream loans, encadrés), et grâce à la <strong>tax consolidation</strong> (l'impôt du groupe est payé par la HoldCo). Sinon on loge la dette au plus près de l'OpCo.</p>`,
    points: [[`Dividendes (bénéfices distribuables)`, ['dividende', 'distribuable']], [`Management fees / prêts intragroupe`, ['management fees', 'pret', 'intragroupe', 'upstream']], [`Tax consolidation`, ['integration fiscale', 'tax consolidation', 'groupe fiscal']], [`Contraintes juridiques`, ['contrainte', 'limite', 'droit']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Un LBO réalisé en 2021 à 12x l'EBITDA avec 6x de dette : quels problèmes en 2026, et quelles solutions ?`, {
    duree: 150,
    courte: `<p>Hausse des <strong>taux</strong> (2022-2023) → coût de la dette bien plus élevé (dette à taux variable, couvertures expirées) → moins de cash pour rembourser ; <strong>compression des multiples</strong> → multiple expansion négative ; <strong>covenants</strong> sous tension ; <strong>exit difficile</strong> (valuation gap). Solutions : value creation opérationnelle, build-ups relutifs, <strong>amend & extend</strong> ou refinancement, PIK, equity cure, continuation vehicle.</p>`,
    complete: `<ul><li>Chiffres : 6x de dette à Euribor 0 % + 5 % de marge = 5 % ; avec Euribor ~2-3,5 %, le coût grimpe à 7-8,5 % → les intérêts absorbent une part bien plus grande de l'EBITDA.</li><li>Valeur : si le multiple de sortie tombe à 10x, il faut beaucoup de croissance d'EBITDA juste pour récupérer la mise.</li><li>Options du fonds : prolonger la détention, réinjecter de l'equity, faire des add-ons à multiples bas pour « moyenner » le multiple, préparer une exit partielle.</li></ul>`,
    points: [[`Hausse des taux / coût de la dette`, ['taux', 'cout de la dette', 'interet', 'variable']], [`Compression des multiples`, ['compression', 'multiple', 'baisse']], [`Covenants sous tension`, ['covenant']], [`Exit difficile / valuation gap`, ['exit', 'sortie', 'valuation gap', 'ecart']], [`Solutions (A&E, equity cure, add-ons, continuation)`, ['amend', 'extend', 'equity cure', 'add-on', 'continuation', 'refinanc']]],
  }),
  q('302', 3, `Le plafond de déductibilité des intérêts (30 % de l'EBITDA fiscal / 3 M€) : quel impact sur un LBO ?`, {
    courte: `<p>Il <strong>réduit l'avantage fiscal du levier</strong> : au-delà du plafond, les intérêts ne sont plus déductibles cette année (reportables sous conditions). Pour un LBO très endetté, l'impôt payé augmente, le cash disponible pour rembourser baisse et l'<strong>IRR diminue</strong> ; cela pousse à des leviers plus raisonnables.</p>`,
    exemple: `<p>EBITDA fiscal 40 M€, intérêts 16 M€ → plafond = max(3 ; 12) = 12 M€. 4 M€ non déductibles → 1 M€ d'impôt en plus par an (à 25 %).</p>`,
    complete: `<ul><li>À articuler avec la tax consolidation et l'amendement Charasse.</li><li>Débat récurrent en loi de finances : des sources de marché évoquent un durcissement des plafonds ; à vérifier sur le texte en vigueur avant d'en parler en détail.</li></ul>`,
    points: [[`Réduit l'avantage fiscal du levier`, ['avantage fiscal', 'deductib', 'impot']], [`Intérêts non déductibles au-delà`, ['non deductible', 'au-dela', 'plafond']], [`Cash et IRR en baisse`, ['cash', 'irr', 'tri']], [`Exemple chiffré`, ['30 %', '3 m', 'exemple']]],
  }),
  q('303', 3, `Comment détermines-tu le niveau de leverage « optimal » d'un LBO ?`, {
    courte: `<p>À partir de la <strong>capacité de remboursement</strong> (cash flow disponible après capex, NWC, impôt), de la <strong>prévisibilité</strong> du cash (récurrence, cyclicité), d'un <strong>downside case</strong> qui doit respecter les covenants, des <strong>conditions du marché de la dette</strong> (multiples acceptés par les prêteurs, coût) et de l'<strong>IRR</strong> visé — pas l'inverse.</p>`,
    complete: `<ul><li>Indicateurs : leverage (net debt / EBITDA), ICR, DSCR, capacité à rembourser X % de la dette en 5-7 ans.</li><li>Un actif très récurrent (logiciel) supporte 5-6x ; un actif cyclique et capitalistique 3-4x.</li><li>Garder du headroom et des lignes (RCF, capex facility) pour la croissance et les add-ons.</li></ul>`,
    points: [[`Capacité de remboursement (cash flow)`, ['capacite', 'cash flow', 'rembours']], [`Prévisibilité / cyclicité`, ['previsib', 'cycl', 'recurren']], [`Downside case et covenants`, ['downside', 'covenant', 'stress']], [`Marché de la dette / coût`, ['marche', 'preteur', 'cout']], [`Pas guidé par l'IRR seul`, ['irr', 'pas l inverse', 'pas seulement']]],
  }),
  q('304', 3, `Pourquoi les add-ons représentent-ils plus de la moitié des deals aujourd'hui ? Limites ?`, {
    courte: `<p>Parce que les add-ons sont <strong>plus faciles à financer</strong> (lignes d'acquisition existantes), <strong>moins chers</strong> (multiples plus bas → multiple arbitrage), ils créent de la valeur sans attendre la multiple expansion, et ils prolongent la croissance de participations détenues plus longtemps faute d'exits. Limites : <strong>intégration</strong>, risque de surpayer, levier qui monte, complexité, risque de « roll-up » sans vraie logique industrielle.</p>`,
    points: [[`Plus faciles à financer`, ['financer', 'ligne', 'facility']], [`Moins chers / multiple arbitrage`, ['moins cher', 'multiple', 'arbitrage']], [`Croissance sans multiple expansion / détention longue`, ['croissance', 'detention', 'exit']], [`Limites : intégration, surpayer, levier`, ['integration', 'surpay', 'levier', 'risque']]],
  }),
  q('305', 3, `Un LBO peut-il détruire de la valeur pour l'entreprise ?`, {
    courte: `<p>Oui, si le levier est <strong>excessif</strong> : le cash part en intérêts au lieu d'investissements (sous-investissement), la société devient fragile face à un choc (bris de covenants, restructuration), et la pression court-termiste peut nuire. À l'inverse, un LBO bien calibré <strong>professionnalise</strong> et accélère la croissance (build-ups, gouvernance) : les études montrent des résultats contrastés selon le levier et le fonds.</p>`,
    points: [[`Levier excessif / sous-investissement`, ['excessif', 'sous-invest', 'interet']], [`Fragilité face à un choc`, ['choc', 'covenant', 'fragil', 'restructur']], [`Court-termisme`, ['court', 'terme']], [`Mais aussi professionnalisation / croissance`, ['professionnal', 'croissance', 'gouvernance', 'contraste']]],
  }),
  q('306', 3, `Walk me through un LBO de A à Z, de l'origination à l'exit.`, {
    duree: 180,
    courte: `<p><strong>Origination</strong> → analyse préliminaire et <strong>NBO</strong> → <strong>due diligences</strong> (financière, commerciale, juridique, fiscale, ESG) et management presentation → <strong>financement</strong> (term sheets des prêteurs) → <strong>binding offer</strong> et négociation du <strong>SPA</strong> et du management package → <strong>signing</strong> puis <strong>closing</strong> → <strong>100-day plan</strong> et value creation (board, reporting, add-ons) → préparation et <strong>exit</strong> (trade sale, SBO, IPO).</p>`,
    complete: `<ul><li>À chaque étape, un passage en <strong>Investment Committee</strong> (préliminaire, final).</li><li>Rôle d'un analyste : modèle LBO, coordination des DD, IC memo, suivi des participations.</li></ul>`,
    points: [[`Origination / NBO`, ['origination', 'nbo', 'indicati']], [`Due diligences / IC`, ['due diligence', 'dd', 'comite', 'ic']], [`Financement / SPA / management package`, ['financement', 'spa', 'management package', 'mip']], [`Closing / 100-day plan / value creation`, ['closing', '100', 'creation de valeur', 'value creation']], [`Exit`, ['exit', 'sortie', 'cession']]],
  }),
]);
