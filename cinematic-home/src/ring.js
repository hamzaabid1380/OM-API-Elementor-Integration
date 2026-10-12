import * as THREE from 'three';
import { CUT, outlineAt, smallStoneGeometry } from './cut.js';
import { Tube } from './tube.js';
import { smallStoneMaterial } from './stones.js';

/**
 * A cathedral solitaire built in code, in units where the centre stone is
 * 1 across (a 1 ct round is about 6.5 mm, so the finger hole is a size 6).
 * The band stands in the XY plane with the head at the top (+Y); the finger
 * runs along Z. The head (stone, prongs, basket, hidden halo) has its own
 * group with the girdle at its origin.
 */
export const R_IN = 1.27;
export const HEAD_Y = 2.18;
const PRONGS = 6;
const SUPER = 3.2;

// Band profile along u = angle from the top (0) to the bottom (PI).
const thick = ( u ) => 0.19 + 0.17 * Math.exp( - Math.pow( u / 0.42, 2 ) );
const halfWidth = ( u ) => 0.13 + 0.02 * ( u / Math.PI );
const rOut = ( u ) => R_IN + thick( u );

export const METALS = {
	white: new THREE.Color( '#ecebe8' ),
	yellow: new THREE.Color( '#f3c977' ),
	rose: new THREE.Color( '#f2b49b' ),
};
const METAL_ORDER = [ METALS.white, METALS.yellow, METALS.rose ];

/** Outward 2D normal of the stone outline at parameter a. */
function outlineNormal( m, a, out ) {
	const e = 1e-3;
	const p = outlineAt( m, a + e );
	const q = outlineAt( m, a - e );
	let nx = p[ 1 ] - q[ 1 ];
	let nz = - ( p[ 0 ] - q[ 0 ] );
	const c = outlineAt( m, a );
	if ( nx * c[ 0 ] + nz * c[ 1 ] < 0 ) {
		nx = - nx;
		nz = - nz;
	}
	const l = Math.hypot( nx, nz ) || 1;
	out[ 0 ] = nx / l;
	out[ 1 ] = nz / l;
	return out;
}

const smooth = ( a, b, x ) => {
	const t = Math.min( 1, Math.max( 0, ( x - a ) / ( b - a ) ) );
	return t * t * ( 3 - 2 * t );
};

