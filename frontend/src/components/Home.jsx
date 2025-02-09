import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const Home = () => {
  const refresh = useRefreshToken();
  const content = (
    <div className="intro-screen">
      <div className="half-banner">
        <img src="https://placehold.co/600x400" alt="" />
      </div>
      <div className="welcome-modal">
        <section>
          <h1>Welcome to SmartNews</h1>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

          <button onClick={refresh}>Refresh</button>
        </section>
      </div>
    </div>
  );

  return content;
};

export default Home;
