import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.openDay, action ) {
    switch( action.type ) {
        case types.LOAD_DAY_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            console.info("coming here", action.payload);
            return action.payload;
        case types.CREATE_DAY_SUCCESS:
            return [
                ...state,
                Object.assign( {}, action.payload )
            ];
        case types.UPDATE_DAY_SUCCESS:
            return [
                ...state.filter( category => category.id !== action.payload.id ),
                Object.assign( {}, action.category )
            ];
        case types.CREATE_DAY:
            return [ ...state, Object.assign( {}, action.payload ) ];
        default:
            return state;
    }
}

