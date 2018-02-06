/*jshint esversion: 6 */
import FileSaver from 'file-saver';

import * as types from './types';
import { browserHistory } from 'react-router';
import { USER_ROLE, PRODUCT_TYPE } from '../../shared/constants';

import { hideNotification, successNotification, errorNotification } from './notification';
import { loadOpenDay, loadCloseDay, createDay, loadDays, printDay, loadDayById } from './day';
import { loadCustomerByDayId, printCustomer } from './customer';

import { beginAjaxCall } from './ajaxStatusActions';

import authApi from '../api/AuthApi';
import itemApi from '../api/ItemApi';
import categoryApi from '../api/CategoryApi';
import productApi from '../api/ProductApi';
import customerApi from '../api/CustomerApi';
import supplierApi from '../api/SupplierApi';
import expenseMasterApi from '../api/expenseMasterApi';
import expenseApi from '../api/expenseApi';
import purchaseOrderApi from '../api/PurchaseOrderApi';
import usersApi from '../api/usersApi';
import reportApi from '../api/ReportApi';
import dayApi from '../api/dayApi';

export {
    hideNotification, successNotification, errorNotification,
    loadOpenDay, loadCloseDay, createDay, loadDays, printDay,
    loadCustomerByDayId, printCustomer, loadDayById
};

// export function showNotification(message) {
//     return function(dispatch) {
//         dispatch({
//             type: types.NOTIFICATION_ERROR_SHOW,
//             payload: message
//         });
//     };
// }
// export function showNotification(message) {
//     return function( dispatch) {
//         dispatch( { 
//             type: types.NOTIFICATION_ERROR_SHOW,
//             payload: message 
//         });
//     };
// }


// export function hideNotification() {
//     return function(dispatch) {
//         dispatch({
//             type: types.NOTIFICATION_ERROR_HIDE
//         });
//     };
// }

export function changePassword(obj) {
    return function(dispatch) {
        return authApi.changePassword(obj)
            .then(res => {
                
            })
            .catch(err => {
                throw(err);
            });
    };
}


export function loadPasswordChangeDialog() {
    return function( dispatch) {
        dispatch( { type: types.LOAD_PASSWORD_CHANGE_DIALOG });
    };
}

export function loadCustomerDetailDialog(customer) {
    return function (dispatch) {
        dispatch( {
            type: types.DIALOG_CUSTOMER_DETAIL_OPEN,
            payload: customer
        });
    };
}

export function closeCustomerDetailDialog() {
    return function (dispatch) {
        dispatch( {
            type: types.DIALOG_CUSTOMER_DETAIL_CLOSE
        });
    };
}

export function closePasswordChangeDialog() {
    return function( dispatch) {
        dispatch( { type: types.CLOSE_PASSWORD_CHANGE_DIALOG } );
    };
}

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
                throw(error); 
            });
    };
}

export function changeBranch(branch) {
    return function( dispatch ) {
        localStorage.setItem('officeId', branch.branchId);
        dispatch({ 
            type: types.SWITCH_BRANCH,
            payload: branch
        }); // this is redux-thunk in action 
    };
}

export function activateBranch(branch) {
    return function(dispatch) {
        //return authApi.activateBranch(id)
        //    .then(res=> {
        const currentBranch = { ...branch,  branchId: branch._id };
        localStorage.setItem('officeId', branch._id);
        dispatch({ 
            type: types.SWITCH_BRANCH,
            payload: currentBranch
        }); 
        //    });
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
    };
} 

