import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderInit = () => {
  return { type: actionTypes.ORDER_INIT };
};

export const orderSuccess = (id, data) => {
  return {
    type: actionTypes.ORDER_BURGER_SUCCESS,
    orderId: id,
    orderData: data,
  };
};

export const orderFailed = (error) => {
  return {
    type: actionTypes.ORDER_BURGER_FAILED,
    error: error,
  };
};

export const orderBurgerStart = () => {
  return {
    type: actionTypes.ORDER_BURGER_START,
  };
};

export const order = (orderData, idToken) => {
  return (dispatch) => {
    dispatch(orderBurgerStart());
    axios
      .post('orders.json?auth=' + idToken, orderData)
      .then((res) => {
        dispatch(orderSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(orderFailed(err));
      });
  };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrdersSuccess = (orders) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders };
};

export const fetchOrdersFailed = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAILED, error: error };
};

export const fetchOrders = (idToken) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get('orders.json?auth=' + idToken)
      .then((res) => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
