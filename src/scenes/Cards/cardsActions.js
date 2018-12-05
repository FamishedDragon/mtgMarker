import fetch from 'isomorphic-fetch';

var targetServer;
const mockServer = 'demo3896162.mockable.io/'
const testServer = 'https://api.magicthegathering.io/v1/'
const CARDS_API = 'cards/'

const REQUEST_CARDS = 'REQUEST_CARDS'
const RECEIVE_CARDS = 'RECEIVE_CARDS'

//region GET endpoints
export function fetchCards() {
    return (dispatch, getState) => {
        dispatch(requestCards());
        //targetServer = getState().homeReducer.targetServer;
        targetServer = testServer
        return fetch(targetServer + CARDS_API)
            .then(response => response.json())
            .then(json => dispatch(receiveCards(json)))
            .catch(err => {
                // If this sandbox doesnt have the endpoints, use mock endpoints
                console.warn('ERROR IN GET CARDS ENDPOINT', err)
            })
    };
}

function requestCards() {
    return {
        type: REQUEST_CARDS,
        receivedAt: Date.now(),
    };
}

function receiveCards(json) {
    return {
        type: RECEIVE_CARDS,
        mtgCards: json.cards,
        receivedAt: Date.now(),
    };
}
//endregion