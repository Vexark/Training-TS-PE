// Fiches de révision : l'essentiel de chaque thème, à relire la veille d'un entretien.
const bloc = (titre, lignes) => `<h4>${titre}</h4><ul>${lignes.map((l) => `<li>${l}</li>`).join('')}</ul>`;
const phrase = (texte) => `<p class="phrase">💬 ${texte}</p>`;

export const FICHES = {
  ts: {
    metier: bloc('L\'essentiel', [
      'TS = accompagnement financier des transactions ; cœur : la <strong>due diligence financière</strong> (DDF).',
      'Trois questions qui font le prix : <strong>adjusted EBITDA</strong>, <strong>normalised NWC</strong>, <strong>adjusted net debt</strong>. Plus : cash-flows et revue du business plan.',
      '<strong>Buy-side</strong> (pour l\'acheteur : risques, négociation) vs <strong>VDD</strong> (pour le vendeur : processus d\'enchères plus rapide, message maîtrisé ; reliance letter pour l\'acheteur final, hold harmless pour les autres).',
      'Étapes : cadrage (périmètre, matérialité) → demande d\'informations / data room → entretiens DAF → analyses → red flags au fil de l\'eau → rapport + databook → support SPA.',
      'Pas un audit : pas de certification, une analyse orientée décision.',
    ]) + bloc('Process d\'enchères', [
      'Tour 1 : teaser, NDA, mémorandum → offres indicatives.',
      'Tour 2 : data room, VDD, management presentation → offres fermes, commentaires sur le SPA → exclusivité → signing → closing.',
    ]) + phrase('« La DD ne certifie pas les comptes : elle dit au client combien vaut vraiment ce qu\'il achète et ce qu\'il doit négocier. »'),

    comptes: bloc('L\'essentiel', [
      'EBE (PCG) = VA + subventions d\'exploitation − impôts et taxes − charges de personnel. EBITDA = indicateur non normé : toujours préciser sa définition.',
      'Dotations aux dépréciations de créances : sous l\'EBE en PCG → souvent réintégrées comme coût récurrent en DD.',
      'Production immobilisée / R&D activée : gonflent l\'EBITDA sans cash → regarder EBITDA − capex.',
      'Crédit-bail en PCG : charges externes, hors bilan → dette selon la convention.',
      'Cut-off : CA de fin d\'année gonflé l\'année de la vente = red flag classique.',
    ]) + bloc('Les 3 états — réflexe machine 100, 5 ans, IS 25 %', [
      'P&L : dotation 20 → résultat net −15.',
      'Cash : −100 + 5 (économie d\'impôt) = −95.',
      'Bilan : immobilisation +80, cash −95, capitaux propres −15 → équilibré.',
      'Mise au rebut ensuite (VNC 60) : résultat −45, cash +15.',
    ]) + phrase('« Je commence toujours par le compte de résultat, puis le cash, et je vérifie que le bilan s\'équilibre. »'),

    qoe: bloc('Trois familles d\'ajustements', [
      '<strong>Non récurrents</strong> : coûts de la cession, litige isolé, sinistre, plus-value d\'actif, reprise de provision sans objet.',
      '<strong>Normatifs</strong> (conditions de marché) : rémunération du dirigeant, loyer SCI, management fees / stand-alone costs.',
      '<strong>Pro forma / run-rate</strong> : année pleine d\'une acquisition, contrat perdu ou gagné, fermeture de site (exiger des preuves).',
    ]) + bloc('Réflexes', [
      'Un « non récurrent » tous les ans est récurrent.',
      'Synergies de l\'acheteur : jamais dans l\'EBITDA de la cible.',
      'Cohérence EBITDA / dette / NWC : jamais de double comptage.',
      'Qualité : conversion cash, récurrence, concentration, prix / volume / mix, données mensuelles.',
      'Impact : 0,1 M€ d\'EBITDA à 9x = 0,9 M€ de prix.',
    ]) + phrase('« L\'adjusted EBITDA, c\'est ce que l\'acheteur gagnera en régime normal, dans les conditions d\'après le closing. »'),

    bfr: bloc('L\'essentiel', [
      'normalised NWC = niveau normal = en général <strong>moyenne mensuelle LTM</strong>, retraitée (hors exploitation, non récurrent).',
      '<strong>Peg</strong> dans le SPA : ajustement euro pour euro = NWC au closing − peg.',
      'Protège contre le window dressing (fournisseurs retardés, encaissements accélérés).',
      'Saisonnalité forte → peg mensualisé ; prévoir le financement du pic (RCF, affacturage).',
      'Deconsolidating factoring : réintégrer les créances au NWC et le financement en dette.',
    ]) + bloc('Formules', [
      'DSO = créances TTC / CA TTC × 365 ; DIO = stock / coût des ventes × 365 ; DPO = fournisseurs TTC / achats TTC × 365.',
      'Cash libéré par −N jours de DSO = CA TTC / 365 × N (une seule fois).',
    ]) + phrase('« Le peg empêche le vendeur de transformer son NWC en trésorerie juste avant le closing. »'),

    dette: bloc('Définition', [
      'Net debt = dettes financières (emprunts, découverts, intérêts courus, comptes courants, crédit-bail/locations selon convention) − trésorerie <strong>libre</strong>.',
      'Debt-like : sortie de cash certaine ou probable, liée au passé, sans contrepartie dans l\'EBITDA futur, hors normalised NWC.',
    ]) + bloc('Liste à réciter', [
      'Provisions pour litiges (nettes d\'IS), retraites non provisionnées, IS dû des exercices passés, dividendes votés, earn-outs à payer, bonus de transaction, capex en retard, fournisseurs d\'immobilisations échus, affacturage, avances remboursables, fournisseurs très en retard (part anormale).',
      'Pas du cash : trésorerie nantie, dépôts de garantie, cash piégé à l\'étranger, cash minimum opérationnel.',
      'Cash-like : créance de carry-back ou de CIR encaissable rapidement.',
      'Pas de la dette : congés payés courants, fournisseurs courants (NWC), subventions non remboursables.',
    ]) + phrase('« Pour chaque poste : sortie de cash probable ? liée au passé ? déjà dans l\'EBITDA ou le NWC ? »'),

    prix: bloc('Locked box', [
      'Prix figé sur un bilan de référence ; pas d\'ajustement après closing.',
      'Protection : interdiction des <strong>leakages</strong> (dividendes, management fees, bonus, frais du vendeur), sauf <strong>permitted leakages</strong> listés.',
      '<strong>Ticking fee</strong> : rémunère le cash généré entre la date de locked box et le closing.',
      'Pour : processus compétitifs, vendeur fonds, bilan stable.',
    ]) + bloc('Completion accounts', [
      'Prix provisoire, ajusté après closing sur la net debt et le NWC réels (vs peg).',
      'Pour : carve-out, saisonnalité, cible fragile. Contre : coût, délais, litiges (expert).',
    ]) + bloc('Autres outils', [
      'Earn-out (définition précise de l\'EBITDA, risque de manipulation), GAP (franchise, plafond, durée), W&I, séquestre, annexe chiffrée des définitions.',
    ]) + phrase('« Locked box : certitude pour le vendeur ; completion accounts : protection pour l\'acheteur. »'),

    ifrs: bloc('À connaître', [
      '<strong>IFRS 16</strong> : locations au bilan ; EBITDA ↑, dette ↑. Cohérence pré/post-IFRS 16 entre EBITDA, dette et multiple.',
      '<strong>IFRS 15</strong> : revenu au transfert du contrôle, 5 étapes ; agent vs principal.',
      '<strong>IFRS 18</strong> (exercices ouverts à compter du 1er janvier 2027) : catégories et sous-totaux du compte de résultat, MPM (adjusted EBITDA publié, réconcilié, audité), comparatifs retraités → covenants et earn-outs à revoir.',
      '<strong>IFRS 3 / IAS 36</strong> : goodwill non amorti, test de dépréciation annuel. PCG : fonds commercial présumé à durée non limitée.',
      '<strong>IAS 19</strong> : indemnités de fin de carrière ; <strong>IAS 12</strong> : impôts différés actifs.',
      '<strong>CSRD</strong> : informations de durabilité ; périmètre réduit par le paquet Omnibus ; ESRS révisées adoptées par la Commission en juillet 2026 (guide Chambers 2026).',
    ]) + phrase('« IFRS 18 ne tue pas l\'adjusted EBITDA : il oblige à l\'expliquer et à le réconcilier. »'),

    valo: bloc('EV-to-Equity bridge', [
      'EV − dette financière nette − debt-like ± écart de NWC − minoritaires + actifs hors exploitation = Equity Value.',
      '1 € d\'EBITDA = « multiple » € de prix ; 1 € de dette = 1 € de prix.',
    ]) + bloc('Méthodes', [
      'Multiples (comparables, transactions avec prime de contrôle) = valeur relative ; DCF = valeur intrinsèque (valeur terminale = 60-80 %).',
      'WACC = Ke × E/(D+E) + Kd × (1 − t) × D/(D+E) ; Gordon : FCF n+1 / (WACC − g).',
      'EV / EBITDA plutôt que PER : indépendant de la dette, de l\'impôt et des amortissements.',
    ]) + phrase('« Mes ajustements d\'EBITDA se multiplient par le multiple ; mes ajustements de dette se paient euro pour euro. »'),

    fit: bloc('Méthode', [
      'Présentation : 90-120 s, fil rouge, réalisations chiffrées, pourquoi TS, pourquoi ici.',
      'Pourquoi TS : au cœur des deals, analyse exigeante, variété, apprentissage ; éviter le « tremplin vers le PE ».',
      'Pourquoi ce cabinet : faits précis (équipe, clients, deals), rencontres, culture.',
      'Comportemental : méthode STAR (Situation, Tâche, Action, Résultat).',
      'Deal récent : acteurs, chiffres, logique, angle TS (ce que tu aurais regardé en DD), avis.',
      'Toujours 3 questions à poser à la fin.',
    ]) + phrase('« Ce qui m\'attire en TS, c\'est que mon analyse change concrètement un prix et une décision. »'),

    cas: bloc('Réussir un cas pratique TS (1h30 à 2h, souvent restitué à l\'oral)', [
      'Lire tout le cas d\'abord, repérer la matérialité et les questions posées.',
      'Construire le pont EBITDA reported → ajusté avec une ligne par ajustement et son « pourquoi ».',
      'Tableau de adjusted net debt ; NWC mensuel → peg ; Equity Value.',
      'Garder 15 minutes pour la synthèse : 3 messages clés chiffrés + impact prix + recommandation (mécanisme, garanties).',
      'Annoncer ses hypothèses quand une information manque.',
    ]),
  },
  pe: {
    metier: bloc('L\'essentiel', [
      'GP (société de gestion) / LP (assureurs, retraites, souverains, family offices, fonds de fonds, Bpifrance).',
      'Fonds fermé ~10 ans : investissement 4-5 ans, puis cessions.',
      'Frais de gestion ~1,5-2 % (engagements puis capital investi) ; carried ~20 % au-delà d\'un hurdle ~8 % ; catch-up souvent 100 %.',
      'Waterfall européen (fonds entier) vs américain (deal par deal, clawback).',
      'Indicateurs : IRR, MOIC, DPI (cash rendu / appelé), RVPI, TVPI ; J-curve.',
      'Tendances : continuation vehicles, secondaires, NAV financing, fonds evergreen (ELTIF 2.0), co-investissements.',
    ]) + bloc('Carried avec catch-up complet', [
      'Hurdle H = capital × (1,08^n − 1). Si profit ≥ 1,25 H : carried = 20 % du profit ; entre H et 1,25 H : profit − H ; sous H : 0.',
    ]) + phrase('« Le GP gagne surtout via le carried : ses intérêts sont alignés avec la performance pour les LP. »'),

    lbo: bloc('L\'essentiel', [
      'Holding (NewCo) financée par equity + dette d\'acquisition, remboursée par les dividendes de la cible.',
      'Leviers : financier (Re = Ra + (Ra − i) × D/E), fiscal (intégration fiscale ≥ 95 % ; déductibilité limitée au plus élevé de 3 M€ ou 30 % de l\'EBITDA fiscal ; amendement Charasse), juridique, managérial.',
      'Value creation : EBITDA growth, multiple, deleveraging (+ build-up : arbitrage de multiples).',
      'Types : primaire, secondaire (SBO), MBO, MBI, OBO ; build-up (plus de 50 % des deals en France au S1 2026, guide Chambers).',
      'Cible idéale : cash prévisible, peu de capex, NWC maîtrisé, position forte, bon management.',
    ]) + phrase('« Un bon LBO crée d\'abord de la valeur par l\'EBITDA ; la dette amplifie, elle ne crée pas. »'),

    rendement: bloc('Repères de tête', [
      '2x : 3 ans ≈ 26 % · 4 ans ≈ 19 % · 5 ans ≈ 15 % · 7 ans ≈ 10 %.',
      '2,5x en 5 ans ≈ 20 % · 3x en 5 ans ≈ 25 % · 3x en 3 ans ≈ 44 %.',
      '1,2⁵ ≈ 2,49 · 1,25⁴ ≈ 2,44 · 1,15⁵ ≈ 2,01 · 1,3³ ≈ 2,20. Règle de 72.',
    ]) + bloc('Paper LBO en 5 étapes', [
      '1. Prix d\'entrée = EBITDA × multiple (+ frais). 2. Dette = x × EBITDA ; equity = emplois − dette.',
      '3. Cash disponible pour la dette (après intérêts, impôts, capex, NWC). 4. Dette à la sortie = dette − cash cumulé.',
      '5. Equity sortie = EBITDA sortie × multiple − net debt ; MOIC ; IRR par les repères.',
    ]) + phrase('« J\'annonce chaque étape à voix haute et j\'arrondis : on juge ma méthode autant que mon chiffre. »'),

    dette: bloc('Tranches', [
      'Senior (A amortissable, B in fine, 5-7 ans) ; unitranche (dette privée, in fine) ; mezzanine / PIK ; RCF ; capex / acquisition line (DDTL) ; vendor loan.',
      'Rang : senior → subordonné → OC → actions de préférence → ordinaires.',
    ]) + bloc('Covenants', [
      'Levier (DN / EBITDA), ICR (EBITDA / intérêts), DSCR (cash / service de la dette), capex max.',
      'Headroom = 1 − DN / (levier max × EBITDA). Cov-lite = pas de covenant de maintenance.',
      'Bris : anticiper, waiver / reset, equity cure, amend & extend, refinancement, mandat ad hoc / conciliation.',
    ]) + phrase('« Le levier se dimensionne sur la prévisibilité du cash, pas sur l’IRR qu\'on veut afficher. »'),

    valo: bloc('L\'essentiel', [
      'Comparables, transactions, DCF, et surtout <strong>valorisation LBO</strong> : prix max = (equity de sortie / multiple cible) + dette d\'entrée.',
      'Ne pas compter sur une hausse du multiple dans le cas de base.',
      'Valuation gap : earn-out, rollover du vendeur, vendor loan, actions de préférence.',
      'Multiples élevés : récurrence, croissance, marges, conversion cash, leadership, build-up.',
      'Repère cité par le guide Chambers 2026 : ~10x l\'EBITDA en moyenne dans le lower mid-market de la zone euro.',
    ]) + phrase('« Je pars de mon IRR cible pour savoir combien je peux payer, pas l\'inverse. »'),

    these: bloc('Structure d\'une thèse', [
      '1. Conclusion d\'abord. 2. Marché (taille, croissance, cyclicité). 3. Positionnement / barrières. 4. Modèle (récurrence, marges, cash). 5. Management. 6. Leviers de value creation. 7. Risques + parades. 8. Rendement (base / défavorable) et sortie.',
    ]) + bloc('Outils', [
      '5 forces de Porter ; DD commerciale ; management presentation ; 100-day plan ; downside case ; DD ESG.',
      'Red flags : concentration client, key man, cyclicité, capex lourds, NWC qui dérive, dépendance réglementaire.',
    ]) + phrase('« J\'irais, parce que… ; les deux risques sont… ; on les traite par… ; on fait X fois en 5 ans sans hausse du multiple. »'),

    mgmt: bloc('L\'essentiel', [
      'But : alignement, « skin in the game ».',
      'Sweet equity : managers en actions ordinaires, fonds surtout en OC / actions de préférence (coupon capitalisé) → les managers démultiplient leur gain.',
      'Envy ratio = prix payé par le fonds pour 1 % des ordinaires / prix payé par les managers.',
      'Ratchet, BSPCE, AGA, BSA ; good / bad leaver ; pacte : drag-along, tag-along, préemption, inaliénabilité, liquidité.',
      'Fiscalité (art. 163 bis H, LF 2025 ajustée par la LF 2026) : gain en principe imposé comme un salaire (jusqu\'à ~59 %), sauf une fraction plafonnée (liée à 3 fois la performance de la société) en plus-value, sous conditions.',
    ]) + phrase('« Le package doit récompenser la value creation au-delà du rendement des instruments du fonds. »'),

    sortie: bloc('Sorties', [
      'Industriel (synergies, paie souvent plus), fonds (SBO), IPO (marginale), dividend recap, continuation vehicle (conflit d\'intérêts → prix indépendant, LPAC).',
      'VDD + W&I = sortie propre pour un fonds vendeur.',
    ]) + bloc('Marché France (guide Chambers Private Equity 2026)', [
      '2025 : record de 83,2 Md€ sur 1 082 deals ; S1 2026 : 25,2 Md€ sur 470 deals.',
      'Add-ons > 50 % des deals au S1 2026 ; investisseurs américains : 25,7 % de la valeur.',
      'Sorties : ~26,9 Md€ en 2025 (4e année de baisse), ~8,5 Md€ au S1 2026 ; sponsor-to-sponsor : 76,9 % de la valeur au T1 2026.',
      'Levées : 11,8 Md€ (25 fonds) en 2025, 2,4 Md€ (7 fonds) au S1 2026 ; dry powder 33,8 Md€ fin 2025.',
      'Deals cités : Antin / Idex, Eurazeo / Aroma-Zone, Ardian / Akuo, Advent / Kereis, PAI / Froneri (continuation).',
      'Contrôle des concentrations : seuils relevés au 1er septembre 2026 (250 M€ mondial / 80 M€ France).',
    ]) + phrase('« Le marché récompense aujourd\'hui la value creation opérationnelle et les build-ups ; la sortie se prépare dès l\'entrée. »'),

    fit: bloc('Méthode', [
      'Présentation 90-120 s ; chaque ligne du CV doit être explicable.',
      'Pourquoi le PE : rôle d\'investisseur, impact dans la durée, diversité ; preuve concrète (veille hebdomadaire de deals).',
      'Pourquoi ce fonds : stratégie, ticket, 2-3 participations, un deal que tu aurais aimé faire.',
      'Pitch d\'une entreprise : conclusion, marché, avantage, financiers, leviers, risques, valo / IRR, sortie.',
      'Questions à poser : rôle de l\'analyste, value creation des derniers deals, sorties.',
    ]) + phrase('« Ce qui me motive, c\'est de me forger un avis d\'investisseur et de le défendre devant un comité. »'),

    cas: bloc('Réussir une étude de cas PE', [
      'Mega-funds : paper LBO chronométré ; mid-cap : cas de quelques heures ou à la maison, souvent avec un mémo d\'investissement.',
      'Ne pas « sur-modéliser » : on teste une décision, pas seulement un Excel.',
      'Toujours : rendement du cas de base ET du cas défavorable, pont de value creation, recommandation tranchée (go / go sous conditions / no-go).',
      'Repérer les red flags que les autres ratent (concentration, key man, capex, NWC).',
    ]),
  },
};
