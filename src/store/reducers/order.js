import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  ordered: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_INIT:
      return { ...state, ordered: false };
    case actionTypes.ORDER_BURGER_START:
      return { ...state, loading: true };
    case actionTypes.ORDER_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        loading: false,
        ordered: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.ORDER_BURGER_FAILED:
      return { ...state, loading: false };
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.orders, loading: false };
    case actionTypes.FETCH_ORDERS_FAILED:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
