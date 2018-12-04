import fetch from 'isomorphic-fetch';
import * as actionCreatorUtilities from "../../util/actionCreatorUtilities";

var targetServer;
const mockServer = 'demo3896162.mockable.io/'
const testServer = 'https://api.magicthegathering.io/v1/'
const SETS_API = 'sets/'

const REQUEST_SETS = 'REQUEST_SETS'
const RECEIVE_SETS = 'RECEIVE_SETS'

//region GET endpoints
export function fetchSets() {
    return (dispatch, getState) => {
        dispatch(requestSets());
        //targetServer = getState().homeReducer.targetServer;
        targetServer = testServer
        return fetch(targetServer + SETS_API)
            .then(response => response.json())
            .then(json => dispatch(receiveSets(json)))
            .catch(err => {
                // If this sandbox doesnt have the endpoints, use mock endpoints
                console.warn('ERROR IN DATA ENDPOINT', err)
            })
    };
}

function requestSets() {
    return {
        type: REQUEST_SETS,
        receivedAt: Date.now(),
    };
}

function receiveSets(json) {
    console.log('SETS DATA', json)
    let data = actionCreatorUtilities.parseDateStringsToISO(json.data)
    return {
        type: RECEIVE_SETS,
        mtgSets: json.sets,
        receivedAt: Date.now(),
    };
}