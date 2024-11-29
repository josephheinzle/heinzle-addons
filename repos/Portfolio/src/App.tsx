import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import BlogsLab from "./Pages/ProjectPages/BlogsLab";
import GundamGetter from "./Pages/ProjectPages/GundamGetter";
import IdleGame from "./Pages/ProjectPages/IdleGame";
import JustMyType from "./Pages/ProjectPages/JustMyType";
import Navbar from "./Pages/Nabar";
import StudioGhibli from "./Pages/ProjectPages/StudioGhibli";
import TicTacToe from "./Pages/ProjectPages/TicTacToe";
import Resume from "./Pages/Resume";
import Profile from "./Pages/Profile";
import * as Types from "../Types";

const App = (props: Types.NO_PROPS) => {
  const loc = useLocation();
  useEffect(() => {
    // scroll to the top of the page when changing views, unless when arriving via link intended to view demo
    if (!window.location.toString().includes("?isDemo=true")) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [loc.pathname]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/idlegame" element={<IdleGame />} />
        <Route path="/studioghibli" element={<StudioGhibli />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/justmytype" element={<JustMyType />} />
        <Route path="/gundamgetter" element={<GundamGetter />} />
        <Route path="/blogslab" element={<BlogsLab />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </>
  );
};

export default App;