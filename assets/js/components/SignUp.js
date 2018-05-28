import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



export default class SignUp extends Component {
    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        return <div className="create-user">
            <form onSubmit={::this.handleSubmit}>
                <div><label>Username</label>
                <input ref={(input) => (this.username = input)} /></div>
                <div><label>E-mail</label>
                <input ref={(input) => (this.email = input)} /></div>
                <div><label>Password</label>
                <input ref={(input) => (this.pass = input)} /></div>
                <div><input type="submit" /></div>
            </form>

        </div>
    }
}