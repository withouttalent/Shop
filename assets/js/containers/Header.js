import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as LoginActions from '../actions/LoginActions'
import {Link} from 'react-router-dom'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkClick: false,
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh');
        this.props.LoginActions.checkToken(token, refresh);
    }

    // componentDidMount() {
    //     const token = localStorage.getItem('token');
    //     const refresh = localStorage.getItem('refresh');
    //     this.props.LoginActions.checkToken(token, refresh);
    // }

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
            <div className="logo">
                Магазин
            </div>
            {(this.props.auth.isValid === false) ?
                <div className="auth">
                    <Link to="/user/signup">
                        <div className="signup">Sign up</div>
                    </Link>
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
                    <div onClick={::this.onClickLogOut} className="logout">Log Out</div>
                    {this.props.profile.fetching === false ?
                        this.props.profile.user.username !== undefined ?
                            <Link to="/user">
                                <div className="username">{this.props.profile.user.username}</div>
                            </Link>
                            :
                            undefined
                        :
                        undefined}
                </div>


            }
        </header>
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        profile: state.profile,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        LoginActions: bindActionCreators(LoginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)