import { Link } from "react-router-dom";

const SellerBenefits = () => {
  return (
    <div className="flex items-center justify-center p-10 bg-base-100 text-base-content">
      <div className="max-w-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Why Partner With Us?
        </h1>
        <p className="mb-4">
          <strong>📈 Reach a Global Audience:</strong> Showcase your products to
          a vast network of customers across the world.
        </p>
        <p className="mb-4">
          <strong>📉 Low Fees:</strong> Enjoy competitive fees and keep more
          profits with our transparent pricing.
        </p>
        <p className="mb-4">
          <strong>📊 Simple Management:</strong> Easily list, track, and manage
          your products and orders in one place.
        </p>
        <p className="mb-4">
          <strong>💳 Fast Payments:</strong> Receive your earnings quickly and
          securely through our trusted payment system.
        </p>
        <p className="mb-4">
          <strong>🧑‍💻 24/7 Support:</strong> Our dedicated support team is here
          to help you succeed at any time.
        </p>

        <div className="flex justify-center mt-8">
          <Link
            to={"/seller/signup"}
            className="px-6 py-2 border border-base-content bg-base-content text-base-100 hover:bg-opacity-80 transition"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerBenefits;
