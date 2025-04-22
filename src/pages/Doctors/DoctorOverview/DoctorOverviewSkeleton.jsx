import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonBox } from "@/pages/DashboardPages/Pharmacist/SalesReport/SalesReportSkeleton";

const DoctorOverviewSkeleton = () => {
  return (
    <div className="px-7">
      {/* Profile Skeleton */}
      <Card className="w-full border shadow-sm border-[#e5e7eb] rounded-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-md bg-gray-200  skeleton" />
            </div>

            {/* Details Skeleton */}
            <div className="flex-grow space-y-4">
              {/* Name & Title */}
              <div>
                <div className="h-6 w-40 bg-gray-200  skeleton rounded" />
                <div className="h-4 w-60 bg-gray-200  skeleton mt-2 rounded" />
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-gray-200  skeleton rounded-full"
                  />
                ))}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <div className="h-4 w-11/12 bg-gray-200  skeleton rounded" />
                <div className="h-4 w-5/6 bg-gray-200  skeleton rounded" />
                <div className="h-4 w-4/6 bg-gray-200  skeleton rounded" />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 w-full md:w-11/12 lg:w-10/12">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-300 rounded" />
                  <div className="h-4 w-32 bg-gray-200  skeleton rounded" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-300 rounded" />
                  <div className="h-4 w-24 bg-gray-200  skeleton rounded" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-300 rounded" />
                  <div className="h-4 w-24 bg-gray-200  skeleton rounded" />
                </div>

                <div className="flex items-center gap-2 md:col-span-3">
                  <div className="h-4 w-4 bg-gray-300 rounded" />
                  <div className="h-4 w-40 bg-gray-200  skeleton rounded" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* TabList Skeleton */}
      <div className="mt-8 border bg-[#fefefe] border-border p-2 rounded-lg w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonBox className="w-full h-8 skeleton" />
        <SkeletonBox className="w-full h-8 skeleton" />
      </div>
      {/* Overview Cards */}
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 3, 4].map((_, i) => (
          <Card
            key={i}
            className="border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg animate-pulse"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium text-muted-foreground skeleton">
                <div className="h-4 w-24 bg-gray-200 skeleton rounded" />
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-300 skeleton" />
            </CardHeader>
            <CardContent className="-mt-6">
              <div className="h-6 w-20 bg-gray-200 skeleton rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Bottom Cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 3].map((_, i) => (
          <Card
            key={i}
            className="border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg animate-pulse"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium text-muted-foreground skeleton">
                <div className="h-4 w-24 bg-gray-200 skeleton rounded" />
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-300 skeleton" />
            </CardHeader>
            <CardContent className="-mt-6">
              <div className="h-6 w-20 bg-gray-200 skeleton rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorOverviewSkeleton;
