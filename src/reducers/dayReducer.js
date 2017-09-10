import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.day, action ) {
    switch( action.type ) {
        case types.LOAD_OPEN_DAY_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            return action.payload;
        case types.CREATE_DAY_SUCCESS:
            return action.payload;
        case types.UPDATE_CLOSE_DAY_SUCCESS:
            return action.payload;
        case types.CREATE_DAY:
            return [ ...state, Object.assign( {}, action.payload ) ];
        case types.LOAD_DAY_SUCCESS:
            return { ...state, all: action.payload, customers: [] };
        case types.LOAD_DAY_CUSTOMER_SUCCESS:
            return { ...state, customers: action.payload };
        default:
            return state;
    }
}

