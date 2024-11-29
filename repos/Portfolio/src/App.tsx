import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
  return (
    <div>
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
    </div>
  );
};

export default App;