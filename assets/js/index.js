import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import Detail from './containers/Detail';
import Authentication from './containers/Authentication'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore'
import './css/base.css'


const store = configureStore();



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router>
            <div className="none-container">
                <header>
                    <div className="signup">Sign up</div>
                    <Link to="/signup"><div className="login">log in</div></Link>
                </header>
            <div className="non-container">
                <main>
                    <div id="root">
            <Route exact path="/" component={App}/>
            <Route path="/signup" component={Authentication} />
                        </div>
                </main>
            </div>

                <footer>

                </footer>
            </div>
                </Router>
        </BrowserRouter>
    </Provider>,
  document.getElementById('target')
);
