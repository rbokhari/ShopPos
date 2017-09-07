import { AUTH_LOADING_START, AUTH_LOADING_END, AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_INFO } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_LOADING_START:
            let newState = { ...state, error: '', authLoading: true };
            return newState
        case AUTH_LOADING_END:
            let newState1 = { ...state, error: '', authLoading: false };
            return newState1;
        case AUTH_USER: 
            return { ...state, error: '', authenticated: true, authLoading: false };
        case AUTH_USER_INFO:
             return { ...state, user: action.payload, authenticated: true, authLoading: false };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false, user: undefined, branch: undefined, company: undefined };
        case AUTH_ERROR:
            return { ...state, error: action.payload, authenticated: false, user: undefined, branch: undefined, company: undefined };
    }
    return state;
}