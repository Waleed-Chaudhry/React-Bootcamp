# React Introduction

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

#### App.js
```JavaScript
import React, { Component } from 'react';
// Behind the scenes, react calls React.createElement on the JSX to convert the JSX to HTML
// Hence this import 
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = { // Managed from within the class only, it's only available for class (non-functional components)
    // Used to let us change our HTML dynamically inside the parent class 
    persons: [
      { name: "Max", age: "28" },
      { name: "Manu", age: "29" },
      { name: "Waleed", age: "24" }
    ],
    otherState: 'some other value'
  }

  // Function to change the state of the components
  // This function will run when we click the button
  switchNameHandler = (newAge) => {
    this.setState( {
      persons: [ // Will only change the persons object, not the otherState var
        { name: "Max", age: "28" },
        { name: "Manu", age: "29" },
        { name: "Waleed", age: newAge } // So we can record the new dynamic property
      ]
    })
    // Don't change change state directly by reassigning the variable directly
    // Using: this.state.persons[0].name = "Max 2";
  }

  // Using events to change the value of a component
  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: "Max", age: "28" },
        // The name will change with every keystore
        { name: event.target.value, age: "29" },
        { name: "Waleed", age: "24" }
      ]
    })
  }

  render() {
    // Using in line styles
    // Not use normally, but if you only want to change the button in this class and not all the buttons
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return ( // JSX is HTML-like, not exact HTML
    // Class in HTML is renamed to className
    // Typically everything is wrapped inside one root div as convention
      <div className="App"> 
        <h1>Welcome to React</h1> 
        {/* This renders the component person on to the main html */}
        {/* Can pass in dyanmic properties (props) to the child component */}
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>
        {/* Can add the component multiple times */}
        {/* Can pass additional HTML to the child */}
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          // Pass a change in state function to the child
          // Doesn't have to be named click
          // Bind is to store the new variable to the statee
          // Remember we're not using () after the swithNameHandler
          click={this.switchNameHandler.bind(this, '35')}
          // Adding the name changed handler
          changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}/>

        {/* Call the function to change the component state */}
        {/* Another way of storing the change of state */}
        {/* Bind is more performance efficient */}
        {/* style adds the inline style */}
        <button
          style={style}
          onClick={() => this.switchNameHandler('30')}>Switch Age</button>
      </div>
    );
  }
}
export default App;
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
    {/* Add an input text box, and noChange, change it's value */}
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
