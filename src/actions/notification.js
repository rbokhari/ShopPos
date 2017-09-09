import {
    NOTIFICATION_ERROR_SHOW,
    NOTIFICATION_SUCCESS_SHOW,
    NOTIFICATION_HIDE
} from './types';

// export function showNotification(message) {
//     return function(dispatch) {
//         dispatch({
//             type: NOTIFICATION_SHOW,
//             payload: message
//         });
//     };
// }

export function successNotification(message) {
    return function(dispatch) {
        dispatch({
            type: NOTIFICATION_SUCCESS_SHOW,
            payload: 'SUCCESS : ' + message
        });
    };
}

export function errorNotification(message) {
    return function(dispatch) {
        dispatch({
            type: NOTIFICATION_ERROR_SHOW,
            payload: 'ERROR : ' + message
        });
    };
}


export function hideNotification() {
    return function(dispatch) {
        dispatch({
            type: NOTIFICATION_HIDE
        });
    };
}
