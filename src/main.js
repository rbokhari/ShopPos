import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import io from 'socket.io-client';

// import App from './components/App.jsx';
// import ItemPage from './components/item/ItemPage.js';
// import ItemNew from './components/item/ItemNew.js';

// import StockNew from './components/purchase/StockNew';
// import PurchasePage from './components/purchase/PurchasePage';

// import CategoryType from './components/category/CategoryType';
// import CategoryPage from './components/category/CategoryPage';
// import CategoryNew from './components/category/CategoryNew';

// import SupplierPage from './components/supplier/SupplierPage';
// import SupplierNew from './components/supplier/SupplierNew';

// import ProductPage from './components/product/ProductPage';
// import ProductNew from './components/product/ProductNew';

// import Dashboard from './components/common/Dashboard';
// import UserPage from './components/user/UserPage';
// import UserNew from './components/user/UserNew';

// import { ExpenseMasterList, ExpenseMasterPage, ExpenseMasterNew } from './components/expenseMaster';

// import ExpensePage from './components/expense/ExpensePage';
// import ExpenseNew from './components/expense/ExpenseNew';

// import KitchenBoard from './components/common/kitchenBoard';
// import DispatchBoard from './components/common/DispatchBoard';

// import ReportPage from './components/report/ReportPage';

// import SignIn from './components/auth/signin';
// import Signout from './components/auth/signout';
// import CreateAccount from './components/auth/createAccount';
// import RequireAuth from './components/auth/requireAuth';
import routes from './routes';

import { userInfo, loadCustomers} from './actions/index';
import { AUTH_USER } from './actions/types';
import reducers from './reducers';

require('./main.scss');

//const createStoreWithMiddleware = applyMiddleware(reduxLogger(), reduxThunk)(createStore);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

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
