import SocialMedia from "./social-link/SocialMedia";
import socialMediaData from "../data/socialMediaData";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <SocialMedia type="button" socials={socialMediaData} />
      <p className={styles["my-credit"]}>
        Created By: Kahan Desai
      </p>
      <p className={styles["credits"]}>
        Credits: {" "}
        <a
          className="link"
          href="https://github.com/bchiang7/v4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brittany Chiang
        </a>
          ,{" "}
        <a
          className="link"
          href="https://github.com/javier-arango/e-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Javier Arango
        </a>
      </p>
    </div>
  );
};

export default Footer;
