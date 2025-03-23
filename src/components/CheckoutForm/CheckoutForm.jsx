import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ consultationFee, appointmentInfo, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (!clientSecret) {
        console.error('No client secret provided!');
        toast.error('Payment configuration error. Please try again.');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            toast.error('Stripe is not ready. Please try again.');
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // Confirm payment with Stripe
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/book-appointment/payment-success`, // Required for some payment methods
                },
                redirect: 'if_required', // Avoid redirect unless necessary
            });

            if (error) {
                setErrorMessage(error.message);
                toast.error(error.message);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                const paymentData = {
                    appointmentInfo,
                    paymentStatus: 'succeeded',
                    amount: consultationFee,
                    paymentDate: new Date().toISOString(), // Use ISO format for consistency
                    transactionId: paymentIntent.id, // Save Stripe transaction ID for reference
                };

                // Save payment data to backend
                try {
                    const response = await axiosSecure.post('/payments', paymentData);
                    if (response.data?.message === 'Payment data saved successfully') {
                        toast.success('Payment successful and saved!');
                        navigate('/book-appointment/payment-success');
                    } else {
                        throw new Error('Unexpected response from server');
                    }
                } catch (saveError) {
                    console.error('Error saving payment:', saveError);
                    toast.error('Payment succeeded, but failed to save. Contact support.');
                }
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Payment failed. Please try again.');
            toast.error(error.message || 'Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }

        //   book appointment and save appointment info to appointments collection

        axiosSecure.post('/appointments', appointmentInfo)
            .then(res => {
                console.log(res);
                if (res?.data.insertedId) {
                    toast.success("Appointment booked successfully!")
                }
            })
            .catch(err => {
                toast.error("Something went wrong please try again")
            })

    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <PaymentElement />
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <button
                type='submit'
                className='btn mt-4'
                disabled={!stripe || isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
            </button>
        </form>
    );
};

export default CheckoutForm;