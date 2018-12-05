function cardsReducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        mtgCards: []
    },
    action
) {
    switch (action.type) {
        case 'REQUEST_CARDS':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_CARDS':
            return Object.assign({}, state, {
                isFetching: false,
                mtgCards: action.mtgCards
            });
        default:
            return state;
    }
}

export default cardsReducer;
