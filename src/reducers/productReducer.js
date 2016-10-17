import * as types from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.products, action) {
    switch(action.type) {
        case types.LOAD_PRODUCT_SUCCESS:
            //return [...state, ...action.items];
            return action.payload;
        case types.CREATE_PRODUCT_SUCCESS:
            return [    
                ...state, 
                Object.assign({}, action.payload)
            ];

        case types.UPDATE_PRODUCT_SUCCESS:
            return [ 
                ...state.filter( product => product._id !== action.payload._id), 
                Object.assign({}, action.payload)
            ];

        default:
            return state;
    }

}