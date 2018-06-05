import {
    FILTER_CATEGORIES_ERROR,
    FILTER_CATEGORIES_REQUEST,
    FILTER_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_DETAIL_ARTICLE,
    GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS
} from "../constans/Page";
import {apiAction, fetchApi} from "./actionCreators";


export const GET_ARTICLES = [GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR];
export const GET_CATEGORIES = ['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_ERROR'];
export const FILTER_ITEM = [FILTER_CATEGORIES_REQUEST, FILTER_CATEGORIES_SUCCESS, FILTER_CATEGORIES_ERROR];



// export function getItems(url) {
//     return fetchApi(apiAction, GET_ARTICLES, url)
// }

export function getItems(url) {
    return fetchApi(GET_ARTICLES, url)
}


export function getCategories(url) {
    return fetchApi(GET_CATEGORIES, url)
}

export function selectFilter(url) {
    return fetchApi(FILTER_ITEM, url)
}

export function getDetailArticle(url) {
    return fetchApi(GET_DETAIL_ARTICLE, url)
}
