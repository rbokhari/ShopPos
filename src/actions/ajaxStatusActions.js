import * as types from './types';

export function beginAjaxCall() {
    return {
        type: types.BEGIN_AJAX_CALL 
    };
}