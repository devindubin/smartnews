import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { login, setAuth, auth, persist, setPersist } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };
    const { result, err } = await login({ data });
    console.log(result);

    if (result?.status == 200) {
      const accessToken = result?.data?.accessToken;
      setAuth({ username, accessToken });
      setUsername("");
      setPassword("");

      navigate("/feed");
    } else {
      console.log(err);
      setErrMsg(err?.message);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  return (
    <div>
      <h1>LoginForm</h1>
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="persistCheck">
          <input
            type="checkbox"
            name="persist"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
