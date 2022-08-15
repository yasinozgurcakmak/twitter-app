import s from "./App.module.scss";
import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLoginAction, fetchTwitAction } from "./store/actionCreators";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";

import PublicRoute from "./layouts/PublicRoute";
import MainLayout from "./layouts/MainLayout";
import TweetDetail from "./pages/TweetDetail/TweetDetail";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginAction());
    dispatch(fetchTwitAction());
  }, []);
  return (
    <>
      <Navbar />
      <div className={s.container}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path=":id" element={<TweetDetail />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
