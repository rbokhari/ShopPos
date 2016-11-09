import * as types from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.reportPurchaseData, action) {
    switch(action.type) {
        case types.LOAD_REPORT_PURCHASE_DATE_DATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }

}

