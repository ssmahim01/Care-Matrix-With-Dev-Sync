import RequestForm from "@/pages/RequestForm/RequestForm";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CornerUpRight } from "lucide-react";

const RoleRequest = () => {
  return (
    <div className="space-y-4 px-5">
      {/* Heading */}
      <DashboardPagesHeader
        title={"Upgrade Role"}
        subtitle={"Request for change your role"}
        icon={CornerUpRight}
      />

      {/* Request Form */}
      <RequestForm />
    </div>
  );
};

export default RoleRequest;
