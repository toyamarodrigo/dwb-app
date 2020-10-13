import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="row justify-content-around align-items-center">
        <a className="contact github" href="https://github.com/toyamarodrigo" target="_blank">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        <a className="contact ig" href="https://www.instagram.com/rt.codes/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a className="contact linkedin" href="https://www.linkedin.com/in/rodrigo-toyama-1861b1154/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a className="contact mail" href="mailto:toyama.rodrigo@gmail.com" target="_blank">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </a>
      </div>
      <div className="row justify-content-center align-items-center pt-3">
        <small>&copy; Copyright {currentYear}, Toyama Rodrigo</small>
      </div>
    </footer>
  );
};
