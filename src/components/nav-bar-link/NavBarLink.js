import React from "react";
import styles from "./NavBarLink.module.css";

const NavBarLink = (props) => {
  const handleClick = (e) => {
    // Only handle scroll for anchor links (not external links or files)
    if (props.link.startsWith('#') && !props.target) {
      e.preventDefault();
      
      // Extract the ID from the hash link
      const id = props.link.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <div>
      <li className="nav-item">
        <a
          className={
            props.button === "no"
              ? `nav-link link ${styles["nav-link-custom"]}`
              : `btn btn-outline-primary ${styles["resume-btn"]}`
          }
          href={props.link}
          target={props.target}
          onClick={handleClick}
        >
          {props.name}
        </a>
      </li>
    </div>
  );
};

export default NavBarLink;
