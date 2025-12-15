// src/components/layout/MainNavbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import profileImg from "../../assets/coding.png";
import homeImg from "../../assets/home.png";
import "./Menubar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface MainNavbarProps {}

const MainNavbar: React.FC<MainNavbarProps> = () => {
  return (
    <nav className="navbar navbar-expand-lg ls-navbar mb-3">
      <div className="container">
        <a className="navbar-brand ls-navbar-brand" href="#">
          <img src={homeImg} alt="Home" className="home-img" />
        </a>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler border-0 ls-navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#lsMainNavbar"
          aria-controls="lsMainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon ls-navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="lsMainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  "nav-link ls-nav-link " +
                  (isActive ? "active ls-nav-link-active" : "")
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  "nav-link ls-nav-link " +
                  (isActive ? "active ls-nav-link-active" : "")
                }
              >
                Courses
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/my-learning"
                className={({ isActive }) =>
                  "nav-link ls-nav-link " +
                  (isActive ? "active ls-nav-link-active" : "")
                }
              >
                My Learning
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  "nav-link ls-nav-link " +
                  (isActive ? "active ls-nav-link-active" : "")
                }
              >
                Admin
              </NavLink>
            </li>
          </ul>

          {/* Profile dropdown */}
          <div
            className="dropdown position-relative d-flex align-items-center gap-2"
            data-bs-display="static"
          >
            <img
              src={profileImg}
              alt="profile"
              className="profile-img dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="navbarDropdown"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />

            <ul
              className="dropdown-menu dropdown-menu-end custom-dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <div className="custom-dropdown-item">Profile</div>
              </li>
              <li>
                <div className="custom-dropdown-item">Settings</div>
              </li>
              <li>
                <div className="custom-dropdown-item">Logout</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;