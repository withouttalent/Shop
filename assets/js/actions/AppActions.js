import {
    ADD_TO_CART,
    FILTER_CATEGORIES_ERROR,
    FILTER_CATEGORIES_REQUEST,
    FILTER_CATEGORIES_SUCCESS,
    GET_CART,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_DETAIL_ARTICLE,
    GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    REMOVE_IN_CART
} from "../constans/Page";
import {apiAction, fetchApi} from "./actionCreators";
import axios from "axios";


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


export function putArticleToCart(id, count, token) {
    return (dispatch) => {
        dispatch({type: ADD_TO_CART[0]});
        axios.post('http://127.0.0.1:8000/api/v0/user-cart/', {
            id: id,
            count: count,
        }, {headers: {'Authorization': 'JWT ' + token}})
            .then(response => response.status === 201 ? dispatch({type: ADD_TO_CART[1]}) : undefined)
            .catch(error => dispatch({type: ADD_TO_CART[2]}))
    }

}

export function deleteArticleInCart(id, token) {
    return (dispatch) => {
        dispatch({type: REMOVE_IN_CART[0]});
        axios.get('http://127.0.0.1:8000/api/v0/user-cart/remove/' + id + '/', {headers: {'Authorization': 'JWT ' + token}})
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({type: GET_CART[0]});
                    axios.get('http://127.0.0.1:8000/api/v0/user-cart/', {headers: {'Authorization': 'JWT ' + token}})
                        .then(response => response.status === 200 ? response.data : undefined)
                        .then(data => dispatch({type: GET_CART[1], payload: data}))
                        .catch(error => dispatch({type: GET_CART[2]}));
                    dispatch({type: REMOVE_IN_CART[1]});
                }
            })
            .catch(error => dispatch({type: REMOVE_IN_CART[2]}))
    }
}