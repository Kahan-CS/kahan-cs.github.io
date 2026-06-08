import React, { useState } from "react";
import styles from "../styles/Experience.module.css";
import useContent from "../hooks/useContent";

const TYPE_BADGE = {
  "CO-OP": styles.badgeCoop,
  Contract: styles.badgeContract,
  "Part-time": styles.badgePartTime,
  Volunteer: styles.badgeVolunteer,
};

const ExperienceCard = ({ exp }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <h3 className={styles.jobTitle}>{exp.title}</h3>
          <span className={`${styles.typeBadge} ${TYPE_BADGE[exp.type] || styles.badgePartTime}`}>
            {exp.type}
          </span>
        </div>
        <span className={styles.dateRange}>{exp.dateRange}</span>
      </div>

      <div className={styles.companyRow}>
        <a
          href={exp.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.companyName}
        >
          {exp.company}
        </a>
        <span className={styles.locationDot}>·</span>
        <span className={styles.location}>{exp.location}</span>
      </div>

      <ul className={styles.bulletList}>
        {exp.highlights.map((b, i) => (
          <li key={i} className={styles.bullet}>
            <span className={styles.bulletArrow}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {exp.moreDetails && exp.moreDetails.length > 0 && (
        <div className={`${styles.extraBullets} ${open ? styles.extraBulletsOpen : ""}`}>
          <ul className={styles.bulletList}>
            {exp.moreDetails.map((b, i) => (
              <li key={i} className={styles.bullet}>
                <span className={styles.bulletArrow}>▹</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.skillTags}>
          {exp.skills.map((s, i) => (
            <span key={i} className={styles.skillTag}>{s}</span>
          ))}
        </div>

        {exp.moreDetails && exp.moreDetails.length > 0 && (
          <button className={styles.knowMoreBtn} onClick={() => setOpen(!open)}>
            {open ? "Show less" : "Know more"}
            <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>▼</span>
          </button>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const { experience } = useContent();
  return (
    <div id="experience" className="sections container">
      <h2 className="section-heading">Experience</h2>
      <div className={styles.timeline}>
        {experience.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
