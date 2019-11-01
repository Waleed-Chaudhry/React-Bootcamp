# React Router

* A way of having multiple pages in a single page application
* We still have a single page html, but we render/change different parts of the html
* We just url/path to render the appropriate JSX code, and skip other components

### Setup
```npm i react-router-dom --save```

#### index.js 
```JSX
/* Wrap the app inside in Browser Router to enable routing in your app*/
import { BrowserRouter } from 'react-router-dom';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
```

#### App.js
```JSX
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render () {
    return (
      <div>
        {/* Layout is always loaded for each route */}
        <Layout>
          <Switch>
            {/* Switch renders the first component that matches the path inside the layout
              * i.e. the mainpage will only contain Burger builder
              * To render orders page, you'll have to go to localhost:3000/orders */}
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* Without switch, multiple components that start with / would be rendered 
              * Exact makes sure that BurgerBuilder is the only component loaded when the path is just localhost:3000
              * Only BurgerBuilder will have access to the prop, not a component within Burger Builder like Burger */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
```

### Other notes
* Any component that is rendered by react router should be wrapped in a div since it's in essence it's own page
* Another way to navigate to the Checkout component is to tie this to a continue hander
  ```JSX
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }
  // this is in essence the same as calling the /checkout route in App.js
  ```
* If a click handler is on a form
  ```JSX
  orderHandler = ( event ) => {
    event.preventDefault();
    // To prevent refresh of page when you click button on a form
  }
  ```
* Go to the previous page
  ```JSX
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  ```
* Redirect
  ```JSX
  checkoutContinuedHandler = () => {
    this.props.history.replace( '/checkout/contact-data' );
    // You would use replace rather than push in situations like a 404
    // push is navigating to a new route
    // replace removes the current entry on the history stack with the new which is what you want in a redirect
  }
  ```
  
### Passing and Receiving Query Params
  
#### Passing
```JSX
purchaseContinueHandler = () => {
  const queryParams = [];
  for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  }
  queryParams.push('price=' + this.state.totalPrice);
  const queryString = queryParams.join('&');
  this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
  });
}
/* This parses the state:
 * ingredients: {
 *    salad: 2,
 *    bacon: 0,
 *   cheese: 0,
 *    meat: 2
 *  },
 *  totalPrice: 7.6 to http://localhost:3000/checkout?salad=2&bacon=0&cheese=0&meat=2&price=7.6
```

#### Receiving
```JSX
componentWillMount () {
    const query = new URLSearchParams( this.props.location.search );
    console.log(query.entries())
    const ingredients = {};
    let price = 0;
    for ( let param of query.entries() ) {
        if (param[0] === 'price') {
            price = param[1];
        } else {
            ingredients[param[0]] = +param[1];
        }
    }
    this.setState( { ingredients: ingredients, totalPrice: price } );
}
```

### Route not on the App.js
```JSX
<Route 
    path={this.props.match.path + '/contact-data'} 
    // Pass whatever url you're on. Final path would be /checkout/contract-data if you call the route from /checkout
    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} 
    // A way to pass the state to the Contact Data form
    // Contact data can then call this.props.history.push('/') to get you back to the home page
/>
```

### Using Nav Links

#### NavigationItems
```JSX
import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* exact to only match /, not anything starting with / */}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;
```

#### NavigationItem
```JSX
import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}
            {/* CSS styling for this active class is inside 
            .NavigationItem a.active {
                color: #40A4C8;
            }
            Nav link translates to an anchor (a) tag on the HTML
            */}
        </NavLink>
    </li>
);

export default navigationItem;
```
