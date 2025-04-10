// CustomerModal.jsx
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CustomerModal = ({ customer }) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: discountVoucher = 0, isLoading: discountLoading } = useQuery({
    queryKey: ["discount", customer?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/users/discount/${customer?.email}`);
      return res.data.discountVoucher;
    },
  });
  console.log(discountVoucher);

  const {
    data: profile = {},
    isLoading: profileLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", customer?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/individual/${customer.uid}`);
      return res.data;
    },
  });

  // Set initial discount from profile data, default to "0" if not present
  const [discount, setDiscount] = useState(() => {
    return discountVoucher ? String(discountVoucher) : "0";
  });
  const [loading, setLoading] = useState(false);

  // Sync discount state
  useEffect(() => {
    if (discountVoucher !== undefined) {
      setDiscount(String(discountVoucher));
    }
  }, [discountVoucher]);

  // Handle discount change
  const handleDiscountChange = async (value) => {
    setDiscount(value);
    setLoading(true);
    try {
      await toast.promise(
        axiosSecure.patch(`/users/update-discount/${customer.email}`, {
          discount: value,
        }),
        {
          loading: "updating discount",
          success: <b>Discount Updated</b>,
          error: (error) => error.message,
        }
      );
      await refetch();
    } catch (error) {
      console.error("Failed to update discount:", error);
      setDiscount(String(profile?.discountBoucher || "0"));
    } finally {
      setLoading(false);
    }
  };
  //   console.log(discount);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Customer Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={customer?.photo}
            alt={customer?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h3 className="text-lg font-semibold">{customer?.name}</h3>
            <p className="text-sm text-muted-foreground">{customer?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* <div>
            <p className="text-sm text-muted-foreground">User ID</p>
            <p className="font-medium">{customer?.uid.slice(0, 20)}...</p>
          </div> */}
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{profile?.role || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{profile?.phoneNumber || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="font-medium">{customer?.totalOrders || 0}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="font-medium">
              ৳ {customer?.totalSpent?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Created At</p>
            <p className="font-medium">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Login</p>
            <p className="font-medium">
              {profile?.lastLoginAt
                ? new Date(profile.lastLoginAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Discount Voucher</p>
            <p className="font-medium">{discount === "null" ? 0 : discount}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Set Discount Voucher
            </p>
            <Select
              value={discount}
              onValueChange={handleDiscountChange}
              disabled={profileLoading || loading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={loading ? "Updating..." : "Select discount"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default CustomerModal;
