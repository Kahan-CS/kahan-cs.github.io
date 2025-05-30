import React from "react";
import NavBarLink from "./nav-bar-link/NavBarLink";
import Logo from "../assets/logo.svg";
import styles from "../styles/NavBar.module.css";
import transcript from "../assets/transcript.pdf";

const NavBar = ({ zIndex = 4 }) => {
  return (
    <>
      {/* Nav Bar */}
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top navbar-custom ${styles["navbar"]} ${styles["navbar-dark"]}`}
        style={{ zIndex }}
      >
        {/* Left Side Logo */}
        <button
          className="navbar-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img src={Logo} width="100px" alt="Kahan Desai logo" />
        </button>

        {/* Button when menu is collapsed */}
        <button
          className={`navbar-toggler ${styles["navbar-toggler"]} ${styles["custom-toggler"]}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className={`navbar-toggler-icon ${styles["navbar-toggler-icon"]}`}
          ></span>
        </button>

        {/* Nav Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center Side | Nav Bar content */}
          <ul className="navbar-nav text-center ms-auto">
            <NavBarLink name="About Me" link="#about-me" button="no" />
            <NavBarLink name="Projects" link="#projects" button="no" />
            <NavBarLink name="Contact" link="#contact-me" button="no" />
            {/* Right Side | Resume */}
            <NavBarLink
              name="Transcript"
              link={transcript}
              button="yes"
              target="_blank"
            />
            <NavBarLink
              name="Resume"
              link={"https://drive.google.com/file/d/17o23vqe8EtQx956xSeezk_TNCbYWVZJj/view?usp=sharing"}
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
