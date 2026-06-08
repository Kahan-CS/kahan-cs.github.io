import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/GlobalStyles.css";
import socialMediaData from "./data/socialMediaData";

import ParticleBackground from "./components/ParticleBackground";
import NavBar from "./components/NavBar";
import SocialMedia from "./components/social-link/SocialMedia";
import EmailLink from "./components/email-link/EmailLink";
import IntroAboutMe from "./components/IntroAboutMe";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import AdminPanel from "./components/admin/AdminPanel";

const IframeShowcase = ({ src, title }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      zIndex: 1000,
    }}
  >
    <iframe
      src={src}
      title={title}
      style={{ border: "none", width: "100%", height: "100%" }}
    />
  </div>
);

function App() {
  return (
    <Router>
      <ParticleBackground />
      <Routes>
        <Route
          path="/student-predictor"
          element={
            <>
              <NavBar zIndex={0} />
              <IframeShowcase
                src="https://student-risk-predictor-inuu.onrender.com/"
                title="Student Holistic Performance Classifier"
              />
            </>
          }
        />
        <Route
          path="/taboo-game"
          element={
            <>
              <NavBar zIndex={0} />
              <IframeShowcase
                src="https://luxury-crumble-ed3793.netlify.app/"
                title="Lunch time Taboo Game"
              />
            </>
          }
        />
        <Route
          path="/fw-visual"
          element={
            <>
              <NavBar zIndex={0} />
              <IframeShowcase
                src="https://gregarious-brioche-614a08.netlify.app/"
                title="Floyd Warshall Visualiser"
              />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <NavBar zIndex={4} />
              <AdminPanel />
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
                <Experience />
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
