import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as AppActions from '../actions/AppActions';

import '../css/detail.css'

class Detail extends Component {

    componentWillMount() {
        const pathname = 'articles' + this.props.match + '/';
        this.props.AppActions.getDetailArticle(pathname);
    }

    onClickCart(e) {
        e.preventDefault();


    }

    render() {
        return <div id="root">
            <div className="center">
            {this.props.detail.fetching === true ?
                <div className="spin">Spin...</div> :
                (this.props.detail.item.length === undefined) && (this.props.detail.item.length === 0) ?
                    <div className="notc">Notning</div> :
                    <div className="item-detail">
                        <div className="title-detail">{this.props.detail.item.title}</div>
                        <div className="img-container">
                            <img src={this.props.detail.item.pics} alt="media"/>
                            <div className="form-add-cart">
                                <form onSubmit={::this.onClickCart}>
                                    <input type="number" ref={(node) => {
                                        this.count = node
                                    }} defaultValue='1' className="form-number"/>
                                    <button>Add To Cart</button>
                                </form>
                            </div>
                        </div>
                        <div className="desc-detail">{this.props.detail.item.desc}</div>
                    </div>
            }
        </div>
        </div>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        detail: state.detail,
        match: ownProps.location.pathname,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        AppActions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
