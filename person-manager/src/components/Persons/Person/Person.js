import React from 'react';
import styles from './Person.css'; // Import the css in the component not the main class

const person = (props) => {
  console.log('Person.js: rendering...')
  return (
    // Giving the div a class name for easy css styling
    <div className={styles.Person}> {/* To use CSS Modules */}
    {/* Can pass in methods and props */}
    {/* Can replace props.age with Math.floor(Math.random()*30) to run JS code */}
      <p onClick={props.click}>I'm {props.name} and I am {props.age} years old</p>
      {/* Reserved word for html content passed in*/}
      <p>{props.children}</p>
      {/* Add an input text box, and onChange, change it's value */}
      {/* Two way binding, value is set to props.name */}
      <input type="text" onChange={props.changed} value={props.name}></input>
    </div>
  )
}

export default person;