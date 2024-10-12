import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Wrapper from "./Wrapper";

const App = () => {
  return (
    <Router>
      <div className="nav-wrapper">
        <h2>Book Management System</h2>
        <nav className="navbar">
          <ul className="navbar-items">
            <li className="navbar-list">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-list">
              <Link to="/create">Create Book</Link>
            </li>
          </ul>
        </nav>
        <Wrapper />
      </div>
    </Router>
  ); 
};

export default App;
