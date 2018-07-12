import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



export default class SignUp extends Component {
    handleSubmit(e) {
        e.preventDefault();
        console.log('24')
        if (this.password === this.repassword) {

        } else {

        }
    }

    render() {

        return <div id="login-box">
            <div className="left">
                <h1>Sign up</h1>
                <form onSubmit={::this.handleSubmit}>
                    <input ref={(node) => this.username = node} type="text" name="username" placeholder="Username"/>
                    <input type="text" ref={(node) => this.email = node} name="email" placeholder="E-mail"/>
                    <input type="password" ref={(node) => this.password = node} name="password" placeholder="Password"/>
                    <input type="password" ref={(node) => this.repassword = node} name="password2" placeholder="Retype password"/>
                    <input type="submit" name="signup_submit" value="Sign me up"/>
                </form>
            </div>

            <div className="right">
                <span className="loginwith">Sign in with<br/>social network</span>

                <button className="social-signin facebook">Log in with facebook</button>
                <button className="social-signin twitter">Log in with Twitter</button>
                <button className="social-signin google">Log in with Google+</button>
            </div>
            <div className="or">OR</div>
        </div>
    }
}
