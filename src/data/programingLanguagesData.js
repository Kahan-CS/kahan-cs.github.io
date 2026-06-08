import { v4 as uuidv4 } from "uuid";

const programingLanguages = [
  { id: uuidv4(), name: "C / C++", iconName: "cplusplus" },
  { id: uuidv4(), name: "Python", iconName: "python" },
  { id: uuidv4(), name: "TypeScript / JS", iconName: "typescript" },
  { id: uuidv4(), name: "C#", iconName: "csharp" },
  { id: uuidv4(), name: "React / NextJS", iconName: "react" },
  { id: uuidv4(), name: "Node.js", iconName: "nodejs" },
  { id: uuidv4(), name: "ASP.NET / MAUI", iconName: "dot-net" },
  { id: uuidv4(), name: "AWS (EC2, S3, λ)", iconName: "amazonwebservices" },
  { id: uuidv4(), name: "TensorFlow / sklearn" },
  { id: uuidv4(), name: "Pandas / MLflow", iconName: "pandas" },
  { id: uuidv4(), name: "Docker", iconName: "docker" },
  { id: uuidv4(), name: "MySQL / MongoDB", iconName: "mongodb" },
];

export default programingLanguages;
