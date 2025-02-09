import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "../api/axios";
import useLogout from "../hooks/useLogout";
const Header = () => {
  const logout = useLogout();
  const { auth, setAuth } = useAuth();
  const links = [
    {
      name: "Home",
      href: "/",
    },
    { name: "Feed", href: "/feed" },
  ];

  const signout = async () => {
    await logout();
  };

  return (
    <header>
      <nav>
        <ul>
          {links.map((link) => {
            return (
              <li className="header-li" key={link.name}>
                <Link className="rr-dom-link" to={link.href}>
                  {link.name}
                </Link>
              </li>
            );
          })}
          {auth.accessToken && (
            <li className="header-li">
              <button onClick={signout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
