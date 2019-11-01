import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* exact to only match /, not anything starting with / */}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;