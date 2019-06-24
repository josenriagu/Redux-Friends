import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import AppView from './views/AppView';

export default class App extends Component {

  render() {
    if (!localStorage.getItem('token')) {
      return (
        <div className="app-wrapper">
          <Redirect to="/login" />

          <Route
            path="/login"
            component={Login}
          />
        </div>
      );
    }
    return <AppView />
  }
}