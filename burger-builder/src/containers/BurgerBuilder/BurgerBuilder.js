import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    // Local state used by this component only, not the best practice
    // Ideally everything should be local but just showing this is possible
    purchasing: false, // If the order now button was clicked
  }

  componentDidMount () {
    // Note use of this.props onInitIngredients method
    this.props.onInitIngredients();
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

  /* Build Control Handlers */

  // Called when we click Order Now
  purchaseHandler = () => {
    this.setState({ purchasing: true }) // local state variable
  }

  // Called when we click the modal that appears after we click OrderNow
  // i.e. we're now canceling the order
  // Or when we click Cancel on the modal
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false }) // local state variable
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
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( this.props.ings ) {
      // Note use of this.props.ings and this.props.onIngredientAdded to refer to the connected state 
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
        </React.Fragment>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    )
  }
}

/* Receives the state from store */
const mapStateToProps = state => { //Has to be named state, passed in by react redux
  return {
      ings: state.burgerBuilder.ingredients, 
      // Stores the ingredients from the state in object with prop ing
      // We can then use this.props.ings outside this method to refer to the ingredients object on the state
      // the burgerBuilder in state.burgerBuilder.ingredients refers to the key as defined in the combine reducer method in index.js
      price: state.burgerBuilder.totalPrice,
  };
}

/* Dispatching actions in this container */
const mapDispatchToProps = dispatch => { //Has to name dispatch, passed in by react redux
  return {
      // We'll use this.props.onIngredientAdded outside the method 
      // onIngredientAdded could have been named anything
      onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
      onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
};

/* Wrapping the export inside connect */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));