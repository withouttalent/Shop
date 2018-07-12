import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from 'react-router-dom'
import configureStore from './store/configureStore'
import './css/base.css'
// CONTAINERS
import App from './containers/App';
import Authentication from './containers/Authentication'
import Header from './containers/Header'
import Detail from './containers/Detail'
import createHistory from 'history/createBrowserHistory'
import SignUp from './components/SignUp'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
//



export const history = createHistory();

const store = configureStore();
export class REPL extends Component {


    render() {

        return <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router>
                    <div className="none-container">
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={App}/>
                            <Route path="/user" component={Authentication}/>
                            <Route path="/signup" component={SignUp} />
                            <Route path="/:id" component={Detail}/>
                        </Switch>

                    </div>
                </Router>
            </ConnectedRouter>
        </Provider>
    }
}

ReactDOM.render(<REPL/>,
  document.getElementById('target')
);
