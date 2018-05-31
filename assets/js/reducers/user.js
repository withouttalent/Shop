import {GET_USER} from "../constans/Page";


const initialState = {
    fetching: false,
    inf: {
        is_active: false,
        email: undefined,
        user: undefined,
        first_name: undefined,
    }
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER[0]:
            return {...state, fetching: true};
        case GET_USER[1]:
            return {...state, fetching: false, inf: action.payload, is_active: true};
        case GET_USER[2]:
            return {...state, fetching: false};
        default:
            return state;
    }
}