import React, { Component } from "react";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      IsUserLogin: "NOT_LOGIN",
      userInfo: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(userdata) {
    this.setState({
      IsUserLogin: "USER_LOGIN",
      userInfo: userdata,
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(props) => (
              <Home
                {...props}
                IsUserLogin={this.state.IsUserLogin}
                handleLogin={this.handleLogin}
              />
            )}
          />{" "}
          <Route
            path="/register"
            render={(props) => (
              <Registration {...props} IsUserLogin={this.state.IsUserLogin} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} IsUserLogin={this.state.IsUserLogin} />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard {...props} IsUserLogin={this.state.IsUserLogin} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
