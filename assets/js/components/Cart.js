import React, {Component} from 'react'


export default class Cart extends Component {

    componentDidMount() {
        const token = this.props.auth.token;
        console.log(token);
        if (token !== undefined) {
            this.props.getCart(token)
        }
    }

    render() {
        const {profile, auth} = this.props;
        return <div className="cart">
            <div className="user-content">
                <div className="wrap-user">
                    <div className="img-profile">
                        <img src={profile.user.pic} alt="/"/>
                    </div>
                    <div className="username-cart">{profile.user.username}</div>
                </div>
            </div>
            <div className="cart-content">

                {this.props.auth.fetching === true ?
                    <div className="spin">spin...</div> :
                    <div>Hi...</div>
                    // profile.cart.map((item) => <div key={item.id} className="container-item">
                    //
                    // </div>)

                }
            </div>
        </div>
    }
}