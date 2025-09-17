import React from 'react';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>Revisionsfirmaet Gutfelt A/S, Tømmerupvej 75, 2770 Kastrup, CVR-nummer: 13254192</p>
        <p>© {new Date().getFullYear()} Gutfelt A/S. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;