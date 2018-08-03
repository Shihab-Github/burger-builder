import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import Layout from '../components/Layout/layout';
import BurgerBuilder from './BurgerBuilder/burgerBuilder';
import Logout from '../containers/Auth/Logout/Logout';
import { Route, withRouter } from 'react-router-dom';
import * as exportedActions from '../store/actions/exportedActions';

const asyncCheckout = asyncComponent(() => {
  return import('./Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('../containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onAutoLogin();
  };
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    onAutoLogin: () => {
      dispatch(exportedActions.checkAuthState());
    }
  }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
