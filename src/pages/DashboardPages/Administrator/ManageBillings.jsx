import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

import { motion } from "framer-motion";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CreditCard } from "lucide-react";
import PaymentsTable from "./Billing&Payments/PaymentsTable";
import Swal from "sweetalert2";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function ManageBillings() {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch payment data
  const {
    data: paymentsData = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments", search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/all?search=${search}`);
      return data;
    },
  });

  // Handle payment deletion
  const handlePaymentDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the payment record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/payments/delete/${id}`);
        if (data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Payment record has been deleted successfully!",
            icon: "success",
          });
        }
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the payment record!",
          icon: "error",
          background: "#ffffff",
          color: "#000000",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  if (isError) {
    return (
      <div className="p-7">
        <DashboardPagesHeader
          title="Payment Records"
          subtitle="View and Manage All Payment Records"
          icon={CreditCard}
        />
        <div className="text-center text-red-500">
          Error loading payments: {error.message || "Please try again later."}
        </div>
      </div>
    );
  }

  return (
    <div className="p-7">
      <div className="mb-4">
        <DashboardPagesHeader
          title="Payment Records"
          subtitle="View and Manage All Payment Records"
          icon={CreditCard}
        />

        {/* search options  */}
        <div className="flex justify-end items-center gap-4">
          <div className="relative md:w-2/5">
            <input
              className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring  ring-gray-500"
              placeholder="Search Patient By Name or number..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          </div>
          <div>
            <Button onClick={() => setSearch("")} className={"cursor-pointer"}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <PaymentsTable
          paymentsData={paymentsData}
          isLoading={isLoading}
          handlePaymentDelete={handlePaymentDelete}
        />
      </motion.div>
    </div>
  );
}

export default ManageBillings;
