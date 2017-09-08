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
import expenseMasters from './expenseMasterReducer';
import expenses from './expenseReducer';
import users from './userReducer';
import customerData from './reportCustomerReducer';
import expenseData from './reportExpenseReducer';
import purchaseData from './reportPurchaseReducer';
import day from './dayReducer';
import isLoadPasswordDialog from './passwordReducer';
import dialogReducer from './dialogReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import notification from './notificationReducer';

const rootReducer = combineReducers({
  form,
  company: companyReducer,
  branch: branchReducer,
  auth: authReducer,
  dialog: dialogReducer,
  ajaxCallsInProgress, 
  day,
  isLoadPasswordDialog,
  items,
  categories,
  products,
  customers,
  suppliers,
  purchaseOrders,
  expenseMasters,
  expenses,
  users,
  notification,
  reportCustomerData: customerData,
  reportExpenseData: expenseData,
  reportPurchaseData: purchaseData
});

export default rootReducer;