// TS — Net debt et debt-like items
import { q, calcul, classer, theme } from '../fabriques.js';

export default theme('ts', 'dette', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Qu'est-ce que la net debt ?`, {
    courte: `<p>La <strong>net debt</strong> = dettes financières (emprunts bancaires, découverts, intérêts courus, shareholder loans, leases selon la convention) − <strong>trésorerie disponible</strong>. En deal on parle d'<strong>adjusted net debt</strong> quand on y ajoute les debt-like items et retire les cash-like items.</p>`,
    complete: `<ul><li>Elle fait le passage de l'Enterprise Value à l'Equity Value : <strong>Equity Value = EV − adjusted net debt ± écart de NWC</strong>.</li><li>Chaque euro de net debt réduit le prix des titres d'un euro (« euro pour euro »).</li><li>Le cash retenu doit être <strong>libre</strong> : ni nanti, ni piégé, ni nécessaire au fonctionnement courant.</li></ul>`,
    exemple: `<p>Emprunts 35, découvert 2, intérêts courus 0,3, trésorerie 10 → net debt = 27,3.</p>`,
    pieges: [`Oublier les intérêts courus ou les shareholder loans.`, `Déduire tout le cash sans regarder s'il est disponible.`],
    points: [[`Dettes financières − trésorerie`, ['dette', 'tresorerie', 'cash', 'emprunt']], [`Adjusted : + debt-like − cash-like`, ['debt-like', 'debt like', 'cash-like', 'adjusted']], [`EV → Equity Value, euro pour euro`, ['equity value', 'valeur des titres', 'euro pour euro', 'ev']], [`Cash libre seulement`, ['libre', 'disponible', 'nanti', 'trapped']]],
  }),
  q('102', 1, `Qu'est-ce qu'un debt-like item ? Donne des exemples.`, {
    courte: `<p>Un engagement qui entraînera une <strong>sortie de cash certaine ou probable</strong>, <strong>lié à la période du vendeur</strong>, <strong>sans contrepartie dans l'EBITDA futur</strong> et qui n'est pas dans le NWC normatif. On le déduit du prix comme une dette.</p>`,
    complete: `<ul><li>Exemples : provisions pour litiges (net of tax), <strong>pension liabilities</strong> non financées, impôt sur les sociétés dû des exercices passés, dividendes votés non payés, <strong>earn-outs</strong> dus sur des acquisitions passées, <strong>transaction bonus</strong>, capex creditors échus, capex en retard (catch-up), affacturage, avances remboursables, overdue payables anormales.</li><li>Test en 3 questions : sortie de cash probable ? liée au passé ? déjà dans l'EBITDA ou le NWC (risque de double counting) ?</li></ul>`,
    pieges: [`Mettre en debt-like des dettes d'exploitation courantes (fournisseurs, congés payés) déjà dans le NWC.`],
    relances: [[`Pourquoi le vendeur s'y oppose-t-il ?`, `Parce que chaque debt-like réduit son prix euro pour euro : il argumente que l'élément est opérationnel (NWC), incertain, ou déjà dans le prix.`]],
    conseil: `Retours d'entretiens Big 4 : « working capital, debt and debt-like items, quality of earnings » reviennent dans presque tous les entretiens techniques TS.`,
    points: [[`Sortie de cash certaine ou probable`, ['sortie de cash', 'probable', 'certain']], [`Liée au passé / période du vendeur`, ['passe', 'vendeur']], [`Hors EBITDA futur et hors NWC`, ['ebitda', 'nwc', 'double']], [`Au moins 3 exemples`, ['litige', 'retraite', 'pension', 'impot', 'dividende', 'earn', 'bonus']]],
  }),
  q('103', 1, `Que signifie « cash-free / debt-free » ?`, {
    courte: `<p>Le prix est fixé <strong>comme si la société n'avait ni dette ni trésorerie</strong> : on s'accorde sur une Enterprise Value, puis on <strong>déduit la net debt réelle</strong> (et on ajuste du NWC) au closing pour obtenir le prix des titres.</p>`,
    complete: `<ul><li>Le vendeur « récupère » la trésorerie (le prix des titres augmente) et « rembourse » les dettes (le prix baisse).</li><li>En pratique, la dette existante est souvent remboursée au closing avec le prix (pay-off letters des banques).</li><li>C'est la convention standard des deals mid-cap, avec locked box ou completion accounts.</li></ul>`,
    points: [[`Comme si ni dette ni cash`, ['ni dette', 'sans dette', 'cash-free', 'debt-free']], [`EV puis déduction de la net debt réelle`, ['ev', 'net debt', 'dedu']], [`Ajustement du NWC`, ['nwc', 'peg']]],
  }),
  q('104', 1, `Pourquoi la net debt impacte-t-elle le prix « euro pour euro » alors que l'EBITDA l'impacte « au multiple » ?`, {
    courte: `<p>Parce que le prix des titres = <strong>EV − net debt</strong>. Un euro de dette en plus est un euro que l'acheteur devra rembourser : il le retire du prix une fois. Un euro d'EBITDA en plus est récurrent : il est valorisé au multiple (EV = multiple × EBITDA).</p>`,
    exemple: `<p>Multiple 8x. −0,5 d'EBITDA → −4 d'EV ; +0,5 de debt-like → −0,5 de prix des titres.</p>`,
    complete: `<ul><li>Conséquence : le vendeur se bat d'abord sur l'EBITDA, puis sur les debt-like items ; l'acheteur cherche les deux.</li><li>Attention aux éléments « hybrides » (un coût récurrent présenté en provision) : les classer au bon endroit change beaucoup le prix.</li></ul>`,
    points: [[`Equity Value = EV − net debt`, ['ev', 'equity', 'valeur des titres', 'net debt']], [`Dette = une fois / EBITDA = récurrent`, ['une fois', 'recurren', 'rembours']], [`Exemple chiffré`, ['x', 'multiple', 'exemple']]],
  }),
  q('105', 1, `Qu'est-ce qu'un cash-like item ? Donne un exemple.`, {
    courte: `<p>Un actif qui se transformera en <strong>cash sans lien avec l'activité courante</strong> : on le déduit de la net debt (il augmente le prix). Exemples : créance de carry-back sur l'État, créance sur la cession d'un actif, indemnité d'assurance à recevoir, placements liquides.</p>`,
    complete: `<ul><li>Le vendeur cherche à en faire reconnaître le plus possible ; l'acheteur vérifie le caractère certain, le délai d'encaissement et l'absence de double counting (pas déjà dans le NWC).</li><li>La créance de CIR est un cas discuté (encaissement décalé, risque de contrôle).</li></ul>`,
    points: [[`Se transformera en cash hors exploitation`, ['cash', 'hors exploitation', 'non operationnel']], [`Déduit de la net debt (augmente le prix)`, ['dedu', 'augmente', 'net debt']], [`Exemple (carry-back, créance de cession…)`, ['carry', 'cession', 'assurance', 'cir']]],
  }),
  q('106', 1, `Les shareholder loans (comptes courants d'associés) du vendeur sont-ils de la dette ?`, {
    courte: `<p><strong>Oui</strong> : ils seront remboursés au vendeur ou rachetés avec les titres (souvent au nominal). L'acheteur les traite en net debt (ou les rachète séparément), sinon il paierait deux fois.</p>`,
    complete: `<ul><li>Dans la mécanique, le prix total payé au vendeur = prix des titres + rachat du compte courant ; ce qui compte est le total.</li><li>Cas particulier : comptes courants bloqués et subordonnés → toujours une dette pour le calcul du prix.</li><li>Côté LBO (après le deal), les shareholder loans du fonds sont un quasi-fonds propres.</li></ul>`,
    points: [[`Oui, dette`, ['oui', 'dette']], [`Remboursés ou rachetés avec les titres`, ['rembours', 'rachet', 'nominal']], [`Sinon l'acheteur paie deux fois`, ['deux fois', 'double']]],
  }),
  q('107', 1, `Toute la trésorerie du bilan se déduit-elle de la net debt ?`, {
    courte: `<p><strong>Non</strong> : seul le <strong>cash libre</strong> se déduit. On exclut le cash nanti ou bloqué, les dépôts de garantie, le cash piégé dans des filiales (contraintes de rapatriement, fiscalité), le minimum cash opérationnel, les chèques non encaissés, le cash saisonnier lié à un NWC négatif.</p>`,
    complete: `<ul><li>Chaque euro de cash exclu augmente la net debt, donc réduit le prix : le vendeur s'y oppose.</li><li>Méthode : analyser le cash par entité et par compte, les nantissements (annexe, contrats de crédit), le cash quotidien / mensuel.</li></ul>`,
    points: [[`Non : cash libre seulement`, ['non', 'libre']], [`Nanti / bloqué / dépôts`, ['nanti', 'bloque', 'depot', 'garantie']], [`Piégé à l'étranger`, ['filiale', 'etranger', 'rapatri', 'trapped']], [`Minimum cash opérationnel`, ['minimum', 'operationnel', 'fonctionnement']]],
  }),
  q('108', 1, `Des dividendes ont été votés par l'assemblée générale mais pas encore payés. Comment les traites-tu ?`, {
    courte: `<p>C'est une <strong>dette envers les actionnaires</strong> : on les ajoute à la net debt (debt-like). Sinon l'acheteur paierait la trésorerie correspondante au vendeur… puis la reverserait aux anciens actionnaires.</p>`,
    complete: `<ul><li>Source : PV d'assemblée générale, comptes de dettes envers les associés.</li><li>En locked box, un dividende versé après la locked box date est du leakage.</li></ul>`,
    points: [[`Dette envers les actionnaires`, ['dette', 'actionnaire']], [`Debt-like ajouté à la net debt`, ['debt-like', 'debt like', 'net debt']], [`Leakage en locked box`, ['leakage', 'locked']]],
  }),
  q('109', 1, `Qu'est-ce que les accrued interest et comment les traites-tu ?`, {
    courte: `<p>Les <strong>intérêts courus</strong> sont les intérêts dus au titre de la période écoulée mais pas encore payés (échéance trimestrielle par exemple). Ce sont une <strong>dette financière</strong> : on les ajoute à la net debt.</p>`,
    complete: `<ul><li>Ils sont souvent comptabilisés en « autres dettes » : à aller chercher pour ne pas les oublier.</li><li>Même logique pour les break costs (pénalités de remboursement anticipé) d'une dette remboursée au closing : coût à la charge du vendeur.</li></ul>`,
    points: [[`Intérêts dus non payés`, ['interet', 'du', 'pas encore paye', 'couru']], [`Dette financière`, ['dette financiere', 'net debt']], [`Break costs`, ['break', 'remboursement anticipe', 'penalit']]],
  }),
  q('110', 1, `Quelle différence entre net debt comptable et adjusted net debt ?`, {
    courte: `<p>La <strong>net debt comptable</strong> = dettes financières − trésorerie, telle qu'au bilan. L'<strong>adjusted net debt</strong> ajoute les <strong>debt-like items</strong>, retire les <strong>cash-like items</strong> et corrige le cash non disponible : c'est elle qui est déduite de l'EV dans le SPA.</p>`,
    exemple: `<p>Net debt comptable 20 + impôt dû 1,2 + dividendes votés 0,8 + dépôt de garantie classé en trésorerie 0,3 = adjusted net debt <strong>22,3</strong>.</p>`,
    points: [[`Comptable = dettes financières − cash`, ['comptable', 'bilan', 'dette financiere']], [`Adjusted = + debt-like − cash-like`, ['debt-like', 'cash-like', 'adjusted']], [`Cash non disponible corrigé`, ['disponible', 'depot', 'nanti']], [`C'est elle qui va dans le SPA`, ['spa', 'prix']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Pourquoi les provisions sont-elles en général retenues net of tax dans la net debt ?`, {
    courte: `<p>Parce que le <strong>décaissement futur sera déductible fiscalement</strong> : il réduira l'impôt payé. Le coût réel pour l'acheteur est donc le montant × (1 − taux d'IS). Une provision de 1 M€ à 25 % coûte 0,75 M€.</p>`,
    complete: `<ul><li>Conditions : la charge doit être déductible et la société doit avoir des bénéfices imposables pour profiter de l'économie (sinon pas d'effet d'impôt).</li><li>Le vendeur demande toujours le net, l'acheteur vérifie la déductibilité (certaines charges ne le sont pas : amendes, pénalités).</li><li>Même logique pour les pension liabilities.</li></ul>`,
    points: [[`Décaissement déductible`, ['deductib', 'fiscal']], [`Coût réel = montant × (1 − IS)`, ['1 - is', '1 −', '75', 'taux']], [`Conditions : déductibilité et bénéfices`, ['benefice', 'condition', 'amende', 'penalit']]],
  }),
  q('202', 2, `Les IFRS 16 lease liabilities doivent-elles être dans la net debt ?`, {
    courte: `<p><strong>Ça dépend de la base d'EBITDA</strong> retenue pour le prix : EBITDA post-IFRS 16 (avant loyers) → lease liabilities <strong>dans</strong> la net debt ; EBITDA pre-IFRS 16 (après loyers) → lease liabilities <strong>hors</strong> net debt. Beaucoup de fonds et de banques raisonnent pre-IFRS 16.</p>`,
    complete: `<ul><li>Mélanger les deux crée de la valeur fictive (EBITDA gonflé ET dette locative ignorée).</li><li>Le multiple doit être cohérent (multiples post-IFRS 16 plus bas).</li><li>Les crédits-bails financiers (achats déguisés) restent souvent en dette même en convention pre-IFRS 16.</li></ul>`,
    points: [[`Dépend de la base d'EBITDA`, ['depend', 'base', 'convention']], [`Post-IFRS 16 → dans la net debt`, ['post', 'dans']], [`Pre-IFRS 16 → hors net debt`, ['pre', 'hors']], [`Cohérence du multiple`, ['multiple', 'coheren']]],
  }),
  q('203', 2, `Comment traites-tu les pension liabilities (indemnités de fin de carrière) d'une société en PCG ?`, {
    courte: `<p>En PCG, elles peuvent ne figurer qu'en <strong>annexe</strong> (engagement hors bilan). C'est une dette envers les salariés <strong>liée au passé</strong> (droits acquis) : on la traite en <strong>debt-like</strong>, en général <strong>net of tax</strong>, sur la base d'un calcul actuariel.</p>`,
    complete: `<ul><li>Vérifier les hypothèses actuarielles (taux d'actualisation, turnover, augmentation des salaires) et la date du calcul.</li><li>Débat : le vendeur argumente que le coût des droits futurs est récurrent (dans l'EBITDA) ; seule la dette accumulée (droits passés) est debt-like.</li><li>Enjeu plus fort dans les pays à régimes à prestations définies non financés (Allemagne, Royaume-Uni).</li></ul>`,
    points: [[`Annexe en PCG / hors bilan`, ['annexe', 'hors bilan']], [`Debt-like lié aux droits passés`, ['debt-like', 'debt like', 'passe', 'acquis']], [`Net of tax`, ['net of tax', 'net d impot', 'impot']], [`Hypothèses actuarielles`, ['actuari', 'hypothese', 'taux']]],
  }),
  q('204', 2, `La cible doit encore un earn-out sur l'acquisition d'une filiale en 2024. Quel traitement ?`, {
    courte: `<p>C'est un <strong>debt-like</strong> : une sortie de cash liée à une opération passée. On retient le montant <strong>probable</strong> (selon l'atteinte des objectifs), éventuellement actualisé s'il est lointain.</p>`,
    complete: `<ul><li>Lire le contrat : formule, objectifs, plafond, date de paiement, accélération en cas de changement de contrôle (souvent !).</li><li>Si l'EBITDA de la filiale est inclus dans l'adjusted EBITDA, l'earn-out correspondant doit être payé : cohérence.</li><li>Le vendeur argumentera un montant bas (objectifs non atteints) : chiffrer des scénarios.</li></ul>`,
    points: [[`Debt-like (opération passée)`, ['debt-like', 'debt like', 'passe']], [`Montant probable / scénarios`, ['probable', 'scenario', 'objectif']], [`Lire le contrat (accélération au changement de contrôle)`, ['contrat', 'acceler', 'changement de controle']]],
  }),
  q('205', 2, `Un transaction bonus est promis aux managers et sera payé par la cible au closing. Comment le traites-tu ?`, {
    courte: `<p>C'est un <strong>coût de l'opération voulue par le vendeur</strong>, payé avec la trésorerie de la cible : <strong>debt-like</strong> (ou leakage en locked box), y compris les charges sociales. S'il est déjà en charges dans l'EBITDA, on le <strong>réintègre</strong> (one-off).</p>`,
    points: [[`Coût de l'opération du vendeur`, ['vendeur', 'operation', 'cession']], [`Debt-like ou leakage`, ['debt-like', 'debt like', 'leakage']], [`Charges sociales comprises`, ['charges sociales', 'social']], [`Réintégré dans l'EBITDA si en charges`, ['reintegr', 'one-off', 'ebitda']]],
  }),
  q('206', 2, `La cible a 5 M€ de tax losses carried forward. Comment les traites-tu dans le prix ?`, {
    courte: `<p>C'est un <strong>actif potentiel</strong> (économie d'impôt future) que le vendeur voudra se faire payer. L'acheteur le valorise <strong>avec prudence</strong> : calendrier d'utilisation (plafonnement annuel en France), actualisation, risque de perte (changement d'activité, restructuration), et selon que le business plan génère assez de bénéfices.</p>`,
    complete: `<ul><li>Valeur théorique : 5 × 25 % = 1,25 M€ d'impôt économisé, mais étalé dans le temps et incertain.</li><li>Traitement : rarement un cash-like à 100 % ; souvent négocié à part (valeur actualisée, partage, earn-out fiscal).</li><li>Coordination avec la tax DD (risques, possibilité de transfert en intégration fiscale).</li></ul>`,
    points: [[`Actif potentiel / économie d'impôt`, ['economie', 'impot', 'actif']], [`Calendrier, plafonnement, actualisation`, ['calendrier', 'plafon', 'actualis']], [`Risque de perte`, ['perte', 'risque', 'changement']], [`Rarement payé à 100 %`, ['prudence', 'negoci', 'rarement']]],
  }),
  q('207', 2, `L'acheteur veut mettre la dette de congés payés en net debt ; le vendeur refuse. Qui a raison ?`, {
    courte: `<p>En général le <strong>vendeur</strong> : c'est une dette opérationnelle courante, qui se renouvelle avec l'activité et qui est déjà dans le <strong>NWC</strong> (donc dans le peg). La mettre aussi en net debt serait un <strong>double counting</strong>.</p>`,
    complete: `<ul><li>Exception : un stock de congés <strong>anormalement élevé</strong> (accumulé sur plusieurs années, à payer à des départs) : la part excédentaire peut être debt-like, à condition de la sortir du NWC.</li><li>Même logique pour les primes : NWC si le peg les capte correctement, debt-like sinon.</li></ul>`,
    points: [[`Vendeur : dette opérationnelle courante`, ['vendeur', 'operationnel', 'courant']], [`Déjà dans le NWC / peg`, ['nwc', 'peg', 'bfr']], [`Double counting`, ['double']], [`Exception : stock anormal`, ['anormal', 'exception', 'accumul']]],
  }),
  q('208', 2, `Où cherches-tu les debt-like items ?`, {
    courte: `<p>Dans l'<strong>annexe</strong> (engagements hors bilan), les <strong>PV</strong> d'assemblées et de conseils, les <strong>contrats</strong> (prêts, earn-outs, bonus, leasing), les <strong>balances âgées</strong> fournisseurs et dettes fiscales et sociales, la liste des <strong>litiges</strong> et des <strong>contrôles</strong> (fiscal, URSSAF), le <strong>grand livre</strong> (provisions, comptes d'attente) et les entretiens avec le DAF.</p>`,
    complete: `<ul><li>Coordination avec la legal DD (litiges, garanties données) et la tax DD (impôts dus, redressements).</li><li>Questions directes au DAF : « Y a-t-il des sommes dues au titre du passé qui seront payées après le closing ? »</li></ul>`,
    points: [[`Annexe / hors bilan`, ['annexe', 'hors bilan']], [`PV / contrats`, ['pv', 'contrat', 'assemblee']], [`Balances âgées / dettes fiscales et sociales`, ['balance', 'fiscal', 'social', 'urssaf']], [`Litiges / contrôles / legal et tax DD`, ['litige', 'controle', 'legal', 'tax', 'juridique']]],
  }),
  calcul('209', 2, `VE 120 M€. Dette bancaire 35 ; trésorerie 10 ; provision pour litige probable 4 (déductible, IS 25 %) ; earn-out à payer 2. Prix des titres ?`, [
    ['Prix des titres', 90, 'M€', 0.05],
  ], `<p>Adjusted net debt = 35 − 10 + 4 × 75 % + 2 = <strong>30</strong>. Equity Value = 120 − 30 = <strong>90 M€</strong>.</p>
    <p><strong>À dire au recruteur</strong> : « le litige est retenu net of tax car la charge sera déductible ; l'earn-out est un debt-like lié à une acquisition passée ; chaque euro baisse le prix d'un euro ».</p>`),
  classer('210', 2, `Adjusted net debt : chaque poste est-il ajouté (dette / debt-like), déduit (cash / cash-like) ou exclu ?`,
    ['Ajouté (dette)', 'Déduit (cash)', 'Exclu'], [
      [`Emprunt bancaire`, 0, `Dette financière.`],
      [`Intérêts courus non échus`, 0, `Dette financière.`],
      [`Shareholder loan du vendeur`, 0, `Remboursé ou racheté avec les titres.`],
      [`Trésorerie disponible`, 1, `Cash libre.`],
      [`Dépôt de garantie versé au bailleur`, 2, `Non disponible : ni cash ni dette.`],
      [`Trésorerie nantie au profit d'une banque`, 2, `Bloquée : pas déductible comme du cash.`],
      [`Provision pour litige prud'homal probable`, 0, `Debt-like, net of tax.`],
      [`Pension liabilities non provisionnées`, 0, `Debt-like, net of tax.`],
      [`Earn-out dû sur une acquisition passée`, 0, `Dette liée à une acquisition.`],
      [`Subvention d'investissement non remboursable`, 2, `Rien à rembourser.`],
      [`Créance de carry-back encaissable sous 3 mois`, 1, `Cash-like.`],
      [`Dividendes votés non versés`, 0, `Dette envers les actionnaires.`],
    ], `<p>Pour chaque poste : sortie de cash certaine ou probable ? liée au passé ? déjà dans l'EBITDA ou le NWC ?</p>`),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `La cible a fortement réduit ses capex les deux années avant la vente. Comment le traites-tu ?`, {
    courte: `<p>C'est un <strong>sous-investissement</strong> qui a gonflé le cash du vendeur, mais que l'acheteur devra <strong>rattraper</strong> (capex catch-up). Je le chiffre (capex normatif vs réalisé, âge du parc, avis de la DD technique) et je propose de le traiter en <strong>debt-like</strong> ou en <strong>baisse de prix</strong>.</p>`,
    complete: `<ul><li>Indices : capex durablement < D&A, machines en fin de vie, hausse des coûts de maintenance, incidents de production.</li><li>Chiffrage : différence cumulée entre un capex de maintenance normatif (moyenne historique, % du revenue, plan de renouvellement) et le capex réalisé.</li><li>Négociation : le vendeur dira que c'est du growth capex reporté ou un choix de gestion ; l'acheteur s'appuie sur la DD technique.</li><li>Effet aussi sur l'EBITDA si la maintenance (charges) a été repoussée.</li></ul>`,
    exemple: `<p>Capex de maintenance normatif 3 M€/an, réalisé 1,5 puis 1,2 → retard cumulé ≈ 3,3 M€ → debt-like (ou décote) de 3,3 M€.</p>`,
    points: [[`Sous-investissement à rattraper`, ['sous-invest', 'rattrap', 'catch-up', 'retard']], [`Chiffrage : normatif vs réalisé`, ['normatif', 'realise', 'chiffr', 'cumul']], [`Debt-like ou baisse de prix`, ['debt-like', 'debt like', 'baisse de prix', 'decote']], [`Indices : capex < D&A, DD technique`, ['d&a', 'amortissement', 'technique', 'age']]],
  }),
  q('302', 3, `Dans un business d'abonnements, le deferred revenue est-il un debt-like ?`, {
    courte: `<p>C'est un <strong>débat classique</strong>. Position vendeur : c'est du NWC récurrent (il se renouvelle avec les nouveaux abonnements). Position acheteur : le cash correspondant est au bilan au closing et l'acheteur devra <strong>servir les clients sans réencaisser</strong> ; au minimum, le <strong>coût à servir</strong> est un debt-like, ou le peg doit intégrer correctement le deferred revenue.</p>`,
    complete: `<ul><li>Si le deferred revenue reste dans le NWC <strong>et</strong> que le peg est cohérent (moyenne qui intègre le même niveau), l'acheteur est protégé : pas de debt-like.</li><li>Si la date de closing tombe juste après la facturation annuelle (deferred revenue au plus haut, cash au plus haut), sans peg adapté l'acheteur paie ce cash au vendeur.</li><li>Approche « coût à servir » : debt-like = coûts restant à engager pour délivrer le service (la marge revient à l'acheteur).</li><li>Toujours éviter le double counting avec le peg.</li></ul>`,
    points: [[`Débat vendeur (NWC) vs acheteur`, ['vendeur', 'acheteur', 'debat']], [`Servir sans réencaisser`, ['servir', 'sans reencaisser', 'livrer']], [`Coût à servir en debt-like`, ['cout', 'servir', 'debt-like']], [`Cohérence avec le peg / date de closing`, ['peg', 'date', 'coheren', 'double']]],
  }),
  q('303', 3, `Le vendeur conteste tous tes debt-like items. Comment priorises-tu la négociation ?`, {
    courte: `<p>Je classe les items par <strong>montant</strong> et par <strong>solidité</strong> (certitude de la sortie de cash, lien avec le passé, documentation). Je défends fermement les items <strong>gros et certains</strong>, je propose des <strong>alternatives</strong> pour les items incertains (specific indemnity, escrow) et je peux lâcher les petits ou discutables.</p>`,
    complete: `<ul><li><strong>Non négociables</strong> : dettes financières, impôt dû, dividendes votés, earn-outs, transaction bonus.</li><li><strong>Négociables</strong> : provisions pour litiges (probabilité, montant), pensions (hypothèses), capex catch-up (estimation), overdue payables (seuil de normalité).</li><li><strong>Alternatives</strong> : un litige incertain → specific indemnity + escrow plutôt que debt-like ; un risque fiscal → garantie spécifique.</li><li>Toujours chiffrer l'impact total pour le client (prix, risque résiduel).</li></ul>`,
    points: [[`Classer par montant et solidité`, ['montant', 'solid', 'certitude', 'classer', 'priori']], [`Défendre les items certains`, ['certain', 'defendre', 'ferme']], [`Alternatives : indemnity / escrow`, ['indemn', 'escrow', 'garantie']], [`Lâcher les petits / discutables`, ['lacher', 'petit', 'concession']]],
  }),
  q('304', 3, `Une filiale à l'étranger détient 3 M€ de cash difficilement rapatriable. Comment le valorises-tu dans la net debt ?`, {
    courte: `<p>Ce n'est pas du cash libre pour l'acheteur : je ne le déduis qu'à hauteur de ce qui est <strong>réellement rapatriable</strong>, <strong>net des coûts</strong> (retenue à la source sur dividendes, change, délais), ou je l'exclus si des contraintes juridiques bloquent tout transfert.</p>`,
    complete: `<ul><li>Analyse : réglementation des changes, réserves distribuables de la filiale, retenues à la source et conventions fiscales, besoins de cash locaux (minimum cash).</li><li>Compromis : déduction partielle (valeur nette rapatriable) ou ajustement de prix différé quand le cash est effectivement remonté.</li></ul>`,
    exemple: `<p>3 M€ distribuables, retenue à la source 10 %, minimum cash local 0,5 → cash retenu ≈ (3 − 0,5) × 90 % = <strong>2,25 M€</strong>.</p>`,
    points: [[`Pas du cash libre`, ['pas libre', 'trapped', 'piege']], [`Déduction de la partie rapatriable, nette des coûts`, ['rapatri', 'retenue', 'net', 'cout']], [`Minimum cash local`, ['minimum', 'local']], [`Compromis / ajustement différé`, ['compromis', 'differ', 'partiel']]],
  }),
  q('305', 3, `Un litige est probable mais n'est pas provisionné dans les comptes. Que fais-tu ?`, {
    courte: `<p>Je le <strong>chiffre</strong> avec la legal DD (montant, probabilité, calendrier) et je propose au client un traitement selon sa certitude : <strong>debt-like</strong> (net of tax) si la perte est probable et chiffrable, ou <strong>specific indemnity</strong> avec <strong>escrow</strong> si l'issue est incertaine. Je signale aussi l'éventuelle erreur comptable (provision manquante).</p>`,
    complete: `<ul><li>Debt-like : l'acheteur est protégé tout de suite, mais le vendeur paie même si le litige est finalement gagné.</li><li>Specific indemnity : le vendeur ne paie que si le risque se réalise ; l'escrow garantit le paiement.</li><li>Impact EBITDA : si le litige révèle un problème récurrent (qualité produit, pratiques sociales), l'adjusted EBITDA et le business plan sont aussi concernés.</li></ul>`,
    points: [[`Chiffrer avec la legal DD`, ['chiffr', 'legal', 'juridique', 'probabilit']], [`Debt-like si probable et chiffrable`, ['debt-like', 'debt like', 'probable']], [`Specific indemnity + escrow si incertain`, ['indemn', 'escrow', 'garantie', 'sequestre']], [`Problème récurrent ? impact EBITDA`, ['recurren', 'ebitda']]],
  }),
]);
