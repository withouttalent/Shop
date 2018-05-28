import {combineReducers} from 'redux'
import items from './items'
import navigation from './navigation'
import auth from './auth'
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    items,
    navigation,
    auth,
    root: routerReducer,
})

