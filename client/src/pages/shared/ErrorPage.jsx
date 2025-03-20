import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-lg">Oops! Something went wrong.</h1>
        <p className="font-light text-sm">
          We couldn't find the page you were looking for.
        </p>
        <button
          onClick={() => navigate("/")}
          className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
