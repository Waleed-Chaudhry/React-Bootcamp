import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css' // Has to follow name.module.css convention

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    {/* Content is the name of the class inside Layout.module.css that we're assigning to main component */}
    <main className={styles.Content}>
      {props.children}
    </main>
  </Aux>
)

export default layout