//export function createBranch({name, displayName, location, officeNo, mobileNo, status}) {
export function createBranch(newBranch) {
    return function(dispatch) {
        return authApi.createBranch(newBranch)
            .then(response => {
                // update state to indicate user is authenticated
                localStorage.setItem('officeId', response.data._id);
                dispatch({ 
                    type: types.CREATE_BRANCH_SUCCESS,
                    payload: response.data 
                });
                // dispatch({ 
                //     type: types.SWITCH_BRANCH,
                //     payload: response.data 
                // });
                // save the JWT token
            })
            .catch(error => {
                //dispatch(authError(error));
                throw(error);
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
                // save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('companyId', response.data.user.companyId);
                if (response.data.user.officeId == 0) {
                    dispatch(loadBranch());
                } else {
                    localStorage.setItem('officeId', response.data.user.officeId);
                }

                // dispatch({ type: types.AUTH_USER });
                // dispatch({ 
                //     type: types.AUTH_USER_INFO, 
                //     payload: response.data.user
                // });
               //alert("push");
                
                const data = response.data.user;
                // const company = {
                //     companyId: data.company.companyId,
                //     name: data.company.name,
                //     displayName: data.company.displayName
                // };
                // dispatch({ 
                //         type: types.LOAD_COMPANY,
                //         payload: company
                // });

                const user = {
                    userId: data.userId,
                    name: data.name,
                    roleId: data.roleId,
                    status: data.status,
                    companyId: data.companyId,
                    officeId: data.officeId 
                };
                dispatch({ 
                    type: types.AUTH_USER_INFO, 
                    payload: user
                });

                const company = {
                    companyId: data.company.companyId,
                    name: data.company.name,
                    displayName: data.company.displayName
                };
                dispatch({ 
                    type: types.LOAD_COMPANY,
                    payload: company
                });


                browserHistory.push('/');
                // if (data.officeId !== 0 && data.roleId !== USER_ROLE.ADMIN) {
                //     const branch = {
                //         branchId: data.branch.branchId,
                //         name: data.branch.name,
                //         displayName: data.branch.displayName,
                //         office: data.branch.office,
                //         mobile: data.branch.mobile
                //     };
                //     dispatch({ 
                //         type: types.SWITCH_BRANCH,
                //         payload: branch
                //     }); // this is redux-thunk in action
                //     browserHistory.push('/');
                // }else if (data.roleId == USER_ROLE.ADMIN){
                //     if (response.data.user.branch.length > 0) {
                //         dispatch({ type: types.LOAD_BRANCH });
                //         browserHistory.push('/');
                //     }else {
                //         dispatch({ type: types.SHOW_CREATE_BRANCH });
                //     }
                //     browserHistory.push('/');
                // }                
                // redirect to dashboard
                
            })
            .catch((error) => {
                console.info("error", error);
                dispatch(authError(`Bad login info ${error}`));
                throw(error);
            });
    };
}

