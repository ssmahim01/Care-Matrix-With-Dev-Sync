import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ consultationFee, appointmentInfo, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!clientSecret) {
    console.error("No client secret provided!");
    toast.error("Payment configuration error. Please try again.");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe is not ready. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Confirm payment with Stripe (no return_url)
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required", // Only redirect if the payment method demands it
      });

      if (error) {
        setErrorMessage(error.message);
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const paymentData = {
          appointmentInfo,
          paymentStatus: "succeeded",
          amount: consultationFee,
          paymentDate: new Date().toISOString(),
          transactionId: paymentIntent.id,
        };

        // Save payment data to backend
        const paymentResponse = await axiosSecure.post(
          "/payments",
          paymentData
        );
        if (
          paymentResponse.data?.message === "Payment data saved successfully"
        ) {
          toast.success("Payment successful and saved!");

          // Save appointment info to appointments collection
          const appointmentResponse = await axiosSecure.post(
            "/appointments",
            appointmentInfo
          );
          if (appointmentResponse?.data.insertedId) {
            // Award points for completed appointment
            const rewardInfo = {
              userEmail: appointmentInfo.email,
              action: "Completed Appointment",
              points: 10,
              date: new Date().toISOString()
            };

           const rewardResponse = await axiosSecure.post("/rewards/award-points", rewardInfo);
           if(rewardResponse.data.success){
               toast.success(
                 "Appointment booked successfully and points awarded!"
               );
               // Redirect only after both payment and appointment are saved
               navigate("/book-appointment/payment-success", {
                 state: { paymentData, rewardInfo },
               });
           }else{
            toast.error("Failed to award points");
           }
          } else {
            throw new Error("Failed to book appointment");
          }
        } else {
          throw new Error("Unexpected response from server");
        }
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Payment failed. Please try again.");
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        className="btn mt-4 bg-[#3b6df8] hover:bg-blue-600 text-white border-none "
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;
