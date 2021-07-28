import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface IAuthRouteProps extends RouteProps {}

const AuthRoute: React.FC<IAuthRouteProps> = ({ ...rest }) => {
  const bearer = localStorage.getItem("bearer");
  if (bearer === null) return <Redirect to="/" />;
  return <Route {...rest} />;
};

export default AuthRoute;
