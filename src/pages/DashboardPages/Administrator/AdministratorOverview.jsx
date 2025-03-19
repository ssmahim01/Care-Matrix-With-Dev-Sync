import { AdministratorAnalytics } from "@/components/AreaChart/AdministratorAnalytics";
import {
  FaUserMd,
  FaProcedures,
  FaCalendarCheck,
  FaDollarSign,
} from "react-icons/fa";

const chartData = [
  { date: "2024-04-01", patients: 222, earnings: 1050 },
  { date: "2024-04-02", patients: 97, earnings: 1080 },
  { date: "2024-04-03", patients: 167, earnings: 1020 },
  { date: "2024-04-04", patients: 242, earnings: 2060 },
  { date: "2024-04-05", patients: 373, earnings: 2090 },
  { date: "2024-04-06", patients: 301, earnings: 3040 },
  { date: "2024-04-07", patients: 245, earnings: 1080 },
  { date: "2024-04-08", patients: 409, earnings: 3020 },
  { date: "2024-04-09", patients: 59, earnings: 1010 },
  { date: "2024-04-10", patients: 261, earnings: 1090 },
  { date: "2024-04-11", patients: 327, earnings: 3050 },
  { date: "2024-04-12", patients: 292, earnings: 2010 },
  { date: "2024-04-13", patients: 342, earnings: 3080 },
  { date: "2024-04-14", patients: 137, earnings: 2020 },
  { date: "2024-04-15", patients: 120, earnings: 1070 },
  { date: "2024-04-16", patients: 138, earnings: 1090 },
  { date: "2024-04-17", patients: 446, earnings: 3060 },
  { date: "2024-04-18", patients: 364, earnings: 4010 },
  { date: "2024-04-19", patients: 243, earnings: 1080 },
  { date: "2024-04-20", patients: 89, earnings: 1050 },
  { date: "2024-04-21", patients: 137, earnings: 2000 },
  { date: "2024-04-22", patients: 224, earnings: 1070 },
  { date: "2024-04-23", patients: 138, earnings: 2030 },
  { date: "2024-04-24", patients: 387, earnings: 2090 },
  { date: "2024-04-25", patients: 215, earnings: 2050 },
  { date: "2024-04-26", patients: 75, earnings: 1030 },
  { date: "2024-04-27", patients: 383, earnings: 4020 },
  { date: "2024-04-28", patients: 122, earnings: 1080 },
  { date: "2024-04-29", patients: 315, earnings: 2040 },
  { date: "2024-04-30", patients: 454, earnings: 3080 },
  { date: "2024-05-01", patients: 165, earnings: 2020 },
  { date: "2024-05-02", patients: 293, earnings: 3010 },
  { date: "2024-05-03", patients: 247, earnings: 1090 },
  { date: "2024-05-04", patients: 385, earnings: 4020 },
  { date: "2024-05-05", patients: 481, earnings: 3090 },
  { date: "2024-05-06", patients: 498, earnings: 5020 },
  { date: "2024-05-07", patients: 388, earnings: 3000 },
  { date: "2024-05-08", patients: 149, earnings: 2010 },
  { date: "2024-05-09", patients: 227, earnings: 1080 },
  { date: "2024-05-10", patients: 293, earnings: 3030 },
  { date: "2024-05-11", patients: 335, earnings: 2070 },
  { date: "2024-05-12", patients: 197, earnings: 2040 },
  { date: "2024-05-13", patients: 197, earnings: 1060 },
  { date: "2024-05-14", patients: 448, earnings: 4090 },
  { date: "2024-05-15", patients: 473, earnings: 3080 },
  { date: "2024-05-16", patients: 338, earnings: 4000 },
  { date: "2024-05-17", patients: 499, earnings: 4020 },
  { date: "2024-05-18", patients: 315, earnings: 3050 },
  { date: "2024-05-19", patients: 235, earnings: 1080 },
  { date: "2024-05-20", patients: 177, earnings: 2030 },
  { date: "2024-05-21", patients: 82, earnings: 1040 },
  { date: "2024-05-22", patients: 81, earnings: 1020 },
  { date: "2024-05-23", patients: 252, earnings: 2090 },
  { date: "2024-05-24", patients: 294, earnings: 2020 },
  { date: "2024-05-25", patients: 201, earnings: 2050 },
  { date: "2024-05-26", patients: 213, earnings: 1070 },
  { date: "2024-05-27", patients: 420, earnings: 4060 },
  { date: "2024-05-28", patients: 233, earnings: 1090 },
  { date: "2024-05-29", patients: 78, earnings: 1030 },
  { date: "2024-05-30", patients: 340, earnings: 2080 },
  { date: "2024-05-31", patients: 178, earnings: 2030 },
  { date: "2024-06-01", patients: 178, earnings: 2000 },
  { date: "2024-06-02", patients: 470, earnings: 4010 },
  { date: "2024-06-03", patients: 103, earnings: 1060 },
  { date: "2024-06-04", patients: 439, earnings: 3080 },
  { date: "2024-06-05", patients: 88, earnings: 1040 },
  { date: "2024-06-06", patients: 294, earnings: 2050 },
  { date: "2024-06-07", patients: 323, earnings: 3070 },
  { date: "2024-06-08", patients: 385, earnings: 3020 },
  { date: "2024-06-09", patients: 438, earnings: 4080 },
  { date: "2024-06-10", patients: 155, earnings: 2000 },
  { date: "2024-06-11", patients: 92, earnings: 1050 },
  { date: "2024-06-12", patients: 492, earnings: 4020 },
  { date: "2024-06-13", patients: 81, earnings: 1030 },
  { date: "2024-06-14", patients: 426, earnings: 3080 },
  { date: "2024-06-15", patients: 307, earnings: 3050 },
  { date: "2024-06-16", patients: 371, earnings: 3010 },
  { date: "2024-06-17", patients: 475, earnings: 5020 },
  { date: "2024-06-18", patients: 107, earnings: 1070 },
  { date: "2024-06-19", patients: 341, earnings: 2090 },
  { date: "2024-06-20", patients: 408, earnings: 4050 },
  { date: "2024-06-21", patients: 169, earnings: 2010 },
  { date: "2024-06-22", patients: 317, earnings: 2070 },
  { date: "2024-06-23", patients: 480, earnings: 5030 },
  { date: "2024-06-24", patients: 132, earnings: 1080 },
  { date: "2024-06-25", patients: 141, earnings: 1090 },
  { date: "2024-06-26", patients: 434, earnings: 3080 },
  { date: "2024-06-27", patients: 448, earnings: 4090 },
  { date: "2024-06-28", patients: 149, earnings: 2000 },
  { date: "2024-06-29", patients: 103, earnings: 1060 },
  { date: "2024-06-30", patients: 446, earnings: 4000 },
];

