import * as THREE from 'three';
import { LIGHTS } from './studio.js';

/**
 * Star glints where a facet really does catch one of the studio lights
 * (mirror direction within the light's size), so they flash in step with
 * the stone instead of at random. Plus soft glows for things being "drawn"
 * by light (the ends of the band while it grows).
 */
function starTexture() {
	const s = 256;
	const c = document.createElement( 'canvas' );
	c.width = c.height = s;
	const x = c.getContext( '2d' );
	x.globalCompositeOperation = 'lighter';
	const core = x.createRadialGradient( s / 2, s / 2, 0, s / 2, s / 2, s * 0.16 );
	core.addColorStop( 0, 'rgba(255,255,255,1)' );
	core.addColorStop( 0.25, 'rgba(255,250,240,0.55)' );
	core.addColorStop( 1, 'rgba(255,245,230,0)' );
	x.fillStyle = core;
	x.fillRect( 0, 0, s, s );
	const spike = ( angle, len, width, alpha ) => {
		x.save();
		x.translate( s / 2, s / 2 );
		x.rotate( angle );
		x.scale( 1, width );
		const g = x.createRadialGradient( 0, 0, 0, 0, 0, len );
		g.addColorStop( 0, `rgba(255,255,255,${ alpha })` );
		g.addColorStop( 0.35, `rgba(255,250,242,${ alpha * 0.35 })` );
		g.addColorStop( 1, 'rgba(255,245,235,0)' );
		x.fillStyle = g;
		x.beginPath();
		x.arc( 0, 0, len, 0, Math.PI * 2 );
		x.fill();
		x.restore();
	};
	spike( 0, s * 0.5, 0.022, 0.95 );
	spike( Math.PI / 2, s * 0.5, 0.022, 0.95 );
	spike( Math.PI / 4, s * 0.26, 0.02, 0.45 );
	spike( - Math.PI / 4, s * 0.26, 0.02, 0.45 );
	const t = new THREE.CanvasTexture( c );
	t.colorSpace = THREE.SRGBColorSpace;
	return t;
}

function glowTexture() {
	const s = 128;
	const c = document.createElement( 'canvas' );
	c.width = c.height = s;
	const x = c.getContext( '2d' );
	const g = x.createRadialGradient( s / 2, s / 2, 0, s / 2, s / 2, s / 2 );
	g.addColorStop( 0, 'rgba(255,255,255,1)' );
	g.addColorStop( 0.2, 'rgba(255,240,220,0.5)' );
	g.addColorStop( 1, 'rgba(255,230,200,0)' );
	x.fillStyle = g;
	x.fillRect( 0, 0, s, s );
	const t = new THREE.CanvasTexture( c );
	t.colorSpace = THREE.SRGBColorSpace;
	return t;
}

const WINDOW = Math.cos( THREE.MathUtils.degToRad( 4.5 ) );

