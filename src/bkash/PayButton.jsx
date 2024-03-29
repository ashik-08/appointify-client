/* eslint-disable no-unused-vars */
import axios from "axios";
import useAuth from "../hooks/useAuth";

const PayButton = ({ bill, plan, children }) => {
  const { user, loading } = useAuth();
  const pay = async () => {
    try {
      const orderId = Math.floor(Math.random() * 1000000) + Date.now(); // Generate random order ID
      let email = ""; // Initialize email variable
      if (user) {
        // Check if user object exists
        email = user.email; // Destructure email only if user exists
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/bkash/payment/create`,
        { amount: bill, orderId, email, status: plan },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  if (loading)
    return (
      <button className="w-full h-12 text-white font-semibold bg-gradient-blue rounded-lg hover:bg-gradient-to-r hover:from-special hover:to-head active:scale-95">
        Loading...
      </button>
    );

  return (
    <div>
      <button
        className="w-full h-12 text-white font-semibold bg-gradient-blue rounded-lg hover:bg-gradient-to-r hover:from-special hover:to-head active:scale-95"
        onClick={pay}
      >
        {children}
      </button>
    </div>
  );
};

export default PayButton;
