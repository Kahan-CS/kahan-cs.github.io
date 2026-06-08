import React, { useState, useEffect } from "react";
import styles from "../styles/AboutMe.module.css";
import profileImgBundled from "../assets/Profile-pic.jpg";
import TechnologyList from "./technology-list/TechnologyList";
import programingLanguages from "../data/programingLanguagesData";
import usePortfolioConfig from "../hooks/usePortfolioConfig";

// Convert Google Drive share links to a directly embeddable URL.
// drive.google.com/file/d/ID/view  →  lh3.googleusercontent.com/d/ID
function resolveImgUrl(url) {
  if (!url) return null;
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  if (driveMatch) return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  return url;
}

const AboutMe = () => {
  const config = usePortfolioConfig();
  const [imgSrc, setImgSrc] = useState(`${process.env.PUBLIC_URL}/profile-pic.jpg`);

  useEffect(() => {
    const resolved = resolveImgUrl(config.profilePicUrl);
    // Use config URL when provided; otherwise stay on the public-folder default
    if (resolved) setImgSrc(resolved);
    else setImgSrc(`${process.env.PUBLIC_URL}/profile-pic.jpg`);
  }, [config.profilePicUrl]);

  const handleImgError = () => setImgSrc(profileImgBundled);

  return (
    <div id="about-me" className="sections container">
      <h2 className="section-heading">About Me</h2>
      <div className={`row ${styles["inner-content"]}`}>
        <div className="col">
          <p>
            Hello there! My name is Kahan Desai — a Computer Science (Honours)
            graduate from Conestoga College, Waterloo ON.
            Full-Stack Developer | Back-end Engineer | Data Scientist / ML Engineer
          </p>
          <p>
            Coming into my Bachelor's I had hardly any programming background — just
            strong foundations in Math, Physics, and Chemistry, and years of
            competitive problem-solving. That curious mind led me to translate logical
            skills into real software: from embedded C systems at Blackberry QNX, to
            full-stack web apps, to machine learning pipelines. I care about building
            things that actually work well, and I enjoy the challenge of making complex
            systems simple and reliable.
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
                    iconName={techName.hasOwnProperty("iconName") ? techName.iconName : ""}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`col ${styles["profile"]}`}>
          <img
            className={`img-fluid ${styles["profile-image"]}`}
            src={imgSrc}
            alt="Profile"
            onError={handleImgError}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
