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
//



const store = configureStore();

export class REPL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        };
    }


    render() {

        return <Provider store={store}>
            <BrowserRouter>
                <Router>
                    <div className="none-container">
                        {/*{this.state.ready === false ?*/}
                        {/*<Spinner/> :*/}
                        {/*undefined*/}
                        {/*}*/}
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={App}/>
                            <Route path="/user" component={Authentication}/>
                            <Route path="/:id" component={Detail}/>
                        </Switch>


                        <footer>

                        </footer>
                    </div>
                </Router>
            </BrowserRouter>
        </Provider>
    }
}

ReactDOM.render(<REPL/>
    ,
  document.getElementById('target')
);
