import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import io from 'socket.io-client';

import App from './components/App.jsx';
import ItemPage from './components/item/ItemPage.js';
import ItemNew from './components/item/ItemNew.js';

import StockNew from './components/purchase/StockNew';
import PurchasePage from './components/purchase/PurchasePage';

//import PurchaseOrder from './components/product/PurchaseOrder.js';
import CategoryType from './components/category/CategoryType.js';
import CategoryPage from './components/category/CategoryPage.js';
import CategoryNew from './components/category/CategoryNew.js';

import ProductPage from './components/product/ProductPage.js';
import ProductNew from './components/product/ProductNew.js';

import Dashboard from './components/common/Dashboard.js';
import UserList from './components/user/UserList.js';

import KitchenBoard from './components/common/kitchenBoard';
import DispatchBoard from './components/common/DispatchBoard';

import {loadItems, loadCategories, loadProducts, loadCustomers} from './actions/index';

import reducers from './reducers';

require('./main.scss');

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
store.dispatch(loadItems());
store.dispatch(loadCategories());
store.dispatch(loadProducts());
store.dispatch(loadCustomers());

const socket = io('http://localhost:3090');
//var socket = io('http://localhost', {transports: ['websocket', 'polling', 'flashsocket']});
socket.on('customer', function(data) {
    store.dispatch(loadCustomers());
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard} />
                
                <Route path="item" component={ItemPage} />
                <Route path="item/new" component={ItemNew} />
                <Route path="item/:id/edit" component={ItemNew} />

                <Route path="purchase" component={PurchasePage} />
                <Route path="purchase/new" component={StockNew} />
                <Route path="purchase/:id/edit" component={StockNew} />

                <Route path="type" component={CategoryType} />
                
                <Route path="category" component={CategoryPage} />
                <Route path="categorynew" component={CategoryNew} />
                
                <Route path="product" component={ProductPage} />
                <Route path="product/new" component={ProductNew} />
                <Route path="product/:id/edit" component={ProductNew} />

                <Route path="kitchen" component={KitchenBoard} />
                <Route path="dispatch" component={DispatchBoard} />
                
                <Route path="users" component={UserList} />
            </Route>
        </Router>
    </Provider>, 
    document.getElementById('container')
);
