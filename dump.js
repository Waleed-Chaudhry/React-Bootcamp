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
