import rootReducer from '../../rootReducer';
function homeReducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        targetServer: 'http://sandbox.fueled.ciegames.com:6010/bluesteel_j/',
        serverHeader: 'SandBox J'
    },
    action
) {
    switch (action.type) {
        case 'REQUEST_SWITCH_SERVER':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: true,
                targetServer: action.targetServer,
                serverHeader: action.serverHeader
            });
        // Not completely clearing the Store - see Dan Abramov's stack overflow answer to
        // orchestrate better solution
        case 'CLEAR_STORE':
            state = undefined;
            action = 'CLEAR_STORE_SUCCESS';
            return rootReducer(state, action);

        case 'CLEAR_STORE_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
            });
        case 'REQUEST_CITIES': {
            return Object.assign({}, state, { isFetching: true });
        }
        default:
            return state;
    }
}

export default homeReducer;
