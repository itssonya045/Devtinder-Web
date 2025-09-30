import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 fixed bottom-0 left-0 w-full">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Devtinder
        </p>

      </aside>
    </footer>
  );
};

export default Footer;
