import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.module.css'

const button = (props) => (
  <button
    // So we can have either a Success or a Danger Button
    // Success and Danger are classes defined in the CSS module
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    { /* props.children so we can use it like a normal button
      We can wrap the content we want on the button around it
      In our use case, props.childen is CANCEL or Continue */}
    {props.children}
  </button>
)

button.propTypes = {
  children: PropTypes.string,
  clicked: PropTypes.func,
  btnType: PropTypes.string
}

export default button
