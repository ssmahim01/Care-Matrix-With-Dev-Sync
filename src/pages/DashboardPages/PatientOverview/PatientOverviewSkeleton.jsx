import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBox } from "../Pharmacist/SalesReport/SalesReportSkeleton";

const PatientOverviewSkeleton = () => {
  return (
    <div className="px-7">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((_, i) => (
          <Card
            key={i}
            className="border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="h-4 w-32 bg-gray-300 rounded-md skeleton" />
              <div className="h-4 w-4 bg-gray-300 rounded-full skeleton" />
            </CardHeader>
            <CardContent className="-mt-3">
              <div className="h-8 w-20 bg-gray-300 rounded-md skeleton mt-2" />
              <div className="h-4 w-40 bg-gray-300 rounded-md skeleton mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* TabList */}
      <div className="mt-8 border bg-[#fefefe] border-border p-2 rounded-lg w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonBox className="w-full h-8" />
        <SkeletonBox className="w-full h-8" />
        <SkeletonBox className="w-full h-8" />
        <SkeletonBox className="w-full h-8" />
      </div>
      {/* Appointment Tab */}
      <Card className="mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg">
        <CardHeader>
          <div className="h-6 w-48 bg-gray-300 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-gray-300 rounded-md animate-pulse mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Patient Name */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse" />
              </div>
              {/* Date */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse" />
              </div>
              {/* Time */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Doctor */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse" />
              </div>
              {/* Specialty */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-4 w-28 bg-gray-300 rounded-md animate-pulse" />
              </div>
              {/* Fee */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="pt-6 border-t">
            <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-300 rounded-md animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-300 rounded-md animate-pulse mt-1" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-8">
            <div className="h-10 w-28 bg-gray-300 rounded-md animate-pulse" />
            <div className="h-10 w-28 bg-gray-300 rounded-md animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientOverviewSkeleton;
