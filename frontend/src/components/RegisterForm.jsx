import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const { register } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    const { result, err } = await register({ data });
    console.log(result);
    if (result.statusText == "OK") {
      setSuccess(true);
    } else {
      setErrMsg(err?.message);
    }
  };

  return (
    <div>
      <h1>RegisterForm</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <label htmlFor="confirmPassword">Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
