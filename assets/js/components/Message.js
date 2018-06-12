import React, {Component} from 'react'


export default class Message extends Component {

    componentWillMount() {
        const token = localStorage.getItem('token');
        this.props.AppActions.getUsers(token);
        this.props.AppActions.getChats(token);
    }

    getCurrentChat(id, e) {
        const token = this.props.auth.token;
        this.props.AppActions.getMessages(token, id)
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
                    message.messages.map(message => <div key={message.id} className="message-dialog">
                        <div className="sender">{message.sender}</div>
                        <div className="message-text">{message.text}</div>
                    </div>)

                }
            </div>
        </div>
    }
}
