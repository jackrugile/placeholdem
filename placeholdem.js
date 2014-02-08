( function() {
	"use strict";

	window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

	function Placeholdem( elem ) {
		var $ = this;
		$.placeholder = elem.getAttribute( 'placeholder' );

		$.init = function() {
			elem.removeAttribute( 'placeholder' );

			if( !elem.value ) {
				elem.value = $.placeholder;
			}

			$.on( elem, 'focus', function() {
				if( elem.value === $.placeholder ) {
					$.deletePlaceholder();
				}
			});

			$.on( elem, 'blur', function() {
				if( elem.value === '' ) {
					$.restorePlaceholder();
				}
			});
		};

		$.on = function( elem, eventType, handler ) {
			if( elem.addEventListener ) {
				elem.addEventListener( eventType, handler );
			} else {
				elem.attachEvent( 'on' + eventType, handler )
			}
		};

		$.deletePlaceholder = function() {
			if( elem.value.length > 0 ){
				elem.value = elem.value.slice( 0, -1 );
				requestAnimationFrame( $.deletePlaceholder );
			}
		}

		$.restorePlaceholder = function() {
			var str = elem.value;
			if( str.length < $.placeholder.length ) {
				elem.value += $.placeholder[ str.length ];
				requestAnimationFrame( $.restorePlaceholder );
			}
		}

		$.init();
	}

	var elems = document.querySelectorAll( '[placeholder]' ),
		elemsLength = elems.length,
		i;
	for( i = 0; i < elemsLength; i++ ) {
		new Placeholdem( elems[ i ] );
	}

})();