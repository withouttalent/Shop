import React, { Component } from "react"
import ReactDOM from 'react-dom'
import {CONNECTION, FETCH_MESSAGE, MESSAGE} from "../constans/Page";
import * as style from "../css/thread.css"
import { history } from '../index'


export default class ThreadRoom extends Component{


    componentWillMount() {
        const token = this.props.auth.token;
        const id = this.props.match[this.props.match.length - 1];
        this.props.dispatch({type:CONNECTION[0], payload:id});
        this.props.AppActions.getMessages(token, id);
    }

    scrollToBottom = () => {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(this.messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        if (this.historyChanged) {
            if (this.scrollAtBottom) {
                this.scrollToBottom();
            }
            // if (!this.scrollAtBottom) {
            //     console.log("это тоже было произошло")
            //     ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
            // }
        }
    }

    componentWillUpdate(nextProps) {
        this.historyChanged = nextProps.message.messages.length !== this.props.message.messages.length;
        if (this.historyChanged) {
            const scrollPos = this.messageList.scrollTop;
            const scrollBottom = (this.messageList.scrollHeight - this.messageList.clientHeight);
            this.posScroll = scrollBottom;
            this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
            if (!this.scrollAtBottom) {
                const numMessages = this.messageList.childNodes.length;
                this.topMessage = numMessages === 0 ? null : this.messageList.childNodes[0];
            }
        }
    }

    onScroll() {
        const scrollTop = this.messageList.scrollTop;
        if (scrollTop === 0) {
            const token = this.props.auth.token;
            const type = "FETCH_MESSAGE";
            const id = this.props.message.current_thread;
            this.props.dispatch({type:FETCH_MESSAGE[0], payload:JSON.stringify({ token, type, id })})
        }
    }

    clickToSendMessage(thread, e) {
        e.preventDefault();
        const thread_id = thread;
        const message = this.message.value;
        this.message.value = "";
        const token = this.props.auth.token;
        const type = "SEND_MESSAGE";
        this.props.dispatch({type:MESSAGE[1], payload:JSON.stringify({ thread, message, token, type }) })

    }


    render() {
        const {message} = this.props;
        return <div className="message-thread">

                    <div className="wrap1">
                            <div className="exist-message" onScroll={::this.onScroll} ref={(node) => {
                                this.messageList = node
                            }}>
                                {message.messages.length === 0 ?
                            <div className="message-dialog">

                            </div> :
                                message.messages.map(msg => <div key={msg.id} className="message-dialog">
                                    <div className={style.image_message}><img src={msg.pic} alt="" className={style.image_inner_message}/></div>
                                    <div className="sender">{msg.sender}</div>
                                    <div className="message-text">{msg.text}</div>
                                </div>)}
                            </div>
                        <div className={style.send_msg_form}>
                            <form className={style.send_form} onSubmit={this.clickToSendMessage.bind(this, message.current_thread)} >
                                <input className={style.message_input} ref={(node) => {this.message = node}} required="true" placeholder="Напишите ваше сообщение..." type="text"/>
                                <button className={style.send_msg} name="Отправить" >Отправить</button>
                            </form>
                        </div>

                    </div>

                </div>
    }
}
