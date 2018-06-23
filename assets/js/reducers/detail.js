import {GET_DETAIL_ARTICLE} from "../constans/Page";

const initialState = {
    fetching: false,
    hi: true,
    item: {
        // 0: {
        //     id: 0,
        //     title: 'unknown text',
        //     pics: [],
        //     price: 0
        // }
    },
};


export default function detail(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_ARTICLE[0]:
            return {...state, fetching: true, item: undefined};
        case GET_DETAIL_ARTICLE[1]:
            return {...state, fetching: false, item: action.payload};
        case GET_DETAIL_ARTICLE[2]:
            return {...state, fetching: false, item: undefined};
        default:
            return state;
    }
}
