import React from "react";
import { Link } from "react-router-dom";

function UserFooter() {
  return (
    <div>
      <div className="w-full bg-base-100 mt-1">
        <footer className="footer footer-center">
          <div>
            <nav className="grid grid-flow-col gap-4 mb-0">
              <Link to={"seller/login"} className="link link-hover">
                Seller Login
              </Link>

              <a className="link link-hover">My purchases</a>
              <a className="link link-hover">Returns</a>
              <a className="link link-hover">Company</a>
              <a className="link link-hover">Work for Mango</a>
              <a className="link link-hover">Press</a>
            </nav>
            <nav className="grid grid-flow-col gap-4 mt-0">
              <Link to={"admin/login"} className="link link-hover">
                Admin Login
              </Link>

              <a className="link link-hover">Site map</a>
              <a className="link link-hover">Sustainability</a>
              <a className="link link-hover">Stores</a>
            </nav>
          </div>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-lg"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-tiktok fa-lg"></i>
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-spotify fa-lg"></i>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-pinterest fa-lg"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </nav>
          <aside className="mt-4 mb-4">
            <nav className="grid grid-flow-col gap-4">
              <p>
                Copyright © {new Date().getFullYear()} MANGO All rights reserved
              </p>
              <p>Privacy Policy and Cookies</p>
              <p>Terms and conditions</p>
              <p>Ethics Channel</p>
            </nav>
          </aside>
        </footer>
      </div>
    </div>
  );
}

export default UserFooter;
