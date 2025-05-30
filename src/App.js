import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./styles/GlobalStyles.css";
import socialMediaData from "./data/socialMediaData";

import ParticleBackground from "./components/ParticleBackground";
import NavBar from "./components/NavBar";
import SocialMedia from "./components/social-link/SocialMedia";
import EmailLink from "./components/email-link/EmailLink";
import IntroAboutMe from "./components/IntroAboutMe";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";

// New Component for the external website
const TabooGame = () => (
  <div
    style={{
      position: "fixed", // Ensures it covers the entire viewport
      top: 0,
      left: 0,
      height: "100vh", // Full viewport height
      width: "100vw", // Full viewport width
      zIndex: 1000, // Higher than the NavBar's z-index
    }}
  >
    <iframe
      src="https://luxury-crumble-ed3793.netlify.app/"
      title="Lunch time Taboo Game"
      style={{
        border: "none",
        width: "100%",
        height: "100%",
      }}
    />
  </div>
);

function App() {
  return (
    <Router>
      <ParticleBackground />
      {/* Pass a lower zIndex to NavBar for the route */}
      <Routes>
        <Route
          path="/taboo-game"
          element={
            <>
              <NavBar zIndex={0} />
              <TabooGame />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <NavBar zIndex={4} />
              <SocialMedia type="left" socials={socialMediaData} />
              <EmailLink />
              <div id="body-content">
                <IntroAboutMe />
                <AboutMe />
                <Projects />
                <ContactMe />
                <Footer />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
