import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as ProfileActions from '../actions/ProfileActions';
import * as AppActions from '../actions/AppActions'
import Cart from '../components/Cart';
import Spinner from '../components/Spinner'

class Authentication extends Component {
    render() {
        const {profile, auth} = this.props;
        const {getCart} = this.props.ProfileActions;
        return (profile.fetching === false) || (auth.fetching === false) ?
            <div className="content">
                <Cart profile={profile} auth={auth} AppActions={this.props.AppActions} getCart={getCart}/>
            </div>
            :
            <Spinner/>


    }
}

export function mapStateToProps(state) {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        ProfileActions: bindActionCreators(ProfileActions, dispatch),
        AppActions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)