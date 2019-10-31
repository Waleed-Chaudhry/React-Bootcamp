# Burger Builder

### Plan
* Start off with the state (we'll have ingredients, purchased (bool) and totalPrice)
* Since the state only pertains to the Burger, and not the whole app, we'll have the Burger Builder as the Stateful Component
* Run ```create-react-app burger-builder``` (don't need to enable CSS Modules)
  * Make sure you put the css inside file called name.module.css
  * e.g ```import styles from './Layout.module.css'```
  * Make sure you can click ./Layout.module.css to get to a file
  * It won't be the Layout.module.css in your project, but a node module
* Add Google font and name of app to public/index.html
  * Change index.css to include: ```font-family: 'Open Sans', sans-serif;```
  * Open Sans is the main font, sans-serif is the backup
* ```npm run start```
* Create components and containers folders
* Create Layout inside component
  * Wrap inside an Aux HOC

### App.js
* Burger builder wrapped inside the Layout

### Burger Builder
#### Burger and Ingredients
* Stateful component
```
state = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4, // Base Price of the burger
  purchasable: false, // Determines whether we can purchase the burger
  purchasing: false // If the order now button was clicked
}
```
* Passes this.state.ingredients to Burger.js

#### Controlling the type and number of Ingredients added
* Has an addIngredient handler which increments the count of a given ingredient and total Price on the state
  * Look at the code for an example of how to calculate new state from old state immutably
  * Passes this handler to the BuildControls component
  * Updates the purchasable var on the state
* removeIngredient which has the same logic as addIngredient handler 
* Passes a disabledInfo object which looks like: {salad: true, meat: false, ...} to BuildControls
* Passes this.state.totalPrice to BuildControls
  * Total price is already calculated by add and removeIngredient handlers
* Has the updatePurchaseState function
  * Called by add and removeIngredient Handlers to update state.purchaseable
  * Determine by if the burger has at least one ingredient
  * Passes this.state.purchaseable to BuildControls

#### Order Information
* Passes this.state.ingredients to OrderSummary within the Modal component
* Has a purchaseHandler which sets purchasing on the state to true
  * Passes it to BuildControls.js so that it can be activated upon clicking OrderNow
* Passes this.state.purchasing to the Modal
* Has purchaseCancelHandler which sets purchasing on the state to false
  * Passes it the Model which then passes it to the backdrop so that it can be activated when we click the backdrop
  * Also passes it OrderSummary within the Modal component which passes it to the Cancel button on the modal
* Has the purchaseContinueHandler which just alerts the user to continue
  * Passes it to OrderSummary within the Modal component which passes it to the Continue button on the modal
* Also passes this.state.totalPrice to the OrderSummary

### Burger
* Wrapper around burger Ingredients
  * We ```import BurgerIngredient from './BurgerIngredient/BurgerIngredient'```
  * Determine which and how many ingredients are needed based on the state
  * And then add them inside the render method ```<BurgerIngredient type='bread-top' />```
* Burger.module.css has media queries for different device types and sizes
  * className is still Burger, the media query doesn't matter

#### Burger Ingredient
* BurgerIngredient.module.css contains the css required to build the individual burger parts (copy pasted from the source code)
* BurgerIngredients.js is a switch statement which cases on the var type
* And sets the value of ingredient to have a div styled with the appropriate css class in Burder
* ```npm install --save prop-types``` to add property validation to make sure var type is a string and required
* Remember to run npm run start again, after adding the prop-types package

#### Order Summary
* Receives props.ingredients from the BurgerBuilder
* Uses the ingredients to create an html element containing number of each ingredient
* Uses the dynamically created ingredientSummary along with static content
* Also adds props.price is receives from the BurgerBuilder to the order summary
* Has Cancel Button
  * Does the same thing as clicking the backdrop does i.e. cancel the order
* Has Continue and Cancel button which are described inside Order Information in BurgerBuilder


### Build Controls
* Panel which contains a build control buttons 
  * An array of BuildControl components
* Has controls array with label: Salad, type: salad etc, and passes these two props to each build control
* Also passes the following handlers to the BuildControl component that it receives from the BurgerBuilder
  * addIngredient (also adds the type of the added ingredient)
  * removeIngredient (same logic as addIngredient)
* Passes the disabledInfo object to the BuildControl component that it receives from the BurgerBuilder
* Displays the Current Price of the burger
* Has the OrderNow button
  * Uses props.purchasable from BurgerBuilder to disable to the Order Now button
  * We add extra CSS styling for a disabled button
  * OnClick recieves the purchaseHandler from BurgerBuilder
  * When OrderNow is clicked, this.state.purchasing is set to true, which is passed to the Modal which is then displayed


#### Build Control
* Each button has a label e.g. Salad, and two buttons (More and Less)
* More and Less button execute the add and removeIngredient handler respectively upon clicked
  * Passed down from BurgerBuilder to ButtonControls to ButtonControl
* Also has example of how to add props validation for non-class based component, and different types of validations
* Only the Less button uses the disabled object
  * We add extra CSS styling for a disabled button

### UI

#### Model
* Passes JSX within the Modal Component in BurgerBuilder.js to OrderSummary using props.children
  * Use children: PropTypes.element as propTypes validation in this case
* Receives props.purchasing from the BurgerBuilder and shows the model only when purchasing is true
  * We're using CSS styles to show or hide the modal
* We also add the Backdrop next to the modal
  * Passes the purchasing state and the cancelHandler that it receives from BurgerBuilder to the Backdrop

#### Backdrop
  * If the model is shown i.e. props.purchasing is true, the Backdrop should be shown
  * The backdrop also receives this.purchaseCancelHandler from the Modal which is called when the Backdrop is clicked
  
#### Button
  * Just a Wrapper around the standard HTML Button
  * Look at the code for how to have different CSS styles and different content on the button
  * We pass in different values for props.clicked to the Button within OrderSummary to call different handlers upon clicking
