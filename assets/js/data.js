/* ============================================================
   Labokem Laboratories Pvt. Ltd. — Central Data Store
   Single source of truth. Client-supplied data only.
   NEVER invent salt / composition / medical claims.
   Missing info => null, rendered as "Details to be updated".
   Architecture ready for Generic (23) + OTC expansion.
   ============================================================ */
'use strict';

window.LABOKEM = window.LABOKEM || {};

window.LABOKEM.DATA = {
  company: {
    name: 'Labokem Laboratories Private Limited',
    shortName: 'Labokem Laboratories',
    industry: 'Pharmaceuticals / Pharma Products / CFA',
    tagline: 'Trusted Pharma Business Information Platform',
    description:
      'Internal + informative business platform for divisions, products, team hierarchy, business-manager mapping, parties, areas and product information.'
  },

  divisions: [
    {
      id: 'ethical',
      name: 'Ethical Division',
      slug: 'ethical',
      status: 'live',
      tagline: 'Prescription-driven ethical portfolio',
      productCountLabel: '13 Products',
      productCount: 13,
      head: 'Deepak Gupta (field) / Gaurav Singh (RBM Ethical, alag chain)',
      description:
        'Fully implemented in v1. Team, areas, parties and all 13 products mapped structurally for Product → Business Manager → Party → Area tracing. RBM Ethical chain Generic se alag.'
    },
    {
      id: 'generic',
      name: 'Generic Division',
      slug: 'generic',
      status: 'live',
      tagline: 'High-volume generic portfolio',
      productCountLabel: '23 Products',
      productCount: 23,
      head: 'Manish Verma (RBM — Generic, alag chain)',
      headNote: 'RBM Generic (Gaurav Singh se alag chain) — manages all 23 generic products. 19 team members + multiple parties to be added later.',
      description:
        'Live in v2 with 23 stock-register products. Managed by Manish Verma (RBM Generic, alag chain). Team (19) + parties to be added without redesign.'
    },
    {
      id: 'otc',
      name: 'OTC Division',
      slug: 'otc',
      status: 'planned',
      tagline: 'Over-the-counter portfolio',
      productCountLabel: 'Data to be updated',
      productCount: null,
      head: null,
      description: 'Empty division section reserved for future data.'
    }
  ],

  /* ---------- 13 ETHICAL PRODUCTS — REVISED STOCK REGISTER (EXACT, v3) ----------
     Salt/composition/ingredients/uses = original client data (unchanged).
     expiry / closingStockQty / scheme = revised stock register exact.
     Ethical register has no UNIT column, so unit stays null (shows —). */
  products: [
    {
      id: 'p01', slug: 'relispray-dr', name: 'RELISPRAY DR', divisionId: 'ethical', packing: '1X100 GM', rate: 141.43,
      salt: 'Diclofenac, Methyl Salicylate, Virgin Linseed Oil and Menthol pain relief spray 1.16% w/w',
      composition: 'Each 100 g contains (% w/w)',
      ingredients: [
        { name: 'Diclofenac Diethylamine IP (Equivalent to Diclofenac Sodium 1.0% w/w)', quantity: '1.16% w/w' },
        { name: 'Methyl Salicylate IP', quantity: '10.0% w/w' },
        { name: 'Virgin Linseed Oil BP', quantity: '3.0% w/w' },
        { name: 'Menthol IP', quantity: '5.0% w/w' },
        { name: 'Excipients & Propellant q.s.', quantity: 'to 100%' }
      ],
      uses: 'Instant relief from backache, body ache, muscle pain, sprain or joint pain',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'May-29', closingStockQty: 986, unit: null, scheme: '10 + 1'
    },
    { id: 'p02', slug: 'vinodine-spray', name: 'VINODINE SPRAY', divisionId: 'ethical', packing: '1X75 GM', rate: 192.22,
      salt: 'Povidone-Iodine Antiseptic',
      composition: 'Composition (% w/w)',
      ingredients: [
        { name: 'Povidone-Iodine IP (Available Iodine 0.5% w/w)', quantity: '5.0% w/w' },
        { name: 'Inert Solvent and Propellant q.s. (In House)', quantity: 'to 100.0%' }
      ],
      uses: 'Antiseptic germicidal spray for prevention and treatment of infections in cuts, wounds, abrasions, ulcers, boils and burns',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Mar-28', closingStockQty: 220, unit: null, scheme: '10 + 1' },
    { id: 'p03', slug: 'kemlofen-p', name: 'KEMLOFEN-P', divisionId: 'ethical', packing: '1X10 Tab', rate: 45.0,
      salt: 'Aceclofenac and Paracetamol tablets',
      composition: 'Each uncoated tablet contains',
      ingredients: [
        { name: 'Aceclofenac IP', quantity: '100 mg' },
        { name: 'Paracetamol IP', quantity: '325 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'Relieve pain, reduce swelling, and lower fever',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'May-27', closingStockQty: 3274, unit: null, scheme: '10 + 2' },
    { id: 'p04', slug: 'kemlofen-sp', name: 'KEMLOFEN-SP', divisionId: 'ethical', packing: '1X10 Tab', rate: 70.71,
      salt: 'Aceclofenac, Paracetamol and Serratiopeptidase tablets',
      composition: 'Each film coated tablet contains',
      ingredients: [
        { name: 'Aceclofenac IP', quantity: '100 mg' },
        { name: 'Paracetamol IP', quantity: '325 mg' },
        { name: 'Serratiopeptidase IP (as enteric coated granules eq. to 30000 units of enzymatic activity)', quantity: '15 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'Reduce pain, swelling, and inflammation',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'May-27', closingStockQty: 2260, unit: null, scheme: '10 + 2' },
    { id: 'p05', slug: 'coolshot-dsr', name: 'COOLSHOT-DSR', divisionId: 'ethical', packing: '1X10 Tab', rate: 70.71,
      salt: 'Pantoprazole (EC) and Domperidone (SR) Capsule IP',
      composition: 'Each hard gelatin capsule contains. Approved colour used in empty capsule shells and pellets.',
      ingredients: [
        { name: 'Pantoprazole Sodium Sesquihydrate IP eq. to Pantoprazole (as enteric coated pellets)', quantity: '40 mg' },
        { name: 'Domperidone IP (as sustained release pellets)', quantity: '30 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'To treat acid reflux, gastroesophageal reflux disease (GERD), and peptic ulcer disease',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Jun-27', closingStockQty: 3870, unit: null, scheme: '10 + 2' },
    { id: 'p06', slug: 'coolberg-dsr', name: 'COOLBERG-DSR', divisionId: 'ethical', packing: '1X10 Tab', rate: 77.14,
      salt: 'Rabeprazole Sodium (EC) and Domperidone (SR) Capsules',
      composition: 'Each hard gelatin capsule contains',
      ingredients: [
        { name: 'Rabeprazole Sodium IP (as enteric coated pellets)', quantity: '20 mg' },
        { name: 'Domperidone IP (as sustained release pellets)', quantity: '30 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'Treat gastroesophageal reflux disease (GERD), persistent heartburn, and peptic ulcer disease',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Jun-27', closingStockQty: 4070, unit: null, scheme: '10 + 2' },
    { id: 'p07', slug: 'coolshot-suspension', name: 'COOLSHOT-SUSPENSION', divisionId: 'ethical', packing: '1X170 ML', rate: 81.64,
      salt: 'Aluminium Hydroxide, Magnesium Hydroxide, Activated Dimethicone and Sorbitol solution',
      composition: 'Each 5 ml contains',
      ingredients: [
        { name: 'Dried Aluminium Hydroxide IP', quantity: '250 mg' },
        { name: 'Magnesium Hydroxide IP', quantity: '250 mg' },
        { name: 'Activated Dimethicone IP', quantity: '50 mg' },
        { name: 'Sorbitol (70%) IP', quantity: '1.25 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'Relieve acidity, heartburn, gas, bloating, and indigestion',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Jul-28', closingStockQty: 1200, unit: null, scheme: '10 + 2' },
    { id: 'p08', slug: 'menthof-jr-junior', name: 'MENTHOF-Jr (Junior)', divisionId: 'ethical', packing: '1X60 ML', rate: 55.29,
      salt: 'Phenylephrine HCl and Chlorpheniramine Maleate Syrup IP',
      composition: 'Each 5 ml contains. Colour: Sunset Yellow FCF.',
      ingredients: [
        { name: 'Chlorpheniramine Maleate IP', quantity: '2 mg' },
        { name: 'Phenylephrine Hydrochloride IP', quantity: '5 mg' }
      ],
      uses: 'Treats symptoms of the common cold, flu, hay fever, and upper respiratory allergies',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'May-27', closingStockQty: 3429, unit: null, scheme: '10 + 2' },
    { id: 'p09', slug: 'hotspot-50-dt', name: 'HOTSPOT-50 DT', divisionId: 'ethical', packing: '1X4 Tab', rate: 900.0,
      salt: 'Sildenafil Citrate Tablets IP',
      composition: 'Each film coated tablet contains',
      ingredients: [
        { name: 'Sildenafil Citrate IP eq. to Sildenafil', quantity: '50 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'To treat erectile dysfunction and pulmonary arterial hypertension',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Apr-28', closingStockQty: 375, unit: null, scheme: '2 + 8' },
    { id: 'p10', slug: 'hotspot-100', name: 'HOTSPOT-100', divisionId: 'ethical', packing: '1X4 Tab', rate: 1626.46,
      salt: 'Sildenafil Citrate Tablets IP',
      composition: 'Each film coated tablet contains',
      ingredients: [
        { name: 'Sildenafil Citrate IP eq. to Sildenafil', quantity: '100 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'To treat erectile dysfunction and pulmonary arterial hypertension',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Feb-28', closingStockQty: 759, unit: null, scheme: '1 + 9' },
    { id: 'p11', slug: 'zaviocef-250', name: 'ZAVIOCEF-250', divisionId: 'ethical', packing: '1X10 Tab', rate: 141.43,
      salt: 'Cefuroxime Axetil Tablets IP',
      composition: 'Each film coated tablet contains. Colour: Titanium Dioxide IP.',
      ingredients: [
        { name: 'Cefuroxime Axetil IP eq. to Cefuroxime', quantity: '250 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'To treat a wide variety of bacterial infections in the body',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Oct-26', closingStockQty: 723, unit: null, scheme: '10 + 2' },
    { id: 'p12', slug: 'zaviocin-500', name: 'ZAVIOCIN-500', divisionId: 'ethical', packing: '1X6 Tab', rate: 103.5,
      salt: 'Azithromycin Tablets IP',
      composition: 'Each film coated tablet contains',
      ingredients: [
        { name: 'Azithromycin Dihydrate IP eq. to Azithromycin', quantity: '500 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'To treat various bacterial infections by stopping bacterial growth',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'May-27', closingStockQty: 2700, unit: null, scheme: '10 + 2' },
    { id: 'p13', slug: 'zavipod-200-mg', name: 'ZAVIPOD-200 MG', divisionId: 'ethical', packing: '1X10 Tab', rate: 122.15,
      salt: 'Cefpodoxime Proxetil Dispersible tablets',
      composition: 'Each uncoated dispersible tablet contains',
      ingredients: [
        { name: 'Cefpodoxime Proxetil IP eq. to Cefpodoxime', quantity: '200 mg' },
        { name: 'Excipients', quantity: 'q.s.' }
      ],
      uses: 'To treat a wide variety of bacterial infections',
      advantages: null, bmId: null, partyId: null, areaId: null,
      expiry: 'Nov-26', closingStockQty: 120, unit: null, scheme: '10 + 2' },

    /* ---------- 23 GENERIC PRODUCTS — STOCK REGISTER (EXACT, v2) ----------
       Owner: Manish Verma (RBM — Generic, alag chain).
       composition = COMPOSITION column exact. salt/uses = null (not supplied).
       expiry / closingStockQty / unit / scheme = stock register columns exact. */
    { id: 'g01', slug: 'kemlocet-tablets-blister', name: 'KEMLOCET (TABLETS) Blister', divisionId: 'generic', packing: '50x10', rate: 203.00,
      salt: null, composition: 'Cetirizine Hydrochloride 10Mg', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Dec-27', closingStockQty: 239, unit: 'BOX', scheme: '--' },
    { id: 'g02', slug: 'kemlomox-cv-625-tab-alu-alu', name: 'KEMLOMOX CV 625 TAB (Alu Alu)', divisionId: 'generic', packing: '10x1x10', rate: 550.00,
      salt: null, composition: 'Amoxycillin (500mg) + Clavulanic Acid (125mg)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Dec-27', closingStockQty: 261, unit: 'BOX', scheme: '--' },
    { id: 'g03', slug: 'kemlopan-d-sr-capsules-alu-alu', name: 'KEMLOPAN D (SR) CAPSULES (Alu Alu)', divisionId: 'generic', packing: '10x10', rate: 140.80,
      salt: null, composition: 'Pantoprazole 40Mg + Domperidone 30Mg (Sustain Release Cap) (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 367, unit: 'BOX', scheme: '--' },
    { id: 'g04', slug: 'kemlorab-d-sr-capsules-alu-alu', name: 'KEMLORAB D (SR) CAPSULES (Alu Alu)', divisionId: 'generic', packing: '10x10', rate: 126.10,
      salt: null, composition: 'Rabeprazole 20Mg + Domperidone 30Mg (Sustain Release Cap) (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Aug-27', closingStockQty: 472, unit: 'BOX', scheme: '--' },
    { id: 'g05', slug: 'labofen-plus-tab-alu-alu', name: 'LABOFEN PLUS TAB (Alu Alu)', divisionId: 'generic', packing: '10x10', rate: 114.20,
      salt: null, composition: 'Aceclofenac 100Mg + Paracetamol 325Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Aug-27', closingStockQty: 331, unit: 'BOX', scheme: '--' },
    { id: 'g06', slug: 'labofen-plus-tab-blister', name: 'LABOFEN PLUS TAB (Blister)', divisionId: 'generic', packing: '20x10', rate: 158.40,
      salt: null, composition: 'Aceclofenac 100Mg + Paracetamol 325Mg (Blister)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Aug-27', closingStockQty: 127, unit: 'BOX', scheme: '--' },
    { id: 'g07', slug: 'kemlocet-lm-tablets-alu-alu', name: 'KEMLOCET-LM (TABLETS) Alu Alu', divisionId: 'generic', packing: '10x10', rate: 143.80,
      salt: null, composition: 'Levocetirizine Hydrochloride 5Mg + Montelukast Sodium 10Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 415, unit: 'BOX', scheme: '--' },
    { id: 'g08', slug: 'kemlonim-plus-amber-blister', name: 'KEMLONIM-PLUS (TABLETS) AMBER Blister', divisionId: 'generic', packing: '20x10', rate: 192.60,
      salt: null, composition: 'Nimesulide 100Mg + Paracetamol 325Mg', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Dec-27', closingStockQty: 371, unit: 'BOX', scheme: '--' },
    { id: 'g09', slug: 'kemlonim-plus-golden-blister', name: 'KEMLONIM-PLUS (TABLETS) GOLDEN Blister', divisionId: 'generic', packing: '20x10', rate: 192.60,
      salt: null, composition: 'Nimesulide 100Mg + Paracetamol 325Mg', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Jan-28', closingStockQty: 461, unit: 'BOX', scheme: '--' },
    { id: 'g10', slug: 'kemlofenac-mr-alu-alu', name: 'KEMLOFENAC-MR (TABLETS) Alu Alu', divisionId: 'generic', packing: '10x10', rate: 133.20,
      salt: null, composition: 'Diclofenac Sodium 50Mg + Paracetamol 325Mg + Chlorzoxazone 250Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 1, unit: 'BOX', scheme: '--' },
    { id: 'g11', slug: 'kemlomol-650-blister', name: 'KEMLOMOL 650 (TABLETS) Blister', divisionId: 'generic', packing: '10x10', rate: 79.20,
      salt: null, composition: 'Paracetamol 650Mg (Blister)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 63, unit: 'BOX', scheme: '--' },
    { id: 'g12', slug: 'kemlocet-l-alu-alu', name: 'KEMLOCET-L (TABLETS) Alu Alu', divisionId: 'generic', packing: '20x10', rate: 98.40,
      salt: null, composition: 'Levocetirizine Dihydrochloride 5Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 222, unit: 'BOX', scheme: '--' },
    { id: 'g13', slug: 'kemlofenac-plus-alu-alu', name: 'KEMLOFENAC PLUS (TABLETS) Alu Alu', divisionId: 'generic', packing: '10x10', rate: 96.90,
      salt: null, composition: 'Diclofenac Sodium 50Mg + Paracetamol 325Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Jan-28', closingStockQty: 738, unit: 'BOX', scheme: '--' },
    { id: 'g14', slug: 'kemlofenac-plus-blister', name: 'KEMLOFENAC PLUS (TABLETS) Blister', divisionId: 'generic', packing: '20x10', rate: 163.40,
      salt: null, composition: 'Diclofenac Sodium 50Mg + Paracetamol 325Mg (Blister)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Jan-28', closingStockQty: 471, unit: 'BOX', scheme: '--' },
    { id: 'g15', slug: 'labofen-mr-alu-alu', name: 'LABOFEN-MR (TABLETS) Alu Alu', divisionId: 'generic', packing: '10x10', rate: 142.08,
      salt: null, composition: 'Aceclofenac 100Mg + Paracetamol 325Mg + Chlorzoxazone 250Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 1, unit: 'BOX', scheme: '10 + 1' },
    { id: 'g16', slug: 'labofen-sp-alu-alu', name: 'LABOFEN SP (TABLETS) Alu Alu', divisionId: 'generic', packing: '10x10', rate: 194.70,
      salt: null, composition: 'Aceclofenac 100Mg + Paracetamol 325Mg + Serratiopeptidase 15Mg (Alu Alu)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Dec-27', closingStockQty: 783, unit: 'BOX', scheme: '--' },
    { id: 'g17', slug: 'kemlomycin-500-lb-blister', name: 'KEMLOMYCIN 500-LB (TABLETS) Blister', divisionId: 'generic', packing: '10x1x3', rate: 325.00,
      salt: null, composition: 'Azithromycin IP 500 mg and Lactic Acid Bacillus 60 Million Spores Tablets (Blister)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 61, unit: 'BOX', scheme: '--' },
    { id: 'g18', slug: 'kemloflam-gel-tube', name: 'KEMLOFLAM GEL TUBE', divisionId: 'generic', packing: '1x30 GM', rate: 19.16,
      salt: null, composition: 'Diclofenac Diethylamine BP 1.16% w/w (equivalent to Diclofenac Sodium 1.0% w/w) + Linseed Oil BP 3% w/w + Methyl Salicylate IP 10% w/w + Menthol 5% w/w Gel base q.s. + Benzyl Alcohol IP 1% w/w', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Oct-27', closingStockQty: 3315, unit: 'TUBE', scheme: '--' },
    { id: 'g19', slug: 'kemlocid-mps-syrup', name: 'KEMLOCID MPS (SYRUP)', divisionId: 'generic', packing: '1x70 ML', rate: 20.31,
      salt: null, composition: 'Each 10 ML Contains: Dried Aluminium Hydroxide Gel IP 250 Mg + Magnesium Hydroxide IP 200 Mg + Simethicone IP 50 Mg, Sorbitol Solution (non crystallizing) q.s. In a flavoured syrup base q.s.', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Aug-27', closingStockQty: 900, unit: 'BOTT', scheme: '10 + 1' },
    { id: 'g20', slug: 'kemlopod-200-dt', name: 'KEMLOPOD-200 DT', divisionId: 'generic', packing: '10x1x10', rate: 680.00,
      salt: null, composition: 'Cefpodoxime Proxetil 200mg Tablet (ALU ALU)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Feb-28', closingStockQty: 126, unit: 'BOX', scheme: '10 + 1' },
    { id: 'g21', slug: 'kemlomox-cv-ds-dry-syrup', name: 'KEMLOMOX CV-DS DRY SYRUP', divisionId: 'generic', packing: '30 ML BOTT', rate: 44.80,
      salt: null, composition: 'Each 5ml reconstituted suspension contains: Amoxycillin Trihydrate IP, Eq. to Amoxycillin 400 mg & Potassium Clavulanate Diluted IP Eq. To Clavulanic Acid 57 Mg (Glass Bottle) Dry Syrup (30 ML)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Sep-27', closingStockQty: 3924, unit: 'BOTT', scheme: '--' },
    { id: 'g22', slug: 'kemlopod-cv-50-dry-syp', name: 'KEMLOPOD CV 50 DRY SYP', divisionId: 'generic', packing: '30 ML BOTT', rate: 23.90,
      salt: null, composition: 'Each 5ml reconstituted suspension contains: Cefpodoxime Proxetil IP, Eq. to Cefpodoxime 50 mg & Potassium Clavulanate Diluted IP Eq. To Clavulanic Acid 31.25 Mg (Glass Bottle) Dry Syrup (30 ML)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Jul-28', closingStockQty: 4820, unit: 'BOTT', scheme: '--' },
    { id: 'g23', slug: 'lidocaine-topical-spray-50ml', name: 'LIDOCAINE TOPICAL SPRAY 1X50ML', divisionId: 'generic', packing: '1x50 ML', rate: 203.00,
      salt: null, composition: 'Lidocaine USP (Lignocaine) (each actuation delivers Lidocaine USP 5.0 mg) 10.00 w/w, Inert Solvents & Propellant q.s. (In House) 100.00% w/w, pressurised container equipped with metered dose valve (-)', ingredients: [], uses: null,
      advantages: null, bmId: 'manish-verma', partyId: null, areaId: null,
      expiry: 'Jun-27', closingStockQty: 8, unit: 'SPRAY', scheme: '--' }
  ],

  employees: [
    {
      id: 'gaurav-singh',
      name: 'Gaurav Singh',
      designation: 'Regional Business Manager',
      shortRole: 'RBM — Ethical (alag chain)',
      divisionId: 'ethical',
      reportsTo: null,
      reportsFrom: ['deepak-gupta'],
      areaId: null,
      areaNote: 'Regional oversight (all ethical areas) — Generic chain se alag',
      partyIds: [],
      fieldRole: 'RBM Ethical. Supervises overall Ethical regional business. Manish Verma (RBM Generic) se alag chain.',
      initials: 'GS'
    },
    {
      id: 'deepak-gupta',
      name: 'Deepak Gupta',
      designation: 'Senior Business Manager',
      shortRole: 'Head — Ethical Field',
      divisionId: 'ethical',
      reportsTo: 'gaurav-singh',
      reportsFrom: ['jeet-singh', 'vinay-kumar'],
      areaId: null,
      areaNote: 'Field with Business Managers (accompanies Jeet Singh or Vinay Kumar depending on visit)',
      partyIds: [],
      fieldRole: 'Visits the field with Business Managers. May accompany Jeet Singh or Vinay Kumar.',
      initials: 'DG'
    },
    {
      id: 'jeet-singh',
      name: 'Jeet Singh',
      designation: 'Business Manager',
      shortRole: 'Business Manager — Bulandshahr',
      divisionId: 'ethical',
      reportsTo: 'deepak-gupta',
      reportsFrom: [],
      areaId: 'bulandshahr',
      areaNote: 'Bulandshahr',
      partyIds: ['madhu-medicose', 'paliwal-drug'],
      fieldRole: 'Visits field. Party orders associated with Jeet Singh.',
      initials: 'JS'
    },
    {
      id: 'vinay-kumar',
      name: 'Vinay Kumar',
      designation: 'Business Manager',
      shortRole: 'Business Manager — Hapur',
      divisionId: 'ethical',
      reportsTo: 'deepak-gupta',
      reportsFrom: [],
      areaId: 'hapur',
      areaNote: 'Hapur',
      partyIds: ['rama-chemist', 'shiv-hari-drug'],
      fieldRole: 'Visits field. Party orders associated with Vinay Kumar.',
      initials: 'VK'
    },
    {
      id: 'manish-verma',
      name: 'Manish Verma',
      designation: 'Regional Business Manager',
      shortRole: 'RBM — Generic (alag chain)',
      divisionId: 'generic',
      reportsTo: null,
      reportsFrom: [],
      areaId: null,
      areaNote: 'RBM Generic — alag chain (Gaurav Singh se separate). 19 team members to be added later',
      partyIds: [],
      fieldRole: 'RBM Generic (alag chain, Gaurav Singh se separate). Heads Generic Division. Manages all 23 generic products. 19 team members + multiple parties to be added later.',
      initials: 'MV',
      placeholder: false,
      managesDivision: 'generic',
      managesProductIds: ['g01','g02','g03','g04','g05','g06','g07','g08','g09','g10','g11','g12','g13','g14','g15','g16','g17','g18','g19','g20','g21','g22','g23']
    }
  ],

  areas: [
    {
      id: 'bulandshahr',
      name: 'Bulandshahr',
      divisionId: 'ethical',
      businessManagerId: 'jeet-singh',
      partyIds: ['madhu-medicose', 'paliwal-drug']
    },
    {
      id: 'hapur',
      name: 'Hapur',
      divisionId: 'ethical',
      businessManagerId: 'vinay-kumar',
      partyIds: ['rama-chemist', 'shiv-hari-drug']
    }
  ],

  parties: [
    { id: 'madhu-medicose', name: 'Madhu Medicose', businessManagerId: 'jeet-singh',  areaId: 'bulandshahr', divisionId: 'ethical' },
    { id: 'paliwal-drug',   name: 'Paliwal Drug',   businessManagerId: 'jeet-singh',  areaId: 'bulandshahr', divisionId: 'ethical' },
    { id: 'rama-chemist',   name: 'Rama Chemist',   businessManagerId: 'vinay-kumar', areaId: 'hapur',       divisionId: 'ethical' },
    { id: 'shiv-hari-drug', name: 'Shiv Hari Drug', businessManagerId: 'vinay-kumar', areaId: 'hapur',       divisionId: 'ethical' }
  ],

  /* Future-ready: no live orders. Structure example only. */
  orders: [],
  fieldVisits: [],

  orderStructureExample: {
    label: 'Order #001 (structure example — no live order)',
    product: 'ZAVIOCEF-250',
    party: 'Madhu Medicose',
    businessManager: 'Jeet Singh',
    area: 'Bulandshahr',
    division: 'Ethical'
  },

  traceExamples: [
    { product: 'Any Ethical product', bm: 'Jeet Singh', party: 'Madhu Medicose', area: 'Bulandshahr' },
    { product: 'Any Ethical product', bm: 'Vinay Kumar', party: 'Rama Chemist', area: 'Hapur' }
  ]
};
