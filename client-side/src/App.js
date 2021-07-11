import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";
import ProtectedRoute from "./component/common/protectedRoute";
import Navbar from "./component/navbar/navbar";
import Meetings from "./component/meetings";
import Messenger from "./chat/Messenger";
import MeetingScreen from "./component/meetScreen/meetingScreen";
import HostMeetingForm from "./component/hostMeetingForm";
import RegisterForm from "./component/registerForm";
import JoinMeetingForm from "./component/joinMeetingForm";
import LoginForm from "./component/loginForm";
import Logout from "./component/logout";
import Home from "./component/home";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [meet, setMeet] = useState(null);

  const socket = useRef();

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const userT = jwtDecode(jwt);
      setUser(userT);
    } catch (ex) {}
    try {
      const meetToken = localStorage.getItem("meet-token");
      const meetT = jwtDecode(meetToken);
      setMeet(meetT);
    } catch (ex) {}
    socket.current = io("http://localhost:8080");
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar user={user} meet={meet} socket={socket} />
      <div className="content">
        <Switch>
          <ProtectedRoute
            path="/meeting"
            render={(props) => {
              return (
                <MeetingScreen
                  user={user}
                  meet={meet}
                  socket={socket}
                  {...props}
                />
              );
            }}
          />
          <ProtectedRoute
            path="/chats"
            render={(props) => {
              return <Messenger socket={socket} />;
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
