import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import { HistoryIcon } from "lucide-react";
import PurchaseHistoryMain from "./Purchase";
import PurchaseHistoryTable from "./PurchaseHistoryTable";
import PurchaseSkeleton from "./PurchaseSkeleton";
import { toast } from "sonner";

const PurchaseHistory = () => {
  const user = useAuthUser();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/purchase/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  if (isError) {
    const errorMessage =
      error?.message ||
      "An unexpected error occurred while fetching the doctor data";
    return toast.error("Error While Fetching Data!", {
      description: errorMessage,
      position: "top-right",
    });
  }
  if (isLoading) return <PurchaseSkeleton />;

  return (
    <div className="px-5">
      <DashboardPagesHeader
        title="Orders History"
        subtitle="View all your pending, present orders and past purchases in one place!"
        icon={HistoryIcon}
      />

      {/* Purchase History Table */}
      {/* <PurchaseHistoryTable purchaseHistory={orders} isLoading={isLoading} /> */}

      {/* Purchase History Main Content */}
      <PurchaseHistoryMain ordersData={orders} />
    </div>
  );
};

export default PurchaseHistory;
