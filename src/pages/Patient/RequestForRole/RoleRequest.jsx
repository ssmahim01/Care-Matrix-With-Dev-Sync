import RequestForm from "@/pages/RequestForm/RequestForm";
import { CornerUpRight } from "lucide-react";

const RoleRequest = () => {
  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="mb-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-3">
          <CornerUpRight className="text-4xl text-gray-800" />
            Upgrade Role
          </h2>
          <p className="text-gray-600 text-base ml-1 font-medium whitespace-pre-line">
            Request for change the role
          </p>
        </div>
      </div>

      {/* Request Form */}
      <RequestForm />
    </div>
  );
};

export default RoleRequest;
