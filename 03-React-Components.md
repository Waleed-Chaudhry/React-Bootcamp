# React Components

### Better Project Structure
* Container (or Stateful) components i.e. components that also manage state should have a lean render method
* Create folders for components and containers
  * Create a new Stateless/presentational component persons to hold the list of persons
  * Create a Cockpit folder for the button and other smaller components on the main app
* Class based components extend Component (App.js) and Functional have the const person = (props) => {} format (Person.js)
* Functional components can use state using useState() but don't have access to Lifecycle Hooks, while class based components have access to both
* Never pass down to state to a functional object. Pass in the value of the state from the container and access it using the props in the component
```javascript
persons={this.state.persons} // in App.js
name={person.name} //in Persons.js
```
* When applying CSS styles to an element, make sure you explicity name the div you're trying to apply the style to
  ```<div className={styles.Cockpit}>``` and you style the element using ```.Cockpit button``` in your CSS file
  
### Component Lifecycle
#### Creation
* constructor -> getDerivedStateFromProps -> render() -> componentDidMount

#### Update
* When props or state change, the component goes through the update cycle
* getDerivedStateFromProps -> shouldComponentUpdate -> render() -> getSnapshotBeforeUpdate -> componentDidUpdate
* componentDidUpdate is the most common one we'll use to fetch something after the DOM has updated
* Remember updating Person.js updates the Person.js which calls its update LC which in turn updates App.js which also calls its update LC

#### Functional Components Lifecycle
