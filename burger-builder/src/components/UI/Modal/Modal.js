import React, {Component} from 'react'
import PropTypes from 'prop-types'

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  componentWillUpdate() {
    // console.log('Modal Will Update')
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal}
          style={{ // Set the style to show or hide the model
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', // translateY(-100vh) hides it from the screen
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children} {/* Render the JSX within the Modal Component in BurgerBuilderpr.js */}
        </div>
      </React.Fragment>
    )
  }
} 

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool,
  modalClosed: PropTypes.func
}

export default Modal
