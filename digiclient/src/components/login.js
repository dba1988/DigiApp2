import React, { Component } from "react";
import { SerUrl } from "../config/ServerUrl";
import "./styles/register.css";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
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
    const { name, email, password } = this.state;
    // POST request using fetch with error handling
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };
    fetch(SerUrl + "/api/login", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          const error = data && data.isLogin;
          return Promise.reject(error);
        }
        if (data && data.token) {
          this.setState({ msg: data.token });
          this.props.history.push({
            pathname: "/Dashboard",
            state: {
              token: data.token,
              username: data.user.name,

              useremail: data.user.email,
            },
          });
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
    console.log(SerUrl);
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

          <button type="submit" className="btn btn-lg btn-danger btn-block">
            Login
          </button>
        </form>
      </div>
    );
  }
}
