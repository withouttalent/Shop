import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


export default class Navigation extends Component {
    handleClick(e) {
        console.log('filter/' + e.target.innerText + '/');
        this.props.selectFilter('filter/' + e.target.innerText, this.props.token)
    }


    componentDidMount() {
        this.props.getCategories('categories/', this.props.token);
    }
    render() {
        const {categories, fetching} = this.props;
        return <div className="navigation">
            {fetching === true ?
                undefined :
                categories.length === undefined ?
                undefined
                :
                <div className="exsistens">
                    {categories.map((category, id) => <Link to="/">
                        <div key={id} onClick={::this.handleClick} className="navigation-category">{category.name}</div>
                    </Link>)}
                </div>
            }
        </div>
    }
}


PropTypes.checkPropTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    selectFilter: PropTypes.func.isRequired
}
