import * as types from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case types.LOAD_PRODUCT_SUCCESS:
            //return [...state, ...action.items];
            return action.products;
        case types.CREATE_PRODUCT_SUCCESS:
            return [    
                ...state, 
                Object.assign({}, action.product)
            ];

        case types.UPDATE_PRODUCT_SUCCESS:
            return [ 
                ...state.filter( product => product._id !== action.product._id), 
                Object.assign({}, action.product)
            ];


        default:
            return state;
    }

}

