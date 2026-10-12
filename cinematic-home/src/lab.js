import { createEngine, defaults, TIERS } from './engine.js';

// Look-dev page: render any state on demand (used by the still renders).
const canvas = document.getElementById( 'c' );
const q = new URLSearchParams( location.search );
const tier = TIERS[ q.get( 'tier' ) || 'high' ];
const engine = createEngine( canvas, { tier, preserve: true } );
const w = Number( q.get( 'w' ) || 1280 );
const h = Number( q.get( 'h' ) || 800 );
engine.resize( w, h, Number( q.get( 'dpr' ) || 1 ) );
window.__lab = {
	render( patch, time = 0 ) {
		const S = Object.assign( defaults(), patch );
		const t0 = performance.now();
		engine.render( S, time );
		engine.renderer.getContext().finish();
		return performance.now() - t0;
	},
};
window.__ready = true;
