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
		var a = CFG.act || ['Call', 'Book a free consultation', 'Directions'];
		portal.innerHTML = '<div class="toast" role="status" hidden></div>' +
			(CFG.tray ? '<aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="wk-drawer-h" hidden><div class="dr-panel"><div class="dr-head"><h2 class="h3" id="wk-drawer-h">' + esc(T.trayTitle || 'Your tray') + '<span class="dr-count"></span></h2><button class="icon-btn" type="button" data-close aria-label="' + esc(T.close || 'Close') + '">' + icon('close') + '</button></div><p class="dr-sub">' + esc(T.traySub || '') + '</p><div class="dr-body"><ul class="dr-list"></ul><div class="dr-empty"><p>' + esc(T.trayEmpty || '') + '</p></div></div><div class="dr-foot" hidden><a class="btn btn-ink" href="' + esc(CFG.book || '#visit') + '" data-dr-book>' + esc(T.trayBook || 'Book to see them in person') + ' ' + icon('arr', 'arr') + '</a><button class="btn btn-line" type="button" data-dr-keep>' + esc(T.trayKeep || 'Keep browsing') + '</button><p class="fine">' + esc(T.trayNote || '') + '</p></div></div></aside>' : '') +
			// Call and Directions as round icons either side, so the booking button has room for its full words.
			(CFG.actbar ? '<nav class="actbar" aria-label="Quick actions" data-om-ai-lift>' + (CFG.tel ? '<a class="ab-ic" href="' + esc(CFG.tel) + '" title="' + esc(a[0]) + '">' + icon('phone') + '<span class="sr">' + esc(a[0]) + '</span></a>' : '') + '<a class="main" href="' + esc(CFG.book || '#visit') + '">' + esc(a[1]) + '<span class="count" data-count hidden>0</span></a>' + (CFG.maps ? '<a class="ab-ic" href="' + esc(CFG.maps) + '" target="_blank" rel="noopener" title="' + esc(a[2]) + '">' + icon('dir') + '<span class="sr">' + esc(a[2]) + '</span></a>' : '') + '</nav>' : '') +
			// Computers: a slim booking bar that stays on screen after the first screen.
			(CFG.pill ? '<div class="bkpill" role="region" aria-label="' + esc(a[1]) + '" data-om-ai-lift><span class="bp-status" data-wk-status><i></i><span data-status-text></span></span><a class="btn btn-gold bp-book" href="' + esc(CFG.book || '#visit') + '">' + esc(a[1]) + ' ' + icon('arr', 'arr') + '</a>' + (CFG.tel && CFG.phone ? '<a class="bp-call" href="' + esc(CFG.tel) + '">' + icon('phone') + esc(CFG.phone) + '</a>' : '') + '<button class="bp-x" type="button" aria-label="' + esc(T.hide || 'Hide') + '">' + icon('close') + '</button></div>' : '');
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
		var pill = $('.bkpill', portal);
		if (pill) {
			applyHours(pill);
			var pillOff = false; try { pillOff = sessionStorage.getItem('wkPillOff') === '1'; } catch (e) {}
			var pillTick = false, pillWide = window.matchMedia('(min-width: 861px)');
			var pillPlace = function () {
				pillTick = false;
				var hero = $('.wk-hero .hero'), seen = [$('.wk-visit .book'), $('.wk-footer'), $('.bkbar')];
				var past = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > innerHeight * 0.8;
				var near = seen.some(function (n) { if (!n) return false; var r = n.getBoundingClientRect(); return r.top < innerHeight - 30 && r.bottom > 0; });
				var on = !pillOff && pillWide.matches && past && !near && (!bk || bk.hidden) && (!drawer || drawer.hidden);
				pill.classList.toggle('on', on);
				document.body.classList.toggle('wk-pill-on', on);
			};
			var pillQueue = function () { if (!pillTick) { pillTick = true; requestAnimationFrame(pillPlace); } };
			addEventListener('scroll', pillQueue, { passive: true }); addEventListener('resize', pillQueue);
			document.addEventListener('wk:panel', pillQueue);
			$('.bp-x', pill).addEventListener('click', function () { pillOff = true; try { sessionStorage.setItem('wkPillOff', '1'); } catch (e) {} pillPlace(); });
			pillPlace();
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
		document.body.classList.add('wk-modal-open');
		$$('[data-wk-tray]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
		drawer.querySelector('[data-close]').focus();
	}
	function closeDrawer(back) {
		if (!drawer || drawer.hidden) return;
		drawer.classList.remove('open');
		$$('[data-wk-tray]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
		document.body.style.overflow = '';
		document.body.classList.remove('wk-modal-open');
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
		drawer.querySelector('[data-dr-book]').addEventListener('click', function () { closeDrawer(false); if (!CFG.panel) pickTopic('Engagement ring', true); });
		drawer.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') return closeDrawer(true);
			if (e.key !== 'Tab') return;
			var f = $$('a[href], button', drawer).filter(function (x) { return x.offsetParent !== null; }), first = f[0], last = f[f.length - 1];
			if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
		});
	}

	/* ================= Measuring: button clicks, booking steps and requests ================= */
	// Sent to the GA4 / Tag Manager / Meta pixel already on the site (Wulf Kit › Settings), and always
	// as a "wk:track" event on document for other tools. ?wk_debug_events=1 logs them in the console.
	var DEBUG = /[?&]wk_debug_events=1/.test(location.search);
	function track(name, params, meta) {
		if (document.body && document.body.classList.contains('elementor-editor-active')) return;
		params = params || {};
		try { document.dispatchEvent(new CustomEvent('wk:track', { detail: { name: name, params: params } })); } catch (e) {}
		if (!CFG.track) return;
		var sent = [];
		try {
			if (typeof window.gtag === 'function') { window.gtag('event', name, params); sent.push('GA4'); }
			if (window.google_tag_manager && window.dataLayer && window.dataLayer.push) { window.dataLayer.push(Object.assign({ event: name }, params)); sent.push('GTM'); }
			if (meta && typeof window.fbq === 'function') { window.fbq(meta[0], meta[1], meta[2] || {}); sent.push('Meta ' + meta[1]); }
		} catch (e) {}
		if (DEBUG && window.console) window.console.info('[Wulf event] ' + name + (sent.length ? ' → ' + sent.join(', ') : ' (no GA4 / GTM / Meta pixel on this page)'), params);
	}
	// Where a click came from, for reports: the section's widget ("hero", "spotlight", "header"…).
	var where = function (n) { var w = n.closest('.wk[data-wk]'); return w ? w.dataset.wk : (n.closest('.actbar') ? 'phone_bar' : (n.closest('.bkpill') ? 'booking_bar_desktop' : (n.closest('.drawer') ? 'tray' : 'page'))); };
	document.addEventListener('click', function (e) {
		var a = e.target.closest('a[href]');
		if (!a || !a.closest('.wk') || a.closest('.bk')) return;
		var href = a.getAttribute('href') || '', txt = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
		if (/^tel:/.test(href)) track('click_to_call', { cta_location: where(a), link_url: href }, ['trackCustom', 'ClickToCall']);
		else if (CFG.maps && href === CFG.maps) track('get_directions', { cta_location: where(a) }, ['trackCustom', 'GetDirections']);
		else if (a.classList.contains('btn') || a.closest('.actbar') || a.closest('[data-wk="paths"]')) track('cta_click', { cta_text: txt, cta_location: where(a), link_url: href });
	}, true);

	// "Drop a hint" (OM Catalog): a piece from its catalog link, in the metal on screen.
	var hintReady = function () { return !!(window.omHint && window.omHint.enabled && window.omHint.enabled()); };
	function hintItem(r, metal) {
		var m = /\/catalog\/([a-z0-9-]+)\/([^\/?#]+)/.exec(r && r.u || '');
		if (!m) return null;
		var x = (r.media || {})[metal] || {};
		var s; try { s = decodeURIComponent(m[2]); } catch (e) { s = m[2]; }
		return { l: m[1], s: s.replace(/~/g, '/'), t: r.n, i: x.poster || r.img, c: { white: 'White', yellow: 'Yellow', rose: 'Rose' }[metal] || '' };
	}

	// Phones: "See all hours" opens the week under today's row.
	document.addEventListener('click', function (e) {
		var b = e.target.closest('[data-hours-more]'); if (!b) return;
		var box = b.parentNode, open = !box.classList.contains('hours-open');
		box.classList.toggle('hours-open', open); b.setAttribute('aria-expanded', String(open));
		b.textContent = open ? (T.hoursLess || 'Show today only') : (T.hoursMore || 'See all hours');
	});

	/* ================= Booking panel: three short steps from any "Book" button ================= */
	var BK = CFG.bk || {}, bk = null, bkS = null, bkFrom = null, BRING = {};
	(BK.topics || []).forEach(function (t) { BRING[t[0]] = t[1] || ''; });
	var hshort = function (h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return (hh % 12 || 12) + (mm ? ':' + (mm < 10 ? '0' : '') + mm : ''); };
	function bkDays() {
		var out = [], c = new Date(NOW), guard = 0;
		while (out.length < 8 && guard++ < 30) { c.setDate(c.getDate() + 1); if (HRS[c.getDay()]) out.push(new Date(c)); }
		return out;
	}
	// Morning / midday / afternoon, cut to the chosen day's opening hours.
	function bkWindows(day) {
		var h = day ? HRS[day.getDay()] : null, o = h ? h[0] : 10, c = h ? h[1] : 18, out = [];
		[[T.bkMorning || 'Morning', o, 12], [T.bkMidday || 'Midday', 12, 15], [T.bkAfter || 'Afternoon', 15, c]].forEach(function (x) {
			var a = Math.max(x[1], o), b = Math.min(x[2], c);
			if (b - a >= 1) out.push({ n: x[0], a: a, b: b });
		});
		return out;
	}
	function bkTimes(day) {
		var box = $('[data-bk-times]', bk), w = bkWindows(day instanceof Date ? day : null);
		box.innerHTML = '<button class="opt" type="button" role="radio" aria-checked="true" data-w="-1">' + esc(T.bkAny || 'Any time') + '</button>' + w.map(function (x, i) { return '<button class="opt" type="button" role="radio" aria-checked="false" tabindex="-1" data-w="' + i + '">' + esc(x.n) + ' <small>' + hshort(x.a) + '–' + hshort(x.b) + '</small></button>'; }).join('');
		box._w = w; bkS.time = null;
	}
	function bkDayBtns() {
		var box = $('[data-bk-days]', bk), days = bkDays();
		box.innerHTML = days.map(function (d, i) { return '<button class="opt bk-day" type="button" role="radio" aria-checked="false"' + (i ? ' tabindex="-1"' : '') + ' data-d="' + i + '"><small>' + esc(d.toLocaleDateString(undefined, { weekday: 'short' })) + '</small>' + esc(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })) + '</button>'; }).join('') + '<button class="opt bk-day flex" type="button" role="radio" aria-checked="false" tabindex="-1" data-d="flex">' + esc(T.bkFlex || 'I\'m flexible') + '</button>';
		box._days = days; bkS.day = null;
		bkTimes(null);
	}
	function bkRadio(group, btn) {
		$$('[role=radio]', group).forEach(function (b) { var on = b === btn; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; });
	}
	function bkGo(n) {
		bkS.step = n;
		$$('.bk-step', bk).forEach(function (f) { f.hidden = +f.dataset.step !== n; });
		$('.bk-prog span', bk).style.width = Math.round(n / 3 * 100) + '%';
		$('[data-bk-count]', bk).textContent = fmt(T.bkStep || 'Step %1$d of %2$d', n, 3);
		$('[data-bk-back]', bk).hidden = n === 1;
		$('[data-bk-next]', bk).innerHTML = (n === 3 ? esc(T.bkSend || 'Request my visit') : esc(T.bkNext || 'Continue')) + ' ' + icon('arr', 'arr');
		$('[data-bk-err]', bk).hidden = true;
		if (n === 3) bkSum();
		var first = $('.bk-step[data-step="' + n + '"] input, .bk-step[data-step="' + n + '"] button', bk);
		if (first && bk.classList.contains('open')) first.focus({ preventScroll: true });
		$('.bk-form', bk).scrollTop = 0;
		track('booking_step', { step: n, cta_location: bkS.source || 'page' });
	}
	// The last step repeats what was chosen before it (in the panel or in a booking bar), with a way back to change it.
	function bkSum() {
		var box = $('[data-bk-sum]', bk), topics = $$('[data-bk-topic][aria-pressed=true]', bk).map(function (b) { return b.dataset.bkTopic; });
		var day = bkS.day instanceof Date ? bkS.day.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : (bkS.day === 'flex' ? (T.bkFlex || 'I\'m flexible') : '');
		var bits = topics.concat(day ? [day, bkS.time ? bkS.time.n + ' ' + hshort(bkS.time.a) + '–' + hshort(bkS.time.b) : (T.bkAny || 'Any time')] : []);
		box.hidden = !bits.length;
		box.innerHTML = bits.length ? '<p class="lbl">' + esc(T.bkYour || 'Your visit') + '</p><ul class="bk-sum-v">' + bits.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul><button class="bk-edit" type="button" data-bk-edit>' + esc(T.bkChange || 'Change') + '</button>' : '';
	}
	// A small picture for each topic, from its words.
	function bkIcon(t) {
		var m = [[/engag/i, 'ring'], [/wedding|band/i, 'bands'], [/custom|design|idea/i, 'pencil'], [/repair|resiz|clean|fix/i, 'tool'], [/apprais|insur/i, 'cert'], [/sell|buy|cash|gold|coin/i, 'cash'], [/financ|pay/i, 'calendar'], [/earring/i, 'ear'], [/gift/i, 'gift'], [/diamond|stone/i, 'gem']];
		for (var i = 0; i < m.length; i++) if (m[i][0].test(t)) return m[i][1];
		return 'spark';
	}
	function bkPiece() { var p = bkS.piece; return p && p.name ? p.name + (p.sub ? ' (' + p.sub + ')' : '') : ''; }
	function bkIcs(day, win) {
		var p = function (n) { return (n < 10 ? '0' : '') + n; };
		var ymd = function (d) { return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()); };
		var hm = function (h) { var hh = Math.floor(h); return p(hh) + p(Math.round((h - hh) * 60)) + '00'; };
		var e = function (t) { return String(t || '').replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n'); };
		var next = new Date(day); next.setDate(next.getDate() + 1);
		var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wulf Kit//Booking//EN', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@wulf-kit',
			'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, ''),
			win ? 'DTSTART:' + ymd(day) + 'T' + hm(win.a) : 'DTSTART;VALUE=DATE:' + ymd(day),
			win ? 'DTEND:' + ymd(day) + 'T' + hm(win.b) : 'DTEND;VALUE=DATE:' + ymd(next),
			'SUMMARY:' + e(fmt(T.bkCalTitle || 'Visit to %s', BK.name || '')), 'LOCATION:' + e(BK.addr), 'DESCRIPTION:' + e((BK.sub || '') + (CFG.phone ? ' ' + CFG.phone : '')),
			'END:VEVENT', 'END:VCALENDAR'];
		return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(L.join('\r\n'));
	}
	function bkSend() {
		var f = $('.bk-form', bk), name = f.elements.name, phone = f.elements.phone, err = $('[data-bk-err]', bk);
		var okN = name.value.trim().length > 1, okP = phone.value.replace(/\D/g, '').length >= 10;
		name.setAttribute('aria-invalid', String(!okN)); name.parentNode.querySelector('.err').hidden = okN;
		phone.setAttribute('aria-invalid', String(!okP)); phone.parentNode.querySelector('.err').hidden = okP;
		if (!okN) return name.focus();
		if (!okP) return phone.focus();
		var btn = $('[data-bk-next]', bk), label = btn.innerHTML;
		btn.disabled = true; btn.textContent = T.sending || 'Sending…'; err.hidden = true;
		var topics = $$('[data-bk-topic][aria-pressed=true]', bk).map(function (b) { return b.dataset.bkTopic; });
		var pref = (($$('[data-bk-pref] [aria-checked=true]', bk)[0] || {}).textContent || '').trim();
		var real = bkS.day instanceof Date;
		var dayTxt = real ? bkS.day.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : (T.bkFlex || 'I\'m flexible');
		var timeTxt = bkS.time ? bkS.time.n + ' (' + hshort(bkS.time.a) + '–' + hshort(bkS.time.b) + ')' : (T.bkAny || 'Any time');
		var fd = new FormData();
		fd.append('action', 'wk_book'); fd.append('nonce', CFG.nonce || '');
		['name', 'phone', 'email', 'website'].forEach(function (k) { if (f.elements[k]) fd.append(k, f.elements[k].value); });
		fd.append('pref', pref); fd.append('day', dayTxt); fd.append('time', timeTxt); fd.append('page', location.href);
		fd.append('piece', bkPiece()); fd.append('source', bkS.source || ''); fd.append('answers', bkS.answers || '');
		topics.forEach(function (t) { fd.append('topics[]', t); });
		tray.forEach(function (t) { fd.append('tray[]', t.name + (t.sub ? ' (' + t.sub + ')' : '')); });
		fetch(CFG.ajax, { method: 'POST', body: fd, credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (res) {
			if (!res || !res.success) throw new Error((res && res.data && res.data.msg) || '');
			var lead = { form_type: 'booking', cta_location: bkS.source || 'page', topic: topics.join(', ') };
			track('generate_lead', lead, ['track', 'Lead']);
			track('booking_request', lead, ['track', 'Schedule']);
			var first = name.value.trim().split(' ')[0];
			var msg = String(BK.done || '').replace('{name}', esc(first)).replace('{day}', '<b>' + esc(real ? dayTxt : (T.bkFlexDay || 'a day that suits you')) + '</b>').replace('{time}', esc(bkS.time ? bkS.time.n.toLowerCase() + ', ' + hshort(bkS.time.a) + '–' + hshort(bkS.time.b) : (T.bkAny || 'Any time').toLowerCase())).replace('{pref}', esc(pref.toLowerCase()));
			var bring = topics.map(function (t) { return BRING[t]; }).filter(Boolean);
			var done = $('[data-bk-done]', bk);
			done.innerHTML = '<span class="ok">' + icon('check') + '</span><h3 class="h3">' + esc(fmt(T.bkThanks || 'Thank you, %s.', first)) + '</h3>' + (msg ? '<p>' + msg + '</p>' : '') +
				(bring.length ? '<p class="bk-bring-h">' + esc(T.bkBring || 'What to bring') + '</p><ul class="bk-bring">' + bring.map(function (b) { return '<li>' + icon('check') + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
				'<div class="bk-done-btns">' + (real ? '<a class="btn btn-line btn-sm" download="wulf-visit.ics" href="' + bkIcs(bkS.day, bkS.time) + '">' + icon('calendar') + esc(T.bkCal || 'Add to my calendar') + '</a>' : '') +
				(CFG.maps ? '<a class="btn btn-line btn-sm" href="' + esc(CFG.maps) + '" target="_blank" rel="noopener">' + icon('dir') + esc(T.bkDir || 'Get directions') + '</a>' : '') +
				'<button class="btn btn-ink btn-sm" type="button" data-close>' + esc(T.bkDone || 'Done') + '</button></div>';
			f.hidden = true; $('.bk-prog', bk).hidden = true; done.hidden = false; done.focus();
			btn.disabled = false; btn.innerHTML = label;
		}).catch(function (er) {
			btn.disabled = false; btn.innerHTML = label;
			err.textContent = (er && er.message) || T.error || 'Sorry, that didn\'t send. Please call us instead.'; err.hidden = false;
		});
	}
	function bkBuild() {
		bk = document.createElement('div');
		var pop = BK.style !== 'drawer';
		bk.className = 'bk' + (pop ? ' pop' : ''); bk.hidden = true;
		bk.setAttribute('role', 'dialog'); bk.setAttribute('aria-modal', 'true'); bk.setAttribute('aria-labelledby', 'wk-bk-h');
		var tel = CFG.tel && CFG.phone ? '<a href="' + esc(CFG.tel) + '">' + esc(CFG.phone) + '</a>' : '';
		// Popup: a showroom picture beside the form on wide screens, with where we are, today's hours and a few promises.
		var aside = pop ? '<aside class="bk-aside">' + (BK.img ? '<img src="' + esc(BK.img) + '" alt="" loading="lazy" decoding="async">' : '') + '<div class="bk-aside-in">' +
			(BK.name ? '<p class="bk-aside-n">' + esc(BK.name) + '</p>' : '') + (BK.addr ? '<p class="bk-aside-a">' + icon('pin') + esc(BK.addr) + '</p>' : '') +
			'<p class="bk-aside-s" data-wk-status><i></i><span data-status-text></span></p>' +
			((BK.points || []).length ? '<ul class="bk-pts">' + BK.points.map(function (x) { return '<li>' + icon('check') + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</div></aside>' : '';
		bk.innerHTML = '<div class="bk-panel">' + aside + '<div class="bk-main">' +
			'<div class="bk-head"><div><p class="bk-eye">' + esc(T.bkEyebrow || 'Free consultation') + '</p><h2 class="h3" id="wk-bk-h">' + esc(BK.title || 'Book your free consultation') + '</h2>' + (BK.sub ? '<p class="bk-sub">' + esc(BK.sub) + '</p>' : '') + '</div><button class="icon-btn" type="button" data-close aria-label="' + esc(T.close || 'Close') + '">' + icon('close') + '</button></div>' +
			'<div class="bk-prog" aria-hidden="true"><span></span></div>' +
			'<form class="bk-form" novalidate>' +
			'<p class="bk-count" data-bk-count aria-live="polite"></p>' +
			'<div class="bk-ctx" data-bk-ctx hidden></div>' +
			'<fieldset class="bk-step" data-step="1"><legend class="h3">' + esc(T.bkQ1 || '') + '</legend><p class="bk-hint">' + esc(T.bkQ1s || '') + '</p><div class="bk-topics">' +
				(BK.topics || []).map(function (t) { return '<button class="opt" type="button" aria-pressed="false" data-bk-topic="' + esc(t[0]) + '"><span class="bk-ti">' + icon(bkIcon(t[0])) + '</span><span>' + esc(t[0]) + '</span></button>'; }).join('') + '</div></fieldset>' +
			'<fieldset class="bk-step" data-step="2" hidden><legend class="h3">' + esc(T.bkQ2 || '') + '</legend><p class="bk-hint">' + esc(T.bkQ2s || '') + '</p>' +
				'<p class="lbl" id="wk-bk-dl">' + esc(T.bkDay || 'Day') + '</p><div class="bk-days" role="radiogroup" aria-labelledby="wk-bk-dl" data-bk-days></div>' +
				'<p class="lbl" id="wk-bk-tl">' + esc(T.bkTime || 'Time of day') + '</p><div class="bk-times" role="radiogroup" aria-labelledby="wk-bk-tl" data-bk-times></div>' +
				'<p class="err" data-bk-dayerr hidden>' + esc(T.bkNeedDay || '') + '</p></fieldset>' +
			'<fieldset class="bk-step" data-step="3" hidden><legend class="h3">' + esc(T.bkQ3 || '') + '</legend><p class="bk-hint">' + esc(T.bkQ3s || '') + '</p>' +
				'<div class="bk-sum" data-bk-sum hidden></div>' +
				'<div class="bk-row"><div class="field"><label for="wk-bk-name">' + esc(T.bkName || 'Name') + '</label><input id="wk-bk-name" name="name" autocomplete="name"><span class="err" hidden>' + esc(T.bkNeedName || '') + '</span></div>' +
				'<div class="field"><label for="wk-bk-phone">' + esc(T.bkPhone || 'Mobile') + '</label><input id="wk-bk-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(219) 000-0000"><span class="err" hidden>' + esc(T.bkNeedTel || '') + '</span></div></div>' +
				'<div class="field"><label for="wk-bk-email">' + esc(T.bkEmail || 'Email') + ' <span>' + esc(T.bkOpt || '(optional)') + '</span></label><input id="wk-bk-email" name="email" type="email" autocomplete="email"></div>' +
				'<div class="field"><p class="lbl" id="wk-bk-pl">' + esc(T.bkPref || 'Best way to reach you') + '</p><div class="chips" role="radiogroup" aria-labelledby="wk-bk-pl" data-bk-pref>' +
					[T.bkCall || 'Call', T.bkText || 'Text', T.bkEmail || 'Email'].map(function (x, i) { return '<button class="opt" type="button" role="radio" aria-checked="' + (i === 1) + '"' + (i === 1 ? '' : ' tabindex="-1"') + '>' + esc(x) + '</button>'; }).join('') + '</div></div>' +
				'<input type="text" name="website" tabindex="-1" autocomplete="off" class="sr" aria-hidden="true"></fieldset>' +
			'<p class="err" data-bk-err role="alert" hidden></p>' +
			(tel ? '<p class="bk-call">' + fmt(esc(T.bkOrCall || 'Prefer to talk? Call %s'), tel) + '</p>' : '') +
			'<div class="bk-nav"><button class="btn btn-line" type="button" data-bk-back>' + icon('left') + '<span>' + esc(T.bkBack || 'Back') + '</span></button><button class="btn btn-gold" type="submit" data-bk-next></button></div>' +
			'</form><div class="bk-done" data-bk-done hidden tabindex="-1"></div></div></div>';
		ensurePortal().appendChild(bk);
		if (pop) applyHours(bk);
		var form = $('.bk-form', bk);
		bk.addEventListener('click', function (e) {
			if (e.target === bk || e.target.closest('[data-close]')) return bookClose();
			var t = e.target.closest('[data-bk-topic]');
			if (t) return t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true'));
			var d = e.target.closest('[data-d]');
			if (d) {
				bkRadio(d.parentNode, d); $('[data-bk-dayerr]', bk).hidden = true;
				bkS.day = d.dataset.d === 'flex' ? 'flex' : d.parentNode._days[+d.dataset.d];
				return bkTimes(bkS.day);
			}
			var w = e.target.closest('[data-w]');
			if (w) { bkRadio(w.parentNode, w); var ws = w.parentNode._w || []; bkS.time = +w.dataset.w >= 0 ? ws[+w.dataset.w] : null; return; }
			var pr = e.target.closest('[data-bk-pref] .opt');
			if (pr) return bkRadio(pr.parentNode, pr);
			if (e.target.closest('[data-bk-back]')) return bkGo(Math.max(1, bkS.step - 1));
			if (e.target.closest('[data-bk-edit]')) return bkGo(1);
		});
		// A fixed field loses its error as soon as it's valid.
		form.addEventListener('input', function (e) {
			var x = e.target; if (x.getAttribute('aria-invalid') !== 'true') return;
			var ok = x.name === 'phone' ? x.value.replace(/\D/g, '').length >= 10 : x.value.trim().length > 1;
			if (ok) { x.setAttribute('aria-invalid', 'false'); var er = x.parentNode.querySelector('.err'); if (er) er.hidden = true; }
		});
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			if (bkS.step === 2 && !bkS.day) { var de = $('[data-bk-dayerr]', bk); de.hidden = false; var fd0 = $('[data-d]', bk); if (fd0) fd0.focus(); return; }
			if (bkS.step < 3) return bkGo(bkS.step + 1);
			bkSend();
		});
		bk.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') return bookClose();
			var g = e.target.closest('[role=radiogroup]'), k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
			if (g && k) {
				e.preventDefault();
				var r = $$('[role=radio]', g), i = (r.indexOf(e.target) + k + r.length) % r.length;
				r[i].focus(); r[i].click(); return;
			}
			if (e.key !== 'Tab') return;
			var f = $$('a[href], button, input, [tabindex="0"]', bk).filter(function (x) { return x.offsetParent !== null && !x.disabled && x.tabIndex >= 0; }), first = f[0], last = f[f.length - 1];
			if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
		});
	}
	// opts: { topic, piece: { name, sub, img }, answers (e.g. the ring style quiz), source }
	function bookOpen(opts) {
		opts = opts || {};
		if (!bk) bkBuild();
		bkFrom = document.activeElement;
		bkS = { step: 1, day: null, time: null, piece: opts.piece || null, answers: opts.answers || '', source: opts.source || '' };
		var known = opts.topic && BRING.hasOwnProperty(opts.topic);
		$$('[data-bk-topic]', bk).forEach(function (b) { b.setAttribute('aria-pressed', String(!!known && b.dataset.bkTopic === opts.topic)); });
		var items = [];
		if (bkS.piece && bkS.piece.name) items.push(bkS.piece);
		tray.forEach(function (t) { if (!items.some(function (x) { return (x.key && x.key === t.key) || x.name === t.name; })) items.push(t); });
		var ctx = $('[data-bk-ctx]', bk);
		ctx.hidden = !items.length;
		ctx.innerHTML = items.length ? '<p class="lbl">' + esc(bkS.piece && bkS.piece.name ? (T.bkLooking || 'You\'re asking about') : fmt(items.length === 1 ? (T.pieces || 'Your tray · %d piece') : (T.piecesN || 'Your tray · %d pieces'), items.length)) + '</p><ul>' +
			items.slice(0, 3).map(function (t) { return '<li>' + (t.img ? '<img src="' + esc(t.img) + '" alt="">' : '') + '<span><b>' + esc(t.name) + '</b>' + (t.sub ? '<small>' + esc(t.sub) + '</small>' : '') + '</span></li>'; }).join('') + '</ul>' : '';
		bkDayBtns();
		if (opts.day !== undefined && opts.day !== '') {
			var db = $('[data-d="' + (opts.day === 'flex' ? 'flex' : +opts.day) + '"]', bk);
			if (db) { bkRadio(db.parentNode, db); bkS.day = opts.day === 'flex' ? 'flex' : db.parentNode._days[+opts.day]; bkTimes(bkS.day); }
		}
		$('[data-bk-done]', bk).hidden = true; $('.bk-form', bk).hidden = false; $('.bk-prog', bk).hidden = false;
		$$('.bk [aria-invalid]').forEach(function (x) { x.removeAttribute('aria-invalid'); });
		$$('.bk .field .err, [data-bk-dayerr]').forEach(function (x) { x.hidden = true; });
		if (toastEl) { toastEl.hidden = true; clearTimeout(toastT); }
		bk.hidden = false;
		document.body.style.overflow = 'hidden';
		document.body.classList.add('wk-modal-open');
		document.dispatchEvent(new CustomEvent('wk:panel'));
		track('booking_open', { cta_location: bkS.source || 'page', topic: known ? opts.topic : '' }, ['trackCustom', 'BookingOpen']);
		bkGo(known ? (bkS.day ? 3 : 2) : 1);
		requestAnimationFrame(function () { requestAnimationFrame(function () {
			bk.classList.add('open');
			var first = $('.bk-step:not([hidden]) button, .bk-step:not([hidden]) input', bk); if (first) first.focus({ preventScroll: true });
		}); });
	}
	function bookClose() {
		if (!bk || bk.hidden) return;
		bk.classList.remove('open');
		document.body.style.overflow = '';
		document.body.classList.remove('wk-modal-open');
		setTimeout(function () { bk.hidden = true; document.dispatchEvent(new CustomEvent('wk:panel')); }, reduce ? 0 : 380);
		if (bkFrom && bkFrom.focus && document.contains(bkFrom)) bkFrom.focus({ preventScroll: true });
	}
	window.wkBook = bookOpen;

	/* ================= 360° videos turn at a relaxed pace (Wulf Kit › Settings) ================= */
	var TURN = +CFG.turn || 0.6;
	var slow = function (e) { var v = e.target; if (v && v.tagName === 'VIDEO' && v.closest && v.closest('.sc-item.pr, .slot.pv, .spot-ring, .preview .main, .qz-art, .sc-media, .cta-piece, .hm-piece') && Math.abs(v.playbackRate - TURN) > 0.01) { v.defaultPlaybackRate = TURN; v.playbackRate = TURN; } };
	document.addEventListener('loadedmetadata', slow, true);
	document.addEventListener('play', slow, true);

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
		// "Book" links open the booking panel; without it they stay on this page when it has its own
		// visit form, otherwise carry the topic to the page that does.
		var v = e.target.closest('a[href*="#visit"], a[href$="#book"], [data-wk-book]');
		if (!v || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || document.body.classList.contains('elementor-editor-active')) return;
		if (CFG.panel) {
			e.preventDefault();
			var w = v.closest('.wk[data-wk]'), ctx = w && w.wkContext ? w.wkContext() : null;
			bookOpen({ topic: v.dataset.topic || v.dataset.wkBook || (ctx && ctx.topic) || '', piece: ctx && ctx.piece, answers: ctx && ctx.answers, source: where(v) });
			return;
		}
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
		var shown = function (n) { return !!(n && n.getClientRects().length); };
		// Phones with the small ring: only the film that is actually on screen loads.
		var mini = $('.hero-mini', el), mv = mini && mini.querySelector('video');
		if (mv && shown(mini) && !reduce) { mv.src = mv.dataset.src; var mp = mv.play(); if (mp && mp.then) mp.then(function () { mini.classList.add('playing'); }, function () {}); }
		var first = $('video[data-first]', el);
		if (first && shown(media)) { first.src = first.dataset.src; if (!reduce) { var fp = first.play(); if (fp && fp.catch) fp.catch(function () {}); } }
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
		var tick = function () { clearTimeout(timer); if (!el.isConnected || !shown(media)) return; if (!reduce && !paused && !document.hidden && c.interval > 0) timer = setTimeout(function () { show((cur + 1) % items.length); tick(); }, c.interval * 1000); };
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
			caption(); show(); flash(ring); syncSave();
			// On a phone the large frame may be above the cards: bring it back into view.
			var rr = ring.getBoundingClientRect(); if (rr.bottom < 80 || rr.top > innerHeight - 80) ring.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
		});
		// Heart: save the ring on screen, in the metal shown, to the tray.
		var saveBtn = $('[data-spot-save]', el);
		var sKey = function () { var it = items[cur]; return 'sp-' + (it.id || it.n) + '-' + metal; };
		var sItem = function () { var it = items[cur], x = it.media[metal] || {}; return { key: sKey(), name: it.n, sub: (names[metal] || '') + (it.id ? ' · style ' + it.id : '') + (it.p ? ' · from ' + it.p : ''), img: x.poster || it.img }; };
		function syncSave() {
			if (!saveBtn) return;
			var on = inTray(sKey());
			saveBtn.setAttribute('aria-pressed', String(on));
			saveBtn.setAttribute('aria-label', (on ? (T.remove || 'Remove') + ' ' : (T.addTray || 'Add to my tray') + ': ') + items[cur].n);
		}
		if (saveBtn) {
			saveBtn.addEventListener('click', function () { if (inTray(sKey())) return removeTray(sKey()); var m = $$('video, img', ring); addTray(sItem(), m[m.length - 1]); });
			document.addEventListener('wk:tray', syncSave);
			mBox.addEventListener('click', function () { setTimeout(syncSave, 0); });
			mBox.addEventListener('keydown', function () { setTimeout(syncSave, 0); });
			syncSave();
		}
		// "Book" from here carries the ring on screen into the booking panel.
		el.wkContext = function () { var it = items[cur], x = it.media[metal] || it.media[Object.keys(it.media)[0]] || {}; return { piece: { name: it.n, sub: names[metal] || '', img: x.poster || it.img } }; };
		// "Drop a hint": the ring on screen, in its metal, when it has a catalog page.
		var hintBtn = $('[data-wk-hint]', el);
		var syncHint = function () { if (hintBtn) hintBtn.hidden = !(hintReady() && hintItem(items[cur], metal)); };
		if (hintBtn) {
			hintBtn.addEventListener('click', function () { var it = hintItem(items[cur], metal); if (it && hintReady()) window.omHint.open({ items: [it], from: 'spotlight' }); });
			if (pick) pick.addEventListener('click', function () { setTimeout(syncHint, 0); });
			mBox.addEventListener('click', function () { setTimeout(syncHint, 0); });
			syncHint();
		}
		// The film loads once the section comes near, and plays only while on screen.
		new IntersectionObserver(function (es) { var v = ring.querySelector('video'); if (!v) return; if (es[0].isIntersecting) { if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; if (reduce) return; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }, { rootMargin: '250px 0px' }).observe(ring);
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
		var last = '', near = false;
		// The turning film only loads once the designer itself comes near (not while it is folded into the phone card).
		new IntersectionObserver(function (es, o) { if (!es[0].isIntersecting) return; o.disconnect(); near = true; last = ''; draw(); }, { rootMargin: '300px 0px' }).observe($('.studio-card', el) || el);
		// Phones, "short card" mode: open the designer in place, from its button or any "Design your ring" link.
		var sec = $('.st-phone-card', el), openBtn = $('[data-studio-open]', el);
		var folded = function () { return sec && !sec.classList.contains('st-open') && openBtn && openBtn.getClientRects().length; };
		var unfold = function () {
			sec.classList.add('st-open'); openBtn.setAttribute('aria-expanded', 'true');
			track('studio_open', { cta_location: 'studio' });
			var card = $('.studio-card', el); if (card) card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
			var first = $('[data-ctl] [aria-checked="true"], [data-ctl] .opt', el); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, reduce ? 0 : 450);
		};
		if (openBtn) openBtn.addEventListener('click', unfold);
		if (sec) document.addEventListener('click', function (e) {
			var a = e.target.closest('a[href$="#studio"]'); if (!a || !folded()) return;
			e.preventDefault(); unfold();
		});
		var syncSave = function () {
			if (!saveBtn) return;
			var on = inTray(key());
			saveBtn.setAttribute('aria-pressed', String(on));
			saveBtn.innerHTML = on ? icon('check', 'arr') + esc(T.onTray || 'On your tray') : esc(c.save || T.addTray || 'Add to my tray');
		};
		document.addEventListener('wk:tray', syncSave);
		function draw() {
			var r = pick(), ct = carats[st.carat], fc = Math.cbrt(ct), sh = SH[st.shape] || SH.round, md = media(r), has = !!r.media[st.metal];
			var pv = main.closest('.preview'); if (pv) pv.dataset.metal = st.metal;
			if (st.pid + st.metal !== last) {
				last = st.pid + st.metal;
				swapEl(main, md.v && near ? '<video muted loop playsinline' + (reduce ? '' : ' autoplay') + ' preload="auto"' + (md.poster ? ' poster="' + esc(md.poster) + '"' : '') + ' src="' + esc(md.v) + '" aria-label="' + esc(r.n) + '"></video>' : '<img src="' + esc(md.poster || r.img) + '" alt="' + esc(r.n) + '">');
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
		el.wkContext = function () {
			var r = pick(), md = media(r);
			return { topic: 'Engagement ring', piece: { key: key(), name: r.n + (r.id ? ' · Style ' + r.id : ''), sub: MCOL[st.metal] + ' · ' + (SH[st.shape] || SH.round).n + ' · ' + carats[st.carat] + ' ct', img: md.poster || r.img } };
		};
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

	// Booking bar: topic + day here, name and number in the panel.
	INIT.bookbar = function (el, c) {
		var f = $('[data-bkbar]', el), sel = $('[data-bkbar-days]', el);
		if (!f || !sel) return;
		if (sel.options.length < 2) {
			bkDays().forEach(function (d, i) { sel.add(new Option(d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }), String(i))); });
			sel.add(new Option(c.flex || 'I\'m flexible', 'flex'));
		}
		f.addEventListener('submit', function (e) {
			e.preventDefault();
			var topic = f.elements.topic.value, day = sel.value;
			track('cta_click', { cta_text: 'booking bar', cta_location: 'bookbar', topic: topic });
			if (CFG.panel) return bookOpen({ topic: topic, day: day, source: 'bookbar' });
			var to = f.getAttribute('data-fallback') || '#visit';
			try { var u = new URL(to, location.href); if (topic) u.searchParams.set('topic', topic); location.href = u.toString(); } catch (er) { location.href = to; }
		});
	};

	/* Ring style quiz: four picture questions, then three matching rings. The drawing on the left
	   follows the answers; the top match then turns there in the chosen gold. */
	INIT.quiz = function (el, c) {
		var rings = c.rings || [], styles = c.styles || [], budgets = c.budgets || [], t = c.t || {}, names = c.names || {}, shapeN = c.shapes || {};
		var card = $('[data-qz-card]', el);
		if (!rings.length || !card) return;
		var art = $('[data-qz-art]', el), picksEl = $('[data-qz-picks]', el), res = $('[data-qz-res]', el), wait = $('[data-qz-wait]', el);
		var steps = $$('.qz-step', el), count = $('[data-qz-count]', el), bar = $('.qz-prog span', el), back = $('[data-qz-back]', el), top = $('.qz-top', el);
		var ORDER = ['shape', 'style', 'metal', 'budget'], A = {}, step = 1, started = false, matches = [], cur = 0, timer = 0;
		var SKEY = 'wkQuiz-' + (c.uid || ''), editor = document.body.classList.contains('elementor-editor-active');
		// Shapes that read alike, for when nothing in the list has the exact one.
		var NEAR = { round: ['cushion', 'oval'], oval: ['pear', 'cushion'], cushion: ['round', 'oval'], emerald: ['radiant', 'princess'], princess: ['radiant', 'emerald', 'cushion'], pear: ['oval', 'marquise'], marquise: ['oval', 'pear'], radiant: ['emerald', 'cushion'] };
		var an = function (w) { return (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w; };
		var styleN = function () { return A.style !== null && A.style !== '' && styles[+A.style] ? styles[+A.style].n : ''; };
		var same = function (a, b) { return String(a).toLowerCase() === String(b).toLowerCase(); };
		// Photographed or filmed in that gold (the product photos are white gold).
		var real = function (r, m) { var x = r.media[m]; return !!(x && (m === 'white' || (x.poster && x.poster !== r.img))); };
		var metalOf = function (r) { return A.metal && r.media[A.metal] ? A.metal : (r.media[r.m] ? r.m : (Object.keys(r.media)[0] || 'white')); };
		var mediaOf = function (r) { return r.media[metalOf(r)] || { v: '', poster: r.img }; };
		function clean(a) {
			a = a || {};
			A = { shape: null, style: null, metal: null, budget: null };
			if (a.shape === '' || shapeN[a.shape]) A.shape = a.shape;
			if (a.style === '' || (a.style != null && styles[+a.style])) A.style = a.style;
			if (a.metal === '' || names[a.metal]) A.metal = a.metal;
			if (a.budget === '' || (a.budget != null && budgets[+a.budget] !== undefined)) A.budget = a.budget;
		}
		function label(k) {
			var v = A[k], i = ORDER.indexOf(k);
			if (v === null || v === '') return (t.any || [])[i] || '';
			if (k === 'shape') return shapeN[v] || v;
			if (k === 'style') return styleN();
			if (k === 'metal') return names[v] || v;
			return budgets[+v] || '';
		}
		var summary = function () { return ORDER.map(label).filter(Boolean).join(' · '); };
		function score(r) {
			var s = 0, sn = styleN();
			if (A.shape) s += r.shape === A.shape ? 6 : ((NEAR[A.shape] || []).indexOf(r.shape) >= 0 ? 2 : 0);
			if (sn && same(r.style, sn)) s += 8;
			if (A.metal && real(r, A.metal)) s += 1;
			return s;
		}
		// Best first; with no setting chosen, three different styles to compare.
		function rank() {
			var list = rings.map(function (r, i) { return { r: r, i: i, s: score(r) }; }).sort(function (a, b) { return b.s - a.s || a.i - b.i; });
			var out = list.slice(0, 1), mix = !styleN();
			while (out.length < Math.min(3, list.length)) {
				var left = list.filter(function (x) { return out.indexOf(x) < 0; });
				out.push(left.filter(function (x) { return !mix || !out.some(function (o) { return same(o.r.style, x.r.style); }); })[0] || left[0]);
			}
			return out;
		}
		function drawArt() {
			card.dataset.metal = A.metal || 'white';
			if (step > 4) return;
			var st = styleN() ? styles[+A.style].art : 'solitaire';
			swapEl(art, ringSVG({ setting: st, metal: A.metal || 'white', shape: A.shape || 'round', carat: 1.25, label: '' }));
			art.classList.remove('is-media');
		}
		function picksDraw() {
			picksEl.innerHTML = ORDER.map(function (k, i) {
				return A[k] === null ? '' : '<li><button type="button" data-qz-go="' + (i + 1) + '">' + esc(label(k)) + '<span class="sr">, ' + esc(fmt(t.change || 'Change your %s answer', (t.q || [])[i] || k)) + '</span></button></li>';
			}).join('');
		}
		function save(done) { if (!editor) try { sessionStorage.setItem(SKEY, JSON.stringify({ a: A, d: !!done })); } catch (e) {} }
		function keepInView() {
			var r = card.getBoundingClientRect();
			if (r.top < 80) window.scrollTo({ top: window.scrollY + r.top - 90, behavior: reduce ? 'auto' : 'smooth' });
		}
		// The metal question shows one ring in each gold: the best match so far that we have in all three.
		function metalPics() {
			var imgs = $$('[data-qz-mimg]', el), best = null;
			rings.forEach(function (r, i) {
				var p = ['yellow', 'white', 'rose'].map(function (m) { var x = (r.media[m] || {}).poster || ''; return x === r.img ? '' : x; });
				if (!p[0] || !p[1] || !p[2] || p[0] === p[1] || p[1] === p[2] || p[0] === p[2]) return;
				var s = score(r); if (!best || s > best.s) best = { r: r, s: s };
			});
			if (best) imgs.forEach(function (im) { var u = best.r.media[im.dataset.qzMimg].poster; if (im.getAttribute('src') !== u) im.src = u; });
		}
		function gems() { var s = A.shape || 'round'; $$('[data-qz-gem]', el).forEach(function (g) { if (g.dataset.s !== s) { g.dataset.s = s; g.innerHTML = shapeIcon(s); } }); }
		function go(n, focus) {
			step = n; clearTimeout(timer);
			var done = n > 4;
			steps.forEach(function (f) { f.hidden = +f.dataset.step !== n; });
			res.hidden = !done; top.hidden = done; if (wait) wait.hidden = true;
			card.classList.toggle('qz-done', done); card.classList.remove('qz-busy');
			if (!done) {
				count.textContent = fmt(t.count || 'Question %1$d of %2$d', n, 4);
				bar.style.width = n * 25 + '%';
				back.hidden = n === 1;
				var f = steps[n - 1];
				$$('[data-a]', f).forEach(function (b) { b.setAttribute('aria-pressed', String(A[b.dataset.a] !== null && String(A[b.dataset.a]) === b.dataset.v)); });
				if (n === 3) metalPics();
				if (n === 4) gems();
				if (art.classList.contains('is-media')) drawArt();
				if (focus) { var lg = $('legend', f); if (lg) lg.focus({ preventScroll: true }); }
			}
			if (focus) keepInView();
		}
		function answer(k, v, btn) {
			var i = ORDER.indexOf(k);
			A[k] = v;
			$$('[data-a="' + k + '"]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === btn)); });
			if (!started) { started = true; track('quiz_start', { cta_location: 'quiz' }); }
			track('quiz_step', { step: i + 1, question: k, answer: v === '' ? 'not_sure' : label(k) });
			drawArt(); picksDraw(); save(false);
			var next = 0;
			for (var j = i + 1; j < 4 && !next; j++) if (A[ORDER[j]] === null) next = j + 1;
			for (j = 0; j < i && !next; j++) if (A[ORDER[j]] === null) next = j + 1;
			clearTimeout(timer);
			timer = setTimeout(function () { if (next) go(next, true); else finish(); }, reduce ? 0 : 280);
		}
		function finish() {
			steps.forEach(function (f) { f.hidden = true; }); top.hidden = true;
			if (reduce || !wait) return results(false);
			wait.hidden = false; card.classList.add('qz-busy');
			timer = setTimeout(function () { results(false); }, 700);
		}
		function results(quiet) {
			matches = rank();
			go(5, false);
			$('[data-qz-alts]', el).innerHTML = matches.map(function (x, j) {
				var md = mediaOf(x.r), u = md.poster || x.r.img;
				return '<button type="button" aria-pressed="' + (j === 0) + '" data-qz-i="' + j + '"><span class="qz-alt-img"><img' + (u !== x.r.img ? ' class="v0"' : '') + ' src="' + esc(u) + '" alt="" loading="lazy" decoding="async"></span><span class="qz-alt-n">' + esc(x.r.n) + '</span>' + (x.r.p ? '<span class="qz-alt-p">' + esc(fmt(t.from || 'Setting from %s', x.r.p)) + '</span>' : '') + '</button>';
			}).join('');
			var bl = $('[data-qz-budget]', el), bv = A.budget !== null && A.budget !== '' ? budgets[+A.budget] || '' : '';
			bl.hidden = !bv;
			bl.innerHTML = bv ? fmt(esc(t.budgetIs || 'Your budget: %s.'), '<b>' + esc(bv) + '</b>') + ' ' + esc(t.budget || '') : '';
			show(0);
			save(true);
			syncHint();
			if (quiet) return;
			track('quiz_complete', { cta_location: 'quiz', shape: A.shape || 'not_sure', style: styleN() || 'mix', metal: A.metal || 'not_sure', budget: bv || 'not_sure', top_match: matches[0].r.id || matches[0].r.n });
			var nm = $('[data-qz-name]', el); if (nm) nm.focus({ preventScroll: true });
			keepInView();
		}
		function show(j, user) {
			cur = j;
			var r = matches[j].r, m = metalOf(r), md = mediaOf(r), sn = styleN(), notes = [];
			$('[data-qz-lbl]', el).textContent = j === 0 ? (t.top || 'Your top match') : (t.also || 'Also a match for you');
			$('[data-qz-name]', el).textContent = r.n;
			$('[data-qz-meta]', el).innerHTML = [r.p ? esc(fmt(t.from || 'Setting from %s', r.p)) : '', r.id ? esc(fmt(t.style || 'Style %s', r.id)) : ''].filter(Boolean).join(' · ') +
				(r.u && t.see ? ' <a href="' + esc(r.u) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(t.see) + ' ' + icon('arr') + '</a>' : '');
			$('[data-qz-why]', el).innerHTML = [
				[fmt(t.diamond || '%s diamond', shapeN[r.shape] || r.shape), !!A.shape && r.shape === A.shape],
				[r.style, !!sn && same(r.style, sn)],
				[names[m] || m, !!A.metal && m === A.metal]
			].filter(function (w) { return w[0]; }).map(function (w) { return '<li' + (w[1] ? ' class="on"' : '') + '>' + (w[1] ? icon('check') : '') + esc(w[0]) + '</li>'; }).join('');
			// Honest notes when the photo isn't exactly what they chose.
			if (A.shape && r.shape !== A.shape) notes.push(fmt(t.shapeNote || 'Shown with %1$s diamond. Ask us about this style with %2$s diamond.', an((shapeN[r.shape] || r.shape).toLowerCase()), an((shapeN[A.shape] || A.shape).toLowerCase())));
			if (A.metal && m !== A.metal) notes.push(fmt(t.metalNote || 'Shown in %1$s. Ask us about %2$s.', (names[m] || m).toLowerCase(), (names[A.metal] || A.metal).toLowerCase()));
			var nt = $('[data-qz-note]', el); nt.hidden = !notes.length; nt.textContent = notes.join(' ');
			$$('[data-qz-i]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.qzI === j)); });
			card.dataset.metal = m;
			swapEl(art, md.v && !reduce ? '<video muted loop playsinline autoplay preload="auto"' + (md.poster ? ' poster="' + esc(md.poster) + '"' : '') + ' src="' + esc(md.v) + '"></video>' : '<img src="' + esc(md.poster || r.img) + '" alt="">');
			art.classList.add('is-media');
			art.classList.toggle('is-photo', !md.v && (md.poster || r.img) === r.img);
			var v = art.lastElementChild; if (v && v.play) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
			if (user) { flash(art); var rr = art.getBoundingClientRect(); if (rr.bottom < 80) art.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
		}
		function trayItem(r) { var m = metalOf(r), md = mediaOf(r); return { key: 'sp-' + (r.id || r.n) + '-' + m, name: r.n, sub: (names[m] || '') + (r.id ? ' · style ' + r.id : '') + (r.p ? ' · from ' + r.p : ''), img: md.poster || r.img }; }
		// "Drop a hint": the three matches, each in the gold shown.
		var hintBtn = $('[data-wk-hint]', el);
		var hintList = function () { return matches.map(function (x) { return hintItem(x.r, metalOf(x.r)); }).filter(Boolean); };
		function syncHint() { if (hintBtn) hintBtn.hidden = !(hintReady() && hintList().length); }
		if (hintBtn) hintBtn.addEventListener('click', function () { var list = hintList(); if (list.length && hintReady()) window.omHint.open({ items: list, from: 'quiz' }); });
		// "Book to try these on": the three rings go on the visitor's tray, so they're out for the visit.
		var bookBtn = $('[data-qz-book]', el);
		if (bookBtn) bookBtn.addEventListener('click', function () {
			if (!CFG.tray || !matches.length) return;
			var add = matches.map(function (x) { return trayItem(x.r); }).filter(function (it) { return !inTray(it.key); });
			if (add.length) { tray.push.apply(tray, add); saveTray(); renderTray(); }
		});
		el.wkContext = function () {
			if (!matches.length || step < 5) return { topic: 'Engagement ring' };
			var r = matches[cur].r, it = trayItem(r);
			return { topic: 'Engagement ring', piece: { key: it.key, name: r.n + (r.id ? ' · Style ' + r.id : ''), sub: names[metalOf(r)] || '', img: it.img }, answers: summary() };
		};
		// "Email me my matches"
		var mf = $('[data-qz-mail]', el), mOpen = $('[data-qz-mail-open]', el), sent = $('[data-qz-sent]', el);
		function mailReset() {
			if (!mf) return;
			mf.hidden = true; if (sent) sent.hidden = true;
			if (mOpen) { mOpen.hidden = false; mOpen.setAttribute('aria-expanded', 'false'); }
			$('[data-qz-err]', mf).hidden = true;
		}
		if (mf) mf.addEventListener('submit', function (e) {
			e.preventDefault();
			var i = mf.elements.email, err = $('[data-qz-err]', mf), btn = mf.querySelector('[type=submit]'), lbl = btn.innerHTML, em = i.value.trim();
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { err.textContent = T.badEmail || 'Please enter a valid email address.'; err.hidden = false; i.setAttribute('aria-invalid', 'true'); i.focus(); return; }
			i.removeAttribute('aria-invalid'); err.hidden = true;
			btn.disabled = true; btn.textContent = T.sending || 'Sending…';
			var doc = el.closest('[data-elementor-id]'), fd = new FormData();
			fd.append('action', 'wk_quiz'); fd.append('nonce', CFG.nonce || ''); fd.append('email', em); fd.append('website', mf.elements.website ? mf.elements.website.value : '');
			fd.append('doc', doc ? doc.getAttribute('data-elementor-id') : ''); fd.append('wid', c.uid || ''); fd.append('page', location.href);
			ORDER.forEach(function (k) { fd.append(k, A[k] === null ? '' : A[k]); });
			matches.forEach(function (x) { fd.append('picks[]', x.i); });
			fetch(CFG.ajax, { method: 'POST', body: fd, credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (rs) {
				if (!rs || !rs.success) throw new Error((rs && rs.data && rs.data.msg) || '');
				track('generate_lead', { form_type: 'quiz_email', cta_location: 'quiz' }, ['track', 'Lead']);
				mf.hidden = true; if (mOpen) mOpen.hidden = true;
				if (sent) { sent.innerHTML = icon('check') + '<span>' + esc(fmt(t.sent || 'Sent to %s.', em)) + '</span>'; sent.hidden = false; }
				btn.disabled = false; btn.innerHTML = lbl;
			}).catch(function (er) {
				btn.disabled = false; btn.innerHTML = lbl;
				err.textContent = (er && er.message) || T.error || 'Sorry, that didn\'t send. Please call us instead.'; err.hidden = false;
			});
		});
		function restart() {
			clean({}); matches = []; started = false; mailReset();
			try { sessionStorage.removeItem(SKEY); } catch (e) {}
			step = 1; drawArt(); picksDraw(); go(1, true);
		}
		el.addEventListener('click', function (e) {
			var b = e.target.closest('[data-a]');
			if (b) return answer(b.dataset.a, b.dataset.v, b);
			var g = e.target.closest('[data-qz-go]');
			if (g) return go(+g.dataset.qzGo, true);
			if (e.target.closest('[data-qz-back]')) return go(Math.max(1, step - 1), true);
			if (e.target.closest('[data-qz-again]')) return restart();
			var x = e.target.closest('[data-qz-i]');
			if (x) return +x.dataset.qzI === cur ? null : show(+x.dataset.qzI, true);
			if (e.target.closest('[data-qz-mail-open]') && mf) {
				var open = mf.hidden;
				mf.hidden = !open; mOpen.setAttribute('aria-expanded', String(open));
				if (open) { mf.elements.email.focus(); track('quiz_email_open', { cta_location: 'quiz' }); }
			}
		});
		// Back in the same visit (e.g. after looking at a ring in the catalog): the answers are still here.
		var saved = null;
		if (!editor) try { saved = JSON.parse(sessionStorage.getItem(SKEY) || 'null'); } catch (e) {}
		clean(saved && saved.a);
		started = ORDER.some(function (k) { return A[k] !== null; });
		drawArt(); picksDraw();
		if (saved && saved.d && ORDER.every(function (k) { return A[k] !== null; })) results(true);
		else { var first = 1; ORDER.some(function (k, i) { if (A[k] === null) { first = i + 1; return true; } }); go(first, false); }
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
			contrast(el);
			applyHours(el);
			$$('.pv[data-autoplay]', el).forEach(function (box) { new IntersectionObserver(function (es) { playIn(box, es[0].isIntersecting); }, { threshold: 0.35 }).observe(box); });
			$$('video[data-lazy]', el).forEach(function (v) { new IntersectionObserver(function (es) { if (es[0].isIntersecting) { if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; if (!reduce) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } } else v.pause(); }, { rootMargin: '250px 0px' }).observe(v); });
			var fn = INIT[el.dataset.wk];
			if (fn) { try { fn(el, cfgOf(el)); } catch (e) { if (window.console) console.error('[wulf-kit]', el.dataset.wk, e); } }
		});
		if (document.querySelector('.wk[data-wk]') || CFG.actbar) ensurePortal();
		reveal(root);
		if (root === document && CFG.panel && !boot.opened && (/[?&]book=1\b/.test(location.search) || location.hash === '#book')) {
			boot.opened = true;
			var qt0 = ''; try { qt0 = new URLSearchParams(location.search).get('topic') || ''; } catch (e) {}
			bookOpen({ topic: qt0, source: 'link' });
		}
	}

	/* ================= Readable text on any section background ================= */
	var rgb = function (s) { var m = String(s || '').match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
	var lum = function (c) { var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
	// The colour actually behind an element: its own, its gradient's first colour, or the first ancestor's.
	function bgBehind(node) {
		for (var n = node; n && n.nodeType === 1; n = n.parentElement) {
			var cs = getComputedStyle(n), img = cs.backgroundImage;
			if (img && img !== 'none') { if (/url\(/.test(img)) return 'photo'; var g = rgb(img); if (g && g.a > 0.5) return { c: g, own: n === node }; }
			var c = rgb(cs.backgroundColor); if (c && c.a > 0.5) return { c: c, own: n === node };
		}
		return { c: { r: 255, g: 255, b: 255, a: 1 }, own: false };
	}
	function contrast(el) {
		if (el.dataset.wk === 'hero') {
			var hs = $('.hero', el), hc = $('.hero-copy', el);
			if (!hs || !hc) return;
			hs.classList.remove('on-light');
			var hb = bgBehind(hc);
			if (hb !== 'photo') hs.classList.toggle('on-light', lum(hb.c) > 0.45);
			return;
		}
		$$(':scope > section, :scope > .sec', el).forEach(function (s) {
			if (s.classList.contains('txt-light') || s.classList.contains('txt-dark')) return;
			if (s.dataset.tone === undefined) s.dataset.tone = s.classList.contains('dark') ? 'dark' : '';
			// Judge the background without our own dark styling in the way.
			s.classList.remove('dark'); s.style.backgroundColor = '';
			var b = bgBehind(s);
			var dark = b === 'photo' ? s.dataset.tone === 'dark' : lum(b.c) < 0.36;
			if (s.dataset.tone === 'dark' && b !== 'photo' && !b.own) dark = true; // "Dark" background with no colour of its own set
			s.classList.toggle('dark', dark);
			s.classList.toggle('is-light', s.dataset.tone === 'dark' && !dark); // designed dark, but the background turned out light
			s.classList.toggle('acc-ink', !dark && b !== 'photo' && lum(b.c) < 0.7); // mid-tone light (e.g. gold): gold-ink small text would be too faint
			if (dark && b !== 'photo' && !b.own && s.dataset.tone !== 'dark') s.style.backgroundColor = 'transparent';
		});
		// Light cards inside a dark section (white product boxes, white panels) keep dark text; see-through ones don't.
		$$('.tile, .studio-card, .box, .rev, .cr-frame, .split-media, .pgh-media, .pgh-cap, .slot, .svc, .vals > li, .card, .post, .faq-item, .cta-box, .path, .faq-help, .bkbar, .qz-card', el).forEach(function (n) {
			var c = n.closest('.dark') ? rgb(getComputedStyle(n).backgroundColor) : null;
			n.classList.toggle('wk-isl', !!(c && c.a > 0.5 && lum(c) > 0.4));
		});
		// Spotlight "blend into the section": paint the ring's frame the exact section colour, the white film multiplies into it.
		$$('.spot.vb-section .spot-ring', el).forEach(function (r) {
			r.style.backgroundColor = '';
			if (r.closest('.spot').classList.contains('dark')) return;
			var b = bgBehind(r.parentElement);
			if (b !== 'photo') r.style.backgroundColor = 'rgb(' + b.c.r + ',' + b.c.g + ',' + b.c.b + ')';
		});
	}

	/* ================= Calmer look: sections ease in as they scroll into view ================= */
	var RV = '.shead, .cats > *, .paths > li, .vs-media, .vs-list > li, .prow-head, .prow, .vals > li, .svc, .split-copy, .split-fig, .spot-media, .spot-ctl, .craft-grid, .studio-card, .st-grid, .cs-grid, .visit, .lists > div, .steps > li, .faq-list, .cta-box';
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
