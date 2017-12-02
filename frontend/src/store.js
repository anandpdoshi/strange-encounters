// import { promiseMiddleware } from './middleware';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';

// NOTE this is exported
// Our history const syncs our browserHistory with our store and must be exported so we can use it within our routes later.
export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;

// TODO needs cleanup OLD
// const defaultState = {
//     // appName: 'strange-encounters'
//     appName: 'conduit',
//     articles: null,
// };
//
// const reducer = function(state = defaultState, action) {
//     switch (action.type) {
//         // TODO modify this
//         case 'HOME_PAGE_LOADED':
//             return { ...state, articles: action.payload.articles };
//     }
//     return state;
// };
//
// const middleware = applyMiddleware(promiseMiddleware);
//
// const store = createStore(reducer, middleware);

// export default store;
