import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as ProfileActions from '../actions/ProfileActions';
import * as AppActions from '../actions/AppActions'
import Cart from '../components/Cart';
import {BrowserRouter as Router, BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import Message from '../components/Message'
import Profile from '../components/Profile'
import ThreadRoom from '../components/ThreadRoom'

import * as style from '../css/base.css'


class Authentication extends Component {
    render() {
        const {profile, auth, message} = this.props;
        const {getCart} = this.props.ProfileActions;
        return <div className={style.content}>
            <div className="wrap">
            <Profile profile={profile} auth={auth} getCart={getCart} AppActions={this.props.AppActions} />
            <Switch>
                <Route exact path="/user/message" component={Message} />
                <Route exact path="/user/cart"
                       render={() => <Cart profile={profile} auth={auth} AppActions={this.props.AppActions}
                                           getCart={getCart}/>}/>
                <Route exact path="/user/message/:id" render={() => <ThreadRoom auth={auth} dispatch={this.props.dispatch} message={message} match={this.props.match} AppActions={this.props.AppActions} />} />
            </Switch>
            </div>
            </div>


    }
}

export function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile,
        auth: state.auth,
        message: state.message,
        match: ownProps.location.pathname,
        routing: state.routing,
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