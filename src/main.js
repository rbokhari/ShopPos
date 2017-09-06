import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
//import reduxThunk from 'redux-thunk';
//import reduxLogger from 'redux-logger';
import io from 'socket.io-client';

import routes from './routes';

import { userInfo, loadCustomers} from './actions/index';
import { AUTH_USER } from './actions/types';
//import reducers from './reducers';
import configureStore from './store/configureStore';

require('./main.scss');

//const createStoreWithMiddleware = applyMiddleware(reduxLogger(), reduxThunk)(createStore);
//const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//const store = createStoreWithMiddleware(reducers);
const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
    //store.dispatch(userInfo());
    //store.dispatch(loadProducts());
    store.dispatch(loadCustomers());
}

const socket = io('http://localhost:3090');
//var socket = io('http://localhost', {transports: ['websocket', 'polling', 'flashsocket']});
socket.on('customer', function(data) {
    store.dispatch(loadCustomers());
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>, 
    document.getElementById('container')
);
