import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer id="footer">
      <div className="container" id="footer-container">
        <div className="row">
          <div className="col-5 offset-1">
            <span id="copyright-text" className="text-muted d-flex">&copy; 2018 DevFools, LLC</span>
          </div>
          <div className="col-5 footer-links">
            <a className="d-flex float-right" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://png.icons8.com/color/50/000000/facebook.png" alt="facebook link" width="50px" />
            </a>
            <a className="d-flex float-right" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://png.icons8.com/color/50/000000/twitter.png" alt="twitter link" width="50px" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
