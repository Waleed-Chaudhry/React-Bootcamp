# React

### Setup
```c
npm install create-react-app -g //So that it's available from any dir on your computer
create-react-app react-bootcamp --scripts-version 1.1.5
npm run start //Starts the app on localhost:3000 // the webpage auto reloads, whenever you make a change to your code
```
* Inside src create components and containers dirs
* Each component gets created inside a new folder starting with an uppercase character e.g. BurgerBuilder
* Anytime you have {} inside JSX that means you can write JS code in there

```JSX
### App
/* 
 * The app component should be incredibly simple as shown here
 * Should ideally just return the Container (Burger Builder wrapped in
 */
import React from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App () {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  )
}
```

export default App
### Containers

#### Burger Builder
```JSX
import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

/* Declare any constants used by the class */
const INGREDIENT_PRICES = {
  salad: 0.5 // Map to keep track of price of each ingredient
}

class BurgerBuilder extends Component {
  /* Declare the initial state since Components are stateful */
  state = {
    ingredients: {
      salad: 0
    },
    purchasable: false // Determines whether we can purchase the burger
  }


  /* 
   * Handers i.e. functions that are used to update the state
   * These are functions called when we click an element on the UI
   * The stateful component just updates the state variable
   * It can then pass the updated state in case of Burger
   * For pass the function name in case of BuildControls
      * The appropriate component within build controls can call that function to update the state
      * And use the state to construct itself
   */

  addIngredientHandler = (type) => {
    // Update the State to increase the ingredient count
    const oldCount = this.state.ingredients[type] // number of ingredients of a given type
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients } // state should be updated in an immutable way
    updatedIngredients[type] = updatedCount // Updating the newly created object instead of the state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }) // Finally updating the state with the new objects created
    this.updatePurchaseState(updatedIngredients)
  }
  
  /* 
   * Render method actually renders all the components to the HTML
   * Note that there is only one render in the project
   * App and functional components simpy have a return function without a render method
   */
  render () {
    return (
      /* React.Fragment is just a parent to wrap different JSX elements in if you don't want to create a div */
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
        </BuildControls>
      </React.Fragment>
    )
  }
}

export default BurgerBuilder
```
