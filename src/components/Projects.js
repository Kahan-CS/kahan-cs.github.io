import React, { useState } from "react";
import styles from "../styles/Projects.module.css";
import useContent from "../hooks/useContent";
import ProjectCard from "./project-item/ProjectCard";

const Projects = () => {
  const { projects } = useContent();
  const [showMore, setShowMore] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div id="projects" className={`container sections ${styles.container}`}>
      <h2 className="section-heading">Featured Projects</h2>

      <div className={styles.featuredGrid}>
        {featuredProjects.map((data) => (
          <ProjectCard
            key={data.id}
            name={data.name}
            image={data.image}
            description={data.description}
            technology={data.technology}
            link={data.link}
            demoLink={data.demoLink}
            featured={true}
          />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className={styles.moreSection}>
          <button
            className={styles.moreToggle}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide other projects" : "Show more projects"}
            <span className={`${styles.toggleChevron} ${showMore ? styles.chevronOpen : ""}`}>
              ▼
            </span>
          </button>

          <div className={`${styles.moreGrid} ${showMore ? styles.moreGridOpen : ""}`}>
            {otherProjects.map((data) => (
              <ProjectCard
                key={data.id}
                name={data.name}
                image={data.image}
                description={data.description}
                technology={data.technology}
                link={data.link}
                demoLink={data.demoLink}
                featured={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
