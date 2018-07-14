import React, {Component} from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import Cart from '../components/Cart';
import * as style from "../css/profile.css"



export default class Profile extends Component {



    render() {
        const {profile} = this.props;
        return <div className="user-content">
                <div className="inline">
                    <Link className={style.inline_link} to="/user/message">
                        <div className={style.inline_actions}>Сообщения</div>
                    </Link>
                    <div className={style.inline_actions}>Покупки</div>
                    <div className={style.inline_actions}>Магазины</div>
                    <Link className={style.inline_link} to="/user/cart">
                        <div className={style.inline_actions}>Корзина</div>
                    </Link>
                    <div className={style.inline_actions}>Выплата средств</div>
                </div>
                <div className="wrap-user">
                    <div className="img-profile">
                        <img src={profile.user.pic} alt="/"/>
                    </div>
                    <div className="username-cart">{profile.user.username}</div>
                </div>
            </div>



    }
}