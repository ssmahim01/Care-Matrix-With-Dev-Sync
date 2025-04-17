import { Card, CardContent } from "@/components/ui/card";

export const RevenueAllCards = ({
  totalRevenue,
  avgRevenuePerAppointment,
  avgRevenuePerDates,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700">
              Total Revenue
            </div>
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ৳{" "}
              {totalRevenue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ৳{" "}
              {avgRevenuePerAppointment.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>{" "}
            <div className="text-base font-semibold text-gray-700">
              Average Revenue By Appointments
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ৳{" "}
              {avgRevenuePerDates.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>{" "}
            <div className="text-base font-semibold text-gray-700">
              Average Revenue By Dates
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const RevenueAnalytics = () => {
  return <div></div>;
};
