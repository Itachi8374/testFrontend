import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./navbar.css";
import { Avatar } from "@material-ui/core";

class Navbar extends Component {
  state = {};
  render() {
    const { user, meet } = this.props;
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid left">
          <Link className="navbar-brand" to="/">
            Sabha
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/chats">
                  Chats
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/host-meeting">
                  Host Meet
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/join-meeting">
                  Join Meet
                </NavLink>
              </li>
              {user && meet && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/meeting">
                    Meet
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="div_right">
          {!user && (
            <React.Fragment>
              <div className="nav-item">
                <NavLink className="nav-link " to="/login">
                  Login
                </NavLink>
              </div>
              <div className="nav-item ml-10 p-20">
                <NavLink className="nav-link " to="/register">
                  Sign Up
                </NavLink>
              </div>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment className="align-middle">
              <div className="nav-item ">
                <NavLink className="nav-link" to="/my-meetings">
                  {user.name}
                </NavLink>
              </div>
              <div className="nav-item ">
                <NavLink className="nav-link " to="/logout">
                  <span className="logout_icon">
                    <ExitToAppIcon />
                    Logout
                  </span>
                </NavLink>
              </div>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
