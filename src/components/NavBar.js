import React, { useState } from "react";
import NavBarLink from "./nav-bar-link/NavBarLink";
import Logo from "../assets/logo.svg";
import styles from "../styles/NavBar.module.css";
import transcript from "../assets/transcript.pdf";
import usePortfolioConfig from "../hooks/usePortfolioConfig";

const NavBar = ({ zIndex = 4 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const config = usePortfolioConfig();

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top navbar-custom ${styles["navbar"]} ${styles["navbar-dark"]}`}
        style={{ zIndex }}
      >
        {/* Logo */}
        <button
          className="navbar-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img src={Logo} width="100px" alt="Kahan Desai logo" />
        </button>

        {/* Mobile toggle */}
        <button
          className={`navbar-toggler ${styles["navbar-toggler"]} ${styles["custom-toggler"]}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles["navbar-toggler-icon"]}`}></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center ms-auto">
            <NavBarLink name="About Me" link="#about-me" button="no" />
            <NavBarLink name="Experience" link="#experience" button="no" />
            <NavBarLink name="Projects" link="#projects" button="no" />

            {/* Showcase dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => { setIsDropdownOpen(true); setIsHovering(true); }}
              onMouseLeave={() => { setIsDropdownOpen(false); setIsHovering(false); }}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={`nav-link link ${styles["nav-link-custom"]} dropdown-toggle`}
                href="#showcase"
                id="showcaseDropdown"
                role="button"
                onClick={(e) => e.preventDefault()}
                style={{
                  cursor: "pointer",
                  animation: isHovering ? "none" : "bounce 2s infinite",
                }}
              >
                Showcase
              </a>
              <div
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                aria-labelledby="showcaseDropdown"
                style={{ backgroundColor: "#343a40" }}
              >
                <a href="#/student-predictor" className="dropdown-item" style={{ color: "white" }}>
                  Student Risk Predictor
                </a>
                <a href="#/taboo-game" className="dropdown-item" style={{ color: "white" }}>
                  Taboo Game
                </a>
                <a href="#/fw-visual" className="dropdown-item" style={{ color: "white" }}>
                  Floyd-Warshall
                </a>
              </div>
            </li>

            <NavBarLink name="Contact" link="#contact-me" button="no" />
            <NavBarLink name="Transcript" link={transcript} button="yes" target="_blank" />
            <NavBarLink
              name="Resume"
              link={config.resumeUrl}
              button="yes"
              target="_blank"
            />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
