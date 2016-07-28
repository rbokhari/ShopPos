import * as types from '../actions/types';

export default function( state = [], action ) {
    switch( action.type ) {
        case types.LOAD_CATEGORY_SUCCESS:
            //return [...state, ...action.items];
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

