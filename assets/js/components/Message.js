import React, {Component} from 'react'
import {CONNECTION, GET_USERS, MESSAGE} from "../constans/Page";
import * as Scroll from 'react-scroll';
import ReactDOM from 'react-dom'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AppActions from "../actions/AppActions";
import * as ProfileActions from "../actions/ProfileActions";
import { Link } from 'react-router-dom'
import * as style from "../css/thread.css"

class Message extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const token = localStorage.getItem('token');
        this.props.AppActions.getUsers(token);
        this.props.AppActions.getChats(token);

    }

    componentDidMount() {

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
        let scroll = Scroll.animateScroll;
        return <div className="message-wrap">
            <div className="add-thread">
                {message.fetching ? undefined :
                    message.users.length === undefined ? undefined :
                        message.users.map((user, id) => <div key={id} className="user-wrap">
                            <div className="username-wrap">{user.username}</div>
                        </div>)
                }
            </div>
            <div className={style.wrap6}>
            <div className={style.exist_thread}>
                {message.dialog.length === undefined ? undefined :
                    message.dialog.map(thread =><Link to={"/user/message/" + thread.id} key={thread.id}>
                                <div key={thread.id} className={style.thread}>
                                    <div className={style.image_participants}><img className={style.image_inner} src={thread.participants[1].pic} alt=""/></div>
                                    <div className={style.participants}>{thread.participants[1].username}</div>
                                    <div className={style.last_message}>{thread.get_last_message}</div>
                                </div>
                            </Link>

                        )}
            </div>
                </div>
        </div>
    }
}


export function mapStateToProps(state) {
    return {
        profile: state.profile,
        auth: state.auth,
        message: state.message,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        ProfileActions: bindActionCreators(ProfileActions, dispatch),
        AppActions: bindActionCreators(AppActions, dispatch),
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)