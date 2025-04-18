import { Card } from "@/components/ui/card";

const DoctorInsights = ({ doctorInsights }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctorInsights?.map((doctor) => (
        <Card className="rounded-2xl p-6 shadow-md bg-white space-y-2 w-full sm:w-[300px]">
          <h2 className="text-xl font-semibold">👨‍⚕️ {doctor?.doctor}</h2>
          <p className="text-gray-600">{doctor?.doctorTitle}</p>
          <div className="flex justify-between text-sm mt-4">
            <span>📅 Appointments</span>
            <span>{doctor?.appointments}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>💰 Total Revenue</span>
            <span>৳ {doctor?.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>📊 Avg. Fee</span>
            <span>৳ {doctor?.avgFee.toFixed(2)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DoctorInsights;