export function userInfo() {
    return function(dispatch) {
        dispatch({ type: types.AUTH_LOADING_START });
        return authApi.userInfo()
                .then(response => {
                    const data = response.data.user;
                    localStorage.setItem('companyId', data.companyId);

                    const localOffice = localStorage.getItem('officeId');
                    if (!localOffice && localOffice != '0') {
                        localStorage.setItem('officeId', data.officeId);
                        //activeOffice = data.officeId;
                    }
                    
                    const company = {
                        companyId: data.company.companyId,
                        name: data.company.name,
                        displayName: data.company.displayName
                    };
                    dispatch({ 
                        type: types.LOAD_COMPANY,
                        payload: company
                    });

                    const user = {
                        userId: data.userId,
                        name: data.name,
                        roleId: data.roleId,
                        status: data.status,
                        companyId: data.companyId,
                        officeId: data.officeId 
                    };
                    dispatch({ 
                        type: types.AUTH_USER_INFO, 
                        payload: user
                    });
                    
                    //if (data.officeId !== '0' && data.roleId !== USER_ROLE.ADMIN) {
                    if (!localOffice) { // && data.roleId !== USER_ROLE.ADMIN) {
                        const branch = {
                            branchId: data.branch.branchId,
                            name: data.branch.name,
                            displayName: data.branch.displayName,
                            office: data.branch.office,
                            mobile: data.branch.mobile
                        };

                        dispatch({ 
                            type: types.SWITCH_BRANCH,
                            payload: branch
                        }); // this is redux-thunk in action

                    }else {//if (data.roleId == USER_ROLE.ADMIN){
                        if (data.branch) {
                            if (data.branch instanceof Array) {
                                const activeBranch = data.branch
                                                            .filter((b, i) => {
                                                                return b.branchId === localOffice;
                                                            })
                                                            .map((b,i) => {
                                                                return {
                                                                    branchId: b.branchId,
                                                                    name: b.name,
                                                                    displayName: b.displayName,
                                                                    office: b.office,
                                                                    mobile: b.mobile,
                                                                    isActive: b.isActive
                                                                };
                                                            })[0];
                                localStorage.setItem('officeId', activeBranch.branchId);
                                dispatch({
                                    type: types.SWITCH_BRANCH,
                                    payload: activeBranch
                                });
                            } else {
                                localStorage.setItem('officeId', data.branch.branchId);
                                dispatch({
                                    type: types.SWITCH_BRANCH,
                                    payload: data.branch
                                });
                            }
                            //dispatch({ type: types.LOAD_BRANCH });
                            //alert("now");
                            

                            // localStorage.setItem('officeId', branch.branchId);
                            // dispatch({ 
                            //     type: types.SWITCH_BRANCH,
                            //     payload: branch
                            // }); 
                        }else {
                            dispatch({ type: types.SHOW_CREATE_BRANCH });
                        }
                        dispatch({ type: types.AUTH_LOADING_END });
                    }
                })
                .catch(error => {
                    console.error('userInfo Action Error', error);
                    throw(error);
                });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('companyId');
    localStorage.removeItem('officeId');
    localStorage.removeItem('dayId');
    return { type : types.UNAUTH_USER };
}

export function CompanyExists() {
    return authApi.companyExists( 'company')
        .then(response=>{

        })
        .catch((error)=> {
            //return {name: error.response.data.error}
            throw(error);
        });
}

export function accountCreate({ name, displayName, location, contactNo, email, password, confirmPassword}) {
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
                throw(error);
            });
    };
}


// Item's Actions 
export function loadItemsSuccess( items ) {
    return {
        type: types.LOAD_ITEMS_SUCCESS,
        payload: items.data
    };
}

export function updateItemSuccess( item ) {
    return {
        type: types.UPDATE_ITEM_SUCCESS,
        payload: item.data
    };
}

export function createItemSuccess( item ) {
    return {
        type: types.CREATE_ITEM_SUCCESS,
        payload: item.data
    };
}

export function loadItems() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
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
        //dispatch( beginAjaxCall() );
        return itemApi.saveItem( item ).then( item => {
            item._id ? dispatch( updateItemSuccess( item ) ) : dispatch( createItemSuccess( item ) );
        }).catch( error => {
            console.error("createItem", error);
            throw( error );
        });
    };
}
//-------------------------------------

// Category's Actions
export function updateCategorySuccess( category ) {
    return {
        type: types.UPDATE_CATEGORY_SUCCESS,
        payload: category.data
    };
}

export function createCategorySuccess( category ) {
    return {
        type: types.CREATE_CATEGORY_SUCCESS,
        payload: category.data
    };
}

export function loadCategoriesSuccess( categories ) {
    return {
        type: types.LOAD_CATEGORY_SUCCESS,
        payload: categories.data
    };
}

export function loadCategories() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return categoryApi.getAllCategories().then( categories => {
                dispatch(loadCategoriesSuccess( categories ) );
            }
        ).catch( error => {
                console.error( error );
                throw(error);
        });
    };
}

export function createCategory( category ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return categoryApi.saveCategory( category ).then( category => {
            category._id == '0' ? dispatch( createCategorySuccess( category ) ) : dispatch( updateCategorySuccess( category ) );
        }).catch( error => {
            throw( error );
        });
    };
}

// Supplier's Actions
export function updateSupplierSuccess( supplier ) {
    return {
        type: types.UPDATE_SUPPLIER_SUCCESS,
        payload: supplier.data
    };
}

export function createSupplierSuccess( supplier ) {
    return {
        type: types.CREATE_SUPPLIER_SUCCESS,
        payload: supplier.data
    };
}

export function loadSupplierSuccess( suppliers ) {
    return {
        type: types.LOAD_SUPPLIER_SUCCESS,
        payload: suppliers.data
    };
}

