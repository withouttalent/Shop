import {GET_USERS} from "../constans/Page";


const initialState = {
    fetching: false,
    users: {},
};


export default function message(state = initialState, action) {
    switch (action.type) {
        case GET_USERS[0]:
            return {...state, fetching: true};
        case GET_USERS[1]:
            return {...state, fetching: false, users: action.payload};
        case GET_USERS[2]:
            return {...state, fetching: false};
        default:
            return state
    }

}