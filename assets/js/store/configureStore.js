import {applyMiddleware, createStore} from 'redux'
import {apiMiddleware} from 'redux-api-middleware'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import ReduxWebSocketBridge from 'redux-websocket-bridge'
import {createLogger} from 'redux-logger'


export default function configureStore() {
    const logger = createLogger();
    const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger, apiMiddleware, ReduxWebSocketBridge("ws://127.0.0.1:8888")));
    return store
}

