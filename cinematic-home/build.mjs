// Build the self-contained page: bundle the film, inline it, and inline the
// pictures (poster and catalogue cards) when they have been rendered.
// Also builds the WordPress version of the film into the Wulf Elementor Kit
// (assets/js/wulf-film.js), used by its "Cinematic film (3D)" widget.
import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const root = path.dirname( new URL( import.meta.url ).pathname );
const assets = path.join( root, 'assets' );
const dev = process.argv.includes( '--dev' );

const result = await esbuild.build( {
	entryPoints: [ path.join( root, 'src/film.js' ) ],
	bundle: true,
	format: 'iife',
	minify: ! dev,
	target: [ 'es2020' ],
	legalComments: 'none',
	write: false,
} );
const js = result.outputFiles[ 0 ].text.replace( /<\/script/gi, '<\\/script' );

const b64 = ( f ) => ( fs.existsSync( f ) ? 'data:image/webp;base64,' + fs.readFileSync( f ).toString( 'base64' ) : '' );
let html = fs.readFileSync( path.join( root, 'src/page.html' ), 'utf8' );

const wide = b64( path.join( assets, 'poster-wide.webp' ) );
const tall = b64( path.join( assets, 'poster-tall.webp' ) );
html = html.replace( '<!--POSTER-->', () => wide ? `<source media="(max-aspect-ratio: 4/5)" srcset="${ tall || wide }"><img src="${ wide }" alt="">` : '' );

const cards = [
	'Round diamond engagement ring, rendered in white gold',
	'Emerald cut diamond engagement ring, rendered in yellow gold',
	'Pear diamond engagement ring, rendered in rose gold',
	'Oval diamond engagement ring, rendered in white gold',
];
cards.forEach( ( alt, i ) => {
	const src = b64( path.join( assets, `card-${ i }.webp` ) );
	html = html.replace( `<!--CARD${ i }-->`, () => src ? `<img src="${ src }" alt="${ alt }" width="800" height="1000" loading="lazy" decoding="async">` : '' );
} );
// A function, so '$' sequences in the bundle are not read as replacement patterns.
html = html.replace( '<!--SCRIPT-->', () => `<script>${ js }</script>` );
fs.mkdirSync( path.join( root, 'dist' ), { recursive: true } );
const out = path.join( root, 'dist/wulf-cinematic-home.html' );
fs.writeFileSync( out, html );
const kb = ( n ) => ( n / 1024 ).toFixed( 0 ) + ' KB';
console.log( path.relative( root, out ), kb( html.length ), '· script', kb( js.length ) );

// The WordPress widget's script.
const kit = path.join( root, '../wulf-elementor-kit/assets/js/wulf-film.js' );
if ( fs.existsSync( path.dirname( kit ) ) ) {
	const pkg = ( n ) => JSON.parse( fs.readFileSync( path.join( root, 'node_modules', n, 'package.json' ), 'utf8' ) ).version;
	await esbuild.build( {
		entryPoints: [ path.join( root, 'src/wp.js' ) ],
		bundle: true,
		format: 'iife',
		minify: ! dev,
		target: [ 'es2020' ],
		legalComments: 'none',
		banner: { js: `/*! Wulf Elementor Kit: cinematic film (3D). Built from cinematic-home/src/wp.js; do not edit by hand.
 * Includes three.js ${ pkg( 'three' ) } (MIT), postprocessing ${ pkg( 'postprocessing' ) } (Zlib), three-mesh-bvh ${ pkg( 'three-mesh-bvh' ) } (MIT),
 * and GSAP ${ pkg( 'gsap' ) } with ScrollTrigger and SplitText (GSAP standard no-charge license, gsap.com/standard-license). */` },
		outfile: kit,
	} );
	// The contact-shadow add-on, borrowing three.js and postprocessing from the film script.
	const borrow = {
		name: 'borrow',
		setup( b ) {
			b.onResolve( { filter: /^(three|postprocessing)$/ }, ( a ) => ( { path: a.path, namespace: 'borrow' } ) );
			b.onLoad( { filter: /.*/, namespace: 'borrow' }, ( a ) => ( { contents: `module.exports = window.__wulfFilmLib.${ a.path === 'three' ? 'THREE' : 'PP' };`, loader: 'js' } ) );
		},
	};
	await esbuild.build( {
		entryPoints: [ path.join( root, 'src/ao.js' ) ],
		bundle: true,
		format: 'iife',
		minify: ! dev,
		target: [ 'es2020' ],
		legalComments: 'none',
		plugins: [ borrow ],
		banner: { js: `/*! Wulf Elementor Kit: contact shadows for the cinematic film, loaded by wulf-film.js on the best quality only.
 * Includes n8ao ${ pkg( 'n8ao' ) } (ISC). */` },
		outfile: kit.replace( /\.js$/, '-ao.js' ),
	} );
	const size = fs.statSync( kit ).size;
	const { gzipSync } = await import( 'zlib' );
	console.log( path.relative( root, kit ), kb( size ), '· gzipped', kb( gzipSync( fs.readFileSync( kit ) ).length ) );
	const ao = kit.replace( /\.js$/, '-ao.js' );
	console.log( path.relative( root, ao ), kb( fs.statSync( ao ).size ), '· gzipped', kb( gzipSync( fs.readFileSync( ao ) ).length ) );
}
