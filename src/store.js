import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'

const loggerMiddleware = createLogger({
    predicate: (getState, action) =>
    action.type !== "@@redux-form/REGISTER_FIELD" &&
    action.type !== "@@redux-form/UNREGISTER_FIELD" &&
    action.type !== "@@redux-form/UPDATE_SYNC_ERRORS" &&
    action.type !== "@@redux-form/UPDATE_SYNC_WARNINGS",
    collapsed: (getState, action) => true
})

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        )
    )
}