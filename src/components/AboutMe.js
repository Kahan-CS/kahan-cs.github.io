import React from "react";
import styles from "../styles/AboutMe.module.css";
import profileImgFallback from "../assets/Profile-pic.jpg";
import TechnologyList from "./technology-list/TechnologyList";
import programingLanguages from "../data/programingLanguagesData";
import usePortfolioConfig from "../hooks/usePortfolioConfig";

const AboutMe = () => {
  const config = usePortfolioConfig();
  const profileImg = config.profilePicUrl || profileImgFallback;

  return (
    <div id="about-me" className="sections container">
        <h2 className="section-heading">About Me</h2>
        <div className={`row ${styles["inner-content"]}`}>
          <div className="col">
            <p>
              Hello there! My name is Kahan Desai — a Computer Science (Honours) graduate from Conestoga College, Waterloo ON.
              Full-Stack Developer | Back-end Engineer | Data Scientist / ML Engineer
            </p>
            <p>
              Coming into my Bachelor's I had hardly any programming background — just strong foundations in Math, Physics, and Chemistry, and years of competitive problem-solving. That curious mind led me to translate logical skills into real software: from embedded C systems at Blackberry QNX, to full-stack web apps, to machine learning pipelines. I care about building things that actually work well, and I enjoy the challenge of making complex systems simple and reliable.
            </p>
            <p className={styles["technology-message"]}>
              Recent technologies I've been working with:
            </p>

            <div className={`row ${styles["programing-languages"]}`}>
              <div className="col-sm">
                <ul className={styles["languages-ul"]}>
                  {programingLanguages.map((techName) => (
                    <TechnologyList
                      key={techName.id}
                      name={techName.name}
                      iconName={
                        techName.hasOwnProperty("iconName")
                          ? techName.iconName
                          : ""
                      }
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`col ${styles["profile"]}`}>
            <img
              className={`img-fluid ${styles["profile-image"]}`}
              src={profileImg}
              alt="Profile"
            />
          </div>
        </div>
      </div>
  );
};

export default AboutMe;
