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
import Profile from '../components/Profile'
import { withRouter } from 'react-router'




class Authentication extends Component {
    render() {
        const {profile, auth, message} = this.props;
        const {getCart} = this.props.ProfileActions;
        return <div className="content">
                <div className="wrap">
                        <Profile profile={profile} auth={auth}/>
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