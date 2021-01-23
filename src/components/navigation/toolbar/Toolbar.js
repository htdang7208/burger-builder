import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import DrawerButton from '../sideDrawer/drawerButton/DrawerButton';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerButton onClick={props.onDrawerButtonClicked} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default Toolbar;
