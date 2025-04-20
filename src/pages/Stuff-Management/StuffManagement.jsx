import { Suspense } from "react"
import { StaffManagementSkeleton } from "./staff-management-skeleton"
import { StaffManagement } from "./staff-management"


const StuffManagement = () => {
  return (
    <div className="container mx-auto pb-6">
      <h1 className="text-3xl font-bold mb-6">Staff Management</h1>
      <Suspense fallback={<StaffManagementSkeleton />}>
        <StaffManagement />
      </Suspense>
    </div>
  )
}

export default StuffManagement