import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

// Skeleton Loader for AdministratorAnalytics (Area Chart)
const SkeletonAnalytics = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col md:flex-row md:items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-2 text-left">
          <div className="skeleton h-8 w-1/3 rounded" />
          <div className="skeleton h-4 w-1/5 rounded" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="relative h-[350px] w-full">
          {/* Chart Area */}
          <div className="skeleton h-[300px] w-full rounded" />
          {/* X-Axis Placeholder */}
          <div className="flex justify-between mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="skeleton h-4 w-12 rounded" />
            ))}
          </div>
          {/* Y-Axis Placeholder (Left and Right) */}
          <div className="absolute top-0 left-0 h-[300px] flex flex-col justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton h-4 w-8 rounded" />
            ))}
          </div>
          <div className="absolute top-0 right-0 h-[300px] flex flex-col justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton h-4 w-8 rounded" />
            ))}
          </div>
          {/* Legend Placeholder */}
          <div className="flex justify-center gap-4 mt-2">
            <div className="skeleton h-3 w-5 rounded" />
            <div className="skeleton h-3 w-5 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton Loader for Bar Chart Analytics (DoctorsPatientsChart)
const SkeletonBarChartAnalytics = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col lg:flex-row lg:items-center gap-2 space-y-0 border-b py-2">
        <div className="grid flex-1 gap-2 text-left">
          <div className="skeleton h-8 w-1/2 rounded" />
          <div className="skeleton h-4 w-1/4 rounded" />
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-8 py-3">
        <div className="relative h-[260px] w-full">
          {/* Chart Area */}
          <div className="h-[300px] w-full flex flex-col lg:flex-row items-start gap-2">
            {/* Y-Axis Placeholder (Doctor Names) */}
            <div className="flex flex-col justify-between h-[300px] w-full lg:w-1/4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="skeleton h-4 w-3/4 rounded" />
              ))}
            </div>
            {/* Bars Placeholder */}
            <div className="flex-1 h-[300px] w-full lg:w-3/4 flex flex-col justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton h-8 w-1/2 rounded"
                  style={{ width: `${Math.random() * 50 + 20}%` }}
                />
              ))}
            </div>
          </div>
          {/* X-Axis Placeholder (Patient Counts) */}
          {/* <div className="flex justify-between mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="skeleton h-4 w-8 rounded" />
            ))}
          </div> */}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 pt-8 pb-4 text-sm">
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </CardFooter>
    </Card>
  );
};

// Skeleton Loader for the Entire Overview Page
const SkeletonOverview = () => {
  return (
    <div className="space-y-4 px-7">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="border shadow-none border-[#e5e7eb] w-full py-6"
          >
            <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
              <div className="skeleton h-5 w-1/3 rounded" />
              <div className="skeleton h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent className="relative ml-1 -mt-3">
              <div className="skeleton h-8 w-1/4 rounded" />
              <div className="skeleton h-4 w-1/2 mt-2 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

     <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-5">
       {/* Charts & Analytics (Area Chart) */}
       <div className="my-6 lg:w-3/5 h-full">
        <SkeletonAnalytics />
      </div>

      {/* Bar Chart Analytics (Doctors and Patients) */}
      <div className="my-6 lg:w-2/5 h-full">
        <SkeletonBarChartAnalytics />
      </div>
     </div>

      {/* Recent Activities */}
      <div className="bg-white/80 shadow-md p-6 border-b border-gray-300 rounded-lg">
        <div className="skeleton h-6 w-1/4 rounded mb-4" />
        <ul className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="border-b pb-2">
              <div className="skeleton h-4 w-2/5 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkeletonOverview;