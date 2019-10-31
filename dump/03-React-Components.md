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
#### Class Based Components Creation
* constructor -> getDerivedStateFromProps -> render() -> componentDidMount

#### Classed Based Components Update
* When props or state change, the component goes through the update cycle
* getDerivedStateFromProps -> shouldComponentUpdate -> render() -> getSnapshotBeforeUpdate -> componentDidUpdate
* componentDidUpdate is the most common one we'll use to fetch something after the DOM has updated
* Remember updating Person.js updates the Person.js which calls its update LC which in turn updates App.js which also calls its update LC
* componentWillUnmount() is run right before the component is hidden from the DOM
* You can optimize shouldComponentUpdate to only run when certain properties on the state change
* You can extend PureComponent instead of Component to update the component only when an input state pertaining to that component changes

#### Functional Components Lifecycle
* Can't use any of the class based components LC hooks
* Instead we use useEffect (Cockpit.js in our code)
* Remember functional components have to start with a Capital letter const Cockpit = (props) for useEffect to work
* Can be configured to only run when a given prop changes or only the first time the component is rendered, or do clean up work before the component is removed from the DOM
* Can have multiple useEffects in one component
* Wrap the export of a functional component around React.memo to optimize it to only update when an input state pertaining to that component changes

#### Misc
* The real DOM is only changed when there is a real difference to the DOM. Calling the render() method doesn't necessarily re-render the whole thing
* Always use prevState instead of this.state to change a state property that depends on its previous version (nameChangeHandler in app.js)
* Can add property validation (Person.js) ```npm install --save prop-types```
* 
#### Higher Order Components
* Can create Aux component as a parent to wrap different JSX elements if you don't want to create a div (in Person.js)
  * Can also use React.Fragment to do the same thing
* Aux is a higher order function i.e. a component that wraps another component. Another example is WithClass which is used to wrap the components in App.js
  * HOC components become very useful to wrap around our components to handle HTTP errors
  * They can also be used to wrap CSS styles (in App.js using withClass)
  * Can also wrap components and pass in properties (Person.js)
