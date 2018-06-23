import * as types from '../../constans/Page'


export default store => next => action => {
        if (action.type === types.CONNECTION[0]) {
            const socket = new WebSocket("ws://127.0.0.1:8888");
            console.log("it's okay");
            socket.onopen = (evt) => {
                store.dispatch({type: types.CONNECTION[1], payload: evt})
            };
            socket.onmessage = (evt) => {
                store.dispatch({type: types.MESSAGE[0], payload: evt})
            };
            return next(action);
        } else if (action.type === types.MESSAGE[1]) {
            payload = action.payload;
            socket.send(JSON.stringify({thread:payload.thread, message:payload.message, token: payload.token }));
            return next(action);
        } else {
            return next(action);
        }


}