import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import companyReducer from './companyReducer';
import branchReducer from './branchReducer';
import authReducer from './authReducer';
import items from './itemReducer';
import categories from './categoryReducer';
import products from './productReducer';
import customers from './customerReducer';
import suppliers from './supplierReducer';
import purchaseOrders from './purchaseOrderReducer';
import expenses from './expenseReducer';
import users from './userReducer';
import customerData from './reportCustomerReducer';
import expenseData from './reportExpenseReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  form,
  company: companyReducer,
  branch: branchReducer,
  auth: authReducer,
  ajaxCallsInProgress, 
  items,
  categories,
  products,
  customers,
  suppliers,
  purchaseOrders,
  expenses,
  users,
  reportCustomerData: customerData,
  reportExpenseData: expenseData
});

export default rootReducer;