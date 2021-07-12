import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Login if already have account. Else register
          </li>
          <li className="list-group-item">
            Sign up is necessary to use Sabha's service
          </li>
          <li className="list-group-item">
            To host a meeting, go to <b>Host Meet</b> tab.
          </li>
          <li className="list-group-item">
            Meetings hosted by you will be available in <b>Profile</b> tab.
            Share meeting details so that other people can join the meet.
          </li>
          <li className="list-group-item">
            Go to <b>Join Meet</b> tab to join a meet. Enter correct credentials
            to join meet
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
