/* Labokem — hash router + interactions (vanilla, fast, accessible) */
'use strict';
(function () {
  const V = () => window.LABOKEM.Views;
  const UI = () => window.LABOKEM.UI;

  const viewEl = () => document.getElementById('view');
  const modalBack = () => document.getElementById('modalBack');
  const modalBox = () => document.getElementById('modalBox');

  function parseHash() {
    const h = (location.hash || '#/').replace(/^#/, '');
    const parts = h.split('?')[0].split('/').filter(Boolean);
    const query = {};
    const qs = h.split('?')[1];
    if (qs) qs.split('&').forEach(kv => { const [k, v] = kv.split('='); query[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
    return { parts, query, raw: h };
  }

  function setActiveNav(routeKey) {
    document.querySelectorAll('.nav a').forEach(a => {
      const k = a.getAttribute('data-route');
      if (k === routeKey) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  function render() {
    const { parts } = parseHash();
    const v = V(), ui = UI();
    let html = '', navKey = 'dashboard';
    const p0 = parts[0] || '';

    try {
      if (p0 === '' || p0 === 'dashboard') { html = v.viewDashboard(); navKey = 'dashboard'; }
      else if (p0 === 'divisions' && !parts[1]) { html = v.viewDivisions(); navKey = 'divisions'; }
      else if (p0 === 'divisions' && parts[1]) { html = v.viewDivisionDetail(parts[1]); navKey = 'divisions'; }
      else if (p0 === 'products') { html = v.viewProducts(); navKey = 'products'; }
      else if (p0 === 'product' && parts[1]) { html = v.viewProductDetail(parts[1]); navKey = 'products'; }
      else if (p0 === 'team' && !parts[1]) { html = v.viewTeam(); navKey = 'team'; }
      else if (p0 === 'team' && parts[1]) { html = v.viewTeamDetail(parts[1]); navKey = 'team'; }
      else if (p0 === 'org-chart') { html = v.viewOrgChart(); navKey = 'org-chart'; }
      else if (p0 === 'areas' && !parts[1]) { html = v.viewAreas(); navKey = 'areas'; }
      else if (p0 === 'areas' && parts[1]) { html = v.viewAreaDetail(parts[1]); navKey = 'areas'; }
      else if (p0 === 'parties' && !parts[1]) { html = v.viewParties(); navKey = 'parties'; }
      else if (p0 === 'parties' && parts[1]) { html = v.viewPartyDetail(parts[1]); navKey = 'parties'; }
      else if (p0 === 'orders') { html = v.viewOrders(); navKey = 'orders'; }
      else if (p0 === 'database') { html = v.viewDatabase(); navKey = 'database'; }
      else if (p0 === 'admin') { html = v.viewAdmin(); navKey = 'admin'; }
      else { html = ui.crumbs([{ label: 'Home', href: '#/' }, { label: 'Not found' }]) + ui.emptyState('Page not found', 'Use the sidebar to navigate.'); navKey = 'dashboard'; }
    } catch (err) {
      html = ui.emptyState('Something went wrong rendering this page', String(err && err.message || err));
    }

    const el = viewEl();
    const wasFiltering = document.activeElement && document.activeElement.id === 'f-q';
    const caret = wasFiltering ? document.activeElement.selectionStart : null;
    el.innerHTML = '<div class="page">' + html + '</div>';
    setActiveNav(navKey);
    bindAfterRender();
    closeSidebarOnMobile();
    const isProductsRoute = (parseHash().parts[0] === 'products');
    if (!isProductsRoute) window.scrollTo({ top: 0, behavior: 'smooth' });
    // keep global search in sync (don't steal caret while typing)
    const gs = document.getElementById('globalSearch');
    if (gs && window.LABOKEM._pf && document.activeElement !== gs && gs.value !== (window.LABOKEM._pf.q || '')) gs.value = window.LABOKEM._pf.q || '';
    // restore product-filter focus after debounce re-render
    if (wasFiltering) {
      const nq = document.getElementById('f-q');
      if (nq) { nq.focus(); try { nq.setSelectionRange(caret, caret); } catch (e) {} }
    }
  }

  function bindAfterRender() {
    const st = window.LABOKEM.Views.productFilterState();
    const rerender = () => render();

    const q = document.getElementById('f-q');
    if (q) {
      q.addEventListener('input', () => { st.q = q.value; st.page = 1; debounceRender(); });
    }
    const bindSel = (id, key) => {
      const s = document.getElementById(id);
      if (s) s.addEventListener('change', () => { st[key] = s.value; st.page = 1; render(); });
    };
    bindSel('f-div', 'division'); bindSel('f-pack', 'packing'); bindSel('f-sort', 'sort');
    bindSel('f-bm', 'bm'); bindSel('f-party', 'party'); bindSel('f-area', 'area'); bindSel('f-salt', 'salt');

    const clear = document.getElementById('f-clear') || document.getElementById('f-clear2');
    if (clear) clear.addEventListener('click', () => {
      Object.assign(st, { q: '', division: 'all', packing: 'all', bm: 'all', party: 'all', area: 'all', salt: 'all', sort: 'default', page: 1 });
      render();
    });
    document.querySelectorAll('[data-divchip]').forEach(ch => ch.addEventListener('click', () => { st.division = ch.getAttribute('data-divchip'); st.page = 1; render(); }));
    const vt = document.getElementById('v-table'), vc = document.getElementById('v-cards');
    if (vt) vt.addEventListener('click', () => { st.view = 'table'; render(); });
    if (vc) vc.addEventListener('click', () => { st.view = 'cards'; render(); });
    document.querySelectorAll('[data-pg]').forEach(b => b.addEventListener('click', () => { st.page = parseInt(b.getAttribute('data-pg'), 10) || 1; render(); }));
    const prev = document.getElementById('pg-prev'), next = document.getElementById('pg-next');
    if (prev) prev.addEventListener('click', () => { if (st.page > 1) { st.page -= 1; render(); } });
    if (next) next.addEventListener('click', () => { st.page += 1; render(); });

    // quick-view buttons (event delegation already global, but bind here too for safety)
    document.querySelectorAll('[data-quick]').forEach(b => b.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      openQuick(b.getAttribute('data-quick'));
    }));
  }

  let debT = null;
  function debounceRender() {
    clearTimeout(debT);
    debT = setTimeout(render, 180);
  }

  function openQuick(slug) {
    const ui = UI();
    const p = ui.productBySlug(slug);
    if (!p) return;
    const isGen = p.divisionId === 'generic';
    const divLabel = isGen ? 'Generic' : p.divisionId === 'ethical' ? 'Ethical' : 'OTC';
    const usesVal = p.uses || p.advantages || null;
    const saltRow = p.salt ? ui.esc(p.salt) : (isGen ? ui.esc(p.composition || '') : ui.tbd('Details to be updated'));
    const compRow = (p.ingredients && p.ingredients.length)
      ? ui.esc(p.ingredients.length + ' ingredients — see full details')
      : (p.composition ? ui.esc(p.composition) : ui.tbd('Details to be updated'));
    const usesRow = usesVal ? ui.esc(usesVal) : (isGen ? '—' : ui.tbd('Details to be updated'));
    const D = window.LABOKEM.DATA;
    const head = p.bmId ? (D.employees.find(e => e.id === p.bmId) || {}).name : null;
    const stockRow = (p.expiry || p.closingStockQty != null || p.scheme) ? '<dt>Stock</dt><dd>' + ui.esc(p.expiry || '—') + ' · ' + (p.closingStockQty != null ? Number(p.closingStockQty).toLocaleString('en-IN') : '—') + (p.unit ? ' ' + ui.esc(p.unit) : '') + ' · Scheme ' + ui.esc(p.scheme || '--') + '</dd>' : '';
    modalBox().innerHTML =
      '<h3>' + ui.esc(p.name) + '</h3>' +
      '<p style="margin:0 0 12px;color:var(--muted)">' + divLabel + ' · ' + ui.esc(p.packing) + ' · <strong style="color:var(--text)">' + ui.inr(p.rate) + '</strong>' + (isGen ? ' · RBM Generic (alag): Manish Verma' : '') + '</p>' +
      '<dl class="kv"><dt>Salt / Comp.</dt><dd>' + saltRow + '</dd><dt>Composition</dt><dd>' + compRow + '</dd><dt>Uses</dt><dd>' + usesRow + '</dd>' + stockRow + '<dt>Mapping</dt><dd>' + (head ? ui.esc(head) : ui.toBeMapped()) + '</dd></dl>' +
      '<div class="btn-row"><a class="btn primary small" href="#/product/' + p.slug + '" id="modalGo">Full details →</a><button class="btn small" id="modalClose">Close</button></div>';
    modalBack().classList.add('open');
    const c = document.getElementById('modalClose');
    if (c) c.addEventListener('click', closeModal);
    const g = document.getElementById('modalGo');
    if (g) g.addEventListener('click', closeModal);
  }
  function closeModal() { modalBack().classList.remove('open'); }

  function closeSidebarOnMobile() {
    if (window.innerWidth <= 900) {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('scrim').classList.remove('show');
    }
  }

  function init() {
    // sidebar
    const btn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const scrim = document.getElementById('scrim');
    if (btn) btn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      scrim.classList.toggle('show', sidebar.classList.contains('open'));
    });
    if (scrim) scrim.addEventListener('click', () => { sidebar.classList.remove('open'); scrim.classList.remove('show'); });

    // modal backdrop close
    modalBack().addEventListener('click', (e) => { if (e.target === modalBack()) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // global delegation for quick buttons added later
    document.addEventListener('click', (e) => {
      const t = e.target.closest ? e.target.closest('[data-quick]') : null;
      if (t && !t.__bound) { /* handled per-render; fallback */ }
    });

    // topbar search -> products
    const gs = document.getElementById('globalSearch');
    if (gs) {
      gs.addEventListener('input', () => {
        const st = window.LABOKEM.Views.productFilterState();
        st.q = gs.value; st.page = 1;
        const { parts } = parseHash();
        if (parts[0] !== 'products') { location.hash = '#/products'; }
        else { debounceRender(); }
      });
    }

    window.addEventListener('hashchange', render);
    if (!location.hash) location.hash = '#/';
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
