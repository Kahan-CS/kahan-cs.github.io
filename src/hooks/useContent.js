import { useMemo } from "react";
import usePortfolioConfig from "./usePortfolioConfig";
import defaultProjects from "../data/projectsData";
import defaultExperience from "../data/experienceData";

/**
 * Returns projects and experience from the live config.json when those
 * sections are present; falls back to the static data files otherwise.
 * This lets the admin panel override content without a rebuild.
 */
const useContent = () => {
  const config = usePortfolioConfig();

  const projects = useMemo(
    () =>
      Array.isArray(config.projects) && config.projects.length > 0
        ? config.projects
        : defaultProjects,
    [config.projects]
  );

  const experience = useMemo(
    () =>
      Array.isArray(config.experience) && config.experience.length > 0
        ? config.experience
        : defaultExperience,
    [config.experience]
  );

  return { projects, experience };
};

export default useContent;
