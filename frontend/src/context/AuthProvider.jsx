import { createContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const register = async ({ data }) => {
    let result;
    let err;

    try {
      const response = await axios.post(
        "/auth/register",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      result = response;
    } catch (error) {
      err = error.response.data;
    }
    return { result, err };
  };

  const login = async ({ data }) => {
    let result;
    let err;

    try {
      const response = await axios.post("/auth/login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      result = response;
    } catch (error) {
      err = error.response.data;
    }
    return { result, err };
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, register, login, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
