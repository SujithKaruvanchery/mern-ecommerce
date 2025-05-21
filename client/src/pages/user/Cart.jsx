import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import CartCards from "../../components/user/CartCards";
import { Link } from "react-router-dom";

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await AxiosInstance.get("/cart/get-cart");
        setCartDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await AxiosInstance.delete("/cart/remove-from-cart", {
        data: { productId },
      });

      if (response.status === 200) {
        toast.success("Product removed successfully!");
        setCartDetails((prev) => ({
          ...prev,
          products: prev.products.filter(
            (item) => item.productId._id !== productId
          ),
          totalPrice:
            prev.totalPrice -
              prev.products.find((item) => item.productId._id === productId)
                ?.productId?.price || 0,
        }));
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product. Please try again.");
    }
  };

  const handleUpdateCart = async (productId, newQuantity) => {
    try {
      const response = await AxiosInstance.put("/cart/update-cart", {
        productId,
        quantity: newQuantity,
      });

      if (response.status === 200) {
        toast.success("Cart updated successfully!");
        setCartDetails((prev) => ({
          ...prev,
          products: prev.products.map((item) =>
            item.productId._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
          totalPrice: prev.products.reduce(
            (acc, item) =>
              item.productId._id === productId
                ? acc + newQuantity * item.productId.price
                : acc + item.quantity * item.productId.price,
            0
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  const makePayment = async () => {
    try {
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!stripeKey) throw new Error("Missing Stripe publishable key.");

      const stripe = await loadStripe(stripeKey);

      const productsWithImages = cartDetails?.products?.map((item) => ({
        name: item?.productId?.name || "Unknown Product",
        price: item?.productId?.price || 0,
        quantity: item?.quantity || 1,
        image: item?.productId?.image || "Unknown Product Image",
      }));

      const session = await AxiosInstance.post(
        "/payment/create-checkout-session",
        {
          products: productsWithImages,
        }
      );

      if (!session.data.sessionId)
        throw new Error("Failed to create checkout session.");

      localStorage.setItem("cartCleared", "false");

      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });

      if (result.error) {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const cartCleared = localStorage.getItem("cartCleared");

      if (cartCleared === "false") {
        try {
          const response = await AxiosInstance.post(
            "/cart/clear-cart-after-payment",
            {
              paymentStatus: "success",
              totalPrice: cartDetails?.totalPrice,
            }
          );

          if (response.status === 200) {
            setCartDetails(null);
            localStorage.setItem("cartCleared", "true");
            toast.success(
              "Order placed successfully! Your cart has been cleared."
            );
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
              "Failed to clear cart after payment."
          );
        }
      }
    };

    checkPaymentStatus();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {cartDetails?.products?.length ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartDetails?.products?.map((value) => (
              <CartCards
                item={value}
                key={value._id}
                handleClose={handleRemoveProduct}
                handleUpdateCart={handleUpdateCart}
              />
            ))}
          </div>

          <div className="bg-white p-6 lg:w-1/3 lg:ml-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs">Subtotal</span>
              <span className="text-xs">Rs.{cartDetails?.totalPrice}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-xs">Delivery</span>
              <span className="text-xs">Free</span>
            </div>

            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                Rs.{cartDetails?.totalPrice}
              </span>
            </div>

            <span className="text-gray-500 text-xs block text-right">
              Taxes included
            </span>

            <button
              className="w-full py-2 bg-black text-white mt-4"
              onClick={makePayment}
            >
              Checkout
            </button>
            <p className="text-sm mt-2 flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              Free home delivery for orders over Rs. 6,500
            </p>
            <p className="text-sm flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              Free returns in 30 days
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">
              Your shopping bag is empty
            </h1>
            <p className="font-light text-sm">
              Get inspiration for your new wardrobe from the latest looks
            </p>
            <Link to={"/products"}>
              <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
                See what's new
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
