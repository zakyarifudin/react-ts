import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Post from "../pages/post/Post";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthRoute from "./AuthRoute";
import LoginRoute from "./LoginRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <LoginRoute exact path="/" component={Home} />
        <LoginRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/dashboard" component={Dashboard} />
        <AuthRoute exact path="/post" component={Post} />
      </Switch>
    </Router>
  );
};

export default Routes;
