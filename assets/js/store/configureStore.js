import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import websocket from './middlewares/websocket'


export default function configureStore() {
    const logger = createLogger();
    const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger, websocket));
    return store
}

