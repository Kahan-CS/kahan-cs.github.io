import React from "react";
import styles from "../styles/AboutMe.module.css";
import profileImg from "../assets/logo.svg";
import TechnologyList from "./technology-list/TechnologyList";
import programingLanguages from "../data/programingLanguagesData";

const AboutMe = () => {
  return (
    <div id="about-me" className="sections container">
        <h2 className="section-heading">About Me</h2>
        <div className={`row ${styles["inner-content"]}`}>
          <div className="col">
            <p>
              Hello there! My name is Kahan Desai.
              I am studying 2nd year of Bachelor of Computer Science <br/>
              Seeking Co-op for Spring '24 | Full-Stack, Back-end, Software Developer, Data Scientist
            </p>
            <p>
            Coming into Bachelor's of Computer Science, I had hardly any knowledge about programming and technology. All I had was my knowledge from my studies in Math, Physics, and Chemistry, and experience dealing with problem-solving and logical-reasoning through competitive exams. And most importantly, a curious mind! Ever since, I have learnt a lot through the courses, about programming, concepts, algorithms and a lot more understanding about computer science and IT. I have figured I could translate my logical skills and concepts into useful software systems/programs, which has become my essential driving force.
            </p>
            <p className={styles["technology-message"]}>
              Recent technologies I've been working with include:
            </p>

            <div className={`row ${styles["programing-languages"]}`}>
              {/* Technologies learned and Used */}
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
