import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import { HistoryIcon } from "lucide-react";
import PurchaseHistoryMain from "./Purchase";
import PurchaseHistoryTable from "./PurchaseHistoryTable";

const PurchaseHistory = () => {
  const user = useAuthUser();
  const axiosSecure = useAxiosSecure();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/purchase/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

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
