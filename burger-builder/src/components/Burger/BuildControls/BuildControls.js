import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

/* Array to set the labels on each build control button */
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label} // String
        label={ctrl.label} // String
        added={() => props.ingredientAdded(ctrl.type)} // Function
        removed={() => props.ingredientRemoved(ctrl.type)} // Function
        disabled={props.disabled[ctrl.type]} /> // Boolean
    ))}
    <button className={classes.OrderButton}
      disabled={!props.purchasable} // Boolean
      onClick={props.ordered}>ORDER NOW {/* Function */}
    </button>
  </div>
)

buildControls.propTypes = {
  price: PropTypes.number,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func
}

export default buildControls
