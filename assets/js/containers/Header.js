import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as LoginActions from '../actions/LoginActions'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkClick: false,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh');
        this.props.LoginActions.checkToken(token, refresh);
        this.props.LoginActions.getUser(token);
    }

    onSubmit(e) {
        e.preventDefault();
        const username = this.username.value;
        const pass = this.pass.value;
        this.props.LoginActions.login(username, pass);

    }

    handleClick(e) {
        this.setState({
            checkClick: !this.state.checkClick,
        })
    }

    onClickLogOut(e) {
        this.props.LoginActions.logout();
    }

    render() {
        return <header>
            {this.props.auth.isValid === false && this.props.user.inf.is_active === true ?
                <div className="auth">
                    {console.log(this.props.user.inf.is_active)}
                    <div className="signup">Sign up</div>
                    <div onClick={::this.handleClick} className="login">log in</div>
                    {this.state.checkClick === true ?
                        <div className="form-login">
                            <form onSubmit={::this.onSubmit}>
                                <div className="form-group-login">
                                    <input required="True" ref={(input) => {
                                        this.username = input
                                    }} type="name" placeholder="Username"/>
                                </div>
                                <div className="form-group-login">
                                    <input required="True" type="Password" ref={(input) => {
                                        this.pass = input
                                    }} placeholder="Password"/>
                                </div>
                                <div className="form-group-login">
                                    <button>Sumbit</button>
                                </div>

                            </form>
                        </div> : null}
                </div>
                :
                <div className="auth-true">
                    {this.props.user.inf.is_active === true ?
                        <div className="username">{this.props.user.inf.email}</div>
                        :
                        <div>Hi</div>
                    }
                    <div onClick={::this.onClickLogOut} className="logout">Log Out</div>
                </div>


            }
        </header>
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        LoginActions: bindActionCreators(LoginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)