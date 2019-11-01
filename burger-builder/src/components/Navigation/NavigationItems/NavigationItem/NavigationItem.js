import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}
            {/* CSS styling for this active class is inside 
            .NavigationItem a.active {
                color: #40A4C8;
            }
            Nav link translates to an anchor (a) tag on the HTML
            */}
        </NavLink>
    </li>
);

export default navigationItem;