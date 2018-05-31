import {GET_USER, LOGIN_USER, LOGOUT, REFRESH_TOKEN, VERIFY_TOKEN} from "../constans/Page";
import 'babel-polyfill'
import 'whatwg-fetch'
import axios from 'axios';


export function login(username, password) {
    return (dispatch) => {
       axios.post('http://127.0.0.1:8000/api/v0/api-token-auth/', {username:username, password:password})
           .then(response => response.data)
           .then(function(token) {
               localStorage.setItem('token', token['access']);
               localStorage.setItem('refresh', token['refresh']);
               const token_jwt = token['access'];
               const refresh_jwt = token['refresh'];
               return dispatch({type: LOGIN_USER[1], payload: {token_jwt, refresh_jwt}});
           })
           .catch(error => dispatch({type: LOGIN_USER[2]}))
    }
}


export function logout() {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        return dispatch({type: LOGOUT});
    }

}

export const refreshToken = (dispatch, refresh) => {
    dispatch({type: REFRESH_TOKEN[0]});
    axios.post('http://127.0.0.1:8000/api/v0/api-token-refresh/', {refresh: refresh})
        .then(function (response) {
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data['access']);
                return dispatch({type: REFRESH_TOKEN[1], payload: data['access']})
            }
        })
        .catch(error => dispatch({type: REFRESH_TOKEN[2]}))
};

export function checkToken(token, refresh) {
    return (dispatch) => {
        dispatch({type: VERIFY_TOKEN[0]});
        axios.post('http://127.0.0.1:8000/api/v0/api-token-verify/', {token: token})
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({type: VERIFY_TOKEN[1], payload: {token, refresh}});
                    getUser(dispatch, token);
                } else if (response.status === 401) {
                    const data = response.data;
                    console.log(data['detail']);
                    if (data["detail"] === "Token is invalid or expired") {
                        refreshToken(refresh)
                    }
                }
            })
            .catch(error => {
                refreshToken(dispatch, refresh);
                dispatch({type: VERIFY_TOKEN[2]})

            })
    }
}

export function getUser(token) {
    return (dispatch) => {
        dispatch({type: GET_USER[0]});
        axios.get('http://127.0.0.1:8000/api/v0/user-detail/', {headers: {'Authorization': 'JWT ' + token}})
            .then(response => response.data)
            .then(data => {
                dispatch({type: GET_USER[1], payload: data})

            })
    }
};
