import React, { Component } from "react";
import http from "../services/httpService";

class LoginForm extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    errors: "",
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const user = { ...this.state.user };
    const payload = {
      email: user.email,
      password: user.password,
    };

    try {
      const { data: jwt } = await http.post("auth/user", payload);
      localStorage.setItem("token", jwt);
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
        <h1>Login</h1>
        <form>
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
          {this.state.errors && (
            <div className="alert alert-danger">{this.state.errors}</div>
          )}
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
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
