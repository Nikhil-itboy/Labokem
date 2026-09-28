-- =====================================================================
-- Labokem Laboratories Private Limited — Relational Schema (MySQL 8+)
-- Normalized, extensible: Generic (23) + OTC attach via division_id.
-- Source of truth = client data. Unknown pharma fields stay NULL and
-- render as "Details to be updated". No fake rows for Generic/OTC.
-- Chain supported: Company -> Division -> Product -> BM -> Party -> Area
--                   Order -> Party -> BM -> Area -> Product -> Division
-- =====================================================================

CREATE DATABASE IF NOT EXISTS labokem
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE labokem;

-- ---------- Divisions (first trade: Ethical / Generic / OTC) ----------
CREATE TABLE divisions (
  id            VARCHAR(32)  PRIMARY KEY,          -- 'ethical','generic','otc'
  name          VARCHAR(100) NOT NULL,             -- 'Ethical Division'
  status        ENUM('live','planned') NOT NULL DEFAULT 'planned',
  head_note     VARCHAR(255) NULL,
  product_count INT NULL,                          -- 13 / 23 / NULL(OTC TBD)
  description   TEXT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------- Employees / hierarchy ----------
CREATE TABLE employees (
  id            VARCHAR(64)  PRIMARY KEY,          -- 'gaurav-singh'
  name          VARCHAR(120) NOT NULL,
  designation   VARCHAR(120) NOT NULL,             -- RBM / Sr BM / BM
  short_role    VARCHAR(160) NULL,
  division_id   VARCHAR(32) NULL,
  area_id       VARCHAR(64) NULL,                  -- direct area for BMs
  area_note     VARCHAR(255) NULL,
  field_role    VARCHAR(255) NULL,
  is_placeholder TINYINT(1) NOT NULL DEFAULT 0,   -- 1 = e.g. Manish Verma shell
  placeholder_note TEXT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_emp_div FOREIGN KEY (division_id) REFERENCES divisions(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- Manager -> member edges (supports Gaurav->Deepak->Jeet/Vinay + future Manish(RBM Generic alag)->19; Gaurav-Manish alag, no link)
CREATE TABLE employee_hierarchy (
  manager_id VARCHAR(64) NOT NULL,
  member_id  VARCHAR(64) NOT NULL,
  PRIMARY KEY (manager_id, member_id),
  CONSTRAINT fk_hier_mgr FOREIGN KEY (manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_hier_mem FOREIGN KEY (member_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------- Areas ----------
CREATE TABLE areas (
  id                 VARCHAR(64) PRIMARY KEY,      -- 'bulandshahr','hapur'
  name               VARCHAR(120) NOT NULL,
  division_id        VARCHAR(32) NOT NULL,
  business_manager_id VARCHAR(64) NULL,            -- primary BM for area
  created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_area_div FOREIGN KEY (division_id) REFERENCES divisions(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_area_bm FOREIGN KEY (business_manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

ALTER TABLE employees
  ADD CONSTRAINT fk_emp_area FOREIGN KEY (area_id) REFERENCES areas(id)
  ON UPDATE CASCADE ON DELETE SET NULL;

-- ---------- Parties (stockists / chemists) ----------
CREATE TABLE parties (
  id                  VARCHAR(64) PRIMARY KEY,
  name                VARCHAR(160) NOT NULL,       -- 'Madhu Medicose'
  division_id         VARCHAR(32) NOT NULL,
  business_manager_id VARCHAR(64) NULL,
  area_id             VARCHAR(64) NULL,
  remarks             TEXT NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_party_div FOREIGN KEY (division_id) REFERENCES divisions(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_party_bm FOREIGN KEY (business_manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_party_area FOREIGN KEY (area_id) REFERENCES areas(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  INDEX idx_party_bm (business_manager_id),
  INDEX idx_party_area (area_id)
) ENGINE=InnoDB;

-- BM <-> Party (today 1 BM : N parties; join keeps N:M open for future)
CREATE TABLE business_manager_parties (
  business_manager_id VARCHAR(64) NOT NULL,
  party_id            VARCHAR(64) NOT NULL,
  PRIMARY KEY (business_manager_id, party_id),
  CONSTRAINT fk_bmp_bm FOREIGN KEY (business_manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_bmp_party FOREIGN KEY (party_id) REFERENCES parties(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------- Products ----------
-- NOTE: `uses` replaces the earlier `advantages` label per client request.
-- For existing installs: ALTER TABLE products CHANGE COLUMN advantages uses TEXT NULL;
-- v2: stock-register columns for Generic (nullable; Ethical stays NULL).
-- For existing installs:
--   ALTER TABLE products ADD COLUMN expiry VARCHAR(16) NULL AFTER uses;
--   ALTER TABLE products ADD COLUMN closing_stock_qty INT NULL AFTER expiry;
--   ALTER TABLE products ADD COLUMN unit VARCHAR(16) NULL AFTER closing_stock_qty;
--   ALTER TABLE products ADD COLUMN scheme VARCHAR(16) NULL AFTER unit;
--   ALTER TABLE products ADD COLUMN head_id VARCHAR(64) NULL AFTER scheme;
CREATE TABLE products (
  id          VARCHAR(32)  PRIMARY KEY,            -- 'p01'..'p13','g01'..'g23'
  slug        VARCHAR(120) NOT NULL UNIQUE,
  name        VARCHAR(160) NOT NULL,               -- EXACT client name
  division_id VARCHAR(32)  NOT NULL,
  packing     VARCHAR(64)  NOT NULL,               -- EXACT client packing
  rate        DECIMAL(10,2) NOT NULL,              -- EXACT client rate
  salt        TEXT NULL,                           -- NULL = to be updated
  composition TEXT NULL,                           -- NULL = to be updated
  uses        TEXT NULL,                           -- NULL = to be updated (was `advantages`)
  expiry            VARCHAR(16) NULL,              -- Generic stock register: 'Dec-27'
  closing_stock_qty INT NULL,                      -- Generic stock register: 239
  unit              VARCHAR(16) NULL,              -- 'BOX'/'TUBE'/'BOTT'/'SPRAY'
  scheme            VARCHAR(16) NULL,              -- '--' / '10 + 1'
  head_id           VARCHAR(64) NULL,              -- Generic owner: 'manish-verma'
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_prod_div FOREIGN KEY (division_id) REFERENCES divisions(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_prod_div (division_id),
  INDEX idx_prod_name (name)
) ENGINE=InnoDB;

-- Structured ingredients (empty until official data)
CREATE TABLE product_compositions (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id  VARCHAR(32) NOT NULL,
  ingredient  VARCHAR(200) NOT NULL,
  quantity    VARCHAR(120) NULL,                   -- NULL = '—'
  sort_order  INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_comp_prod FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX idx_comp_prod (product_id)
) ENGINE=InnoDB;

-- Future Product -> BM -> Party -> Area mapping (empty in v1)
CREATE TABLE product_business_mapping (
  id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id          VARCHAR(32) NOT NULL,
  business_manager_id VARCHAR(64) NULL,
  party_id            VARCHAR(64) NULL,
  area_id             VARCHAR(64) NULL,
  note                VARCHAR(255) NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pbm_prod FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_pbm_bm FOREIGN KEY (business_manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_pbm_party FOREIGN KEY (party_id) REFERENCES parties(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_pbm_area FOREIGN KEY (area_id) REFERENCES areas(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  INDEX idx_pbm_prod (product_id)
) ENGINE=InnoDB;

-- ---------- Orders (structure only, no fake rows) ----------
CREATE TABLE orders (
  id                  VARCHAR(32) PRIMARY KEY,     -- e.g. 'ORD-0001'
  party_id            VARCHAR(64) NOT NULL,
  business_manager_id VARCHAR(64) NULL,
  area_id             VARCHAR(64) NULL,
  division_id         VARCHAR(32) NOT NULL,
  order_date          DATE NULL,
  order_value         DECIMAL(12,2) NULL,
  remarks             TEXT NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ord_party FOREIGN KEY (party_id) REFERENCES parties(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_ord_bm FOREIGN KEY (business_manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_ord_area FOREIGN KEY (area_id) REFERENCES areas(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_ord_div FOREIGN KEY (division_id) REFERENCES divisions(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_ord_party (party_id),
  INDEX idx_ord_date (order_date)
) ENGINE=InnoDB;

CREATE TABLE order_items (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id   VARCHAR(32) NOT NULL,
  product_id VARCHAR(32) NOT NULL,
  qty        INT NULL,
  rate       DECIMAL(10,2) NULL,                   -- snapshot of products.rate
  CONSTRAINT fk_oi_order FOREIGN KEY (order_id) REFERENCES orders(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_oi_prod FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_oi_order (order_id)
) ENGINE=InnoDB;

-- ---------- Field visits ----------
CREATE TABLE field_visits (
  id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
  visit_date          DATE NULL,
  business_manager_id VARCHAR(64) NULL,            -- Jeet / Vinay
  accompanied_by      VARCHAR(64) NULL,            -- Deepak Gupta (or others later)
  party_id            VARCHAR(64) NULL,
  area_id             VARCHAR(64) NULL,
  remarks             TEXT NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_fv_bm FOREIGN KEY (business_manager_id) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_fv_acc FOREIGN KEY (accompanied_by) REFERENCES employees(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_fv_party FOREIGN KEY (party_id) REFERENCES parties(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_fv_area FOREIGN KEY (area_id) REFERENCES areas(id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- =====================================================================
-- SEED: client-supplied Ethical data only (exact names/packing/rates)
-- =====================================================================
INSERT INTO divisions (id, name, status, head_note, product_count, description) VALUES
 ('ethical','Ethical Division','live','Deepak Gupta (field) / Gaurav Singh (regional oversight)',13,'Fully implemented in v1.'),
 ('generic','Generic Division','live','Manish Verma (RBM Generic, alag chain) — 23 products live; 19 team + multiple parties to be added',23,'Live in v2 with 23 stock-register products. RBM alag (Gaurav se separate).'),
 ('otc','OTC Division','planned',NULL,NULL,'Empty section reserved.');

INSERT INTO employees (id, name, designation, short_role, division_id, area_note, field_role, is_placeholder, placeholder_note) VALUES
 ('gaurav-singh','Gaurav Singh','Regional Business Manager','RBM — Ethical (alag chain)','ethical','Regional oversight (all ethical areas) — Generic chain se alag','RBM Ethical. Supervises overall Ethical regional business. Manish Verma (RBM Generic) se alag chain.',0,NULL),
 ('deepak-gupta','Deepak Gupta','Senior Business Manager','Head — Ethical Field','ethical','Field with Business Managers (accompanies Jeet Singh or Vinay Kumar depending on visit)','Visits the field with Business Managers. May accompany Jeet Singh or Vinay Kumar.',0,NULL),
 ('jeet-singh','Jeet Singh','Business Manager','Business Manager — Bulandshahr','ethical','Bulandshahr','Visits field. Party orders associated with Jeet Singh.',0,NULL),
 ('vinay-kumar','Vinay Kumar','Business Manager','Business Manager — Hapur','ethical','Hapur','Visits field. Party orders associated with Vinay Kumar.',0,NULL),
 ('manish-verma','Manish Verma','Regional Business Manager','RBM — Generic (alag chain)','generic','RBM Generic — alag chain (Gaurav Singh se separate). 19 team members to be added later','RBM Generic (alag chain, Gaurav Singh se separate). Heads Generic Division. Manages all 23 generic products. 19 team members + multiple parties to be added later.',0,NULL);

INSERT INTO employee_hierarchy (manager_id, member_id) VALUES
 ('gaurav-singh','deepak-gupta'),
 ('deepak-gupta','jeet-singh'),
 ('deepak-gupta','vinay-kumar');

INSERT INTO areas (id, name, division_id, business_manager_id) VALUES
 ('bulandshahr','Bulandshahr','ethical','jeet-singh'),
 ('hapur','Hapur','ethical','vinay-kumar');

UPDATE employees SET area_id='bulandshahr' WHERE id='jeet-singh';
UPDATE employees SET area_id='hapur' WHERE id='vinay-kumar';

INSERT INTO parties (id, name, division_id, business_manager_id, area_id) VALUES
 ('madhu-medicose','Madhu Medicose','ethical','jeet-singh','bulandshahr'),
 ('paliwal-drug','Paliwal Drug','ethical','jeet-singh','bulandshahr'),
 ('rama-chemist','Rama Chemist','ethical','vinay-kumar','hapur'),
 ('shiv-hari-drug','Shiv Hari Drug','ethical','vinay-kumar','hapur');

INSERT INTO business_manager_parties (business_manager_id, party_id) VALUES
 ('jeet-singh','madhu-medicose'),
 ('jeet-singh','paliwal-drug'),
 ('vinay-kumar','rama-chemist'),
 ('vinay-kumar','shiv-hari-drug');

-- 13 Ethical products — REVISED STOCK REGISTER EXACT (v3).
-- Salt/composition/uses = original client data (unchanged).
-- Expiry/closing stock/scheme via UPDATEs below (register has no UNIT column).
-- NOTE v3 revised rate: p05 COOLSHOT-DSR 70.14 -> 70.71 per revised register.
-- 23 Generic products (v2) — stock register EXACT, owner Manish Verma (RBM Generic alag).
INSERT INTO products (id, slug, name, division_id, packing, rate, salt, composition, uses) VALUES
 ('p01','relispray-dr','RELISPRAY DR','ethical','1X100 GM',141.43,'Diclofenac, Methyl Salicylate, Virgin Linseed Oil and Menthol pain relief spray 1.16% w/w','Each 100 g contains (% w/w)','Instant relief from backache, body ache, muscle pain, sprain or joint pain'),
 ('p02','vinodine-spray','VINODINE SPRAY','ethical','1X75 GM',192.22,'Povidone-Iodine Antiseptic','Composition (% w/w)','Antiseptic germicidal spray for prevention and treatment of infections in cuts, wounds, abrasions, ulcers, boils and burns'),
 ('p03','kemlofen-p','KEMLOFEN-P','ethical','1X10 Tab',45.00,'Aceclofenac and Paracetamol tablets','Each uncoated tablet contains','Relieve pain, reduce swelling, and lower fever'),
 ('p04','kemlofen-sp','KEMLOFEN-SP','ethical','1X10 Tab',70.71,'Aceclofenac, Paracetamol and Serratiopeptidase tablets','Each film coated tablet contains','Reduce pain, swelling, and inflammation'),
 ('p05','coolshot-dsr','COOLSHOT-DSR','ethical','1X10 Tab',70.14,'Pantoprazole (EC) and Domperidone (SR) Capsule IP','Each hard gelatin capsule contains. Approved colour used in empty capsule shells and pellets.','To treat acid reflux, gastroesophageal reflux disease (GERD), and peptic ulcer disease'),
 ('p06','coolberg-dsr','COOLBERG-DSR','ethical','1X10 Tab',77.14,'Rabeprazole Sodium (EC) and Domperidone (SR) Capsules','Each hard gelatin capsule contains','Treat gastroesophageal reflux disease (GERD), persistent heartburn, and peptic ulcer disease'),
 ('p07','coolshot-suspension','COOLSHOT-SUSPENSION','ethical','1X170 ML',81.64,'Aluminium Hydroxide, Magnesium Hydroxide, Activated Dimethicone and Sorbitol solution','Each 5 ml contains','Relieve acidity, heartburn, gas, bloating, and indigestion'),
 ('p08','menthof-jr-junior','MENTHOF-Jr (Junior)','ethical','1X60 ML',55.29,'Phenylephrine HCl and Chlorpheniramine Maleate Syrup IP','Each 5 ml contains. Colour: Sunset Yellow FCF.','Treats symptoms of the common cold, flu, hay fever, and upper respiratory allergies'),
 ('p09','hotspot-50-dt','HOTSPOT-50 DT','ethical','1X4 Tab',900.00,'Sildenafil Citrate Tablets IP','Each film coated tablet contains','To treat erectile dysfunction and pulmonary arterial hypertension'),
 ('p10','hotspot-100','HOTSPOT-100','ethical','1X4 Tab',1626.46,'Sildenafil Citrate Tablets IP','Each film coated tablet contains','To treat erectile dysfunction and pulmonary arterial hypertension'),
 ('p11','zaviocef-250','ZAVIOCEF-250','ethical','1X10 Tab',141.43,'Cefuroxime Axetil Tablets IP','Each film coated tablet contains. Colour: Titanium Dioxide IP.','To treat a wide variety of bacterial infections in the body'),
 ('p12','zaviocin-500','ZAVIOCIN-500','ethical','1X6 Tab',103.50,'Azithromycin Tablets IP','Each film coated tablet contains','To treat various bacterial infections by stopping bacterial growth'),
  ('p13','zavipod-200-mg','ZAVIPOD-200 MG','ethical','1X10 Tab',122.15,'Cefpodoxime Proxetil Dispersible tablets','Each uncoated dispersible tablet contains','To treat a wide variety of bacterial infections');

-- v3 revised Ethical stock register (expiry / closing stock / scheme exact). No UNIT in Ethical register.
UPDATE products SET rate=70.71, expiry='Jun-27', closing_stock_qty=3870, scheme='10 + 2' WHERE id='p05';
UPDATE products SET expiry='May-29', closing_stock_qty=986, scheme='10 + 1' WHERE id='p01';
UPDATE products SET expiry='Mar-28', closing_stock_qty=220, scheme='10 + 1' WHERE id='p02';
UPDATE products SET expiry='May-27', closing_stock_qty=3274, scheme='10 + 2' WHERE id='p03';
UPDATE products SET expiry='May-27', closing_stock_qty=2260, scheme='10 + 2' WHERE id='p04';
UPDATE products SET expiry='Jun-27', closing_stock_qty=4070, scheme='10 + 2' WHERE id='p06';
UPDATE products SET expiry='Jul-28', closing_stock_qty=1200, scheme='10 + 2' WHERE id='p07';
UPDATE products SET expiry='May-27', closing_stock_qty=3429, scheme='10 + 2' WHERE id='p08';
UPDATE products SET expiry='Apr-28', closing_stock_qty=375, scheme='2 + 8' WHERE id='p09';
UPDATE products SET expiry='Feb-28', closing_stock_qty=759, scheme='1 + 9' WHERE id='p10';
UPDATE products SET expiry='Oct-26', closing_stock_qty=723, scheme='10 + 2' WHERE id='p11';
UPDATE products SET expiry='May-27', closing_stock_qty=2700, scheme='10 + 2' WHERE id='p12';
UPDATE products SET expiry='Nov-26', closing_stock_qty=120, scheme='10 + 2' WHERE id='p13';

-- 23 Generic products — STOCK REGISTER EXACT (v2). Owner: Manish Verma (RBM Generic alag).
-- composition = COMPOSITION column exact. salt/uses NULL (not supplied).
INSERT INTO products (id, slug, name, division_id, packing, rate, salt, composition, uses, expiry, closing_stock_qty, unit, scheme, head_id) VALUES
 ('g01','kemlocet-tablets-blister','KEMLOCET (TABLETS) Blister','generic','50x10',203.00,NULL,'Cetirizine Hydrochloride 10Mg',NULL,'Dec-27',239,'BOX','--','manish-verma'),
 ('g02','kemlomox-cv-625-tab-alu-alu','KEMLOMOX CV 625 TAB (Alu Alu)','generic','10x1x10',550.00,NULL,'Amoxycillin (500mg) + Clavulanic Acid (125mg)',NULL,'Dec-27',261,'BOX','--','manish-verma'),
 ('g03','kemlopan-d-sr-capsules-alu-alu','KEMLOPAN D (SR) CAPSULES (Alu Alu)','generic','10x10',140.80,NULL,'Pantoprazole 40Mg + Domperidone 30Mg (Sustain Release Cap) (Alu Alu)',NULL,'Sep-27',367,'BOX','--','manish-verma'),
 ('g04','kemlorab-d-sr-capsules-alu-alu','KEMLORAB D (SR) CAPSULES (Alu Alu)','generic','10x10',126.10,NULL,'Rabeprazole 20Mg + Domperidone 30Mg (Sustain Release Cap) (Alu Alu)',NULL,'Aug-27',472,'BOX','--','manish-verma'),
 ('g05','labofen-plus-tab-alu-alu','LABOFEN PLUS TAB (Alu Alu)','generic','10x10',114.20,NULL,'Aceclofenac 100Mg + Paracetamol 325Mg (Alu Alu)',NULL,'Aug-27',331,'BOX','--','manish-verma'),
 ('g06','labofen-plus-tab-blister','LABOFEN PLUS TAB (Blister)','generic','20x10',158.40,NULL,'Aceclofenac 100Mg + Paracetamol 325Mg (Blister)',NULL,'Aug-27',127,'BOX','--','manish-verma'),
 ('g07','kemlocet-lm-tablets-alu-alu','KEMLOCET-LM (TABLETS) Alu Alu','generic','10x10',143.80,NULL,'Levocetirizine Hydrochloride 5Mg + Montelukast Sodium 10Mg (Alu Alu)',NULL,'Sep-27',415,'BOX','--','manish-verma'),
 ('g08','kemlonim-plus-amber-blister','KEMLONIM-PLUS (TABLETS) AMBER Blister','generic','20x10',192.60,NULL,'Nimesulide 100Mg + Paracetamol 325Mg',NULL,'Dec-27',371,'BOX','--','manish-verma'),
 ('g09','kemlonim-plus-golden-blister','KEMLONIM-PLUS (TABLETS) GOLDEN Blister','generic','20x10',192.60,NULL,'Nimesulide 100Mg + Paracetamol 325Mg',NULL,'Jan-28',461,'BOX','--','manish-verma'),
 ('g10','kemlofenac-mr-alu-alu','KEMLOFENAC-MR (TABLETS) Alu Alu','generic','10x10',133.20,NULL,'Diclofenac Sodium 50Mg + Paracetamol 325Mg + Chlorzoxazone 250Mg (Alu Alu)',NULL,'Sep-27',1,'BOX','--','manish-verma'),
 ('g11','kemlomol-650-blister','KEMLOMOL 650 (TABLETS) Blister','generic','10x10',79.20,NULL,'Paracetamol 650Mg (Blister)',NULL,'Sep-27',63,'BOX','--','manish-verma'),
 ('g12','kemlocet-l-alu-alu','KEMLOCET-L (TABLETS) Alu Alu','generic','20x10',98.40,NULL,'Levocetirizine Dihydrochloride 5Mg (Alu Alu)',NULL,'Sep-27',222,'BOX','--','manish-verma'),
 ('g13','kemlofenac-plus-alu-alu','KEMLOFENAC PLUS (TABLETS) Alu Alu','generic','10x10',96.90,NULL,'Diclofenac Sodium 50Mg + Paracetamol 325Mg (Alu Alu)',NULL,'Jan-28',738,'BOX','--','manish-verma'),
 ('g14','kemlofenac-plus-blister','KEMLOFENAC PLUS (TABLETS) Blister','generic','20x10',163.40,NULL,'Diclofenac Sodium 50Mg + Paracetamol 325Mg (Blister)',NULL,'Jan-28',471,'BOX','--','manish-verma'),
 ('g15','labofen-mr-alu-alu','LABOFEN-MR (TABLETS) Alu Alu','generic','10x10',142.08,NULL,'Aceclofenac 100Mg + Paracetamol 325Mg + Chlorzoxazone 250Mg (Alu Alu)',NULL,'Sep-27',1,'BOX','10 + 1','manish-verma'),
 ('g16','labofen-sp-alu-alu','LABOFEN SP (TABLETS) Alu Alu','generic','10x10',194.70,NULL,'Aceclofenac 100Mg + Paracetamol 325Mg + Serratiopeptidase 15Mg (Alu Alu)',NULL,'Dec-27',783,'BOX','--','manish-verma'),
 ('g17','kemlomycin-500-lb-blister','KEMLOMYCIN 500-LB (TABLETS) Blister','generic','10x1x3',325.00,NULL,'Azithromycin IP 500 mg and Lactic Acid Bacillus 60 Million Spores Tablets (Blister)',NULL,'Sep-27',61,'BOX','--','manish-verma'),
 ('g18','kemloflam-gel-tube','KEMLOFLAM GEL TUBE','generic','1x30 GM',19.16,NULL,'Diclofenac Diethylamine BP 1.16% w/w (equivalent to Diclofenac Sodium 1.0% w/w) + Linseed Oil BP 3% w/w + Methyl Salicylate IP 10% w/w + Menthol 5% w/w Gel base q.s. + Benzyl Alcohol IP 1% w/w',NULL,'Oct-27',3315,'TUBE','--','manish-verma'),
 ('g19','kemlocid-mps-syrup','KEMLOCID MPS (SYRUP)','generic','1x70 ML',20.31,NULL,'Each 10 ML Contains: Dried Aluminium Hydroxide Gel IP 250 Mg + Magnesium Hydroxide IP 200 Mg + Simethicone IP 50 Mg, Sorbitol Solution (non crystallizing) q.s. In a flavoured syrup base q.s.',NULL,'Aug-27',900,'BOTT','10 + 1','manish-verma'),
 ('g20','kemlopod-200-dt','KEMLOPOD-200 DT','generic','10x1x10',680.00,NULL,'Cefpodoxime Proxetil 200mg Tablet (ALU ALU)',NULL,'Feb-28',126,'BOX','10 + 1','manish-verma'),
 ('g21','kemlomox-cv-ds-dry-syrup','KEMLOMOX CV-DS DRY SYRUP','generic','30 ML BOTT',44.80,NULL,'Each 5ml reconstituted suspension contains: Amoxycillin Trihydrate IP, Eq. to Amoxycillin 400 mg & Potassium Clavulanate Diluted IP Eq. To Clavulanic Acid 57 Mg (Glass Bottle) Dry Syrup (30 ML)',NULL,'Sep-27',3924,'BOTT','--','manish-verma'),
 ('g22','kemlopod-cv-50-dry-syp','KEMLOPOD CV 50 DRY SYP','generic','30 ML BOTT',23.90,NULL,'Each 5ml reconstituted suspension contains: Cefpodoxime Proxetil IP, Eq. to Cefpodoxime 50 mg & Potassium Clavulanate Diluted IP Eq. To Clavulanic Acid 31.25 Mg (Glass Bottle) Dry Syrup (30 ML)',NULL,'Jul-28',4820,'BOTT','--','manish-verma'),
 ('g23','lidocaine-topical-spray-50ml','LIDOCAINE TOPICAL SPRAY 1X50ML','generic','1x50 ML',203.00,NULL,'Lidocaine USP (Lignocaine) (each actuation delivers Lidocaine USP 5.0 mg) 10.00 w/w, Inert Solvents & Propellant q.s. (In House) 100.00% w/w, pressurised container equipped with metered dose valve (-)',NULL,'Jun-27',8,'SPRAY','--','manish-verma');

-- Generic Product -> RBM mapping (Manish Verma RBM Generic alag owns all 23)
INSERT INTO product_business_mapping (product_id, business_manager_id, note) VALUES
 ('g01','manish-verma'),('g02','manish-verma'),('g03','manish-verma'),('g04','manish-verma'),('g05','manish-verma'),
 ('g06','manish-verma'),('g07','manish-verma'),('g08','manish-verma'),('g09','manish-verma'),('g10','manish-verma'),
 ('g11','manish-verma'),('g12','manish-verma'),('g13','manish-verma'),('g14','manish-verma'),('g15','manish-verma'),
 ('g16','manish-verma'),('g17','manish-verma'),('g18','manish-verma'),('g19','manish-verma'),('g20','manish-verma'),
 ('g21','manish-verma'),('g22','manish-verma'),('g23','manish-verma');

-- RELISPRAY DR composition (% w/w) — client-supplied only
INSERT INTO product_compositions (product_id, ingredient, quantity, sort_order) VALUES
 ('p01','Diclofenac Diethylamine IP (Equivalent to Diclofenac Sodium 1.0% w/w)','1.16% w/w',1),
 ('p01','Methyl Salicylate IP','10.0% w/w',2),
 ('p01','Virgin Linseed Oil BP','3.0% w/w',3),
 ('p01','Menthol IP','5.0% w/w',4),
 ('p01','Excipients & Propellant q.s.','to 100%',5),
 -- VINODINE SPRAY composition (% w/w) — client-supplied only
 ('p02','Povidone-Iodine IP (Available Iodine 0.5% w/w)','5.0% w/w',1),
 ('p02','Inert Solvent and Propellant q.s. (In House)','to 100.0%',2),
 -- KEMLOFEN-P composition (per uncoated tablet) — client-supplied only
 ('p03','Aceclofenac IP','100 mg',1),
 ('p03','Paracetamol IP','325 mg',2),
 ('p03','Excipients','q.s.',3),
 -- KEMLOFEN-SP composition (per film coated tablet) — client-supplied only
 ('p04','Aceclofenac IP','100 mg',1),
 ('p04','Paracetamol IP','325 mg',2),
 ('p04','Serratiopeptidase IP (as enteric coated granules eq. to 30000 units of enzymatic activity)','15 mg',3),
 ('p04','Excipients','q.s.',4),
 -- COOLSHOT-DSR composition (per capsule) — client-supplied only
 ('p05','Pantoprazole Sodium Sesquihydrate IP eq. to Pantoprazole (as enteric coated pellets)','40 mg',1),
 ('p05','Domperidone IP (as sustained release pellets)','30 mg',2),
 ('p05','Excipients','q.s.',3),
 -- COOLBERG-DSR composition (per capsule) — client-supplied only
 ('p06','Rabeprazole Sodium IP (as enteric coated pellets)','20 mg',1),
 ('p06','Domperidone IP (as sustained release pellets)','30 mg',2),
 ('p06','Excipients','q.s.',3),
 -- COOLSHOT-SUSPENSION composition (per 5 ml) — client-supplied only
 ('p07','Dried Aluminium Hydroxide IP','250 mg',1),
 ('p07','Magnesium Hydroxide IP','250 mg',2),
 ('p07','Activated Dimethicone IP','50 mg',3),
 ('p07','Sorbitol (70%) IP','1.25 mg',4),
 ('p07','Excipients','q.s.',5),
 -- MENTHOF-Jr composition (per 5 ml) — client-supplied only
 ('p08','Chlorpheniramine Maleate IP','2 mg',1),
 ('p08','Phenylephrine Hydrochloride IP','5 mg',2),
 -- HOTSPOT-50 DT composition (per film coated tablet) — client-supplied only
 ('p09','Sildenafil Citrate IP eq. to Sildenafil','50 mg',1),
 ('p09','Excipients','q.s.',2),
 -- HOTSPOT-100 composition (per film coated tablet) — client-supplied only
 ('p10','Sildenafil Citrate IP eq. to Sildenafil','100 mg',1),
 ('p10','Excipients','q.s.',2),
 -- ZAVIOCEF-250 composition (per film coated tablet) — client-supplied only
 ('p11','Cefuroxime Axetil IP eq. to Cefuroxime','250 mg',1),
 ('p11','Excipients','q.s.',2),
 -- ZAVIOCIN-500 composition (per film coated tablet) — client-supplied only
 ('p12','Azithromycin Dihydrate IP eq. to Azithromycin','500 mg',1),
 ('p12','Excipients','q.s.',2),
 -- ZAVIPOD-200 MG composition (per dispersible tablet) — client-supplied only
 ('p13','Cefpodoxime Proxetil IP eq. to Cefpodoxime','200 mg',1),
 ('p13','Excipients','q.s.',2);

-- No seeds for: orders, order_items, field_visits (intentionally empty in v2).
-- product_business_mapping: 23 Generic rows (g01–g23 → Manish Verma). Ethical still to be mapped.

-- Helpful trace view for future Product -> BM -> Party -> Area
CREATE OR REPLACE VIEW v_product_trace AS
SELECT m.id AS mapping_id, p.name AS product, p.packing, p.rate,
       e.name AS business_manager, pa.name AS party, a.name AS area,
       d.name AS division
FROM product_business_mapping m
JOIN products p  ON p.id = m.product_id
LEFT JOIN employees e ON e.id = m.business_manager_id
LEFT JOIN parties pa  ON pa.id = m.party_id
LEFT JOIN areas a     ON a.id = m.area_id
JOIN divisions d ON d.id = p.division_id;
