import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import branchReducer from './branch_reducer';
import items from './itemReducer';
import categories from './categoryReducer';
import products from './productReducer';
import customers from './customerReducer';
import purchaseOrders from './purchaseOrderReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  form,
  ajaxCallsInProgress, 
  branch: branchReducer,
  items,
  categories,
  products,
  customers,
  purchaseOrders
});

export default rootReducer;