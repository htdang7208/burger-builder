import './App.css';
import Layout from './containers/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/checkout/Checkout';
// import Orders from './containers/orders/Orders';
// import Auth from './hoc/auth/Auth';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Logout from './hoc/auth/logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./hoc/auth/Auth');
});

class App extends Component {
  componentDidMount = () => this.props.onCheckAuth();
  render() {
    let routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );

    if (!this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth: () => dispatch(actions.checkAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
