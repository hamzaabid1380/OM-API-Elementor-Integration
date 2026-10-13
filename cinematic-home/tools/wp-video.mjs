// Walkthrough video of the WordPress "Home (cinematic)" page: the whole page as a
// visitor scrolls it, the film's three acts between the conversion sections,
// frame by frame (capture mode), streamed into ffmpeg as JPEGs.
//   WP_URL=http://localhost:8089/home-cinematic/ FFMPEG=/path/to/ffmpeg \
//     node tools/wp-video.mjs out.mp4 [width] [height] [fps] [tier] [frame limit]
import { launch } from './browser.mjs';
import { routeFonts } from './fonts.mjs';
import { spawn } from 'child_process';
import path from 'path';

const root = path.resolve( path.dirname( new URL( import.meta.url ).pathname ), '..' );
const [ out, W, H, FPS, TIER, LIMIT ] = [ process.argv[ 2 ], Number( process.argv[ 3 ] || 1920 ), Number( process.argv[ 4 ] || 1080 ), Number( process.argv[ 5 ] || 30 ), process.argv[ 6 ] || 'medium', Number( process.argv[ 7 ] || 0 ) ];
const URL_ = ( process.env.WP_URL || 'http://localhost:8089/home-cinematic/' ) + '?capture&tier=' + TIER;
const ease = ( t ) => ( t < 0.5 ? 4 * t * t * t : 1 - Math.pow( - 2 * t + 2, 3 ) / 2 );

const browser = await launch();
const ctx = await browser.newContext( { viewport: { width: W, height: H }, deviceScaleFactor: 1 } );
await routeFonts( ctx, root + '/fontcache' );
const page = await ctx.newPage();
page.on( 'pageerror', ( e ) => {
	if ( ! /Unexpected token '<'/.test( String( e ) ) ) {
		console.log( 'PAGEERROR', String( e ) );
	}
} );
await page.goto( URL_, { waitUntil: 'load', timeout: 180000 } );
await page.waitForFunction( () => window.__film, null, { timeout: 120000 } );
await page.evaluate( () => window.__film.started );
await page.waitForTimeout( 1500 );

// Scroll positions: a moment of an act (film clock), or a section just under the header.
const P = await page.evaluate( () => {
	const ACTS = { opening: [ 0, 4.6 ], shapes: [ 4.6, 11.8 ], details: [ 11.8, 18 ] };
	const top = parseFloat( getComputedStyle( document.documentElement ).getPropertyValue( '--film-top' ) ) || 0;
	const acts = {};
	for ( const a of Object.keys( ACTS ) ) {
		const el = document.querySelector( `.film-act[data-act="${ a }"]` );
		acts[ a ] = { y: el.getBoundingClientRect().top + scrollY - top, run: el.offsetHeight - el.querySelector( '.film-stage' ).offsetHeight, t: ACTS[ a ] };
	}
	const sec = {};
	for ( const s of [ '#book-now', '#start', '#quiz', '#spotlight', '#values', '#studio', '#visit' ] ) {
		const el = document.querySelector( s );
		sec[ s ] = el ? Math.round( el.getBoundingClientRect().top + scrollY - top ) : null;
	}
	return { acts, sec, max: document.documentElement.scrollHeight - innerHeight };
} );
const at = ( a, t ) => {
	const A = P.acts[ a ];
	return Math.round( A.y + ( ( t - A.t[ 0 ] ) / ( A.t[ 1 ] - A.t[ 0 ] ) ) * A.run );
};
const sec = ( s ) => Math.min( P.max, P.sec[ s ] ?? 0 );

// The shot list: [seconds, (local t, duration) => scroll y].
const shots = [];
const hold = ( sec_, y ) => shots.push( [ sec_, () => y ] );
const move = ( sec_, a, b ) => shots.push( [ sec_, ( t, d ) => a + ( b - a ) * ease( t / d ) ] );
const play = ( sec_, act ) => shots.push( [ sec_, ( t, d ) => at( act, P.acts[ act ].t[ 0 ] + ( P.acts[ act ].t[ 1 ] - P.acts[ act ].t[ 0 ] ) * ( t / d ) ) ] );
hold( 1.8, 0 );
move( 0.8, 0, at( 'opening', 0 ) );
play( 7.5, 'opening' );
move( 2.0, at( 'opening', 4.6 ), sec( '#book-now' ) );
hold( 1.6, sec( '#book-now' ) );
move( 1.2, sec( '#book-now' ), sec( '#start' ) );
hold( 1.6, sec( '#start' ) );
move( 1.4, sec( '#start' ), at( 'shapes', 4.6 ) );
play( 12, 'shapes' );
move( 1.4, at( 'shapes', 11.8 ), sec( '#quiz' ) );
hold( 1.6, sec( '#quiz' ) );
move( 1.4, sec( '#quiz' ), sec( '#spotlight' ) );
hold( 1.6, sec( '#spotlight' ) );
move( 1.4, sec( '#spotlight' ), at( 'details', 11.8 ) );
play( 9.5, 'details' );
move( 1.4, at( 'details', 18 ), sec( '#values' ) );
hold( 1.6, sec( '#values' ) );
move( 1.4, sec( '#values' ), sec( '#studio' ) );
hold( 1.4, sec( '#studio' ) );
move( 1.4, sec( '#studio' ), sec( '#visit' ) );
hold( 2.4, sec( '#visit' ) );

const total = shots.reduce( ( a, s ) => a + s[ 0 ], 0 );
const frames = LIMIT || Math.round( total * FPS );
console.log( `video ${ total.toFixed( 1 ) }s, ${ frames } frames at ${ W }x${ H }, ${ TIER }` );
const ff = spawn( process.env.FFMPEG || 'ffmpeg', [ '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String( FPS ), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'slow', '-tune', 'film', '-movflags', '+faststart', out ], { stdio: [ 'pipe', 'inherit', 'inherit' ] } );
const write = ( buf ) => new Promise( ( r ) => ( ff.stdin.write( buf ) ? r() : ff.stdin.once( 'drain', r ) ) );
const t0 = Date.now();
for ( let i = 0; i < frames; i ++ ) {
	const time = i / FPS;
	let acc = 0;
	let k = 0;
	while ( k < shots.length - 1 && time >= acc + shots[ k ][ 0 ] ) {
		acc += shots[ k ][ 0 ];
		k ++;
	}
	const y = Math.round( shots[ k ][ 1 ]( Math.min( shots[ k ][ 0 ], time - acc ), shots[ k ][ 0 ] ) );
	await page.evaluate( ( [ yy, tm ] ) => window.__film.frame( yy, tm ), [ y, time ] );
	await write( await page.screenshot( { type: 'jpeg', quality: 92, timeout: 600000 } ) );
	if ( i % 60 === 0 ) {
		const el = ( Date.now() - t0 ) / 1000;
		console.log( `frame ${ i }/${ frames } · ${ el.toFixed( 0 ) }s · ~${ ( ( el / ( i + 1 ) ) * ( frames - i - 1 ) / 60 ).toFixed( 1 ) } min left` );
	}
}
ff.stdin.end();
await new Promise( ( r ) => ff.on( 'close', r ) );
await browser.close();
console.log( 'done', out );
