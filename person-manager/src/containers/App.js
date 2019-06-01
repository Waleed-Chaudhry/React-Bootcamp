import React, { Component } from 'react'; // Behind the scenes, react calls React.createElement on the JSX to convert the JSX to HTML, hence this import 
import styles from './App.css'; //Can call it anything
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends Component {
  // CC (Component Creation): Step 1
  constructor(props) {
    super(props)
    console.log('App.js: Constructor')
  }

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

  // CC: Step 2 CU: Step 1
  static getDerivedStateFromProps(props, state) {
    console.log('App.js: Get Derived State')
    return state
  }

  // CC: Step 4
  componentDidMount() {
    console.log('App.js: Component Mounted')
    // Can use this to make an HTTP request after the page is rendered
  }

  // CU: Step 2
  shouldComponentUpdate(nextProps, nextState) {
    console.log('App.js: Should Component Update')
    return true
  }

  // CU: Step 4
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Ass.js: Snapshot Before Update')
    return {message: 'Snapshot from App'} //Pass this to componentDidUpdate
  }

  // CU: Step 5
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('App.js: Component did Update')
    console.log(snapshot)
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

  // CC: Step 3 CU: Step 3
  render() {
    console.log('App.js: render')
    // Showing content conditionally
    let persons = null;
    if (this.state.showPersons) {
      // Placing persons inside the div for conditional display
      // This renders the component persons on to the main html 
      persons = <Persons
        // Setting the props that the persons component expects 
        persons={this.state.persons} 
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}/>
    }
    return ( // JSX is HTML-like, not exact HTML
      // Class in HTML is renamed to className
      // Typically everything is wrapped inside one root div as convention
        // <div className={styles.App}>  {/* To use CSS Modules */}
        <WithClass classes={styles.App}> {/* Wrapping the whole thing inside an HOC */}
          <Cockpit 
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglerPersonsHandler}/>
          {persons} {/* Refers to the let persons = null variable we declared */}
        </WithClass>
        // </div>
    );
  }
}

export default App