const AdministratorOverview = () => {
  return (
    <div className="space-y-4">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="bg-[#effdef] hover:shadow-lg shadow-md p-4 rounded-lg flex items-center space-x-4">
          <FaUserMd className="text-sky-600 text-3xl" />
          <div>
            <p className="text-gray-500 font-medium">Total Doctors</p>
            <h2 className="text-xl font-bold hover:animate-pulse">120</h2>
          </div>
        </div>
        <div className="bg-white shadow-md hover:shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaProcedures className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-500 font-medium">Total Patients</p>
            <h2 className="text-xl font-bold hover:animate-pulse">850</h2>
          </div>
        </div>
        <div className="bg-[#effdf5] shadow-md hover:shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaCalendarCheck className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-500 font-medium">Appointments Today</p>
            <h2 className="text-xl font-bold hover:animate-pulse">50</h2>
          </div>
        </div>
        <div className="bg-white/80 shadow-md hover:shadow-lg p-4 rounded-lg flex items-center space-x-4">
          <FaDollarSign className="text-purple-600 text-3xl" />
          <div>
            <p className="text-gray-500 font-medium">Total Earnings</p>
            <h2 className="text-xl font-bold hover:animate-pulse">$45,000</h2>
          </div>
        </div>
      </div>

      {/* Charts & Analytics */}
      <div className="my-6">
        {/* <ResponsiveContainer width="100%" height={300}> */}
          <AdministratorAnalytics chartData={chartData} />
        {/* </ResponsiveContainer> */}
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 shadow-md p-6 border-b border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-3">
          <li className="border-b pb-2">
            🟢 New doctor Dr. Smith joined the hospital
          </li>
          <li className="border-b pb-2">
            🟢 5 new patient registrations today
          </li>
          <li className="border-b pb-2">🔴 Appointment #1234 canceled</li>
          <li>🟢 Hospital earnings updated</li>
        </ul>
      </div>
      <div className="mt-6 aspect-video rounded-xl bg-muted/50">
        <img
          src="/kader.jpg"
          className="w-full lg:min-h-screen md:min-h-[420px] min-h-[320px]"
          alt="Image of Obaydul Kader"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

export default AdministratorOverview;
