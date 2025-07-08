import * as React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-text">
        &copy; Pratik Avinash Chaudhari - Senior Software Engineer, nference
        labs
      </span>
      <a href="https://github.com/PratikC22" target="_blank" rel="noreferrer">
        <FaGithub size={14} />
      </a>
      <a
        href="https://linkedin.com/in/pratikc22"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin size={14} />
      </a>
      <a href="mailto:pratikc1020@gmail.com">
        <FaEnvelope size={14} />
      </a>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
