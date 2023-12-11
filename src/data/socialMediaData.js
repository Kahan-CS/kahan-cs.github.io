import { v4 as uuidv4 } from "uuid";
import Linkedin from "../assets/social-icons/linkedin.svg";
import Github from "../assets/social-icons/github.svg";
import Instagram from "../assets/social-icons/instagram.svg";

const socialMediaData = [
  {
    id: uuidv4(),
    icon: Linkedin,
    link: "http://linkedin.com/in/kahandesai",
  },
  { id: uuidv4(), icon: Github, link: "https://github.com/kahan6826conestoga" },
  { id: uuidv4(), icon: Instagram, link: "https://instagram.com/kahanesque" },
];

export default socialMediaData;
