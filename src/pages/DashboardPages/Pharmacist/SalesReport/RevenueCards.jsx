import { Card, CardContent } from "@/components/ui/card";

const RevenueCards = ({
  avgDailyRevenue,
  avgOrderValue,
  avgItemValue,
  totalItems,
}) => {
  return (
    <>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700">
              Average Daily Revenue
            </div>
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ৳{" "}
              {avgDailyRevenue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700">
              Average Order Value
            </div>
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ৳{" "}
              {avgOrderValue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700">
              Average Item Value
            </div>
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ৳{" "}
              {avgItemValue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700">
              Total Items Sold
            </div>
            <div className="text-3xl font-extrabold mt-1 text-primary">
              {totalItems.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RevenueCards;
