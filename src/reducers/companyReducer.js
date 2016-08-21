import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.company, action ) {
    switch( action.type ) {
        case types.LOAD_COMPANY:
            return action.payload;
        default:
            return state;
    }
}
