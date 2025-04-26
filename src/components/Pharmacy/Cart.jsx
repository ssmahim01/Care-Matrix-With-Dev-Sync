import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import { useAuthUser } from "@/redux/auth/authActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";
import emptyCart from "../../assets/Images/empty-cart.jpg";
import CartCheckoutForm from "../CheckoutForm/CartCheckoutForm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts, divisionDistricts, divisions } from "@/lib/address";
import useDiscount from "@/hooks/useDiscount";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const globalStyles = {
  inputStyles:
    "w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5",
};

const Cart = () => {
  const user = useAuthUser();
  const [cart, , refetch] = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = cart.length ? 60 : 0;
  const [loadingClientSecret, setLoadingClientSecret] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [discount, discountLoading] = useDiscount();

  // Use discount directly as a percentage (e.g., 20 means 20%)
  const discountPercentage = Number(discount) || 0; // Ensure it’s a number, default to 0
  const discountAmount = subtotal * (discountPercentage / 100); // Calculate discount amount
  const totalWithDiscount = subtotal - discountAmount + shippingCost; // Apply discount to total

  // Log for debugging
  // console.log("Discount:", discount);

  // Form values
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [address, setAddress] = useState("");

  // Get filtered districts based on selected division
  const filteredDistricts = division ? divisionDistricts[division] : districts;

  const customerInfo = {
    name: name || user?.displayName,
    email: email || user?.email,
    phone,
    district,
    division,
    address,
  };

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
    await toast.promise(
      axiosSecure.patch(`/carts/quantity/${itemId}`, {
        quantity: updatedQuantity,
      }),
      {
        loading: "Updating quantity...",
        success: <b>Quantity Added!</b>,
        error: (error) => error.message,
      }
    );
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
        axiosSecure.patch(`/carts/quantity/${itemId}`, {
          quantity: updatedQuantity,
        }),
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
        error: (error) => error.message,
      });
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handlePaymentSuccess = () => {
    // Clear cart after successful payment
    axiosSecure
      .delete(`/carts/clear/${user?.email}`)
      .then(() => {
        refetch();
      })
      .catch((err) => console.error("Error clearing cart:", err));
  };

  useEffect(() => {
    const initializePaymentIntent = async () => {
      if (!subtotal || totalWithDiscount <= 0) return;

      setLoadingClientSecret(true);
      try {
        const response = await axiosSecure.post(
          "/carts/create-payment-intent",
          {
            price: totalWithDiscount, // Use discounted total for payment
          }
        );
        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          throw new Error("No client secret received");
        }
      } catch (err) {
        console.error("Error fetching client secret:", err);
        toast.error("Failed to initialize payment system");
      } finally {
        setLoadingClientSecret(false);
      }
    };

    initializePaymentIntent();
  }, [subtotal, shippingCost, discountPercentage, axiosSecure]); // Add discountPercentage to dependencies

  const parcel = {
    price: totalWithDiscount, // Update parcel price with discount
    parcelType: "Medicine Purchase",
    _id: Date.now().toString(),
  };

  const appearance = { theme: "stripe" };
  const options = clientSecret ? { clientSecret, appearance } : null;

  return (
    <div className="w-full flex flex-col gap-8 md:gap-0 md:flex-row px-7">
      {/* Left Column - Order Summary */}
      <div className="bg-gray-50 rounded-md p-4 md:p-8 flex-1">
        <div>
          <h2 className="text-[1.2rem] text-gray-700 font-semibold mb-6">
            Your order
          </h2>
          <div className="border border-gray-200 rounded-md">
            {cart.length ? (
              cart?.map((item, idx) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                  }}
                  viewport={{ once: true }}
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
                        <b className="text-gray-800">{item.strength}</b>
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
                  <span className="font-medium">
                    ৳ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </motion.div>
              ))
            ) : (
              <img
                src={emptyCart}
                alt="empty cart"
                className="border rounded-md"
              />
            )}
          </div>

          {/* Pricing Summary */}
          <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <span className="text-[1rem] text-gray-500">Subtotal</span>
              <span className="text-[1rem] font-medium text-gray-800">
                ৳ {subtotal.toFixed(2)}
              </span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="text-[1rem]">
                  Discount ({discountPercentage}%)
                </span>
                <span className="text-[1rem] font-medium">
                  -৳ {discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[1rem] text-gray-500">Shipping Cost</span>
              <span className="text-[1rem] font-medium text-gray-800">
                ৳ {shippingCost}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-5 font-medium">
              <span>Total</span>
              <span className="text-[1rem] font-medium text-gray-800">
                ৳ {totalWithDiscount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Clear Cart Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-5 mt-5"
          >
            <Link to={"/pharmacy"}>
              <Button className="cursor-pointer">Continue Shopping</Button>
            </Link>
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-red-500 hover:bg-red-400 text-white cursor-pointer"
            >
              Clear Cart <FaCartShopping />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Right Column - Checkout Form (Sticky on large devices) */}
      <div className="flex-1 md:px-8 lg:sticky lg:top-16 lg:self-start">
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              readOnly
              placeholder="Enter Your Name"
              defaultValue={name || user?.displayName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              readOnly
              placeholder="user@gmail.com"
              defaultValue={user?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex gap-2 items-center">
              <div className="border rounded px-3 py-[5px] border-gray-200 w-[130px]">
                <h1 value="bd">🇧🇩 +880</h1>
              </div>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter Your Phone Number!"
                defaultValue={user?.mobile}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          {/* Division & District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Division */}
            <div className="space-y-2">
              <Label htmlFor="division">Division</Label>
              <Select
                onValueChange={(value) => {
                  setDivision(value);
                  setDistrict(""); // Reset district when division changes
                }}
                value={division}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* District */}
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select
                onValueChange={setDistrict}
                value={district}
                disabled={!division} // Disable until division is selected
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      division ? "Select District" : "Select Division First"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {filteredDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Address Input */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="billingAddress">Address</Label>
            <Input
              id="billingAddress"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Enter Your Location"
            />
          </div>
          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Payment method</Label>
            {loadingClientSecret || discountLoading ? (
              <p className="text-gray-500">Loading payment options...</p>
            ) : clientSecret === null ? (
              <p className="text-gray-500">Preparing payment options...</p>
            ) : clientSecret === "" ? (
              <p className="text-red-500">Failed to load payment options</p>
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <CartCheckoutForm
                  customerInfo={customerInfo}
                  refetch={refetch}
                  parcel={parcel}
                  cartItems={cart}
                  discountPercentage={discountPercentage}
                  clientSecret={clientSecret}
                  onPaymentSuccess={handlePaymentSuccess}
                  discountAmount={discountAmount}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-sm text-muted-foreground">
              This action will remove all items from your cart.
            </p>
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
