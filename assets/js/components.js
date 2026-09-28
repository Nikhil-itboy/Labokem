/* Labokem — reusable UI helpers (no fake data) */
'use strict';
window.LABOKEM = window.LABOKEM || {};

(function () {
  const D = () => window.LABOKEM.DATA;

  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function inr(n) {
    if (n === null || n === undefined) return 'Details to be updated';
    try {
      return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) { return '₹' + n; }
  }

  function tbd(short) {
    return '<span class="tbd">' + esc(short || 'Details to be updated') + '</span>';
  }
  function toBeMapped() {
    return '<span class="tbd">To be mapped</span>';
  }

  function crumbs(items) {
    // items: [{label, href?}]
    const html = items.map((it, i) => {
      const last = i === items.length - 1;
      const inner = it.href && !last
        ? '<a href="' + esc(it.href) + '">' + esc(it.label) + '</a>'
        : '<strong>' + esc(it.label) + '</strong>';
      return inner + (last ? '' : '<span class="sep">›</span>');
    }).join('');
    return '<nav class="breadcrumb" aria-label="Breadcrumb">' + html + '</nav>';
  }

  function divisionById(id) { return D().divisions.find(d => d.id === id); }
  function employeeById(id) { return D().employees.find(e => e.id === id); }
  function areaById(id) { return D().areas.find(a => a.id === id); }
  function partyById(id) { return D().parties.find(p => p.id === id); }
  function productBySlug(slug) { return D().products.find(p => p.slug === slug); }

  function pill(status) {
    if (status === 'live') return '<span class="pill live">● Live</span>';
    return '<span class="pill planned">○ Planned</span>';
  }

  function personCard(emp) {
    if (!emp) return '';
    const area = emp.areaId ? areaById(emp.areaId) : null;
    const parties = (emp.partyIds || []).map(partyById).filter(Boolean);
    const avatarCls = emp.id === 'gaurav-singh' ? '' : emp.id === 'deepak-gupta' ? 'blue' : emp.id === 'jeet-singh' ? 'teal' : emp.id === 'manish-verma' ? 'blue' : 'slate';
    if (emp.id === 'manish-verma') {
      const gCount = (emp.managesProductIds || D().products.filter(p => p.divisionId === 'generic').map(p => p.id)).length;
      return '' +
      '<a class="card hover" href="#/team/' + esc(emp.id) + '" style="display:block" aria-label="View ' + esc(emp.name) + '">' +
        '<div class="person">' +
          '<div class="avatar blue">' + esc(emp.initials || 'MV') + '</div>' +
          '<div><h3>' + esc(emp.name) + ' <span class="badge-div">Generic</span></h3><div class="role">' + esc(emp.designation) + '</div><div class="sub">' + esc(emp.shortRole || '') + '</div></div>' +
        '</div>' +
        '<div style="margin-top:12px;font-size:13.5px;color:var(--muted)">' +
          '<div>Manages: <strong style="color:var(--text)">' + gCount + ' Generic products</strong></div>' +
          '<div style="margin-top:4px">' + esc(emp.areaNote || '') + '</div>' +
          '<div style="margin-top:8px">' + tbd('19 team + parties: to be added') + '</div>' +
        '</div>' +
        '<div class="btn-row"><span class="btn small">View profile →</span></div>' +
      '</a>';
    }
    return '' +
      '<a class="card hover" href="#/team/' + esc(emp.id) + '" style="display:block" aria-label="View ' + esc(emp.name) + '">' +
        '<div class="person">' +
          '<div class="avatar ' + avatarCls + '">' + esc(emp.initials) + '</div>' +
          '<div>' +
            '<h3>' + esc(emp.name) + '</h3>' +
            '<div class="role">' + esc(emp.designation) + '</div>' +
            '<div class="sub">' + esc(emp.shortRole || '') + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:12px;font-size:13.5px;color:var(--muted)">' +
          (area ? '<div>Area: <strong style="color:var(--text)">' + esc(area.name) + '</strong></div>'
                : '<div>Area: ' + (emp.areaNote ? esc(emp.areaNote) : tbd('Data to be updated')) + '</div>') +
          (parties.length
            ? '<ul class="party-list">' + parties.map(p => '<li><span class="dot"></span>' + esc(p.name) + '</li>').join('') + '</ul>'
            : (emp.placeholder ? '<div style="margin-top:8px">' + tbd('Team to be added') + '</div>' : '')) +
        '</div>' +
        '<div class="btn-row"><span class="btn small">View profile →</span></div>' +
      '</a>';
  }

  function emptyState(title, sub, extra) {
    return '<div class="empty"><h3>' + esc(title) + '</h3><p style="margin:0">' + esc(sub) + '</p>' + (extra || '') + '</div>';
  }

  window.LABOKEM.UI = { esc, inr, tbd, toBeMapped, crumbs, divisionById, employeeById, areaById, partyById, productBySlug, pill, personCard, emptyState };
})();
