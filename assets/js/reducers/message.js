import {GET_CHATS, GET_MESSAGES, GET_USERS} from "../constans/Page";


const initialState = {
    fetching: false,
    users: {},
    dialog: {},
    messages: {},
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
            return {...state, fetching: true, messages: undefined};
        case GET_MESSAGES[1]:
            return {...state, fetching: false, messages: action.payload};
        case GET_MESSAGES[2]:
            return {...state, fetching: false, messages: undefined};
        default:
            return state
    }

}