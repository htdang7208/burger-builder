import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';
import ContactData from './contactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => this.props.history.goBack();

  checkoutContinuedHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    let summary = <Redirect to="/" />;
    const orderedRedirect = this.props.ordered ? <Redirect to="/" /> : null;
    if (this.props.ings) {
      summary = (
        <div>
          {orderedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
            // render={(props) => (
            //   <ContactData
            //     ingredients={this.props.ings}
            //     totalPrice={this.props.totalPrice}
            //     {...props}
            //   />
            // )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    ordered: state.order.ordered,
  };
};

export default connect(mapStateToProps)(Checkout);
