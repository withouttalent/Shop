import {combineReducers} from 'redux'
import items from './items'
import navigation from './navigation'
import auth from './auth'
import profile from './profile'
import detail from './detail'
import message from './message'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    items,
    navigation,
    auth,
    profile,
    detail,
    message,
    routing: routerReducer,
})

