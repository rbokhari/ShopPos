import initialState from './initialState';
import { LOAD_BRANCH, 
    LOAD_BRANCH_SUCCESS, 
    CREATE_BRANCH, 
    CREATE_BRANCH_SUCCESS, 
    SWITCH_BRANCH, 
    SHOW_CREATE_BRANCH, 
    CLOSE_BRANCH_DIALOG } from '../actions/types';

export default function(state = initialState.branch, action) {
    switch(action.type) {
        case LOAD_BRANCH:
            return { ...state, isLoad: true };
        case LOAD_BRANCH_SUCCESS:
            return { ...state, all: action.payload };
        case SHOW_CREATE_BRANCH:
            return { ...state, isCreateLoad: true };
        case CLOSE_BRANCH_DIALOG:
            return { ...state, isCreateLoad: false };
        case CREATE_BRANCH_SUCCESS:
            return { ...state, isCreateLoad: false, current: action.payload };
        case SWITCH_BRANCH:
            //return {...state, isLoad: false, current: all.filter(branch=> { return { branch._id === action.payload}} ) };
            //const branch = state.all.filter(branch => branch.branchId == action.payload )[0];
            return { ...state, isLoad: false, current: action.payload };
    }
    return state;
}