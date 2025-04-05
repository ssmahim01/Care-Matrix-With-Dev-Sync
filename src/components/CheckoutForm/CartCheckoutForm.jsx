import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@/redux/auth/authActions';
import { Button } from '@/components/ui/button';


const CartCheckoutForm = ({ parcel, cartItems, onPaymentSuccess, clientSecret, refetch, customerInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const user = useAuthUser();
    const [error, setError] = useState('');
    const [transaction, setTransaction] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();

    if (!clientSecret) {
        console.error('No client secret provided!');
        toast.error('Payment configuration error. Please try again.');
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customerInfo.name) {
            return toast.error("Please Enter Your Name")
        }
        if (!customerInfo.email) {
            return toast.error("Please Enter Your Email")
        }
        if (!customerInfo.phone) {
            return toast.error("Please Enter Your Phone Number")
        }
        if (!customerInfo.district) {
            return toast.error("Please Select Your District")
        }
        if (!customerInfo.division) {
            return toast.error("Please Select Your Division")
        }
        if (!customerInfo.address) {
            return toast.error("Please Enter Your Address")
        }

        if (!stripe || !elements) {
            setError('Payment system not ready');
            toast.error('Payment system not ready. Please try again.');
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
            });

            if (paymentError) {
                setError(paymentError.message);
                toast.error(paymentError.message);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                setTransaction(paymentIntent.id);
                setShowConfetti(true);

                const orderData = {
                    customerInfo,
                    totalPrice: parcel.price,
                    transactionId: paymentIntent.id,
                    paymentStatus: 'Paid',
                    orderStatus: 'Pending',
                    date: new Date().toISOString(),
                    medicines: cartItems.map(item => ({
                        medicineId: item._id,
                        medicineName: item.medicineName,
                        quantity: item.quantity,
                        price: item.price,
                        subtotal: item.price * item.quantity
                    }))
                };

                const purchaseRes = await toast.promise(
                    axiosSecure.post('/purchase', orderData),
                    {
                        loading: 'Saving purchase history...',
                        success: 'Purchase recorded successfully!',
                        error: 'Failed to record purchase'
                    }
                );

                if (purchaseRes.data.insertedId) {
                    elements.getElement(PaymentElement)?.clear();
                    if (onPaymentSuccess) {

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `৳${parcel.price.toFixed(2)} Paid Successfully!`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        axiosSecure.delete(`/carts/clear/${user?.email}`)
                            .then(() => {
                                setTimeout(() => {
                                    refetch();
                                    navigate(`/dashboard/invoice/${paymentIntent.id}`);

                                }, 3500);

                            })
                            .catch(err => console.error('Error clearing cart:', err));
                    }
                } else {
                    throw new Error('Failed to save purchase history');
                }
            } else {
                toast.error('Payment processing incomplete');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during payment processing');
            toast.error(err.message || 'Payment processing failed');
            console.error('Payment error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-4">
            {showConfetti && <Confetti width={width} height={height} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <PaymentElement />
                </div>
                <div className="flex items-center gap-2 my-2">
                    <input type="checkbox" id="sameAsShipping" className="form-checkbox" />
                    <label htmlFor="sameAsShipping" className="text-sm text-gray-600">
                        Billing address is same as shipping
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="cursor-pointer w-full text-lg font-semibold"
                >
                    {isProcessing ? 'Processing...' : `Pay ৳ ${parcel.price.toFixed(2)}`}
                </Button>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                {transaction && (
                    <p className="mt-2 text-sm text-green-500">
                        Transaction ID: {transaction}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CartCheckoutForm;