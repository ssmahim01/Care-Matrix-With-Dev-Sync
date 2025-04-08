import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBox } from "../SalesReportSkeleton";

const OverviewCardsSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
        <CardHeader className="flex flex-row justify-start items-center space-y-0 relative">
          {/* Icon skeleton */}
          <div className="h-8 w-8 rounded-full bg-emerald-100 animate-pulse" />
          {/* Title skeleton */}
          <SkeletonBox className="h-5 w-28 mr-3" />
        </CardHeader>
        <CardContent className="relative ml-2 -mt-3">
          {/* Revenue value skeleton */}
          <SkeletonBox className="h-8 w-32 mb-2.5" />
          {/* Badge skeleton */}
          <SkeletonBox className="h-4 w-24 rounded-full" />
        </CardContent>
      </Card>
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
        <CardHeader className="flex flex-row justify-start items-center space-y-0 relative">
          {/* Icon skeleton */}
          <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
          {/* Title skeleton */}
          <SkeletonBox className="h-5 w-28 mr-3" />
        </CardHeader>
        <CardContent className="relative ml-2 -mt-3">
          {/* Revenue value skeleton */}
          <SkeletonBox className="h-8 w-32 mb-2.5" />
          {/* Badge skeleton */}
          <SkeletonBox className="h-4 w-24 rounded-full" />
        </CardContent>
      </Card>
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
        <CardHeader className="flex flex-row justify-start items-center space-y-0 relative">
          {/* Icon skeleton */}
          <div className="h-8 w-8 rounded-full bg-orange-100 animate-pulse" />
          {/* Title skeleton */}
          <SkeletonBox className="h-5 w-28 mr-3" />
        </CardHeader>
        <CardContent className="relative ml-2 -mt-3">
          {/* Revenue value skeleton */}
          <SkeletonBox className="h-8 w-32 mb-2.5" />
          {/* Badge skeleton */}
          <SkeletonBox className="h-4 w-24 rounded-full" />
        </CardContent>
      </Card>
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
        <CardHeader className="flex flex-row justify-start items-center space-y-0 relative">
          {/* Icon skeleton */}
          <div className="h-8 w-8 rounded-full bg-emerald-100 animate-pulse" />
          {/* Title skeleton */}
          <SkeletonBox className="h-5 w-28 mr-3" />
        </CardHeader>
        <CardContent className="relative ml-2 -mt-3">
          {/* Revenue value skeleton */}
          <SkeletonBox className="h-8 w-32 mb-2.5" />
          {/* Badge skeleton */}
          <SkeletonBox className="h-4 w-24 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCardsSkeleton;
