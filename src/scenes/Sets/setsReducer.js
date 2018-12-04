import rootReducer from '../../rootReducer';
function setsReducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        mtgSets: []
    },
    action
) {
    switch (action.type) {
        case 'REQUEST_SETS':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_SETS':
            return Object.assign({}, state, {
                isFetching: false,
                mtgSets: action.mtgSets
            });
        default:
            return state;
    }
}

export default setsReducer;
