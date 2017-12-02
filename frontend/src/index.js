import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';

import './index.css';

const target = document.querySelector('#root');

render(
    // Provider is like a database on the browser side / frontend
    // Action creators dispatch actions, which are handled by reducers
    // Reducers change the data
    // ConnectedRouter manages different views and history
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <div>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target
)
