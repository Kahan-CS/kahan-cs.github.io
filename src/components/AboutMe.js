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
  const [imgSrc, setImgSrc] = useState(
    `${process.env.PUBLIC_URL}/profile-pic.jpg`,
  );

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
            I am a final year Computer Science student majoring in ML/AI,
            <b> graduating in August 2026</b>. I am interested in Full-Stack, Systems
            Engineering, Data Science, and ML/AI roles.{" "}
          </p>
          <p></p>
          <p>
            I've gained experience in developing systems components, debugging
            complex and multi-threaded programs, implementing ML models and
            problem-solving algorithms, and the various full-stack software
            projects that I worked on all throughout my degree program and co-op
            terms. Translating ideas into software applications fascinates me.{" "}
            <b>Innovation and Problem-solving</b> are my biggest driving forces.
          </p>
          <p>
            Passionate about problem-solving, mathematics, competitive
            programming. I lean towards Machine learning and Algorithmic
            problems. I also love to learn about and work on Embedded
            Systems, Parallel Computing problems, Performance & Optimization.
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
