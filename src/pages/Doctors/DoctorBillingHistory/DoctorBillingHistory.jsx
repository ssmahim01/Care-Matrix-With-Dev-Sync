import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { FiCreditCard } from "react-icons/fi";

const DoctorBillingHistory = () => {
  return (
    <div className="px-7">
      <DashboardPagesHeader
        title="My All Time Billing History"
        subtitle="Track all your past payments, invoices, and billing summaries in one place."
        icon={FiCreditCard}
      />
    </div>
  );
};

export default DoctorBillingHistory;
