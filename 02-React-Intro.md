# Introduction

### Setup
```
npm install create-react-app -g //So that it's available from any dir on your computer
create-react-app react-bootcamp --scripts-version 1.1.5
npm run start //Starts the app on localhost:3000
// the webpage auto reloads, whenever you make a change to your code
```

### JSX
* Each component gets created inside a new folder starting with an uppercase character
* A functional component is stateless or dumb. It only has functions. We use this as often as possible
  * Person.js is a functional stateless component
  * Can use React Hooks to modify the state of a functional object (Unit 3, section 43) 
* Class based components have state which can be modified
* You also add a CSS component to the class
* Anytime you have {} inside JSX that means you can write JS code in there 
* Adding radium: ```npm install --save radium```

#### App.js
```JavaScript
import React, { Component } from 'react';
// Behind the scenes, react calls React.createElement on the JSX to convert the JSX to HTML
// Hence this import 
import './App.css';
import Person from './Person/Person'
import Radium from 'radium'

class App extends Component {
  state = { // Managed from within the class only, it's only available for class (non-functional components)
    // Used to let us change our HTML dynamically inside the parent class 
    persons: [
      { "id": 1, name:  "Max", age: "28" },
      { "id": 2, name: "Manu", age: "29" },
      { "id": 3, name: "Waleed", age: "24" }
    ],
    otherState: 'some other value',
    showPersons: false //To control the conditional display of persons
  }

  // Delete a given person by clicking on it
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]; //Make a copy of the state first to not mutate state directly
    persons.splice(personIndex, 1) //Removes the person from the array
    this.setState({persons: persons})
  }

  // Using event (changing text inside textbox) to change the state 
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => { 
      return p.id === id;  
    }) 
    const person = {...this.state.persons[personIndex]}; //Find the person to change
    person.name = event.target.value // Create a copy of the person to not mutate te state directly
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons}) // Will only change the persons object, not the otherState var
  }

  // Displaying the persons conditionally
  togglerPersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {
    // Using in line styles
    // Not use normally, but if you only want to change the button in this class and not all the buttons
    const style = {
      backgroundColor: 'green', // default color
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    // Showing content conditionally
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        // Placing persons inside the div for conditional display
        // This renders the component person on to the main html 
        // Can pass in dyanmic properties to the child component like person.name
        <div>
          {/* Mapping the javascript persons array to JSX person element */}
          {this.state.persons.map((person, index) => {
            return <Person 
              // Doesn't have to be called click
              // Called click because child component expects the property as props.click
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              // We assign everything a key so that React knows which element to update
              // Otherwise it ends up reloading the entire dom
              key={person.id}
              // Pass a change in state function to the child component
              // Called changed because child component expects the property as props.changed
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div> 
      );
      style.backgroundColor= 'red' //Changing style conditionally
    }

    // red and bold are the class names defined in our App.css
    // As you push each of these styles to the classes,
    // The HTML element p with the className classes gets those styles added to it
    let classes = []
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return ( // JSX is HTML-like, not exact HTML
      // Class in HTML is renamed to className
      // Typically everything is wrapped inside one root div as convention
      <div className="App"> 
        <h1>Welcome to React</h1> 
        {/* We need the .join to make the p have multiple styles, not just the most recent element pushed */}
        <p className={classes.join(' ')}>This is really working!</p>
        {/* Call the function to change the component state */}
        {/* Another way of storing the change of state */}
        {/* Bind is more performance efficient */}
        {/* style adds the inline style */}
        <button
          style={style}
          onClick={() => this.togglerPersonsHandler()}>Toggle Persons
        </button>
        {persons} {/* Refers to the let persons = null variable we declared */}
      </div>
    );
  }
}
export default Radimum(App); //Radium wraps around your app
```

#### Person.js
```JavaScript
import React from 'react';
import './Person.css';
// Import the css in the component not the main class

const person = (props) => {
  return (
    // Giving the div a class name for easy css styling
    <div className="Person">
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
```

#### Person.css
```css
.Person {
    width: 60%;
    margin: 16px auto; /* To center the object */
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
}
```

#### App.css
```css
.App {
  text-align: center;
}

.red {
  color: red;
}

.bold {
  font-weight: bold;
}
```
