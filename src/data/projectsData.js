import { v4 as uuidv4 } from "uuid";
import placeholderImage from "../assets/projects-img/placeholder.webp"; // Placeholder image

const projectsData = [
  {
    id: uuidv4(),
    name: "Conestoga Connects",
    image: require("../assets/projects-img/conestogaconnects.png"), 
    description: `Developed a peer networking platform with separate client and admin portals using C# and Blazor WebAssembly, integrated with MongoDB for database management and ASP.NET Core for user authentication.`,
    technology: [
      { id: uuidv4(), name: "C#" },
      { id: uuidv4(), name: "Blazor WebAssembly" },
      { id: uuidv4(), name: "MongoDB" },
      { id: uuidv4(), name: "ASP.NET Core" },
    ],
    link: "https://github.com/Kahan-CS/Conestoga_Connects-Project_IV-Group-7",
  },
  {
    id: uuidv4(),
    name: "RoadQuest",
    image: require("../assets/projects-img/roadquest.png"), 
    description: `Developed the back end using Express-NodeJS for navigation features and real-time monitoring of smartphone sensors for driving skills assessment. Built REST APIs with Mongoose and MongoDB Atlas, and implemented Android-native mobile UI in Kotlin.`,
    technology: [
      { id: uuidv4(), name: "Node.js" },
      { id: uuidv4(), name: "Express.js" },
      { id: uuidv4(), name: "MongoDB Atlas" },
      { id: uuidv4(), name: "Kotlin" },
      { id: uuidv4(), name: "Azure DevOps" },
    ],
    link: "https://github.com/Kahan-CS/RoadQuest-Group-18",
  },
  {
    id: uuidv4(),
    name: "LazyPrint",
    image: require("../assets/projects-img/lazyPrint.png"), 
    description: `Designed a dynamic job scheduling system using Python and Flask, incorporating advanced filtering algorithms and tested using ReactJS for front-end, Pandas for data analysis, and Flask for REST APIs.`,
    technology: [
      { id: uuidv4(), name: "Python" },
      { id: uuidv4(), name: "Flask" },
      { id: uuidv4(), name: "Pandas" },
      { id: uuidv4(), name: "React.js" },
    ],
    link: "https://github.com/Kahan-CS/CSCN72030-Group_2-LazyPrint",
  },
  {
  id: uuidv4(),
    name: "Savior In Darkness",
    image: require("../assets/projects-img/saviorindarkness.png"), 
    description: `Developed an interactive, console-based strategy game using C, featuring varied difficulty levels. Applied foundational programming principles such as dynamic memory allocation, data structures, recursion, and file handling. Conducted unit and integration testing with MS Testing Framework.`,
    technology: [
      { id: uuidv4(), name: "C" },
      { id: uuidv4(), name: "MS Testing Framework" },
    ],
    link: "https://github.com/Kahan-CS/Savior_in_darkness",
  },
  {
    id: uuidv4(),
    name: "Study-Incentivizer",
    image: placeholderImage, 
    description: `Built a gamified self-study application during an 8-hour hackathon using ReactJS for frontend and Python for backend, featuring face and screen-content tracking for study validation.`,
    technology: [
      { id: uuidv4(), name: "React.js" },
      { id: uuidv4(), name: "Python" },
    ],
    link: "https://devpost.com/software/study-incentive",
  },
  {
    id: uuidv4(),
    name: "Phone Orientation Predictor",
    image: placeholderImage, 
    description: `Developed a phone orientation predictor using machine learning algorithms in C++, processing sensor data from accelerometers to predict phone position.`,
    technology: [
      { id: uuidv4(), name: "C++" },
      { id: uuidv4(), name: "GDB" },
    ],
    link: "https://github.com/Kahan-CS/FinalProject-OOP-W23",
  },
];

export default projectsData;
