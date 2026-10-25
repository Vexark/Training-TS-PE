// PE — Fit et motivation
import { q, theme } from '../fabriques.js';

export default theme('pe', 'fit', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Présente-toi en 2 minutes.`, {
    duree: 120,
    courte: `<p><strong>Accroche</strong> (qui tu es en une phrase) → <strong>parcours</strong> (2-3 étapes avec une réalisation chiffrée) → <strong>pourquoi le PE</strong> (le déclic, relié à tes expériences) → <strong>pourquoi ce fonds, maintenant</strong>. 90 à 120 secondes (guide Copeps).</p>`,
    complete: `<ul><li>Chaque ligne du CV doit pouvoir être expliquée : les recruteurs PE reviennent souvent sur les choix académiques et professionnels.</li><li>Preuve concrète de motivation : ta veille hebdomadaire de deals publiée sur LinkedIn.</li></ul>`,
    points: [[`Accroche / fil rouge`, ['parcours', 'formation', 'ecole']], [`Réalisations concrètes`, ['realis', 'projet', 'deal', '%']], [`Pourquoi le PE`, ['private equity', 'pe', 'investissement', 'fonds']], [`Pourquoi ce fonds`, ['fonds', 'equipe', 'strategie']]],
  }),
  q('102', 1, `Pourquoi le private equity ?`, {
    courte: `<p>Trois raisons + une preuve : le <strong>rôle d'investisseur</strong> (se forger un avis et le défendre devant un comité) ; l'<strong>impact dans la durée</strong> sur une entreprise et avec ses dirigeants (buy-and-build, structuration, international) ; la <strong>diversité</strong> (finance, stratégie, opérations, humain). Preuve : ta veille de deals, une analyse qui t'a marqué, une expérience.</p>`,
    pieges: [`« Pour l'argent » ou « parce que c'est prestigieux ».`],
    points: [[`Rôle d'investisseur / jugement`, ['investisseur', 'avis', 'jugement', 'decision']], [`Impact dans la durée`, ['duree', 'accompagn', 'impact', 'dirigeant']], [`Diversité`, ['strateg', 'operation', 'divers']], [`Preuve concrète`, ['veille', 'experience', 'exemple', 'analyse']]],
  }),
  q('103', 1, `Pourquoi le mid-cap, et pourquoi notre fonds ?`, {
    courte: `<p><strong>Mid-cap</strong> : proximité des dirigeants (souvent fondateurs), value creation <strong>opérationnelle</strong>, polyvalence du junior, buy-and-build. <strong>Ce fonds</strong> : sa stratégie (sectorielle, majoritaire / minoritaire), son ticket, <strong>2-3 participations</strong> que tu connais et pourquoi elles t'intéressent, un deal que tu aurais aimé faire, une personne rencontrée.</p>`,
    conseil: `Fiche par fonds : stratégie, taille du dernier fonds, ticket, 3 deals récents, 1 deal que tu aurais aimé faire.`,
    points: [[`Arguments mid-cap`, ['mid-cap', 'mid cap', 'dirigeant', 'operationnel']], [`Participations citées`, ['participation', 'portefeuille', 'deal']], [`Stratégie / ticket`, ['strategie', 'ticket', 'secteur']], [`Lien avec ton profil`, ['profil', 'competence', 'apporter']]],
  }),
  q('104', 1, `As-tu des questions pour nous ?`, {
    duree: 90,
    courte: `<p>Oui, 3 questions qui montrent que tu as lu leurs deals : <strong>rôle de l'analyste</strong> (origination / exécution / suivi), <strong>value creation</strong> de leurs derniers deals (part des add-ons ?), <strong>vision du marché des exits</strong> pour leur portefeuille, ce qui distingue les analystes qui réussissent chez eux.</p>`,
    pieges: [`Demander ce qui est sur le site du fonds.`],
    points: [[`Au moins 2 questions`, ['?']], [`Rôle de l'analyste`, ['analyste', 'role', 'quotidien']], [`Stratégie / portefeuille / exits`, ['strategie', 'portefeuille', 'build', 'exit', 'sortie']], [`Réussite`, ['reussi', 'evolution']]],
  }),
  q('105', 1, `Quelles sont tes qualités et un défaut ?`, {
    courte: `<p><strong>Deux qualités utiles en PE</strong> (esprit critique, rigueur analytique, capacité de travail, relationnel avec des dirigeants), chacune <strong>prouvée par un exemple</strong> ; <strong>un défaut réel</strong> non rédhibitoire et ce que tu fais pour le corriger.</p>`,
    points: [[`Qualités utiles en PE`, ['critique', 'rigueur', 'analyti', 'travail', 'relation']], [`Exemples`, ['exemple', 'lors de']], [`Défaut réel`, ['defaut']], [`Correction`, ['corrig', 'travaille', 'progress']]],
  }),
  q('106', 1, `Quel est ton plus grand échec ?`, {
    courte: `<p>Méthode STAR avec un <strong>vrai échec</strong> (pas une réussite déguisée) : situation, ce que tu as fait, pourquoi ça n'a pas marché (<strong>ta part de responsabilité</strong>), ce que tu as <strong>appris</strong> et comment tu l'as appliqué depuis.</p>`,
    points: [[`Situation claire`, ['situation', 'contexte']], [`Responsabilité assumée`, ['j ai', 'erreur', 'responsab']], [`Leçon`, ['appris', 'lecon']], [`Application depuis`, ['depuis', 'desormais', 'applique']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Pitch-moi une entreprise dans laquelle tu investirais.`, {
    duree: 150,
    courte: `<p><strong>Conclusion d'abord</strong> (« j'investirais dans X, parce que… »), puis : description (activité, taille, clients), <strong>marché</strong>, <strong>avantage compétitif</strong>, <strong>financiers</strong> (croissance, marges, cash conversion), <strong>thèse en 3 points</strong> et leviers, <strong>2 risques et parades</strong>, <strong>valorisation, IRR attendu et exit</strong>.</p>`,
    points: [[`Conclusion d'abord`, ['j investirais', 'parce que', 'recommand']], [`Marché / moat`, ['marche', 'concurren', 'avantage', 'moat']], [`Financiers`, ['marge', 'croissance', 'ebitda', 'cash']], [`Leviers / risques`, ['levier', 'risque', 'build']], [`Valorisation / IRR / exit`, ['valorisation', 'multiple', 'irr', 'exit']]],
  }),
  q('202', 2, `Parle-moi d'un deal récent que tu as suivi.`, {
    duree: 150,
    courte: `<p><strong>Acteurs et type d'opération</strong> (LBO primaire / secondaire, build-up, exit) → <strong>chiffres</strong> publics (EV, multiple) → <strong>logique</strong> (pourquoi ce fonds, pourquoi maintenant, leviers) → <strong>structuration</strong> (dette, rollover, co-investisseurs) → <strong>risques</strong> → <strong>ton avis</strong> (aurais-tu investi à ce prix ?).</p>`,
    complete: `<p>Utilise l'exercice « Pitch d'un deal » : il pioche dans ta Veille de deal et ta propre analyse sert de corrigé.</p>`,
    points: [[`Acteurs et type d'opération`, ['fonds', 'acquereur', 'vendeur', 'lbo', 'build']], [`Chiffres`, ['valeur', 'multiple', 'ebitda', 'm€', 'md']], [`Logique / leviers`, ['logique', 'levier', 'strateg']], [`Structuration / risques`, ['dette', 'structur', 'risque']], [`Avis`, ['avis', 'je pense', 'j aurais']]],
  }),
  q('203', 2, `Pourquoi devrions-nous te recruter plutôt qu'un candidat venant de la banque d'affaires ?`, {
    courte: `<p>Des compétences directement utiles en exécution : lecture fine d'une <strong>Financial Due Diligence</strong> (Quality of Earnings, NWC, net debt), capacité à <strong>challenger les conseils</strong> ; <strong>rigueur</strong> sur les données ; <strong>motivation prouvée</strong> (veille hebdomadaire de deals, analyses de LBO). Et l'honnêteté sur les atouts des banquiers (modélisation, process) avec ton plan pour les acquérir.</p>`,
    points: [[`Compétences DD (QoE, NWC, net debt)`, ['qoe', 'ebitda', 'nwc', 'net debt', 'due diligence']], [`Rigueur / données`, ['rigueur', 'donnees']], [`Motivation prouvée`, ['veille', 'analyse', 'linkedin']], [`Honnêteté / plan de progrès`, ['modelis', 'apprend', 'progress']]],
  }),
  q('204', 2, `Quels fonds admires-tu, et pourquoi ?`, {
    courte: `<p><strong>Deux fonds</strong> avec des raisons <strong>précises</strong> : une stratégie claire (buy-and-build sectoriel, minoritaire, ESG), un deal emblématique et la valeur qu'il a créée, une approche opérationnelle. Évite de citer en premier le fonds en face de toi, sauf si tu peux l'argumenter très finement.</p>`,
    points: [[`Au moins 2 fonds`, ['fonds', 'capital', 'partners']], [`Raisons précises`, ['strategie', 'deal', 'build', 'participation']], [`Valeur créée`, ['valeur', 'croissance', 'transform']]],
  }),
  q('205', 2, `Comment gères-tu un désaccord avec ton associate ou ton partner sur un deal ?`, {
    courte: `<p>Je prépare des <strong>faits et chiffres</strong>, je demande un moment en <strong>privé</strong>, j'<strong>écoute</strong> son raisonnement (il a souvent plus de contexte), j'expose le mien calmement, je propose une <strong>analyse complémentaire</strong> pour trancher ; une fois la décision prise, je l'applique pleinement.</p>`,
    points: [[`Faits et chiffres`, ['fait', 'chiffre', 'analyse']], [`Privé et calme`, ['prive', 'calme']], [`Écoute`, ['ecout', 'contexte']], [`Application de la décision`, ['decision', 'appliqu']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Une participation rate son budget trois trimestres de suite. Que fais-tu ?`, {
    courte: `<p>1) <strong>Diagnostiquer</strong> : marché, exécution, budget irréaliste ? (données mensuelles, discussion franche avec le dirigeant). 2) <strong>Plan d'action</strong> chiffré avec le management et suivi rapproché. 3) <strong>Dette</strong> : anticiper les covenants, parler aux prêteurs. 4) <strong>Gouvernance</strong> : renforcer l'équipe (DAF, directeur des opérations), et en dernier recours changer de dirigeant.</p>`,
    points: [[`Diagnostic des causes`, ['diagnost', 'cause', 'comprendre']], [`Plan d'action et suivi`, ['plan', 'suivi', 'reporting']], [`Covenants / prêteurs`, ['covenant', 'preteur', 'banque']], [`Gouvernance / équipe`, ['gouvernance', 'equipe', 'dirigeant', 'recrut']]],
  }),
  q('302', 3, `Si tu étais au comité d'investissement demain, quelle question poserais-tu sur un dossier ?`, {
    courte: `<p>Une question qui montre ton jugement : « <strong>Dans quel scénario perd-on de l'argent</strong>, et avec quelle probabilité ? », « L'IRR tient-il <strong>sans multiple expansion</strong> ? », « Quelle part de la value creation dépend du <strong>management</strong>, et est-il aligné ? », « <strong>Qui achète</strong> à l'exit, et pourquoi paierait-il plus que nous ? »</p>`,
    points: [[`Scénario de perte`, ['perd', 'downside', 'perte']], [`Sans multiple expansion`, ['multiple', 'expansion']], [`Management aligné`, ['management', 'align']], [`Acheteurs à l'exit`, ['acheteur', 'exit', 'sortie']]],
  }),
  q('303', 3, `Pitch-moi une action cotée que tu détiens ou suivrais (par exemple dans ton PEA).`, {
    duree: 150,
    courte: `<p>Même structure qu'une thèse : <strong>conclusion</strong>, activité, <strong>moat</strong>, <strong>financiers</strong> (croissance, marges, cash, dette), <strong>valorisation</strong> (multiples vs historique et pairs), <strong>catalyseurs</strong>, <strong>risques</strong>, et ce qui te ferait changer d'avis. Montre que tu raisonnes en investisseur, pas en parieur.</p>`,
    complete: `<ul><li>Différence avec le PE : en bourse tu es minoritaire, sans contrôle ni levier ; ta thèse repose sur la valorisation et les catalyseurs.</li><li>Pour un ETF (comme un ETF monde), explique la logique d'allocation (diversification, coût, horizon) plutôt qu'une thèse de société.</li></ul>`,
    points: [[`Conclusion / thèse`, ['conclusion', 'these', 'j achete', 'recommand']], [`Moat / financiers`, ['moat', 'avantage', 'marge', 'croissance', 'cash']], [`Valorisation (multiples, pairs)`, ['valorisation', 'multiple', 'per', 'pairs']], [`Catalyseurs / risques`, ['catalyseur', 'risque']], [`Ce qui ferait changer d'avis`, ['changer d avis', 'si', 'condition']]],
  }),
]);
