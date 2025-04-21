import { PrescriptionTable } from "@/components/ManagePrescription/PrescriptionTable";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";

function ManagePrescription() {
  return (
    <div className="px-4 md:px-7">
      <DashboardPagesHeader
        title={"Manage Prescriptions"}
        subtitle={
          "Review patient information and prescribe medication for approved patients."
        }
      />

      <PrescriptionTable />
    </div>
  );
}

export default ManagePrescription;
