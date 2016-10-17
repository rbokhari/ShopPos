import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.expenses, action ) {
    switch( action.type ) {
        case types.LOAD_EXPENSE_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            return action.payload;
        case types.CREATE_EXPENSE_SUCCESS:
            return [
                ...state,
                Object.assign( {}, action.payload )
            ];
        case types.UPDATE_EXPENSE_SUCCESS:
            return [
                ...state.filter( expense => expense.id !== action.payload.id ),
                Object.assign( {}, action.expense )
            ];
        case types.CREATE_CATEGORY:
            return [ ...state, Object.assign( {}, action.payload ) ];
        default:
            return state;
    }
}

