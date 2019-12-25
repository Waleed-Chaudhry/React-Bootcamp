# Redux
* Helps manage a global state for the application

### Setup
* npm install --save redux react-redux
* npm install --save redux-thunk
* Create actions and reducer folders within a new store directory
* Have a seperate reducer and actions file for each major action within actions and reducers e.g. BurgerBuilder
* actions dir also has an actionTypes and index file

#### index.js
* Initialize index.js with a rootReducers which combines the each of the reducers you've created in store/reducers directory
* Pass a reference of that reducer to the store
* Pass the store to the imported provider component 
```JSX
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
    composeEnhancers(applyMiddleware(thunk)) //Enables async calls in the reducer
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

/* code that comes with a new React App */
ReactDOM.render( app, document.getElementById( 'root' ) );

serviceWorker.unregister()
```

### Wiring the State using Redux

### Step 1: Create a new action type in actions/actionTypes.js

#### actionTypes.js
```JSX
/* Burger Builder Actions */
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
```
* You need an action for every function that changes the state
* Divide your actions into two types - sync handlers and async ones
* Sync handlers run simple functions like increment a value on the state etc
* Aync hanlders much async functions like making an axios request
    * However after returning the axios call, the async handlers call a success sync handler e.g. SET_INGREDIENTS to add the ingredients to the state
     * Or a failure sync handler e.g. FETCH_INGREDIENTS_FAILED to set the error state to be true
* We export only the sync hander, including the ones called by the async one here, in all caps

### Step 2: Create the action creater in actions/burgerBuilder.js
* Each sync action has an a type as defined in actions/actionTypes.js
* The sync action can also optionally have a payload. 
  * Think of this as the value that the reducer will need to update the state of the app
  * e.g. addIngredient action creater will need to pass the ingredientName to the reducer
* The async handler does an async call (e.g. to axios) and then dispatches one of the two async functions depending on sucess or failure

#### actions/burgerBuilder.js
```JSX
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/* Sync Actions i.e. actions that don't need an async axios call to update the state */

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

// The set and failed is standard pattern for async handlers
// Both of these setIngredients and fetchIngredientsFailed is called by the async initIngredients action
export const setIngredients = ( my_ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        // ingredients is the name of the var we're passing to the reducer
        // my_ingredients is the argument passed by the initIngredients function
        // could have called it anything
        ingredients: my_ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

/* Async Handlers */
export const initIngredients = () => {
    return dispatch => {  // dispatch it available through redux thunk
        axios.get('https://burger-buider.firebaseio.com/ingedients.json')
            .then( response => {
               dispatch(setIngredients(response.data));
            } )
            // Adjust our error state in case it fails
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};
```

### Step 3: Export the action creaters
* Export the sync handlers not called by the async handler, and the async handlers from actions/burgerBuilder.js
#### actions/index.js
```JSX
export {
    addIngredient,
    removeIngredient,
    initIngredients
} from './burgerBuilder';
export {
    purchaseBurger,
    purchaseInit,
    fetchOrders
} from './order';
```

### Step 4: Implement the change of state in the reducer
* The reducer has the initialState defined
* There is a method implementation for each of the actions defined in actions/actionTypes.js
  * Uses the value of the action.state, and uses it to create a new object representing the updated state
* The reducer cases over each of actions defined in actions/actionTypes.js and calls the appropriate method
* Every change of state has to happen inside the reducer

#### reducers/burgerBuilder
```JSX
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject( state, updatedState );
};

// fetchIngredientsFailed, setIngredients and removeIngredient elided
const reducer = ( state = initialState, action ) => {
    /* state = initialState sets a default value for the state 
     * Used when state is undefined in the function  call 
     */
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state; // Very important to return state in case you want the state to be modified by a different reducer as you combine reducers
    }
};

export default reducer;
```

### Step 5: Connect the State to containers/BurgerBuilder
* Uses the mapStateToProps and mapDispatchToProps to connect the state to the component
* The default export is wrapped in 4 things: connect HOC, mapStateToProps, mapDispatchToProps and the optional errorHandler
* Calls each of the action creaters in actions/index.js either by passing it down to a component, or componentDidMount method
* There is no state defined in the container since it's defined on the reducer instead

#### containers/BurgerBuilder
```JSX
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  componentDidMount () {
    // Note use of this.props onInitIngredients method
    this.props.onInitIngredients();
  }

  // Called when we click Contine on the Modal
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout') //Using React Router to load the component defined by /checkout path
  }

  render () {
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( this.props.ings ) {
      burger = (
        // Note use of this.props.ings and this.props.onIngredientAdded to refer to the connected state 
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
        </React.Fragment>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    )
  }
}
/* Receives the state from store */
const mapStateToProps = state => { //Has to be named state, passed in by react redux
  return {
      ings: state.burgerBuilder.ingredients, 
      // Stores the ingredients from the state in object with prop ing
      // We can then use this.props.ings outside this method to refer to the ingredients object on the state
      // the burgerBuilder in state.burgerBuilder.ingredients refers to the key as defined in the combine reducer method in index.js
      price: state.burgerBuilder.totalPrice,
  };
}

/* Dispatching actions in this container */
const mapDispatchToProps = dispatch => { //Has to name dispatch, passed in by react redux
  return {
      // We'll use this.props.onIngredientAdded outside the method 
      // onIngredientAdded could have been named anything
      onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
      onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
};

/* Wrapping the export inside connect */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
```
