import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface ILoginRouteProps extends RouteProps {}

const LoginRoute: React.FC<ILoginRouteProps> = ({ ...rest }) => {
  const bearer = localStorage.getItem("bearer");
  if (bearer !== null) return <Redirect to="/dashboard" />;
  return <Route {...rest} />;
};

export default LoginRoute;
