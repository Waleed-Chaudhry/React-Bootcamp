import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  render() {
    /* Logic to take in the ingredients and convert it an html element containing number of each ingredient */
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>)
      })

    return (
      /* Render the dynamically created ingredientSummary along with static content */
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </React.Fragment>
    )
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  purchaseCancelled: PropTypes.func,
  purchaseContinued: PropTypes.func,
  price: PropTypes.number
}

export default OrderSummary
