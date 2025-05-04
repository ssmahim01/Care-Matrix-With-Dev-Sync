import { PrescriptionTable } from "@/components/ManagePrescription/PrescriptionTable";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { File } from "lucide-react";

function ManagePrescription() {
  return (
    <div className="px-4 md:px-7">
      <DashboardPagesHeader
        title={"Manage Prescriptions"}
        subtitle={
          "Review patient information and prescribe medication for approved patients."
        }
        icon={File}
      />

      <PrescriptionTable />
    </div>
  );
}

export default ManagePrescription;
