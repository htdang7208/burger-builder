import React, { Component } from 'react';
import Button from '../../../components/ui/button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/ui/spinner/Spinner';
import Input from '../../../components/ui/input/Input';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid name',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid street',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid zipCode',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid country',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid email',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          option: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  checkValidaty(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[inputId] };
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidaty(
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.touched = true;
    updatedOrderForm[inputId] = updatedElement;

    let formIsValid = true;
    for (const el in updatedOrderForm) {
      formIsValid = updatedOrderForm[el].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (const el in this.state.orderForm) {
      formData[el] = this.state.orderForm[el].value;
    }
    const orderData = {
      ingredients: this.props.ings,
      totalPrice: this.props.totalPrice,
      orderData: formData,
    };

    this.props.onOrderBurger(orderData, this.props.idToken);
  };

  render() {
    let formElementsArray = [];

    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((inputEl) => {
          return (
            <Input
              key={inputEl.id}
              elementType={inputEl.config.elementType}
              elementConfig={inputEl.config.elementConfig}
              value={inputEl.config.value}
              invalid={!inputEl.config.valid}
              shouldValidate={inputEl.config.validation}
              touched={inputEl.config.touched}
              errorMessage={inputEl.config.errorMessage}
              changed={(event) => this.inputChangedHandler(event, inputEl.id)}
            />
          );
        })}
        <Button type="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    idToken: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, idToken) =>
      dispatch(actions.order(orderData, idToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
