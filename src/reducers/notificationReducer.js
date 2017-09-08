// import {
//     NOTIFICATION_ERROR_SHOW,
//     NOTIFICATION_ERROR_HIDE
// } from '../actions/types';
import * as types from '../actions/types';
import initialState from './initialState';

export default function (state = initialState.notification, action) {
    switch(action.type) {
        case types.NOTIFICATION_ERROR_SHOW:
            return { ...state, show: true, message: action.payload };
        case types.NOTIFICATION_ERROR_HIDE:
            return { ...state, show: false, message: '' };
        default:
            return state;
    }
}