import { settings } from './settings';
import { cartRequestChange, cartRequestAdd, cartRequestClear, cartRequestUpdate } from './ajax-api';
import { getCartState } from './state';

const ACTION_TOGGLE = 'toggle';
const ACTION_ADD = 'add';
const ACTION_REMOVE = 'remove';

const CHANGE_URL = '/cart/change';
const ADD_URL = '/cart/add';
const CLEAR_URL = '/cart/clear';
const UPDATE_URL = '/cart/update';

document.addEventListener('click', function(e) {

    for (var target = e.target; target && target != this; target = target.parentNode) {
    	requestButtonClickHandler.call(target, e);
		toggleClassButtonClickHandler.call(target, e);
    }

}, false);

function requestButtonClickHandler (e) {
	const { requestButtonAttribute } = settings.computed;
	let url = undefined;
	const validURLs = [ CHANGE_URL, ADD_URL, CLEAR_URL, UPDATE_URL ];

	if ( this.hasAttribute( requestButtonAttribute ) ) {
		const attr = this.getAttribute( requestButtonAttribute );
		if ( attr ) {
			let attrURL;
			try {
				attrURL = new URL(attr, window.location.origin);
				if ( validURLs.includes( attrURL.pathname ) ) {
					url = attrURL;
				} else {
					throw `URL should be one of the following: ${CHANGE_URL}, ${ADD_URL}, ${UPDATE_URL}, ${CLEAR_URL}`
				}
			} catch (error) {
				console.error(`Liquid Ajax Cart: ${requestButtonAttribute} contains an invalid URL as a parameter.`, error);
			}
		}
	}

	if ( url === undefined ) {
		if ( this.hasAttribute( 'href' ) && this.tagName.toUpperCase() === 'A' ) {
			const linkURL = new URL(this.href);
			if ( validURLs.includes( linkURL.pathname ) ) {
				url = linkURL;
			} else if ( this.hasAttribute( requestButtonAttribute ) ) {
				console.error(
					`Liquid Ajax Cart: a link with the ${requestButtonAttribute} contains an invalid href URL.`, 
					`URL should be one of the following: ${CHANGE_URL}, ${ADD_URL}, ${UPDATE_URL}, ${CLEAR_URL}`
				);
			}
		}
	}

	if ( url === undefined ) {
		return;
	}


	e.preventDefault();

	const formData = new FormData();
	url.searchParams.forEach(( value, key ) => {
		formData.append(key, value);
	});

	switch ( url.pathname ) {
		case ADD_URL:
			cartRequestAdd( formData );
			break;
		case CHANGE_URL:
			cartRequestChange( formData );
			break;
		case UPDATE_URL:
			cartRequestUpdate( formData );
			break;
		case CLEAR_URL:
			cartRequestClear();
			break;
	}
}

// function quantityButtonClickHandler (e) {
// 	e.preventDefault();
// 	const { quantityButtonAttribute } = settings.computed;
// 	const state = getCartState();
// 	if ( true || !state.status.requestInProgress ) {
// 		const [ itemKey, quantity ] = this.getAttribute( quantityButtonAttribute ).split('|');
// 		cartRequestChange({
// 			'id': itemKey.trim(),
// 			'quantity':  parseInt(quantity.trim()),
// 		});
// 	}
// }

function toggleClassButtonClickHandler (e) {
	const { toggleClassButtonAttribute } = settings.computed;

	if (!( this.hasAttribute( toggleClassButtonAttribute ) )) {
		return;
	}

	e.preventDefault();
	const parameters = this.getAttribute( toggleClassButtonAttribute ).split( '|' );
	if ( !parameters ) {
		console.error('Liquid Ajax Cart: Error while toggling body class');
		return;
	}

	const cssClass = parameters[0].trim();
	let action = parameters[1] ? parameters[1].trim() : ACTION_TOGGLE;
	if ( action !== ACTION_ADD && action !== ACTION_REMOVE ) {
		action = ACTION_TOGGLE;
	}


	if ( cssClass ) {
		try {
			if ( action === ACTION_ADD ) {
				document.body.classList.add( cssClass );
			} else if ( action === ACTION_REMOVE ) {
				document.body.classList.remove( cssClass );
			} else {
				document.body.classList.toggle( cssClass );
			}
        } catch (e) {
        	console.error('Liquid Ajax Cart: Error while toggling body class:', cssClass)
        	console.error(e);
        }
	}
}