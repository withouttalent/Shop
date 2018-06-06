import React from 'react';
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
//



const store = configureStore();



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router>
            <div className="none-container">
                <Header/>
                <main>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/user" component={Authentication}/>
                        <Route path="/:id" component={Detail}/>
                    </Switch>
                </main>


                <footer>

                </footer>
            </div>
                </Router>
        </BrowserRouter>
    </Provider>,
  document.getElementById('target')
);
