import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_INFO } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER: 
            return { ...state, error: '', authenticated: true };
        case AUTH_USER_INFO:
             return { ...state, user: action.payload, authenticated: true };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false, user: undefined, branch: undefined, company: undefined };
        case AUTH_ERROR:
            return { ...state, error: action.payload, authenticated: false, user: undefined, branch: undefined, company: undefined };
    }
    return state;
}