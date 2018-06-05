import React, {Component} from 'react'


export default class Cart extends Component {

    componentWillMount() {
        token = this.props.auth.token;
        console.log(token)
    }

    render() {
        const {profile} = this.props;
        return <div className="cart">
            <div className="user-content">
                Hi
            </div>
            <div className="cart-content">

            </div>
        </div>
    }
}