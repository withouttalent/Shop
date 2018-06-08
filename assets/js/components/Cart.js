import React, {Component} from 'react'

export default class Cart extends Component {


    onDeleteItem(id, e) {
        const token = this.props.auth.token;
        this.props.AppActions.deleteArticleInCart(id, token)
    }


    componentDidUpdate(prevProps) {
        if (this.props.profile.fetching !== prevProps.profile.fetching) {
            console.log('Hi')
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== undefined) {
            this.props.getCart(token)
        }
    }

    render() {
        const {profile} = this.props;
        const url = "http://127.0.0.1:8000";
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
                {profile.fetching === true ? undefined :
                    (profile.cart.length === 0) || (profile.cart.length === undefined) ?
                    undefined
                    :
                    profile.cart.map((item) => <div key={item.id} className="item-cart">
                        <div className="img-item-cart"><img src={url + item.article.pics} alt=""/></div>
                        <div className="center-cart">
                            <div className="title-item-cart">{item.article.title}</div>
                            <div className="price-item-cart">{item.article.price} руб.</div>
                            <div className="count-item-cart">{item.count}</div>
                        </div>
                        <div className="right-cart">
                            <span onClick={this.onDeleteItem.bind(this, item.id)} className="close"></span>
                            <button className="button-buy">Купить</button>
                        </div>
                        </div>
                    )
                }
            </div>
        </div>
    }
}