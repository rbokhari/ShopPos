import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.days, action ) {
    switch( action.type ) {
        // case types.CREATE_DAY:
        //     return [ ...state, Object.assign( {}, action.payload ) ];
        case types.LOAD_DAY_SUCCESS:
            return { ...state, 
                all: action.payload, 
                customers: [] 
            };
        case types.LOAD_DAY_CUSTOMER_SUCCESS:
            return { ...state, 
                customers: action.payload 
            };
        case types.LOAD_SINGLE_DAY_SUCCESS:
            return { ...state, 
                day: action.payload.day, 
                expenses: action.payload.expenses, 
                purchases: action.payload.purchases 
            };
        default:
            return state;
    }
}
