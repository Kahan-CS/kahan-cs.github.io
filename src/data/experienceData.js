import { v4 as uuidv4 } from "uuid";

const experienceData = [
  {
    id: uuidv4(),
    title: "Software Developer (Core Product Eng.)",
    company: "Blackberry - QNX",
    companyUrl: "https://blackberry.qnx.com",
    location: "Ottawa, Ontario",
    dateRange: "Aug 2025 – Dec 2025",
    type: "CO-OP",
    skills: ["C", "C++", "QNX", "ISO 26262", "MISRA"],
    highlights: [
      "Developed a reference application in C independently to demonstrate utilities of an IPC-related services library for Alloy Kore (prev. Foundational Vehicle Software Platform).",
      "Assisted in development of middleware components (C/C++) that handle encryption, storage, and performance-related functionalities.",
      "Fixed several bugs dealing with memory safety, serial parsing, and bit-encoding, including 1 critical defect.",
      "Added unit-tests in C achieving 95+% coverage on all existing components.",
    ],
    moreDetails: [
      "Gained working knowledge of QMS processes, ISO 26262, MISRA, and software safety standards.",
      "Performed system profiling on QNX targets using QCC for performance analysis of C/C++ applications.",
    ],
  },
  {
    id: uuidv4(),
    title: "Software Developer in Test",
    company: "Blackberry - QNX",
    companyUrl: "https://blackberry.qnx.com",
    location: "Ottawa, Ontario",
    dateRange: "May 2025 – Aug 2025",
    type: "CO-OP",
    skills: ["TypeScript", "Python", "Mocha", "GDB", "VSCode Extensions"],
    highlights: [
      "Worked with the IDE/Graphics/Audio/SWC team developing and testing QNX-specific tooling in the VSCode and Momentics IDEs within QNX Software Center.",
      "Scaled automation test suites by 50% for IDE features and extensions using TypeScript-Mocha framework.",
    ],
    moreDetails: [
      "Developed and maintained automation test suites in TypeScript and Python to test IDE features and extensions.",
      "Enhanced and executed C/C++ debugger test workflows targeting QNX RTOS, validating GDB integration, breakpoint handling, and remote debugging capabilities across embedded targets.",
    ],
  },
  {
    id: uuidv4(),
    title: "Lead Developer (Full Stack)",
    company: "Seneca Hackathon IT Team",
    companyUrl: "https://www.senecapolytechnic.ca",
    location: "Toronto, Ontario",
    dateRange: "Dec 2024 – Mar 2025",
    type: "Contract",
    skills: ["NextJS", "React", "NodeJS", "PostgreSQL", "Supabase"],
    highlights: [
      "Directed a cross-functional team of 5 developers, delivering a full-stack website for Seneca's 2024 Food Hackathon.",
      "Developed the front-end using NextJS + React, NodeJS on server-side, with PostgreSQL database using Supabase.",
    ],
    moreDetails: [
      "Designed and implemented software architecture as tech lead, making critical technology stack decisions to ensure scalability, maintainability, and alignment with product requirements.",
      "Used serverless functions for scalability with toaster and zod for API validations.",
    ],
  },
  {
    id: uuidv4(),
    title: "Open Learning Assistant",
    company: "Conestoga College OER",
    companyUrl: "https://www.conestogac.on.ca",
    location: "Kitchener, Ontario",
    dateRange: "Jan 2025 – Apr 2025",
    type: "Part-time",
    skills: ["Python", "BeautifulSoup", "Pandas", "Matplotlib", "Selenium"],
    highlights: [
      "Developed Python-based ETL scripts using BeautifulSoup for web scraping and Pandas for data manipulation to automate resource collection tasks such as extracting glossary terms from books.",
    ],
    moreDetails: [
      "Utilized Pressbooks and H5P, along with custom JavaScript utilities and data visualizations using Python's Matplotlib, to curate course content, assessments, and interactive lessons.",
      "Conducted comprehensive testing of open learning web projects using automated tools like Selenium.",
    ],
  },
  {
    id: uuidv4(),
    title: "Web Master",
    company: "KW Chess Club",
    companyUrl: "https://kwchess.ca",
    location: "Kitchener, Ontario",
    dateRange: "Apr 2024 – Nov 2024",
    type: "Volunteer",
    skills: ["WordPress", "NodeJS", "ReactJS", "PostgreSQL", "Hostinger"],
    highlights: [
      "Optimized cloud services on Hostinger, reducing hosting costs by over 65% while ensuring scalability to handle traffic spikes.",
      "Improved website usability and UI using WordPress plugins, reducing redundant inquiries by almost 90%.",
    ],
    moreDetails: [
      "Developing full-stack website with membership, merchandise, and account management integrated, with automated services for notifications, updates, and scheduling.",
      "Utilizing NodeJS for backend services and ReactJS for the UI, with database in PostgreSQL.",
    ],
  },
  {
    id: uuidv4(),
    title: "Software Developer",
    company: "UinSports Inc.",
    companyUrl: "https://uinsports.com",
    location: "Waterloo, Ontario",
    dateRange: "May 2023 – Aug 2024",
    type: "Part-time",
    skills: ["React Native", "Python", "Docker", "AWS", "Flask"],
    highlights: [
      "Developed 8 reusable React Native components for the mobile app covering sports statistics and payment gateways.",
    ],
    moreDetails: [
      "Contributed to back-end development using Python micro-services, deployed on Docker with AWS Cloud.",
      "Added UI enhancements that improved user satisfaction and streamlined UX, increasing user retention by 25–30%.",
      "Gained hands-on experience with AWS Cloud services, cost optimizations, and pipeline management.",
    ],
  },
];

export default experienceData;
