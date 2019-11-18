import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
/* applyMiddleware, compose and thunk are for asyc calls */
import thunk from 'redux-thunk'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import burgerBuilderReducer from './store/reducers/burgerBuilder';
// import orderReducer from './store/reducers/order';

// Enable the extension: 
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Combine the Reducers */
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer
    // order: orderReducer
});

/* Create Store */
const store = createStore(
    rootReducer, //has a reference to the reducer
    composeEnhancers(applyMiddleware(thunk)) //Async calls in the reducer
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
