import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


export default class Login extends Component{

    handleSubmit(e) {
        e.preventDefault();
        const username = this.username.value;
        const pass = this.pass.value;
        console.log(username);
        console.log(pass);
        this.props.login(username, pass);
    }
    render() {
        return <div className="content">
            <form onSubmit={::this.handleSubmit}>
                <input ref={(node) => {
                    this.username = node;
                }} type='text'/>
                <input ref={(input) => {
                    this.pass = input
                }} type='password'/>
                <input type='submit'/>
            </form>
            <Link to="/">Return</Link>
        </div>
    }

}

Login.PropTypes = {
    login: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}
