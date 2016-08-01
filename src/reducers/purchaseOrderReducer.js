import * as types from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.purchaseOrders, action) {
    switch(action.type) {
        case types.LOAD_PURCHASE_ORDER_SUCCESS:
            //return [...state, ...action.items];
            return action.payload;
        case types.CREATE_PURCHASE_ORDER_SUCCESS:
            return [    
                ...state, 
                Object.assign({}, action.payload)
            ];

        case types.UPDATE_PURCHASE_ORDER_SUCCESS:
            return [ 
                ...state.filter( po => po._id !== action.payload._id), 
                Object.assign({}, action.po)
            ];


        default:
            return state;
    }

}

