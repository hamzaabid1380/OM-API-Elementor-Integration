// Render the still pictures the WordPress widget shows before the 3D starts (and
// instead of it where 3D cannot run): the first frame of each act, wide and tall.
// Needs a WordPress page with the three film acts (the kit's "Home (cinematic)"):
//   WP_URL=http://localhost:8089/home-cinematic/ node tools/wp-posters.mjs [opening|shapes|details]
import { launch } from './browser.mjs';
import { routeFonts } from './fonts.mjs';
import fs from 'fs';
import path from 'path';

const root = path.resolve( path.dirname( new URL( import.meta.url ).pathname ), '..' );
const out = path.join( root, '../wulf-elementor-kit/assets/media' );
const url = ( process.env.WP_URL || 'http://localhost:8089/home-cinematic/' ) + '?capture&tier=high';
const ACTS = { opening: 0, shapes: 4.6, details: 11.8 };
const only = process.argv[ 2 ];
// [suffix, stage width, stage height] in CSS pixels; the engine draws at 1.5x, so 1920x1038
// (a laptop or desktop screen below the header) and 900x1800 (a phone below the header).
// The pictures fill the stage edge to edge, so the closer their shape, the more exact the
// hand-over from picture to 3D.
const SIZES = [ [ '', 1280, 692 ], [ '-tall', 600, 1200 ] ];

const browser = await launch();
for ( const [ suffix, w, h ] of SIZES ) {
	const ctx = await browser.newContext( { viewport: { width: w, height: h + 80 }, deviceScaleFactor: 1 } );
	await routeFonts( ctx, root + '/fontcache' );
	const page = await ctx.newPage();
	page.on( 'pageerror', ( e ) => console.log( 'PAGEERROR', String( e ) ) );
	await page.goto( url, { waitUntil: 'load', timeout: 180000 } );
	await page.waitForFunction( () => window.__film, null, { timeout: 120000 } );
	await page.evaluate( () => window.__film.started );
	await page.waitForFunction( () => window.__film.ao(), null, { timeout: 120000 } ).catch( () => console.log( 'no contact shadows' ) );
	// Size the window so the stage (the screen below the site header) is exactly w x h.
	const stageH = () => page.evaluate( () => document.querySelector( '.film-act .film-stage' ).getBoundingClientRect().height );
	await page.setViewportSize( { width: w, height: Math.round( h + 80 + ( h - ( await stageH() ) ) ) } );
	await page.waitForTimeout( 600 );
	if ( Math.abs( ( await stageH() ) - h ) > 1 ) {
		console.log( 'stage is', await stageH(), 'not', h );
	}
	for ( const [ act, t ] of Object.entries( ACTS ) ) {
		if ( only && only !== act ) {
			continue;
		}
		const t0 = Date.now();
		const data = await page.evaluate( async ( [ a, time ] ) => {
			const el = document.querySelector( `.film-act[data-act="${ a }"]` );
			window.__film.frame( el.getBoundingClientRect().top + scrollY + 4 );
			const r = window.__film.at( time );
			const c = document.querySelector( '.film-canvas' );
			return { r, w: c.width, h: c.height, url: c.toDataURL( 'image/webp', 0.92 ) };
		}, [ act, t ] );
		const file = path.join( out, `film-${ act }${ suffix }.webp` );
		fs.writeFileSync( file, Buffer.from( data.url.split( ',' )[ 1 ], 'base64' ) );
		console.log( path.basename( file ), `${ data.w }x${ data.h }`, Math.round( fs.statSync( file ).size / 1024 ) + ' KB', data.r.act, ( ( Date.now() - t0 ) / 1000 ).toFixed( 0 ) + 's' );
	}
	await ctx.close();
}
await browser.close();
