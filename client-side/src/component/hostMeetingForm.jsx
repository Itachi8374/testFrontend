import React, { Component } from "react";
import http from "../services/httpService";
import userService from "../services/userService";

class HostMeetingForm extends Component {
  state = {
    meeting: {
      id: "",
      name: "",
      password: "",
    },
    errors: "",
  };

  handleChange = (e) => {
    const meeting = { ...this.state.meeting };
    meeting[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ meeting });
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const meeting = { ...this.state.meeting };
    const payload = {
      id: meeting.id,
      email: userService.getCurrentUser().email,
      name: meeting.name,
      password: meeting.password,
    };
    try {
      await http.post("meeting", payload);
      window.location = "/my-meetings";
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };

  getId = async (e) => {
    e.preventDefault();
    const { data } = await http.get("meeting-link");
    const meeting = { ...this.state.meeting };
    meeting.id = data;
    this.setState({ meeting });
  };

  render() {
    return (
      <div className="container">
        <h1>Host meeting</h1>
        {this.state.errors && (
          <div className="alert alert-danger">{this.state.errors}</div>
        )}
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
              readOnly={true}
            />
            <button className="btn btn-primary m-2" onClick={this.getId}>
              Generate Id
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={this.state.meeting.name}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
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
          <button className="btn btn-primary" onClick={this.handleAdd}>
            Create Meeting
          </button>
        </form>
      </div>
    );
  }
}

export default HostMeetingForm;
