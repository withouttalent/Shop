import {GET_CART, GET_USER} from "../constans/Page";


const initialState = {
    fetching: false,
    user: {
        0: {
            username: undefined,
            email: undefined,
            first_name: undefined,
            is_active: false,
        }
    },
    cart: {
        // 0 : {
        //     // id: undefined,
        //     // article: {},
        // }
    }
}


export default function profile(state = initialState, action) {
    switch (action.type) {
        case GET_USER[0]:
            return {...state, fetching: true};
        case GET_USER[1]:
            return {...state, fetching: false, user: action.payload};
        case GET_USER[2]:
            return {...state, fetching: false};
        case GET_CART[0]:
            return {...state, fetching: true};
        case GET_CART[1]:
            return {...state, fetching: false, cart: action.payload};
        case GET_CART[2]:
            return {...state, fetching: false};
        default:
            return state;
    }
}