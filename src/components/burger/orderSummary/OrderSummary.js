import React, { Component } from 'react';
import Button from '../../ui/button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {this.props.ingredients[igKey]}
        </li>
      )
    );
    return (
      <React.Fragment>
        <p>Your Order</p>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total price: <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button type="Danger" onClick={this.props.onOrderCanceled}>
          CANCEL
        </Button>
        <Button type="Success" onClick={this.props.onOrderContinued}>
          CHECKOUT
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
