// /body page: draws training charts and tables from /data/lifting.json (written by
// scripts/sync_hevy.py). Plain SVG, no libraries. Every name from the data is set with
// textContent, never as HTML.
(function () {
  'use strict';

  const page = document.getElementById('body-page');
  if (!page) return;

  /* ---------- tiny DOM helpers ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs = {}) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  const el = (tag, attrs = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'class') e.className = attrs[k];
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    e.append(...kids.filter((k) => k !== null && k !== undefined && k !== false));
    return e;
  };

  /* ---------- dates: data dates are local YYYY-MM-DD strings ---------- */
  const parseDay = (s) => new Date(s + 'T12:00:00');
  const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const fmtDateLong = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const ago = (d) => {
    const n = Math.round((today - d) / 864e5);
    return n <= 0 ? 'today' : n === 1 ? 'yesterday' : `${n}d ago`;
  };

  /* ---------- how each measure reads ---------- */
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  const MEASURES = {
    e1rm: { label: 'Estimated 1RM', value: (v) => `${Math.round(v)} lb`, tick: (v) => Math.round(v), unit: 'lb', detail: (s) => `${s.weight} lb × ${s.reps}` },
    best_set: { label: 'Best set', value: (v, s) => `${Math.round(v)} lb${s && s.reps ? ` × ${s.reps}` : ''}`, tick: (v) => Math.round(v), unit: 'lb' },
    reps: { label: 'Best reps', value: (v, s) => `${v} reps${s && s.weight ? ` (+${s.weight} lb)` : ''}`, tick: (v) => v, unit: 'reps' },
    assisted_reps: { label: 'Best reps, assisted', value: (v, s) => `${v} reps${s && s.weight ? ` (−${s.weight} lb)` : ''}`, tick: (v) => v, unit: 'reps' },
    time: { label: 'Longest', value: (v) => mmss(v), tick: (v) => mmss(v), unit: '' },
    distance: { label: 'Longest distance', value: (v) => `${(v / 1609.34).toFixed(2)} mi`, tick: (v) => (v / 1609.34).toFixed(1), unit: 'mi' },
    carry: { label: 'Heaviest carry', value: (v) => `${Math.round(v)} lb`, tick: (v) => Math.round(v), unit: 'lb' },
  };
  const measureOf = (ex) => MEASURES[ex.measure] || MEASURES.best_set;
  const changeText = (ex, delta) => {
    const r = Math.round(delta);
    if (r === 0) return 'no change';
    const abs = Math.abs(r);
    const unit = ex.measure === 'time' ? 's' : ex.measure === 'distance' ? ' m' : ex.measure.endsWith('reps') ? ' reps' : ' lb';
    return `${r > 0 ? '↑' : '↓'} ${abs}${unit}`;
  };
  const compact = (v) => (v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K' : String(Math.round(v)));
  const niceTicks = (lo, hi, n = 3) => {
    const span = hi - lo || 1;
    const step0 = span / n;
    const mag = 10 ** Math.floor(Math.log10(step0));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0);
    const ticks = [];
    for (let t = Math.floor(lo / step) * step; t <= hi + step * 0.5; t += step) ticks.push(+t.toFixed(6));
    return ticks;
  };

  const GROUP_ORDER = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Other'];
  const RANGES = [[30, '30D'], [90, '90D'], [182, '6M'], [0, 'All']];
  const MIN_TREND = 4; // sessions before an exercise gets a trend line or change
  let data = null;
  let range = 90;
  const openGroups = new Set();
  let pinned = [];
  try {
    pinned = JSON.parse(page.dataset.pinned || '[]');
  } catch (e) {
    pinned = [];
  }

  const rangeStart = () => {
    if (!range) return data.coverage.first_date ? parseDay(data.coverage.first_date) : today;
    const d = new Date(today);
    d.setDate(d.getDate() - (range - 1));
    return d;
  };

  /* ---------- sparkline: gray line, latest point in the accent ---------- */
  function sparkline(values, w = 180, h = 30) {
    const lo = Math.min(...values), hi = Math.max(...values);
    const x = (i) => (i / (values.length - 1)) * (w - 6) + 3;
    const y = (v) => h - 4 - ((v - lo) / (hi - lo || 1)) * (h - 8);
    const s = svgEl('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}`, 'aria-hidden': 'true', class: 'bp-spark' });
    s.append(svgEl('path', { d: values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(''), class: 'bp-line-daily' }));
    s.append(svgEl('circle', { cx: x(values.length - 1), cy: y(values[values.length - 1]), r: 4, class: 'bp-dot-accent' }));
    return s;
  }

  /* ---------- line chart with PR dots and a crosshair tooltip ---------- */
  function lineChart(host, ex, points) {
    const M = measureOf(ex);
    const W = host.clientWidth || 440, H = 150, P = { t: 10, r: 8, b: 22, l: 40 };
    const vals = points.map((p) => p.value);
    let lo = Math.min(...vals), hi = Math.max(...vals);
    const pad = (hi - lo) * 0.15 || Math.max(1, hi * 0.05);
    const ticks = niceTicks(lo - pad, hi + pad, 3);
    lo = ticks[0];
    hi = ticks[ticks.length - 1];
    const t0 = parseDay(points[0].date).getTime(), t1 = parseDay(points[points.length - 1].date).getTime();
    const x = (p) => P.l + ((parseDay(p.date).getTime() - t0) / (t1 - t0 || 1)) * (W - P.l - P.r);
    const y = (v) => P.t + (1 - (v - lo) / (hi - lo || 1)) * (H - P.t - P.b);

    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, height: H, tabindex: 0, role: 'img', class: 'bp-chart' });
    svg.setAttribute('aria-label', `${ex.title}: ${M.label}, ${points.length} sessions from ${fmtDate(parseDay(points[0].date))} to ${fmtDate(parseDay(points[points.length - 1].date))}. Use arrow keys to read values.`);
    ticks.forEach((t) => {
      svg.append(svgEl('line', { x1: P.l, x2: W - P.r, y1: y(t), y2: y(t), class: 'bp-grid' }));
      const tx = svgEl('text', { x: P.l - 8, y: y(t) + 4, 'text-anchor': 'end', class: 'bp-tick' });
      tx.textContent = M.tick(t);
      svg.append(tx);
    });
    [[points[0], 'start'], [points[points.length - 1], 'end']].forEach(([p, anchor]) => {
      const tx = svgEl('text', { x: x(p), y: H - 4, 'text-anchor': anchor, class: 'bp-tick' });
      tx.textContent = fmtDate(parseDay(p.date));
      svg.append(tx);
    });
    svg.append(svgEl('path', { d: points.map((p, i) => `${i ? 'L' : 'M'}${x(p).toFixed(1)},${y(p.value).toFixed(1)}`).join(''), class: 'bp-line-main' }));
    let best = -Infinity;
    points.forEach((p) => {
      if (p.value > best) {
        best = p.value;
        svg.append(svgEl('circle', { cx: x(p), cy: y(p.value), r: 4.5, class: 'bp-dot-accent' }));
      } else {
        svg.append(svgEl('circle', { cx: x(p), cy: y(p.value), r: 3, class: 'bp-dot-main' }));
      }
    });

    const cross = svgEl('line', { y1: P.t, y2: H - P.b, class: 'bp-cross', opacity: 0 });
    svg.append(cross);
    const tip = el('div', { class: 'bp-tip', role: 'status' });
    host.append(svg, tip);
    let idx = points.length - 1;
    function show(i) {
      idx = Math.max(0, Math.min(points.length - 1, i));
      const p = points[idx], cx = x(p);
      cross.setAttribute('x1', cx);
      cross.setAttribute('x2', cx);
      cross.setAttribute('opacity', 1);
      const pr = points.slice(0, idx).every((q) => q.value < p.value);
      tip.replaceChildren(
        el('div', { class: 'bp-tip-date', text: fmtDateLong(parseDay(p.date)) }),
        el('div', { class: 'bp-tip-row' }, el('span', { text: pr ? `${M.label} · record` : M.label }), el('strong', { text: M.value(p.value, p) })),
        M.detail && p.reps ? el('div', { class: 'bp-tip-row' }, el('span', { text: 'From' }), el('strong', { text: M.detail(p) })) : null,
      );
      tip.classList.add('on');
      const px = (cx / W) * host.clientWidth;
      tip.style.left = Math.min(Math.max(px - 80, 0), host.clientWidth - 170) + 'px';
    }
    const hide = () => {
      cross.setAttribute('opacity', 0);
      tip.classList.remove('on');
    };
    svg.addEventListener('pointermove', (e) => {
      const r = svg.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * W;
      let nearest = 0;
      points.forEach((p, i) => {
        if (Math.abs(x(p) - px) < Math.abs(x(points[nearest]) - px)) nearest = i;
      });
      show(nearest);
    });
    svg.addEventListener('pointerleave', hide);
    svg.addEventListener('focus', () => show(idx));
    svg.addEventListener('blur', hide);
    svg.addEventListener('keydown', (e) => {
      const keys = { ArrowLeft: idx - 1, ArrowRight: idx + 1, Home: 0, End: points.length - 1 };
      if (e.key in keys) {
        show(keys[e.key]);
        e.preventDefault();
      } else if (e.key === 'Escape') hide();
    });
  }

  /* ---------- calendar heatmap: one hue, more volume = stronger ---------- */
  function heatmap(host, start, byDay) {
    const offset = start.getDay();
    const dates = [];
    for (const d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) dates.push(new Date(d));
    const weeks = Math.ceil((dates.length + offset) / 7);
    const cell = weeks <= 8 ? 20 : weeks <= 16 ? 16 : 12, gap = weeks <= 16 ? 3 : 2;
    const vols = dates.map((d) => (byDay[dayKey(d)] || {}).volume_lb || 0).filter(Boolean).sort((a, b) => a - b);
    const q = [0.2, 0.4, 0.6, 0.8].map((p) => vols[Math.floor(p * (vols.length - 1))] || 0);
    const bin = (v) => (v ? 1 + q.filter((t) => v > t).length : 0);
    const W = 30 + weeks * (cell + gap), H = 18 + 7 * (cell + gap);
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', class: 'bp-heat', style: `width:${W}px;max-width:100%` });
    svg.setAttribute('aria-label', `Training calendar from ${fmtDate(start)}: ${vols.length} training days. Darker means more volume.`);
    ['Mon', 'Wed', 'Fri'].forEach((d, k) => {
      const t = svgEl('text', { x: 0, y: 18 + (1 + 2 * k) * (cell + gap) + cell * 0.75, class: 'bp-tick' });
      t.textContent = d;
      svg.append(t);
    });
    const tip = el('div', { class: 'bp-tip', role: 'status' });
    let lastMonth = -1;
    dates.forEach((d, i) => {
      const k = i + offset, wk = Math.floor(k / 7), dow = k % 7;
      const cx = 30 + wk * (cell + gap), cy = 18 + dow * (cell + gap);
      if (d.getMonth() !== lastMonth && (dow === 0 || i === 0)) {
        lastMonth = d.getMonth();
        const t = svgEl('text', { x: cx, y: 10, class: 'bp-tick' });
        t.textContent = d.toLocaleDateString('en-US', { month: 'short' });
        svg.append(t);
      }
      const day = byDay[dayKey(d)];
      const rect = svgEl('rect', { x: cx, y: cy, width: cell, height: cell, rx: cell > 12 ? 3 : 2, class: `bp-heat-${bin(day ? day.volume_lb : 0)}` });
      rect.addEventListener('pointerenter', () => {
        tip.replaceChildren(
          el('div', { class: 'bp-tip-date', text: fmtDateLong(d) }),
          day
            ? el('div', {}, el('div', { class: 'bp-tip-row' }, el('span', { text: 'Volume' }), el('strong', { text: `${day.volume_lb.toLocaleString('en-US')} lb` })), el('div', { class: 'bp-tip-row' }, el('span', { text: 'Working sets' }), el('strong', { text: String(day.working_sets) })), el('div', { class: 'bp-tip-row' }, el('span', { text: 'Minutes' }), el('strong', { text: String(day.minutes) })))
            : el('div', { class: 'bp-tip-row' }, el('span', { text: 'Rest day' })),
        );
        tip.classList.add('on');
        tip.style.left = Math.max(0, Math.min(cx - 60, host.clientWidth - 170)) + 'px';
        tip.style.top = cy - 70 + 'px';
        rect.classList.add('on');
      });
      rect.addEventListener('pointerleave', () => {
        tip.classList.remove('on');
        rect.classList.remove('on');
      });
      svg.append(rect);
    });
    host.append(svg, tip, el('div', { class: 'bp-heat-legend' }, el('span', { text: 'Less' }), ...[0, 1, 2, 3, 4, 5].map((b) => el('i', { class: `bp-heat-${b}` })), el('span', { text: 'More volume' })));
  }

  /* ---------- horizontal bars: one series, one color, value at the tip ---------- */
  function bars(host, items) {
    const max = Math.max(...items.map((d) => d.value)), W = host.clientWidth || 440, row = 30, labelW = 92, H = items.length * row;
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, height: H, role: 'img', class: 'bp-bars' });
    svg.setAttribute('aria-label', 'Working sets by muscle group: ' + items.map((d) => `${d.label} ${d.value}`).join(', '));
    items.forEach((d, i) => {
      const y0 = i * row, w = Math.max(6, (d.value / max) * (W - labelW - 50));
      const t = svgEl('text', { x: 0, y: y0 + 18, class: 'bp-bar-label' });
      t.textContent = d.label;
      svg.append(t);
      svg.append(svgEl('path', { d: `M${labelW},${y0 + 6}h${w - 4}a4,4 0 0 1 4,4v6a4,4 0 0 1 -4,4h-${w - 4}z`, class: 'bp-bar' }));
      const v = svgEl('text', { x: labelW + w + 8, y: y0 + 18, class: 'bp-bar-value' });
      v.textContent = String(d.value);
      svg.append(v);
    });
    host.append(svg);
  }

  /* ---------- sections ---------- */
  // The theme already prefixes h2 with a red "## ", like headings in posts.
  const h2 = (title, sub) => [el('h2', { class: 'bp-h2', text: title }), ...(sub ? [el('p', { class: 'bp-sub', text: sub })] : [])];

  function filterRow() {
    const seg = el('div', { class: 'bp-seg', role: 'group', 'aria-label': 'Date range' });
    RANGES.forEach(([n, label]) => {
      seg.append(el('button', { type: 'button', 'aria-pressed': String(n === range), text: label, onclick: () => { range = n; render(); } }));
    });
    return el('div', { class: 'bp-filters' }, seg);
  }

  function statusLine() {
    const last = data.coverage.last_date ? parseDay(data.coverage.last_date) : null;
    return el('div', { class: 'bp-status' }, el('span', { class: 'bp-status-dot', 'aria-hidden': 'true' }),
      el('span', { text: last ? `Last workout ${fmtDate(last)} · ${data.coverage.workouts} logged since ${fmtDate(parseDay(data.coverage.first_date))} · from Hevy, refreshed nightly` : 'No workouts logged yet' }));
  }

  function inRange(sessions) {
    const from = dayKey(rangeStart());
    return sessions.filter((s) => s.date >= from);
  }

  // Pinned titles from config.toml, else the 4 most-trained (most recent breaks ties).
  function pickFeatured(exs) {
    if (pinned.length) return pinned.map((t) => exs.find((e) => e.ex.title === t)).filter(Boolean);
    const lastDate = (r) => r.points[r.points.length - 1].date;
    return exs.slice().sort((a, b) => b.points.length - a.points.length || lastDate(b).localeCompare(lastDate(a))).slice(0, 4);
  }

  // Builds the cards; the line charts are drawn later, once the cards have a width.
  function featured(exs) {
    const chosen = pickFeatured(exs);
    const grid = el('div', { class: 'bp-grid2' });
    const pending = [];
    chosen.forEach(({ ex, points }) => {
      const M = measureOf(ex);
      const bestP = points.reduce((a, p) => (p.value > a.value ? p : a));
      const card = el('div', { class: 'bp-card' }, el('h3', { text: ex.title }), el('div', { class: 'bp-meta', text: `${M.label} · best ${M.value(bestP.value, bestP)} · ${points.length} session${points.length === 1 ? '' : 's'}` }));
      grid.append(card);
      if (points.length >= MIN_TREND) {
        pending.push(() => lineChart(card, ex, points));
        return;
      }
      // Too few sessions for an honest line: show the latest number and the change so far.
      const latest = points[points.length - 1], firstP = points[0], delta = latest.value - firstP.value;
      const change = points.length > 1
        ? el('div', { class: 'bp-change' },
            el('span', { class: Math.round(delta) === 0 ? 'bp-muted' : delta > 0 ? 'bp-good' : 'bp-bad', text: changeText(ex, delta) }),
            document.createTextNode(` since ${fmtDate(parseDay(firstP.date))} (${M.value(firstP.value, firstP)})`))
        : el('div', { class: 'bp-change bp-muted', text: `Logged once, ${fmtDate(parseDay(latest.date))}` });
      const dots = el('div', { class: 'bp-progress', title: `Trend chart after ${MIN_TREND} sessions` },
        ...Array.from({ length: MIN_TREND }, (_, i) => el('i', { class: i < points.length ? 'done' : '' })),
        el('span', { text: `${points.length} of ${MIN_TREND} sessions for a trend chart` }));
      card.append(el('div', { class: 'bp-stat' }, el('div', { class: 'bp-big', text: M.value(latest.value, latest) }), change, dots));
    });
    return { grid, pending, chosen: new Set(chosen.map((c) => c.ex.id)), auto: !pinned.length };
  }

  function allLifts(exs, charted) {
    const tbl = el('table', { class: 'bp-log' }, el('thead', {}, el('tr', {}, ...['Exercise', 'Best', 'Last done', 'Change', 'Sessions', 'Trend'].map((h) => el('th', { scope: 'col', text: h })))));
    const body = el('tbody');
    tbl.append(body);
    GROUP_ORDER.forEach((g) => {
      const rows = exs.filter((r) => r.ex.group === g);
      if (!rows.length) return;
      const sessions = rows.reduce((a, r) => a + r.points.length, 0);
      body.append(el('tr', { class: 'bp-group' }, el('td', { colspan: 6 }, el('strong', { text: g }), el('span', { text: `${rows.length} exercise${rows.length === 1 ? '' : 's'} · ${sessions} session${sessions === 1 ? '' : 's'}` }))));
      const LIMIT = 3, open = openGroups.has(g);
      rows.forEach((r, k) => {
        if (k >= LIMIT && !open) return;
        const M = measureOf(r.ex), pts = r.points, enough = pts.length >= MIN_TREND;
        const bestP = pts.reduce((a, p) => (p.value > a.value ? p : a));
        const delta = pts[pts.length - 1].value - pts[0].value;
        const better = delta > 0; // every measure here is higher-is-better
        const spark = el('td', { class: 'bp-spark-cell' });
        if (enough) spark.append(sparkline(pts.map((p) => p.value)));
        else spark.append(el('span', { class: 'bp-muted', title: `Trend appears after ${MIN_TREND} sessions`, text: '–' }));
        const ch = enough ? changeText(r.ex, delta) : '–';
        body.append(el('tr', {},
          el('td', { class: 'bp-name' }, document.createTextNode(r.ex.title), charted.has(r.ex.id) ? el('span', { class: 'bp-tag', text: 'charted above' }) : null, el('span', { class: 'bp-kind', text: M.label })),
          el('td', { text: M.value(bestP.value, bestP) }),
          el('td', { class: 'bp-muted', text: ago(parseDay(pts[pts.length - 1].date)) }),
          el('td', { class: !enough || ch === 'no change' ? 'bp-muted' : better ? 'bp-good' : 'bp-bad', text: ch }),
          el('td', { text: String(pts.length) }),
          spark));
      });
      if (rows.length > LIMIT) {
        body.append(el('tr', { class: 'bp-more' }, el('td', { colspan: 6 }, el('button', {
          type: 'button', class: 'bp-linkbtn', 'aria-expanded': String(open),
          text: open ? 'Show fewer' : `Show ${rows.length - LIMIT} more ${g.toLowerCase()} exercises`,
          onclick: () => { open ? openGroups.delete(g) : openGroups.add(g); render(); },
        }))));
      }
    });
    return tbl;
  }

  // One row per training day, newest first: what each session looked like.
  function recentSessions(days) {
    const tbl = el('table', { class: 'bp-log bp-sessions' }, el('thead', {}, el('tr', {}, ...['Date', 'Duration', 'Working sets', 'Volume', 'Muscles'].map((h) => el('th', { scope: 'col', text: h })))));
    const body = el('tbody');
    tbl.append(body);
    days.slice().reverse().slice(0, 8).forEach((d) => {
      const muscles = Object.entries(d.groups).sort((a, b) => b[1] - a[1]).map(([g, n]) => `${g} ${n}`).join(' · ');
      body.append(el('tr', {},
        el('td', { class: 'bp-name', text: fmtDateLong(parseDay(d.date)) }),
        el('td', { text: d.minutes ? `${d.minutes} min` : '–' }),
        el('td', { text: String(d.working_sets) }),
        el('td', { text: d.volume_lb ? `${d.volume_lb.toLocaleString('en-US')} lb` : '–' }),
        el('td', { class: 'bp-muscles', text: muscles })));
    });
    return tbl;
  }

  function render() {
    page.querySelectorAll('.bp-generated').forEach((n) => n.remove());
    const root = el('div', { class: 'bp-generated' });
    page.append(root);
    const from = dayKey(rangeStart());
    const days = data.daily.filter((d) => d.date >= from);
    const byDay = Object.fromEntries(days.map((d) => [d.date, d]));
    const exs = data.exercises.map((ex) => ({ ex, points: inRange(ex.sessions) })).filter((r) => r.points.length);

    root.append(statusLine(), filterRow());
    // Recovery (Fitbit Air via Google Health) comes back once that sync exists; no placeholder.

    const f = featured(exs);
    root.append(...h2('Strength', f.auto ? 'My most-trained lifts in this range. Red dots are personal records.' : 'The lifts I care about most. Red dots are personal records.'));
    if (f.grid.childElementCount) root.append(f.grid);
    else root.append(el('p', { class: 'bp-placeholder', text: 'No lifts logged in this range.' }));

    if (days.length) root.append(...h2('Recent sessions', 'The latest workouts in this range, newest first.'), recentSessions(days));
    const sessions = days.reduce((a, d) => a + d.sessions, 0), sets = days.reduce((a, d) => a + d.working_sets, 0), volume = days.reduce((a, d) => a + d.volume_lb, 0);
    // Per-week rate counts only the days since I started logging, not the empty part of the range.
    const first = data.coverage.first_date ? parseDay(data.coverage.first_date) : today;
    const spanStart = first > rangeStart() ? first : rangeStart();
    const spanDays = Math.max(7, Math.round((today - spanStart) / 864e5) + 1);
    root.append(...h2('Consistency', 'Every training day, shaded by total volume. Hover a day for details.'),
      el('div', { class: 'bp-facts' },
        el('div', {}, el('strong', { text: String(sessions) }), 'Sessions'),
        el('div', {}, el('strong', { text: sets.toLocaleString('en-US') }), 'Working sets'),
        el('div', {}, el('strong', { text: `${compact(volume)} lb` }), 'Total volume'),
        el('div', {}, el('strong', { text: (sessions / (spanDays / 7)).toFixed(1) }), 'Sessions / week')));
    const heatHost = el('div', { class: 'bp-card' });
    root.append(heatHost);

    // While the log is young, start the calendar at the week of the first workout
    // instead of showing months of empty squares.
    const firstWeek = new Date(first);
    firstWeek.setDate(firstWeek.getDate() - firstWeek.getDay());
    const calStart = firstWeek > rangeStart() ? firstWeek : rangeStart();
    if (calStart > rangeStart()) heatHost.append(el('p', { class: 'bp-sub', text: `Starting the week of my first logged workout, ${fmtDate(first)}.` }));

    const groups = {};
    days.forEach((d) => Object.entries(d.groups).forEach(([g, n]) => (groups[g] = (groups[g] || 0) + n)));
    const items = GROUP_ORDER.filter((g) => groups[g]).map((g) => ({ label: g, value: groups[g] })).sort((a, b) => b.value - a.value);
    const barHost = el('div', { class: 'bp-card' });
    if (items.length) root.append(...h2('Where the sets go', 'Working sets by muscle group in this range, across every exercise.'), barHost);

    if (exs.length) root.append(...h2('All lifts', `Every exercise I did in this range, grouped by muscle. Change and trend appear once an exercise has ${MIN_TREND} or more sessions.`), allLifts(exs, f.chosen));

    root.append(el('details', { class: 'bp-method' }, el('summary', { text: 'How these numbers are calculated' }),
      el('ul', {}, ...Object.values(data.methodology || {}).map((t) => el('li', { text: t })))));

    // Everything is in the page now, so charts can measure their real width.
    f.pending.forEach((draw) => draw());
    heatmap(heatHost, calStart, byDay);
    if (items.length) bars(barHost, items);
  }

  fetch(page.dataset.liftingUrl, { cache: 'no-store', credentials: 'omit' })
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((json) => {
      data = json;
      render();
      let t;
      window.addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(render, 200);
      });
    })
    .catch(() => {
      page.append(el('p', { class: 'bp-placeholder', text: "Couldn't load the training data right now." }));
    });
})();
