import {
    FILTER_CATEGORIES_ERROR,
    FILTER_CATEGORIES_REQUEST, FILTER_CATEGORIES_SUCCESS,
    GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    SELECT_ITEM
} from "../constans/Page";


const initialState = {
    fetching: true,
    items: {
        // 0: {
        //     id: 0,
        //     title: 'unknown text',
        //     pics: [],
        //     price: 0
        // }
    },
};

export default function items(state=initialState, action) {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {...state, fetching: true};
        case GET_ITEMS_SUCCESS:
            return {...state, items: action.payload, fetching: false};
        case GET_ITEMS_ERROR:
            return {...state, fetching: false};
        case SELECT_ITEM:
            return {...state, items: action.payload};
        case FILTER_CATEGORIES_REQUEST:
            return {...state, fetching: true};
        case FILTER_CATEGORIES_SUCCESS:
            return {...state, items: action.payload, fetching:false};
        case FILTER_CATEGORIES_ERROR:
            return {...state, fetching: false};

        default:
            return state;
    }
}
