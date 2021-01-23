import React from 'react';
import NavigationItem from './navigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem to="/" exact>
      Burger Builder
    </NavigationItem>
    {!props.isAuth ? null : (
      <NavigationItem to="/orders">Orders</NavigationItem>
    )}
    {!props.isAuth ? (
      <NavigationItem to="/auth">Authentication</NavigationItem>
    ) : (
      <NavigationItem to="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
