import React, {Component} from 'react'

export default class Cart extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== undefined) {
            this.props.getCart(token)
        }
    }

    render() {
        const {profile} = this.props;
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
                {(profile.cart.length === 0) || (profile.cart.length === undefined) ?
                    undefined
                    :
                    profile.cart.map((item) => <div key={item.id} className="item-cart">
                            <div className="title-item">{item.article.title}</div>
                        </div>
                    )
                }
            </div>
        </div>
    }
}