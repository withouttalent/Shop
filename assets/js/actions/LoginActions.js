import {RSAA} from "redux-api-middleware";
import {LOGIN_USER} from "../constans/Page";
import axios from 'axios';


// export const login = (username, password) => ({
//   [RSAA]: {
//     endpoint: 'http://127.0.0.1:8000/api/v0/api-token-auth/',
//     method: 'POST',
//     body: JSON.stringify({username, password}),
//     headers: { 'Content-Type': 'application/json' },
//     types: LOGIN_USER
//   }
// })


export function login(username, password) {
    return (dispatch) => {
       axios.post('http://127.0.0.1:8000/api/v0/api-token-auth/', {username:username, password:password})
           .then(response => response.data)
           .then(function(token) {
               localStorage.setItem('token', token['token']);
               return dispatch({type: LOGIN_USER[1], payload: token['token']});
           })
           // .catch(error => dispatch({type: LOGIN_USER[2]}))
    }
}

