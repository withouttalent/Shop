import {LOGIN_USER, LOGOUT, REFRESH_TOKEN, VERIFY_TOKEN} from "../constans/Page";

const initialState = {
    fetching: false,
    isValid: false,
    token: undefined,
    refresh: undefined,
}


export default function auth(state=initialState, action) {
    switch (action.type) {
        case LOGIN_USER[0]:
            return {...state, fetching:true};
        case LOGIN_USER[1]:
            return {
                ...state,
                fetching: false,
                isValid: true,
                token: action.payload.token_jwt,
                refresh: action.payload.refresh_jwt
            };
        case LOGIN_USER[2]:
            return {...state, fetching:false};
        case VERIFY_TOKEN[0]:
            return {...state, fetching: true};
        case VERIFY_TOKEN[1]:
            return {
                ...state,
                fetching: false,
                isValid: true,
                token: action.payload.token,
                refresh: action.payload.refresh
            };
        case VERIFY_TOKEN[2]:
            return {...state, fetching: false, isValid: false};
        case REFRESH_TOKEN[0]:
            return {...state, fetching: true};
        case REFRESH_TOKEN[1]:
            return {...state, fetching: false, isValid: true, token: action.payload};
        case REFRESH_TOKEN[2]:
            return {...state, fetching: false, isValid: false};
        case LOGOUT:
            return {...state, isValid: false, token: undefined, refresh: undefined, fetching: undefined};
        default:
            return state;
    }
}