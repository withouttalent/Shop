import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/LoginActions';
import Login from '../components/Login';
import SignUp from '../components/SignUp'
import { withRouter } from 'react-router-dom'



class Authentication extends Component {
    render() {
        const { users } = this.props;
        const { login } = this.props.LoginActions;
        return <div className="content">
            <Login login={login} users={users} />
            {/*<SignUp login={login} users={users}/>*/}
        </div>
    }
}

export function mapStateToProps(state) {
    return {
        users: state.users,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        LoginActions: bindActionCreators(LoginActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication))