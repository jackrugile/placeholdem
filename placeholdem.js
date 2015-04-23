/**
 * Placeholdem - Placeholder Caret Animation
 * v1.0.2 - MIT License
 * http://placeholdem.jackrugile.com - git://github.com/jackrugile/placeholdem.git
 * by Jack Rugile - @jackrugile
 */

function Placeholdem( elems ) {
	"use strict";

	(function(){var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame'];}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(callback,element){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(id){clearTimeout(id);};}());

	var P = {};

	P.customElems = ['password'];
	P.defaultInputAttributeName = 'data-defaultinputtype';

	P.init = function() {
		P.elems = [];
		if( elems && elems.length ) {
			for( var i = 0 ; i < elems.length; i++ ) {
				if( P.hasPlaceholder( elems[ i ] ) ) {
					P.elems.push( new P.PlaceholdemElem( elems[ i ] ) );
				}
			}
		} else if( elems ) {
			if( P.hasPlaceholder( elems ) ) {
				P.elems.push( new P.PlaceholdemElem( elems ) );
			}
		}
	};

	P.hasPlaceholder = function( elem ) {
		return ( typeof elem.hasAttribute === 'function' && elem.hasAttribute( 'placeholder' ) );
	};

	P.PlaceholdemElem = function( elem ) {
		var PE = this;

		PE.init = function() {
			PE.elem = elem;
			PE.form = elem.form;
			PE.placeholder = PE.elem.getAttribute( 'placeholder' );
			PE.elem.removeAttribute( 'placeholder' );
			PE.rAF = null;
			PE.animating = 0;
			PE.defaultInputType = PE.elem.getAttribute('type');

			
			PE.resetDefaultType();

			if( !PE.elem.value ) {
				PE.elem.value = PE.placeholder;
			}

			PE.on( PE.elem, 'focus', PE.onFocus );
			PE.on( PE.elem, 'blur', PE.onBlur);
			PE.on( PE.elem, 'keydown', PE.onKeydown);
			if( PE.form ) {
				PE.on( PE.form, 'reset', PE.onReset);
			}
		};

		PE.on = function( elem, eventType, handler ) {
			if( elem.addEventListener ) {
				elem.addEventListener( eventType, handler );
			} else {
				elem.attachEvent( 'on' + eventType, handler );
			}
		};

		PE.onFocus = function() {
			if( PE.animating || PE.elem.value === PE.placeholder ) {
				PE.animating = 1;
				window.cancelAnimationFrame( PE.rAF );
				PE.deletePlaceholder();
				PE.restoreDefaultType();
			}
		};

		PE.onBlur = function() {
			if( PE.animating || PE.elem.value === '' ) {
				PE.animating = 1;
				window.cancelAnimationFrame( PE.rAF );
				PE.restorePlaceholder();
				PE.resetDefaultType();
			}
		};

		PE.onKeydown = function() {
			if( PE.animating ) {
				PE.animating = 0;
				window.cancelAnimationFrame( PE.rAF );
				PE.elem.value = '';
			}
		};

		PE.onReset = function() {
			setTimeout( function() {
				PE.onBlur();
			});
		};

		PE.deletePlaceholder = function() {
			if( PE.elem.value.length > 0 ) {
				PE.elem.value = PE.elem.value.slice( 0, -1 );
				PE.rAF = window.requestAnimationFrame( PE.deletePlaceholder );
			} else {
				PE.animating = 0;
			}
		};

		PE.restorePlaceholder = function() {
			if( PE.elem.value.length < PE.placeholder.length ) {
				PE.elem.value += PE.placeholder[ PE.elem.value.length ];
				PE.rAF = window.requestAnimationFrame( PE.restorePlaceholder );
			} else {
				PE.animating = 0;
			}
		};

		PE.restoreDefaultType = function(){
			var defaultType = PE.elem.getAttribute(P.defaultInputAttributeName);
			if(defaultType && P.customElems.indexOf(defaultType) != -1 && defaultType != PE.elem.getAttribute('type')){
				PE.elem.setAttribute('type', defaultType);
			}
		};

		PE.resetDefaultType = function(){
			if(P.customElems.indexOf(PE.defaultInputType) != -1){
			    PE.elem.setAttribute(P.defaultInputAttributeName, PE.defaultInputType);
				PE.elem.setAttribute('type', 'text');
			}
		};	

		PE.init();
	};

	P.init();

	return P;
}