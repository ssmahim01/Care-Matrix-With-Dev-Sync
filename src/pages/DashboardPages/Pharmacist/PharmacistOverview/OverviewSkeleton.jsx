import OverviewCardsSkeleton from "../SalesReport/Skeleton/OverviewCardsSkeleton";
import TabContentSkeleton from "../SalesReport/Skeleton/TabContentSkeleton";

const OverviewSkeleton = () => {
  return (
    <div className="px-5">
      {/* Overview Cards */}
      <div>
        <OverviewCardsSkeleton />
      </div>
      {/* Contents */}
      <div className="mt-8">
        <TabContentSkeleton />
      </div>
    </div>
  );
};

export default OverviewSkeleton;
