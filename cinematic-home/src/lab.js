import { N8AOPostPass } from 'n8ao';
import { createEngine, defaults, TIERS } from './engine.js';

// Look-dev page: render any state on demand (used by the still renders).
const canvas = document.getElementById( 'c' );
const q = new URLSearchParams( location.search );
const tier = Object.assign( {}, TIERS[ q.get( 'tier' ) || 'high' ] );
// Look-dev overrides: light paths inside the stones and what is left after the last one.
if ( q.has( 'bounces' ) ) {
	tier.bounces = Number( q.get( 'bounces' ) );
}
if ( q.has( 'tail' ) ) {
	tier.tail = Number( q.get( 'tail' ) );
}
const engine = createEngine( canvas, { tier, preserve: true, aoPass: N8AOPostPass } );
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
