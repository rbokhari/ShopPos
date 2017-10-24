import CustomerApi from '../api/CustomerApi';
import * as types from './types';

export function loadCustomerByDayId(id) {
    return function(dispatch) {
        return CustomerApi.getAllCustomersByDayId(id)
            .then(res => {
                dispatch({
                    type: types.LOAD_DAY_CUSTOMER_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => { 
                throw(err); 
            });
    };
}

export function printCustomer(id, newStatus) {
    return function(dispatch) {
        return CustomerApi.printCustomersById(id, newStatus)
            .then(res => {

            })
            .catch(err => { 
                throw(err); 
            });
    };
}