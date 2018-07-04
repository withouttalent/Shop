import * as types from '../../constans/Page'


let socket = null;

export default store => next => action => {
        const onOpen = () => {

        };
        const onClose = () => {

        };
        const onMessage = () => {

    };
        switch (action.type){
            case types.CONNECTION[0]:
                if (socket !== null) {
                    store.dispatch({type:types.CONNECTION[2]});
                    socket.close();
                }
                socket = new WebSocket("ws://127.0.0.1:8888");
                store.dispatch({type:types.CONNECTION[1]});
                socket.onopen = () => {
                    socket.send(JSON.stringify({id:action.payload, type:"SUBSCRIBE_THREAD"}))
                };
                socket.onmessage = (evt) => {
                    const msg = JSON.parse(evt.data);
                    store.dispatch({type:types.MESSAGE[0], payload:msg})
                };
                return next(action);
            case types.MESSAGE[1]:
                socket.send(action.payload);
                return next(action);
            default:
                return next(action)
        }

}
