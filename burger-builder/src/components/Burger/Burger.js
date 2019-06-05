import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import PropTypes from 'prop-types'

const burger = (props) => {
  /*  Determining which and how many ingredients are needed based on the state */
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => { // [salad, bacon, cheese, meet]
    return [...Array(props.ingredients[igKey])].map((_, i) => { // Create an array of arrays of length 1, 1, 2 and 2 respectively
      return <BurgerIngredient key={igKey + i} type={igKey} /> // Put the component within that array
    })
  })
  // Flatten the array such that we now have something like: {Salad Comp}, {Bacon Comp}, {Cheese Comp}, {Cheese Comp}, {Meat Comp}, {Meat Comp}]
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    // Creating the burger with the top, bottom and ingredients in the middle
    // Top, bottom and ingredients are just BurgerIngredient components
    // We're setting the type string on each BurgerIngredient so that BurgerIngredient can case on the type
    // And then generate the appropriate ingredient, which is rendered here
    // We'll always have a bread top and bread bottom, the ingredients are set dynamically
    <div className={styles.Burger}>
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
