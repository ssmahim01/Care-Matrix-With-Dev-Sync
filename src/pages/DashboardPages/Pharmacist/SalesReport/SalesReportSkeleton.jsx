import OverviewCardsSkeleton from "./Skeleton/OverviewCardsSkeleton";
import SalesHeaderSkeleton from "./Skeleton/SalesHeaderSkeleton";
import TabContentSkeleton from "./Skeleton/TabContentSkeleton";

export const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

export const CircleSkeleton = ({ size = "w-10 h-10" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${size}`} />
);

const SalesReportSkeleton = () => {
  return (
    <div className="px-7">
      {/* Header */}
      <SalesHeaderSkeleton />
      {/* Tablist's */}
      <div className="mt-6 border bg-[#fefefe] border-border  p-2 rounded-lg w-fit flex items-center gap-3">
        <SkeletonBox className="w-22 h-8" />
        <SkeletonBox className="w-26 h-8" />
        <SkeletonBox className="w-32 h-8" />
      </div>
      {/* Overview Cards */}
      <div className="mt-6">
        <OverviewCardsSkeleton />
      </div>
      {/* Contents */}
      <div className="mt-6">
        <TabContentSkeleton />
      </div>
    </div>
  );
};

export default SalesReportSkeleton;
