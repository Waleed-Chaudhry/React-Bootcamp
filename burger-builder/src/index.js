import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';  // React Router

/* Redux Imports */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
/* applyMiddleware, compose and thunk are for asyc calls */
import thunk from 'redux-thunk'
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

/* Basic Imports */
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

/* Enable the extension: */
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Combine the Reducers */
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
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

/* Code that comes with a new React App */
ReactDOM.render( app, document.getElementById( 'root' ) );

serviceWorker.unregister()
