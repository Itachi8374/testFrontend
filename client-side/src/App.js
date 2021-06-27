import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./component/common/protectedRoute";
import Navbar from "./component/navbar";
import Meetings from "./component/meetings";
import MeetingScreen from "./component/meetingScreen";
import HostMeetingForm from "./component/hostMeetingForm";
import RegisterForm from "./component/registerForm";
import JoinMeetingForm from "./component/joinMeetingForm";
import LoginForm from "./component/loginForm";
import Logout from "./component/logout";
import Home from "./component/home";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}

    try {
      const meetToken = localStorage.getItem("meet-token");
      const meet = jwtDecode(meetToken);
      this.setState({ meet });
    } catch (ex) {}
  }
  render() {
    const { user, meet } = this.state;
    return (
      <div>
        <ToastContainer />
        <Navbar user={user} meet={meet} />
        <div className="content">
          <Switch>
            <ProtectedRoute
              path="/meeting"
              render={(props) => {
                return <MeetingScreen user={user} meet={meet} {...props} />;
              }}
            />
            <ProtectedRoute path="/my-meetings" component={Meetings} />
            <ProtectedRoute path="/host-meeting" component={HostMeetingForm} />
            <ProtectedRoute path="/join-meeting" component={JoinMeetingForm} />
            <Route
              path="/login"
              render={(props) => {
                if (user) return <Redirect to="/"></Redirect>;
                return <LoginForm></LoginForm>;
              }}
            ></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/register"
              render={(props) => {
                if (user) return <Redirect to="/"></Redirect>;
                return <RegisterForm></RegisterForm>;
              }}
            ></Route>
            <Route path="/not-found"></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