export function createGlints( scene, { max = 3, paveMax = 3, pingMax = 6 } = {} ) {
	const star = starTexture();
	const glow = glowTexture();
	const sprite = ( map, rot = 0 ) => {
		const m = new THREE.SpriteMaterial( { map, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true, transparent: true, rotation: rot, toneMapped: false } );
		const sp = new THREE.Sprite( m );
		sp.visible = false;
		sp.renderOrder = 10;
		scene.add( sp );
		return sp;
	};
	const stars = [];
	for ( let i = 0; i < max + paveMax; i ++ ) {
		stars.push( sprite( star, 0.21 ) );
	}
	const glows = [ sprite( glow ), sprite( glow ) ];
	// Moments in the making: a claw closing over the stone, a small stone landing in its seat.
	const flashes = [];
	for ( let i = 0; i < pingMax; i ++ ) {
		flashes.push( sprite( star, 0.62 ) );
	}

	const lights = () => LIGHTS;
	const cA = new THREE.Vector3();
	const cB = new THREE.Vector3();
	const cC = new THREE.Vector3();
	const n = new THREE.Vector3();
	const c = new THREE.Vector3();
	const v = new THREE.Vector3();
	const r = new THREE.Vector3();
	const w = new THREE.Vector3();
	const nm = new THREE.Matrix3();
	const m4 = new THREE.Matrix4();
	const q = new THREE.Quaternion();
	const p = new THREE.Vector3();
	const s = new THREE.Vector3();
	const up = new THREE.Vector3( 0, 1, 0 );

	function score( normal, centre, camera, angle, sharp ) {
		v.subVectors( centre, camera.position ).normalize();
		r.copy( v ).reflect( normal );
		let total = 0;
		const ca = Math.cos( angle );
		const sa = Math.sin( angle );
		for ( const L of lights() ) {
			// Studio direction turned into the world the same way the env lookups are.
			w.set( L.dir.x * ca + L.dir.z * sa, L.dir.y, - L.dir.x * sa + L.dir.z * ca );
			const d = r.dot( w );
			if ( d > WINDOW ) {
				total += L.power * Math.pow( ( d - WINDOW ) / ( 1 - WINDOW ), sharp );
			}
		}
		return total;
	}

	return {
		/**
		 * diamond: the centre stone mesh; pave: the pave InstancedMesh; envAngle:
		 * studio rotation; strength: overall glint level; ends: band growth glows.
		 */
		update( camera, { diamond, pave, envAngle, strength = 1, ends = null, endGlow = 0, size = 1, pings = null } ) {
			const found = [];
			if ( diamond && diamond.visible && strength > 0 ) {
				const pos = diamond.geometry.attributes.position.array;
				const seen = new Set();
				diamond.updateWorldMatrix( true, false );
				nm.getNormalMatrix( diamond.matrixWorld );
				const scale = diamond.matrixWorld.getMaxScaleOnAxis();
				for ( let t = 0; t < pos.length / 9; t ++ ) {
					const k = t * 9;
					cA.set( pos[ k ], pos[ k + 1 ], pos[ k + 2 ] );
					cB.set( pos[ k + 3 ], pos[ k + 4 ], pos[ k + 5 ] );
					cC.set( pos[ k + 6 ], pos[ k + 7 ], pos[ k + 8 ] );
					n.subVectors( cB, cA ).cross( c.subVectors( cC, cA ) ).normalize();
					if ( n.y < 0.25 ) {
						continue; // crown facets only
					}
					const key = `${ Math.round( n.x * 40 ) },${ Math.round( n.y * 40 ) },${ Math.round( n.z * 40 ) }`;
					if ( seen.has( key ) ) {
						continue;
					}
					seen.add( key );
					c.copy( cA ).add( cB ).add( cC ).multiplyScalar( 1 / 3 );
					c.applyMatrix4( diamond.matrixWorld );
					n.applyMatrix3( nm ).normalize();
					const sc = score( n, c, camera, envAngle, 2.2 );
					if ( sc > 0.05 ) {
						found.push( { pos: c.clone().addScaledVector( n, 0.03 * scale ), s: Math.min( 1.4, sc ) * strength, size: 0.42 * scale * size } );
					}
				}
			}
			found.sort( ( a, b ) => b.s - a.s );
			const top = found.slice( 0, max );
			const paveFound = [];
			if ( pave && pave.visible && pave.count > 0 && strength > 0 ) {
				pave.updateWorldMatrix( true, false );
				for ( let i = 0; i < pave.count; i ++ ) {
					pave.getMatrixAt( i, m4 );
					m4.premultiply( pave.matrixWorld );
					m4.decompose( p, q, s );
					n.copy( up ).applyQuaternion( q );
					const sc = score( n, p, camera, envAngle, 1.4 );
					if ( sc > 0.05 ) {
						paveFound.push( { pos: p.clone().addScaledVector( n, 0.02 ), s: Math.min( 1.1, sc ) * strength, size: Math.max( s.x, 0.05 ) * 2.6 * size } );
					}
				}
				paveFound.sort( ( a, b ) => b.s - a.s );
			}
			const all = top.concat( paveFound.slice( 0, paveMax ) );
			stars.forEach( ( sp, i ) => {
				const g = all[ i ];
				sp.visible = !! g;
				if ( g ) {
					sp.position.copy( g.pos );
					const k = Math.min( 1, g.s );
					sp.scale.setScalar( g.size * ( 0.45 + 0.55 * k ) );
					sp.material.color.setScalar( 1.25 * g.s );
				}
			} );
			glows.forEach( ( sp, i ) => {
				sp.visible = !! ends && endGlow > 0.01;
				if ( sp.visible ) {
					sp.position.copy( ends[ i ] );
					sp.scale.setScalar( 0.3 );
					sp.material.color.setScalar( 3.2 * endGlow );
				}
			} );
			const ps = pings ? pings.slice().sort( ( a, b ) => b.s - a.s ) : [];
			flashes.forEach( ( sp, i ) => {
				const g = ps[ i ];
				sp.visible = !! g;
				if ( g ) {
					sp.position.copy( g.pos );
					sp.scale.setScalar( g.size * ( 0.35 + 0.65 * g.s ) );
					sp.material.color.setScalar( 2.2 * g.s );
				}
			} );
		},
		hide() {
			stars.forEach( ( sp ) => ( sp.visible = false ) );
			glows.forEach( ( sp ) => ( sp.visible = false ) );
			flashes.forEach( ( sp ) => ( sp.visible = false ) );
		},
	};
}
