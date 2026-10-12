// Build the self-contained page: bundle the film, inline it, and inline the
// pictures (poster and catalogue cards) when they have been rendered.
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
	'Oval diamond engagement ring, rendered in yellow gold',
	'Cushion diamond engagement ring, rendered in rose gold',
	'Pear diamond engagement ring, rendered in white gold',
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
