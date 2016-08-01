import * as types from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.customers, action) {
    switch(action.type) {
        case types.LOAD_CUSTOMER_ITEMS_SUCCESS:
            //return [...state, ...action.items];
            return action.customers;

        case types.CREATE_CUSTOMER_ITEMS_SUCCESS:
            return [    
                ...state, 
                Object.assign({}, action.customer)
            ];

        case types.UPDATE_CUSTOMER_ITEMS_SUCCESS:
            const cust = action.payload.customer;
            // cust.status = action.payload.newStatus;

            return [
                ...state.filter( customer => customer._id !== cust._id ),
                Object.assign( {}, cust, { status: action.payload.newStatus} )
            ];
        default:
            return state;
    }

}

