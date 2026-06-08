import { v4 as uuidv4 } from "uuid";
import placeholderImage from "../assets/projects-img/placeholder.webp";

const projectsData = [
  {
    id: uuidv4(),
    name: "Student Holistic Performance Classifier",
    image: placeholderImage,
    description:
      "Cleaned and reduced a 4,424-record higher-education dataset from 35 to 21 features using collinearity pruning and custom ordinal encoding. Reframed binary dropout classification into 3 holistic risk classes. Tuned Random Forest, ANN, and KNN via MLflow — best model: 84.3% accuracy & 0.85 macro-F1.",
    technology: [
      { id: uuidv4(), name: "scikit-learn" },
      { id: uuidv4(), name: "Flask" },
      { id: uuidv4(), name: "MLflow" },
      { id: uuidv4(), name: "Python" },
    ],
    link: "",
    demoLink: "https://student-risk-predictor-inuu.onrender.com/",
    featured: true,
  },
  {
    id: uuidv4(),
    name: "Bits and Peas Website",
    image: require("../assets/projects-img/bitsandpeas-web.png"),
    description:
      "Designed and developed a responsive website for my chess academy using Next.js, React, and Tailwind CSS, with a scalable backend in Flask and MySQL, deployed on Vercel's serverless architecture. My first solo project release.",
    technology: [
      { id: uuidv4(), name: "NextJS + React" },
      { id: uuidv4(), name: "Tailwind CSS" },
      { id: uuidv4(), name: "Flask (Python)" },
      { id: uuidv4(), name: "MySQL" },
    ],
    link: "https://bitsandpeas.com",
    demoLink: "https://bitsandpeas.com",
    featured: true,
  },
  {
    id: uuidv4(),
    name: "Taboo Card Game",
    image: placeholderImage,
    description:
      "Built a Python-based Taboo card generator using a local LLM (DeepSeek-Qwen via llama_cpp) to dynamically produce structured card datasets. Expanded word pools via NLP techniques (NLTK's Brown corpus, WordNet) and external APIs. Cards feed into a dynamic React web app.",
    technology: [
      { id: uuidv4(), name: "Python" },
      { id: uuidv4(), name: "llama_cpp" },
      { id: uuidv4(), name: "NLTK" },
      { id: uuidv4(), name: "React" },
    ],
    link: "",
    demoLink: "https://luxury-crumble-ed3793.netlify.app/",
    featured: true,
  },
  {
    id: uuidv4(),
    name: "Conestoga Connects",
    image: require("../assets/projects-img/conestogaconnects.png"),
    description:
      "Peer networking platform with separate client and admin portals built in C# and Blazor WebAssembly, integrated with MongoDB and ASP.NET Core. Achieved 97%+ code coverage using BUnit, NUnit, MSTest, JMeter, and Selenium WebDriver.",
    technology: [
      { id: uuidv4(), name: "C#" },
      { id: uuidv4(), name: "Blazor WebAssembly" },
      { id: uuidv4(), name: "MongoDB" },
      { id: uuidv4(), name: "ASP.NET Core" },
    ],
    link: "https://github.com/Kahan-CS/Conestoga_Connects-Project_IV-Group-7",
    demoLink: "",
    featured: false,
  },
  {
    id: uuidv4(),
    name: "Café Management App",
    image: placeholderImage,
    description:
      "Café booking application using a .NET Web API back end and two ASP.NET Core MVC front-end clients. Leveraged Entity Framework Core, ASP.NET Identity, and MS SQL Server with JWT tokens for secure, stateless authentication across all API endpoints.",
    technology: [
      { id: uuidv4(), name: ".NET Web API" },
      { id: uuidv4(), name: "ASP.NET MVC" },
      { id: uuidv4(), name: "EF Core" },
      { id: uuidv4(), name: "MS SQL Server" },
    ],
    link: "",
    demoLink: "",
    featured: false,
  },
  {
    id: uuidv4(),
    name: "RoadQuest",
    image: require("../assets/projects-img/roadquest.png"),
    description:
      "Express-NodeJS back end for real-time monitoring of smartphone sensors for driving skills assessment. REST APIs with Mongoose and MongoDB Atlas, Android-native UI in Kotlin reading accelerometer and gyroscopic data for precise skills reports.",
    technology: [
      { id: uuidv4(), name: "Node.js" },
      { id: uuidv4(), name: "Express.js" },
      { id: uuidv4(), name: "MongoDB Atlas" },
      { id: uuidv4(), name: "Kotlin" },
    ],
    link: "https://github.com/Kahan-CS/RoadQuest-Group-18",
    demoLink: "",
    featured: false,
  },
  {
    id: uuidv4(),
    name: "LazyPrint",
    image: require("../assets/projects-img/lazyPrint.png"),
    description:
      "Dynamic job scheduling system with advanced filter-based sorting algorithms, improving feature usability by 35%. Built with Python, Flask REST APIs, Pandas for scheduling analysis, and a ReactJS front end.",
    technology: [
      { id: uuidv4(), name: "Python" },
      { id: uuidv4(), name: "Flask" },
      { id: uuidv4(), name: "Pandas" },
      { id: uuidv4(), name: "React.js" },
    ],
    link: "https://github.com/Kahan-CS/CSCN72030-Group_2-LazyPrint",
    demoLink: "",
    featured: false,
  },
  {
    id: uuidv4(),
    name: "Savior In Darkness",
    image: require("../assets/projects-img/saviorindarkness.png"),
    description:
      "Interactive console-based demon-hero strategy game written entirely in C. Applies dynamic memory allocation, recursion, data structures, and file handling. Achieved 15% memory usage reduction. Full unit and integration testing via MS Testing Framework.",
    technology: [
      { id: uuidv4(), name: "C" },
      { id: uuidv4(), name: "MS Testing Framework" },
    ],
    link: "https://github.com/Kahan-CS/Savior_in_darkness",
    demoLink: "",
    featured: false,
  },
];

export default projectsData;
