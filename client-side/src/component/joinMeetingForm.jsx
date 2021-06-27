import React, { Component } from "react";
import http from "../services/httpService";

class JoinMeetingForm extends Component {
  state = {
    meeting: {
      id: "",
      password: "",
    },
    errors: "",
  };

  handleChange = (e) => {
    const meeting = { ...this.state.meeting };
    meeting[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ meeting });
  };

  handleJoin = async (e) => {
    e.preventDefault();
    const meeting = { ...this.state.meeting };
    const payload = {
      id: meeting.id.trim(),
      password: meeting.password.trim(),
    };
    try {
      const meet = await http.post("auth/meeting", payload);
      localStorage.setItem("meet-token", meet.data);
      window.location = "/meeting";
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Join meeting</h1>
        <form action="">
          <div className="form-group">
            <label htmlFor="id">Meeting Id</label>
            <input
              id="id"
              type="text"
              name="id"
              value={this.state.meeting.id}
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
              type="text"
              name="password"
              value={this.state.meeting.password}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleJoin}>
            Join
          </button>
        </form>
      </div>
    );
  }
}

export default JoinMeetingForm;
