import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const LoginForm2 = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const { login, setAuth, auth } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      persist: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      const { result, err } = await login({ username, password });

      if (result?.status == 200) {
        const accessToken = result?.data?.accessToken;
        setAuth({ username, accessToken });
        formik.resetForm();
        navigate("/feed");
      } else {
        setErrMsg(err?.message);
      }
    },
  });

  useEffect(() => {
    localStorage.setItem("persist", formik.values.persist);
  }, [formik.values.persist]);
  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" {...formik.getFieldProps("username")} />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <input type="password" {...formik.getFieldProps("password")} />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <div className="persist-check">
        <input type="checkbox" {...formik.getFieldProps("persist")} />
        <label htmlFor="persist">Trust This Computer?</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm2;
