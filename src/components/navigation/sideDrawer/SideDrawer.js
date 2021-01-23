import React from 'react';
import Logo from '../../logo/Logo';
import Backdrop from '../../ui/backdrop/Backdrop';
import NavigationItems from '../navigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');

  if (props.open)
    attachedClasses = [classes.SideDrawer, classes.Open].join(' ');

  return (
    <React.Fragment>
      <Backdrop show={props.open} onClick={props.onClosed} />
      <div className={attachedClasses}>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
