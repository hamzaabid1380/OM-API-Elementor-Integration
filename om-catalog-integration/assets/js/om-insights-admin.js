/**
 * Insights (wp-admin): tooltips on every chart mark, sortable tables,
 * the "Find" box above long tables, and the live view that refreshes itself.
 */
( function () {
	'use strict';

	var root = document.querySelector( '.om-ins' );
	if ( ! root ) {
		return;
	}
	var cfg = window.omIns || {};

	/* ---------- Tooltip: one box, text only ---------- */

	var tip = document.createElement( 'div' );
	tip.className = 'om-ins-tip';
	tip.setAttribute( 'role', 'tooltip' );
	tip.hidden = true;
	document.body.appendChild( tip );
	var current = null;

	function place( x, y ) {
		var pad = 12;
		var w = tip.offsetWidth;
		var h = tip.offsetHeight;
		var left = x - w / 2;
		var top = y - h - pad;
		left = Math.max( 8, Math.min( left, window.innerWidth - w - 8 ) );
		if ( top < 8 ) {
			top = y + pad + 8;
		}
		tip.style.left = Math.round( left ) + 'px';
		tip.style.top = Math.round( top ) + 'px';
	}

	function show( el, x, y ) {
		var text = el.getAttribute( 'data-tip' );
		if ( ! text ) {
			return;
		}
		current = el;
		tip.textContent = text;
		tip.hidden = false;
		if ( typeof x !== 'number' ) {
			var r = el.getBoundingClientRect();
			x = r.left + r.width / 2;
			y = r.top;
		}
		place( x, y );
	}

	function hide() {
		current = null;
		tip.hidden = true;
	}

	function target( node ) {
		return node && node.closest ? node.closest( '.om-ins [data-tip]' ) : null;
	}

	document.addEventListener( 'mousemove', function ( e ) {
		var el = target( e.target );
		if ( ! el ) {
			if ( current ) {
				hide();
			}
			return;
		}
		if ( el !== current ) {
			show( el, e.clientX, e.clientY );
		} else {
			place( e.clientX, e.clientY );
		}
	} );
	document.addEventListener( 'focusin', function ( e ) {
		var el = target( e.target );
		if ( el ) {
			show( el );
		} else if ( current ) {
			hide();
		}
	} );
	document.addEventListener( 'focusout', function ( e ) {
		if ( current && e.target === current ) {
			hide();
		}
	} );
	document.addEventListener( 'keydown', function ( e ) {
		if ( 'Escape' === e.key && current ) {
			hide();
		}
	} );
	window.addEventListener( 'scroll', hide, { passive: true } );
	document.addEventListener( 'mouseleave', hide );

	/* ---------- Tables: sort, find, show all ---------- */

	function state( table ) {
		if ( ! table.omIns ) {
			table.omIns = { q: '', open: false, cap: parseInt( table.getAttribute( 'data-om-ins-cap' ) || '0', 10 ) || 0 };
		}
		return table.omIns;
	}

	// Rows matching "Find"; past the cap (until "Show all"), the rest wait.
	function refreshRows( table ) {
		var st = state( table );
		var body = table.tBodies[ 0 ];
		if ( ! body ) {
			return;
		}
		var shown = 0;
		var capped = false;
		Array.prototype.forEach.call( body.rows, function ( row ) {
			var match = ! st.q || ( row.textContent || '' ).toLowerCase().indexOf( st.q ) !== -1;
			var over = false;
			if ( match ) {
				shown++;
				over = st.cap > 0 && ! st.open && ! st.q && shown > st.cap;
				capped = capped || over;
			}
			row.hidden = ! match || over;
		} );
		var wrap = table.closest( '.om-ins-scroll' );
		var more = wrap && wrap.nextElementSibling;
		if ( more && more.classList.contains( 'om-ins-showall' ) ) {
			more.hidden = ! capped;
		}
	}

	Array.prototype.forEach.call( root.querySelectorAll( 'table[data-om-ins-cap]' ), refreshRows );

	// A number column's empty cells ("–") have no value and always go last.
	function cellValue( row, index, numeric ) {
		var cell = row.children[ index ];
		if ( ! cell ) {
			return null;
		}
		if ( cell.hasAttribute( 'data-v' ) ) {
			var n = parseFloat( cell.getAttribute( 'data-v' ) );
			return isNaN( n ) ? null : n;
		}
		return numeric ? null : ( cell.textContent || '' ).trim().toLowerCase();
	}

	root.addEventListener( 'click', function ( e ) {
		var all = e.target.closest ? e.target.closest( '[data-om-ins-showall]' ) : null;
		if ( all ) {
			var holder = all.closest( '.om-ins-showall' );
			var list = holder && holder.previousElementSibling && holder.previousElementSibling.querySelector( 'table' );
			if ( list ) {
				state( list ).open = true;
				refreshRows( list );
			}
			return;
		}
		var button = e.target.closest ? e.target.closest( '.om-ins-sort' ) : null;
		if ( ! button ) {
			return;
		}
		var th = button.closest( 'th' );
		var table = button.closest( 'table' );
		var body = table && table.tBodies[ 0 ];
		if ( ! th || ! body ) {
			return;
		}
		var index = Array.prototype.indexOf.call( th.parentNode.children, th );
		var rows = Array.prototype.slice.call( body.rows );
		var numeric = rows.some( function ( row ) {
			return row.children[ index ] && row.children[ index ].hasAttribute( 'data-v' );
		} );
		var was = th.getAttribute( 'aria-sort' );
		// Numbers start biggest first, words A to Z.
		var dir = was ? ( 'descending' === was ? 'ascending' : 'descending' ) : ( numeric ? 'descending' : 'ascending' );
		Array.prototype.forEach.call( th.parentNode.children, function ( other ) {
			other.removeAttribute( 'aria-sort' );
		} );
		th.setAttribute( 'aria-sort', dir );
		var sign = 'ascending' === dir ? 1 : -1;
		rows.map( function ( row, i ) {
			return { row: row, v: cellValue( row, index, numeric ), i: i };
		} ).sort( function ( a, b ) {
			if ( null === a.v || null === b.v ) {
				return null === a.v ? ( null === b.v ? a.i - b.i : 1 ) : -1;
			}
			if ( a.v < b.v ) {
				return -sign;
			}
			if ( a.v > b.v ) {
				return sign;
			}
			return a.i - b.i;
		} ).forEach( function ( item ) {
			body.appendChild( item.row );
		} );
		refreshRows( table );
	} );

	Array.prototype.forEach.call( root.querySelectorAll( '[data-om-ins-filter]' ), function ( input ) {
		var card = input.closest( '.om-ins-card' );
		var table = card && card.querySelector( 'table' );
		if ( ! table ) {
			return;
		}
		input.addEventListener( 'input', function () {
			state( table ).q = input.value.trim().toLowerCase();
			refreshRows( table );
		} );
	} );

	/* ---------- Live ---------- */

	var liveCard = root.querySelector( '[data-om-ins-live]' );
	var countEl = root.querySelector( '[data-om-ins-livecount]' );
	var dot = root.querySelector( '.om-ins-dot' );
	var busy = false;

	function refresh() {
		if ( busy || document.hidden || ! cfg.ajax || ! window.fetch ) {
			return;
		}
		busy = true;
		var data = new FormData();
		data.append( 'action', 'om_ins_live' );
		data.append( 'nonce', cfg.nonce || '' );
		fetch( cfg.ajax, { method: 'POST', body: data, credentials: 'same-origin' } )
			.then( function ( r ) {
				return r.ok ? r.json() : null;
			} )
			.then( function ( res ) {
				if ( ! res || ! res.success || ! res.data ) {
					return;
				}
				if ( countEl ) {
					countEl.textContent = res.data.label;
				}
				if ( dot ) {
					dot.classList.toggle( 'on', res.data.count > 0 );
				}
				if ( liveCard ) {
					var body = liveCard.querySelector( '[data-om-ins-livebody]' );
					var stamp = liveCard.querySelector( '[data-om-ins-updated]' );
					if ( body ) {
						// Built and escaped by the server (admin only, nonce checked).
						body.innerHTML = res.data.html;
					}
					if ( stamp && cfg.i18n && cfg.i18n.updated ) {
						stamp.textContent = cfg.i18n.updated.replace( '%s', res.data.time );
					}
				}
			} )
			.catch( function () {} )
			.then( function () {
				busy = false;
			} );
	}

	if ( countEl || liveCard ) {
		window.setInterval( refresh, liveCard ? 20000 : 60000 );
		document.addEventListener( 'visibilitychange', function () {
			if ( ! document.hidden ) {
				refresh();
			}
		} );
	}
}() );
