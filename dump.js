// Radium Code:
import Radium, { StyleRoot} from 'radium' // For using media queries

// Using in line styles
// Not use normally, but if you only want to change the button in this class and not all the buttons
const style = {
  backgroundColor: 'green', // default color
  color: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  // Setting hover after adding Radium to the app
  ':hover': {
    backgroundColor: 'lightgreen',
    color: 'black'
  }
}

style.backgroundColor= 'red' //Changing style conditionally
Changing the value of :hover using a string, not a dot
style[':hover'] = {
  backgroundColor: 'salmon',
  color: 'black'  
}

<StyleRoot>
   style={style}
</StyleRoot>


export default Radium(App); // Radium wraps around your app

import Radium from 'radium'

const style = {
  '@media (min-width: 500px)' : {
    width: '450px'
  }
}
<div className="Person" style={style}>
  
export default Radium(person);

// Functional Persons, before the LifeCycle Update lecture
import React from 'react';
import Person from './Person/Person'

const persons = (props) => { 
    console.log('Persons.js: rendering')
    return props.persons.map((person, index) => {
    // Mapping the javascript persons array to JSX person element
    // Can pass in dyanmic properties to the child component like person.name
        return (<Person 
            // Doesn't have to be called click
            // Called click because child component expects the property as props.click
            click={() => props.clicked(index)}
            name={person.name}
            age={person.age} 
            // We assign everything a key so that React knows which element to update
            // Otherwise it ends up reloading the entire dom
            key={person.id}
            // Pass a change in state function to the child component
            // Called changed because child component expects the property as props.changed
            changed={(event) => props.changed(event, person.id)} />
        )
    })
};

export default persons;

