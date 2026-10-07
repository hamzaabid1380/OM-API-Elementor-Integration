/* Wulf Elementor Kit: every widget's behavior. Widgets are found by data-wk and set up once,
   on page load and whenever Elementor (re)renders one in the editor. */
(function () {
	'use strict';

	var CFG = window.wkConfig || {};
	var T = CFG.i18n || {};
	var $ = function (s, r) { return (r || document).querySelector(s); };
	var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
	var f1 = function (v) { return Math.round(v * 10) / 10; };
	var P2 = function (a) { return a.map(function (p) { return f1(p[0]) + ',' + f1(p[1]); }).join(' '); };
	var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
	var fmt = function (s) { var a = Array.prototype.slice.call(arguments, 1), i = 0; return String(s || '').replace(/%(\d)\$[sd]|%[sd]/g, function (m, n) { return n ? a[n - 1] : a[i++]; }); };
	var icon = function (n, cls) { var d = (CFG.icons || {})[n]; return d ? '<svg viewBox="' + d[0] + '"' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true" focusable="false">' + d[1] + '</svg>' : ''; };
	var cfgOf = function (el) { try { return JSON.parse(el.getAttribute('data-wk-cfg') || '{}'); } catch (e) { return {}; } };
	var MCOL = { white: '14K white gold', yellow: '14K yellow gold', rose: '14K rose gold' };

	/* ================= Shapes & drawings ================= */
	var SH = {
		round: { n: 'Round', mm: [6.4, 6.4] }, oval: { n: 'Oval', mm: [5.7, 7.9] }, cushion: { n: 'Cushion', mm: [5.7, 6.0] }, emerald: { n: 'Emerald', mm: [5.0, 7.2], step: 1 },
		princess: { n: 'Princess', mm: [5.5, 5.5] }, pear: { n: 'Pear', mm: [5.4, 8.2] }, marquise: { n: 'Marquise', mm: [4.9, 9.9] }, radiant: { n: 'Radiant', mm: [5.4, 6.6] }
	};
	var N = 48, OUT = {}, UID = 0;
	function resample(pts, n) {
		var L = [0], i, k, j = 1, out = [];
		for (i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
		var tot = L[L.length - 1];
		for (k = 0; k < n; k++) {
			var d = k * tot / n;
			while (j < L.length - 1 && L[j] < d) j++;
			var t = (d - L[j - 1]) / ((L[j] - L[j - 1]) || 1);
			out.push([pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * t, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * t]);
		}
		return out;
	}
	function outline(s) {
		if (OUT[s]) return OUT[s];
		var P = [], i;
		if (s === 'princess' || s === 'emerald' || s === 'radiant') {
			var c = { princess: 0.035, emerald: 0.15, radiant: 0.11 }[s];
			P = resample([[0, -0.5], [0.5 - c, -0.5], [0.5, -0.5 + c], [0.5, 0.5 - c], [0.5 - c, 0.5], [-0.5 + c, 0.5], [-0.5, 0.5 - c], [-0.5, -0.5 + c], [-0.5 + c, -0.5], [0, -0.5]], N);
		} else {
			for (i = 0; i < N; i++) {
				var t = i * 2 * Math.PI / N, x, y;
				if (s === 'pear') { x = Math.sin(t) * Math.pow(Math.sin(t / 2), 1.1); y = -Math.cos(t); }
				else {
					var a = t - Math.PI / 2, co = Math.cos(a), sn = Math.sin(a);
					x = 0.5 * co; y = 0.5 * sn;
					if (s === 'cushion') { var e = 2 / 3.4; x = 0.5 * Math.sign(co) * Math.pow(Math.abs(co), e); y = 0.5 * Math.sign(sn) * Math.pow(Math.abs(sn), e); }
					if (s === 'marquise') x *= Math.pow(1 - Math.abs(sn), 0.5);
				}
				P.push([x, y]);
			}
			var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; });
			var cx = (Math.max.apply(0, xs) + Math.min.apply(0, xs)) / 2, cy = (Math.max.apply(0, ys) + Math.min.apply(0, ys)) / 2;
			var w = Math.max.apply(0, xs) - Math.min.apply(0, xs), h = Math.max.apply(0, ys) - Math.min.apply(0, ys);
			P = P.map(function (p) { return [(p[0] - cx) / w, (p[1] - cy) / h]; });
		}
		return (OUT[s] = P);
	}
	function prongIdx(s) {
		var P = outline(s), out = [];
		[[1, -1], [1, 1], [-1, 1], [-1, -1]].forEach(function (q) {
			var bi = 0, bv = -9;
			P.forEach(function (p, i) { var v = q[0] * p[0] + q[1] * p[1]; if (v > bv) { bv = v; bi = i; } });
			out.push(bi);
		});
		if (s === 'pear' || s === 'marquise') out.push(0);
		if (s === 'marquise') out.push(N / 2);
		return out.filter(function (v, i, a) { return a.indexOf(v) === i; });
	}
	function shapeIcon(s) {
		var w = SH[s].mm[0], l = SH[s].mm[1], k = 22 / Math.max(w, l), W = w * k, H = l * k;
		var P = outline(s).map(function (p) { return [16 + p[0] * W, 16 + p[1] * H]; });
		var Tt = outline(s).map(function (p) { return [16 + p[0] * W * 0.5, 16 + p[1] * H * 0.5]; });
		var lines = '';
		for (var i = 0; i < 8; i++) { var a = i * 6, b = (a + 3) % N; lines += 'M' + f1(Tt[a][0]) + ' ' + f1(Tt[a][1]) + 'L' + f1(P[b][0]) + ' ' + f1(P[b][1]); }
		return '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-linejoin="round"><polygon points="' + P2(P) + '" stroke-width="1.4"/><polygon points="' + P2(Tt) + '" stroke-width=".9" opacity=".75"/><path d="' + lines + '" stroke-width=".8" opacity=".6"/></svg>';
	}
	function sparkle(x, y, r, c) {
		c = c || '#fff';
		return '<path d="M' + f1(x) + ' ' + f1(y - r) + 'Q' + f1(x + r * 0.12) + ' ' + f1(y - r * 0.12) + ' ' + f1(x + r) + ' ' + f1(y) + 'Q' + f1(x + r * 0.12) + ' ' + f1(y + r * 0.12) + ' ' + f1(x) + ' ' + f1(y + r) + 'Q' + f1(x - r * 0.12) + ' ' + f1(y + r * 0.12) + ' ' + f1(x - r) + ' ' + f1(y) + 'Q' + f1(x - r * 0.12) + ' ' + f1(y - r * 0.12) + ' ' + f1(x) + ' ' + f1(y - r) + 'Z" fill="' + c + '"/>';
	}
	function gemFace(s, cx, cy, w, h, o) {
		o = o || {};
		var U = outline(s), P = U.map(function (p) { return [cx + p[0] * w, cy + p[1] * h]; });
		var sc = function (k) { return U.map(function (p) { return [cx + p[0] * w * k, cy + p[1] * h * k]; }); };
		var st = o.stroke || 'rgba(92,108,128,.5)', sw = o.sw || 0.7;
		var tri = function (a, b, c, fill) { return '<polygon points="' + P2([a, b, c]) + '" fill="' + fill + '" stroke="' + st + '" stroke-width="' + sw + '" stroke-linejoin="round"/>'; };
		var m = '';
		if (o.edge !== 0) m += '<polygon points="' + P2(P.map(function (p) { return [p[0], p[1] + (o.edge || 2.4)]; })) + '" fill="' + (o.edgeFill || '#8e9bab') + '"/>';
		m += '<polygon points="' + P2(P) + '" fill="url(#' + o.g + ')"/>';
		if (SH[s].step) {
			var r1 = sc(0.8), r2 = sc(0.6), r3 = sc(0.42);
			m += '<polygon points="' + P2(r1) + '" fill="rgba(120,140,160,.2)" stroke="' + st + '" stroke-width="' + sw + '"/><polygon points="' + P2(r2) + '" fill="rgba(255,255,255,.55)" stroke="' + st + '" stroke-width="' + sw + '"/><polygon points="' + P2(r3) + '" fill="rgba(160,178,198,.28)" stroke="' + st + '" stroke-width="' + sw + '"/>';
			prongIdx(s).forEach(function (i) { m += '<path d="M' + f1(P[i][0]) + ' ' + f1(P[i][1]) + 'L' + f1(r3[i][0]) + ' ' + f1(r3[i][1]) + '" stroke="' + st + '" stroke-width="' + sw + '"/>'; });
		} else {
			var T2 = sc(0.56), lt = 'rgba(255,255,255,.62)', dk = 'rgba(118,138,160,.3)', md = 'rgba(200,214,228,.35)';
			for (var k = 0; k < 8; k++) {
				var a = k * 6, b = (a + 6) % N, mi = a + 3, pr = (a - 3 + N) % N;
				m += tri(T2[a], T2[b], P[mi], k % 2 ? lt : md) + tri(T2[a], P[mi], P[a], k % 2 ? dk : lt) + tri(T2[a], P[a], P[pr], k % 2 ? md : dk);
			}
			m += '<polygon points="' + P2(T2) + '" fill="rgba(255,255,255,.3)" stroke="' + st + '" stroke-width="' + sw + '"/>';
		}
		if (o.tint) m += '<polygon points="' + P2(P) + '" fill="' + o.tint + '" style="mix-blend-mode:multiply"/>';
		if (o.spark) m += sparkle(cx - w * 0.16, cy - h * 0.18, Math.max(5, w * 0.09));
		return m;
	}
	var MET = { yellow: ['#fdf1c9', '#e9cb7b', '#c49b46', '#8b6a2b'], white: ['#ffffff', '#e3e7eb', '#aeb5be', '#6d747e'], rose: ['#fde6db', '#eab29a', '#c57e64', '#8a5141'] };
	function defs(id, metal) {
		var M = MET[metal] || MET.white;
		return '<linearGradient id="' + id + 'm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + M[0] + '"/><stop offset=".3" stop-color="' + M[1] + '"/><stop offset=".52" stop-color="' + M[3] + '"/><stop offset=".66" stop-color="' + M[1] + '"/><stop offset=".82" stop-color="' + M[0] + '"/><stop offset="1" stop-color="' + M[2] + '"/></linearGradient>' +
			'<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + M[2] + '"/><stop offset=".55" stop-color="' + M[3] + '"/><stop offset="1" stop-color="' + M[2] + '"/></linearGradient>' +
			'<linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#e8eef5"/><stop offset="1" stop-color="#bfcbd8"/></linearGradient>' +
			'<linearGradient id="' + id + 'p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2e9f1"/><stop offset="1" stop-color="#8f9fb1"/></linearGradient>' +
			'<filter id="' + id + 'f" x="-30%" y="-200%" width="160%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>';
	}
	function bandPath(cx, cy, rx, ry, t) {
		var e = function (a, b) { return 'M' + f1(cx - a) + ' ' + f1(cy) + 'a' + f1(a) + ' ' + f1(b) + ' 0 1 0 ' + f1(2 * a) + ' 0a' + f1(a) + ' ' + f1(b) + ' 0 1 0 ' + f1(-2 * a) + ' 0Z'; };
		return e(rx, ry) + e(rx - t, ry - t * 0.84);
	}
	function band(id, cx, cy, R, k, t, off, o) {
		o = o || {};
		var s = '<path d="' + bandPath(cx, cy - off, R, R * k, t) + '" fill="url(#' + id + 'b)" fill-rule="evenodd"/>';
		if (o.before) s += o.before;
		s += '<path d="' + bandPath(cx, cy, R, R * k, t) + '" fill="url(#' + id + 'm)" fill-rule="evenodd"/>';
		s += '<path d="M' + f1(cx - R + 3) + ' ' + f1(cy) + 'A' + f1(R - 3) + ' ' + f1((R - 3) * k) + ' 0 0 1 ' + f1(cx - (R - 3) * 0.5) + ' ' + f1(cy - (R - 3) * k * 0.866) + '" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/>';
		if (o.pave) {
			var rr = R - t / 2;
			for (var a = -168; a <= -12; a += 7.5) {
				if (o.gap && Math.abs(a + 90) < o.gap) continue;
				var x = cx + rr * Math.cos(a * Math.PI / 180), y = cy + rr * k * Math.sin(a * Math.PI / 180);
				s += '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="3.1" fill="url(#' + id + 'g)" stroke="' + MET[o.metal][3] + '" stroke-width=".7"/>';
			}
		}
		return s;
	}
	function ringSVG(o) {
		var id = 'wkr' + (++UID), cx = 200, cy = 222, R = 116, k = 0.84, t = 13, off = 13, M = MET[o.metal] || MET.white;
		var halo = o.setting === 'halo' || o.setting === 'vintage', pave = o.setting === 'pave' || o.setting === 'vintage';
		var top = cy - R * k, sh = SH[o.shape], fc = Math.cbrt(o.carat), w = sh.mm[0] * fc * 11, L = sh.mm[1] * fc * 11, h = L * 0.52;
		var ys = top - 28 - (halo ? 6 : 0) - h * 0.1, pav = w * 0.55;
		var U = outline(o.shape), out = U.map(function (p) { return [cx + p[0] * w, ys + p[1] * h]; }), pi = prongIdx(o.shape);
		var wire = function (p) { return '<path d="M' + f1(p[0]) + ' ' + f1(p[1]) + 'Q' + f1(p[0] + (cx - p[0]) * 0.15) + ' ' + f1((p[1] + top) / 2) + ' ' + f1(cx + (p[0] - cx) * 0.3) + ' ' + f1(top + 5) + '" stroke="url(#' + id + 'm)" stroke-width="4.4" stroke-linecap="round" fill="none"/>'; };
		var tip = function (p) { return '<ellipse cx="' + f1(cx + (p[0] - cx) * 0.94) + '" cy="' + f1(ys + (p[1] - ys) * 0.9) + '" rx="4.6" ry="3.7" fill="url(#' + id + 'm)" stroke="' + M[3] + '" stroke-width=".6"/>'; };
		var s = '<svg viewBox="0 0 400 350" role="img" aria-label="' + esc(o.label || 'Ring illustration') + '"><defs>' + defs(id, o.metal) + '</defs>';
		s += '<ellipse cx="' + cx + '" cy="' + f1(cy + R * k + 20) + '" rx="' + f1(R * 0.86) + '" ry="9" fill="rgba(20,30,45,.16)" filter="url(#' + id + 'f)"/>';
		var behind = '';
		pi.filter(function (i) { return out[i][1] < ys; }).forEach(function (i) { behind += wire(out[i]); });
		if (!o.noStone) behind += '<polygon points="' + f1(cx - w / 2) + ',' + f1(ys) + ' ' + f1(cx + w / 2) + ',' + f1(ys) + ' ' + cx + ',' + f1(ys + pav) + '" fill="url(#' + id + 'p)"/>';
		s += band(id, cx, cy, R, k, t, off, { before: behind, pave: pave, gap: 20, metal: o.metal });
		s += '<rect x="' + f1(cx - w * 0.3) + '" y="' + f1(ys + pav * 0.42) + '" width="' + f1(w * 0.6) + '" height="5" rx="2.5" fill="url(#' + id + 'm)"/>';
		pi.filter(function (i) { return out[i][1] >= ys; }).forEach(function (i) { s += wire(out[i]); });
		if (o.setting === 'three') {
			var sw2 = w * 0.6, sh2 = sw2 * 0.52;
			[-1, 1].forEach(function (dd) {
				var sx = cx + dd * (w / 2 + sw2 / 2 + 1), sy = ys + 7;
				s += '<polygon points="' + f1(sx - sw2 / 2) + ',' + f1(sy) + ' ' + f1(sx + sw2 / 2) + ',' + f1(sy) + ' ' + f1(sx) + ',' + f1(sy + sw2 * 0.5) + '" fill="url(#' + id + 'p)"/>';
				s += gemFace('round', sx, sy, sw2, sh2, { g: id + 'g' });
				var so = outline('round').map(function (p) { return [sx + p[0] * sw2, sy + p[1] * sh2]; });
				prongIdx('round').forEach(function (i) { var p = so[i]; s += '<ellipse cx="' + f1(sx + (p[0] - sx) * 0.92) + '" cy="' + f1(sy + (p[1] - sy) * 0.88) + '" rx="3.6" ry="2.9" fill="url(#' + id + 'm)" stroke="' + M[3] + '" stroke-width=".5"/>'; });
			});
		}
		if (halo) {
			var rw = w + 24, rh = h + 13;
			s += '<polygon points="' + P2(U.map(function (p) { return [cx + p[0] * rw, ys + 3 + p[1] * rh]; })) + '" fill="url(#' + id + 'b)"/>';
			s += '<polygon points="' + P2(U.map(function (p) { return [cx + p[0] * rw, ys + p[1] * rh]; })) + '" fill="url(#' + id + 'm)"/>';
			var ring = U.map(function (p) { return [cx + p[0] * (w + 13), ys + p[1] * (h + 7)]; }), per = 0;
			for (var i = 0; i < N; i++) per += Math.hypot(ring[(i + 1) % N][0] - ring[i][0], ring[(i + 1) % N][1] - ring[i][1]);
			resample(ring.concat([ring[0]]), Math.round(per / 7.2)).forEach(function (p) { s += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="3" fill="url(#' + id + 'g)" stroke="' + M[3] + '" stroke-width=".6"/>'; });
		}
		if (o.setting === 'hidden') {
			U.forEach(function (p, i) { if (i % 2 || p[1] < 0.05) return; s += '<circle cx="' + f1(cx + p[0] * w * 0.86) + '" cy="' + f1(ys + 8 + p[1] * h * 0.5) + '" r="2.6" fill="url(#' + id + 'g)" stroke="' + M[3] + '" stroke-width=".55"/>'; });
		}
		if (!o.noStone) s += gemFace(o.shape, cx, ys, w, h, { g: id + 'g', spark: 1 });
		pi.forEach(function (i) { s += tip(out[i]); });
		return s + '</svg>';
	}
	function ringSketch(o) {
		var cx = 200, cy = 222, R = 116, k = 0.84, t = 13, off = 13;
		var top = cy - R * k, sh = SH[o.shape], fc = Math.cbrt(o.carat), w = sh.mm[0] * fc * 11, L = sh.mm[1] * fc * 11, h = L * 0.52;
		var ys = top - 28 - h * 0.1, pav = w * 0.55;
		var U = outline(o.shape), out = U.map(function (p) { return [cx + p[0] * w, ys + p[1] * h]; }), pi = prongIdx(o.shape);
		var ri = R - t, rki = R * k - t * 0.84;
		var sk = function (i) { return ' class="sk" pathLength="1" style="--d:' + (i * 0.16).toFixed(2) + 's"'; };
		var s = '<svg viewBox="0 0 400 350" role="img" aria-label="' + esc(o.label || 'Design sketch of the ring') + '"><g fill="none" stroke-linecap="round" stroke-linejoin="round">';
		s += '<g stroke="#ddd6ca" stroke-width="1" stroke-dasharray="3 6"><path d="M' + cx + ' 24V336M48 ' + f1(cy) + 'H352"/><ellipse cx="' + cx + '" cy="' + f1(cy - off) + '" rx="' + R + '" ry="' + f1(R * k) + '"/><ellipse cx="' + cx + '" cy="' + f1(cy - off) + '" rx="' + ri + '" ry="' + f1(rki) + '"/></g>';
		s += '<g stroke="#8d877c" stroke-width="1.6">';
		s += '<ellipse' + sk(0) + ' cx="' + cx + '" cy="' + f1(cy) + '" rx="' + R + '" ry="' + f1(R * k) + '"/>';
		s += '<ellipse' + sk(1) + ' cx="' + cx + '" cy="' + f1(cy) + '" rx="' + ri + '" ry="' + f1(rki) + '"/>';
		pi.forEach(function (i, j) { var p = out[i]; s += '<path' + sk(2 + j * 0.4) + ' d="M' + f1(p[0]) + ' ' + f1(p[1]) + 'Q' + f1(p[0] + (cx - p[0]) * 0.15) + ' ' + f1((p[1] + top) / 2) + ' ' + f1(cx + (p[0] - cx) * 0.3) + ' ' + f1(top + 5) + '"/>'; });
		s += '<polygon' + sk(3.4) + ' points="' + P2(out) + '" stroke-width="1.9"/>';
		s += '<path' + sk(4) + ' d="M' + f1(cx - w / 2) + ' ' + f1(ys) + 'L' + cx + ' ' + f1(ys + pav) + 'L' + f1(cx + w / 2) + ' ' + f1(ys) + '"/>';
		s += '</g>';
		s += '<polygon points="' + P2(U.map(function (p) { return [cx + p[0] * w * 0.56, ys + p[1] * h * 0.56]; })) + '" stroke="#b5ad9f" stroke-width="1.1" stroke-dasharray="3 4"/>';
		var yT = ys - h / 2 - 16;
		s += '<g stroke="#b8955a" stroke-width="1.2"><path d="M' + f1(cx - w / 2) + ' ' + f1(yT) + 'H' + f1(cx + w / 2) + '"/><path d="M' + f1(cx - w / 2) + ' ' + f1(yT - 5) + 'v10M' + f1(cx + w / 2) + ' ' + f1(yT - 5) + 'v10"/></g>';
		s += '<text x="' + cx + '" y="' + f1(yT - 10) + '" text-anchor="middle" font-family="Manrope, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="#9a8a6a" stroke="none">' + (sh.mm[1] * fc).toFixed(1) + ' × ' + (sh.mm[0] * fc).toFixed(1) + ' MM</text>';
		return s + '</g></svg>';
	}
	function sideGem(cx, cy, W, o) {
		o = o || {};
		var id = 'wkg' + (++UID), d = (o.depth || 0.43) * W, ch = 0.16 * W;
		var t = [0, 1, 2, 3, 4].map(function (j) { return [cx + W * (-0.28 + j * 0.14), cy - ch]; });
		var g = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (j) { return [cx + W * (-0.5 + j * 0.125), cy]; });
		var C = [cx, cy + d], st = o.stroke || (o.dark ? 'rgba(255,255,255,.5)' : 'rgba(92,108,128,.55)');
		var fills = o.dark ? ['rgba(255,255,255,.22)', 'rgba(255,255,255,.06)', 'rgba(190,215,240,.16)'] : ['rgba(255,255,255,.7)', 'rgba(130,150,175,.28)', 'rgba(205,220,235,.5)'];
		var tri = function (a, b, c, i) { return '<polygon points="' + P2([a, b, c]) + '" fill="' + fills[i % 3] + '" stroke="' + st + '" stroke-width="' + (o.sw || 0.9) + '" stroke-linejoin="round"/>'; };
		var s = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + (o.dark ? '#5d6f88' : '#ffffff') + '"/><stop offset=".55" stop-color="' + (o.dark ? '#26324a' : '#dfe7f0') + '"/><stop offset="1" stop-color="' + (o.dark ? '#121a28' : '#a9b8c9') + '"/></linearGradient></defs>';
		s += '<polygon points="' + P2([t[0], t[4], g[8], C, g[0]]) + '" fill="url(#' + id + ')"/>';
		for (var j = 0; j < 4; j++) s += tri(t[j], g[2 * j], g[2 * j + 1], j) + tri(t[j], g[2 * j + 1], t[j + 1], j + 1) + tri(t[j + 1], g[2 * j + 1], g[2 * j + 2], j + 2);
		for (j = 0; j < 8; j++) s += tri(g[j], g[j + 1], C, j);
		s += '<path d="M' + f1(g[0][0]) + ' ' + f1(cy) + 'H' + f1(g[8][0]) + '" stroke="' + st + '" stroke-width="1.4"/>';
		return s;
	}

	var ART = {
		sketch: function () { return ringSketch({ shape: 'oval', carat: 1.5 }); },
		metal: function (el) { return ringSVG({ setting: 'solitaire', metal: el.dataset.metal || 'white', shape: 'oval', carat: 1.5, noStone: true, label: 'The setting in metal' }); },
		stone: function (el) { return ringSVG({ setting: 'solitaire', metal: el.dataset.metal || 'white', shape: 'oval', carat: 1.5, label: 'The diamond set in the ring' }); },
		'mega-ring': function () { return ringSVG({ setting: 'solitaire', metal: 'white', shape: 'round', carat: 1.25, label: '' }); },
		'f-sketch': function () { return '<svg viewBox="0 0 400 350" aria-hidden="true"><g fill="none" stroke="#8d877c" stroke-width="1.6" stroke-dasharray="6 5" stroke-linecap="round"><ellipse cx="200" cy="222" rx="116" ry="97"/><ellipse cx="200" cy="222" rx="103" ry="86"/><rect x="164" y="58" width="72" height="66" rx="8"/><path d="M164 92h72M200 58v66M118 104l46-12M282 104l-46-12"/></g></svg>'; },
		'f-cad': function () { return ringSVG({ setting: 'three', metal: 'white', shape: 'emerald', carat: 1.25, label: '3D render' }).replace('<svg ', '<svg style="filter:grayscale(1) contrast(.9)" '); },
		'f-final': function () { return ringSVG({ setting: 'three', metal: 'yellow', shape: 'emerald', carat: 1.25, label: 'Finished ring' }); }
	};
	function fillArt(root) {
		$$('[data-art]', root).forEach(function (el) {
			if (el.getAttribute('data-wk-art')) return;
			el.setAttribute('data-wk-art', '1');
			var fn = ART[el.dataset.art];
			if (fn) el.insertAdjacentHTML('beforeend', fn(el));
		});
		$$('[data-shape-icon]', root).forEach(function (el) { if (!el.firstChild && SH[el.dataset.shapeIcon]) el.innerHTML = shapeIcon(el.dataset.shapeIcon); });
		$$('[data-shapes="link"]', root).forEach(function (el) {
			if (el.firstChild) return;
			var base = el.dataset.base || '#';
			el.innerHTML = Object.keys(SH).map(function (s) { return '<a href="' + esc(base) + '" data-shape="' + s + '">' + shapeIcon(s) + SH[s].n + '</a>'; }).join('');
		});
	}

	/* ================= Motion helpers ================= */
	function swapEl(box, html) {
		var old = $$(':scope > svg, :scope > img, :scope > video', box);
		box.insertAdjacentHTML('beforeend', html);
		var neu = box.lastElementChild;
		if (reduce || !old.length) { old.forEach(function (o) { o.remove(); }); return; }
		old.forEach(function (o) { o.classList.add('leaving'); });
		neu.classList.add('entering');
		requestAnimationFrame(function () { requestAnimationFrame(function () { neu.classList.remove('entering'); }); });
		setTimeout(function () { old.forEach(function (o) { o.remove(); }); }, 420);
	}
	function sweepRun(el) { if (!el || reduce) return; el.classList.remove('run'); void el.offsetWidth; el.classList.add('run'); }
	function flash(box) { if (reduce || !box) return; box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash'); }
	var MORPH = new WeakMap(), MORPH_RAF = new WeakMap();
	function morphTo(poly, pts) {
		var cur = MORPH.get(poly);
		if (!cur || reduce) { MORPH.set(poly, pts); poly.setAttribute('points', P2(pts)); return; }
		var from = cur.map(function (p) { return p.slice(); }), t0 = performance.now(), dur = 480;
		cancelAnimationFrame(MORPH_RAF.get(poly));
		var step = function (now) {
			var k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
			var p = from.map(function (q, i) { return [q[0] + (pts[i][0] - q[0]) * e, q[1] + (pts[i][1] - q[1]) * e]; });
			MORPH.set(poly, p); poly.setAttribute('points', P2(p));
			if (k < 1) MORPH_RAF.set(poly, requestAnimationFrame(step));
		};
		MORPH_RAF.set(poly, requestAnimationFrame(step));
	}
	function playIn(box, on) {
		var v = box && box.querySelector('video');
		if (!v || reduce) return;
		if (on) { if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; var pr = v.play(); if (pr && pr.then) pr.then(function () { box.classList.add('playing'); }, function () {}); }
		else { box.classList.remove('playing'); v.pause(); }
	}
	function setRange(el) { el.style.setProperty('--p', (el.value - el.min) / (el.max - el.min) * 100 + '%'); }

	/* ================= Store hours ================= */
	var HRS = CFG.hours || [null, [10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [10, 17]];
	var DAYS = T.days || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var hfmt = function (h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return (hh % 12 || 12) + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '') + (hh >= 12 ? ' pm' : ' am'); };
	var NOW;
	try { NOW = new Date(new Date().toLocaleString('en-US', { timeZone: CFG.tz || 'America/Chicago' })); } catch (e) { NOW = new Date(); }
	var D = NOW.getDay(), HR = NOW.getHours() + NOW.getMinutes() / 60, TODAY = HRS[D];
	var OPEN = false, STATUS;
	(function () {
		if (TODAY && HR >= TODAY[0] && HR < TODAY[1]) { OPEN = true; STATUS = fmt(T.openUntil || 'Open today until %s', hfmt(TODAY[1])); }
		else if (TODAY && HR < TODAY[0]) STATUS = fmt(T.opensToday || 'Closed now · opens today at %s', hfmt(TODAY[0]));
		else {
			var n = D, i;
			for (i = 1; i < 8; i++) { n = (D + i) % 7; if (HRS[n]) break; }
			STATUS = HRS[n] ? fmt(T.opensOn || 'Closed now · opens %1$s at %2$s', n === (D + 1) % 7 ? (T.tomorrow || 'tomorrow') : DAYS[n], hfmt(HRS[n][0])) : (T.closed || 'Closed');
		}
	})();
	function applyHours(root) {
		$$('[data-status-text]', root).forEach(function (e) { e.textContent = STATUS; });
		$$('[data-wk-status]', root).forEach(function (e) { e.classList.toggle('closed', !OPEN); });
		$$('[data-hours]', root).forEach(function (ul) {
			ul.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(function (i) { return '<li class="' + (i === D ? 'today' : '') + '"><span>' + esc(DAYS[i]) + (i === D ? ' (' + esc(T.today || 'today') + ')' : '') + '</span><span>' + (HRS[i] ? hfmt(HRS[i][0]) + ' – ' + hfmt(HRS[i][1]) : esc(T.closed || 'Closed')) + '</span></li>'; }).join('');
		});
		$$('[data-daybar]', root).forEach(function (db) {
			if (!TODAY) { db.hidden = true; return; }
			db.style.setProperty('--f', Math.max(0, Math.min(1, (HR - TODAY[0]) / (TODAY[1] - TODAY[0]))).toFixed(3));
			var o = db.querySelector('[data-db-open]'), c = db.querySelector('[data-db-close]');
			if (o) o.textContent = hfmt(TODAY[0]);
			if (c) c.textContent = hfmt(TODAY[1]);
			db.classList.toggle('off', !OPEN);
		});
		$$('[data-days]', root).forEach(function (sel) {
			if (sel.options.length) return;
			var c = new Date(NOW), added = 0, guard = 0;
			while (added < 8 && guard++ < 30) { c.setDate(c.getDate() + 1); if (HRS[c.getDay()]) { sel.add(new Option(c.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }))); added++; } }
		});
	}

	/* ================= Toast, drawer, phone action bar (one each per page) ================= */
	var portal, toastEl, toastT, drawer;
	function ensurePortal() {
		if (portal) return portal;
		portal = document.createElement('div');
		portal.className = 'wk wk-portal';
		var a = CFG.act || ['Call', 'Book a visit', 'Directions'];
		portal.innerHTML = '<div class="toast" role="status" hidden></div>' +
			(CFG.tray ? '<aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="wk-drawer-h" hidden><div class="dr-panel"><div class="dr-head"><h2 class="h3" id="wk-drawer-h">' + esc(T.trayTitle || 'Your tray') + '<span class="dr-count"></span></h2><button class="icon-btn" type="button" data-close aria-label="' + esc(T.close || 'Close') + '">' + icon('close') + '</button></div><p class="dr-sub">' + esc(T.traySub || '') + '</p><div class="dr-body"><ul class="dr-list"></ul><div class="dr-empty"><p>' + esc(T.trayEmpty || '') + '</p></div></div><div class="dr-foot" hidden><a class="btn btn-ink" href="' + esc(CFG.book || '#visit') + '" data-dr-book>' + esc(T.trayBook || 'Book a visit') + ' ' + icon('arr', 'arr') + '</a><button class="btn btn-line" type="button" data-dr-keep>' + esc(T.trayKeep || 'Keep browsing') + '</button><p class="fine">' + esc(T.trayNote || '') + '</p></div></div></aside>' : '') +
			(CFG.actbar ? '<nav class="actbar" aria-label="Quick actions">' + (CFG.tel ? '<a href="' + esc(CFG.tel) + '">' + icon('phone') + esc(a[0]) + '</a>' : '') + '<a class="main" href="' + esc(CFG.book || '#visit') + '">' + esc(a[1]) + '<span class="count" data-count hidden>0</span></a>' + (CFG.maps ? '<a href="' + esc(CFG.maps) + '" target="_blank" rel="noopener">' + icon('dir') + esc(a[2]) + '</a>' : '') + '</nav>' : '');
		document.body.appendChild(portal);
		toastEl = $('.toast', portal);
		drawer = $('.drawer', portal);
		if (drawer) setupDrawer();
		if (CFG.actbar) {
			var bar = $('.actbar', portal);
			var onScroll = function () {
				var hero = $('.wk-hero .hero'), book = $('.wk-visit .book');
				var past = hero ? hero.getBoundingClientRect().bottom < 70 : window.scrollY > 500;
				var vis = false;
				if (book) { var r = book.getBoundingClientRect(); vis = r.top < innerHeight && r.bottom > 0; }
				bar.classList.toggle('on', past && !vis);
			};
			addEventListener('scroll', onScroll, { passive: true }); onScroll();
		}
		renderTray();
		return portal;
	}
	function toast(msg) {
		ensurePortal();
		toastEl.textContent = msg; toastEl.hidden = false;
		clearTimeout(toastT); toastT = setTimeout(function () { toastEl.hidden = true; }, 3200);
	}

	/* ================= Tray (saved pieces) ================= */
	var tray = [];
	try { tray = JSON.parse(localStorage.getItem('wkTray') || '[]') || []; } catch (e) { tray = []; }
	var saveTray = function () { try { localStorage.setItem('wkTray', JSON.stringify(tray)); } catch (e) {} };
	var inTray = function (key) { return tray.some(function (t) { return t.key === key; }); };
	function renderTray() {
		var n = tray.length;
		$$('[data-count]').forEach(function (c) { c.textContent = n; c.hidden = !n; });
		var thumb = function (t) { return t.img ? '<img src="' + esc(t.img) + '" alt="' + esc(t.name) + '">' : ''; };
		$$('[data-tray-card]').forEach(function (card) {
			card.hidden = !n;
			var title = card.querySelector('[data-tray-title]'), th = card.querySelector('[data-tray-thumbs]');
			if (title) title.textContent = fmt(n === 1 ? (T.pieces || 'Your tray · %d piece') : (T.piecesN || 'Your tray · %d pieces'), n);
			if (th) th.innerHTML = tray.slice(0, 6).map(function (t) { return '<div title="' + esc(t.name) + '">' + thumb(t) + '</div>'; }).join('');
		});
		if (drawer) {
			$('.dr-list', drawer).innerHTML = tray.map(function (t) { return '<li><div class="dr-thumb">' + thumb(t) + '</div><div><b>' + esc(t.name) + '</b><small>' + esc(t.sub || '') + '</small></div><button class="dr-rm" type="button" data-rm="' + esc(t.key) + '" aria-label="' + esc((T.remove || 'Remove') + ' ' + t.name) + '">' + esc(T.remove || 'Remove') + '</button></li>'; }).join('');
			$('.dr-empty', drawer).hidden = !!n;
			$('.dr-foot', drawer).hidden = !n;
			$('.dr-count', drawer).textContent = n ? ' · ' + n : '';
		}
		document.dispatchEvent(new CustomEvent('wk:tray'));
	}
	function bump() { if (reduce) return; $$('[data-count]').forEach(function (c) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }); }
	function fly(fromEl) {
		var target = [$('[data-wk-tray]'), $('.actbar.on .main')].filter(function (x) { return x && x.offsetParent !== null && x.getBoundingClientRect().width; })[0];
		if (!fromEl || !target || reduce || !fromEl.animate) return Promise.resolve();
		var a = fromEl.getBoundingClientRect(), b = target.getBoundingClientRect();
		if (!a.width) return Promise.resolve();
		var size = Math.min(a.width, a.height, 150), el = document.createElement('div');
		el.className = 'fly'; el.setAttribute('aria-hidden', 'true');
		el.style.cssText = 'left:' + (a.left + a.width / 2 - size / 2) + 'px;top:' + (a.top + a.height / 2 - size / 2) + 'px;width:' + size + 'px;height:' + size + 'px';
		el.appendChild(fromEl.cloneNode(true));
		ensurePortal().appendChild(el);
		var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2), s = 26 / size;
		var anim = el.animate([
			{ transform: 'translate(0, 0) scale(1)', opacity: 1 },
			{ transform: 'translate(' + dx * 0.38 + 'px, ' + (dy * 0.55 - 70) + 'px) scale(.62)', opacity: 1, offset: 0.5 },
			{ transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')', opacity: 0.35 }
		], { duration: 820, easing: 'cubic-bezier(.55, 0, .25, 1)' });
		return anim.finished.then(function () { el.remove(); }, function () { el.remove(); });
	}
	function addTray(item, fromEl) {
		if (!CFG.tray || inTray(item.key)) return;
		ensurePortal();
		tray.push(item); saveTray();
		document.dispatchEvent(new CustomEvent('wk:tray'));
		fly(fromEl).then(function () { renderTray(); bump(); });
		toast(T.saved || 'Saved to your tray.');
	}
	function updateTray(key, item) { var t = tray.find(function (x) { return x.key === key; }); if (t) { Object.assign(t, item); saveTray(); renderTray(); } }
	function removeTray(key) {
		var i = tray.findIndex(function (t) { return t.key === key; });
		if (i < 0) return;
		tray.splice(i, 1); saveTray(); renderTray();
		if (!drawer || drawer.hidden) toast(T.removed || 'Removed from your tray.');
	}
	var drawerFrom = null;
	function openDrawer() {
		ensurePortal();
		if (!drawer) return;
		drawerFrom = document.activeElement;
		toastEl.hidden = true; clearTimeout(toastT);
		drawer.hidden = false;
		requestAnimationFrame(function () { requestAnimationFrame(function () { drawer.classList.add('open'); }); });
		document.body.style.overflow = 'hidden';
		$$('[data-wk-tray]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
		drawer.querySelector('[data-close]').focus();
	}
	function closeDrawer(back) {
		if (!drawer || drawer.hidden) return;
		drawer.classList.remove('open');
		$$('[data-wk-tray]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
		document.body.style.overflow = '';
		setTimeout(function () { drawer.hidden = true; }, reduce ? 0 : 360);
		if (back && drawerFrom) drawerFrom.focus();
	}
	function setupDrawer() {
		drawer.addEventListener('click', function (e) {
			if (e.target === drawer) return closeDrawer(true);
			var rm = e.target.closest('[data-rm]');
			if (rm) { removeTray(rm.dataset.rm); (drawer.querySelector('.dr-rm') || drawer.querySelector('[data-close]')).focus(); }
		});
		drawer.querySelector('[data-close]').addEventListener('click', function () { closeDrawer(true); });
		drawer.querySelector('[data-dr-keep]').addEventListener('click', function () { closeDrawer(true); });
		drawer.querySelector('[data-dr-book]').addEventListener('click', function () { closeDrawer(false); pickTopic('Engagement ring', true); });
		drawer.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') return closeDrawer(true);
			if (e.key !== 'Tab') return;
			var f = $$('a[href], button', drawer).filter(function (x) { return x.offsetParent !== null; }), first = f[0], last = f[f.length - 1];
			if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
		});
	}

	/* ================= Visit-form topics, from any link with data-topic ================= */
	function pickTopic(t, only) {
		$$('[data-topic-opt]').forEach(function (b) {
			if (only) b.setAttribute('aria-pressed', String(b.dataset.topicOpt === t));
			else if (b.dataset.topicOpt === t) b.setAttribute('aria-pressed', 'true');
		});
	}
	document.addEventListener('click', function (e) {
		var a = e.target.closest('[data-topic]');
		if (a && !a.matches('[data-topic-opt]')) pickTopic(a.dataset.topic, true);
		// "Book a visit" links: stay on this page when it has its own visit form,
		// otherwise carry the topic to the page that does.
		var v = e.target.closest('a[href*="#visit"]');
		if (!v || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
		var here = document.getElementById('visit');
		if (here) {
			e.preventDefault();
			here.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
			if (history.replaceState) history.replaceState(null, '', '#visit');
		} else if (v.dataset.topic) {
			try { var u = new URL(v.href, location.href); u.searchParams.set('topic', v.dataset.topic); v.href = u.toString(); } catch (er) {}
		}
	});
	try {
		var qt = new URLSearchParams(location.search).get('topic');
		if (qt) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { pickTopic(qt, true); }); else pickTopic(qt, true); }
	} catch (e) {}

	/* ================= Widgets ================= */
	var INIT = {};

	INIT.header = function (el, c) {
		var hd = $('.hd', el), sheet = $('.sheet', el), mb = $('.menu-btn', el);
		// Sticky: stick the outermost Elementor block that holds the header.
		if (c.sticky) {
			var host = el.closest('.wk-site-header') || el.closest('.elementor > .e-con, .elementor > .elementor-section, .elementor > .elementor-element, .elementor-section-wrap > .elementor-section');
			if (host && !document.body.classList.contains('elementor-editor-active')) {
				host.classList.add('wk-sticky');
				var place = function () { var off = hd.getBoundingClientRect().top - host.getBoundingClientRect().top; host.style.top = 'calc(var(--wp-admin--admin-bar--height, 0px) - ' + Math.max(0, off) + 'px)'; };
				place(); addEventListener('resize', place);
			}
		}
		var onScroll = function () {
			if (!el.isConnected) return;
			if (c.mode === 'light') { hd.classList.add('solid'); return; }
			if (c.mode === 'dark') return;
			var hero = $('.wk-hero .hero');
			var past = hero ? hero.getBoundingClientRect().bottom < hd.offsetHeight : window.scrollY > 20;
			hd.classList.toggle('solid', past);
		};
		addEventListener('scroll', onScroll, { passive: true }); onScroll();
		$$('.has-mega', el).forEach(function (li) {
			var btn = li.querySelector('.nav-a'), tIn, tOut, by = null;
			var set = function (v, how) {
				$$('.has-mega', el).forEach(function (o) { if (o !== li) { o.classList.remove('open'); o.querySelector('.nav-a').setAttribute('aria-expanded', 'false'); } });
				li.classList.toggle('open', v); btn.setAttribute('aria-expanded', String(v)); by = v ? how : null;
				hd.classList.toggle('mega-on', !!$('.has-mega.open', el));
			};
			li.addEventListener('mouseenter', function () { if (!fine.matches) return; clearTimeout(tOut); var sw = !!$('.has-mega.open', el); tIn = setTimeout(function () { set(true, 'hover'); }, sw ? 0 : 120); });
			li.addEventListener('mouseleave', function () { if (!fine.matches) return; clearTimeout(tIn); if (by === 'hover') tOut = setTimeout(function () { set(false); }, 250); });
			btn.addEventListener('click', function () { clearTimeout(tIn); clearTimeout(tOut); if (li.classList.contains('open') && by === 'click') set(false); else set(true, 'click'); });
			li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) set(false); });
			li.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); btn.focus(); } });
			$$('.mega a', li).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
		});
		document.addEventListener('click', function (e) {
			if (!el.contains(e.target)) $$('.has-mega.open', el).forEach(function (li) { li.classList.remove('open'); li.querySelector('.nav-a').setAttribute('aria-expanded', 'false'); hd.classList.remove('mega-on'); });
		});
		// Phone menu.
		var focusables = function () { return $$('a[href], button, input, summary', sheet).filter(function (x) { return x.offsetParent !== null; }); };
		var closeSheet = function (back) { sheet.hidden = true; mb.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; if (back) mb.focus(); };
		mb.addEventListener('click', function () { sheet.hidden = false; mb.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; sheet.querySelector('[data-close]').focus(); });
		sheet.querySelector('[data-close]').addEventListener('click', function () { closeSheet(true); });
		$$('nav a, details a, .sheet-foot a', sheet).forEach(function (a) { a.addEventListener('click', function () { closeSheet(false); }); });
		sheet.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') closeSheet(true);
			if (e.key === 'Tab') { var f = focusables(), first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
		});
		// Search: an input slides over the menu.
		var go = function (q) { if (q.trim()) location.href = (c.search || '/?s=') + encodeURIComponent(q.trim()); };
		$$('[data-wk-searchform]', el).forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); go(f.q.value); }); });
		var sb = $('[data-wk-search]', el);
		if (sb) {
			var form = document.createElement('form');
			form.className = 'hd-search'; form.setAttribute('role', 'search'); form.hidden = true;
			form.innerHTML = '<input type="search" name="q" placeholder="Search rings, diamonds, jewelry" aria-label="Search">' + '<button type="button" class="icon-btn" aria-label="' + esc(T.close || 'Close') + '">' + icon('close') + '</button>';
			$('.hd > .wrap', el).appendChild(form);
			var closeS = function () { form.hidden = true; hd.classList.remove('searching'); sb.focus(); };
			sb.addEventListener('click', function () { form.hidden = false; hd.classList.add('searching'); form.q.focus(); });
			form.querySelector('button').addEventListener('click', closeS);
			form.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeS(); });
			form.addEventListener('submit', function (e) { e.preventDefault(); go(form.q.value); });
		}
		$$('[data-wk-tray]', el).forEach(function (b) { b.addEventListener('click', openDrawer); });
		renderTray();
	};

	INIT.hero = function (el, c) {
		var items = c.items || [], media = $('.hero-media', el), stage = $('.sc-stage', el), sweep = $('.sweep', el), cap = $('.sc-cap', el);
		if (!stage || items.length < 2) { if (c.sweep) setTimeout(function () { sweepRun(sweep); }, 650); return; }
		var figs = $$('.sc-item', stage), btns = $$('.sc-thumbs button', el), vids = figs.map(function (f) { return f.querySelector('video'); });
		if (reduce && vids[0]) { vids[0].removeAttribute('autoplay'); vids[0].pause(); }
		var cur = 0, timer = 0, paused = false;
		var caption = function (p) {
			var s = '<span><b>' + esc(p.n) + '</b>' + (c.price ? ' · ' + esc(MCOL[p.m] || '') + (p.p ? ' · From ' + esc(p.p) : '') : '') + '</span>';
			if (p.u && p.cta) s += '<a href="' + esc(p.u) + '"' + (p.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(p.cta) + ' ' + icon('arr') + '</a>';
			return s;
		};
		function show(i) {
			if (i === cur || i < 0) return;
			figs[cur].classList.remove('is-on'); figs[cur].setAttribute('aria-hidden', 'true');
			var old = vids[cur]; if (old) setTimeout(function () { old.pause(); }, 700);
			figs[i].classList.add('is-on'); figs[i].removeAttribute('aria-hidden');
			var v = vids[i];
			if (v) { if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; if (!reduce) { v.currentTime = 0; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } }
			btns.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
			if (cap) cap.innerHTML = caption(items[i]);
			cur = i;
			if (c.sweep) sweepRun(sweep);
		}
		var tick = function () { clearTimeout(timer); if (!el.isConnected) return; if (!reduce && !paused && !document.hidden && c.interval > 0) timer = setTimeout(function () { show((cur + 1) % items.length); tick(); }, c.interval * 1000); };
		btns.forEach(function (b, i) { b.addEventListener('click', function () { show(i); tick(); }); });
		media.addEventListener('pointerenter', function () { paused = true; clearTimeout(timer); });
		media.addEventListener('pointerleave', function () { paused = false; tick(); });
		media.addEventListener('focusin', function () { paused = true; clearTimeout(timer); });
		media.addEventListener('focusout', function () { paused = false; tick(); });
		document.addEventListener('visibilitychange', tick);
		if (c.sweep) setTimeout(function () { sweepRun(sweep); }, 650);
		tick();
		if (c.tilt && fine.matches && !reduce) {
			media.addEventListener('pointermove', function (e) {
				var r = media.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
				stage.style.setProperty('--rx', (x - 0.5).toFixed(3)); stage.style.setProperty('--ry', (y - 0.5).toFixed(3));
			});
			media.addEventListener('pointerleave', function () { stage.style.setProperty('--rx', 0); stage.style.setProperty('--ry', 0); });
		}
	};

	INIT.products = function (el, c) {
		var items = c.items || [], row = $('.prow', el), cards = $$('.card', el);
		var cur = items.map(function (p) { return p.m; });
		var key = function (i) { return 'p-' + (items[i].id || items[i].n) ; };
		var item = function (i) { var p = items[i], m = cur[i], md = p.media[m] || {}; return { key: key(i), name: p.n, sub: (MCOL[m] || '') + (p.id ? ' · style ' + p.id : '') + (p.p ? ' · from ' + p.p : ''), img: md.poster || p.img }; };
		var sync = function () {
			$$('.save', el).forEach(function (b) {
				var i = +b.dataset.i, on = inTray(key(i));
				b.setAttribute('aria-pressed', String(on));
				b.setAttribute('aria-label', (on ? (T.remove || 'Remove') + ' ' : (T.addTray || 'Add to my tray') + ': ') + items[i].n);
			});
		};
		document.addEventListener('wk:tray', sync); sync();
		el.addEventListener('click', function (e) {
			var b = e.target.closest('.save');
			if (b) { var i = +b.dataset.i; if (inTray(key(i))) return removeTray(key(i)); return addTray(item(i), b.closest('.card').querySelector('.slot img')); }
			var m = e.target.closest('[data-m]'); if (!m) return;
			var j = +m.dataset.i, card = m.closest('.card'), box = card.querySelector('.pv'), img = box.querySelector('img'), v = box.querySelector('video'), p = items[j], mm = m.dataset.m;
			if (cur[j] === mm || !p.media[mm]) return;
			cur[j] = mm;
			var md = p.media[mm];
			if (md.poster) img.src = md.poster;
			img.alt = p.n + ', ' + (MCOL[mm] || '');
			if (v) { v.dataset.src = md.v || ''; if (v.getAttribute('src')) { if (md.v) { v.src = md.v; if (box.classList.contains('playing')) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } } else { box.classList.remove('playing'); v.removeAttribute('src'); } } }
			flash(box);
			$$('[data-m]', card).forEach(function (o) { var on = o.dataset.m === mm; o.setAttribute('aria-checked', String(on)); o.tabIndex = on ? 0 : -1; });
			if (inTray(key(j))) updateTray(key(j), item(j));
		});
		el.addEventListener('keydown', function (e) {
			var m = e.target.closest('[data-m]'), k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
			if (!m || !k) return;
			e.preventDefault();
			var opts = Array.prototype.slice.call(m.parentElement.children), n = opts[(opts.indexOf(m) + k + opts.length) % opts.length];
			n.click(); n.focus();
		});
		if (c.play === 'always') {
			var ioA = new IntersectionObserver(function (es) { es.forEach(function (e) { playIn(e.target, e.isIntersecting); }); }, { threshold: 0.5 });
			$$('.pv', el).forEach(function (b) { ioA.observe(b); });
		} else if (c.play === 'hover') {
			if (fine.matches) cards.forEach(function (cd) { cd.addEventListener('pointerenter', function () { playIn(cd.querySelector('.pv'), true); }); cd.addEventListener('pointerleave', function () { playIn(cd.querySelector('.pv'), false); }); });
			else { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { playIn(e.target, e.isIntersecting); }); }, { threshold: 0.75 }); $$('.pv', el).forEach(function (b) { io.observe(b); }); }
		}
		$$('[data-scroll]', el).forEach(function (b) { b.addEventListener('click', function () { row.scrollBy({ left: +b.dataset.scroll * row.clientWidth * 0.75, behavior: reduce ? 'auto' : 'smooth' }); }); });
	};

	INIT.craft = function (el, c) {
		var layers = $$('.cr-layer', el), steps = $$('.cr-step', el), dots = $$('.cr-dots li', el), label = $('.cr-label', el), sweep = $('.sweep', el);
		var names = c.names || [], total = steps.length, cur = total, seen = false;
		var sketch = layers.filter(function (l) { return l.dataset.art === 'sketch'; })[0];
		var draw = function () { if (reduce || !sketch) return; sketch.classList.remove('draw'); void sketch.offsetWidth; sketch.classList.add('draw'); };
		function set(n) {
			if (n === cur) return;
			cur = n;
			layers.forEach(function (l) { l.classList.toggle('is-on', +l.dataset.stage === n); });
			if (seen && layers[n - 1] === sketch) draw();
			steps.forEach(function (s) { s.classList.toggle('is-active', +s.dataset.stage === n); });
			dots.forEach(function (d, i) { d.classList.toggle('on', i < n); });
			label.innerHTML = esc(fmt(c.word || 'Step %1$s of %2$s', n, total)) + ' · <b>' + esc(names[n - 1] || '') + '</b>';
			if (n === total && seen && c.sweep) sweepRun(sweep);
		}
		if (document.body.classList.contains('elementor-editor-active')) return;
		if (c.compact) {
			// One screen: steps play in turn while the section is visible; click or Enter picks one.
			var timer = null, paused = false, vis = false, ms = (c.interval || 4) * 1000;
			var mark = function () { steps.forEach(function (s) { s.setAttribute('aria-pressed', String(s.classList.contains('is-active'))); s.style.setProperty('--t', ms + 'ms'); }); };
			var go = function (n) { cur = 0; set(n); mark(); };
			var tick = function () { clearTimeout(timer); if (!vis || paused || reduce) return; timer = setTimeout(function () { go(cur % total + 1); tick(); }, ms); };
			var grid = $('.craft-grid', el);
			steps.forEach(function (s) {
				s.addEventListener('click', function () { go(+s.dataset.stage); paused = true; clearTimeout(timer); grid.classList.add('picked'); });
				s.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); s.click(); } });
			});
			grid.addEventListener('mouseenter', function () { paused = true; clearTimeout(timer); });
			grid.addEventListener('mouseleave', function () { if (grid.classList.contains('picked')) return; paused = false; tick(); });
			new IntersectionObserver(function (es) {
				vis = es[0].isIntersecting;
				if (vis && !seen) { seen = true; go(1); if (layers[0] === sketch) draw(); }
				tick();
			}, { threshold: 0.35 }).observe(grid);
			return;
		}
		if (el.getBoundingClientRect().top > innerHeight * 0.5) set(1);
		var fo = new IntersectionObserver(function (es) { if (!es[0].isIntersecting) return; fo.disconnect(); seen = true; if (layers[cur - 1] === sketch) draw(); }, { rootMargin: '0px 0px -5% 0px' });
		fo.observe($('.cr-frame', el));
		var narrow = window.matchMedia('(max-width: 860px)'), io;
		var watch = function () {
			if (io) io.disconnect();
			io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) set(+e.target.dataset.stage); }); }, { rootMargin: narrow.matches ? '-62% 0px -37% 0px' : '-48% 0px -48% 0px' });
			steps.forEach(function (s) { io.observe(s); });
		};
		watch();
		if (narrow.addEventListener) narrow.addEventListener('change', watch);
	};

	INIT.spotlight = function (el, c) {
		var items = c.items || [], names = c.names || {}, ring = $('[data-spot-ring]', el), mBox = $('[data-spot-metals]', el), cap = $('[data-spot-cap]', el), pick = $('[data-spot-pick]', el);
		if (!items.length) return;
		var cur = 0, metal = items[0].m;
		var media = function (it, m) { var x = it.media[m] || it.media[Object.keys(it.media)[0]]; return x.v ? '<video muted loop playsinline autoplay preload="auto" poster="' + esc(x.poster) + '" src="' + esc(x.v) + '" aria-label="' + esc(it.n) + '"></video>' : '<img src="' + esc(x.poster) + '" alt="' + esc(it.n) + '">'; };
		var show = function () {
			var it = items[cur];
			swapEl(ring, media(it, metal));
			var v = ring.lastElementChild; if (v && v.play && !reduce) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
			$$('[data-m]', mBox).forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.m === metal)); });
		};
		var caption = function () {
			var it = items[cur];
			cap.innerHTML = '<b>' + esc(it.n) + '</b>' + (c.price && it.p ? ' · ' + esc(T.from || 'From') + ' ' + esc(it.p) : '') + (c.link && it.u ? ' <a href="' + esc(it.u) + '"' + (it.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(c.link) + ' ' + icon('arr') + '</a>' : '');
			mBox.innerHTML = Object.keys(it.media).map(function (m) { return '<button type="button" role="radio" aria-checked="' + (m === metal) + '" data-m="' + m + '"><i class="sw sw-' + m + '"></i>' + esc(names[m] || m) + '</button>'; }).join('');
		};
		mBox.addEventListener('click', function (e) { var b = e.target.closest('[data-m]'); if (!b || b.dataset.m === metal) return; metal = b.dataset.m; show(); });
		mBox.addEventListener('keydown', function (e) {
			var k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return;
			var ms = Object.keys(items[cur].media), i = (ms.indexOf(metal) + k + ms.length) % ms.length; e.preventDefault(); metal = ms[i]; show(); var nb = mBox.querySelector('[data-m="' + metal + '"]'); if (nb) nb.focus();
		});
		if (pick) pick.addEventListener('click', function (e) {
			var b = e.target.closest('[data-i]'); if (!b || +b.dataset.i === cur) return;
			cur = +b.dataset.i; var it = items[cur]; if (!it.media[metal]) metal = it.m;
			$$('[data-i]', pick).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
			caption(); show(); flash(ring);
		});
		// Play only while on screen.
		new IntersectionObserver(function (es) { var v = ring.querySelector('video'); if (!v || reduce) return; if (es[0].isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }, { threshold: 0.2 }).observe(ring);
	};

	INIT.studio = function (el, c) {
		var rings = c.rings || [], carats = c.carats || [0.5, 0.75, 1, 1.5, 2, 3];
		if (!rings.length) return;
		var start = rings[c.start || 0] || rings[0];
		var st = { setting: start.style, metal: c.metal || 'white', shape: start.shape, carat: c.carat || 0, pid: 0 };
		st.pid = rings.indexOf(start);
		var main = $('[data-ring-main]', el), alts = $('[data-alts]', el), shown = $('[data-shown]', el), hint = $('[data-hint]', el);
		var caratEl = $('[data-carat]', el), poly = $('[data-size-poly]', el), sizeTxt = $('[data-size-txt]', el);
		var saveBtn = $('[data-save]', el), goBtn = $('[data-go]', el);
		var hasShape = function (sh) { return rings.some(function (r) { return r.shape === sh; }); };
		var key = function () { return 's-' + (rings[st.pid].id || st.pid) + '-' + st.metal; };
		function pick() {
			var list = rings.filter(function (r) { return r.style === st.setting; });
			if (!list.length) list = rings;
			var r = rings[st.pid];
			if (!(r && r.style === st.setting && r.shape === st.shape)) r = list.filter(function (x) { return x.shape === st.shape; })[0] || list[0];
			st.pid = rings.indexOf(r); st.shape = r.shape; st.setting = r.style;
			return r;
		}
		var media = function (r) { return r.media[st.metal] || r.media.white || r.media[Object.keys(r.media)[0]] || { v: '', poster: r.img }; };
		var last = '';
		var syncSave = function () {
			if (!saveBtn) return;
			var on = inTray(key());
			saveBtn.setAttribute('aria-pressed', String(on));
			saveBtn.innerHTML = on ? icon('check', 'arr') + esc(T.onTray || 'On your tray') : esc(c.save || T.addTray || 'Add to my tray');
		};
		document.addEventListener('wk:tray', syncSave);
		function draw() {
			var r = pick(), ct = carats[st.carat], fc = Math.cbrt(ct), sh = SH[st.shape] || SH.round, md = media(r), has = !!r.media[st.metal];
			if (st.pid + st.metal !== last) {
				last = st.pid + st.metal;
				swapEl(main, md.v ? '<video muted loop playsinline' + (reduce ? '' : ' autoplay') + ' preload="auto"' + (md.poster ? ' poster="' + esc(md.poster) + '"' : '') + ' src="' + esc(md.v) + '" aria-label="' + esc(r.n) + '"></video>' : '<img src="' + esc(md.poster || r.img) + '" alt="' + esc(r.n) + '">');
				var others = rings.filter(function (x) { return x.style === st.setting && x !== r; }).concat(rings.filter(function (x) { return x.style !== st.setting && x.shape === st.shape; })).slice(0, 4);
				alts.innerHTML = others.map(function (x) { var m = x.media[st.metal] || x.media.white || {}; return '<button type="button" data-alt="' + rings.indexOf(x) + '" aria-label="' + esc(x.n) + '"><img src="' + esc(m.poster || x.img) + '" alt="" loading="lazy"></button>'; }).join('');
			}
			shown.innerHTML = '<span>Shown: <b>' + esc(r.n) + '</b>' + (r.id ? ' · Style ' + esc(r.id) : '') + (r.p ? ' · From ' + esc(r.p) : '') + ' · ' + (has ? 'Shown in ' + esc(MCOL[st.metal]) : 'Photo shows white gold; made in your metal') + '.</span>' + (r.u && c.see ? '<a href="' + esc(r.u) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(c.see) + '</a>' : '');
			var out = function (k, v) { var o = $('[data-o="' + k + '"]', el); if (o) o.textContent = v; };
			out('setting', st.setting); out('metal', MCOL[st.metal]); out('shape', sh.n); out('carat', ct.toFixed(2) + ' ct');
			$$('[data-ctl]', el).forEach(function (g) {
				$$('[data-v]', g).forEach(function (b) {
					var on = b.dataset.v === st[g.dataset.ctl];
					b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1;
					if (g.dataset.ctl === 'shape') b.setAttribute('aria-disabled', String(!hasShape(b.dataset.v)));
				});
			});
			$$('.ticks span', el).forEach(function (s, i) { s.classList.toggle('on', i === st.carat); });
			var W = sh.mm[0] * fc, L = sh.mm[1] * fc, px = 5.4;
			morphTo(poly, outline(st.shape).map(function (p) { return [45 + p[0] * W * px, 45 + p[1] * L * px]; }));
			sizeTxt.innerHTML = '<b>' + ct.toFixed(2) + ' ct ≈ ' + (W === L ? W.toFixed(1) : L.toFixed(1) + ' × ' + W.toFixed(1)) + ' mm</b><br>' + esc(c.note || '');
			caratEl.setAttribute('aria-valuetext', ct + ' carat');
			setRange(caratEl);
			if (goBtn) {
				var url = c.go ? c.go.replace('{style}', encodeURIComponent(r.id || '')).replace('{metal}', st.metal).replace('{shape}', st.shape).replace('{carat}', ct) : (r.u || '#');
				goBtn.setAttribute('href', url);
			}
			syncSave();
		}
		function choose(ctl, v) {
			hint.textContent = '';
			if (ctl === 'shape' && !rings.some(function (r) { return r.style === st.setting && r.shape === v; })) {
				var r = rings.filter(function (x) { return x.shape === v; })[0];
				hint.textContent = 'No ' + st.setting.toLowerCase() + ' ' + SH[v].n.toLowerCase() + ' in this selection, so here\'s a ' + r.style.toLowerCase() + ' one.';
				st.setting = r.style; st.pid = rings.indexOf(r);
			}
			st[ctl] = v; draw();
		}
		$$('[data-ctl]', el).forEach(function (g) {
			g.addEventListener('click', function (e) {
				var b = e.target.closest('[data-v]'); if (!b) return;
				if (b.getAttribute('aria-disabled') === 'true') { hint.textContent = 'We don\'t have a ' + SH[b.dataset.v].n.toLowerCase() + ' setting photographed yet. Ask us and we\'ll find one.'; return; }
				choose(g.dataset.ctl, b.dataset.v);
			});
			g.addEventListener('keydown', function (e) {
				var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }; if (!(e.key in keys)) return;
				e.preventDefault();
				var opts = $$('[data-v]', g).filter(function (b) { return b.getAttribute('aria-disabled') !== 'true'; });
				var i = opts.findIndex(function (b) { return b.dataset.v === st[g.dataset.ctl]; });
				i = (i + keys[e.key] + opts.length) % opts.length;
				choose(g.dataset.ctl, opts[i].dataset.v); opts[i].focus();
			});
		});
		alts.addEventListener('click', function (e) { var b = e.target.closest('[data-alt]'); if (!b) return; var r = rings[+b.dataset.alt]; st.setting = r.style; st.shape = r.shape; st.pid = +b.dataset.alt; draw(); });
		caratEl.addEventListener('input', function () { st.carat = +caratEl.value; draw(); });
		// Shape links in the header menu set the studio's shape.
		document.addEventListener('click', function (e) { var a = e.target.closest('a[data-shape]'); if (a && hasShape(a.dataset.shape)) choose('shape', a.dataset.shape); });
		var item = function () { var r = rings[st.pid], md = media(r); return { key: key(), name: r.n, sub: (MCOL[st.metal] || '') + (r.id ? ' · style ' + r.id : '') + (r.p ? ' · from ' + r.p : ''), img: md.poster || r.img }; };
		if (saveBtn) saveBtn.addEventListener('click', function () { if (inTray(key())) return removeTray(key()); var m = $$(':scope > video, :scope > img', main); addTray(item(), m[m.length - 1]); });
		var book = $('[data-book]', el);
		if (book) book.addEventListener('click', function () { if (CFG.tray && !inTray(key())) { tray.push(item()); saveTray(); renderTray(); } });
		draw();
	};

	INIT.story = function (el) {
		var chs = $$('.ch', el), year = $('.st-year span', el), layers = $$('.st-layer', el), cap = $('.st-cap', el), cur = 0;
		function set(i) {
			if (i === cur || i < 0) return;
			cur = i;
			chs.forEach(function (c, j) { c.classList.toggle('is-active', j === i); });
			layers.forEach(function (l, j) { l.classList.toggle('is-on', j === i); });
			if (year) { year.textContent = chs[i].dataset.year; if (!reduce) { year.classList.remove('roll'); void year.offsetWidth; year.classList.add('roll'); } }
			if (cap) cap.textContent = chs[i].dataset.cap;
		}
		var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) set(chs.indexOf(e.target)); }); }, { rootMargin: '-40% 0px -55% 0px' });
		chs.forEach(function (c) { io.observe(c); });
	};

	var COL = ['#ffffff', '#fffefb', '#fdfbf3', '#fbf7e7', '#f8f0d6', '#f3e7c1', '#eedcaa', '#e7d091'];
	var CS = {
		color: { ticks: 'DEFGHIJK'.split(''), def: 3 },
		clarity: { ticks: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'], def: 5 },
		cut: { ticks: ['Too shallow', 'Ideal', 'Too deep'], def: 1 },
		carat: { ticks: ['0.5', '0.75', '1', '1.5', '2', '3'], def: 2 }
	};
	var CARATS = [0.5, 0.75, 1, 1.5, 2, 3];
	var INC = [[0.05, -0.03, 1], [-0.12, 0.08, 0.8], [0.14, 0.11, 0.9], [-0.04, -0.15, 0.7], [0.2, -0.07, 1.1], [-0.19, -0.03, 0.9]];
	var CLAR = [[0, 0], [0, 0], [1, 0.7], [2, 0.9], [2, 1.4], [3, 1.8], [4, 2.6], [5, 3.4], [6, 4.6]];
	var TXT = function (x, y, t, o) { o = o || {}; return '<text x="' + f1(x) + '" y="' + f1(y) + '" text-anchor="' + (o.a || 'middle') + '" font-family="Manrope, sans-serif" font-size="' + (o.s || 14) + '" font-weight="' + (o.w || 700) + '" fill="' + (o.c || '#b9c0ca') + '"' + (o.ls ? ' letter-spacing="' + o.ls + '"' : '') + '>' + t + '</text>'; };
	function trace(poly, o, dr, n) {
		var path = [o], p = o, dir = dr, inside = false, last = -1;
		for (var it = 0; it < 8; it++) {
			var best = null;
			for (var i = 0; i < poly.length; i++) {
				if (i === last) continue;
				var a = poly[i], b = poly[(i + 1) % poly.length], ex = b[0] - a[0], ey = b[1] - a[1], den = dir[0] * ey - dir[1] * ex;
				if (Math.abs(den) < 1e-9) continue;
				var t = ((a[0] - p[0]) * ey - (a[1] - p[1]) * ex) / den, u = ((a[0] - p[0]) * dir[1] - (a[1] - p[1]) * dir[0]) / den;
				if (t > 1e-6 && u >= 0 && u <= 1 && (!best || t < best.t)) best = { t: t, i: i, ex: ex, ey: ey };
			}
			if (!best) break;
			var q = [p[0] + dir[0] * best.t, p[1] + dir[1] * best.t]; path.push(q);
			var l = Math.hypot(best.ex, best.ey), no = [best.ey / l, -best.ex / l];
			if (!inside) { inside = true; p = q; last = best.i; continue; }
			var ci = dir[0] * no[0] + dir[1] * no[1], k = 1 - n * n * (1 - ci * ci);
			if (k < 0) { dir = [dir[0] - 2 * ci * no[0], dir[1] - 2 * ci * no[1]]; p = q; last = best.i; continue; }
			var s = n * ci - Math.sqrt(k); dir = [n * dir[0] - s * no[0], n * dir[1] - s * no[1]];
			var ll = Math.hypot(dir[0], dir[1]); dir = [dir[0] / ll, dir[1] / ll];
			return { path: path, exit: q, dir: dir };
		}
		return { path: path, exit: p, dir: dir };
	}
	INIT.fourcs = function (el, c) {
		var txt = c.c || {}, tab = c.start || 'color';
		var rng = $('[data-cs-range]', el), vizBox = $('[data-viz]', el), go = $('[data-cs-go]', el), tabs = $$('.seg [role=tab]', el);
		var gradeText = function (v) {
			if (tab === 'carat') { var cc = CARATS[v]; return String((txt.carat && txt.carat.texts[0]) || '').replace('{ct}', cc.toFixed(2)).replace('{mm}', (6.4 * Math.cbrt(cc)).toFixed(1)); }
			var list = (txt[tab] && txt[tab].texts) || [];
			return list[Math.min(v, list.length - 1)] || '';
		};
		function viz() {
			var v = +rng.value, id = 'wkv' + (++UID), s = '<svg viewBox="0 0 560 480" role="img" aria-label="' + esc((txt[tab] && txt[tab].label) || tab) + ': ' + esc(CS[tab].ticks[v]) + '"><defs>' + defs(id, 'yellow') + '</defs>';
			if (tab === 'color') {
				s += '<circle cx="280" cy="200" r="150" fill="rgba(255,255,255,.04)"/>' + gemFace('round', 280, 200, 230, 230, { g: id + 'g', tint: COL[v], edge: 0, spark: 1, sw: 0.9 });
				CS.color.ticks.forEach(function (l, i) {
					var x = 77 + i * 58, on = i === v;
					s += '<g data-v="' + i + '"><rect x="' + (x - 29) + '" y="368" width="58" height="92" fill="transparent"/>' + gemFace('round', x, 398, 38, 38, { g: id + 'g', tint: COL[i], edge: 0, sw: 0.5 });
					if (on) s += '<circle cx="' + x + '" cy="398" r="25" fill="none" stroke="#d6b97f" stroke-width="2"/>';
					s += TXT(x, 446, l, { c: on ? '#d6b97f' : '#9aa2ad' }) + '</g>';
				});
			} else if (tab === 'clarity') {
				var cnt = CLAR[v][0], sz = CLAR[v][1], cx = 220, cy = 240, w = 270;
				var inc = function () { return INC.slice(0, cnt).map(function (q) { return '<circle cx="' + f1(cx + q[0] * w) + '" cy="' + f1(cy + q[1] * w) + '" r="' + f1(sz * q[2]) + '" fill="rgba(36,44,56,.75)"/>'; }).join('') + (v === 8 ? '<path d="M' + (cx - 50) + ' ' + (cy + 40) + 'q20 -12 42 -4t38 -10" fill="none" stroke="rgba(36,44,56,.6)" stroke-width="1.6"/>' : ''); };
				s += '<clipPath id="' + id + 'c"><circle cx="436" cy="126" r="84"/></clipPath>';
				s += gemFace('round', cx, cy, w, w, { g: id + 'g', edge: 0, spark: 1, sw: 0.9 }) + inc();
				s += '<circle cx="' + (cx + 18) + '" cy="' + cy + '" r="44" fill="none" stroke="rgba(214,185,127,.7)" stroke-dasharray="4 5"/><path d="M' + (cx + 52) + ' ' + (cy - 30) + 'L378 168" stroke="rgba(214,185,127,.6)" stroke-dasharray="4 5"/>';
				s += '<g clip-path="url(#' + id + 'c)"><rect x="340" y="30" width="200" height="200" fill="#f2f5f9"/><g transform="translate(436 126) scale(2.4) translate(' + (-(cx + 18)) + ' ' + (-cy) + ')">' + gemFace('round', cx, cy, w, w, { g: id + 'g', edge: 0, sw: 0.5 }) + inc() + '</g></g>';
				s += '<circle cx="436" cy="126" r="86" fill="none" stroke="#d6b97f" stroke-width="3"/>' + TXT(436, 240, '10× LOUPE', { s: 13, c: '#d6b97f', ls: 1.5 });
				s += TXT(cx, 440, v < 7 ? 'Looks clean to the eye' : 'May be visible to the eye', { s: 15, w: 600, c: '#e4e7ec' });
			} else if (tab === 'cut') {
				var depth = [0.18, 0.43, 0.72][v], W = 330, cx2 = 280, cy2 = 160;
				s += sideGem(cx2, cy2, W, { dark: 1, depth: depth });
				var poly = [[cx2 - 0.28 * W, cy2 - 0.16 * W], [cx2 + 0.28 * W, cy2 - 0.16 * W], [cx2 + 0.5 * W, cy2], [cx2, cy2 + depth * W], [cx2 - 0.5 * W, cy2]];
				[-0.2, -0.08, 0.14].forEach(function (x0) {
					var r = trace(poly, [cx2 + x0 * W, 16], [0, 1], 2.42), outp = [r.exit[0] + r.dir[0] * 80, r.exit[1] + r.dir[1] * 80];
					var ok = r.exit[1] < cy2 - 1, col = ok ? '#ecd49e' : '#8f98a5';
					s += '<path class="ray" pathLength="1" d="M' + r.path.concat([outp]).map(function (p) { return f1(p[0]) + ' ' + f1(p[1]); }).join('L') + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linejoin="round"' + (ok ? '' : ' opacity=".8"') + '/>';
					s += '<path class="ray-head" d="M0 -5L10 0L0 5Z" fill="' + col + '" transform="translate(' + f1(outp[0]) + ' ' + f1(outp[1]) + ') rotate(' + f1(Math.atan2(r.dir[1], r.dir[0]) * 57.3) + ')"/>';
				});
				var good = v === 1;
				s += '<rect x="150" y="422" width="260" height="38" rx="19" fill="' + (good ? 'rgba(214,185,127,.16)' : 'rgba(255,255,255,.08)') + '"/>' + TXT(280, 446, good ? 'Light returns to your eye' : 'Light leaks out and is lost', { s: 15, c: good ? '#ecd49e' : '#d3d8df' });
			} else {
				var kk = 9, fx = 210, fw = 17 * kk, cc = CARATS[v], dd = 6.4 * Math.cbrt(cc) * kk;
				s += '<path d="M' + (fx - fw / 2) + ' 480V' + (120 + fw / 2) + 'a' + fw / 2 + ' ' + fw / 2 + ' 0 0 1 ' + fw + ' 0V480" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/><path d="M' + (fx - 30) + ' 190q30 10 60 0M' + (fx - 26) + ' 410q26 8 52 0" stroke="rgba(255,255,255,.2)" fill="none"/>';
				s += '<rect x="' + (fx - fw / 2 - 2) + '" y="290" width="' + (fw + 4) + '" height="22" rx="6" fill="url(#' + id + 'm)"/>';
				s += gemFace('round', fx, 290, dd, dd, { g: id + 'g', edge: 0, spark: 1 });
				var so = outline('round').map(function (p) { return [fx + p[0] * dd, 290 + p[1] * dd]; });
				prongIdx('round').forEach(function (i) { var p = so[i]; s += '<circle cx="' + f1(fx + (p[0] - fx) * 0.95) + '" cy="' + f1(290 + (p[1] - 290) * 0.95) + '" r="4" fill="url(#' + id + 'm)"/>'; });
				var y = 48;
				CARATS.forEach(function (c2, i) {
					var d2 = 6.4 * Math.cbrt(c2) * kk * 0.62, on = i === v;
					y += d2 / 2;
					s += '<g data-v="' + i + '"><circle cx="440" cy="' + f1(y) + '" r="' + f1(d2 / 2) + '" fill="' + (on ? 'rgba(214,185,127,.2)' : 'rgba(255,255,255,.06)') + '" stroke="' + (on ? '#d6b97f' : 'rgba(255,255,255,.3)') + '" stroke-width="' + (on ? 2 : 1) + '"/>';
					s += TXT(440 + d2 / 2 + 12, y + 5, c2 + ' ct', { a: 'start', c: on ? '#d6b97f' : '#9aa2ad' }) + '</g>';
					y += d2 / 2 + 12;
				});
				s += TXT(fx, 466, 'To scale on a size 6 finger', { w: 600 });
			}
			swapEl(vizBox, s + '</svg>');
		}
		function csDraw(reset) {
			var cs = CS[tab], tx = txt[tab] || {};
			if (reset) { rng.max = cs.ticks.length - 1; rng.value = cs.def; }
			var v = +rng.value, grade = tab === 'carat' ? String(CARATS[v]) : cs.ticks[v];
			$('[data-cs-label]', el).textContent = tx.label || '';
			$('[data-cs-val]', el).textContent = tab === 'carat' ? CARATS[v].toFixed(2) + ' ct' : cs.ticks[v];
			$('[data-cs-ticks]', el).innerHTML = tab === 'color' ? '' : cs.ticks.map(function (t, i) { return '<span class="' + (i === v ? 'on' : '') + '">' + esc(t) + '</span>'; }).join('');
			$('[data-cs-text]', el).textContent = gradeText(v);
			$('[data-cs-tip]', el).textContent = tx.tip || '';
			$('[data-viz-cap]', el).textContent = tx.tab || tab;
			if (go) {
				go.hidden = !tx.url;
				go.firstChild.textContent = String(tx.go || '').replace('{grade}', grade);
				go.setAttribute('href', String(tx.url || '#').replace('{grade}', encodeURIComponent(grade)));
			}
			rng.setAttribute('aria-valuetext', tab === 'carat' ? CARATS[v] + ' carat' : cs.ticks[v]);
			setRange(rng); viz();
		}
		var selectTab = function (b) { tab = b.dataset.c; tabs.forEach(function (x) { var on = x === b; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; }); $('.cs-panel', el).setAttribute('aria-labelledby', b.id); csDraw(true); };
		tabs.forEach(function (b, i) {
			b.addEventListener('click', function () { selectTab(b); });
			b.addEventListener('keydown', function (e) { var k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return; var n = tabs[(i + k + tabs.length) % tabs.length]; selectTab(n); n.focus(); });
		});
		rng.addEventListener('input', function () { csDraw(); });
		vizBox.addEventListener('click', function (e) { var g = e.target.closest('[data-v]'); if (g) { rng.value = g.dataset.v; csDraw(); } });
		csDraw(true);
	};

	INIT.visit = function (el, c) {
		var form = $('[data-book-form]', el);
		renderTray();
		if (!form) return;
		var chips = $('.chips[role=group]', form);
		if (chips) chips.addEventListener('click', function (e) { var b = e.target.closest('[data-topic-opt]'); if (b) b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); });
		var pref = $('[data-pref]', form);
		if (pref) pref.addEventListener('click', function (e) { var b = e.target.closest('.opt'); if (!b) return; $$('.opt', pref).forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); }); });
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var name = form.elements.name, phone = form.elements.phone, err = $('[data-form-err]', form);
			var okName = name.value.trim().length > 1, okPhone = phone.value.replace(/\D/g, '').length >= 10;
			name.setAttribute('aria-invalid', String(!okName)); name.parentNode.querySelector('.err').hidden = okName;
			phone.setAttribute('aria-invalid', String(!okPhone)); phone.parentNode.querySelector('.err').hidden = okPhone;
			if (!okName) return name.focus();
			if (!okPhone) return phone.focus();
			var btn = form.querySelector('[type=submit]'), label = btn.innerHTML;
			btn.disabled = true; btn.textContent = T.sending || 'Sending…'; err.hidden = true;
			var topics = $$('[data-topic-opt][aria-pressed=true]', form).map(function (b) { return b.dataset.topicOpt; });
			var prefV = !pref ? (T.callOrText || 'Call or text') : ($$('.opt', pref).filter(function (x) { return x.getAttribute('aria-checked') === 'true'; })[0] || {}).textContent || '';
			var fd = new FormData();
			fd.append('action', 'wk_book'); fd.append('nonce', CFG.nonce || '');
			['name', 'phone', 'email', 'day', 'time', 'note', 'website'].forEach(function (k) { if (form.elements[k]) fd.append(k, form.elements[k].value); });
			fd.append('pref', prefV); fd.append('page', location.href);
			topics.forEach(function (t) { fd.append('topics[]', t); });
			tray.forEach(function (t) { fd.append('tray[]', t.name + (t.sub ? ' (' + t.sub + ')' : '')); });
			fetch(CFG.ajax, { method: 'POST', body: fd, credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (res) {
				if (!res || !res.success) throw new Error((res && res.data && res.data.msg) || '');
				var first = name.value.trim().split(' ')[0];
				var msg = String(c.done || '').replace('{name}', esc(first)).replace('{day}', '<b>' + esc(form.elements.day.value) + '</b>').replace('{time}', esc(form.elements.time.value.toLowerCase())).replace('{pref}', esc(prefV.toLowerCase()));
				var bring = (topics.length ? topics : Object.keys(c.bring || {}).slice(0, 1)).map(function (t) { return (c.bring || {})[t]; }).filter(Boolean);
				var done = $('[data-done]', el.querySelector('.book'));
				done.innerHTML = '<span class="ok">' + icon('check') + '</span><h3 class="h3">Thank you, ' + esc(first) + '.</h3><p>' + msg + '</p>' + (bring.length ? '<p style="font-weight:700;color:var(--ink);margin-top:6px">What to bring</p><ul>' + bring.map(function (b) { return '<li>' + icon('check') + esc(b) + '</li>'; }).join('') + '</ul>' : '') + (CFG.maps ? '<div class="visit-btns"><a class="btn btn-ink btn-sm" href="' + esc(CFG.maps) + '" target="_blank" rel="noopener">Get directions</a></div>' : '');
				form.hidden = true; done.hidden = false; done.focus();
			}).catch(function (er) {
				btn.disabled = false; btn.innerHTML = label;
				err.textContent = (er && er.message) || T.error || 'Sorry, that didn\'t send.'; err.hidden = false;
			});
		});
	};

	INIT.footer = function (el) {
		var f = $('[data-news]', el);
		if (!f) return;
		f.addEventListener('submit', function (e) {
			e.preventDefault();
			var i = f.elements.email, b = f.querySelector('button');
			if (!/.+@.+\..+/.test(i.value)) { i.focus(); toast(T.badEmail || 'Please enter a valid email address.'); return; }
			b.disabled = true;
			var fd = new FormData();
			fd.append('action', 'wk_news'); fd.append('nonce', CFG.nonce || ''); fd.append('email', i.value); fd.append('page', location.href); fd.append('website', f.elements.website ? f.elements.website.value : '');
			fetch(CFG.ajax, { method: 'POST', body: fd, credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (res) {
				if (!res || !res.success) throw new Error((res && res.data && res.data.msg) || '');
				b.textContent = T.subscribed || 'Subscribed';
			}).catch(function (er) { b.disabled = false; toast((er && er.message) || T.error || 'Sorry, that didn\'t send.'); });
		});
	};

	/* ================= Boot ================= */
	function boot(root) {
		root = root || document;
		var list = root.matches && root.matches('.wk[data-wk]') ? [root] : $$('.wk[data-wk]', root);
		if (root !== document && root.closest) { var up = root.closest('.wk[data-wk]'); if (up && list.indexOf(up) < 0) list.push(up); }
		list.forEach(function (el) {
			if (el.__wk) return;
			el.__wk = 1;
			fillArt(el);
			applyHours(el);
			$$('.pv[data-autoplay]', el).forEach(function (box) { new IntersectionObserver(function (es) { playIn(box, es[0].isIntersecting); }, { threshold: 0.35 }).observe(box); });
			var fn = INIT[el.dataset.wk];
			if (fn) { try { fn(el, cfgOf(el)); } catch (e) { if (window.console) console.error('[wulf-kit]', el.dataset.wk, e); } }
		});
		if (document.querySelector('.wk[data-wk]') || CFG.actbar) ensurePortal();
		reveal(root);
	}

	/* ================= Calmer look: sections ease in as they scroll into view ================= */
	var RV = '.shead, .cats > *, .prow-head, .prow, .vals > li, .svc, .split-copy, .split-fig, .spot-stage, .craft-grid, .studio-card, .st-grid, .cs-grid, .visit, .lists > div, .steps > li, .faq-list, .cta-box';
	var rvIO = null;
	function reveal(root) {
		if (reduce || !document.body.classList.contains('wk-calm') || document.body.classList.contains('elementor-editor-active') || !('IntersectionObserver' in window)) return;
		rvIO = rvIO || new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rvIO.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
		$$('.wk:not(.wk-hero):not(.wk-header):not(.wk-announce):not(.wk-footer):not(.wk-portal)', root.nodeType === 9 ? root : root.ownerDocument).forEach(function (w) {
			$$(RV, w).forEach(function (n) {
				if (n.classList.contains('wk-rv') || n.closest('.wk-rv')) return;
				var r = n.getBoundingClientRect();
				if (r.top < innerHeight * 0.92) return; // already on screen: leave it be
				var sib = n.parentNode ? [].indexOf.call(n.parentNode.children, n) : 0;
				n.style.setProperty('--rv-d', Math.min(sib, 5) * 70 + 'ms');
				n.classList.add('wk-rv'); rvIO.observe(n);
			});
		});
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { boot(document); });
	else boot(document);
	if (window.jQuery) {
		window.jQuery(window).on('elementor/frontend/init', function () {
			if (window.elementorFrontend && window.elementorFrontend.hooks) {
				window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) { boot($scope[0]); });
			}
		});
	}
	window.WulfKit = { boot: boot, ringSVG: ringSVG, openTray: openDrawer };
})();
