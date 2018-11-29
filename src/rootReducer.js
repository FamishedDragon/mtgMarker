import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './scenes/Home/homeReducer';
// import shopReducer from './scenes/Shop/shopReducer';
// import turfWarReducer from "./scenes/TurfWar/turfWarReducer";

const rootReducer = combineReducers({
    homeReducer,
    form: formReducer,
});

export default rootReducer;
