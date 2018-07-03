import {
    ADD_TO_CART, CONNECTION,
    FILTER_CATEGORIES_ERROR,
    FILTER_CATEGORIES_REQUEST,
    FILTER_CATEGORIES_SUCCESS,
    GET_CART,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CHATS,
    GET_DETAIL_ARTICLE,
    GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_MESSAGES,
    GET_USERS,
    REMOVE_IN_CART
} from "../constans/Page";
import {apiAction, fetchApi} from "./actionCreators";
import axios from "axios";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'








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


export function getUsers(token) {
    return (dispatch) => {
        dispatch({type: GET_USERS[0]});
        axios.get('http://127.0.0.1:8000/api/v0/users/', {headers: {'Authorization': 'JWT ' + token}})
            .then(response => response.status === 200 ? response.data : undefined)
            .then(data => dispatch({type: GET_USERS[1], payload: data}))
            .catch(error => dispatch({type: GET_USERS[2]}))
    }

}

export function getChats(token) {
    return (dispatch) => {
        dispatch({type: GET_CHATS[0]});
        axios.get('http://127.0.0.1:8000/api/v0/threads/', {headers: {'Authorization': 'JWT ' + token}})
            .then(response => response.status === 200 ? response.data : undefined)
            .then(data => dispatch({type: GET_CHATS[1], payload: data}))
            .catch(error => dispatch({type: GET_CHATS[2]}))
    }

}


export function getMessages(token, id) {
    return (dispatch) => {
        dispatch({type: GET_MESSAGES[0], payload: id});
        axios.get('http://127.0.0.1:8000/api/v0/thread/' + id + '/', {headers: {'Authorization': 'JWT ' + token}})
            .then(response => response.status === 200 ? response.data : undefined)
            .then(data => dispatch({type: GET_MESSAGES[1], payload: data }))
            .catch(error => dispatch({type: GET_MESSAGES[2]}))
    }
}



export function openConnect() {
    return (dispatch) => {
        dispatch({type:CONNECTION[0]});
    }
}




// export function openConnect(thread, message, token) {
//     return (dispatch) => {
//         dispatch({type:CONNECTION[0]});
//         const socket = new WebSocket("ws://127.0.0.1:8888");
//         socket.onopen = function () {
//             socket.send(JSON.stringify({thread:thread, message:message, token:token}))
//         };
//         socket.onmessage = function (evt) {
//             return (dispatch) => {
//                 dispatch({type: "GET_DATA", payload:evt.data})
//             }
//         }
//     }
// }
//
