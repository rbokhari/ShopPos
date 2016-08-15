/*jshint esversion: 6 */

import * as types from './types';
import { browserHistory } from 'react-router';

import { beginAjaxCall } from './ajaxStatusActions';

import authApi from '../api/AuthApi';
import itemApi from '../api/ItemApi';
import categoryApi from '../api/CategoryApi';
import productApi from '../api/ProductApi';
import customerApi from '../api/CustomerApi';
import purchaseOrderApi from '../api/PurchaseOrderApi';

export function loadBranch() {
    return function( dispatch ) {
        dispatch({ type: types.LOAD_BRANCH }); // this is redux-thunk in action 
    };
}

export function loadBranches() {
    return function(dispatch) {
        return authApi.loadBranches()
            .then(response=> {
                dispatch( {
                    type: types.LOAD_BRANCH_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error=> {

            });
    }
}

export function changeBranch(branch) {
    return function( dispatch ) {
        localStorage.setItem('officeId', branch._id);
        dispatch({ 
            type: types.SWITCH_BRANCH,
            payload: branch
        }); // this is redux-thunk in action 
    };
}

export function showCreateBranch() {
    return function( dispatch ) {
        dispatch({ type: types.SHOW_CREATE_BRANCH }); // this is redux-thunk in action 
    };
}

export function closeBranchDialog() {
    return function(dispatch) {
        dispatch( { type: types.CLOSE_BRANCH_DIALOG} );
    }
} 

export function createBranch({name, displayName, location, officeNo, mobileNo, status}) {
    return function(dispatch) {
        return authApi.createBranch( {name, displayName, location, officeNo, mobileNo, status})
            .then(response => {
                // update state to indicate user is authenticated
                localStorage.setItem('officeId', response.data._id);
                dispatch({ 
                    type: types.CREATE_BRANCH_SUCCESS,
                    payload: response.data 
                });
                dispatch({ 
                    type: types.SWITCH_BRANCH,
                    payload: response.data._id 
                });
                // save the JWT token
            })
            .catch((error) => {
                dispatch(authError(error));
            });
    };
}

export function authError(error) {
    return {
        type: types.AUTH_ERROR,
        payload: error
    };
}

export function signinUser( {email, password }) {
    // submit email/password to server
    return function(dispatch) {
        return authApi.signIn({email:email, password: password})
            .then(response => {
                // update state to indicate user is authenticated
                dispatch( { type: types.AUTH_USER } );
                // save the JWT token
                localStorage.setItem('token', response.data.token);
                // redirect to dashboard
                browserHistory.push('/');
            })
            .catch((error) => {
                dispatch(authError(`Bad login info ${error}`));
            });
    };
}

export function userInfo() {
    return function(dispatch) {
        return authApi.userInfo()
                .then(response => {
                    localStorage.setItem('companyId', response.data.user.companyId);
                    localStorage.setItem('officeId', response.data.user.officeId);
                    
                    if (response.data.user.roleId == 1){
                        if (response.data.user.branchCount > 0) {
                            dispatch({ type: types.LOAD_BRANCH });
                        }else {
                            dispatch({ type: types.SHOW_CREATE_BRANCH });
                        }
                    }
                    if (response.data.user.officeId === 0) {
                                                    
                    }
                })
                .catch(error => {

                });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('companyId');
    localStorage.removeItem('officeId');
    return { type : types.UNAUTH_USER };
}

export function CompanyExists() {
    return authApi.companyExists( 'company')
        .then(response=>{

        })
        .catch((error)=> {return {name: error.response.data.error}});
}

export function AccountCreate({ name, displayName, location, contactNo, email, password, confirmPassword}) {
    const data = {
        name, displayName, location, contactNo, email, password
    };
    return function(dispatch){
        return authApi.createAccount(data)
            .then(res => {
                dispatch( { type: types.AUTH_USER } );
                localStorage.setItem('companyId', res.data.companyId);
                localStorage.setItem('token', response.data.token);
                // redirect to dashboard
                browserHistory.push('/');                
            })
            .catch((error) => {
                //console.error("error",error.response);
                dispatch(authError(error.response.data.error));
            });
    };
}


// Item's Actions 
export function loadItemsSuccess( items ) {
    return {
        type: types.LOAD_ITEMS_SUCCESS,
        items: items.data
    };
}

export function updateItemSuccess( item ) {
    return {
        type: types.UPDATE_ITEM_SUCCESS,
        item: item.data
    };
}

export function createItemSuccess( item ) {
    return {
        type: types.CREATE_ITEM_SUCCESS,
        item: item.data
    };
}

export function loadItems() {
    return function( dispatch ) {
        dispatch( beginAjaxCall() );
        return itemApi.getAllItems().then( items => {
            dispatch( loadItemsSuccess( items ) );
        }).catch( error => {
            throw( error );
        });
    };
    // return {
    //     type: types.LOAD_ITEMS,
    //     items: [
    //         { 'id': 1, 'name': 'First Item', 'stock': '10', 'description': 'first desc', 'status': 'active' },
    //         { 'id': 2, 'name': 'Second Item', 'stock': '15', 'description': 'second desc','status': 'active' },
    //         { 'id': 3, 'name': 'Third Item', 'stock': '18', 'description': 'third desc','status': 'active' }
    //     ]
    // }
}

export function createItem( item ) {  // this becomes action to send to reducer
    // browserHistory.push('/item');
    // return {
    //     type: types.CREATE_ITEM,
    //     item
    // };
    item.companyId = localStorage.getItem('companyId');
    item.officeId = localStorage.getItem('officeId');
    return function( dispatch, getState ) {
        dispatch( beginAjaxCall() );
        return itemApi.saveItem( item ).then( item => {
            item.id ? dispatch( updateItemSuccess( item ) ) : dispatch( createItemSuccess( item ) );
        }).catch( error => {
            throw( error );
        })
    };
}
//-------------------------------------

// Category's Actions
export function updateCategorySuccess( category ) {
    return {
        type: types.UPDATE_CATEGORY_SUCCESS,
        category: category.data
    };
}

export function createCategorySuccess( category ) {
    return {
        type: types.CREATE_CATEGORY_SUCCESS,
        category: category.data
    };
}

export function loadCategoriesSuccess( categories ) {
    return {
        type: types.LOAD_CATEGORY_SUCCESS,
        categories: categories.data
    };
}

export function loadCategories() {
    return function( dispatch ) {
        dispatch( beginAjaxCall() );
        return categoryApi.getAllCategories().then( categories => {
                dispatch(loadCategoriesSuccess( categories ) );
            }
        ).catch( error => {
                console.error( error );
            }
        );
    };
}

export function createCategory( category ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        dispatch( beginAjaxCall() );
        return categoryApi.saveCategory( category ).then( category => {
            category._id ? dispatch( updateCategorySuccess( category ) ) : dispatch( createCategorySuccess( category ) );
        }).catch( error => {
            throw( error );
        })
    };
}

// Product's Actions
export function updateProductSuccess( product ) {
    return {
        type: types.UPDATE_PRODUCT_SUCCESS,
        product: product.data
    };
}

export function createProductSuccess( product ) {
    return {
        type: types.CREATE_PRODUCT_SUCCESS,
        product: product.data
    };
}

export function loadProductsSuccess( products ) {
    return {
        type: types.LOAD_PRODUCT_SUCCESS,
        products: products.data
    };
}

export function loadProducts() {
    return function( dispatch ) {
        dispatch( beginAjaxCall() );
        return productApi.getAllProducts().then( products => {
            dispatch( loadProductsSuccess( products ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function createProduct( product ) {  // this becomes action to send to reducer

    product.companyId = localStorage.getItem('companyId');
    product.officeId = localStorage.getItem('officeId');
    return function( dispatch, getState ) {
        dispatch( beginAjaxCall() );
        return productApi.saveProduct( product ).then( product => {
            product._id ? dispatch( updateProductSuccess( product ) ) : dispatch( createProductSuccess( product ) );

            loadProducts();
        }).catch( error => {
            throw( error );
        });
    };
}

// Customer Actions
export function updateCustomerSuccess( customer ) {
    return {
        type: types.UPDATE_CUSTOMER_SUCCESS,
        customer: customer.data
    };
}

export function createCustomerSuccess( customer ) {
    return {
        type: types.CREATE_CUSTOMER_ITEMS_SUCCESS,
        customer: customer.data
    };
}

export function updateCustomerStatusSuccess (customer, newStatus) {
    return {
        type: types.UPDATE_CUSTOMER_ITEMS_SUCCESS,
        payload: {
            customer: customer.data,
            newStatus
        }
    };
}

export function loadCustomersSuccess( customers ) {
    return {
        type: types.LOAD_CUSTOMER_ITEMS_SUCCESS,
        customers: customers.data
    };
}

export function createCustomer( customer ) {  // this becomes action to send to reducer

    customer.companyId = localStorage.getItem('companyId');
    customer.officeId = localStorage.getItem('officeId');
    return function( dispatch, getState ) {
        dispatch( beginAjaxCall() );
        return customerApi.saveCustomer( customer ).then( customer => {
            customer._id ? dispatch( updateCustomerSuccess( customer ) ) : dispatch( createCustomerSuccess( customer ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function updateCustomerStatus( customer, newStatus ) {  // this becomes action to send to reducer

    customer.companyId = localStorage.getItem('companyId');
    customer.officeId = localStorage.getItem('officeId');
    return function( dispatch, getState ) {
        dispatch( beginAjaxCall() );
        return customerApi.updateCustomerStatus( customer, newStatus ).then( customer => {
            dispatch( updateCustomerStatusSuccess( customer, newStatus ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function loadCustomers() {
    return function( dispatch ) {
        dispatch( beginAjaxCall() );
        return customerApi.getIssueCustomers().then( customers => {
            dispatch( loadCustomersSuccess( customers ) );
        }).catch( error => {
            throw( error );
        });
    };
}
 
// Purchase Order Actions
export function createPurchaseOrderSuccess( po ) {
    return {
        type: types.CREATE_PURCHASE_ORDER_SUCCESS,
        purchaseOrders: po.data
    };
}

export function loadPurchasesSuccess( purchases ) {
    return {
        type: types.LOAD_PURCHASE_ORDER_SUCCESS,
        payload: purchases.data
    };
}

export function createPurchaseOrder( po ) {  // this becomes action to send to reducer

    return function( dispatch, getState ) {
        dispatch( beginAjaxCall() );
        return purchaseOrderApi.savePurchaseOrder( po ).then( po => {
            dispatch( createPurchaseOrderSuccess( po ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function loadPurchaseOrders() {
    return function( dispatch ) {
        dispatch( beginAjaxCall() );
        return purchaseOrderApi.getAll().then( purchases => {
            dispatch( loadPurchasesSuccess( purchases ) );
        }).catch( error => {
            throw( error );
        });
    };
}