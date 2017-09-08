import {
    NOTIFICATION_ERROR_SHOW,
    NOTIFICATION_ERROR_HIDE
} from './types';

export function showNotification(message) {
    return function(dispatch) {
        dispatch({
            type: NOTIFICATION_ERROR_SHOW,
            payload: message
        });
    };
}

export function hideNotification() {
    return function(dispatch) {
        dispatch({
            type: NOTIFICATION_ERROR_HIDE
        });
    };
}
