import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCapsules } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const [cart] = useCart();

  const totalPrice =
    cart?.reduce((sum, item) => sum + item?.price * item?.quantity, 0) || 0;

  return (
    <DropdownMenu>
      {/* Cart Icon with Badge */}
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 hover:rounded-full duration-300 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-200">
          <ShoppingCart size={25} />
          <Badge className="absolute -top-1.5 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">
            {cart?.length || 0}
          </Badge>
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-64 p-0 shadow-none rounded-2xl border-t border-b-0" align="end">
        <Card>
          {/* Header */}
          <DropdownMenuLabel className="p-3">
            {cart.length ? (
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-gray-900">
                  Cart{" "}
                  <span className="text-xs">({cart?.length || 0} Items)</span>
                </span>
                <span className="text-sm text-gray-700 font-medium">
                  --- <span className="font-extrabold">৳</span>{" "}
                  {totalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <></>
            )}
          </DropdownMenuLabel>

          {cart.length ? <DropdownMenuSeparator className={"-mt-6"} /> : <></>}

          {/* Cart Items */}
          <CardContent className="p-0 md:px-3 -mt-4 shadow-none">
            {cart?.length > 0 ? (
              <ScrollArea className="max-h-48 h-fit overflow-y-auto pb-0 shadow-none">
                {cart.map((item) => (
                  <DropdownMenuItem
                    key={item._id}
                    className="flex items-center justify-between p-1 hover:bg-gray-50 shadow-none"
                  >
                    <Link
                      to={`/medicine/${item?.productId}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.medicineName}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.medicineName}
                        </p>
                        <p className="text-xs text-gray-500">{item.strength}</p>
                      </div>
                    </Link>
                    <div className="text-sm font-semibold text-gray-800">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            ) : (
              <div className="px-4 -mt-2 text-center">
                <p className="text-sm text-gray-500">Your Cart Is Empty</p>
                <CardFooter className="mt-2 mb-4">
                  <Link to="/pharmacy" className="w-full cursor-pointer">
                    <Button className="w-full cursor-pointer flex items-center gap-1">
                      <FaCapsules /> Buy Medicine
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            )}
          </CardContent>

          {/* Footer with View Cart Button */}
          {cart?.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <CardFooter className="px-4 pb-4 pt-3 -mt-6">
                <Link
                  to="/dashboard/patient/manage-cart"
                  className="w-full cursor-pointer"
                >
                  <Button className="w-full cursor-pointer">View Cart</Button>
                </Link>
              </CardFooter>
            </>
          )}
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
