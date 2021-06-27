import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config.json";

class Meetings extends Component {
  state = {};

  async componentDidMount() {
    try {
      const { data } = await http.get(config.apiEndpoint + "meeting");
      this.setState({ meetings: data });
    } catch (err) {
      console.log(err.response.data);
    }
  }

  handleDelete = async (meet) => {
    try {
      await http.delete(config.apiEndpoint + "meeting/" + meet.id);
      window.location = "/my-meetings";
    } catch (err) {
      console.log(err.response.data);
    }
  };

  render() {
    const { meetings } = this.state;
    return (
      <div className="container">
        {meetings && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Password</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {meetings.map((meet, index) => (
                <tr key={meet.id}>
                  <th>{index + 1}</th>
                  <td>{meet.id}</td>
                  <td>{meet.name}</td>
                  <td>{meet.password} </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(meet)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Meetings;
