import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import MainFeed from "./components/feed/MainFeed";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import PersistentLogin from "./components/PersistentLogin";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route element={<PersistentLogin />}>
          <Route
            path="feed"
            element={
              <ProtectedRoute>
                <MainFeed />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
