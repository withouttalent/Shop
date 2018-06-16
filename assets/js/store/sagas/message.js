



// export function* websocketConnection(action) {
//     const socket = new WebSocket("ws://127.0.0.1:8888");
//     socket.onopen = function () {
//         socket.send("Hello World")
//     };
//     socket.onmessage = function (evt) {
//         return (dispatch) => {
//             dispatch({type:"GET_DATA"})
//         }
//     }
// }