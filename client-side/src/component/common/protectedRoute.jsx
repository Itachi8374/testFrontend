import React from "react";
import { Route, Redirect } from "react-router-dom";
import user from "../../services/userService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user.getCurrentUser()) return <Redirect to="/login"></Redirect>;
        return Component ? <Component {...props}></Component> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
