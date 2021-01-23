import React from 'react';
import classes from './DrawerButton.module.css';

const DrawerButton = (props) => {
  return (
    <div onClick={props.onClick} className={classes.DrawerButton}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerButton;
