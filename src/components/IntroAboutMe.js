import React from "react";
import styles from "../styles/IntroAboutMe.module.css";
import usePortfolioConfig from "../hooks/usePortfolioConfig";

const IntroAboutMe = () => {
  const config = usePortfolioConfig();

  return (
    <>
      <div
        id={styles["intro-about-me"]}
        className={`container ${styles["about-container"]}`}
      >
        <div className="row">
          <div className="col">
            <h1 className={styles["greetings"]}> Hi, my name is</h1>
          </div>

          <div className="w-100"></div>

          <div className="col">
            <h2 className={styles["my-name"]}> Kahan Desai</h2>
          </div>

          <div className="w-100"></div>

          <div className="col">
            <h3 className={styles["small-fact"]}>Providing value through problem-solving</h3>
          </div>

          <div className="w-100"></div>

          <div className="col">
            <p className={styles["big-fact"]}>
              {config.statusLine}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroAboutMe;
