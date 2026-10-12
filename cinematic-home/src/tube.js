import * as THREE from 'three';

/**
 * A tube whose shape is rewritten in place (no new buffers per frame): used
 * for prongs that follow the stone as it changes shape and for the rails
 * that draw themselves around the basket. Rounded caps close the ends.
 */
export class Tube {
	constructor( maxRings, radial, material ) {
		this.radial = radial;
		this.maxRings = maxRings;
		const verts = maxRings * ( radial + 1 );
		this.pos = new Float32Array( verts * 3 );
		this.nrm = new Float32Array( verts * 3 );
		const idx = [];
		for ( let i = 0; i < maxRings - 1; i ++ ) {
			for ( let j = 0; j < radial; j ++ ) {
				const a = i * ( radial + 1 ) + j;
				const b = a + radial + 1;
				idx.push( a, a + 1, b, a + 1, b + 1, b );
			}
		}
		const g = new THREE.BufferGeometry();
		g.setIndex( idx );
		g.setAttribute( 'position', new THREE.BufferAttribute( this.pos, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		g.setAttribute( 'normal', new THREE.BufferAttribute( this.nrm, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		g.setDrawRange( 0, 0 );
		this.geometry = g;
		this.mesh = new THREE.Mesh( g, material );
		this.mesh.frustumCulled = false;
		this.rings = 0;
		this._n = new THREE.Vector3();
		this._b = new THREE.Vector3();
		this._t = new THREE.Vector3();
		this._v = new THREE.Vector3();
	}

	/** Start writing a new shape. */
	begin() {
		this.rings = 0;
	}

	/** One ring of vertices: centre c, frame (n, b) around tangent t, radius r, normals tilted by tilt along t. */
	ring( c, n, b, t, r, tilt = 0 ) {
		if ( this.rings >= this.maxRings ) {
			return;
		}
		const base = this.rings * ( this.radial + 1 );
		const ct = Math.cos( tilt );
		const st = Math.sin( tilt );
		for ( let j = 0; j <= this.radial; j ++ ) {
			const a = ( j / this.radial ) * Math.PI * 2;
			const ca = Math.cos( a );
			const sa = Math.sin( a );
			const nx = n.x * ca + b.x * sa;
			const ny = n.y * ca + b.y * sa;
			const nz = n.z * ca + b.z * sa;
			const k = ( base + j ) * 3;
			this.pos[ k ] = c.x + nx * r;
			this.pos[ k + 1 ] = c.y + ny * r;
			this.pos[ k + 2 ] = c.z + nz * r;
			this.nrm[ k ] = nx * ct + t.x * st;
			this.nrm[ k + 1 ] = ny * ct + t.y * st;
			this.nrm[ k + 2 ] = nz * ct + t.z * st;
		}
		this.rings ++;
	}

	/** Hemispherical cap at c, facing along dir (unit), from a ring of radius r. */
	cap( c, n, b, dir, r, steps = 5, atStart = false ) {
		const p = this._v;
		const order = [];
		for ( let s = 1; s <= steps; s ++ ) {
			order.push( s );
		}
		if ( atStart ) {
			order.reverse();
			order.push( 0 );
		}
		for ( const s of order ) {
			const beta = ( s / steps ) * ( Math.PI / 2 ) * 0.999;
			p.copy( c ).addScaledVector( dir, Math.sin( beta ) * r );
			this.ring( p, n, b, dir, Math.max( r * Math.cos( beta ), 1e-4 ), beta );
		}
	}

	/**
	 * Sweep along points (array of Vector3) with radii (array or function of
	 * u in 0..1). up: a fixed up vector for flat loops, or null to carry the
	 * frame along the path.
	 */
	sweep( points, radius, { up = null, capStart = false, capEnd = true, closed = false } = {} ) {
		this.begin();
		const n = this._n;
		const b = this._b;
		const t = this._t;
		const count = points.length;
		if ( count < 2 ) {
			this.end();
			return;
		}
		const tangent = ( i, out ) => {
			const a = points[ Math.max( 0, i - 1 ) ];
			const c = points[ Math.min( count - 1, i + 1 ) ];
			if ( closed ) {
				const pa = points[ ( i - 1 + count ) % count ];
				const pc = points[ ( i + 1 ) % count ];
				return out.subVectors( pc, pa ).normalize();
			}
			return out.subVectors( c, a ).normalize();
		};
		tangent( 0, t );
		if ( up ) {
			b.crossVectors( t, up ).normalize();
			n.crossVectors( b, t ).normalize();
		} else {
			const helper = Math.abs( t.y ) < 0.9 ? new THREE.Vector3( 0, 1, 0 ) : new THREE.Vector3( 1, 0, 0 );
			b.crossVectors( t, helper ).normalize();
			n.crossVectors( b, t ).normalize();
		}
		const r = ( i ) => ( typeof radius === 'function' ? radius( i / ( count - 1 ) ) : radius );
		if ( capStart && ! closed ) {
			this.cap( points[ 0 ], n, b, t.clone().negate(), r( 0 ), 5, true );
		}
		const prevT = new THREE.Vector3().copy( t );
		const q = new THREE.Quaternion();
		const rings = closed ? count + 1 : count;
		for ( let ii = 0; ii < rings; ii ++ ) {
			const i = ii % count;
			tangent( i, t );
			if ( up ) {
				b.crossVectors( t, up ).normalize();
				n.crossVectors( b, t ).normalize();
			} else if ( ii > 0 ) {
				q.setFromUnitVectors( prevT, t );
				n.applyQuaternion( q );
				b.applyQuaternion( q );
			}
			prevT.copy( t );
			this.ring( points[ i ], n, b, t, r( i ) );
		}
		if ( capEnd && ! closed ) {
			this.cap( points[ count - 1 ], n, b, t, r( count - 1 ) );
		}
		this.end();
	}

	end() {
		const g = this.geometry;
		g.setDrawRange( 0, Math.max( 0, this.rings - 1 ) * this.radial * 6 );
		g.attributes.position.needsUpdate = true;
		g.attributes.normal.needsUpdate = true;
		this.mesh.visible = this.rings > 1;
	}
}
