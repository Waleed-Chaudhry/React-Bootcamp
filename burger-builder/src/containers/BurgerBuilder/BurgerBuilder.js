import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

// Map to keep track of price of each ingredient
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4, // Base Price of the burger
    purchasable: false, // Determines whether we can purchase the burger
    purchasing: false // If the order now button was clicked
  }

  /* Determine if the burger is purchaseable i.e. has at least one ingredient */
  updatePurchaseState (ingredients) {
    /* Fancy code to simply sum up all the ingredients */
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    // If we have more than one ingredient, the burger is purchaseable
    this.setState({ purchasable: sum > 0 })
  }

  /* Build Control Handlers */

  // Called when we click More
  addIngredientHandler = (type) => {
    /* Update the State to increase the ingredient count */
    const oldCount = this.state.ingredients[type] // number of ingredients of a given type
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients } // state should be updated in an immutable way
    updatedIngredients[type] = updatedCount // Updating the newly created object instead of the state

    /* Update the Total Price of the burger */
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }) // Finally updating the state with the new objects created
    this.updatePurchaseState(updatedIngredients)
  }

  // Called when we click less, same logic as addIngredientHandler
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) { return } // Must be a JSON Object to avoid type error
    const updatedCount = oldCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  // Called when we click Order Now
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  // Called when we click the modal that appears after we click OrderNow
  // i.e. we're now canceling the order
  // Or when we click Cancel on the modal
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  // Called when we click Contine on the Modal
  purchaseContinueHandler = () => {
    alert('You continue!') // eslint-disable-line
  }

  render () {
    // Logic to disable the less Button in case the count is 0 or less
    // We're creating an object like: {salad: true, meat: false, ...}
    const disabledInfo = { ...this.state.ingredients }
    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {/* Model only gets displayed if state is purchasing i.e. Order Button has been clicked */}
          {/* We only pass in the cancelHander so that the backdrop can cancel the order */}
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal >
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice} />
      </Aux>
    )
  }
}

export default BurgerBuilder
