import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

// Map to keep track of price of each ingredient
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    // purchasable: false, // Determines whether we can purchase the burger
    purchasing: false, // If the order now button was clicked
    loading: false // To display the spinner while posting the order summary
  }

  /* Determine if the burger is purchaseable i.e. has at least one ingredient */
  /* This is just a helper function, not a handler */
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
    return sum > 0
  }

  /* Build Control Handlers

  // Called when we click More
  addIngredientHandler = (type) => {
    // Update the State to increase the ingredient count
    const oldCount = this.state.ingredients[type] // number of ingredients of a given type
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients } // state should be updated in an immutable way
    updatedIngredients[type] = updatedCount // Updating the newly created object instead of the state

    // Update the Total Price of the burger
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
  } */

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
    this.props.history.push('/checkout')
  }

  render () {
    // Logic to disable the less Button in case the count is 0 or less
    // We're creating an object like: {salad: true, meat: false, ...}
    const disabledInfo = { ...this.props.ings }
    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
    }

    let orderSummary =  <OrderSummary
      ingredients={this.props.ings}
      price={this.props.price}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler} />
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }
    return (
      <React.Fragment>
        <Burger ingredients={this.props.ings} />
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {/* Model only gets displayed if state is purchasing i.e. Order Button has been clicked */}
          {/* We only pass in the cancelHander so that the backdrop can cancel the order */}
          {orderSummary}
        </Modal >
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          ordered={this.purchaseHandler}
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          price={this.props.price} />
      </React.Fragment>
    )
  }
}

/* Receives the state from store */
const mapStateToProps = state => { //Has to be named state, passed in by react redux
  return {
      ings: state.ingredients, //Stores the ingredients from the state in object with prop ing
      price: state.totalPrice
  };
}

/* Dispatching actions in this container */
const mapDispatchToProps = dispatch => { //Has to name dispatch, passed in by react redux
  return {
      /* 
       * Each action should have a dispatch 
       * Type is the mandatory field and used to reducer's caste statement
       * You also have to pass ingredientName since the reducer needs them to calculate state
       * onIngredientAdded and ingName can be named anything
       */
      onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
      onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})  };
};

/* Wrapping the export inside connect */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));

/*
 * Replace this.state.ingredients with this.props.ings
 * Replace this.state.totalPrice with this.props.price
 * Replace this.addIngredientHandler with this.props.onIngredientAdded
 * Replace this.removeIngredientHandler with this.props.onIngredientRemoved
 * Remove addIngredientHandler and removeIngredientHandler methods
 * Remove ingredients and totalPrice from the initial state since that bit of the state is being managed by redux
 */
