import { PrescriptionTable } from "@/components/ManagePrescription/PrescriptionTable";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";

function ManagePrescription() {
  return (
    <div className="p-2 md:w-11/12 mx-auto ">
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