/** The band: a swept squircle, built only over the part that has "grown". */
class Band {
	constructor( material ) {
		this.NT = 300;
		this.NC = 36;
		const ringVerts = ( this.NT + 1 ) * ( this.NC + 1 );
		const capVerts = 2 * ( this.NC + 2 );
		this.pos = new Float32Array( ( ringVerts + capVerts ) * 3 );
		this.nrm = new Float32Array( ( ringVerts + capVerts ) * 3 );
		const idx = [];
		for ( let i = 0; i < this.NT; i ++ ) {
			for ( let j = 0; j < this.NC; j ++ ) {
				const a = i * ( this.NC + 1 ) + j;
				const b = a + this.NC + 1;
				idx.push( a, b, a + 1, b, b + 1, a + 1 );
			}
		}
		this.bodyCount = idx.length;
		// Caps: a fan per end.
		this.capBase = ringVerts;
		for ( let c = 0; c < 2; c ++ ) {
			const centre = ringVerts + c * ( this.NC + 2 );
			for ( let j = 0; j < this.NC; j ++ ) {
				if ( c === 0 ) {
					idx.push( centre, centre + 1 + j, centre + 2 + j );
				} else {
					idx.push( centre, centre + 2 + j, centre + 1 + j );
				}
			}
		}
		const g = new THREE.BufferGeometry();
		g.setIndex( idx );
		g.setAttribute( 'position', new THREE.BufferAttribute( this.pos, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		g.setAttribute( 'normal', new THREE.BufferAttribute( this.nrm, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		this.geometry = g;
		this.mesh = new THREE.Mesh( g, material );
		this.mesh.frustumCulled = false;
		this.ends = [ new THREE.Vector3(), new THREE.Vector3() ];
		this.g = - 1;
	}

	set( g ) {
		g = Math.min( 1, Math.max( 0, g ) );
		if ( g === this.g ) {
			return;
		}
		this.g = g;
		this.mesh.visible = g > 0.001;
		if ( ! this.mesh.visible ) {
			return;
		}
		const NT = this.NT;
		const NC = this.NC;
		const cut = Math.PI * ( 1 - g );
		const p = this.pos;
		const n = this.nrm;
		const e = 2 / SUPER;
		for ( let i = 0; i <= NT; i ++ ) {
			const phi = cut + ( Math.PI * 2 - 2 * cut ) * ( i / NT );
			const u = Math.min( phi, Math.PI * 2 - phi );
			const ex = Math.sin( phi );
			const ey = Math.cos( phi );
			const ro = rOut( u );
			const mid = ( R_IN + ro ) / 2;
			const h = ( ro - R_IN ) / 2;
			const w = halfWidth( u );
			for ( let j = 0; j <= NC; j ++ ) {
				const psi = ( j / NC ) * Math.PI * 2;
				const c = Math.cos( psi );
				const s = Math.sin( psi );
				const X = Math.sign( c ) * Math.pow( Math.abs( c ), e );
				const Y = Math.sign( s ) * Math.pow( Math.abs( s ), e );
				const x = X * w;
				const y = Y * h;
				let nx = Math.sign( X ) * Math.pow( Math.abs( X ), SUPER - 1 ) / w;
				let ny = Math.sign( Y ) * Math.pow( Math.abs( Y ), SUPER - 1 ) / h;
				const l = Math.hypot( nx, ny ) || 1;
				nx /= l;
				ny /= l;
				const k = ( i * ( NC + 1 ) + j ) * 3;
				p[ k ] = ex * ( mid + y );
				p[ k + 1 ] = ey * ( mid + y );
				p[ k + 2 ] = x;
				n[ k ] = ex * ny;
				n[ k + 1 ] = ey * ny;
				n[ k + 2 ] = nx;
			}
		}
		// End caps (only while growing).
		const open = g < 0.999;
		for ( let c = 0; c < 2; c ++ ) {
			const i = c === 0 ? 0 : NT;
			const phi = cut + ( Math.PI * 2 - 2 * cut ) * ( i / NT );
			const tx = Math.cos( phi ) * ( c === 0 ? - 1 : 1 );
			const ty = - Math.sin( phi ) * ( c === 0 ? - 1 : 1 );
			const centre = this.capBase + c * ( NC + 2 );
			const u = Math.min( phi, Math.PI * 2 - phi );
			const mid = ( R_IN + rOut( u ) ) / 2;
			this.ends[ c ].set( Math.sin( phi ) * mid, Math.cos( phi ) * mid, 0 );
			for ( let j = - 1; j <= NC; j ++ ) {
				const k = ( j < 0 ? centre : centre + 1 + j ) * 3;
				if ( j < 0 ) {
					p[ k ] = this.ends[ c ].x;
					p[ k + 1 ] = this.ends[ c ].y;
					p[ k + 2 ] = 0;
				} else {
					const s = ( i * ( NC + 1 ) + j ) * 3;
					p[ k ] = p[ s ];
					p[ k + 1 ] = p[ s + 1 ];
					p[ k + 2 ] = p[ s + 2 ];
				}
				n[ k ] = tx;
				n[ k + 1 ] = ty;
				n[ k + 2 ] = 0;
			}
		}
		this.geometry.setDrawRange( 0, open ? this.geometry.index.count : this.bodyCount );
		this.geometry.attributes.position.needsUpdate = true;
		this.geometry.attributes.normal.needsUpdate = true;
	}
}

/** A point on the band's outer surface at angle phi (0 top), with its outward normal. */
function bandSurface( phi, z = 0 ) {
	const u = Math.min( Math.abs( phi ), Math.PI * 2 - Math.abs( phi ) );
	const ro = rOut( u );
	const w = halfWidth( u );
	const h = ( ro - R_IN ) / 2;
	const mid = ( R_IN + ro ) / 2;
	// Height of the squircle at this z.
	const X = Math.min( 0.999, Math.abs( z ) / w );
	const top = h * Math.pow( 1 - Math.pow( X, SUPER ), 1 / SUPER );
	const r = mid + top;
	const e = 1e-3;
	const r1 = rOut( Math.min( Math.abs( phi + e ), Math.PI * 2 - Math.abs( phi + e ) ) );
	const r0 = rOut( Math.min( Math.abs( phi - e ), Math.PI * 2 - Math.abs( phi - e ) ) );
	const dr = ( r1 - r0 ) / ( 2 * e );
	const er = new THREE.Vector3( Math.sin( phi ), Math.cos( phi ), 0 );
	const et = new THREE.Vector3( Math.cos( phi ), - Math.sin( phi ), 0 );
	const normal = er.clone().multiplyScalar( ro ).addScaledVector( et, - dr ).normalize();
	return { point: er.multiplyScalar( r ).setZ( z ), normal };
}

export function createRing( { cube, bright, rotation } ) {
	const group = new THREE.Group();
	group.name = 'ring';
	const head = new THREE.Group();
	head.position.y = HEAD_Y;
	group.add( head );

	const metal = () => new THREE.MeshStandardMaterial( { color: METALS.white.clone(), metalness: 1, roughness: 0.13, envMapIntensity: 1 } );
	const bandMat = metal();
	bandMat.side = THREE.DoubleSide;
	const headMat = metal();
	const detailMat = metal();
	detailMat.roughness = 0.18;
	const metals = [ bandMat, headMat, detailMat ];

	const band = new Band( bandMat );
	group.add( band.mesh );

	// Prongs and the basket rail.
	const prongs = [];
	for ( let k = 0; k < PRONGS; k ++ ) {
		const t = new Tube( 40, 14, headMat );
		prongs.push( t );
		head.add( t.mesh );
	}
	const rail = new Tube( 120, 10, headMat );
	head.add( rail.mesh );
	const collar = new Tube( 140, 10, detailMat );
	head.add( collar.mesh );

	// Hidden halo stones and pave.
	const stoneGeo = smallStoneGeometry();
	const stoneMat = smallStoneMaterial( cube, rotation, bright );
	const HALO = 26;
	const halo = new THREE.InstancedMesh( stoneGeo, stoneMat, HALO );
	halo.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
	halo.frustumCulled = false;
	head.add( halo );

	// Pave along both shoulders, sized down slightly as it goes (graduated).
	const paveSpots = [];
	{
		let phi = 0.3;
		const end = 1.3;
		while ( phi < end ) {
			const f = ( phi - 0.3 ) / ( end - 0.3 );
			const size = 0.132 - 0.024 * f;
			paveSpots.push( { phi, size } );
			const r = rOut( phi );
			phi += ( size + 0.014 ) / r;
		}
	}
	const paveCount = paveSpots.length * 2;
	const pave = new THREE.InstancedMesh( stoneGeo, stoneMat, paveCount );
	pave.frustumCulled = false;
	group.add( pave );
	const beadGeo = new THREE.SphereGeometry( 1, 12, 8 );
	const beadCount = ( paveSpots.length + 1 ) * 2 * 2;
	const beads = new THREE.InstancedMesh( beadGeo, detailMat, beadCount );
	beads.frustumCulled = false;
	group.add( beads );

	const paveData = [];
	const beadData = [];
	{
		const up = new THREE.Vector3( 0, 1, 0 );
		const q = new THREE.Quaternion();
		for ( const side of [ 1, - 1 ] ) {
			paveSpots.forEach( ( s, i ) => {
				const phi = s.phi * side;
				const { point, normal } = bandSurface( phi );
				q.setFromUnitVectors( up, normal );
				// Girdle sits just under the surface so the table is flush.
				const pos = point.clone().addScaledVector( normal, - 0.018 * ( s.size / 0.13 ) );
				paveData.push( { pos, q: q.clone(), size: s.size, order: i, side } );
				// Beads in the gap before this stone, on both edges.
				const prev = i === 0 ? s.phi - ( s.size + 0.014 ) / rOut( s.phi ) : paveSpots[ i - 1 ].phi;
				const gapPhi = ( ( s.phi + prev ) / 2 ) * side;
				for ( const z of [ - 1, 1 ] ) {
					const bz = z * ( s.size / 2 + 0.012 );
					const b = bandSurface( gapPhi, bz );
					beadData.push( { pos: b.point.clone().addScaledVector( b.normal, 0.003 ), size: 0.019, order: i, side } );
				}
				if ( i === paveSpots.length - 1 ) {
					const after = ( s.phi + ( s.size + 0.014 ) / 2 / rOut( s.phi ) ) * side;
					for ( const z of [ - 1, 1 ] ) {
						const b = bandSurface( after, z * ( s.size / 2 + 0.006 ) );
						beadData.push( { pos: b.point.clone().addScaledVector( b.normal, 0.003 ), size: 0.018, order: i + 0.5, side } );
					}
				}
			} );
		}
	}

	const state = { band: - 1, prongs: - 1, morph: - 1, metal: - 1, halo: - 1, pave: - 1 };
	const m4 = new THREE.Matrix4();
	const v3 = new THREE.Vector3();
	const s3 = new THREE.Vector3();
	const q4 = new THREE.Quaternion();
	const nrm = [ 0, 0 ];
	const yCul = CUT.culetY;
	const pavH = CUT.pavH;
	const BASE_Y = 1.6 - HEAD_Y;

	function prongAngle( k ) {
		return ( k / PRONGS ) * Math.PI * 2;
	}

	function buildHead( morph, grow ) {
		// Prongs: base on the bridge, up the pavilion, over the girdle, a claw tip on the crown.
		const curve = new THREE.CatmullRomCurve3( [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ], false, 'centripetal' );
		const pts = curve.points;
		const pg = smooth( 0, 1, grow );
		for ( let k = 0; k < PRONGS; k ++ ) {
			const a = prongAngle( k );
			const P = outlineAt( morph, a );
			outlineNormal( morph, a, nrm );
			const lift = ( t, off ) => [ P[ 0 ] * t + nrm[ 0 ] * off, P[ 1 ] * t + nrm[ 1 ] * off ];
			let q = lift( 0.26, 0 );
			pts[ 0 ].set( q[ 0 ], BASE_Y, q[ 1 ] );
			q = lift( 0.36, 0.058 );
			pts[ 1 ].set( q[ 0 ], yCul + 0.36 * pavH, q[ 1 ] );
			q = lift( 0.72, 0.056 );
			pts[ 2 ].set( q[ 0 ], yCul + 0.72 * pavH, q[ 1 ] );
			q = lift( 1, 0.05 );
			pts[ 3 ].set( q[ 0 ], 0, q[ 1 ] );
			q = lift( 0.94, 0.012 );
			pts[ 4 ].set( q[ 0 ], 0.07, q[ 1 ] );
			const delay = ( k % 2 ) * 0.12;
			const g = smooth( delay, delay + 0.88, pg );
			const tube = prongs[ k ];
			if ( g <= 0.001 ) {
				tube.begin();
				tube.end();
				continue;
			}
			const n = 30;
			const path = [];
			for ( let i = 0; i < n; i ++ ) {
				path.push( curve.getPointAt( ( i / ( n - 1 ) ) * g ) );
			}
			tube.sweep( path, ( u ) => 0.052 - 0.011 * u * g, { capEnd: true } );
		}
		// Basket rail and the hidden-halo collar: loops that follow the outline.
		const loop = ( tube, y, f, off, radius, g, count ) => {
			if ( g <= 0.001 ) {
				tube.begin();
				tube.end();
				return;
			}
			const pts2 = [];
			const closed = g >= 0.999;
			const total = closed ? count : Math.max( 2, Math.round( count * g ) + 1 );
			for ( let i = 0; i < total; i ++ ) {
				const a = closed ? ( i / count ) * Math.PI * 2 : ( i / ( total - 1 ) ) * Math.PI * 2 * g - Math.PI / 2;
				const p = outlineAt( morph, a );
				outlineNormal( morph, a, nrm );
				pts2.push( new THREE.Vector3( p[ 0 ] * f + nrm[ 0 ] * off, y, p[ 1 ] * f + nrm[ 1 ] * off ) );
			}
			tube.sweep( pts2, radius, { up: new THREE.Vector3( 0, 1, 0 ), closed, capStart: ! closed, capEnd: ! closed } );
		};
		const yr = - 0.27;
		loop( rail, yr, ( yr - yCul ) / pavH, 0.036, 0.03, smooth( 0.35, 1, pg ), 100 );
		return pg;
	}

	function buildHalo( morph, h ) {
		const yh = - 0.115;
		const f = ( yh - yCul ) / pavH;
		const cg = smooth( 0, 0.55, h );
		const pts = [];
		const loopTube = collar;
		if ( cg <= 0.001 ) {
			loopTube.begin();
			loopTube.end();
		} else {
			const closed = cg >= 0.999;
			const count = 120;
			const total = closed ? count : Math.max( 2, Math.round( count * cg ) + 1 );
			for ( let i = 0; i < total; i ++ ) {
				const a = closed ? ( i / count ) * Math.PI * 2 : ( i / ( total - 1 ) ) * Math.PI * 2 * cg + Math.PI / 2;
				const p = outlineAt( morph, a );
				outlineNormal( morph, a, nrm );
				pts.push( new THREE.Vector3( p[ 0 ] * f + nrm[ 0 ] * 0.042, yh, p[ 1 ] * f + nrm[ 1 ] * 0.042 ) );
			}
			loopTube.sweep( pts, 0.03, { up: new THREE.Vector3( 0, 1, 0 ), closed, capStart: ! closed, capEnd: ! closed } );
		}
		// Stones on the outside of the collar, tilted up a little; none where a prong passes.
		let used = 0;
		const up = new THREE.Vector3( 0, 1, 0 );
		for ( let i = 0; i < HALO; i ++ ) {
			const a = ( ( i + 0.5 ) / HALO ) * Math.PI * 2;
			let near = false;
			for ( let k = 0; k < PRONGS; k ++ ) {
				let d = Math.abs( a - prongAngle( k ) );
				d = Math.min( d, Math.PI * 2 - d );
				if ( d < 0.17 ) {
					near = true;
				}
			}
			if ( near ) {
				continue;
			}
			// Each stone pops in around the ring in turn.
			const order = ( ( a - Math.PI / 2 + Math.PI * 4 ) % ( Math.PI * 2 ) ) / ( Math.PI * 2 );
			const t = smooth( 0.3 + order * 0.55, 0.3 + order * 0.55 + 0.12, h );
			if ( t <= 0.001 ) {
				continue;
			}
			const p = outlineAt( morph, a );
			outlineNormal( morph, a, nrm );
			const out = new THREE.Vector3( nrm[ 0 ], 0, nrm[ 1 ] );
			const axis = out.clone().multiplyScalar( Math.cos( 0.42 ) ).addScaledVector( up, Math.sin( 0.42 ) ).normalize();
			v3.set( p[ 0 ] * f + nrm[ 0 ] * 0.1, yh + 0.012, p[ 1 ] * f + nrm[ 1 ] * 0.1 );
			q4.setFromUnitVectors( up, axis );
			const size = 0.118 * ( 0.6 + 0.4 * t ) * t;
			s3.set( size, size, size );
			halo.setMatrixAt( used ++, m4.compose( v3, q4, s3 ) );
		}
		halo.count = used;
		halo.instanceMatrix.needsUpdate = true;
		halo.visible = used > 0;
	}

	function buildPave( p ) {
		let used = 0;
		const n = paveSpots.length;
		for ( const d of paveData ) {
			const start = ( d.order / n ) * 0.75;
			const t = smooth( start, start + 0.18, p );
			if ( t <= 0.001 ) {
				continue;
			}
			const size = d.size * t;
			s3.set( size, size, size );
			pave.setMatrixAt( used ++, m4.compose( d.pos, d.q, s3 ) );
		}
		pave.count = used;
		pave.instanceMatrix.needsUpdate = true;
		pave.visible = used > 0;
		let b = 0;
		q4.identity();
		for ( const d of beadData ) {
			const start = ( d.order / n ) * 0.75;
			const t = smooth( start, start + 0.18, p );
			if ( t <= 0.001 ) {
				continue;
			}
			const size = d.size * t;
			s3.set( size, size, size );
			beads.setMatrixAt( b ++, m4.compose( d.pos, q4, s3 ) );
		}
		beads.count = b;
		beads.instanceMatrix.needsUpdate = true;
		beads.visible = b > 0;
	}

	const color = new THREE.Color();
	return {
		group,
		head,
		pave,
		halo,
		metals,
		stoneMaterial: stoneMat,
		bandEnds: band.ends,
		get bandGrow() {
			return band.g;
		},
		/** Apply a state: band, prongs, halo, pave in 0..1; morph 0..4; metal 0..2. */
		update( s ) {
			if ( s.band !== state.band ) {
				band.set( s.band );
				state.band = s.band;
			}
			const headDirty = s.morph !== state.morph;
			if ( headDirty || s.prongs !== state.prongs ) {
				buildHead( s.morph, s.prongs );
				state.prongs = s.prongs;
			}
			if ( headDirty || s.halo !== state.halo ) {
				buildHalo( s.morph, s.halo );
				state.halo = s.halo;
			}
			state.morph = s.morph;
			if ( s.pave !== state.pave ) {
				buildPave( s.pave );
				state.pave = s.pave;
			}
			if ( s.metal !== state.metal ) {
				const i = Math.min( 1, Math.floor( s.metal ) );
				color.copy( METAL_ORDER[ i ] ).lerp( METAL_ORDER[ Math.min( 2, i + 1 ) ], Math.min( 1, s.metal - i ) );
				for ( const m of metals ) {
					m.color.copy( color );
				}
				state.metal = s.metal;
			}
		},
		setRoughness( r ) {
			bandMat.roughness = r;
			headMat.roughness = r;
			detailMat.roughness = r + 0.05;
		},
	};
}
