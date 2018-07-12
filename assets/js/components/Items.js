import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import * as style from '../css/base.css'


export default class Items extends Component {


    componentDidMount() {
        this.props.getItems('articles/', this.props.token);
    }
    render() {
        const {fetching, items} = this.props;
        return <div className="row">
        <div className={style.content}>
            {fetching ?
                undefined
            :
                items.length === undefined || items.length === 0 || null ?
            <div>Nothing items...</div>
            :
                            items.map(item => (
                    <div key={item.id} className="item">

                        <Link to={{
                            pathname: item.id
                        }}>

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
