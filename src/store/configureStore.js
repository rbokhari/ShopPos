import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reduxThunk from 'redux-thunk';
//import reduxLogger from 'redux-logger';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        //applyMiddleware(reduxLogger(), reduxImmutableStateInvariant())
        applyMiddleware(reduxThunk)
    );
}