import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.users, action ) {
    switch( action.type ) {
        case types.LOAD_USERS_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            return action.payload;
        case types.CREATE_USERS_SUCCESS:
            return [
                ...state,
                Object.assign( {}, action.payload )
            ];
        case types.UPDATE_USERS_SUCCESS:
            return [
                ...state.filter( category => category.id !== action.payload.id ),
                Object.assign( {}, action.payload )
            ];
        case types.CREATE_USERS:
            return [ ...state, Object.assign( {}, action.payload ) ];
        default:
            return state;
    }
}

