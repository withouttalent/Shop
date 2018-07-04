import React, {Component} from 'react'
import {CONNECTION, GET_USERS, MESSAGE} from "../constans/Page";


export default class Message extends Component {

    componentWillMount() {
        const token = localStorage.getItem('token');
        this.props.AppActions.getUsers(token);
        this.props.AppActions.getChats(token);

    }

    getCurrentChat(id, e) {
        const token = this.props.auth.token;
        this.props.dispatch({type:CONNECTION[0], payload:id});
        this.props.AppActions.getMessages(token, id)
    }


    clickToSendMessage(thread, e) {
        e.preventDefault();
        const thread_id = thread;
        const message = this.message.value;
        const token = this.props.auth.token;
        const type = "SEND_MESSAGE";
        this.props.dispatch({type:MESSAGE[1], payload:JSON.stringify({ thread, message, token, type }) })

    }

    render() {
        const {message} = this.props;
        return <div className="message-wrap">
            <div className="add-thread">
                {message.fetching ? undefined :
                    message.users.length === undefined ? undefined :
                        message.users.map((user, id) => <div key={id} className="user-wrap">
                            <div className="username-wrap">{user.username}</div>
                        </div>)
                }
            </div>
            <div className="exist-thread">
                {message.dialog.length === undefined ? undefined :
                    message.dialog.map(thread => <div onClick={this.getCurrentChat.bind(this, thread.id)}
                                                      key={thread.id} className="thread">
                        <div className="participant">{thread.participants[1].username}</div>
                    </div>)}
            </div>
            <div className="message-thread">
                {message.fetching ? undefined : message.messages.length === undefined ? undefined :
                    <div className="wrap1">
                        <div className="exist-message">
                        {message.messages.map(msg => <div key={msg.id} className="message-dialog">
                        <div className="sender">{msg.sender}</div>
                        <div className="message-text">{msg.text}</div>
                    </div>)}
                        </div>
                        <div className="send-msg-form">
                            <form onSubmit={this.clickToSendMessage.bind(this, message.current_thread)} >
                                <input ref={(node) => {this.message = node}} required="true" placeholder="Напишите ваше сообщение..." type="text" className="message-input"/>
                                <button className="send-msg" name="Отправить" >Отправить</button>
                            </form>
                        </div>

                    </div>
                }
            </div>
        </div>
    }
}
