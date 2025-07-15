import React from "react";
import { TfiLinkedin } from "react-icons/tfi";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <h1>CIVICPULSE</h1>
        <p>
          Civipulse is news agentic ai, developed for Realtime fast news
          tracking and AI insights
        </p>
        <ul className="icons">
          <li className="s-icons">
            <a href="https://www.linkedin.com/in/sarthaktpatil/">
              <TfiLinkedin />
            </a>
          </li>
          <li className="s-icons">
            <a href="https://github.com/Precise-Goals">
              <FaGithubSquare />
            </a>
          </li>
          <li className="s-icons">
            <a href="https://www.instagram.com/sarthakpatil.in/">
              <AiFillInstagram />
            </a>
          </li>
        </ul>
        <p>Made by Sarthak Patil for GDG Application @2025</p>
      </footer>
    </div>
  );
};

export default Footer;
