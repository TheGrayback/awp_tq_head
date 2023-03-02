import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Clock from "./Clock";
export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-primary justify-content-between">
    <ul className="navbar-nav mx-2">
      <li>
        <div className="navbar-brand">Note App</div>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/" exact="true">
          Main
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/about">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/test">
          Test
        </NavLink>
      </li>
    </ul>
    <div>
      <h6 className="mx-3 text-light">
        <Clock/>
      </h6>
    </div>
  </nav>
);
