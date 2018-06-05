import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as ProfileActions from '../actions/ProfileActions';


class Authentication extends Component {
    render() {
        const {profile, auth} = this.props;
        const {getCart} = this.props.ProfileActions;
        return <div className="content">
            {/*<Cart profile={profile} auth={auth} getCart={getCart} />*/}
            <div>hi</div>
        </div>
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
        ProfileActions: bindActionCreators(ProfileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)