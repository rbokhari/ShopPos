import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import branchReducer from './branchReducer';
import authReducer from './authReducer';
import items from './itemReducer';
import categories from './categoryReducer';
import products from './productReducer';
import customers from './customerReducer';
import purchaseOrders from './purchaseOrderReducer';
import users from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  form,
  branch: branchReducer,
  auth: authReducer,
  ajaxCallsInProgress, 
  items,
  categories,
  products,
  customers,
  purchaseOrders,
  users
});

export default rootReducer;