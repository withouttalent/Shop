import React, {Component} from 'react'


export default class Message extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.AppActions.getUsers(token)
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

            </div>
            <div className="message-thread">

            </div>
        </div>
    }
}
