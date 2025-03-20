import React, { useEffect, useState } from "react";

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "black";
  });

  useEffect(() => {
    const theme = isDarkMode ? "black" : "lofi";
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <div>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 btn btn-ghost text-xs font-thin"
        >
          THEME
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-[1] w-38 p-2 shadow-2xl"
        >
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start  text-xs font-thin"
                aria-label="LIGHT"
                value="lofi"
                checked={!isDarkMode}
                onChange={() => setIsDarkMode(false)}
              />
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start text-xs font-thin"
                aria-label="DARK"
                value="black"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(true)}
              />
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DarkMode;
