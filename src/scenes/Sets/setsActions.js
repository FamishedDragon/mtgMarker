import fetch from 'isomorphic-fetch';

var targetServer;
const mockServer = 'demo3896162.mockable.io/'
const SETS_API = 'api/sets/'

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
                // dispatch(markAsMockData())
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
        type: RECIEVE_SETS,
        mtgSets: data,
        receivedAt: Date.now(),
    };
}