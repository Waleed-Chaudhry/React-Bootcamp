import React from 'react'
import styles from './Cockpit.css'

const cockpit = (props) => {
    // red and bold are the class names defined in our App.css
    // As you push each of these styles to the classes,
    // The HTML element p with the className classes gets those styles added to it
    // Changing style conditionally
    const classes = []
    let btnClass = ''; // Using CSS modules
    if (props.showPersons) {
        btnClass = styles.Red; 
    }
    if (props.persons.length <= 2) {
      classes.push(styles.red);
    }
    if (props.persons.length <= 1) {
      classes.push(styles.bold);
    }

    return (
        <div className={styles.Cockpit}>
            <h1>Welcome to React</h1> 
            {/* We need the .join to make the p have multiple styles, not just the most recent element pushed */}
            <p className={classes.join(' ')}>This is really working!</p>
            {/* Call the function to change the component state */}
            {/* Another way of storing the change of state */}
            {/* Bind is more performance efficient */}
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons
            </button>
        </div>
    )
};

export default cockpit;
