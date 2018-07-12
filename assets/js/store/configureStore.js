import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import websocket from './middlewares/websocket'
import { createSocketMiddleware } from "redux-websocket-middleware"
import { history } from '../index'
import { routerMiddleware } from 'react-router-redux';

export default function configureStore() {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        {},
        compose(applyMiddleware(
            routerMiddleware(history),
            thunk,
            logger,
            websocket))
    );
    return store
}

