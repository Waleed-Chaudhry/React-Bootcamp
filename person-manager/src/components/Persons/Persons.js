import React, { Component } from 'react';
import Person from './Person/Person'

class Persons extends Component {
    // CU (Component Update) Step 1
    // static getDerivedStateFromProps(props, state) {
    //     console.log('Persons.js: Get Derived State')
    //     return state
    // }
    // Commented out to not have an error in the log

    // CU (Component Update) Step 2
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Persons.js: Should Component Update')
        return true //Must return true or false, can set to false to prevent an update
    }

    // CU: Step 4
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Persons.js: Snapshot Before Update')
        return {message: 'Snapshot'} //Pass this to componentDidUpdate
    }

    // CU: Step 5
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Persons.js: Component did Update')
        console.log(snapshot)
    }

    // CU: Step 3
    render() {
        console.log('Persons.js: rendering')
        return this.props.persons.map((person, index) => {
        // Mapping the javascript persons array to JSX person element
        // Can pass in dyanmic properties to the child component like person.name
            return (<Person 
                // Doesn't have to be called click
                // Called click because child component expects the property as props.click
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age} 
                // We assign everything a key so that React knows which element to update
                // Otherwise it ends up reloading the entire dom
                key={person.id}
                // Pass a change in state function to the child component
                // Called changed because child component expects the property as props.changed
                changed={(event) => this.props.changed(event, person.id)} />
            )
        })
    }
};

export default Persons;