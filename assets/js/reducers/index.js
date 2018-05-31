import {combineReducers} from 'redux'
import items from './items'
import navigation from './navigation'
import auth from './auth'
import user from './user'

export default combineReducers({
    items,
    navigation,
    user,
    auth,
})

