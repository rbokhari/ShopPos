import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.categories, action ) {
    switch( action.type ) {
        case types.LOAD_CATEGORY_SUCCESS:
            //return [ ...state, { categories: action.payload } ];
            return action.payload;
        case types.CREATE_CATEGORY_SUCCESS:
            console.error("category reducer", action.payload);
            return [
                ...state,
                Object.assign( {}, action.payload )
            ];
        case types.UPDATE_CATEGORY_SUCCESS:
            return [
                ...state.filter( category => category.id !== action.payload.id ),
                Object.assign( {}, action.category )
            ];
        case types.CREATE_CATEGORY:
            return [ ...state, Object.assign( {}, action.payload ) ];
        default:
            return state;
    }
}

