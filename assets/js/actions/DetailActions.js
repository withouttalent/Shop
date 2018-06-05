import axios from "axios/index";


export function putArticleToCart(id, count) {
    return axios.post('http://127.0.0.1:8000/api/v0/user-cart/', {id: id, count: count})
}