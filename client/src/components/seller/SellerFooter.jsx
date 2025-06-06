import React from "react";

function SellerFooter() {
  return (
    <footer className="w-full bg-base-100 mt-10">
      <div className="footer footer-center">
        <div>
          <nav className="grid grid-flow-col gap-4 mb-0">
            <a className="link link-hover">Seller Dashboard</a>
            <a className="link link-hover">My Products</a>
            <a className="link link-hover">Orders</a>
            <a className="link link-hover">Inventory</a>
            <a className="link link-hover">Shipping</a>
            <a className="link link-hover">Payments</a>
          </nav>
          <nav className="grid grid-flow-col gap-4 mt-0">
            <a className="link link-hover">Seller Support</a>
            <a className="link link-hover">Seller Terms</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">FAQs</a>
          </nav>
        </div>

        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-youtube fa-lg"></i>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-tiktok fa-lg"></i>
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-spotify fa-lg"></i>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-pinterest fa-lg"></i>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </nav>

        <aside>
          <nav className="grid grid-flow-col gap-4">
            <p>
              Copyright © {new Date().getFullYear()} MANGO All rights reserved
            </p>
            <p>Privacy Policy and Cookies</p>
            <p>Terms and conditions</p>
            <p>Ethics Channel</p>
          </nav>
        </aside>
      </div>
    </footer>
  );
}

export default SellerFooter;
