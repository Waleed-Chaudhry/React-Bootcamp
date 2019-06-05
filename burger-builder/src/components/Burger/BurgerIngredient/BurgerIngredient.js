import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './BurgerIngredient.module.css'

class BurgerIngredient extends Component {
  render () {
    let ingredient = null

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className={styles.BreadBottom} />
        break
      case ('bread-top'):
        ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1} />
            <div className={styles.Seeds2} />
          </div>
        )
        break
      case ('meat'):
        ingredient = <div className={styles.Meat} />
        break
      case ('cheese'):
        ingredient = <div className={styles.Cheese} />
        break
      case ('bacon'):
        ingredient = <div className={styles.Bacon} />
        break
      case ('salad'):
        ingredient = <div className={styles.Salad} />
        break
      default:
        ingredient = null
    }

    return ingredient
  }
}

BurgerIngredient.propTypes = { // Property Validation
  type: PropTypes.string.isRequired
}

export default BurgerIngredient
