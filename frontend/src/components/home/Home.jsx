import React from "react";
import SideContent from "./SideContent";
import { Link } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import SideAuth from "./SideAuth";
const Home = () => {
  const refresh = useRefreshToken();
  const content = (
    <div className="intro-screen">
      <div className="half-banner">
        {/* <img
          src="https://placehold.co/600x400"
          alt=""
          width={600}
          height={400}
        /> */}
        <SideContent />
      </div>
      <div className="welcome-modal">
        <section>
          <SideAuth />
        </section>
      </div>
    </div>
  );

  return content;
};

export default Home;
