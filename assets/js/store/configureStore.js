import {applyMiddleware, createStore} from 'redux'
import {apiMiddleware} from 'redux-api-middleware'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import ReduxWebSocketBridge from 'redux-websocket-bridge'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { mySaga } from './sagas/index'


export default function configureStore() {
    const logger = createLogger();
    // const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger, apiMiddleware));
    return store
}

