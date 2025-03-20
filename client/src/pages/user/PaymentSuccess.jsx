import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-lg">Payment Successful</h1>
        <p className="font-light text-sm">
          Your payment has been successfully processed. Thank you for your
          purchase
        </p>

        <button
          onClick={handleGoHome}
          className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
