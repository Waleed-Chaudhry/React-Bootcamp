# Routing

### Setup
```c
npm install create-react-app -g //So that it's available from any dir on your computer
create-react-app react-bootcamp --scripts-version 1.1.5
npm run start //Starts the app on localhost:3000 // the webpage auto reloads, whenever you make a change to your code
npm i react-router-dom --save //Installs the router dom
```
* Inside src create components and containers dirs
* Each component gets created inside a new folder starting with an uppercase character e.g. BurgerBuilder
* Anytime you have {} inside JSX that means you can write JS code in there

* Routing is a way of having multiple pages in a single page application
* All you do is load certain components in App.js based on the route
* You don't have to worry about passing the state to different components. That bit is handled by Redux

### Using Routing

#### App.js
```JSX
import React, { Component } from 'react';
/* React Router Imports */
import { Route, Switch } from 'react-router-dom';

/* Project Specific Imports */
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render () {
    return (
      <div>
        <Layout> {/* Layout is always loaded for each route in our project */}
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

#### index.js
```JSX
/* Wrap the app inside in Browser Router to enable routing in your app*/
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
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
  
  
### Using Nav Links
* Nav Links are essentially just hyperlinks you can click to be redirected to the different routes
* In our burgerBuilder app, we just have two boxes at the top right - BurgerBuilder and Orders so we're only implementing those
* /checkout is reached via purchaseContinueHandler inside BurgerBuilder as mentioned above

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
