import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import http from "../services/httpService";
import config from "../config.json";

class RegisterForm extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
    },
    errors: "",
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const user = { ...this.state.user };
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    try {
      const res = await http.post(config.apiEndpoint + "user", payload);
      localStorage.setItem("token", res.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };

  handleChange = (e) => {
    const user = { ...this.state.user };
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user });
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        {this.state.errors && (
          <div className="alert alert-danger">{this.state.errors}</div>
        )}
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={this.state.user.name}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.user.password}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleAdd}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
