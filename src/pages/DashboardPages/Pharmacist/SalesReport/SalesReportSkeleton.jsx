const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const CircleSkeleton = ({ size = "w-10 h-10" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${size}`} />
);

const SalesReportSkeleton = () => {
  return (
    <div className="px-7">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
        {/* Left section - title and badges */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="flex items-center gap-3">
            <CircleSkeleton />
            <SkeletonBox className="w-40 h-8" />
          </div>
          {/* Subtitle */}
          <SkeletonBox className="w-72 h-4" />
          {/* Badges */}
          <div className="flex items-center gap-2 mt-2">
            <SkeletonBox className="w-28 h-6 rounded-full" />
            <SkeletonBox className="w-24 h-6 rounded-full" />
          </div>
        </div>

        {/* Right section - buttons */}
        <div className="flex items-center gap-2">
          <SkeletonBox className="w-20 h-8 rounded-md" />
          <SkeletonBox className="w-20 h-8 rounded-md" />
          <SkeletonBox className="w-32 h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SalesReportSkeleton;
