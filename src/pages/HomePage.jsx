import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const HomePage = () => (
  // Hero Section
  // About Section
  // reviews
  <>
    <div className="Hero">
      <div className="conten" style={{ position: "relative", overflow: "hidden" }}>
        <p className="sh">stay updated with !</p>
        <h1>CIVICPULSE</h1>
        <img src="spark.png" alt="" />
        <h4>Busy but curious?</h4>
        <p>
          Read AI-generated blogs from real news and chat with Gemini. Save
          insights, focus better.
        </p>
        <hr />
      </div>
    </div>
  </>
);

export default HomePage;
