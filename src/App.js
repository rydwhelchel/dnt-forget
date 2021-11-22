import React from 'react';
import NavBar from './NavBar';
import { Routes, Route } from "react-router-dom";
import Details from "./details"
import "./style.css";
import Mainpage from './MainPage';

export default function App() {
  // const args = JSON.parse(document.getElementById('data').text);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/details' element={<Details />}></Route>
        <Route path='/' element={<Mainpage />}></Route>
      </Routes>
    </div>
  )
};

