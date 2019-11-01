# Redux

* State management can be difficult because we have to pass the state between components
* Stores the entire application state

### Basic Example
* Each store is created with the reference to a rootReducer
* The store dispatches actions - each with its own type
  * We can also have some other properties such as value in the action
* The rootReducer receieves the actions, and based on the type and other values passed in, updates the state
* Code inside store.subscribe is triggered whenever there is an update to the state

### 
```JSX
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

/* Reducer */

// state = initialState sets a default value for the state when it's undefined in the function call 
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state, //Copy the old state
            counter: state.counter + 1 //Overwrite the one property on the state you want to adjust
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

/* Store */

const store = createStore(rootReducer);
console.log(store.getState()); // Print the initial state

/* Subscription */

store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

/* Dispatching Actions */

// Takes an argument action with is a JS object
// The type of the object is upper case by default
store.dispatch({type: 'INC_COUNTER'});
// Can add other properties such as value or even objects
store.dispatch({type: 'ADD_COUNTER', value: 10});
```

#### Running the file
```c
$ node redux-basics.js 
{ counter: 0 }
[Subscription] { counter: 1 }
[Subscription] { counter: 11 }
```
