import React, { Component } from 'react';
import Modal from '../../components/ui/modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = { error: null };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        // console.log('interceptors request');
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => {
          // console.log('interceptors response');
          return res;
        },
        (err) => this.setState({ error: err })
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} onClick={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };

export default withErrorHandler;
