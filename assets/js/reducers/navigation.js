import {GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, SELECT_ITEM} from "../constans/Page";


const initialState = {
    fetching: false,
    categories: {},
};


export default function navigation(state=initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return {...state, fetching:true};
        case GET_CATEGORIES_SUCCESS:
            return {...state, fetching:false, categories:action.payload};
        case GET_CATEGORIES_ERROR:
            return {...state, fetching:false}
        case SELECT_ITEM:
            return {...state, filter_items: action.payload}
        default:
            return state;
    }
}