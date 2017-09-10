import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import { BranchPage } from './components/branch';
import { ItemPage, ItemNew } from './components/item/';
import { PurchasePage, StockNew } from './components/purchase';
import { CategoryType, CategoryPage, CategoryNew } from './components/category';
import { SupplierPage, SupplierNew } from './components/supplier';
import { ProductPage, ProductNew } from './components/product';
import { Dashboard } from './components/common';
import { UserPage, UserNew } from './components/user';
import { ExpenseMasterList, ExpenseMasterPage, ExpenseMasterNew } from './components/expenseMaster';
import { ExpensePage, ExpenseNew } from './components/expense';
import { KitchenBoard, DispatchBoard } from './components/common';
import { ReportPage } from './components/report';
import { SignIn, Signout, CreateAccount, RequireAuth } from './components/auth';
import { DayPage } from './components/day';

const routes = <Route path="/" component={App}>
                <IndexRoute component={RequireAuth(Dashboard)} />
                
                <Route path="signin" component={SignIn} />
                <Route path="signout" component={Signout} />
                <Route path="createAccount" component={CreateAccount} />

                <Route path="branch" component={BranchPage} />

                <Route path="item" component={ItemPage} />
                <Route path="item/new" component={ItemNew} />
                <Route path="item/:id/edit" component={ItemNew} />

                <Route path="purchase" component={PurchasePage} />
                <Route path="purchase/new" component={StockNew} />
                <Route path="purchase/:id/edit" component={StockNew} />

                <Route path="type" component={CategoryType} />
                
                <Route path="category" component={CategoryPage} />
                <Route path="category/new" component={CategoryNew} />
                <Route path="category/:id/edit" component={CategoryNew} />

                <Route path="supplier" component={SupplierPage} />
                <Route path="supplier/new" component={SupplierNew} />
                <Route path="supplier/:id/edit" component={SupplierNew} />
                
                <Route path="day" component={DayPage} />

                <Route path="product" component={ProductPage} />
                <Route path="product/new" component={ProductNew} />
                <Route path="product/:id/edit" component={ProductNew} />

                <Route path="kitchen" component={KitchenBoard} />
                <Route path="dispatch" component={DispatchBoard} />

                <Route path="report" component={ReportPage} />
                
                <Route path="users" component={UserPage} />
                <Route path="users/:id/edit" component={UserNew} />
                <Route path="users/new" component={UserNew} />

                <Route path="master" component={ExpenseMasterPage} />
                <Route path="master/new" component={ExpenseMasterNew} />
                <Route path="master/:id/edit" component={ExpenseMasterNew} />

                <Route path="expense" component={ExpensePage} />
                <Route path="expense/new" component={ExpenseNew} />
                <Route path="expense/:id/edit" component={ExpenseNew} />

</Route>;

export default routes;