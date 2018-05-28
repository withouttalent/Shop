import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'


export default function configureStore() {
    const logger = createLogger();
    const store = createStore(rootReducer, {},applyMiddleware(thunk, logger, apiMiddleware));
    return store
}

