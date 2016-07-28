import { LOAD_BRANCH, CREATE_BRANCH, CHANGE_BRANCH } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case LOAD_BRANCH:
            const newdata = { ...state, isLoad: true };
            console.log("newdata", newdata);
            return newdata;
        case CREATE_BRANCH:
            return ;
        case CHANGE_BRANCH:
            return;
    }

    return state;
}