import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { FaCartShopping } from "react-icons/fa6";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuthUser } from "@/redux/auth/authActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";


const globalStyles = {
    inputStyles: "w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5",
};

const Cart = () => {
    const user = useAuthUser()
    const [cart, , refetch] = useCart()
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    const [subtotal, setSubtotal] = useState(0)
    const shippingCost = cart.length ? 60 : 0

    // console.log(user);

    useEffect(() => {
        const calculatedSubtotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setSubtotal(calculatedSubtotal);
    }, [cart]);

    // Increase quantity
    const handleIncrease = async (itemId) => {
        const item = cart.find((i) => i._id === itemId);
        const updatedQuantity = item.quantity + 1;
        await toast.promise(axiosSecure.patch(`/carts/quantity/${itemId}`, { quantity: updatedQuantity }), {
            loading: "Updating quantity...",
            success: <b>Quantity Added!</b>,
            error: (error) => error.message
        })
        refetch();
    };

    // Decrease quantity
    const handleDecrease = async (itemId) => {
        const item = cart.find((i) => i._id === itemId);
        if (item.quantity === 1) {
            Swal.fire({
                title: "Want to remove this Medicine?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await toast.promise(axiosSecure.delete(`/carts/delete/${itemId}`), {
                        loading: "Deleting item...",
                        success: <b>Medicine Removed!</b>,
                        error: (error) => error.message,
                    });
                    refetch();
                }
            });
        } else if (item.quantity > 1) {
            const updatedQuantity = item.quantity - 1;
            await toast.promise(
                axiosSecure.patch(`/carts/quantity/${itemId}`, { quantity: updatedQuantity }),
                {
                    loading: "Updating quantity...",
                    success: <b>Quantity Decreased!</b>,
                    error: (error) => error.message,
                }
            );
            refetch();
        }
    };

    // Clear cart
    const handleClearCart = async () => {
        try {
            await toast.promise(axiosSecure.delete(`/carts/clear/${user?.email}`), {
                loading: "Clearing Cart...",
                success: <b>Cart Cleared Successfully!</b>,
                error: error => error.message
            })
            refetch()
            setIsOpen(false)
        } catch (error) {
            console.error("Error clearing cart:", error)
        }
    };



    const districts = [
        'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
        'Comilla', 'Narayanganj', 'Gazipur', 'Narsingdi', 'Tangail', 'Jessore', 'Dinajpur', "Lakshmipur", "Noakhalu"
    ];

    const cities = [
        'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Rangpur',
        'Narayanganj', 'Mymensingh', 'Jessore', 'Bogra', 'Dinajpur',

    ];

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="w-full flex flex-col gap-8 md:gap-0 md:flex-row">
            {/* Left Column - Order Summary */}
            <div className="bg-gray-50 rounded-md p-4 md:p-8 flex-1">
                <div>
                    <h2 className="text-[1.2rem] text-gray-700 font-semibold mb-6">Your order</h2>
                    <div className="border border-gray-200 rounded-md">
                        {cart?.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row md:items-center gap-4 border-t p-4 border-gray-200"
                            >
                                <div className="border relative border-gray-200 w-max rounded-md bg-white">
                                    <img
                                        src={item.image}
                                        alt={item.medicineName}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <span className="px-[0.45rem] rounded-full absolute bg-white -top-2 -right-2 z-30 text-[0.9rem] text-gray-800 border border-gray-200 shadow-sm">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.medicineName}</h3>
                                    <div className="flex items-center gap-[30px] mt-2">
                                        <p className="text-sm text-gray-500">
                                            Strength: <b className="text-gray-800">{item.strength}</b>
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDecrease(item._id)}
                                                className="p-1 border rounded hover:bg-gray-200"
                                            >
                                                <AiOutlineMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrease(item._id)}
                                                className="p-1 border rounded hover:bg-gray-200"
                                            >
                                                <AiOutlinePlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-medium">৳ {item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Summary */}
                    <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
                        <div className="flex justify-between">
                            <span className="text-[1rem] text-gray-500">Subtotal</span>
                            <span className="text-[1rem] font-medium text-gray-800">৳ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[1rem] text-gray-500">Shipping Cost</span>
                            <span className="text-[1rem] font-medium text-gray-800">৳ {shippingCost}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-5 font-medium">
                            <span>Total</span>
                            <span className="text-[1rem] font-medium text-gray-800">
                                ৳ {(subtotal + shippingCost).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Clear Cart Button */}
                    <div className="flex items-center justify-center gap-5">
                        <Link to={'/pharmacy'} >
                            <Button className=" cursor-pointer">
                                Continue Shopping
                            </Button>
                        </Link>
                        <Button
                            onClick={() => setIsOpen(true)}
                            className={'bg-red-500 hover:bg-red-400 text-white cursor-pointer'}>
                            Clear Cart <FaCartShopping></FaCartShopping>

                        </Button>

                    </div>

                </div>
            </div>

            {/* Right Column - Checkout Form (Sticky on large devices) */}
            <div className="flex-1 md:px-8 lg:sticky lg:top-16 lg:self-start">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="text-[1rem] font-medium text-gray-800 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="user@gmail.com"
                            defaultValue={user?.email}
                            className={globalStyles.inputStyles}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="text-[1rem] font-medium text-gray-800 mb-1">
                            Phone number
                        </label>
                        <div className="flex gap-2">
                            <select className="border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5 w-[100px]">
                                <option value="bd">🇧🇩 +880</option>
                            </select>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter Your Phone no."
                                defaultValue={user?.mobile}
                                className={globalStyles.inputStyles}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[1rem] font-medium text-gray-800">Payment method</label>
                            {/* <button type="button" className="text-blue-600 text-right flex text-[0.9rem] items-center gap-[5px]">
                                <AiOutlinePlus />
                                Add new
                            </button> */}
                        </div>
                        <label className="flex-1 flex items-center justify-between gap-2 border-gray-200 border rounded-lg p-4">
                            <div>
                                <div className="dark:text-[#abc2d3]">
                                    <input type="radio" name="payment" value="stripe" className="form-radio" defaultChecked />
                                    <span> **** 4242</span>
                                </div>
                                <div className="flex items-center gap-[5px] pl-5 mt-0.5">
                                    <p className="text-[0.9rem] text-gray-500">Stripe •</p>
                                    <p className="text-[0.9rem] text-gray-500 hover:text-[#0FABCA] cursor-pointer">Edit</p>
                                </div>
                            </div>
                            <img src="https://thelettertwo.com/wp-content/uploads/2024/11/stripe-logo-wall-960x540-1.jpg" alt="Stripe" className="w-[50px] rounded-md" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="billingAddress" className="text-[1rem] font-medium text-gray-800 mb-1">
                            Billing address
                        </label>
                        <select
                            id="billingAddress"
                            className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5"
                        >
                            <option>Bangladesh</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district" className="text-[1rem] font-medium text-gray-800 mb-1">
                            District
                        </label>
                        <select
                            id="district"
                            className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5"
                        >
                            {districts.map((district) => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="zipCode" className="text-[1rem] font-medium text-gray-800 mb-1">
                                Zip code
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                placeholder="Ex. 73923"
                                className={globalStyles.inputStyles}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="text-[1rem] font-medium text-gray-800 mb-1">
                                City
                            </label>
                            <select
                                id="city"
                                className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5"
                            >
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="sameAsShipping" className="form-checkbox" />
                        <label htmlFor="sameAsShipping" className="text-sm text-gray-600">
                            Billing address is same as shipping
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0FABCA] text-white py-3 rounded-lg hover:bg-[#0FABCA]/90"
                    >
                        Pay ৳ {(subtotal + shippingCost).toFixed(2)}
                    </button>
                </form>


            </div>

            {/* Confirmation Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p className="text-sm text-muted-foreground">This action will remove all items from your cart.</p>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="destructive" onClick={handleClearCart}>
                            Yes, Clear Cart
                        </Button>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Cart;