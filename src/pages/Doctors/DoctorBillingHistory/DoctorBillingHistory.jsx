import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

import { motion } from "framer-motion";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CreditCard } from "lucide-react";

import Swal from "sweetalert2";
import { IoIosSearch } from "react-icons/io";
import { FiCreditCard } from "react-icons/fi";
import DoctorBillingTable from "./DoctorBillingTable";
import { useAuthUser } from "@/redux/auth/authActions";

function DoctorBillingHistory() {
    const user = useAuthUser();
  const axiosSecure = useAxiosSecure();
  

  // Fetch payment data
  const {
    data: paymentsData = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Doctor-payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });

  


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
     <div className="flex flex-col md:flex-row items-center justify-between mb-4">
     <DashboardPagesHeader
        title="My All Time Billing History"
        subtitle="Track all your past payments, invoices, and billing summaries in one place."
        icon={FiCreditCard}
      />


        {/* search options  */}

        <div className="relative md:w-2/5 flex ">
          <input
            className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search Patient by name or number..."
            // onChange={(e) => setSearch(e.target.value)}
            // value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />

          {/* shortcut hint */}
          {/* <div className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-100 p-[6px] rounded-md text-gray-500">
            Ctrl + E
          </div> */}
        </div>



     </div>


      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <DoctorBillingTable
          paymentsData={paymentsData}
          isLoading={isLoading}
       
       
        />
      </motion.div>
    </div>
  );
}

export default  DoctorBillingHistory;