import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = [], action ) {
    switch( action.type ) {
        case types.LOAD_CATEGORY_SUCCESS:
            //return { ...state, categories: action.payload};
            return action.categories;

        case types.CREATE_CATEGORY_SUCCESS:
            return [
                ...state,
                Object.assign( {}, action.category )
            ];

        case types.UPDATE_CATEGORY_SUCCESS:
            return [
                ...state.filter( category => category.id !== action.category.id ),
                Object.assign( {}, action.category )
            ];

        case types.CREATE_CATEGORY:
            return [ ...state, Object.assign( {}, action.category ) ];

        default:
            return state;
    }

}

