import React, {Component} from 'react'
import styles from './Layout.module.css' // Has to follow name.module.css convention
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render () {
    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        {/* Content is the name of the class inside Layout.module.css that we're assigning to main component */}
        <SideDrawer 
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

export default Layout
