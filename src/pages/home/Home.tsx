import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <Link to="/login">
        <Button title="LOGIN" type="login" />
      </Link>
    </div>
  );
};

export default Home;
