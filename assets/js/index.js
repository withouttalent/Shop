import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import Authentication from './containers/Authentication'
import {BrowserRouter as Router, BrowserRouter, Route} from 'react-router-dom'
import configureStore from './store/configureStore'
import './css/base.css'
import Header from './containers/Header'

const store = configureStore();



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router>
            <div className="none-container">
                <Header/>
                <main>
                    <div id="root">
            <Route exact path="/" component={App}/>
            <Route path="/signup" component={Authentication} />
                        </div>
                </main>


                <footer>

                </footer>
            </div>
                </Router>
        </BrowserRouter>
    </Provider>,
  document.getElementById('target')
);
