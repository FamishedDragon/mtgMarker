import fetch from 'isomorphic-fetch';
import * as actionCreatorUtilities from "../../util/actionCreatorUtilities";

var targetServer;
const mockServer = 'demo3896162.mockable.io/'
const SETS_API = 'api/sets/'

const REQUEST_SETS = 'REQUEST_SETS'
const RECEIVE_SETS = 'RECEIVE_SETS'

//region GET endpoints
export function fetchSets() {
    return (dispatch, getState) => {
        dispatch(requestSets());
        //targetServer = getState().homeReducer.targetServer;
        targetServer = mockServer
        return fetch(targetServer + SETS_API)
            .then(response => response.json())
            .then(json => dispatch(receiveSets(json)))
            .catch(function() {
                // If this sandbox doesnt have the endpoints, use mock endpoints
                console.log('ERROR IN DATA ENDPOINT')
                console.warn('USING MOCK DATA! (sets)')
                dispatch(mockRequestSets())
                // dispatch(fetchMockTurfWarData())
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
    let data = actionCreatorUtilities.parseDateStringsToISO(json.data)
    return {
        type: RECEIVE_SETS,
        mtgSets: data,
        receivedAt: Date.now(),
    };
}

function mockRequestSets() {
    return (dispatch, getState) => {
        dispatch(requestSets());
        return setTimeout(() => {
            dispatch( {
                type: RECEIVE_SETS,
                mtgSets: [{name: 'Alpha', year: 1993}, {name: 'Arabian Nights', year: 1993}],
                receivedAt: Date.now(),
            })
        }, 5000)
    }
}