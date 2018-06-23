import React, {Component} from 'react'
import {Link, Route, Switch} from 'react-router-dom'





export default class Profile extends Component {



    render() {
        const {profile} = this.props;
        return <div className="user-content">
                        <div className="inline">
                            <Link to="/user/message">
                                <div className="inline-actions">Сообщения</div>
                            </Link>
                            <div className="inline-actions">Покупки</div>
                            <div className="inline-actions">Магазины</div>
                            <Link to="/user/cart">
                                <div className="inline-actions">Корзина</div>
                            </Link>
                            <div className="inline-actions">Выплата средств</div>
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