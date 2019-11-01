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