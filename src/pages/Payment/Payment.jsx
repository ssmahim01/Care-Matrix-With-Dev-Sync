import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const consultationFee = parseFloat(location?.state?.appointmentInfo?.consultationFee) || 0;

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!consultationFee) {
      toast.error('Invalid payment details!');
      return;
    }

    axiosSecure.post(`/payments/create-payment-intent`, { fee: consultationFee })
      .then((res) => {
        setClientSecret(res?.data?.clientSecret);
        // console.log("Payment intent success");
      })
      .catch((err) => {
        console.error('Payment intent creation failed:', err);
        toast.error('Failed to generate payment intent.');
      });
  }, [consultationFee, axiosSecure]);

  const appearance = { theme: 'stripe' };
  const options = clientSecret ? { clientSecret, appearance } : null;

  return (
    <div className='w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24'>
      <h1 className='text-2xl font-bold mb-6 text-[#3b6df8]'>Complete Your Payment</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            consultationFee={consultationFee}
            appointmentInfo={location?.state?.appointmentInfo}
            clientSecret={clientSecret}
          />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default Payment;
