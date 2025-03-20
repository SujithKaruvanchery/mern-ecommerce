import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  console.log("VITE_STRIPE_PUBLISHABLE_KEY:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
