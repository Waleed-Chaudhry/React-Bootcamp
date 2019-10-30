import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  /* Logic to take in the ingredients and convert it an html element containing number of each ingredient */
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
        </li>)
    })

  return (
    /* Render the dynamically created ingredientSummary along with static content */
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </React.Fragment>
  )
}

orderSummary.propTypes = {
  ingredients: PropTypes.object,
  purchaseCancelled: PropTypes.func,
  purchaseContinued: PropTypes.func,
  price: PropTypes.number
}

export default orderSummary
