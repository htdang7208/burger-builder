import React, { Component } from 'react';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Burger from '../../components/burger/Burger';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import Modal from '../../components/ui/modal/Modal';
import Spinner from '../../components/ui/spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/ui/button/Button';
import { NavLink } from 'react-router-dom';

class BurgerBuilder extends Component {
  state = {
    ordering: false,
  };

  componentDidMount = () => this.props.onInitIngredients();

  updatePurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((accomulator, currentValue) => accomulator + currentValue, 0);
    return sum > 0;
  };
  order = () => {
    this.setState({ ordering: true });
  };

  orderCanceled = () => {
    this.setState({ ordering: false });
  };

  orderContinued = () => {
    this.props.onOrderInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledIngredientButtons = { ...this.props.ings };

    for (const key in disabledIngredientButtons) {
      disabledIngredientButtons[key] = disabledIngredientButtons[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            onIngredientAdded={this.props.onIngredientAdded}
            onIngredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledIngredientButtons}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchasableState(this.props.ings)}
            ordered={this.order}
          />
        </React.Fragment>
      );
      orderSummary = this.props.isAuth ? (
        <OrderSummary
          ingredients={this.props.ings}
          onOrderCanceled={this.orderCanceled}
          onOrderContinued={this.orderContinued}
          totalPrice={this.props.totalPrice}
        />
      ) : (
        <div>
          <p>Please register before ORDER</p>
          <Button type="Success">
            <NavLink to="/auth">Register Now!</NavLink>
          </Button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Modal show={this.state.ordering} onClosedModal={this.orderCanceled}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredient()),
    onOrderInit: () => dispatch(actions.orderInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
