import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './scenes/Home/homeReducer';
import setsReducer from "./scenes/Sets/setsReducer";

const rootReducer = combineReducers({
    homeReducer,
    setsReducer,
    form: formReducer,
});

export default rootReducer;
