import React, {useEffect} from 'react'
import styles from './Cockpit.css'

const Cockpit = (props) => {
    useEffect(() => {
        console.log('Cockpit.js: useEffect')
        // HTTP Request
        setTimeout(() => {
            // alert('Saved Data to Cloud')
        }, 1000)
        return () => {
            // This function is run just before the component is removed from the DOM if the array is empty
            // If you don't pass in the second argument it will run just after whenever there is an update
            // If you have props.persons in there, it will run after the update to that component
            console.log('Cockpit.js: cleanUp work in useEffect')
        }
    }, []); // Only runs when props.persons changes
    // If array is empty, it will only run the first time the component is rendered

    // red and bold are the class names defined in our App.css
    // As you push each of these styles to the classes,
    // The HTML element p with the className classes gets those styles added to it
    // Changing style conditionally
    const classes = []
    let btnClass = ''; // Using CSS modules
    if (props.showPersons) {
        btnClass = styles.Red; 
    }
    if (props.personsLength <= 2) {
      classes.push(styles.red);
    }
    if (props.personsLength <= 1) {
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

export default React.memo(Cockpit);
