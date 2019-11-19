# Components

### Burger.js
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
         * type would be salad or bacon etc as defined in controls array above
         * We still need to delegate this invoking upon clicking something on an HTML
         * That is the BuildControl button, which on click receives the added property from BuildControl
         * This receiving causes the invoking of the function and hence the updating of the state
         * The state is then used passed to Burger Ingredient by BurgerBuilder via Burger to actually render the inredient we just clicked
         */
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

### Other Snipets/Best Practices

#### Conditional CSS Styling
```JSX
/*
 * The following snippet is used to conditionally add styling from the follow CSS class
 * Styling is only added if props.active is true
 */
import classes from './NavigationItem.module.css';

<li className={classes.NavigationItem}>
    <a 
        href={props.link} 
        className={props.active ? classes.active : null}>{props.children}</a>
</li>
```
```CSS    
.NavigationItem a.active {
  color: white;
}
```

#### Adding an image
```JSX
/* 
 * Its better performance wise to import the source image
 * And then refer to the variable inside the src tag on the html
 */
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    /* 
     * Logo CSS class adds the default styling to the logog
     * However, you can dynamically override the height using the state
     * You would do this in case you have the same logo in multiple places in the project
     * But only want to change its height in diferent places
     * The component is created like <Logo height="80%" />
     */
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);
```
