# Next Gen JavaScript

### Let and cons
* Use let if you want the variable to change
* Use var if you constant values
* https://jsbin.com/?js,console to run JS

### Arrow functions
```JavaScript
const printMyName = (name) => {
  console.log(name) // Empty paranthesis, for no argument will work
  // if there is only one argument, simply using name is enough
const printMyName = (name) => console.log(name)
  // Can omit the curly braces if its one line
  // Returns the output of the function by default
  // Can add export before the const to 
}
```

### Exporting and importing 
```JavaScript
export default person //To export using the traditional
import prs from ./person.js //Will import the default export, else the function/var named prs
import {person} from ./person.js //Will import the function named person, and assign it to person in the import file
import {person as prs} from ./person.js //to use the function as prs in the import file
import Person from '../components/Person/Person' //to go up one level
```

### Classes
```JavaScript
class Person extends Human {
    name = 'Max'
  }
  call = () => {..}
}

const myPerson = new Person()
myPerson.call()
// Use this.name to refer to the variables within the class
```

### Spread and Rest Operators
* Spread
```JavaScript
const numbers = [1,2,3]
const newNumbers = [... numbers, 4]
console.log(newNumbers) // [1, 2, 3, 4]

const person = {
  name: 'Max'
};

const newPerson = {
  ...person,
  age: 28
}

console.log(newPerson) 
// [object Object] {
//   age: 28,
//   name: "Max"
// }
```
* Rest
```JavaScript
// Creates an array called the name inside the function variables from a number of arguments passed to the function
const filter = (...args) => {
  return args.filter(el => el % 2 === 0)
}

console.log(filter(1,2,3,4)) // [2,4]
```

### Destructuring
```JavaScript
const numbers = [1, 2, 3];
[num1, ,num3] = numbers;
console.log(num1, num3) // 1 followed by 3
```

### Reference and Primitive Types Refresher
```JavaScript
const person = {
  name = 'Max'
}
const secondPerson = {person} //Copies reference to the person
const secondPerson = {...person}} //Deep copy
```

### Array Functions Refresher
```JavaScript
const numbers = [1, 2, 3];
const doubleNumArray = numbers.map((num) => { // Calls a function on every element in the array
  return num * 2
})
console.log(doubleNumArray); //creates a new Array without changing the original
```
