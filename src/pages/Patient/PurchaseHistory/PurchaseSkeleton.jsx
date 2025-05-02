import { Card } from "@/components/ui/card";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { HistoryIcon } from "lucide-react";

const PurchaseSkeleton = () => {
  return (
    <div className="px-5">
      <DashboardPagesHeader
        title="Orders History"
        subtitle="View all your pending, present orders and past purchases in one place!"
        icon={HistoryIcon}
      />
      {/* Tablist's */}
      <div className="mt-5 border bg-[#fefefe] border-border p-2 rounded-lg w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="skeleton w-full h-8" />
        <div className="skeleton w-full h-8" />
        <div className="skeleton w-full h-8" />
        <div className="skeleton w-full h-8" />
      </div>
      <div className="space-y-4 mt-4">
        {[...Array(4)].map((_, i) => (
          <Card className="overflow-hidden border shadow-sm border-[#e5e7eb] w-full rounded-lg">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4 mb-2">
                  <div>
                    <div className="skeleton h-4 w-32 mb-2" />
                    <div className="skeleton h-5 w-40" />
                  </div>
                  <div className="skeleton h-6 w-28 rounded-full" />
                </div>
                <div className="border-t mt-4 md:mt-0" />
                <div className="mt-2">
                  <div className="flex flex-col gap-2">
                    <div className="skeleton h-4 w-24" />
                    <div className="skeleton h-4 w-28" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="skeleton h-6 w-12 rounded-full" />
                    <div className="skeleton h-6 w-14 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-4 sm:border-l bg-muted/20">
                <div className="skeleton h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PurchaseSkeleton;
