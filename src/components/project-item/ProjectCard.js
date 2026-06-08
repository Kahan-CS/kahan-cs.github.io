import React from "react";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ name, image, description, technology, link, demoLink, featured }) => {
  const primaryLink = demoLink || link;

  return (
    <div className={`${styles.card} ${featured ? styles.featured : ""}`}>
      {image && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageWrap}
          tabIndex={-1}
        >
          <img src={image} alt={name} className={styles.image} />
          <div className={styles.imageOverlay} />
        </a>
      )}

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className={styles.featuredLabel}>
            {featured ? "Featured Project" : "Project"}
          </span>
          <div className={styles.linkIcons}>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                title="Source / Details"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.52 11.52 0 0 1 12 6.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                title="Live Demo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <h3 className={styles.title}>
          <a href={primaryLink} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
            {name}
          </a>
        </h3>

        <p className={styles.description}>{description}</p>

        <ul className={styles.techList}>
          {technology.map((t) => (
            <li key={t.id} className={styles.techTag}>{t.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
