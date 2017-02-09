import * as types from '../actions/types';
import initialState from './initialState';

export default function( state = initialState.isLoadPasswordDialog, action ) {
    switch( action.type ) {
        case types.LOAD_PASSWORD_CHANGE_DIALOG:
            return true;
        case types.CLOSE_PASSWORD_CHANGE_DIALOG:
            return false;
        default:
            return state;
    }
}

