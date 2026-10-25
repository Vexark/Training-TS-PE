// Pièges à éviter et relances du recruteur pour les questions dont la correction n'avait que la réponse courte et la
// réponse complète. Fusionnés au chargement (complements.js) : un champ déjà rempli n'est jamais écrasé.
export const COMPLEMENTS_RELANCES = {
  // ================================================================ TRANSACTION SERVICES
  'ts-metier-112': {
    pieges: [`Oublier les prêteurs : banques et fonds de dette s'appuient aussi sur le rapport (reliance).`],
    relances: [[`Une mission buy-side pour un fonds ou pour un corporate : qu'est-ce qui change ?`, `Le fonds regarde surtout l'EBITDA, la net debt et le cash pour son LBO et ses prêteurs ; le corporate s'intéresse aussi à l'intégration, aux synergies et à l'alignement des méthodes comptables.`]],
  },
  'ts-metier-203': {
    pieges: [`Confondre les deux : la hold harmless protège le cabinet face aux lecteurs du rapport ; la reliance letter donne un droit de recours à l'acheteur final (et à ses prêteurs).`],
    relances: [[`Pourquoi le cabinet limite-t-il sa responsabilité ?`, `Parce que le rapport est préparé pour le vendeur, vite, sur des informations non auditées : la reliance est encadrée par un plafond (cap) de responsabilité.`]],
  },
  'ts-metier-206': {
    pieges: [`Penser que le SPA est « l'affaire des avocats » : une définition mal rédigée de net debt ou de NWC peut coûter des millions.`],
    relances: [[`Un exemple de clause alimentée par la FDD ?`, `La liste des debt-like items dans la définition de la net debt, ou le calcul du peg dans le mécanisme de completion accounts.`]],
  },
  'ts-metier-207': {
    pieges: [`Croire que la VDD remplace toute DD acheteur : l'acheteur fait souvent une revue complémentaire.`],
    relances: [[`Qu'est-ce qu'une DD « top-up » ?`, `Une revue côté acheteur qui challenge la VDD et approfondit les sujets propres à son projet (financement, intégration).`]],
  },
  'ts-metier-208': {
    pieges: [`Une IRL interminable et générique : on priorise ce qui débloque l'analyse dès le jour 1.`],
    relances: [[`Et si la donnée mensuelle n'existe pas ?`, `Je demande les balances trimestrielles, les journaux de ventes ou de paie mensuels pour reconstruire une vision mensuelle, et je signale la limite dans le rapport.`]],
  },
  'ts-metier-303': {
    pieges: [`Présenter la FDD comme un audit : elle ne donne pas d'opinion sur les comptes.`],
    relances: [[`Comment l'acheteur se protège-t-il de ces limites ?`, `Par le SPA : garanties (et W&I), indemnités spécifiques, escrow, mécanisme de prix (completion accounts).`]],
  },
  'ts-metier-304': {
    pieges: [`Oublier les coûts stand-alone : les services fournis par la maison mère (IT, RH, finance) devront être payés par l'acheteur.`],
    relances: [[`Qu'est-ce qu'un TSA ?`, `Un Transitional Service Agreement : le vendeur continue de fournir certains services (IT, paie…) pendant une période de transition, contre paiement.`]],
  },
  'ts-metier-305': {
    pieges: [`Dire que l'IA va tout remplacer, ou au contraire qu'elle ne change rien.`],
    relances: [[`Quelle partie du travail reste humaine ?`, `Le jugement : qualifier un adjustment, comprendre le business, négocier avec le vendeur, assumer la conclusion.`]],
  },
  'ts-comptes-108': {
    pieges: [`Analyser une seule société juridique alors que le périmètre vendu est un groupe (ou l'inverse).`],
    relances: [[`Que sont les éliminations intragroupe ?`, `On supprime les ventes, créances et dettes entre sociétés du groupe pour ne garder que les opérations avec des tiers.`]],
  },
  'ts-comptes-112': {
    pieges: [`Mettre un impact sur le P&L : une hausse de stock n'est pas une charge.`],
    relances: [[`Et si le stock baisse de 10 à cause d'une dépréciation ?`, `C'est différent : la dépréciation est une charge non cash ; le cash ne bouge que de l'économie d'impôt (+2,5 à 25 %).`]],
  },
  'ts-comptes-113': {
    pieges: [`Dire que le goodwill est amorti en IFRS : il est seulement testé pour dépréciation (impairment test).`],
    relances: [[`Le goodwill touche-t-il l'EBITDA ou la net debt ?`, `Ni l'un ni l'autre : c'est un actif incorporel ; son amortissement (PCG) ou sa dépréciation sont sous l'EBITDA.`]],
  },
  'ts-comptes-114': {
    pieges: [`Mettre le remboursement du capital dans le P&L.`],
    relances: [[`Où sont les intérêts payés dans le cash flow statement ?`, `Aujourd'hui en IFRS, en operating ou en financing selon le choix de la société ; IFRS 18 les place en financing à partir de 2027. En FDD, on les isole pour calculer le cash flow avant financement.`]],
  },
  'ts-comptes-203': {
    pieges: [`Oublier l'effet impôt, ou dire que le cash baisse de 10.`],
    relances: [[`En FDD, où classes-tu une dépréciation de stock ?`, `Au-dessus de l'EBITDA si elle est récurrente (coût d'exploitation) : en PCG elle est souvent sous l'EBE, comme les dépréciations de créances.`]],
  },
  'ts-comptes-204': {
    pieges: [`Laisser les dotations aux dépréciations de créances sous l'EBITDA alors que les impayés sont un coût récurrent du business.`],
    relances: [[`Comment calcules-tu le coût annuel normatif ?`, `Pertes sur créances irrécouvrables + dotations − reprises, en moyenne sur plusieurs années pour lisser les à-coups.`]],
  },
  'ts-comptes-206': {
    pieges: [`Le laisser dans l'EBITDA sans le signaler : c'est un avantage fiscal qui dépend des règles et peut être remis en cause par un contrôle.`],
    relances: [[`La créance de CIR est-elle un cash-like ?`, `Elle peut l'être si elle est remboursable ou imputable rapidement ; c'est à négocier, en tenant compte du risque de contrôle fiscal.`]],
  },
  'ts-comptes-207': {
    pieges: [`Comparer un EBITDA PCG (crédit-bail en charges) avec un EBITDA IFRS 16 (sans loyers) sans retraitement.`],
    relances: [[`La dette de crédit-bail va-t-elle en net debt ?`, `En général oui, même en convention pre-IFRS 16 (sous IAS 17, le crédit-bail était déjà une dette) : les redevances sont retraitées en D&A et intérêts.`]],
  },
  'ts-comptes-208': {
    pieges: [`Ne lire que le bilan : en PCG, beaucoup d'engagements ne figurent qu'en annexe.`],
    relances: [[`La cible a donné une caution pour une société du vendeur : que fais-tu ?`, `Elle doit être levée au closing (ou couverte par une garantie du vendeur) ; sinon, c'est un risque de sortie de cash pour l'acheteur.`]],
  },
  'ts-comptes-209': {
    pieges: [`L'ignorer : elle augmente l'EBITDA sans générer de cash.`],
    relances: [[`Comment la traites-tu dans la cash conversion ?`, `Je la soustrais avec les capex : c'est un investissement payé en cash (salaires), même s'il n'apparaît pas en charges.`]],
  },
  'ts-comptes-210': {
    pieges: [`Le considérer comme du revenue déjà gagné : la prestation reste à fournir, avec ses coûts.`],
    relances: [[`Le deferred revenue est-il un debt-like ?`, `C'est un débat : NWC récurrent pour le vendeur ; debt-like pour l'acheteur s'il n'est pas renouvelé ou si les coûts restant à engager sont importants.`]],
  },
  'ts-comptes-302': {
    pieges: [`Chercher la fraude au lieu des choix comptables : la plupart des « manipulations » sont des jugements légaux mais optimistes.`],
    relances: [[`Quel est le premier indicateur à regarder ?`, `La cash conversion : un EBITDA qui progresse sans le cash associé doit être expliqué.`]],
  },
  'ts-comptes-304': {
    pieges: [`Comparer des chiffres sans vérifier le référentiel comptable.`],
    relances: [[`Laquelle change le plus l'EBITDA ?`, `IFRS 16 dans la plupart des secteurs (retail, restauration, services avec beaucoup de locaux).`]],
  },
  'ts-comptes-305': {
    pieges: [`Se tromper de signe : une hausse d'actif circulant consomme du cash, une hausse de dettes d'exploitation en libère.`],
    relances: [[`Comment vérifies-tu ton tableau ?`, `La variation de trésorerie calculée doit être égale à l'écart de cash entre les deux bilans.`]],
  },
  'ts-comptes-306': {
    pieges: [`Oublier de reconnaître les incorporels identifiables (marques, relations clients) avant de calculer le goodwill.`],
    relances: [[`Et s'il n'achète que 80 % ?`, `Il consolide quand même 100 % des actifs et passifs (il a le contrôle) et constate des minority interests pour les 20 % restants.`]],
  },
  'ts-qoe-105': {
    pieges: [`Réintégrer aussi des honoraires récurrents (expert-comptable, commissaire aux comptes) sans lien avec la cession.`],
    relances: [[`Et dans la net debt ?`, `S'ils restent à payer au closing par la cible, ce sont des debt-like (ou un leakage en locked box).`]],
  },
  'ts-qoe-106': {
    pieges: [`Oublier les charges sociales ou les avantages en nature (voiture, logement).`],
    relances: [[`Et si le dirigeant est surpayé ?`, `Adjustment positif de l'écart, s'il part ou si sa rémunération sera ramenée au niveau du marché.`]],
  },
  'ts-qoe-108': {
    pieges: [`Mélanger l'adjusted EBITDA (cible seule) et l'EBITDA pro forma de l'acheteur.`],
    relances: [[`Et une acquisition faite par la cible en cours d'année ?`, `On ajoute l'EBITDA de la société acquise sur 12 mois (pro forma) : elle fait partie du périmètre vendu, ce n'est pas une synergie.`]],
  },
  'ts-qoe-110': {
    pieges: [`Un bridge avec trop de barres, ou une catégorie « autres » importante.`],
    relances: [[`Quels sont les deux grands types de bridges ?`, `Reported → adjusted (les adjustments) et N−1 → N (effets prix, volume, coûts) : l'un explique la qualité, l'autre la performance.`]],
  },
  'ts-qoe-112': {
    pieges: [`Travailler seulement sur les comptes annuels audités : on rate les écritures de fin d'année.`],
    relances: [[`Que montre une forte hausse en décembre ?`, `Peut-être une vraie saisonnalité, ou des ventes avancées (cut-off), des provisions reprises : à vérifier avec les factures et les avoirs de janvier.`]],
  },
  'ts-qoe-205': {
    pieges: [`Extrapoler une croissance exceptionnelle (un gros contrat, une hausse de prix ponctuelle).`],
    relances: [[`Qu'est-ce qu'une analyse price-volume-mix ?`, `On décompose la croissance en effet prix (tarifs), effet volume (quantités) et effet mix (produits ou clients plus ou moins chers).`]],
  },
  'ts-qoe-206': {
    pieges: [`Juger la qualité sur le seul montant de l'EBITDA.`],
    relances: [[`Quel critère compte le plus pour un fonds LBO ?`, `La cash conversion et la récurrence : c'est ce qui rembourse la dette.`]],
  },
  'ts-qoe-207': {
    pieges: [`Regarder seulement le revenue : un gros client peut peser encore plus dans la marge.`],
    relances: [[`Comment protéger l'acheteur ?`, `Vérifier la durée du contrat et la clause de changement de contrôle, échanger avec le client, et prévoir un earn-out ou une baisse de prix si le risque est fort.`]],
  },
  'ts-qoe-209': {
    pieges: [`En post-IFRS 16, oublier d'ajuster aussi la lease liability.`],
    relances: [[`Et si le bail est signé pour 9 ans au loyer actuel ?`, `Pas d'adjustment pendant la durée du bail, le loyer restera bas ; mais je signale le risque à l'échéance.`]],
  },
  'ts-qoe-210': {
    pieges: [`Retirer l'indemnité sans retraiter les coûts du sinistre (sous-traitance, pertes d'exploitation).`],
    relances: [[`Et si l'indemnité n'est pas encore encaissée ?`, `La créance d'assurance peut être un cash-like, si le montant est accepté par l'assureur et la date de paiement connue.`]],
  },
  'ts-qoe-211': {
    pieges: [`Retirer une grosse perte sur créance comme one-off alors que la société en subit une chaque année.`],
    relances: [[`Un client fait faillite et laisse 1 M€ d'impayés : que fais-tu ?`, `Si c'est hors norme par rapport à l'historique, je le traite comme exceptionnel mais je retiens à la place un coût normatif moyen.`]],
  },
  'ts-qoe-302': {
    pieges: [`Se fier aux libellés « exceptionnel » de la société sans vérifier la récurrence.`],
    relances: [[`Que dis-tu au client si l'EBITDA est de mauvaise qualité ?`, `Je le chiffre (adjustments, normalisations) et je propose des protections : prix plus bas, earn-out, garanties.`]],
  },
  'ts-qoe-303': {
    pieges: [`Oublier l'effet sur N+1 : l'erreur s'inverse l'année suivante.`],
    relances: [[`Et l'impact sur le NWC ?`, `Le stock, donc le NWC de fin de N, est surévalué de 1 : à corriger dans le NWC normatif et dans les comptes de closing.`]],
  },
  'ts-qoe-304': {
    pieges: [`Accepter l'activation sans vérifier qu'il existe de vrais projets qui respectent les critères.`],
    relances: [[`Comment la traites-tu dans l'adjusted EBITDA ?`, `Si l'activation est agressive, je réintègre l'excédent en charges (adjustment négatif) et je l'ajoute aux capex pour la cash conversion.`]],
  },
  'ts-qoe-305': {
    pieges: [`Traiter une provision pour litige en adjustment d'EBITDA ET en debt-like.`],
    relances: [[`Un exemple d'élément à ne mettre qu'à un seul endroit ?`, `Les bonus de l'exercice passé payés après le closing : soit dans le NWC (s'ils reviennent chaque année), soit en debt-like, jamais les deux.`]],
  },
  'ts-qoe-306': {
    pieges: [`Retenir la vision la plus favorable au client sans la justifier.`],
    relances: [[`Le vendeur dit « sans la crise, on aurait fait 12 » : que réponds-tu ?`, `Je demande des preuves (données mensuelles avant et après), je compare aux concurrents, et je propose un earn-out si l'écart persiste.`]],
  },
  'ts-bfr-102': {
    pieges: [`Prendre le NWC de clôture comme référence.`],
    relances: [[`Qu'est-ce que le peg ?`, `Le niveau de NWC de référence fixé dans le SPA : au closing, l'écart entre le NWC réel et le peg ajuste le prix.`]],
  },
  'ts-bfr-105': {
    pieges: [`Utiliser une moyenne de quatre clôtures trimestrielles alors que la saisonnalité est forte à l'intérieur des trimestres.`],
    relances: [[`Et si la société croît vite ?`, `La moyenne LTM sous-estime le NWC futur : on peut retenir les derniers mois ou ajuster le peg pour la croissance.`]],
  },
  'ts-bfr-106': {
    pieges: [`Mettre un impact sur l'EBITDA.`],
    relances: [[`Une hausse du NWC est-elle toujours mauvaise ?`, `Non : elle est normale si l'activité croît ; elle inquiète si les délais (DSO, DIO) se dégradent sans croissance.`]],
  },
  'ts-bfr-107': {
    pieges: [`Voir un NWC négatif comme un problème : c'est souvent une force (les clients financent l'activité).`],
    relances: [[`Quel est le risque d'un NWC négatif ?`, `Si l'activité baisse, le cash fond vite : les clients paient moins d'avance mais les fournisseurs doivent toujours être payés.`]],
  },
  'ts-bfr-108': {
    pieges: [`Le confondre avec une fraude : il est souvent légal, mais il fausse la net debt de clôture.`],
    relances: [[`Comment le détectes-tu ?`, `En comparant les délais clients (DSO) et fournisseurs (DPO) de fin d'année à la moyenne mensuelle, et en regardant les paiements des premières semaines de janvier.`]],
  },
  'ts-bfr-109': {
    pieges: [`Oublier que la croissance consomme du cash, même quand elle est rentable.`],
    relances: [[`Combien de cash faut-il pour 10 de revenue en plus ?`, `NWC en % du revenue × hausse du revenue : avec un NWC à 15 % du revenue, 10 de revenue en plus demandent 1,5 de cash.`]],
  },
  'ts-bfr-110': {
    pieges: [`Fixer le peg sur le mois le plus favorable à son client.`],
    relances: [[`Le closing tombe au pic saisonnier : que vérifies-tu ?`, `La cohérence entre peg et net debt : avec un peg moyen et la net debt réelle, le NWC élevé payé au vendeur est compensé par le cash qui manque ; un peg du mois suppose une net debt normalisée.`]],
  },
  'ts-bfr-202': {
    pieges: [`Laisser l'affacturage hors net debt : c'est un financement, comme un découvert.`],
    relances: [[`Comment le retraites-tu concrètement ?`, `Je réintègre les créances cédées dans le NWC (et dans le calcul du peg) et le financement reçu dans la net debt.`]],
  },
  'ts-bfr-203': {
    pieges: [`Laisser l'IS dans le NWC : il dépend de la fiscalité et du financement, pas de l'exploitation.`],
    relances: [[`Où vont les dettes fournisseurs d'immobilisations ?`, `Hors NWC : ce sont des capex payés plus tard ; on les traite en général en debt-like ou avec les capex.`]],
  },
  'ts-bfr-204': {
    pieges: [`Les compter à la fois dans le NWC et en debt-like.`],
    relances: [[`Pourquoi le vendeur veut-il les laisser dans le NWC ?`, `Parce qu'ils reviennent chaque année : le peg les intègre déjà, ils ne devraient donc pas réduire le prix une seconde fois.`]],
  },
  'ts-bfr-207': {
    pieges: [`Déduire toute la trésorerie, y compris les caisses des magasins ou le cash bloqué à l'étranger.`],
    relances: [[`Comment chiffres-tu le minimum cash ?`, `À partir des besoins réels (caisses, décalages de paiement, exigences bancaires) ; le point bas mensuel de trésorerie sur 12 mois sert souvent de repère.`]],
  },
  'ts-bfr-303': {
    pieges: [`Considérer les 15 M€ comme du cash libre à payer au vendeur.`],
    relances: [[`Et si le closing avait lieu en juin ?`, `Le cash et le deferred revenue seraient bien plus bas : avec un mécanisme cohérent (peg moyen et net debt réelle), le prix ne dépend pas du mois du closing.`]],
  },
  'ts-bfr-304': {
    pieges: [`Conclure à un problème de recouvrement sans vérifier le mix clients.`],
    relances: [[`Quel impact cash pour 15 jours de DSO sur 120 M€ de revenue ?`, `120 × 15 / 365 ≈ 4,9 M€ de cash immobilisé en plus.`]],
  },
  'ts-bfr-305': {
    pieges: [`Choisir un peg mensualisé tout en gardant la net debt réelle du closing : l'une des parties est pénalisée.`],
    relances: [[`Qui préfère quoi ?`, `Cela dépend du mois de closing prévu : chaque partie défend la méthode qui l'avantage ; le TS chiffre l'impact de chaque option.`]],
  },
  'ts-dette-103': {
    pieges: [`Oublier l'ajustement de NWC : un prix cash-free / debt-free suppose aussi un NWC « normal » au closing.`],
    relances: [[`Pourquoi les offres sont-elles exprimées ainsi ?`, `Pour comparer les offres sur la valeur de l'activité, quelle que soit la façon dont la société est financée au closing.`]],
  },
  'ts-dette-105': {
    pieges: [`Traiter en cash-like un actif qui sert à l'exploitation (créance client normale, stock).`],
    relances: [[`Un exemple discuté ?`, `Une créance de CIR : cash-like pour le vendeur, alors que l'acheteur pointe le risque de contrôle et la date de remboursement.`]],
  },
  'ts-dette-106': {
    pieges: [`Les laisser dans le NWC parce qu'ils sont en « autres dettes ».`],
    relances: [[`Comment sont-ils traités dans le SPA ?`, `Remboursés au closing ou rachetés par l'acheteur avec les titres : dans les deux cas, ils réduisent d'autant le prix des titres.`]],
  },
  'ts-dette-107': {
    pieges: [`Oublier les chèques émis non encaissés, qui réduisent le cash réellement disponible.`],
    relances: [[`Qu'est-ce que le trapped cash ?`, `Du cash qui ne peut pas être remonté librement (contrôle des changes, filiale avec minoritaires, cash nanti) : il ne se déduit pas en totalité de la net debt.`]],
  },
  'ts-dette-108': {
    pieges: [`Les laisser dans le NWC (« autres dettes »).`],
    relances: [[`En locked box, un dividende payé après la locked box date ?`, `C'est un leakage, sauf s'il est prévu dans le SPA et déduit du prix (permitted leakage).`]],
  },
  'ts-dette-109': {
    pieges: [`Les oublier : la dette à rembourser au closing inclut les intérêts courus.`],
    relances: [[`Et les frais de remboursement anticipé ?`, `Les pénalités de remboursement et le coût de dénouement des swaps liés au refinancement au closing sont aussi des debt-like.`]],
  },
  'ts-dette-201': {
    pieges: [`Appliquer l'effet impôt alors que la société est déficitaire (aucune économie d'impôt à court terme).`],
    relances: [[`Quel taux retiens-tu ?`, `Le taux d'IS (25 % en France), seulement si la charge sera déductible et que la société paie de l'impôt.`]],
  },
  'ts-dette-202': {
    pieges: [`Mélanger un EBITDA post-IFRS 16 et une net debt sans lease liabilities.`],
    relances: [[`Pourquoi les fonds préfèrent-ils souvent le pre-IFRS 16 ?`, `Pour comparer avec l'historique, les multiples et les covenants bancaires, souvent définis avant IFRS 16.`]],
  },
  'ts-dette-203': {
    pieges: [`Les ignorer parce qu'elles ne sont qu'en annexe.`],
    relances: [[`Les retiens-tu pour 100 % ?`, `Souvent net d'impôt, et le montant se discute : c'est un engagement de long terme dont une partie ne sera payée que dans de nombreuses années.`]],
  },
  'ts-dette-204': {
    pieges: [`Retenir le montant maximum sans analyser la probabilité de paiement.`],
    relances: [[`Et si l'earn-out dépend de résultats que l'acheteur contrôlera ?`, `Le vendeur défend un montant bas (scénario probable), l'acheteur un montant prudent, proche du maximum : c'est un point de négociation à chiffrer.`]],
  },
  'ts-dette-206': {
    pieges: [`Valoriser les déficits au nominal × 25 % sans tenir compte du calendrier ni des limites d'imputation.`],
    relances: [[`Quelles limites en France ?`, `Imputation chaque année à hauteur de 1 M€ plus 50 % du bénéfice au-delà ; un changement d'activité réelle peut faire perdre les déficits.`]],
  },
  'ts-dette-207': {
    pieges: [`Céder sur les congés payés et laisser passer des éléments vraiment non récurrents.`],
    relances: [[`Dans quel cas l'acheteur a-t-il raison ?`, `Si les congés accumulés sont anormalement élevés (rattrapage, départs prévus) : l'excédent sur le niveau normal peut être un debt-like. À vérifier aussi : les droits à congés acquis pendant les arrêts maladie depuis la loi d'avril 2024.`]],
  },
  'ts-dette-208': {
    pieges: [`Se limiter au bilan.`],
    relances: [[`Quel document est souvent sous-estimé ?`, `Les procès-verbaux d'assemblées et de conseils : dividendes votés, bonus, engagements et litiges y apparaissent.`]],
  },
  'ts-dette-302': {
    pieges: [`Le traiter en debt-like tout en le gardant dans le NWC (double counting).`],
    relances: [[`Quel compromis ?`, `Retenir en debt-like seulement le coût restant à engager pour livrer (pas tout le revenue encaissé), ou la part non récurrente.`]],
  },
  'ts-dette-303': {
    pieges: [`Défendre tous les points avec la même énergie.`],
    relances: [[`Lesquels lâches-tu en premier ?`, `Les petits montants incertains ou mal documentés, en échange des items importants et bien étayés.`]],
  },
  'ts-dette-305': {
    pieges: [`L'ignorer parce qu'il n'est pas dans les comptes.`],
    relances: [[`Debt-like ou garantie spécifique ?`, `Debt-like si le montant est probable et chiffrable ; specific indemnity (avec escrow éventuel) s'il reste incertain.`]],
  },
  'ts-prix-101': {
    pieges: [`Confondre SPA (achat des titres) et APA (Asset Purchase Agreement, achat d'actifs).`],
    relances: [[`Quelles parties du SPA concernent directement le TS ?`, `Le prix et son ajustement (définitions de net debt, NWC, cash), la locked box et les leakages, les garanties sur les comptes.`]],
  },
  'ts-prix-102': {
    pieges: [`Oublier que le risque passe à l'acheteur dès la locked box date : sa DD du bilan de référence doit être solide.`],
    relances: [[`Qu'est-ce que le ticker ?`, `Un montant par jour payé au vendeur entre la locked box date et le closing, pour rémunérer le cash généré pendant cette période, qui revient à l'acheteur.`]],
  },
  'ts-prix-103': {
    pieges: [`Oublier les paiements aux parties liées (management fees, frais refacturés).`],
    relances: [[`Qu'est-ce qu'un permitted leakage ?`, `Une sortie de valeur listée et acceptée dans le SPA (salaire normal du dirigeant, dividende connu), en général déduite du prix.`]],
  },
  'ts-prix-104': {
    pieges: [`Oublier de définir les méthodes comptables des comptes de closing (hiérarchie des principes).`],
    relances: [[`Qui prépare les completion accounts ?`, `Souvent l'acheteur (il contrôle la société après le closing) ; le vendeur a un délai pour contester, puis un expert tranche.`]],
  },
  'ts-prix-105': {
    pieges: [`Un earn-out mal défini, source de litiges.`],
    relances: [[`Pourquoi le vendeur s'en méfie-t-il ?`, `Parce que l'acheteur contrôle la société et peut influencer les résultats (coûts, intégration) : il demande des engagements de gestion.`]],
  },
  'ts-prix-106': {
    pieges: [`Confondre escrow et earn-out.`],
    relances: [[`Pourquoi un fonds vendeur refuse-t-il souvent un escrow ?`, `Il veut distribuer tout le produit de cession à ses LP ; il préfère une W&I insurance.`]],
  },
  'ts-prix-107': {
    pieges: [`Croire que la garantie couvre tout : il y a des seuils, un plafond (cap) et une durée.`],
    relances: [[`De minimis ou basket ?`, `Le de minimis écarte les petites réclamations individuelles ; le basket fixe le montant total à dépasser avant toute indemnisation.`]],
  },
  'ts-prix-108': {
    pieges: [`Oublier les conditions suspensives (autorisations de concurrence, contrôle des investissements étrangers).`],
    relances: [[`Que se passe-t-il entre les deux ?`, `Les interim covenants encadrent la gestion de la cible et les conditions suspensives sont levées.`]],
  },
  'ts-prix-203': {
    pieges: [`Imposer des completion accounts à une société stable au bilan fiable : plus long et plus coûteux qu'une locked box.`],
    relances: [[`Pourquoi les vendeurs préfèrent-ils la locked box ?`, `Prix certain dès la signature, pas d'ajustement ni de contentieux après le closing.`]],
  },
  'ts-prix-204': {
    pieges: [`Ne pas figer les méthodes comptables utilisées pour le calcul.`],
    relances: [[`Comment protéger le vendeur ?`, `Engagements de gestion (budget, ressources), droit d'information, accélération de l'earn-out en cas de revente.`]],
  },
  'ts-prix-205': {
    pieges: [`Croire que la W&I couvre les risques identifiés en DD.`],
    relances: [[`Qui paie la prime ?`, `Souvent l'acheteur, mais le coût se négocie dans le prix ; le vendeur y gagne une sortie sans garantie résiduelle.`]],
  },
  'ts-prix-206': {
    pieges: [`Penser qu'une MAC se déclenche facilement : elle est rarement invoquée avec succès.`],
    relances: [[`Un exemple d'interim covenant ?`, `Pas de dividende, pas de contrat important ni d'embauche au-delà d'un seuil sans l'accord de l'acheteur.`]],
  },
  'ts-prix-301': {
    pieges: [`Accepter sans ticker ni protection contre les leakages.`],
    relances: [[`Pourquoi 15 mois d'écart posent-ils problème ?`, `Plus la locked box date est ancienne, plus l'acheteur porte longtemps le risque sans contrôler la société, et plus il est difficile de vérifier l'absence de leakage.`]],
  },
  'ts-prix-302': {
    pieges: [`Croire que l'expert peut tout revoir : il tranche seulement les points contestés, dans les limites de sa mission.`],
    relances: [[`Qui est l'expert ?`, `Un expert-comptable indépendant désigné dans le SPA (en France, souvent sur le fondement de l'article 1592 du Code civil) ; sa décision s'impose sauf erreur grossière.`]],
  },
  'ts-prix-303': {
    pieges: [`Couper la poire en deux sans comprendre d'où vient l'écart.`],
    relances: [[`Et si l'écart vient d'un risque ponctuel (litige) ?`, `Une specific indemnity ou un escrow, plutôt qu'une baisse de prix définitive.`]],
  },
  'ts-prix-305': {
    pieges: [`Traiter le même risque en debt-like ET en garantie spécifique.`],
    relances: [[`Pourquoi la W&I ne le couvre-t-elle pas ?`, `Un risque identifié en DD est exclu des polices W&I : il faut une protection spécifique (indemnité, escrow, ou une assurance dédiée au risque fiscal).`]],
  },
  'ts-ifrs-101': {
    pieges: [`Dire que les loyers disparaissent du P&L : ils deviennent amortissement + intérêts.`],
    relances: [[`Quelles exemptions ?`, `Les contrats de 12 mois ou moins et les actifs de faible valeur peuvent rester en charges.`]],
  },
  'ts-ifrs-102': {
    pieges: [`Reconnaître le revenue à la facturation ou à l'encaissement.`],
    relances: [[`Un exemple en FDD ?`, `Un contrat logiciel licence + maintenance : la maintenance est reconnue sur la durée, pas au moment de la vente de la licence.`]],
  },
  'ts-ifrs-103': {
    pieges: [`Croire qu'IFRS 18 rend l'EBITDA obligatoire : elle encadre les indicateurs de la direction (MPM) sans imposer l'EBITDA.`],
    relances: [[`Quels sous-totaux deviennent obligatoires ?`, `Le résultat opérationnel (operating profit) et le résultat avant financement et impôt, avec un P&L classé en catégories operating, investing et financing.`]],
  },
  'ts-ifrs-104': {
    pieges: [`Dire que le goodwill est amorti en IFRS.`],
    relances: [[`Et en PCG ?`, `Le goodwill est amorti s'il a une durée d'utilisation limitée ; sinon, il n'est pas amorti mais testé pour dépréciation.`]],
  },
  'ts-ifrs-105': {
    pieges: [`Oublier les engagements de retraite, souvent seulement en annexe en PCG.`],
    relances: [[`Quelle différence peut toucher le NWC ?`, `La reconnaissance du revenue (IFRS 15) et le traitement de l'affacturage peuvent changer les créances et le deferred revenue.`]],
  },
  'ts-ifrs-106': {
    pieges: [`Traiter un deferred tax asset comme du cash : il n'a de valeur que si la société fait des bénéfices imposables.`],
    relances: [[`Est-ce un cash-like ?`, `Rarement en totalité : on le valorise selon son calendrier d'utilisation (actualisé), souvent dans la négociation du prix plutôt qu'en net debt.`]],
  },
  'ts-ifrs-201': {
    pieges: [`Penser qu'IFRS 18 n'a pas d'impact parce que le résultat net ne change pas.`],
    relances: [[`Quel risque pour les contrats de dette ?`, `Si les covenants renvoient à des agrégats « publiés », leur définition peut changer : il faut vérifier et figer les définitions.`]],
  },
  'ts-ifrs-203': {
    pieges: [`Comparer une cash conversion avant et après IFRS 16 sans retraiter les loyers.`],
    relances: [[`Comment calcules-tu une cash conversion comparable ?`, `En partant de l'EBITDA pre-IFRS 16 (après loyers) et en traitant les loyers comme des sorties opérationnelles.`]],
  },
  'ts-ifrs-204': {
    pieges: [`Ignorer le report et la réduction du périmètre (paquet « Omnibus ») : toutes les sociétés ne sont pas concernées.`],
    relances: [[`Quel impact concret en DD ?`, `Des données ESG plus disponibles (émissions, social), des coûts de conformité, et des sujets de valorisation pour les acheteurs soumis à SFDR.`]],
  },
  'ts-ifrs-205': {
    pieges: [`Oublier l'effet impôt et l'actualisation.`],
    relances: [[`Pourquoi le taux d'actualisation compte-t-il ?`, `Un taux plus bas augmente la valeur actuelle de l'engagement : la dette de retraite varie avec les taux.`]],
  },
  'ts-ifrs-301': {
    pieges: [`Comparer des marges sans vérifier les classements (participation des salariés, crédit-bail, dépréciations).`],
    relances: [[`Quelle convention choisis-tu ?`, `Souvent pre-IFRS 16 avec une présentation commune des charges, pour comparer avec les multiples et les covenants.`]],
  },
  'ts-ifrs-302': {
    pieges: [`Laisser les contrats renvoyer à « l'EBITDA publié » sans définition figée.`],
    relances: [[`Comment sécuriser un earn-out ?`, `Définir l'EBITDA dans le contrat lui-même (méthodes, liste des adjustments), indépendamment de la présentation IFRS future.`]],
  },
  'ts-valo-101': {
    pieges: [`Confondre EV et Equity Value (capitalisation boursière).`],
    relances: [[`Société sans dette, 50 de cash, EV de 200 : quelle Equity Value ?`, `250 : Equity Value = EV − net debt = 200 − (−50).`]],
  },
  'ts-valo-103': {
    pieges: [`Citer les méthodes sans dire laquelle on privilégie et pourquoi.`],
    relances: [[`Laquelle donne en général la valeur la plus haute ?`, `Les transaction comparables (control premium, synergies) ; les trading comparables sont plus bas ; le DCF dépend des hypothèses.`]],
  },
  'ts-valo-104': {
    pieges: [`Appliquer le multiple à un EBITDA non ajusté ou d'une autre convention (IFRS 16).`],
    relances: [[`Pourquoi les multiples diffèrent-ils entre secteurs ?`, `Croissance, récurrence, marges, intensité capitalistique et risque : un éditeur de logiciels vaut plus de fois son EBITDA qu'un industriel cyclique.`]],
  },
  'ts-valo-105': {
    pieges: [`Actualiser au WACC des flux après intérêts (levered).`],
    relances: [[`Pourquoi des flux unlevered ?`, `Parce que le WACC rémunère déjà tous les financeurs : on obtient l'EV, puis on déduit la net debt.`]],
  },
  'ts-valo-106': {
    pieges: [`Pondérer avec les valeurs comptables des fonds propres au lieu des valeurs de marché.`],
    relances: [[`Pourquoi le coût de la dette est-il après impôt ?`, `Parce que les intérêts sont déductibles : le coût réel est Kd × (1 − taux d'IS).`]],
  },
  'ts-valo-108': {
    pieges: [`Comparer les P/E de sociétés aux niveaux d'endettement très différents.`],
    relances: [[`Quand le P/E reste-t-il utile ?`, `Pour les banques et assurances (la dette fait partie de l'activité) et pour comparer des sociétés cotées aux structures proches.`]],
  },
  'ts-valo-201': {
    pieges: [`Opposer les deux méthodes : elles se recoupent.`],
    relances: [[`Laquelle privilégies-tu pour un LBO ?`, `Les multiples et la valorisation LBO, avec un DCF en recoupement.`]],
  },
  'ts-valo-203': {
    pieges: [`Choisir des comparables seulement par secteur, sans regarder taille, croissance et marges.`],
    relances: [[`Et s'il n'y a pas de bons comparables cotés ?`, `Je m'appuie sur les transactions, j'élargis à des modèles économiques proches et j'ajuste (décote de taille, croissance).`]],
  },
  'ts-valo-205': {
    pieges: [`Prendre le bêta d'un comparable sans l'ajuster à la structure financière de la cible.`],
    relances: [[`Comment ajuster le bêta ?`, `On le « délève » (unlevered beta) pour retirer l'effet de la dette des comparables, puis on le « relève » avec la structure financière cible.`]],
  },
  'ts-valo-301': {
    pieges: [`Cacher ou minimiser le poids de la terminal value.`],
    relances: [[`Quelles sensitivities montres-tu ?`, `Une table WACC × g (et WACC × exit multiple) : la fourchette montre la dépendance aux hypothèses.`]],
  },
  'ts-valo-302': {
    pieges: [`Dire qu'un des acheteurs se trompe : chacun a sa propre valeur.`],
    relances: [[`Comment un fonds peut-il battre un industriel ?`, `Grâce au levier, à un management package attractif, à une exécution rapide et à une thèse de build-up.`]],
  },
  'ts-valo-303': {
    pieges: [`Appliquer un EV/EBITDA à un EBITDA négatif ou très faible.`],
    relances: [[`Quel indicateur en SaaS ?`, `EV/ARR, ajusté de la croissance et de la rétention (NRR), avec la rule of 40.`]],
  },
  'ts-fit-201': {
    pieges: [`Choisir un deal que tu ne maîtrises pas (chiffres approximatifs, logique floue).`],
    relances: [[`Quel aurait été le point clé de la FDD ?`, `Un sujet précis (qualité de l'EBITDA, NWC, debt-like, carve-out), avec la raison.`], [`Aurais-tu fait le deal à ce prix ?`, `Un avis argumenté : multiple comparé aux comparables, synergies, risques.`]],
  },

  // ================================================================ PRIVATE EQUITY
  'pe-metier-102': {
    pieges: [`Dire que le carry vaut 20 % du profit dès le premier euro : il ne joue qu'au-delà du hurdle (avec catch-up).`],
    relances: [[`Sur quelle base les fees sont-elles calculées après la période d'investissement ?`, `Souvent sur le capital investi (net des cessions) plutôt que sur les commitments, parfois à un taux plus bas.`]],
  },
  'pe-metier-103': {
    pieges: [`Confondre le hurdle avec l'IRR cible du fonds.`],
    relances: [[`Qu'est-ce que le catch-up ?`, `Après le hurdle, le GP reçoit une part plus importante des distributions (souvent 100 % ou 80 %) jusqu'à avoir rattrapé ses 20 % de l'ensemble du profit.`]],
  },
  'pe-metier-105': {
    pieges: [`Comparer des IRR sans regarder la durée.`],
    relances: [[`3x en 7 ans ou 2x en 3 ans : lequel préfères-tu ?`, `3x en 7 ans ≈ 17 % d'IRR, 2x en 3 ans ≈ 26 % : le second a le meilleur IRR, le premier crée plus de valeur ; tout dépend de la capacité à réinvestir et des attentes des LP.`]],
  },
  'pe-metier-106': {
    pieges: [`Confondre TVPI (valeur totale, en partie latente) et DPI (cash réellement rendu).`],
    relances: [[`Pourquoi un TVPI élevé peut-il rassurer à tort ?`, `La valeur résiduelle (RVPI) est une valorisation faite par le GP, pas du cash : elle peut baisser au moment de l'exit.`]],
  },
  'pe-metier-107': {
    pieges: [`Le présenter seulement comme une bonne nouvelle : il pousse aussi les prix à la hausse.`],
    relances: [[`Quel effet sur les prix ?`, `Beaucoup de capital à investir et de la concurrence entre fonds → multiples d'entrée élevés et pression pour investir avant la fin de la période d'investissement.`]],
  },
  'pe-metier-204': {
    pieges: [`Promettre une liquidité totale : les rachats sont limités (plafonds, préavis).`],
    relances: [[`Qu'a changé l'ELTIF 2.0 ?`, `Depuis janvier 2024, des règles assouplies : plus de minimum d'investissement pour les particuliers, univers d'investissement élargi, rachats possibles mais encadrés.`]],
  },
  'pe-metier-206': {
    pieges: [`Croire que les participations restent valorisées au coût jusqu'à l'exit.`],
    relances: [[`Pourquoi les LP s'en méfient-ils ?`, `Ce sont des valorisations faites par le GP : ils les comparent aux prix de sortie réels et aux décotes du marché secondaire.`]],
  },
  'pe-metier-301': {
    pieges: [`Oublier le conflit d'intérêts : le GP est à la fois vendeur et acheteur.`],
    relances: [[`Que peuvent faire les LP de l'ancien fonds ?`, `Vendre (cash au prix fixé) ou réinvestir dans le nouveau véhicule (rollover), parfois avec une option de statu quo.`]],
  },
  'pe-metier-303': {
    pieges: [`Oublier que des TVPI élevés peuvent cacher des valorisations optimistes.`],
    relances: [[`Comment un GP peut-il améliorer son DPI sans vendre ?`, `Dividend recap, NAV financing, continuation vehicle ou cession partielle, à expliquer clairement aux LP.`]],
  },
  'pe-metier-304': {
    pieges: [`Ne voir que l'alignement par le carry et oublier l'incitation à faire grossir le fonds (fees).`],
    relances: [[`Comment les LP limitent-ils ces conflits ?`, `GP commitment (le GP investit dans son fonds, souvent 1-2 %), waterfall européen, frais de transaction déduits des fees, LPAC, reporting détaillé (modèles ILPA).`]],
  },
  'pe-metier-305': {
    pieges: [`Présenter l'IRR comme une mesure de la valeur créée.`],
    relances: [[`Comment un LP s'en protège-t-il ?`, `Il regarde aussi le MOIC, le DPI, l'IRR sans subscription lines, et compare au marché coté (Public Market Equivalent).`]],
  },
  'pe-lbo-102': {
    pieges: [`Oublier le deleveraging, ou faire de la multiple expansion le moteur principal.`],
    relances: [[`Lequel est le plus fiable ?`, `L'EBITDA growth, surtout s'il vient d'actions concrètes (pricing, build-ups) ; la multiple expansion dépend du marché.`]],
  },
  'pe-lbo-105': {
    pieges: [`Oublier que la HoldCo n'a pas de cash propre : elle dépend des remontées de la cible.`],
    relances: [[`Pourquoi ne pas loger la dette d'acquisition dans la cible ?`, `La cible ne peut pas financer ou garantir l'achat de ses propres titres (interdiction de l'assistance financière) : la dette est à la HoldCo, servie par les dividendes et l'intégration fiscale.`]],
  },
  'pe-lbo-106': {
    pieges: [`Le résumer à du multiple arbitrage, sans intégration.`],
    relances: [[`Quel est le rôle de l'analyste ?`, `Cartographier les cibles, suivre le pipeline, modéliser l'impact (EBITDA, levier, multiple moyen d'entrée) et coordonner les DD des add-ons.`]],
  },
  'pe-lbo-112': {
    pieges: [`Rester abstrait (« améliorer l'efficacité ») sans actions ni chiffres.`],
    relances: [[`Quel levier agit le plus vite ?`, `Souvent le pricing : 1 % de hausse de prix à volumes constants tombe presque entièrement dans l'EBITDA.`]],
  },
  'pe-lbo-202': {
    pieges: [`Confondre subordination contractuelle (accord entre créanciers) et subordination structurelle (niveau de la société emprunteuse).`],
    relances: [[`Comment les prêteurs de la HoldCo se protègent-ils ?`, `Nantissement des titres de la cible, garanties des filiales quand c'est possible (limitées par l'intérêt social), convention entre créanciers.`]],
  },
  'pe-lbo-301': {
    pieges: [`Proposer seulement de « réinjecter de l'equity » sans analyse.`],
    relances: [[`Que calcules-tu en premier ?`, `Le headroom des covenants et la liquidité à 12-18 mois : combien de temps la société tient-elle sans action ?`]],
  },
  'pe-lbo-303': {
    pieges: [`Chercher à maximiser l'IRR du base case seul.`],
    relances: [[`Comment testes-tu ton choix ?`, `Avec un downside case : covenants respectés, DSCR au-dessus de 1, liquidité suffisante, et un IRR qui préserve le capital.`]],
  },
  'pe-lbo-306': {
    pieges: [`Se perdre dans le détail d'une étape : on attend une vue d'ensemble en 2-3 minutes.`],
    relances: [[`Où l'analyste apporte-t-il le plus ?`, `Le modèle et l'IC memo, la coordination des DD et la préparation du suivi (100-day plan).`]],
  },
  'pe-rendement-101': {
    pieges: [`Diviser le gain par le nombre d'années (100 % / 5 = 20 %) en oubliant les intérêts composés.`],
    relances: [[`Et 2x en 4 ans ?`, `Environ 19 % (1,19⁴ ≈ 2,01).`]],
  },
  'pe-rendement-102': {
    pieges: [`Répondre 40 % (200 % / 5) en oubliant la capitalisation.`],
    relances: [[`Et 3x en 4 ans ?`, `Environ 32 % (1,32⁴ ≈ 3,04).`]],
  },
  'pe-rendement-103': {
    pieges: [`Penser qu'un même multiple donne le même rendement quelle que soit la durée.`],
    relances: [[`Et 2x en 2 ans ?`, `Environ 41 % (1,414² ≈ 2).`]],
  },
  'pe-rendement-104': {
    pieges: [`Répondre 2x (20 % × 5 = 100 %).`],
    relances: [[`Et sur 4 ans ?`, `Environ 2,1x (1,2⁴ = 2,07).`]],
  },
  'pe-rendement-107': {
    pieges: [`Chercher la précision au centime : on attend des ordres de grandeur justes et une méthode claire.`],
    relances: [[`Que veut voir le recruteur ?`, `Ta compréhension de la mécanique (levier, deleveraging, valeur d'exit), ton calcul mental et ta capacité à commenter le résultat.`]],
  },
  'pe-rendement-108': {
    pieges: [`Oublier de déduire la net debt restante à l'exit.`],
    relances: [[`Comment vérifies-tu ton IRR ?`, `Avec les repères : 2x en 5 ans ≈ 15 %, 2,5x ≈ 20 %, 3x ≈ 25 %.`]],
  },
  'pe-rendement-204': {
    pieges: [`Annoncer un chiffre sans dire « environ » ni la méthode.`],
    relances: [[`Et un MOIC de 2,2x sur 5 ans ?`, `Entre 15 % (2x) et 20 % (2,5x), plus près de 15 % : environ 17 % (1,17⁵ ≈ 2,19).`]],
  },
  'pe-rendement-303': {
    pieges: [`Mélanger les conventions (croissance valorisée à l'exit multiple ET expansion sur l'EBITDA d'exit) : l'effet croisé est compté deux fois et la somme dépasse le gain (170 au lieu de 160).`],
    relances: [[`Quel levier préfères-tu ici, et pourquoi ?`, `L'EBITDA growth (90 sur 160) : il vient de l'exécution ; la multiple expansion (30) dépend du marché et le deleveraging (40) de la dette.`]],
  },
  'pe-rendement-304': {
    pieges: [`Juger le deal sur l'IRR seul.`],
    relances: [[`Combien de temps a duré ce deal ?`, `1,25ⁿ = 1,6 → n ≈ 2,1 ans.`]],
  },
  'pe-dette-101': {
    pieges: [`Oublier le RCF (souvent super senior) dans la structure.`],
    relances: [[`Pourquoi l'unitranche a-t-elle remplacé senior + mezzanine en mid-cap ?`, `Un seul prêteur ou club, une seule documentation, une exécution rapide et certaine, contre une marge plus élevée.`]],
  },
  'pe-dette-103': {
    pieges: [`Oublier les covenants non financiers (information, interdictions de céder des actifs ou de s'endetter).`],
    relances: [[`Que se passe-t-il en cas de breach ?`, `C'est un cas de défaut : les prêteurs peuvent exiger le remboursement, mais en pratique on négocie un waiver, un reset ou une equity cure.`]],
  },
  'pe-dette-110': {
    pieges: [`Oublier le risque de refinancement d'une dette bullet.`],
    relances: [[`Quel profil un fonds préfère-t-il ?`, `Plutôt bullet, pour garder le cash dans la société (croissance, add-ons) ; les banques demandent souvent une part amortissable.`]],
  },
  'pe-dette-201': {
    pieges: [`Dire qu'un prêt cov-lite n'a aucune protection : il garde des incurrence covenants.`],
    relances: [[`Pourquoi le cov-lite est-il plus rare en mid-cap ?`, `Les prêteurs gardent en général un maintenance covenant de leverage pour réagir tôt ; le cov-lite domine surtout le large cap syndiqué.`]],
  },
  'pe-dette-205': {
    pieges: [`Ne citer que les avantages : il coûte plus cher que la dette bancaire.`],
    relances: [[`Quel risque pour le système financier ?`, `Une dette moins transparente, des prêteurs moins régulés que les banques, des valorisations de prêts peu visibles en cas de crise.`]],
  },
  'pe-dette-206': {
    pieges: [`Donner un chiffre unique sans dire de quoi il dépend.`],
    relances: [[`Pourquoi plus de levier pour un éditeur de logiciels ?`, `Revenus récurrents, peu de capex et forte cash conversion : les prêteurs acceptent un levier plus élevé.`]],
  },
  'pe-dette-208': {
    pieges: [`Oublier que la partie non tirée coûte une commission d'engagement.`],
    relances: [[`Et si un add-on sort des critères de la ligne ?`, `Il faut l'accord des prêteurs ou une nouvelle ligne, ce qui ralentit le deal.`]],
  },
  'pe-dette-301': {
    pieges: [`Attendre le test pour prévenir les prêteurs.`],
    relances: [[`Que demandent les prêteurs en échange d'un waiver ?`, `Des frais, une marge plus élevée, parfois un remboursement partiel ou un apport d'equity, et plus d'information.`]],
  },
  'pe-dette-302': {
    pieges: [`Attendre la dernière année avant l'échéance pour agir.`],
    relances: [[`Qu'est-ce que le « mur de maturités » ?`, `Un gros volume de dettes qui arrivent à échéance en même temps : refinancer devient plus difficile et plus cher.`]],
  },
  'pe-valo-105': {
    pieges: [`Comparer des EV/Sales de sociétés aux marges très différentes.`],
    relances: [[`Un EV/Sales de 1x, c'est cher ?`, `Ça dépend de la marge : avec 10 % de marge d'EBITDA, c'est 10x l'EBITDA ; avec 30 %, 3,3x.`]],
  },
  'pe-valo-106': {
    pieges: [`Proposer un earn-out sans dire comment le définir précisément.`],
    relances: [[`Et si le vendeur quitte la société au closing ?`, `Plutôt un vendor loan ou un rollover qu'un earn-out, qui suppose que le vendeur puisse influencer les résultats.`]],
  },
  'pe-valo-204': {
    pieges: [`Penser que l'industriel gagne toujours : les fonds l'emportent souvent par la rapidité et le management package.`],
    relances: [[`Pourquoi l'industriel ne rétrocède-t-il pas toutes ses synergies ?`, `Parce qu'il porte le risque de les réaliser : sinon, il paierait au vendeur la valeur qu'il crée lui-même.`]],
  },
  'pe-valo-205': {
    pieges: [`Présenter ce chiffre comme français : c'est une donnée zone euro.`],
    relances: [[`Pourquoi un multiple moyen peut-il tromper ?`, `Il mélange des actifs très différents : les meilleurs se paient bien plus cher, les autres peinent à trouver preneur.`]],
  },
  'pe-valo-206': {
    pieges: [`Retenir un exit multiple supérieur à l'entrée sans argument.`],
    relances: [[`Le business plan double la taille de la société : peux-tu augmenter l'exit multiple ?`, `Un peu, si la taille, la récurrence ou l'international la font entrer dans une catégorie mieux valorisée ; je le montre en upside, pas en base case.`]],
  },
  'pe-valo-301': {
    pieges: [`Forcer le modèle (plus de dette, exit multiple plus élevé) pour atteindre le prix.`],
    relances: [[`Quand faut-il savoir dire non ?`, `Quand ni une structure (earn-out, rollover, vendor loan) ni une thèse solide ne comblent l'écart : la discipline de prix protège le fonds.`]],
  },
  'pe-valo-303': {
    pieges: [`Payer aujourd'hui des add-ons qui ne sont pas encore signés.`],
    relances: [[`Que vérifies-tu sur le pipeline d'add-ons ?`, `Le nombre de cibles réelles, leurs multiples, la volonté des dirigeants de vendre, et la capacité d'intégration de la platform.`]],
  },
  'pe-these-101': {
    pieges: [`Décrire la société au lieu d'expliquer pourquoi elle va créer de la valeur.`],
    relances: [[`Qu'est-ce qui tuerait ta thèse ?`, `Il faut savoir le dire (perte du pricing power, départ d'un client clé) : c'est ce que les DD doivent tester.`]],
  },
  'pe-these-103': {
    pieges: [`Réciter les 5 forces sans conclure sur l'attractivité du marché.`],
    relances: [[`Laquelle compte le plus pour un fonds LBO ?`, `Souvent le pouvoir des clients et la rivalité : ils déterminent le pricing power, donc la marge et le cash.`]],
  },
  'pe-these-104': {
    pieges: [`Confondre CDD (marché, clients) et FDD (qualité des chiffres).`],
    relances: [[`Qui la réalise ?`, `Des cabinets de conseil en stratégie, mandatés par l'acheteur ou par le vendeur (VDD commerciale).`]],
  },
  'pe-these-105': {
    pieges: [`Un plan trop ambitieux qui sature le management.`],
    relances: [[`Qui le prépare ?`, `Le fonds et le management, dès la fin des DD, qui en fixent les priorités.`]],
  },
  'pe-these-107': {
    pieges: [`Se contenter d'une key man insurance : elle ne couvre ni une démission ni une perte de motivation.`],
    relances: [[`Comment le détectes-tu ?`, `Qui détient les relations clients, qui décide, qui répond aux questions en management presentation.`]],
  },
  'pe-these-108': {
    pieges: [`Lister des red flags sans dire comment on les traite.`],
    relances: [[`Lequel te ferait renoncer à coup sûr ?`, `Un doute sur l'intégrité du management (chiffres manipulés, informations cachées) : aucun prix ne le compense.`]],
  },
  'pe-these-202': {
    pieges: [`Valoriser sur l'EBITDA sans regarder les capex de renouvellement de la flotte.`],
    relances: [[`Quel indicateur clé ?`, `Le taux d'utilisation de la flotte, le revenue par euro de flotte et la valeur de revente du matériel.`]],
  },
  'pe-these-203': {
    pieges: [`Confondre récurrent et garanti : il faut regarder le churn et les conditions de résiliation.`],
    relances: [[`Que vérifies-tu dans les contrats ?`, `Durée restante, clauses de résiliation et de changement de contrôle, indexation des prix.`]],
  },
  'pe-these-204': {
    pieges: [`Citer des thèmes à la mode sans argument ni risque.`],
    relances: [[`Quel thème te paraît surpayé ?`, `Une réponse argumentée (multiples élevés, concurrence, rupture technologique) montre ton esprit critique.`]],
  },
  'pe-these-302': {
    pieges: [`Critiquer le plan sans proposer d'alternative chiffrée.`],
    relances: [[`Qu'est-ce qu'un sponsor case ?`, `Le business plan retenu par le fonds, souvent plus prudent que celui du management, qui sert de base au prix et à la dette.`]],
  },
  'pe-mgmt-101': {
    pieges: [`Croire que les managers reçoivent des actions gratuites : ils investissent leur propre argent.`],
    relances: [[`Quelle part du capital pour le management ?`, `Variable selon la taille et l'opération : souvent quelques % à 15-20 % des ordinary shares.`]],
  },
  'pe-mgmt-203': {
    pieges: [`Dire que tout le gain est taxé comme une plus-value : au-delà du plafond lié à la performance, il est imposé comme un salaire.`],
    relances: [[`Pourquoi ce régime a-t-il été créé ?`, `Pour remplacer une jurisprudence incertaine (décisions du Conseil d'État de 2021 qui requalifiaient certains gains en salaires) par une règle claire.`]],
  },
  'pe-mgmt-301': {
    pieges: [`Dire non par principe : beaucoup de fonds investissent en minoritaire.`],
    relances: [[`Quelles protections pour un fonds minoritaire ?`, `Veto sur les décisions importantes, siège au board, information, clause de liquidité (sortie à un horizon défini), tag-along, parfois des actions de préférence.`]],
  },
  'pe-sortie-101': {
    pieges: [`Oublier les solutions de liquidité (continuation vehicle, dividend recap, cession partielle).`],
    relances: [[`Quelle voie domine aujourd'hui ?`, `Les cessions à d'autres fonds et à des industriels ; les IPO restent rares.`]],
  },
  'pe-sortie-103': {
    pieges: [`Croire que le fonds sort à 100 % le jour de l'introduction.`],
    relances: [[`Qu'est-ce qu'un lock-up ?`, `Une période (souvent 6 à 12 mois) pendant laquelle les actionnaires existants s'engagent à ne pas vendre après l'introduction.`]],
  },
  'pe-sortie-201': {
    pieges: [`Réciter des chiffres sans en tirer de lecture personnelle.`],
    relances: [[`Qu'est-ce que ça change pour un analyste junior ?`, `Plus de travail sur le portefeuille (value creation, add-ons, refinancements) et des process d'exit plus longs et plus sélectifs.`]],
  },
  'pe-sortie-205': {
    pieges: [`Confondre les seuils français et européens.`],
    relances: [[`Pourquoi est-ce important pour un fonds ?`, `Le contrôle des concentrations fixe le délai entre signing et closing : moins d'opérations à notifier, ce sont des closings plus rapides.`]],
  },
  'pe-sortie-302': {
    pieges: [`Vendre à n'importe quel prix pour respecter le calendrier.`],
    relances: [[`Que demandent les LP dans ce cas ?`, `De la transparence, un plan par participation, et souvent une baisse des management fees pendant la prolongation.`]],
  },
  'pe-fit-101': {
    pieges: [`Réciter son CV ligne par ligne, ou dépasser 2 minutes.`],
    relances: [[`Qu'est-ce qui n'est pas sur ton CV ?`, `Un élément personnel qui montre ta motivation ou ton caractère (ta veille de deals, un projet, un sport).`]],
  },
  'pe-fit-202': {
    pieges: [`N'avoir aucun avis sur le prix ou la thèse.`],
    relances: [[`Quelle serait ta principale question en DD ?`, `Un point précis (qualité de l'EBITDA, NWC, dépendance client, capex) qui montre ton regard d'investisseur.`]],
  },
  'pe-fit-303': {
    pieges: [`Choisir une action sans pouvoir défendre sa valorisation ni ses risques.`],
    relances: [[`Quand la vendrais-tu ?`, `À un prix cible, ou si un événement invalide la thèse : un investisseur sait à l'avance ce qui le ferait vendre.`]],
  },
};
