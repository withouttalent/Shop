import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as LoginActions from '../actions/LoginActions'


class Header extends Component {

    componentDidMount() {
        const token = this.props.auth.token;
        const refresh = this.props.auth.refresh;
        this.props.LoginActions.checkToken(token, refresh);
    }

    render() {
        const {auth} = this.props;
        return <header>
            <div className="signup">Sign up</div>
            <Link to="/signup">
                <div className="login">log in</div>
            </Link>
        </header>
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        LoginActions: bindActionCreators(LoginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)