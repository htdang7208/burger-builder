import React, { Component } from 'react';
import Order from '../../components/order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/ui/spinner/Spinner';

class Orders extends Component {
  componentDidMount = () => this.props.onFetchOrders(this.props.idToken);

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.totalPrice}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    idToken: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (idToken) => dispatch(actions.fetchOrders(idToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
