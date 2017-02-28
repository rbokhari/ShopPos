import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.expenseMasters, action ) {
    switch( action.type ) {
        case types.LOAD_EXPENSE_MASTER_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            return action.payload;
        case types.CREATE_EXPENSE_MASTER_SUCCESS:
            return [
                ...state,
                Object.assign( {}, action.payload )
            ];
        case types.UPDATE_EXPENSE_MASTER_SUCCESS:
            return [
                ...state.filter( master => master._id !== action.payload._id ),
                Object.assign( {}, action.master )
            ];
        default:
            return state;
    }
}

