import SideDrawer from '../../components/navigation/sideDrawer/SideDrawer';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import classes from './Layout.module.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  drawerButtonClicked = () => {
    this.setState((prevState, props) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuth={this.props.isAuth}
          onDrawerButtonClicked={this.drawerButtonClicked}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          onClosed={this.sideDrawerClosed}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
