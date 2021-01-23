import React, { Component } from 'react';
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import Spinner from '../../components/ui/spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid email',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        errorMessage: 'Password must has at least 6 characters',
      },
    },
    formIsValid: false,
    formType: 'login',
  };

  checkValidaty(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;

      if (!isValid) return false;
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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidaty(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;
    for (const el in updatedControls) {
      formIsValid = updatedControls[el].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  switchFormTypeHandler = () =>
    this.setState((prevState, props) => {
      return prevState.formType === 'login'
        ? { formType: 'register' }
        : { formType: 'login' };
    });

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.formType
    );
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let formElementsArray = [];

    for (const controlName in this.state.controls) {
      formElementsArray.push({
        id: controlName,
        config: this.state.controls[controlName],
      });
    }
    let form = (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map((el) => {
            return (
              <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                errorMessage={el.config.errorMessage}
                changed={(event) => this.inputChangedHandler(event, el.id)}
              />
            );
          })}
          <Button type="Success" disabled={!this.state.formIsValid}>
            {this.state.formType === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>
        <Button type="Success" onClick={this.switchFormTypeHandler}>
          Switch
        </Button>
      </div>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return this.props.isAuth ? <Redirect to="/" /> : form;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, type) =>
      dispatch(actions.auth(email, password, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