export function loadSuppliers() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return supplierApi.getAllSuppliers().then( suppliers => {
                dispatch(loadSupplierSuccess( suppliers ) );
            }
        ).catch( error => {
            throw(error);
        });
    };
}

export function createSupplier( supplier ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return supplierApi.saveSupplier( supplier ).then( supplier => {
            supplier._id == '0' ? dispatch( createSupplierSuccess( supplier ) ) : dispatch( updateSupplierSuccess( supplier ) );
        }).catch( error => {
            throw( error );
        });
    };
}

// Product's Actions
export function updateProductSuccess( product ) {
    return {
        type: types.UPDATE_PRODUCT_SUCCESS,
        payload: product.data
    };
}

export function createProductSuccess( product ) {
    return {
        type: types.CREATE_PRODUCT_SUCCESS,
        payload: product.data
    };
}

export function loadProductsSuccess( products ) {
    return {
        type: types.LOAD_PRODUCT_SUCCESS,
        payload: products.data
    };
}

export function loadProducts() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return productApi.getAllProducts().then( products => {
            dispatch( loadProductsSuccess( products ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function createProduct( product ) {  // this becomes action to send to reducer

    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
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
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return customerApi.saveCustomer( customer )
            .then(customer => {
                var isKitchen = false;
                customer.data.products.filter((product, index) => {
                    if (product.type == PRODUCT_TYPE.KITCHEN) {
                        isKitchen = true;
                    }
                });
                if (!isKitchen) {
                    dispatch(updateCustomerStatus(customer.data, 3));
                }
                customer._id ? dispatch( updateCustomerSuccess( customer ) ) : dispatch( createCustomerSuccess( customer ) );
            }).catch( error => {
                throw( error );
            });
    };
}

export function updateCustomerStatus( customer, newStatus ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return customerApi.updateCustomerStatus( customer, newStatus ).then( customer => {
            dispatch( updateCustomerStatusSuccess( customer, newStatus ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function loadCustomers() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
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
        //dispatch( beginAjaxCall() );
        return purchaseOrderApi.savePurchaseOrder( po )
        .then( po => {
            dispatch( createPurchaseOrderSuccess( po ) );
        }).catch( error => {
            throw( error );
        });
    };
}

export function loadPurchaseOrders() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return purchaseOrderApi.getAll().then( purchases => {
            dispatch( loadPurchasesSuccess( purchases ) );
        }).catch( error => {
            throw( error );
        });
    };
}


// Users's Actions
export function updateUsersSuccess( user ) {
    return {
        type: types.UPDATE_USERS_SUCCESS,
        payload: user.data
    };
}

export function createUsersSuccess( user ) {
    return {
        type: types.CREATE_USERS_SUCCESS,
        payload: user.data
    };
}

export function loadUsersSuccess( users ) {
    return {
        type: types.LOAD_USERS_SUCCESS,
        payload: users.data
    };
}

export function loadUsers() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return usersApi.getAllUsers().then( users => {
                dispatch(loadUsersSuccess( users ) );
            }
        ).catch( error => {
                console.error( error );
            }
        );
    };
}

export function createUsers( user ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return usersApi.saveUsers( user ).then( user => {
            user._id ? dispatch( updateUsersSuccess( user ) ) : dispatch( createUsersSuccess( user ));
        }).catch( error => {
            throw( error );
        });
    };
}


// Expense Master's Actions
export function updateExpenseMasterSuccess( master ) {
    return {
        type: types.UPDATE_EXPENSE_MASTER_SUCCESS,
        payload: master.data
    };
}

export function createExpenseMasterSuccess( master ) {
    return {
        type: types.CREATE_EXPENSE_MASTER_SUCCESS,
        payload: master.data
    };
}

export function loadExpenseMastersSuccess( master ) {
    console.info("loadExpenseMastersSuccess", master);
    return {
        type: types.LOAD_EXPENSE_MASTER_SUCCESS,
        payload: master.data
    };
}

export function loadExpenseMasters() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return expenseMasterApi.getAllExpenseMasters()
            .then( masters => {
                    dispatch(loadExpenseMastersSuccess( masters ) );
            })
            .catch( error => {
                throw(error);
            });
    };
}

