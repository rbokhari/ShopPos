import * as types from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.items, action) {
    switch(action.type) {
        case types.LOAD_ITEMS_SUCCESS:
            //return [...state, { items: action.payload }];
            return action.payload;

        case types.CREATE_ITEM_SUCCESS:
            return [    
                ...state, 
                Object.assign({}, action.payload)
            ];

        case types.UPDATE_ITEM_SUCCESS:
            return [ 
                ...state.filter(item=> item._id !== action.payload._id), 
                Object.assign({}, action.payload)
            ];

        default:
            return state;
    }

}

