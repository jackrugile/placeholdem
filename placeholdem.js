function Placeholdem( elems ) {
	"use strict";

	(function(){var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame'];}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(callback,element){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(id){clearTimeout(id);};}());

	var P = this

	P.init = function() {
		P.elems = [];
		P.elemsLength = elems.length;
		P.i = 0;
		if( P.elemsLength ) {
			for( ; P.i < P.elemsLength; P.i++ ) {
				P.elems.push( new P.PlaceholdemElem( elems[ P.i ] ) );
			}
		} else {
			P.elems.push( new P.PlaceholdemElem( elems ) );
		}
	};

	P.destroy = function() {
		P.elemsLength = P.elems.length;
		P.i = 0;
		if( P.elemsLength ) {
			for( ; P.i < P.elemsLength; P.i++ ) {
				P.elems[ P.i ].destroy();
			}
			P.elems.length = 0;
		}
	};

	P.PlaceholdemElem = function( elem ) {
		var PE = this;

		PE.init = function() {
			PE.rAF = null;
			PE.inFlux = false;
			PE.elem = elem;
			PE.placeholder = PE.elem.getAttribute( 'placeholder' );
			PE.elem.removeAttribute( 'placeholder' );

			if( !PE.elem.value ) {
				PE.elem.value = PE.placeholder;
			}

			PE.on( PE.elem, 'focus', PE.onFocus );
			PE.on( PE.elem, 'blur', PE.onBlur);
		};

		PE.on = function( elem, eventType, handler ) {
			if( elem.addEventListener ) {
				elem.addEventListener( eventType, handler );
			} else {
				elem.attachEvent( 'on' + eventType, handler )
			}
		};

		PE.off = function( elem, eventType, handler ) {
			if( elem.removeEventListener ) {
				elem.removeEventListener( eventType, handler );
			} else {
				elem.detachEvent( 'on' + eventType, handler )
			}
		};

		PE.onFocus = function() {
			if( PE.elem.value === PE.placeholder || PE.inFlux  ) {
				PE.inFlux = true;
				cancelAnimationFrame( PE.rAF );
				PE.deletePlaceholder();
			}
		};

		PE.onBlur = function() {
			if( PE.elem.value === '' || PE.inFlux ) {
				PE.inFlux = true;
				cancelAnimationFrame( PE.rAF );
				PE.restorePlaceholder();
			}
		};

		PE.deletePlaceholder = function() {
			if( PE.elem.value.length > 0 ) {
				PE.elem.value = PE.elem.value.slice( 0, -1 );
				PE.rAF = requestAnimationFrame( PE.deletePlaceholder );
			} else {
				PE.inFlux = false;
			}
		};

		PE.restorePlaceholder = function() {
			var str = PE.elem.value;
			if( str.length < PE.placeholder.length ) {
				PE.elem.value += PE.placeholder[ str.length ];
				PE.rAF = requestAnimationFrame( PE.restorePlaceholder );
			} else {
				PE.inFlux = false;
			}
		};

		PE.destroy = function() {
			PE.elem.setAttribute( 'placeholder', PE.placeholder );
			PE.off( PE.elem, 'focus', PE.onFocus );
			PE.off( PE.elem, 'blur', PE.onBlur);
		};

		PE.init();
	};

	P.init();
}