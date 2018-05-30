import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from "./LoginActions";
import axios from 'axios';


export function fetchApi(reducer, url, token) {
    return (dispatch) => {
        dispatch({type:reducer[0]});
        axios.get('http://127.0.0.1:8000/api/v0/' + url, {headers: {'Authorization': 'JWT ' + token}})
            .then(data => data.data)
            .then(items => dispatch({type:reducer[1], payload:items}))
            .catch(error => dispatch({type: reducer[2]}))
    }
}