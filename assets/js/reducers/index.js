import {combineReducers} from 'redux'
import items from './items'
import navigation from './navigation'
import auth from './auth'


export default combineReducers({
    items,
    navigation,
    auth,
})

