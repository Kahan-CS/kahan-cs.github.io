import { useState, useEffect } from "react";

const DEFAULT_CONFIG = {
  resumeUrl:
    "https://drive.google.com/file/d/1tAzIWzmdcmUm1y7ESBGBtjT6WyW-hmyS/view?usp=sharing",
  profilePicUrl: "",
  statusLine: "Seeking full-time entry-level software engineering positions",
};

let cachedConfig = null;

const usePortfolioConfig = () => {
  const [config, setConfig] = useState(cachedConfig || DEFAULT_CONFIG);

  useEffect(() => {
    if (cachedConfig) return;
    fetch("/config.json?t=" + Date.now())
      .then((r) => r.json())
      .then((data) => {
        cachedConfig = { ...DEFAULT_CONFIG, ...data };
        setConfig(cachedConfig);
      })
      .catch(() => {
        cachedConfig = DEFAULT_CONFIG;
        setConfig(DEFAULT_CONFIG);
      });
  }, []);

  return config;
};

export default usePortfolioConfig;
