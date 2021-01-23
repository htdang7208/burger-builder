import React from 'react';
import Burger from '../../burger/Burger';
import Button from '../../ui/button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" onClick={props.onCheckoutCancelled}>
        CANCEL
      </Button>
      <Button type="Success" onClick={props.onCheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
