( function() {
	"use strict";

	function on( elem, eventType, handler ) {
		if( elem.addEventListener ) {
			elem.addEventListener( eventType, handler );
		} else {
			elem.attachEvent( 'on' + eventType, handler )
		}
	}

	function reduceInputLength( elem ) {
		var str = elem.value;
		if( str.length > 0 ){
			str = str.slice( 0, -1 );
			elem.value = str;
			setTimeout( function() {
				reduceInputLength( elem );
			}, 20 );
		}
	}

	function increaseInputLength( elem, target ) {
		var str = elem.value;
		if( str.length < target.length ) {
		str += target[ str.length ];
			elem.value = str;
			setTimeout( function() {
			increaseInputLength( elem, target );
			}, 20 );
		}
	}

	var elems = document.querySelectorAll( '[placeholder]' ),
		elemsLength = elems.length,
		i;

	for( i = 0; i < elemsLength; i++ ) {
		var elem = elems[ i ],
			placeholder = elem.getAttribute( 'placeholder' );

		elem.setAttribute( 'data-placeholder', placeholder );
		elem.removeAttribute( 'placeholder' );

			if( !elem.value ) {
				elem.value = placeholder;
			}

		on( elem, 'focus', function() {
			if( this.value === this.getAttribute( 'data-placeholder' ) ) {
				reduceInputLength( this );
				} 
		});

		on( elem, 'blur', function() {
			if( this.value === '' ) {
				increaseInputLength( this, this.getAttribute( 'data-placeholder' ) );
			}
		});
	}

})();