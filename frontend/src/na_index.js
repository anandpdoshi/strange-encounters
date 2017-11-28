import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// import './index.css';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Provider store={store}>
        // <App />
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="login" component={Login} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));

// registerServiceWorker();
