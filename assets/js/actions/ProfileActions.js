import 'babel-polyfill'
import 'whatwg-fetch'
import axios from 'axios';
import {GET_CART} from "../constans/Page";


export function getCart(token) {
    return (dispatch) => {
        dispatch({type: GET_CART[0]});
        axios.get('http://127.0.0.1:8000/api/v0/user-cart/', {headers: {'Authorization': 'JWT ' + token}})
            .then(response => response.status === 200 ? response.data : undefined)
            .then(data => dispatch({type: GET_CART[1], payload: data}))
            .catch(error => dispatch({type: GET_CART[2]}))
    }
}