/* Labokem — page views (pure render functions, no fake data) */
'use strict';
window.LABOKEM = window.LABOKEM || {};

(function () {
  const UI = () => window.LABOKEM.UI;
  const D = () => window.LABOKEM.DATA;

  /* ---------------- Dashboard ---------------- */
  function viewDashboard() {
    const d = D(), ui = UI();
    const ethical = d.products.filter(p => p.divisionId === 'ethical');
    const generic = d.products.filter(p => p.divisionId === 'generic');
    const preview = ethical.slice(0, 5);
    const genericPreview = generic.slice(0, 5);
    return '' +
    ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Dashboard' }]) +
    '<p class="eyebrow">Labokem Laboratories Private Limited</p>' +
    '<h1 class="page-title">Pharma business at a glance</h1>' +
    '<p class="page-sub">Pharmaceuticals / Pharma Products / CFA — internal + informative platform for divisions, products, hierarchy, MR / Business Manager mapping, parties, areas and product information.</p>' +

    '<div class="grid kpi">' +
      '<div class="card kpi-card"><div class="kpi-ico blue">◈</div><div><div class="kpi-num">3</div><div class="kpi-label">Divisions (Ethical + Generic live, OTC ready)</div></div></div>' +
      '<div class="card kpi-card"><div class="kpi-ico green">⬣</div><div><div class="kpi-num">36</div><div class="kpi-label">Products — 13 Ethical + 23 Generic</div></div></div>' +
      '<div class="card kpi-card"><div class="kpi-ico slate">◐</div><div><div class="kpi-num">5</div><div class="kpi-label">Team — 2 RBM alag (Ethical Gaurav + Generic Manish) + 3</div></div></div>' +
      '<div class="card kpi-card"><div class="kpi-ico amber">⬢</div><div><div class="kpi-num">4</div><div class="kpi-label">Parties across 2 areas (Ethical)</div></div></div>' +
    '</div>' +

    '<h2 class="section-title">Divisions</h2>' +
    '<div class="grid cards-3">' +
      '<div class="card hover division-card"><div class="top"><div><h3>Ethical Division</h3><p style="margin:4px 0;color:var(--muted);font-size:14px">Prescription-driven portfolio</p></div>' + ui.pill('live') + '</div>' +
        '<div class="stat-row"><div class="stat"><strong>13</strong><span>Products</span></div><div class="stat"><strong>4</strong><span>Team</span></div><div class="stat"><strong>2 / 4</strong><span>Areas / Parties</span></div></div>' +
        '<div class="btn-row"><a class="btn primary small" href="#/divisions/ethical">Open Ethical →</a><a class="btn small" href="#/products">View products</a></div></div>' +
      '<div class="card hover division-card"><div class="top"><div><h3>Generic Division</h3><p style="margin:4px 0;color:var(--muted);font-size:14px">RBM Generic (alag): Manish Verma</p></div>' + ui.pill('live') + '</div>' +
        '<div class="stat-row"><div class="stat"><strong>23</strong><span>Products (live)</span></div><div class="stat"><strong>19</strong><span>Team under RBM (to be added)</span></div></div>' +
        '<p style="font-size:13.5px;color:var(--muted)">23 stock-register products live. RBM Manish Verma (Gaurav se alag chain).</p>' +
        '<div class="btn-row"><a class="btn primary small" href="#/divisions/generic">Open Generic →</a><a class="btn small" href="#/products">View products</a></div></div>' +
      '<div class="card hover division-card"><div class="top"><div><h3>OTC Division</h3><p style="margin:4px 0;color:var(--muted);font-size:14px">Over-the-counter portfolio</p></div>' + ui.pill('planned') + '</div>' +
        '<div style="margin:12px 0">' + ui.tbd('Data to be updated') + '</div>' +
        '<p style="font-size:13.5px;color:var(--muted)">Empty section reserved — no fake products or employees.</p>' +
        '<div class="btn-row"><a class="btn small" href="#/divisions/otc">View section →</a></div></div>' +
    '</div>' +

    '<div class="grid cards-2" style="margin-top:16px">' +
      '<div class="card"><h3>Reporting hierarchy</h3>' +
        '<p style="color:var(--muted);font-size:14px;margin:6px 0 12px">Ethical chain (alag): Gaurav Singh (RBM) → Deepak Gupta → Jeet (Bulandshahr) + Vinay (Hapur)<br>Generic chain (alag): Manish Verma (RBM) → 19 team (to be added)</p>' +
        '<div class="trace"><code>Product → Business Manager → Party → Area</code><br><span style="color:var(--muted)">e.g. ZAVIOCEF-250 → Jeet Singh → Madhu Medicose → Bulandshahr (structure ready, mapping to be added)</span></div>' +
        '<div class="btn-row"><a class="btn primary small" href="#/org-chart">Open org chart →</a><a class="btn small" href="#/team">View team</a></div></div>' +
      '<div class="card"><h3>Areas &amp; parties</h3>' +
        '<div class="grid cards-2" style="margin-top:12px">' +
          '<div><strong>Bulandshahr</strong><div style="font-size:13.5px;color:var(--muted)">BM: Jeet Singh</div><ul class="party-list"><li><span class="dot"></span>Madhu Medicose</li><li><span class="dot"></span>Paliwal Drug</li></ul></div>' +
          '<div><strong>Hapur</strong><div style="font-size:13.5px;color:var(--muted)">BM: Vinay Kumar</div><ul class="party-list"><li><span class="dot"></span>Rama Chemist</li><li><span class="dot"></span>Shiv Hari Drug</li></ul></div>' +
        '</div>' +
        '<div class="btn-row"><a class="btn small" href="#/areas">Areas →</a><a class="btn small" href="#/parties">Parties →</a><a class="btn small" href="#/orders">Orders structure →</a></div></div>' +
    '</div>' +

    '<h2 class="section-title">Ethical products — preview (revised stock)</h2>' +
    '<div class="table-scroll"><table class="data"><thead><tr><th>#</th><th>Product</th><th>Packing</th><th>Expiry</th><th style="text-align:right">Stock</th><th style="text-align:right">Rate</th><th>Scheme</th><th>Uses</th></tr></thead><tbody>' +
      preview.map((p, i) => '<tr><td class="mono">' + String(i + 1).padStart(2, '0') + '</td>' +
        '<td><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a></td>' +
        '<td>' + ui.esc(p.packing) + '</td><td>' + ui.esc(p.expiry || '') + '</td><td class="rate" style="text-align:right">' + (p.closingStockQty != null ? Number(p.closingStockQty).toLocaleString('en-IN') : '—') + '</td><td class="rate" style="text-align:right">' + ui.inr(p.rate) + '</td>' +
        '<td>' + ui.esc(p.scheme || '--') + '</td><td style="min-width:180px">' + ((p.uses || p.advantages) ? ui.esc(p.uses || p.advantages) : ui.tbd('To be updated')) + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<div class="btn-row"><a class="btn primary" href="#/divisions/ethical">View all 13 Ethical products →</a></div>' +

    '<h2 class="section-title">Generic products — preview (RBM Generic, alag: Manish Verma)</h2>' +
    '<div class="table-scroll"><table class="data"><thead><tr><th>#</th><th>Product</th><th>Composition</th><th>Packing</th><th>Expiry</th><th style="text-align:right">Stock</th><th style="text-align:right">Rate</th><th>Scheme</th></tr></thead><tbody>' +
      genericPreview.map((p, i) => '<tr><td class="mono">' + String(i + 1).padStart(2, '0') + '</td>' +
        '<td><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a></td>' +
        '<td style="min-width:220px">' + ui.esc(p.composition || '') + '</td>' +
        '<td>' + ui.esc(p.packing) + '</td><td>' + ui.esc(p.expiry || '') + '</td><td class="rate" style="text-align:right">' + Number(p.closingStockQty || 0).toLocaleString('en-IN') + '</td><td class="rate" style="text-align:right">' + ui.inr(p.rate) + '</td>' +
        '<td>' + ui.esc(p.scheme || '--') + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<div class="btn-row"><a class="btn primary" href="#/divisions/generic">View all 23 Generic products →</a></div>' +

    '<div class="footer"><span>© 2026 Labokem Laboratories Pvt. Ltd. · Internal business information platform</span><span>Company → Division → Products → Business Manager → Party → Area → Orders / Visits</span></div>';
  }

  /* ---------------- Divisions ---------------- */
  function viewDivisions() {
    const ui = UI();
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Divisions' }]) +
    '<p class="eyebrow">First trade · 3 divisions</p><h1 class="page-title">Divisions</h1>' +
    '<p class="page-sub">Ethical (13) + Generic (23) live. OTC reserved — no fake data created.</p>' +
    '<div class="grid cards-3">' +
      '<div class="card hover"><div class="top" style="display:flex;justify-content:space-between"><h3>Ethical Division</h3>' + ui.pill('live') + '</div><p style="color:var(--muted)">13 products · 4 team · 2 areas · 4 parties. Complete hierarchy and product dashboard.</p><div class="btn-row"><a class="btn primary small" href="#/divisions/ethical">Open →</a></div></div>' +
      '<div class="card hover"><div class="top" style="display:flex;justify-content:space-between"><h3>Generic Division</h3>' + ui.pill('live') + '</div><p style="color:var(--muted)">23 products live · RBM Generic (alag): Manish Verma · 19 team to be added · multiple parties.</p><div class="btn-row"><a class="btn primary small" href="#/divisions/generic">Open →</a></div></div>' +
      '<div class="card hover"><div class="top" style="display:flex;justify-content:space-between"><h3>OTC Division</h3>' + ui.pill('planned') + '</div><div style="margin:10px 0">' + ui.tbd('Data to be updated') + '</div><div class="btn-row"><a class="btn small" href="#/divisions/otc">View section →</a></div></div>' +
    '</div>';
  }

  function viewDivisionDetail(slug) {
    const ui = UI(), d = D();
    const div = d.divisions.find(x => x.slug === slug);
    if (!div) return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Divisions', href: '#/divisions' }, { label: 'Not found' }]) + ui.emptyState('Division not found', 'Check the divisions list.');
    if (div.id === 'ethical') {
      const prods = d.products.filter(p => p.divisionId === 'ethical');
      return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Divisions', href: '#/divisions' }, { label: 'Ethical Division' }]) +
      '<p class="eyebrow">Division · Live · Revised stock register</p><h1 class="page-title">Ethical Division</h1>' +
      '<p class="page-sub">Prescription-driven portfolio. All 13 products with revised stock register (expiry, closing stock, scheme). Team hierarchy, areas and parties implemented. Future mapping: Product → Business Manager → Party → Area.</p>' +
      '<div class="grid kpi">' +
        '<div class="card kpi-card"><div class="kpi-ico green">⬣</div><div><div class="kpi-num">13</div><div class="kpi-label">Products</div></div></div>' +
        '<div class="card kpi-card"><div class="kpi-ico blue">◐</div><div><div class="kpi-num">4</div><div class="kpi-label">Team members</div></div></div>' +
        '<div class="card kpi-card"><div class="kpi-ico amber">⬢</div><div><div class="kpi-num">2</div><div class="kpi-label">Areas</div></div></div>' +
        '<div class="card kpi-card"><div class="kpi-ico slate">◈</div><div><div class="kpi-num">4</div><div class="kpi-label">Parties</div></div></div>' +
      '</div>' +
      '<div class="btn-row"><a class="btn primary" href="#/products">Open product dashboard →</a><a class="btn" href="#/org-chart">Org chart</a><a class="btn" href="#/team">Team</a></div>' +
      '<h2 class="section-title">All 13 products (revised stock register)</h2>' +
      '<div class="table-scroll"><table class="data"><thead><tr><th>S. No.</th><th>Product</th><th>Composition</th><th>Expiry</th><th style="text-align:right">Closing Stock Qty</th><th>Packing</th><th style="text-align:right">Rate</th><th>Scheme</th><th>Business mapping</th></tr></thead><tbody>' +
        prods.map((p, i) => '<tr><td class="mono">' + (i + 1) + '</td><td><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a></td><td style="min-width:200px;max-width:320px">' + ui.esc(p.salt || p.composition || '') + '</td><td>' + ui.esc(p.expiry || '') + '</td><td class="rate" style="text-align:right">' + (p.closingStockQty != null ? Number(p.closingStockQty).toLocaleString('en-IN') : '—') + '</td><td>' + ui.esc(p.packing) + '</td><td class="rate" style="text-align:right">' + ui.inr(p.rate) + '</td><td>' + ui.esc(p.scheme || '--') + '</td><td>' + ui.toBeMapped() + '</td></tr>').join('') +
      '</tbody></table></div>';
    }
    if (div.id === 'generic') {
      const gprods = d.products.filter(p => p.divisionId === 'generic');
      const head = d.employees.find(e => e.id === 'manish-verma');
      return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Divisions', href: '#/divisions' }, { label: 'Generic Division' }]) +
      '<p class="eyebrow">Division · Live · RBM Generic (alag chain): Manish Verma</p><h1 class="page-title">Generic Division</h1>' +
      '<p class="page-sub">23 stock-register products live. Managed by Manish Verma (RBM Generic, Gaurav Singh se alag chain). 19 team members + multiple parties to be added without redesign.</p>' +
      '<div class="grid kpi">' +
        '<div class="card kpi-card"><div class="kpi-ico green">⬣</div><div><div class="kpi-num">23</div><div class="kpi-label">Products (live)</div></div></div>' +
        '<div class="card kpi-card"><div class="kpi-ico blue">◐</div><div><div class="kpi-num">1</div><div class="kpi-label">RBM Generic: Manish Verma (alag)</div></div></div>' +
        '<div class="card kpi-card"><div class="kpi-ico amber">⬢</div><div><div class="kpi-num">19</div><div class="kpi-label">Team under RBM (to be added)</div></div></div>' +
        '<div class="card kpi-card"><div class="kpi-ico slate">◈</div><div><div class="kpi-num">—</div><div class="kpi-label">Parties: multiple (to be added)</div></div></div>' +
      '</div>' +
      '<div class="card" style="margin-top:16px"><h3>RBM — Generic Division (alag chain)</h3><p style="margin:6px 0;color:var(--muted)">All 23 products below are managed by <a href="#/team/manish-verma"><strong>Manish Verma (RBM Generic)</strong></a> — Gaurav Singh (RBM Ethical) se separate chain. New entries / stock updates isi ke through honge.</p><div class="btn-row"><a class="btn small" href="#/team/manish-verma">View Manish Verma →</a><a class="btn small" href="#/team">View team</a></div></div>' +
      '<h2 class="section-title">All 23 Generic products (stock register)</h2>' +
      '<div class="table-scroll"><table class="data"><thead><tr><th>S. No.</th><th>Product</th><th>Composition</th><th>Expiry</th><th style="text-align:right">Closing Stock Qty</th><th>Packing</th><th>Unit</th><th style="text-align:right">Rate</th><th>Scheme</th><th>RBM</th></tr></thead><tbody>' +
        gprods.map((p, i) => '<tr><td class="mono">' + (i + 1) + '</td><td><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a></td><td style="min-width:240px;max-width:360px">' + ui.esc(p.composition || '') + '</td><td>' + ui.esc(p.expiry || '') + '</td><td class="rate" style="text-align:right">' + Number(p.closingStockQty || 0).toLocaleString('en-IN') + '</td><td>' + ui.esc(p.packing) + '</td><td>' + ui.esc(p.unit || '') + '</td><td class="rate" style="text-align:right">' + ui.inr(p.rate) + '</td><td>' + ui.esc(p.scheme || '--') + '</td><td><a href="#/team/manish-verma">Manish Verma</a></td></tr>').join('') +
      '</tbody></table></div>' +
      '<div class="grid cards-2" style="margin-top:16px"><div class="card"><h3>What is pending</h3><dl class="kv" style="margin-top:12px"><dt>Team</dt><dd>19 people under Manish Verma (to be added)</dd><dt>Parties</dt><dd>Multiple (to be added)</dd></dl></div>' +
      '<div class="card"><h3>Status</h3><div style="margin:12px 0">' + ui.tbd('Team + parties: to be updated') + '</div><div class="btn-row"><a class="btn small" href="#/database">View DB design →</a></div></div></div>';
    }
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Divisions', href: '#/divisions' }, { label: 'OTC Division' }]) +
      '<p class="eyebrow">Division · Planned</p><h1 class="page-title">OTC Division</h1><p class="page-sub">Empty division section reserved for future data.</p>' +
      ui.emptyState('Data to be updated', 'No fake products or employees created for OTC.', '<div class="btn-row" style="justify-content:center"><a class="btn small" href="#/database">View DB design →</a></div>');
  }

  /* ---------------- Products ---------------- */
  function packingType(packing) {
    const s = String(packing || '').toUpperCase();
    if (s.includes('TAB') || s.includes('CAPSULE')) return 'Tablet';
    if (s.includes('SPRAY') || s.includes('GEL') || s.includes('TUBE') || s.includes('GM')) return 'Spray / Topical';
    if (s.includes('ML') || s.includes('BOTT') || s.includes('SYRUP') || s.includes('SYP')) return 'Liquid';
    return 'Other';
  }
  function divLabel(id) { return id === 'ethical' ? 'Ethical' : id === 'generic' ? 'Generic' : 'OTC'; }

  function productFilterState() {
    window.LABOKEM._pf = window.LABOKEM._pf || { q: '', division: 'all', packing: 'all', bm: 'all', party: 'all', area: 'all', salt: 'all', sort: 'default', page: 1, view: 'table' };
    // migrate old sessions stuck on ethical-only default
    if (window.LABOKEM._pfMigrated !== true) { window.LABOKEM._pfMigrated = true; }
    return window.LABOKEM._pf;
  }

  function filteredProducts() {
    const d = D(), st = productFilterState();
    let list = d.products.slice();
    if (st.division !== 'all') list = list.filter(p => p.divisionId === st.division);
    if (st.q && String(st.q).trim()) {
      const q = String(st.q).trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        String(p.packing || '').toLowerCase().includes(q) ||
        String(p.salt || '').toLowerCase().includes(q) ||
        String(p.uses || p.advantages || '').toLowerCase().includes(q) ||
        String(p.composition || '').toLowerCase().includes(q) ||
        String(p.expiry || '').toLowerCase().includes(q) ||
        String(p.unit || '').toLowerCase().includes(q) ||
        String(p.scheme || '').toLowerCase().includes(q));
    }
    if (st.packing !== 'all') list = list.filter(p => packingType(p.packing) === st.packing);
    // BM / Party / Area: no product mapping yet => intentional zero results when filtered
    if (st.bm !== 'all') list = list.filter(p => (p.bmId || '') === st.bm);
    if (st.party !== 'all') list = list.filter(p => (p.partyId || '') === st.party);
    if (st.area !== 'all') list = list.filter(p => (p.areaId || '') === st.area);
    if (st.salt !== 'all') list = list.filter(p => (p.salt || '') === st.salt);
    if (st.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    if (st.sort === 'rate-asc') list.sort((a, b) => a.rate - b.rate);
    if (st.sort === 'rate-desc') list.sort((a, b) => b.rate - a.rate);
    return list;
  }

  function viewProducts() {
    const ui = UI(), d = D(), st = productFilterState();
    const list = filteredProducts();
    const perPage = 10;
    const pages = Math.max(1, Math.ceil(list.length / perPage));
    if (st.page > pages) st.page = pages;
    const start = (st.page - 1) * perPage;
    const pageItems = list.slice(start, start + perPage);

    const bmOpts = d.employees.slice();
    const opt = (v, cur, label) => '<option value="' + ui.esc(v) + '"' + (String(cur) === String(v) ? ' selected' : '') + '>' + ui.esc(label) + '</option>';
    const saltOpts = Array.from(new Set(d.products.map(p => p.salt).filter(Boolean)));
    const usesOf = (p) => p.uses || p.advantages || null;
    const headNameOf = (p) => {
      if (!p.bmId) return null;
      const e = d.employees.find(x => x.id === p.bmId);
      return e ? e.name : null;
    };

    let tableRows = pageItems.map((p) => {
      const idx = d.products.indexOf(p);
      const isGen = p.divisionId === 'generic';
      const saltCell = p.salt ? ui.esc(p.salt) : (isGen ? ui.esc(p.composition || '') : ui.tbd('To be updated'));
      const compCell = (p.ingredients && p.ingredients.length)
        ? ui.esc(p.ingredients.length + ' ingredients — view details')
        : (p.composition ? ui.esc(p.composition) : ui.tbd('To be updated'));
      const usesCell = usesOf(p) ? ui.esc(usesOf(p)) : (isGen ? '<span style="color:var(--muted)">—</span>' : ui.tbd('To be updated'));
      const headCell = headNameOf(p) ? '<a href="#/team/' + p.bmId + '">' + ui.esc(headNameOf(p)) + '</a>' : ui.toBeMapped();
      return '<tr><td class="mono">' + String(idx + 1).padStart(2, '0') + '</td>' +
        '<td><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a><div style="margin-top:4px"><span class="badge-div">' + divLabel(p.divisionId) + '</span></div></td>' +
        '<td style="white-space:nowrap">' + ui.esc(p.packing) + '</td>' +
        '<td>' + (p.expiry ? ui.esc(p.expiry) : '<span style="color:var(--muted)">—</span>') + '</td>' +
        '<td class="rate" style="text-align:right">' + (p.closingStockQty != null ? Number(p.closingStockQty).toLocaleString('en-IN') : '<span style="color:var(--muted)">—</span>') + '</td>' +
        '<td>' + (p.unit ? ui.esc(p.unit) : '<span style="color:var(--muted)">—</span>') + '</td>' +
        '<td class="rate" style="text-align:right">' + ui.inr(p.rate) + '</td>' +
        '<td>' + ui.esc(p.scheme || (isGen ? '--' : '—')) + '</td>' +
        '<td style="min-width:180px;max-width:280px">' + saltCell + '</td><td>' + compCell + '</td>' +
        '<td><div style="display:flex;gap:8px"><a class="btn small" href="#/product/' + p.slug + '">Details</a><button class="btn small" data-quick="' + p.slug + '">Quick view</button></div></td></tr>';
    }).join('');

    let cards = pageItems.map((p) => {
      const isGen = p.divisionId === 'generic';
      const headCell = headNameOf(p) ? 'Head: ' + headNameOf(p) : 'Mapping: to be mapped';
      return '<div class="card hover product-card"><div class="p-head"><h3 class="p-name"><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a></h3><span class="badge-div">' + divLabel(p.divisionId) + '</span></div>' +
        '<div class="p-meta"><div><span>Packing</span><strong>' + ui.esc(p.packing) + '</strong></div><div><span>Rate</span><strong>' + ui.inr(p.rate) + '</strong></div>' +
        (isGen ? '<div><span>Expiry</span><strong>' + ui.esc(p.expiry || '') + '</strong></div><div><span>Stock</span><strong>' + Number(p.closingStockQty || 0).toLocaleString('en-IN') + ' ' + ui.esc(p.unit || '') + '</strong></div>' : '') + '</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;flex-direction:column">' +
          '<div style="font-size:13px"><strong>Composition:</strong> ' + ui.esc(p.composition || '') + '</div>' +
          (isGen
            ? '<div style="font-size:13px"><strong>Scheme:</strong> ' + ui.esc(p.scheme || '--') + ' · <strong>Head:</strong> ' + ui.esc(headNameOf(p) || '') + '</div>'
            : '<div style="font-size:13px"><strong>Salt:</strong> ' + (p.salt ? ui.esc(p.salt) : ui.tbd('To be updated')) + '</div>' +
              '<div style="font-size:13px"><strong>Uses:</strong> ' + (usesOf(p) ? ui.esc(usesOf(p)) : ui.tbd('To be updated')) + '</div>') +
        '</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tbd">' + ui.esc(headCell) + '</span></div>' +
        '<div class="btn-row"><a class="btn primary small" href="#/product/' + p.slug + '">Product details →</a><button class="btn small" data-quick="' + p.slug + '">Quick view</button></div></div>';
    }).join('');

    const mappingFilterActive = st.bm !== 'all' || st.party !== 'all' || st.area !== 'all';
    const titleByDiv = st.division === 'ethical' ? 'Ethical product dashboard' : st.division === 'generic' ? 'Generic product dashboard' : 'All products dashboard';
    const crumbTrail = st.division === 'ethical'
      ? [{ label: 'Home', href: '#/' }, { label: 'Divisions', href: '#/divisions' }, { label: 'Ethical Division', href: '#/divisions/ethical' }, { label: 'Products' }]
      : st.division === 'generic'
      ? [{ label: 'Home', href: '#/' }, { label: 'Divisions', href: '#/divisions' }, { label: 'Generic Division', href: '#/divisions/generic' }, { label: 'Products' }]
      : [{ label: 'Home', href: '#/' }, { label: 'Products' }];
    const eyebrow = st.division === 'ethical' ? 'Ethical Division → Products' : st.division === 'generic' ? 'Generic Division → Products · RBM Generic (alag): Manish Verma' : 'Ethical + Generic → Products';

    return ui.crumbs(crumbTrail) +
    '<p class="eyebrow">' + eyebrow + '</p><h1 class="page-title">' + titleByDiv + '</h1>' +
    '<p class="page-sub">13 Ethical + 23 Generic = 36 products. Ethical shows salt/uses; Generic shows stock-register fields managed by Manish Verma (RBM Generic, alag chain). No medical information is invented.</p>' +

    '<div class="toolbar"><div class="toolbar-row">' +
      '<div class="field" style="flex:2;min-width:220px"><label for="f-q">Search — name / packing / composition / expiry / unit</label><input id="f-q" type="search" placeholder="e.g. KEMLOCET, LABOFEN, Sep-27, BOTT…" value="' + ui.esc(st.q) + '" autocomplete="off"></div>' +
      '<div class="field small"><label for="f-div">Division</label><select id="f-div">' + opt('all', st.division, 'All (36)') + opt('ethical', st.division, 'Ethical (13)') + opt('generic', st.division, 'Generic (23)') + opt('otc', st.division, 'OTC (to be added)') + '</select></div>' +
      '<div class="field small"><label for="f-pack">Packing</label><select id="f-pack">' + opt('all', st.packing, 'All packing') + opt('Tablet', st.packing, 'Tablet') + opt('Spray / Topical', st.packing, 'Spray / Topical') + opt('Liquid', st.packing, 'Liquid') + opt('Other', st.packing, 'Other') + '</select></div>' +
      '<div class="field small"><label for="f-sort">Sort</label><select id="f-sort">' + opt('default', st.sort, 'Default (#)') + opt('name', st.sort, 'Name A–Z') + opt('rate-asc', st.sort, 'Rate low → high') + opt('rate-desc', st.sort, 'Rate high → low') + '</select></div>' +
    '</div><div class="toolbar-row">' +
      '<div class="field small"><label for="f-bm">RBM / Business Manager</label><select id="f-bm">' + opt('all', st.bm, 'All') + bmOpts.map(e => opt(e.id, st.bm, e.name + (e.id === 'manish-verma' ? ' (RBM Generic, alag)' : e.id === 'gaurav-singh' ? ' (RBM Ethical, alag)' : ''))).join('') + '</select></div>' +
      '<div class="field small"><label for="f-party">Party</label><select id="f-party">' + opt('all', st.party, 'All') + d.parties.map(p => opt(p.id, st.party, p.name)).join('') + '</select></div>' +
      '<div class="field small"><label for="f-area">Area</label><select id="f-area">' + opt('all', st.area, 'All') + d.areas.map(a => opt(a.id, st.area, a.name)).join('') + '</select></div>' +
      '<div class="field small"><label for="f-salt">Salt</label><select id="f-salt">' + opt('all', st.salt, 'All salts') + saltOpts.map(s => opt(s, st.salt, s.length > 42 ? s.slice(0, 42) + '…' : s)).join('') + '</select></div>' +
      '<div class="field small"><label>&nbsp;</label><div style="display:flex;gap:8px"><button class="btn small" id="f-clear">Reset</button>' +
      '<button class="btn small" id="v-table" aria-pressed="' + (st.view === 'table') + '">Table</button><button class="btn small" id="v-cards" aria-pressed="' + (st.view === 'cards') + '">Cards</button></div></div>' +
    '</div>' +
    '<div class="chips"><button class="chip' + (st.division === 'ethical' ? ' active' : '') + '" data-divchip="ethical">Ethical</button><button class="chip' + (st.division === 'generic' ? ' active' : '') + '" data-divchip="generic">Generic (23)</button><button class="chip' + (st.division === 'otc' ? ' active' : '') + '" data-divchip="otc">OTC</button><button class="chip' + (st.division === 'all' ? ' active' : '') + '" data-divchip="all">All (36)</button></div></div>' +

    '<div class="results-meta">Showing ' + list.length + ' of 36 products (13 Ethical + 23 Generic)' + (mappingFilterActive ? ' · BM filter: Manish Verma shows 23 Generic rows' : '') + (st.salt !== 'all' ? ' · salt filter active' : '') + '</div>' +

    (list.length === 0
      ? ui.emptyState('No products found', 'Try adjusting search or filters.', '<div class="btn-row" style="justify-content:center"><button class="btn small" id="f-clear2">Clear filters</button></div>')
      : (st.view === 'table'
        ? '<div class="table-scroll"><table class="data"><thead><tr><th>#</th><th>Product</th><th>Packing</th><th>Expiry</th><th style="text-align:right">Stock Qty</th><th>Unit</th><th style="text-align:right">Rate</th><th>Scheme</th><th>Salt / Composition</th><th>Composition</th><th></th></tr></thead><tbody>' + tableRows + '</tbody></table></div>'
        : '<div class="grid products">' + cards + '</div>') +
        (pages > 1 ? '<div class="pager"><button id="pg-prev"' + (st.page <= 1 ? ' disabled' : '') + '>← Prev</button>' + Array.from({ length: pages }, (_, i) => '<button data-pg="' + (i + 1) + '" class="' + (st.page === i + 1 ? 'active' : '') + '">' + (i + 1) + '</button>').join('') + '<button id="pg-next"' + (st.page >= pages ? ' disabled' : '') + '>Next →</button></div>' : '')
    );
  }

  /* ---------------- Product detail ---------------- */
  function viewProductDetail(slug) {
    const ui = UI(), d = D();
    const p = d.products.find(x => x.slug === slug);
    if (!p) return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Products', href: '#/products' }, { label: 'Not found' }]) + ui.emptyState('Product not found', 'It may have been renamed. See all 36 products.', '<div class="btn-row" style="justify-content:center"><a class="btn small" href="#/products">Back to products</a></div>');
    const idx = d.products.indexOf(p);
    const prev = d.products[idx - 1], next = d.products[idx + 1];
    const isGen = p.divisionId === 'generic';
    const divName = isGen ? 'Generic Division' : 'Ethical Division';
    const totalLabel = d.products.length + ' · ' + divName;
    const headEmp = p.bmId ? d.employees.find(e => e.id === p.bmId) : null;
    const usesVal = p.uses || p.advantages || null;
    const saltBlock = p.salt
      ? '<div style="font-size:15px;font-weight:600">' + ui.esc(p.salt) + '</div>'
      : (isGen
        ? '<div style="font-size:15px;font-weight:600">' + ui.esc(p.composition || '') + '</div><p style="color:var(--muted);font-size:13.5px">Stock-register composition. Salt/uses not supplied — no invention.</p>'
        : ui.tbd('Details to be updated') + '<p style="color:var(--muted);font-size:13.5px">No salt invented. Field supports salt search &amp; filter.</p>');
    const compHead = p.composition ? '<div style="font-size:14px;font-weight:700;margin-top:10px">' + ui.esc(p.composition) + '</div>' : '';
    const compRows = (p.ingredients && p.ingredients.length)
      ? p.ingredients.map(ing => '<tr><td>' + ui.esc(ing.name) + '</td><td style="white-space:nowrap">' + ui.esc(ing.quantity) + '</td></tr>').join('')
      : (isGen
        ? '<tr><td>' + ui.esc(p.composition || '') + '</td><td>—</td></tr>'
        : '<tr><td>' + ui.tbd('Details to be updated') + '</td><td>—</td></tr>');
    const compBlock = (p.salt || p.composition || (p.ingredients && p.ingredients.length))
      ? compHead
      : ui.tbd('Details to be updated');
    const usesBlock = usesVal
      ? '<div style="font-size:15px;font-weight:600">' + ui.esc(usesVal) + '</div>'
      : (isGen ? '<span style="color:var(--muted)">— (stock register me uses nahi hai)</span>' : ui.tbd('Details to be updated') + '<p style="color:var(--muted);font-size:13.5px">No medical claims created beyond supplied data.</p>');
    const hasStock = (p.expiry || p.closingStockQty != null || p.scheme);
    const stockRows = hasStock
      ? '<dt>Expiry</dt><dd>' + ui.esc(p.expiry || '—') + '</dd>' +
        '<dt>Closing stock qty</dt><dd>' + (p.closingStockQty != null ? Number(p.closingStockQty).toLocaleString('en-IN') : '—') + '</dd>' +
        (p.unit ? '<dt>Unit</dt><dd>' + ui.esc(p.unit) + '</dd>' : '') +
        '<dt>Scheme</dt><dd>' + ui.esc(p.scheme || '--') + '</dd>' +
        (isGen ? '<dt>RBM (Generic, alag)</dt><dd>' + (headEmp ? '<a href="#/team/' + headEmp.id + '">' + ui.esc(headEmp.name) + '</a>' : ui.toBeMapped()) + '</dd>' : '')
      : '';
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: divName + ' Products', href: '#/products' }, { label: p.name }]) +
    '<p class="eyebrow">Product ' + String(idx + 1).padStart(2, '0') + ' / ' + totalLabel + '</p>' +
    '<h1 class="page-title">' + ui.esc(p.name) + '</h1>' +
    '<p class="page-sub">Packing ' + ui.esc(p.packing) + ' · Rate ' + ui.inr(p.rate) + ' · Division ' + divName + (isGen ? ' · RBM Generic (alag): Manish Verma' : '. Salt / composition / uses appear only when officially supplied.') + '</p>' +
    '<div class="detail-grid"><div>' +
      '<div class="card"><h3>Product overview</h3><dl class="kv" style="margin-top:12px">' +
        '<dt>Product name</dt><dd>' + ui.esc(p.name) + '</dd>' +
        '<dt>Division</dt><dd>' + divName + '</dd>' +
        '<dt>Packing</dt><dd>' + ui.esc(p.packing) + '</dd>' +
        '<dt>Rate</dt><dd>' + ui.inr(p.rate) + '</dd>' + stockRows +
        (p.salt ? '<dt>Salt</dt><dd>' + ui.esc(p.salt) + '</dd>' : '') +
        (usesVal ? '<dt>Uses</dt><dd>' + ui.esc(usesVal) + '</dd>' : '') + '</dl>' +
        '<div class="btn-row"><button class="btn small" data-quick="' + p.slug + '">Quick view</button><a class="btn small" href="#/products">← All products</a>' + (isGen ? '<a class="btn small" href="#/divisions/generic">Generic division →</a>' : '') + '</div></div>' +
      '<div class="card section-card"><h3>' + (isGen ? 'Composition (stock register)' : 'Salt') + '</h3><div style="margin-top:10px">' + saltBlock + '</div></div>' +
      '<div class="card section-card"><h3>Composition</h3><div style="margin-top:10px">' + compBlock + '</div>' +
        '<div class="table-scroll" style="margin-top:12px"><table class="data" style="min-width:420px"><thead><tr><th>Ingredient / Composition</th><th>Quantity</th></tr></thead><tbody>' + compRows + '</tbody></table></div></div>' +
      '<div class="card section-card"><h3>Uses</h3><div style="margin-top:10px">' + usesBlock + '</div></div>' +
    '</div><div>' +
      '<div class="card"><h3>Business mapping</h3><dl class="kv" style="margin-top:12px;grid-template-columns:1fr">' +
        '<dt>Business Manager / Head</dt><dd>' + (headEmp ? '<a href="#/team/' + headEmp.id + '">' + ui.esc(headEmp.name) + ' — ' + ui.esc(headEmp.designation) + '</a>' : ui.toBeMapped()) + '</dd>' +
        '<dt>Party</dt><dd>' + ui.toBeMapped() + '</dd>' +
        '<dt>Area</dt><dd>' + ui.toBeMapped() + '</dd></dl>' +
        (isGen
          ? '<div class="notice" style="margin-top:12px">Generic product — <strong>RBM Manish Verma (alag chain)</strong> dekhta hai. Gaurav Singh se separate. New stock / party mapping isi ke through hoga.<br><code>Product → Manish Verma (RBM Generic) → Party → Area</code></div>'
          : '<div class="notice" style="margin-top:12px">Mapping will be provided later. Structure supports:<br><code>Product → BM → Party → Area</code></div>' +
            '<div class="trace" style="margin-top:12px">Possible traces (structure):<br>• ' + ui.esc(p.name) + ' → Jeet Singh → Madhu Medicose → Bulandshahr<br>• ' + ui.esc(p.name) + ' → Vinay Kumar → Rama Chemist → Hapur</div>') + '</div>' +
      '<div class="card section-card"><h3>Navigate</h3><div class="btn-row">' +
        (prev ? '<a class="btn small" href="#/product/' + prev.slug + '">← ' + ui.esc(prev.name) + '</a>' : '') +
        (next ? '<a class="btn small" href="#/product/' + next.slug + '">' + ui.esc(next.name) + ' →</a>' : '') +
      '</div></div>' +
    '</div></div>';
  }

  /* ---------------- Team ---------------- */
  function viewTeam() {
    const ui = UI(), d = D();
    const ethicalList = d.employees.filter(e => e.divisionId === 'ethical');
    const genericHead = d.employees.find(e => e.id === 'manish-verma');
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Team' }, { label: 'Business Managers' }]) +
    '<p class="eyebrow">Team → RBMs (alag-alag chain) + BMs</p><h1 class="page-title">Team</h1>' +
    '<p class="page-sub">Ethical chain: Gaurav Singh (RBM Ethical) · 1 Sr BM · 2 BM. Generic chain (alag): Manish Verma (RBM Generic, 23 products). Dono RBM alag-alag, ek dusre ko report nahi karte.</p>' +
    '<h2 class="section-title">Ethical team (4) — Gaurav Singh chain</h2>' +
    '<div class="grid cards-2">' + ethicalList.map(ui.personCard).join('') + '</div>' +
    '<h2 class="section-title">Generic Division — RBM (alag chain, new user)</h2>' +
    '<div class="grid cards-2">' + ui.personCard(genericHead) + '<div class="card"><h3>Manish Verma kya dekhta hai?</h3><p style="color:var(--muted)">RBM Generic (alag chain). All 23 Generic stock-register products. 19 team members + multiple parties isi ke under add honge. Gaurav Singh ko report nahi karta.</p><div class="btn-row"><a class="btn primary small" href="#/team/manish-verma">Open Manish Verma →</a><a class="btn small" href="#/divisions/generic">Generic division →</a></div></div></div>' +
    '<h2 class="section-title">Field logic</h2><div class="card"><ul style="margin:0;padding-left:18px;color:var(--muted)">' +
      '<li>Jeet Singh and Vinay Kumar are Business Managers and visit the field (Ethical).</li>' +
      '<li>Deepak Gupta also visits the field with the Business Managers (with Jeet or Vinay depending on visit).</li>' +
      '<li>Gaurav Singh — RBM Ethical (alag chain, Generic se separate).</li>' +
      '<li>Manish Verma — RBM Generic (alag chain, Gaurav ko report nahi karta) — manages 23 generic products, 19 team to be added.</li>' +
      '<li>Party orders are associated with the respective Business Manager.</li></ul></div>';
  }

  function viewTeamDetail(id) {
    const ui = UI(), d = D();
    const e = d.employees.find(x => x.id === id);
    if (!e) return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Team', href: '#/team' }, { label: 'Not found' }]) + ui.emptyState('Team member not found', 'See the full team list.');
    if (e.id === 'manish-verma') {
      const gprods = d.products.filter(p => p.divisionId === 'generic');
      return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Team', href: '#/team' }, { label: e.name }]) +
      '<p class="eyebrow">Regional Business Manager — Generic (alag chain)</p><h1 class="page-title">Manish Verma</h1>' +
      '<p class="page-sub">' + ui.esc(e.fieldRole || '') + '</p>' +
      '<div class="detail-grid"><div class="card"><div class="person"><div class="avatar blue">MV</div><div><h3>Manish Verma</h3><div class="role">Regional Business Manager — Generic</div><div class="sub">RBM Generic (alag chain) · 23 products · Gaurav Singh se separate</div></div></div>' +
        '<dl class="kv" style="margin-top:16px"><dt>Division</dt><dd>Generic Division (live)</dd>' +
        '<dt>Designation</dt><dd>Regional Business Manager (Generic, alag chain)</dd>' +
        '<dt>Reports to</dt><dd>— (alag RBM, Gaurav Singh ko report nahi karta)</dd>' +
        '<dt>Manages products</dt><dd>23 Generic products (stock register)</dd>' +
        '<dt>Team</dt><dd>19 people under Manish Verma (to be added)</dd>' +
        '<dt>Parties</dt><dd>' + ui.tbd('Multiple — to be added') + '</dd>' +
        '<dt>Area</dt><dd>' + ui.esc(e.areaNote || '') + '</dd></dl>' +
        '<div class="notice" style="margin-top:12px">Generic ke 23 products <strong>RBM Manish Verma (alag chain)</strong> dekhta hai. Gaurav Singh (RBM Ethical) se separate. Ownership + future adds yahi se honge.</div>' +
        '<div class="btn-row"><a class="btn primary small" href="#/divisions/generic">Open Generic division →</a><a class="btn small" href="#/team">← Team</a></div></div>' +
      '<div><div class="card"><h3>Trace preview</h3><div class="trace" style="margin-top:10px">Product → <strong>Manish Verma</strong> → Party (to be added) → Area (to be added)<br>e.g. KEMLOCET → Manish Verma</div><div class="btn-row"><a class="btn small" href="#/org-chart">Org chart →</a></div></div>' +
      '<div class="card section-card"><h3>23 Generic products (managed)</h3><div class="table-scroll" style="margin-top:10px"><table class="data" style="min-width:360px"><thead><tr><th>#</th><th>Product</th><th style="text-align:right">Stock</th></tr></thead><tbody>' +
        gprods.map((p, i) => '<tr><td class="mono">' + (i + 1) + '</td><td><a class="prod-link" href="#/product/' + p.slug + '">' + ui.esc(p.name) + '</a></td><td class="rate" style="text-align:right">' + Number(p.closingStockQty || 0).toLocaleString('en-IN') + '</td></tr>').join('') +
      '</tbody></table></div></div></div></div>';
    }
    const mgr = e.reportsTo ? d.employees.find(x => x.id === e.reportsTo) : null;
    const reports = (e.reportsFrom || []).map(rid => d.employees.find(x => x.id === rid)).filter(Boolean);
    const area = e.areaId ? d.areas.find(a => a.id === e.areaId) : null;
    const parties = (e.partyIds || []).map(pid => d.parties.find(p => p.id === pid)).filter(Boolean);
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Team', href: '#/team' }, { label: e.name }]) +
    '<p class="eyebrow">' + ui.esc(e.designation) + '</p><h1 class="page-title">' + ui.esc(e.name) + '</h1>' +
    '<p class="page-sub">' + ui.esc(e.fieldRole || '') + '</p>' +
    '<div class="detail-grid"><div class="card"><div class="person"><div class="avatar">' + ui.esc(e.initials) + '</div><div><h3>' + ui.esc(e.name) + '</h3><div class="role">' + ui.esc(e.designation) + '</div><div class="sub">' + ui.esc(e.shortRole || '') + '</div></div></div>' +
      '<dl class="kv" style="margin-top:16px"><dt>Reporting manager</dt><dd>' + (mgr ? '<a href="#/team/' + mgr.id + '">' + ui.esc(mgr.name) + ' — ' + ui.esc(mgr.designation) + '</a>' : '— (top of Ethical regional hierarchy)') + '</dd>' +
      '<dt>Receives reports from</dt><dd>' + (reports.length ? reports.map(r => '<a href="#/team/' + r.id + '">' + ui.esc(r.name) + '</a>').join(', ') : '—') + '</dd>' +
      '<dt>Area</dt><dd>' + (area ? '<a href="#/areas/' + area.id + '">' + ui.esc(area.name) + '</a>' : ui.esc(e.areaNote || 'Data to be updated')) + '</dd>' +
      '<dt>Associated parties</dt><dd>' + (parties.length ? parties.map(p => '<a href="#/parties/' + p.id + '">' + ui.esc(p.name) + '</a>').join(', ') : ui.tbd('Data to be updated')) + '</dd>' +
      '<dt>Associated products</dt><dd>' + ui.tbd('To be mapped — 13 Ethical products ready') + ' <a href="#/products">View products →</a></dd>' +
      '<dt>Field visits</dt><dd>' + ui.tbd('Data to be updated') + '</dd><dt>Orders</dt><dd>' + ui.tbd('Data to be updated') + '</dd></dl></div>' +
    '<div><div class="card"><h3>Parties</h3>' + (parties.length ? '<ul class="party-list">' + parties.map(p => '<li><span class="dot"></span><a href="#/parties/' + p.id + '">' + ui.esc(p.name) + '</a> · ' + ui.esc((d.areas.find(a => a.id === p.areaId) || {}).name || '') + '</li>').join('') + '</ul>' : '<div style="margin-top:10px">' + ui.tbd('No direct parties — supervisory role') + '</div>') + '</div>' +
    '<div class="card section-card"><h3>Trace preview</h3><div class="trace" style="margin-top:10px">' + (e.id === 'jeet-singh' ? 'Product → <strong>Jeet Singh</strong> → Madhu Medicose / Paliwal Drug → Bulandshahr' : e.id === 'vinay-kumar' ? 'Product → <strong>Vinay Kumar</strong> → Rama Chemist / Shiv Hari Drug → Hapur' : e.id === 'deepak-gupta' ? 'Field with Jeet Singh or Vinay Kumar · Reports to Gaurav Singh' : 'Overall regional supervision · Receives reports from Deepak Gupta') + '</div><div class="btn-row"><a class="btn small" href="#/org-chart">Org chart →</a><a class="btn small" href="#/team">← Team</a></div></div></div></div>';
  }

  /* ---------------- Org chart ---------------- */
  function viewOrgChart() {
    const ui = UI(), d = D();
    const gCount = d.products.filter(p => p.divisionId === 'generic').length;
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Organization chart' }]) +
    '<p class="eyebrow">Reporting hierarchy · 2 alag RBM chains · interactive</p><h1 class="page-title">Organizational chart</h1>' +
    '<p class="page-sub">Chain 1 (Ethical): Gaurav Singh (RBM) → Deepak Gupta → Jeet + Vinay. Chain 2 (Generic, alag): Manish Verma (RBM) → 19 team (to be added) · ' + gCount + ' products live. Dono RBM ek dusre ko report nahi karte.</p>' +
    '<div class="org"><div class="org-inner">' +
      '<div class="org-level"><a class="org-node top" href="#/team/gaurav-singh"><div class="lvl">Regional Business Manager · Ethical (alag chain)</div><h3>Gaurav Singh</h3><p>Ethical regional supervision · Receives reports from Deepak Gupta · Generic se alag</p></a></div>' +
      '<div class="connector"></div>' +
      '<div class="org-level"><a class="org-node mid" href="#/team/deepak-gupta"><div class="lvl">Senior Business Manager · Head</div><h3>Deepak Gupta</h3><p>Reports to Gaurav Singh · Field with BMs · Reports from Jeet + Vinay</p></a></div>' +
      '<div class="connector"></div><div class="connector-h"></div>' +
      '<div class="split">' +
        '<div><a class="org-node leaf-jeet" href="#/team/jeet-singh"><div class="lvl">Business Manager</div><h3>Jeet Singh</h3><p>Reports to Deepak Gupta · Area: Bulandshahr</p><div class="mini-parties">● Madhu Medicose<br>● Paliwal Drug</div></a></div>' +
        '<div><a class="org-node leaf-vinay" href="#/team/vinay-kumar"><div class="lvl">Business Manager</div><h3>Vinay Kumar</h3><p>Reports to Deepak Gupta · Area: Hapur</p><div class="mini-parties">● Rama Chemist<br>● Shiv Hari Drug</div></a></div>' +
      '</div>' +
    '</div></div>' +
    '<div class="org" style="margin-top:16px"><div class="org-inner">' +
      '<div class="org-level"><a class="org-node mid" href="#/team/manish-verma" style="border-top:4px solid #107a6e"><div class="lvl">Regional Business Manager · Generic (alag chain)</div><h3>Manish Verma</h3><p>RBM Generic — Gaurav se separate · ' + gCount + ' products · 19 team to be added</p><div class="mini-parties">● 23 stock-register products live<br>● Parties: multiple (to be added)<br>● Gaurav Singh ko report nahi karta</div></a></div>' +
    '</div></div>' +
    '<div class="grid cards-2" style="margin-top:16px"><div class="card"><h3>How field visits work</h3><p style="color:var(--muted)">Both Business Managers visit the field. Deepak Gupta accompanies Jeet or Vinay depending on the visit. Gaurav Singh (RBM Ethical) supervises Ethical business. Manish Verma (RBM Generic, alag chain) handles Generic. Orders attach to the respective BM/RBM.</p></div>' +
    '<div class="card"><h3>Generic chain (live, alag)</h3><div style="margin-top:8px">Manish Verma — RBM Generic (alag chain) · 23 products live · 19 team to be added</div><div class="btn-row"><a class="btn small" href="#/team/manish-verma">View Manish →</a><a class="btn small" href="#/divisions/generic">Generic →</a></div></div></div>';
  }

  /* ---------------- Areas ---------------- */
  function viewAreas() {
    const ui = UI(), d = D();
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Areas' }]) +
    '<p class="eyebrow">2 areas · extensible</p><h1 class="page-title">Areas</h1><p class="page-sub">Each area links Business Manager, parties and (future) product/order mapping. More areas can be added later.</p>' +
    '<div class="grid cards-2">' + d.areas.map(a => {
      const bm = d.employees.find(e => e.id === a.businessManagerId);
      const parties = a.partyIds.map(pid => d.parties.find(p => p.id === pid)).filter(Boolean);
      return '<div class="card hover"><h3><a href="#/areas/' + a.id + '">' + ui.esc(a.name) + '</a></h3>' +
        '<p style="color:var(--muted);font-size:14px">Business Manager: ' + (bm ? '<a href="#/team/' + bm.id + '"><strong>' + ui.esc(bm.name) + '</strong></a>' : ui.tbd()) + '</p>' +
        '<ul class="party-list">' + parties.map(p => '<li><span class="dot"></span><a href="#/parties/' + p.id + '">' + ui.esc(p.name) + '</a></li>').join('') + '</ul>' +
        '<div class="btn-row"><a class="btn small" href="#/areas/' + a.id + '">Area details →</a></div></div>';
    }).join('') + '</div>';
  }
  function viewAreaDetail(id) {
    const ui = UI(), d = D();
    const a = d.areas.find(x => x.id === id);
    if (!a) return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Areas', href: '#/areas' }, { label: 'Not found' }]) + ui.emptyState('Area not found', 'See all areas.');
    const bm = d.employees.find(e => e.id === a.businessManagerId);
    const parties = a.partyIds.map(pid => d.parties.find(p => p.id === pid)).filter(Boolean);
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Areas', href: '#/areas' }, { label: a.name }]) +
    '<p class="eyebrow">Area · Ethical Division</p><h1 class="page-title">' + ui.esc(a.name) + '</h1>' +
    '<div class="detail-grid"><div class="card"><dl class="kv"><dt>Business Manager</dt><dd>' + (bm ? '<a href="#/team/' + bm.id + '">' + ui.esc(bm.name) + ' — ' + ui.esc(bm.designation) + '</a>' : ui.tbd()) + '</dd><dt>Parties</dt><dd>' + parties.map(p => '<a href="#/parties/' + p.id + '">' + ui.esc(p.name) + '</a>').join(', ') + '</dd><dt>Products</dt><dd>' + ui.tbd('To be mapped') + '</dd><dt>Orders</dt><dd>' + ui.tbd('Data to be updated') + '</dd></dl></div>' +
    '<div class="card"><h3>Parties in ' + ui.esc(a.name) + '</h3><ul class="party-list">' + parties.map(p => '<li><span class="dot"></span><a href="#/parties/' + p.id + '">' + ui.esc(p.name) + '</a></li>').join('') + '</ul><div class="btn-row"><a class="btn small" href="#/areas">← Areas</a><a class="btn small" href="#/products">Products →</a></div></div></div>';
  }

  /* ---------------- Parties ---------------- */
  function viewParties() {
    const ui = UI(), d = D();
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Parties' }]) +
    '<p class="eyebrow">4 parties · Ethical</p><h1 class="page-title">Parties</h1><p class="page-sub">Party → Business Manager → Area mapping. Each party has a detail page with future order fields.</p>' +
    '<div class="table-scroll"><table class="data"><thead><tr><th>Party</th><th>Business Manager</th><th>Area</th><th></th></tr></thead><tbody>' +
      d.parties.map(p => {
        const bm = d.employees.find(e => e.id === p.businessManagerId);
        const ar = d.areas.find(a => a.id === p.areaId);
        return '<tr><td><a class="prod-link" href="#/parties/' + p.id + '">' + ui.esc(p.name) + '</a></td><td>' + (bm ? '<a href="#/team/' + bm.id + '">' + ui.esc(bm.name) + '</a>' : ui.tbd()) + '</td><td>' + (ar ? '<a href="#/areas/' + ar.id + '">' + ui.esc(ar.name) + '</a>' : ui.tbd()) + '</td><td><a class="btn small" href="#/parties/' + p.id + '">Details</a></td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function viewPartyDetail(id) {
    const ui = UI(), d = D();
    const p = d.parties.find(x => x.id === id);
    if (!p) return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Parties', href: '#/parties' }, { label: 'Not found' }]) + ui.emptyState('Party not found', 'See all parties.');
    const bm = d.employees.find(e => e.id === p.businessManagerId);
    const ar = d.areas.find(a => a.id === p.areaId);
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Parties', href: '#/parties' }, { label: p.name }]) +
    '<p class="eyebrow">Party · Ethical Division</p><h1 class="page-title">' + ui.esc(p.name) + '</h1>' +
    '<div class="detail-grid"><div class="card"><dl class="kv">' +
      '<dt>Party name</dt><dd>' + ui.esc(p.name) + '</dd>' +
      '<dt>Business Manager</dt><dd>' + (bm ? '<a href="#/team/' + bm.id + '">' + ui.esc(bm.name) + '</a>' : ui.tbd()) + '</dd>' +
      '<dt>Area</dt><dd>' + (ar ? '<a href="#/areas/' + ar.id + '">' + ui.esc(ar.name) + '</a>' : ui.tbd()) + '</dd>' +
      '<dt>Orders</dt><dd>' + ui.tbd('Data to be updated') + '</dd>' +
      '<dt>Products</dt><dd>' + ui.tbd('Data to be updated') + '</dd>' +
      '<dt>Order date</dt><dd>' + ui.tbd('Data to be updated') + '</dd>' +
      '<dt>Order value</dt><dd>' + ui.tbd('Data to be updated') + '</dd>' +
      '<dt>Remarks</dt><dd>' + ui.tbd('Data to be updated') + '</dd></dl></div>' +
    '<div><div class="card"><h3>Trace chain</h3><div class="trace" style="margin-top:10px">Product → <strong>' + ui.esc(bm ? bm.name : '') + '</strong> → <strong>' + ui.esc(p.name) + '</strong> → <strong>' + ui.esc(ar ? ar.name : '') + '</strong></div>' +
    '<p style="color:var(--muted);font-size:14px">Orders for this party will associate with ' + ui.esc(bm ? bm.name : 'the BM') + '.</p></div>' +
    '<div class="card section-card"><h3>Navigate</h3><div class="btn-row"><a class="btn small" href="#/parties">← Parties</a>' + (bm ? '<a class="btn small" href="#/team/' + bm.id + '">BM profile →</a>' : '') + '</div></div></div></div>';
  }

  /* ---------------- Orders / visits / system ---------------- */
  function viewOrders() {
    const ui = UI(), ex = D().orderStructureExample;
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Orders & field visits' }]) +
    '<p class="eyebrow">Structure ready · no live orders</p><h1 class="page-title">Orders &amp; field visits</h1>' +
    '<p class="page-sub">Backend structure is designed so any future order maps as Order → Party → Business Manager → Area → Product → Division. No fake orders are created.</p>' +
    '<div class="grid cards-2"><div class="card"><h3>Mapping structure</h3><div class="trace" style="margin-top:12px"><strong>' + ui.esc(ex.label) + '</strong><br>Product: ' + ui.esc(ex.product) + '<br>Party: ' + ui.esc(ex.party) + '<br>Business Manager: ' + ui.esc(ex.businessManager) + '<br>Area: ' + ui.esc(ex.area) + '<br>Division: ' + ui.esc(ex.division) + '</div><p style="color:var(--muted);font-size:13.5px">Example only to illustrate relationships — not a live order.</p></div>' +
    '<div class="card"><h3>Field-visit logic</h3><ul style="color:var(--muted);margin:10px 0;padding-left:18px"><li>Jeet Singh — field, Bulandshahr (Madhu Medicose, Paliwal Drug)</li><li>Vinay Kumar — field, Hapur (Rama Chemist, Shiv Hari Drug)</li><li>Deepak Gupta — field with Jeet or Vinay</li><li>Gaurav Singh — regional supervision</li></ul><div class="notice amber">Tables <code>orders</code>, <code>order_items</code>, <code>field_visits</code> are in <a href="#/database">database/schema.sql</a> and ready to use.</div></div></div>' +
    ui.emptyState('No live orders yet', 'When orders arrive they will appear here with party, BM, area, product and division linkage.');
  }

  function viewDatabase() {
    const ui = UI();
    const tables = [
      ['divisions', 'Ethical (live, 13, RBM Gaurav alag) + Generic (live, 23, RBM Manish alag) + OTC (planned).'],
      ['products', '36 rows exact (13 Ethical revised v3 + 23 Generic). Both have expiry / closing_stock_qty / scheme. Ethical keeps salt/uses/ingredients; Generic salt/uses null. p05 rate revised 70.14→70.71.'],
      ['product_compositions', 'One-to-many ingredients per product. Ethical 13 filled; Generic uses flat composition text (no invention).'],
      ['employees', 'Gaurav (RBM Ethical, alag) + Deepak + Jeet + Vinay + Manish Verma (RBM Generic, alag, manages 23 products). 19 Generic team to be added.'],
      ['employee_hierarchy', 'manager_id → member_id closure for Gaurav→Deepak→Jeet/Vinay (+ future Manish→19).'],
      ['areas', 'Bulandshahr, Hapur (Ethical). Generic areas to be added.'],
      ['parties', '4 parties (Ethical) with business_manager_id + area_id. Generic parties to be added.'],
      ['business_manager_parties', 'Join for BM↔Party (supports many-to-many later).'],
      ['product_business_mapping', 'Generic: g01–g23 → Manish Verma (live). Ethical: to be mapped.'],
      ['orders / order_items', 'Order→Party→BM→Area→Product→Division. No fake rows.'],
      ['field_visits', 'Who accompanied whom, date, remarks. Empty now.']
    ];
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Database & admin' }]) +
    '<p class="eyebrow">Normalized · scalable</p><h1 class="page-title">Database architecture</h1>' +
    '<p class="page-sub">Clean relational design. No duplication. Generic (23) live via <code>division_id=generic</code> + Manish Verma ownership. Full DDL in <code>database/schema.sql</code>.</p>' +
    '<div class="table-scroll"><table class="data"><thead><tr><th>Table</th><th> purpose</th></tr></thead><tbody>' +
      tables.map(t => '<tr><td class="mono"><strong>' + t[0] + '</strong></td><td>' + ui.esc(t[1]) + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<div class="grid cards-2" style="margin-top:16px"><div class="card"><h3>Admin (next phase)</h3><ul style="color:var(--muted);margin:10px 0;padding-left:18px;font-size:14px"><li>Add / Edit / Delete Products, Employees, Divisions, Areas, Parties</li><li>Map Products → BMs, BMs → Parties</li><li>Add Orders + Field Visits; update Salt / Composition / Uses</li></ul><div class="btn-row"><a class="btn small" href="#/admin">Admin plan →</a></div></div>' +
    '<div class="card"><h3>Files</h3><p style="color:var(--muted);font-size:14px"><code>assets/js/data.js</code> — front-end source of truth<br><code>database/schema.sql</code> — MySQL 8 DDL + Ethical seeds<br><code>config/</code> — site constants (extensible)</p><div class="btn-row"><a class="btn small" href="database/schema.sql" download>Download schema.sql</a></div></div></div>';
  }

  function viewAdmin() {
    const ui = UI();
    return ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Admin plan' }]) +
    '<p class="eyebrow">Prepared · not overbuilt</p><h1 class="page-title">Admin panel — plan</h1>' +
    '<p class="page-sub">Architecture prepared. Current version keeps admin minimal to avoid unnecessary complexity; data.js + schema.sql are the admin-ready contracts.</p>' +
    '<div class="grid cards-3">' +
      '<div class="card"><h3>Catalog</h3><p style="color:var(--muted)">Products, compositions, salt, uses, divisions.</p><div style="margin-top:8px">' + ui.tbd('Phase 2') + '</div></div>' +
      '<div class="card"><h3>Network</h3><p style="color:var(--muted)">Employees, hierarchy, areas, parties, BM↔Party + Product↔BM mapping.</p><div style="margin-top:8px">' + ui.tbd('Phase 2') + '</div></div>' +
      '<div class="card"><h3>Transactions</h3><p style="color:var(--muted)">Orders, order items, field visits, remarks.</p><div style="margin-top:8px">' + ui.tbd('Phase 2') + '</div></div>' +
    '</div>';
  }

  window.LABOKEM.Views = { viewDashboard, viewDivisions, viewDivisionDetail, viewProducts, filteredProducts, productFilterState, viewProductDetail, viewTeam, viewTeamDetail, viewOrgChart, viewAreas, viewAreaDetail, viewParties, viewPartyDetail, viewOrders, viewDatabase, viewAdmin };
})();
