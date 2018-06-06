import React, {Component} from 'react'
import {connect} from 'react-redux'
import Navigation from '../components/Navigation'
import Items from '../components/Items';
import {bindActionCreators} from 'redux';
import * as AppActions from '../actions/AppActions';
import Spinner from '../components/Spinner'

class App extends Component {
    render() {
        const { items, navigation, auth } = this.props;
        const { getItems, getCategories, selectFilter } = this.props.AppActions;


        return <div id="root">
            {console.log(items.fetching + '  ' + navigation.fetching + '  ' + auth.fetching)}
            {(items.fetching === false) || (navigation.fetching === false) || (auth.fetching === false) ?
                <div className="center">
                    <Navigation categories={navigation.categories} fetching={navigation.fetching}
                                selectFilter={selectFilter} getCategories={getCategories} token={auth.token}/>
                    <Items fetching={items.fetching} items={items.items} getItems={getItems} token={auth.token}/>
                </div>
                :
                <Spinner/>
            }
        </div>

    }

}

function mapStateToProps(state) {
    return {
        items: state.items,
        navigation: state.navigation,
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        AppActions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)