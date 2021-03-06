import {CONNECTION, FETCH_MESSAGE, GET_CHATS, GET_MESSAGES, GET_USERS, MESSAGE} from "../constans/Page";

const initialState = {
    fetching: false,
    connection: false,
    current_thread: undefined,
    error: undefined,
    users: [],
    dialog: [],
    messages: [],
    empty: undefined,
};


export default function message(state = initialState, action) {
    switch (action.type) {
        case GET_USERS[0]:
            return {...state, fetching: true};
        case GET_USERS[1]:
            return {...state, fetching: false, users: action.payload};
        case GET_USERS[2]:
            return {...state, fetching: false};
        case GET_CHATS[0]:
            return {...state, fetching: true};
        case GET_CHATS[1]:
            return {...state, fetching: false, dialog: action.payload};
        case GET_CHATS[2]:
            return {...state, fetching: false};
        case GET_MESSAGES[0]:
            return {...state, fetching: true, messages: [], current_thread:action.payload.id};
        case GET_MESSAGES[1]:
            return {...state, fetching: false, messages: action.payload};
        case GET_MESSAGES[2]:
            return {...state, fetching: false, messages: []};
        case CONNECTION[0]:
            return {...state, connection:true};
        case CONNECTION[1]:
            return { ...state};
        case MESSAGE[0]:
            return {...state, messages:[...state.messages, action.payload] };
        case MESSAGE[1]:
            return {...state, empty: action.payload };
        case FETCH_MESSAGE[0]:
            return {...state, fetch:true };
        case FETCH_MESSAGE[1]:
            return{...state, messages:[ ...action.payload.reverse(), ...state.messages], fetch:false };
        default:
            return state
    }

}