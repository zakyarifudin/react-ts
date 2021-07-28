import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <Link to="/login"> Login </Link>
    </div>
  );
};

export default Home;
