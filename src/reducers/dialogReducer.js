import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.dialog, action ) {
    switch( action.type ) {
        case types.DIALOG_CUSTOMER_DETAIL_OPEN:
            return { ...state, isCustomerDetailDialog: true, customer: action.payload };
        case types.DIALOG_CUSTOMER_DETAIL_CLOSE:
            return { ...state, isCustomerDetailDialog: false, customer: {} };
        default:
            return state;
    }
}

