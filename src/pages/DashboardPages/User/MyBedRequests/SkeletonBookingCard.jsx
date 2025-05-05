import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SkeletonBedBookingCard = () => {
  return (
    <Card className="w-full border shadow-sm border-[#e5e7eb] rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-row gap-3">
          <div className="skeleton h-24 w-28 sm:w-32 md:w-40 rounded-lg" />
          <div className="flex w-full flex-1 justify-between items-start">
            <div className="space-y-2">
              <div className="skeleton h-6 w-40 rounded" />
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-6 w-20 rounded" />
            </div>
            <div className="skeleton h-8 w-8 rounded-md" />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="skeleton h-4 w-48 rounded" />
            <div className="skeleton h-4 w-40 rounded" />
          </div>
          <Separator className="lg:hidden" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-52 rounded" />
            <div className="skeleton h-4 w-44 rounded" />
          </div>
        </div>

        <div className="mt-6">
          <div className="skeleton h-4 w-11/12 md:w-10/12 lg:w-6/12 xl:w-5/12 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonBedBookingCard;
