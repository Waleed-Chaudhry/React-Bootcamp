# Introduction

### Setup
```c
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

### Lists and Displaying Content Conditionally
#### Conditionals:
  * Add a boolean var to the state
  * Use an event handler to update the state of that boolean var (togglerPersonsHandler in our code)
  * Add the components to the HTML in the render() method based on the state of the boolean var
  * Can also change the style conditionally using that boolean ```style.backgroundColor= 'red'```

#### Lists:
  * Declare the list as a regular JS array inside the state object
  * Map that list to JSX elements in the render() method to add the list to the HTML

### Styling
#### CSS
  * Create CSS style classes in App.css (red and bold in our code)
  * Push each of those classes to an array based on the state
  * Add the array to the element you're trying to style in the render method ```<p className={classes.join(' ')}>This is really working!</p>```
  * Can also add it like: ```<div className="Person" style={style}>``` in Person.js

#### Radium
  * Adding radium: ```npm install --save radium```
  * Wrap your App around Radium
  * Radium lets you use hover and other psuedoselectors and media queries
  * For media queries, you also have to import StyleRoot and wrap your return in App.js around that html element 
   * The style is being applied inside Person.js and Person.js has to be wrapped around Radium as well

#### Enabling CSS Modules
  * Can do everything you do using Radium, using scopped CSS styles as well (The Radium bits have been commented out)
  * ```npm run eject``` Go to config/webpack.config.js and edit the cssRegex entry to:
    ```JavaScript
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
      }),
    }
    ```
  * npm run start to update the config after making the change (commented out the Radium way of doing it) 
  * Using CSS modules without ejecting: https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet
  * Modify the import to ```import styles from './App.css```
  * Set the className of App.js in the return to: styles.App 
    * Do these two steps for Person.js as well 
  * To access the class red, use styles.red, not 'red'
  * Define the new styles in App.css, and add them to the HTML using: className={btnClass}
  * Conditionally change the value of btnClass using ```btnClass = styles.Red``` or ```btnClass = ''``` to remove the styling
