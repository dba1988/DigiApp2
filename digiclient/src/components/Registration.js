import React, { Component } from "react";
import axios from "axios";
import { SerUrl } from "../config/ServerUrl";
import "./styles/register.css";
import { Redirect } from "react-router-dom";
export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      msg: "",
    };
    this.baseState = this.state;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { name, email, password, password_confirmation } = this.state;
    // POST request using fetch with error handling
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        repassword: password_confirmation,
      }),
    };
    fetch(SerUrl + "/api/register", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          const error = (data && data.isAdded) || response.status;
          return Promise.reject(error);
        }
        this.setState({ msg: data[0].msg });

        if (data[0].isAdded) {
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    event.preventDefault();
  }
  resetForm = () => {
    this.setState(this.baseState);
  };
  componentDidMount(error, info) {
    console.log(this.props);
  }

  render() {
    return (
      <div className="col-6 form-signin">
        {this.state.msg.length > 0 && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <p>{this.state.msg}</p>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              placeholder="Password confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-lg btn-danger btn-block">
            Register
          </button>
        </form>
      </div>
    );
  }
}
