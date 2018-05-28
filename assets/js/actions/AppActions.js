import {
    FILTER_CATEGORIES_ERROR,
    FILTER_CATEGORIES_REQUEST,
    FILTER_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS
} from "../constans/Page";
import { apiAction, fetchApi } from "./actionCreators";


export const GET_ARTICLES = [GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR];
export const GET_CATEGORIES = ['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_ERROR'];
export const FILTER_ITEM = [FILTER_CATEGORIES_REQUEST, FILTER_CATEGORIES_SUCCESS, FILTER_CATEGORIES_ERROR];



// export function getItems(url) {
//     return fetchApi(apiAction, GET_ARTICLES, url)
// }

export function getItems(url, token) {
    return fetchApi(GET_ARTICLES, url, token)
}


export function getCategories(url, token) {
    return fetchApi(GET_CATEGORIES, url, token)
}

export function selectFilter(url, token) {
    return fetchApi(FILTER_ITEM, url, token)
}
