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

### App
```JSX
/* 
 * The app component should be incredibly simple as shown here
 * Should ideally just return the Container (Burger Builder)
 * Wrapped around a functional layout object
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

export default App
```

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
   * Functional components e.g. App and Burger simply have a return function without a render method
   * Class based components e.g. Burger have a render method instead
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

### Components

#### Burger 
```JSX
/* Functional Component */
import React from 'react'
/* To have seperate css files per component */
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import PropTypes from 'prop-types'

const burger = (props) => {
  /* 
   * Use the props i.e. the state variable to create the transformed ingredients object 
   * transformedIngredients is just an array of React Component BurgerIngredient based on the state
   * Note that we still don't have any actual HTML/CSS implemented
   * That implementation has been delegated to BurgerIngredient component
   */
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => { 
      return <BurgerIngredient key={igKey + i} type={igKey} />
    })
  })    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  /* We can also directly add some HTML instead of delegating it to another react component */ 
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  /* Return the react components inside an HTML div */
  return (
    <div className={styles.Burger}>
      {/* Css file has a class Burger .Burger {width: 100%;} */}
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

burger.propTypes = {
  ingredients: PropTypes.object
}

export default burger
```

#### Burger Ingredient
```JSX
import React, { Component } from 'react' // Import Component because it's class based
import PropTypes from 'prop-types'
import styles from './BurgerIngredient.module.css'

/* This has been set up as a class based component just to show that it can be
   We could have done the same thing as a functional component as well */
class BurgerIngredient extends Component { // Uppercase B as convention for class based component
  render () { // Render method instead of just a return
    let ingredient = null

    switch (this.props.type) { //this.props, not just props in functional components
      case ('bread-bottom'):
        ingredient = <div className={styles.BreadBottom} />
        break
      case ('cheese'):
        ingredient = <div className={styles.Cheese} />
        break
      default:
        ingredient = null
    }

    /* We're still returning HTML as in the case of render in BurgerBuilder 
       It just so happens that HTML is contained within the ingredient variable */
    return ingredient 
  }
}
 
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient
```

#### Build Controls
```JSX
import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

/* Array to set the labels on each build control button */
const controls = [ { label: 'Salad', type: 'salad' }]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        /* Invoking the handler in Burger Builder
         * We're passing ctrl.type to the handler since the handler function definition expects the type
         * We still need to delegate this invoking upon clicking smoething on an HTML
         * That is the BuildControl button, which on click receives the added property from BuildControl
         * This receiving causes the invoking of the function and hence the updating of the state
         * The state is then used passed to Burger Ingredient by BurgerBuilder via Burger to actually render the inredient we just clicked
         *
        added={() => props.ingredientAdded(ctrl.type)}
    ))}
  </div>
)

export default buildControls
```

#### Build Control
```JSX
import React from 'react'
import styles from './BuildControl.module.css'

const buildControl = (props) => (
  <div className={styles.BuildControl}>
    {/* More Button */}
    {/* Remove button has been removed */}
    <button
      className={styles.More}
      onClick={props.added}>More
    </button>
  </div>
)

export default buildControl
```
