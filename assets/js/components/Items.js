import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import sessionStorage from 'redux-persist/lib/storage/session'
export default class Items extends Component {


    componentDidMount() {
        console.log(this.props.token);
        this.props.getItems('articles/', this.props.token);
    }
    render() {
        const {fetching, items} = this.props;
        return <div className="row">
        <div className="content">
            {fetching ?
            <div>Loading...</div>
            :
            items.length === undefined || 0 || null ?
            <div>Nothing items...</div>
            :
                            items.map(item => (
                    <div key={item.id} className="item">
                        <Link to='/:item.id'>
                            <div className="head-item">
                                <div className="img">
                                    <img src={item.pics} alt=""/>
                                </div>
                            </div>
                            <div className="bottom-item">
                                <div className="title-item">
                                    <div className="title">
                                        {item.title}
                                    </div>
                                </div>
                                <div className="price-item">
                                    <div className="nosale">
                                        <h2>{item.price} Руб</h2>
                                    </div>
                                </div>
                                <div className="buy">
                                    Купить
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

        </div>
        </div>
    }
}


PropTypes.checkPropTypes = {
    fetching: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
}