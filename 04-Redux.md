# Redux

* State management can be difficult because we have to pass the state between components
* Redux helps manage a global state for the application
* You can partially manage a state in redux
  * You can have parts of the state be managed locally in the container 
  * And other parts managed by redux
* npm install --save redux react-redux

### Adding Redux to the project

#### index.js
```JSX
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';

/* Create Store */
const store = createStore(reducer); //has a reference to the reducer

/* Wrap app inside Provider component */
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
```

#### reducer.js
* Reducer receives actions, and updates the state
* Create reducer inside src/store dir
```JSX
import * as actionTypes from './actions';

/* Initial State */
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = ( state = initialState, action ) => {
    /* state = initialState sets a default value for the state 
     * Used when state is undefined in the function  call 
     * Has to case over each of the action types
     * You would need an action for each of the handlers that updates the state 
     * e.g addIngredient and removeIngredient
     */

    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state, // Copy the old state
                ingredients: {
                    //Copy the old ingredients
                    // the ...state only shallow copies the ingredients object inside state 
                    ...state.ingredients, 
                    // action should provide ingredient name in the payload
                    // [action.ingredientName] will update the value of the action.ingredientName
                    // with the new values of state.ingredients[action.ingredientName] + 1
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                // Same as Add, with + replaced by -
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;
```

#### Actions
* Connects the stateful component to 
```JSX
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions';

/* Receives the state from store */
const mapStateToProps = state => { //Has to be named state, passed in by react redux
  return {
      ings: state.ingredients, //Stores the ingredients from the state in object with prop ing
      price: state.totalPrice
  };
}

/* Dispatching actions in this container */
const mapDispatchToProps = dispatch => { //Has to name dispatch, passed in by react redux
  return {
      /* 
       * Each action should have a dispatch 
       * Type is the mandatory field and used to reducer's caste statement
       * You also have to pass ingredientName since the reducer needs them to calculate state
       * onIngredientAdded and ingName can be named anything
       */
      onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
      onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})  };
};

/* Wrapping the export inside connect */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));

/*
 * Replace this.state.ingredients with this.props.ings
 * Replace this.state.totalPrice with this.props.price
 * Replace this.addIngredientHandler with this.props.onIngredientAdded
 * Replace this.removeIngredientHandler with this.props.onIngredientRemoved
 * Remove addIngredientHandler and removeIngredientHandler methods
 * Remove ingredients and totalPrice from the initial state since that bit of the state is being managed by redux
 */
```

### Simplifying Passing Query Params
* https://github.com/Waleed-Chaudhry/React-Bootcamp/blob/master/03-React-Router.md#passing-and-receiving-query-params
* The passing and receiving get simplified as

#### Passing
```JSX
purchaseContinueHandler = () => {
  this.props.history.push('/checkout')
}
```

#### Receiving
```JSX
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        // ings can be named anything, state.ingredients needs to be named that to receive the ingredients from state
        ings: state.ingredients
        // Replace this.state.ingredients with this.props.ings in the component
    }
};

// Omit the second argument to connect, since we're not dispatching anything
// We just needed access to the state
export default connect(mapStateToProps)(Checkout);
```

### Simplifying complicated Routes
* https://github.com/Waleed-Chaudhry/React-Bootcamp/blob/master/03-React-Router.md#route-not-on-the-appjs
* The route gets simplified to
```JSX
<Route 
    path={this.props.match.path + '/contact-data'} 
    component={ContactData}
/>
```

ContactData can then connect to the redux state like:
```JSX
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);

/* Replace this.props.ingredients with this.props.ings
 * this.props.price since price is already being read as price in orderHandler
 * We wouldn't have to replace this.props.ingredients if we renamed ings to ingredients in mapStateToProps
 */
```
