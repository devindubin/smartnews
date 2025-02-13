import "dotenv/config";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewsProvider from "./context/NewsProvider";
import MainFeed from "./components/feed/MainFeed";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import PersistentLogin from "./components/PersistentLogin";
import ArticleModal from "./components/feed/ArticleModal";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<RegisterForm />} />
        <Route element={<PersistentLogin />}>
          <Route
            path="feed"
            element={
              <ProtectedRoute>
                <NewsProvider>
                  <MainFeed />
                </NewsProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="feed/:id"
            element={
              <ProtectedRoute>
                <NewsProvider>
                  <ArticleModal />
                </NewsProvider>
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
