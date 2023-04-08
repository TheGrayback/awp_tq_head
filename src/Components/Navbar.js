import React from "react";
import { NavLink } from "react-router-dom";
import Clock from "./Clock";

export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-primary justify-content-between">
    <ul className="navbar-nav mx-2">
      <li>
        <div className="navbar-brand">Note App</div>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          aria-current="page"
          to="/workers"
          exact="true"
        >
          Робітники
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/controllers">
          Контроллери
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/reports">
          ДСЕ
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/defects">
          Брак
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/statistics">
          Статистика
        </NavLink>
      </li>
    </ul>
    <div>
      <h6 className="mx-3 text-light">
        <Clock />
      </h6>
    </div>
  </nav>
);
