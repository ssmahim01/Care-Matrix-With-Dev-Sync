import OverviewCardsSkeleton from "../Pharmacist/SalesReport/Skeleton/OverviewCardsSkeleton";
import ReceptHeaderSkeleton from "./Skeleton/ReceptHeaderSkeleton";
import ContentSkeleton from "./Skeleton/ContentSkeleton";

export const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

export const CircleSkeleton = ({ size = "w-10 h-10" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${size}`} />
);

const ReceptionistOverviewSkeleton = () => {
  return (
    <div className="px-7">
      {/* Header */}
      <ReceptHeaderSkeleton />
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
        <ContentSkeleton />
      </div>
    </div>
  );
};

export default ReceptionistOverviewSkeleton;