export function createExpenseMaster( master ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return expenseMasterApi.saveExpenseMaster( master )
            .then( master => {
                master._id ? dispatch( updateExpenseMasterSuccess( master ) ) : dispatch( createExpenseMasterSuccess( master ) );
            }).catch( error => {
                throw( error );
            });
    };
}

// Expense's Actions
export function updateExpenseSuccess( expense ) {
    return {
        type: types.UPDATE_EXPENSE_SUCCESS,
        payload: expense.data
    };
}

export function createExpenseSuccess( expense ) {
    return {
        type: types.CREATE_EXPENSE_SUCCESS,
        payload: expense.data
    };
}

export function loadExpensesSuccess( expenses ) {
    return {
        type: types.LOAD_EXPENSE_SUCCESS,
        payload: expenses.data
    };
}

export function loadExpenses() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return expenseApi.getAllExpenses().then( expenses => {
            dispatch(loadExpensesSuccess( expenses ) );
        }).catch( error => {
            throw(error);
        });
    };
}

export function createExpense( expense ) {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return expenseApi.saveExpense( expense )
            .then( expense => {
                expense._id ? dispatch( updateExpenseSuccess( expense ) ) : dispatch( createExpenseSuccess( expense ) );
            }).catch( error => {
                throw( error );
            });
    };
}

//  Report Actions
export function loadCustomerTransaction(fromDate, toDate) {
    return function(dispatch) {
        return reportApi.getCustomerTransaction(fromDate, toDate)
            .then( data => {
                dispatch( {
                    type: types.LOAD_REPORT_CUSTOMER_DATE_DATA_SUCCESS,
                    payload: data.data
                });
            }).catch( error => {
                throw (error);
            });
    };
}

export function loadExpenseTransaction(fromDate, toDate) {
    return function(dispatch) {
        return reportApi.getExpenseTransaction(fromDate, toDate)
            .then( data => {
                dispatch( {
                    type: types.LOAD_REPORT_EXPENSE_DATE_DATA_SUCCESS,
                    payload: data.data
                });
            }).catch( error => {
                throw (error);
            });
    };
}

export function loadExpenseDetailDownload(fromDate, toDate) {
    return function(dispatch) {
        return reportApi.getDownloadExpenseDetail(fromDate, toDate);
//             .then( data => {
//                 //return new Blob([data]);
// // var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
// //     var objectUrl = URL.createObjectURL(blob);
// //     window.open(objectUrl);

//                 var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//                 console.log('blob length', blob.length);
//                 var csvURL = window.URL.createObjectURL(blob);
//                 var tempLink = document.createElement('a');
//                 tempLink.href = csvURL;
//                 tempLink.setAttribute('download', 'filename.xlsx');
//                 tempLink.click();
//                 //console.log("data", data);
//                 // var file = new Blob([data], {
//                 //     type: 'application/xlsx'
//                 // });
//                 // var fileURL = URL.createObjectURL(file);
//                 // var a = document.createElement('a');
//                 // a.href = fileURL;
//                 // a.target = '_blank';
//                 // a.download = 'ItemList.xlsx';
//                 // document.body.appendChild(a);
//                 // a.click();

//                 // dispatch( {
//                 //     type: types.DOWNLOAD_EXPENSE_DETAIL_REPORT_SUCCESS
//                 // });
//             // }).then( blob => {
//             //     FileSaver.saveAs(blob, 'filename.xlsx');
//             }).catch( error => {
//                 throw (error);
//             });
    };
}


export function loadPurchaseTransaction(fromDate, toDate) {
    return function(dispatch) {
        return reportApi.getPurchaseTransaction(fromDate, toDate)
            .then( data => {
                dispatch( {
                    type: types.LOAD_REPORT_PURCHASE_DATE_DATA_SUCCESS,
                    payload: data.data
                });
            }).catch( error => {
                throw (error);
            });
    };
}
