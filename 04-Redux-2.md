# Redux

* State management can be difficult because we have to pass the state between components
* Stores the entire application state

### Basic Example
* Each store is created with the reference to a rootReducer
* The store dispatches actions - each with its own type
  * We can also have some other properties such as value in the action
* The rootReducer receieves the actions, and based on the type and other values passed in, updates the state
* Code inside store.subscribe is triggered whenever there is an update to the state

#### redux-basics.js
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

### Connecting redux to react

#### Index.js
```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'; //
import { Provider } from 'react-redux'; //

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Use a seperate file for the reducer
// Same as redux-basics.js until before /* Store */ with export default reducer added 
import reducer from './store/reducer';

const store = createStore(reducer); //

// Provider is a helper component which helps us hook our store into the react components
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root')); //
registerServiceWorker();

// npm install --save react-redux
```

#### Counter.js
```JSX
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = { // Same as defining state in a react container
        counter: 0
    }
    render () {
        return (
            <div>
                {/* Instead of this.state.counter, we're  this.props.ctr */}
                <CounterOutput value={this.props.ctr} />
                {/* Using the onIncrementCounter from mapDispatchToProps 
                  * Inside reducer you have the handle the case if (action.type === 'INC_COUNTER')
                  * The reducer returns the incremented state counter
                  * The counter is the value for the CounterControl component 
                  */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
            </div>
        );
    }
}

/* Recieves the state from redux */
const mapStateToProps = state => { //Has to be named state, passed in by react redux
    return {
        ctr: state.counter //Stores the counter from the state in a var ctr
    };
};

/* Dispatching actions in this container */
const mapDispatchToProps = dispatch => { //Has to name dispatch, passed in by react redux
    return {
        // this function i.e. dispatch will be available as onIncrementCounter property
        // So you can assign the property to a click handler, and dispatch will be executed 
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    };
};

/* Adding receiving state, and dispatch to the export */
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
