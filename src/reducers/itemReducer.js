import * as types from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.items, action) {
    switch(action.type) {
        case types.LOAD_ITEMS_SUCCESS:
            return [...state, { items: action.payload }];
            //return action.items;

        case types.CREATE_ITEM_SUCCESS:
            return [    
                ...state, 
                Object.assign({}, action.item)
            ];

        case types.UPDATE_ITEM_SUCCESS:
            return [ 
                ...state.filter(item=> item._id !== action.item._id), 
                Object.assign({}, action.item)
            ];

        default:
            return state;
    }

}

