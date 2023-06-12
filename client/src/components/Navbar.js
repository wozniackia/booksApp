import Icon from "./svg/Logo";
import DarkTheme from "./svg/DarkTheme";
import { Outlet, Link } from "react-router-dom";
import {isValid} from "../globals"
import React, { useEffect } from "react";

function Navbar() {
  useEffect(() => {
    isValid()
  })
  return (
    <div className="Navbar">
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="./">
            <Icon />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./browse">Browse books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./add">Add books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./search">Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./signin" id="signin-link">Sign in</Link>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-light"
            onClick={() => {
                toggleLocalStorage();
                darkMode();
            }}
          >
            <DarkTheme />
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

function toggleLocalStorage() {
    if(localStorage.getItem('darkmode') === 'true') {
        localStorage.setItem('darkmode', 'false')
    } else {
        localStorage.setItem('darkmode', 'true')
    }
}

function darkMode() {
    let lightElements = ['bg-light', 'navbar-light', 'btn-light', 'text-dark']
    let darkElements = ['bg-dark', 'navbar-dark', 'btn-dark', 'text-light']

    if(localStorage.getItem('darkmode') === 'true') {
        for(let i = 0; i < 4; i++) {
            let dark = document.getElementsByClassName(lightElements[i])
            for(const element of dark) {
                element.classList.add(darkElements[i])
            }
            while(dark.length > 0) {
                dark[0].classList.remove(lightElements[i])
            }
        }
    } else {
        for(let i = 0; i < 4; i++) {
            let dark = document.getElementsByClassName(darkElements[i])
            for(const element of dark) {
                element.classList.add(lightElements[i])
            }
            while(dark.length > 0) {
                dark[0].classList.remove(darkElements[i])
            }
        }
    }
}

export default Navbar;
