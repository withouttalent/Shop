import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as ProfileActions from '../actions/ProfileActions';
import * as AppActions from '../actions/AppActions'
import Cart from '../components/Cart';
import Spinner from '../components/Spinner'
import {Link, Route, Switch} from 'react-router-dom'
import Message from '../components/Message'
import {GET_USERS} from "../constans/Page";


class Authentication extends Component {
    render() {
        const {profile, auth, message} = this.props;
        const {getCart} = this.props.ProfileActions;
        return (profile.fetching === false) || (auth.fetching === false) ?
            <div className="content">
                <div className="wrap">
                    <div className="user-content">
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
                    <Switch>
                        <Route path="/user/cart"
                               render={() => <Cart profile={profile} auth={auth} AppActions={this.props.AppActions}
                                                   getCart={getCart}/>}/>
                        <Route path="/user/message"
                               render={() => <Message message={message} auth={auth}
                                                      AppActions={this.props.AppActions} dispatch={this.props.dispatch} />}/>
                    </Switch>
                </div>
            </div>
            :
            <Spinner/>


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

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)