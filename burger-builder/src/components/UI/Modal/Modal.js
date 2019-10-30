import React from 'react'
import PropTypes from 'prop-types'

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div className={classes.Modal}
      style={{ // Set the style to show or hide the model
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', // translateY(-100vh) hides it from the screen
        opacity: props.show ? '1' : '0'
      }}>
      {props.children} {/* Render the JSX within the Modal Component in BurgerBuilderpr.js */}
    </div>
  </React.Fragment>
)

modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool,
  modalClosed: PropTypes.func
}

export default modal
