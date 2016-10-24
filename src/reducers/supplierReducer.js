import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.suppliers, action ) {
    switch( action.type ) {
        case types.LOAD_SUPPLIER_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            return action.payload;
        case types.CREATE_SUPPLIER_SUCCESS:
            return [
                ...state,
                Object.assign( {}, action.payload )
            ];
        case types.UPDATE_CATEGORY_SUCCESS:
            return [
                ...state.filter( supplier => supplier.id !== action.payload.id ),
                Object.assign( {}, action.payload )
            ];
        case types.CREATE_SUPPLIER:
            return [ ...state, Object.assign( {}, action.payload ) ];
        default:
            return state;
    }
}

