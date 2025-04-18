import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  BarChart,
  Clock,
  Medal,
  Shield,
  Star,
  User,
} from "lucide-react";

const PatientInsights = ({ patients }) => {
  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Patient Insights
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Overview of patient engagement, spending patterns, and appointment
          trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Patient Table */}
        <Table className="bg-base-100 rounded-lg shadow-md mt-2">
          <TableCaption>A List Of Top Patients</TableCaption>
          <TableHeader>
            <TableRow className="bg-base-200 hover:bg-base-200">
              <TableHead></TableHead>
              <TableHead className="px-6">Name</TableHead>
              <TableHead className="px-6">Email</TableHead>
              <TableHead className="px-6">Total Spent</TableHead>
              <TableHead className="px-6 text-xs">Appointments</TableHead>
              <TableHead className="px-6 text-xs">Avg Spend/Visit</TableHead>
              <TableHead className="px-6 text-xs">Loyalty Tier</TableHead>
              <TableHead className="px-6 text-xs">Engagement</TableHead>
              <TableHead className="px-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients?.map((patient, idx) => {
              const avgSpend = (
                patient?.totalSpent / patient?.appointments
              ).toFixed(2);
              const loyaltyTier =
                patient?.totalSpent > 3000
                  ? "Gold"
                  : patient?.totalSpent > 2000
                  ? "Silver"
                  : "Bronze";
              const engagementScore =
                patient?.appointments > 20
                  ? "High"
                  : patient?.appointments > 10
                  ? "Medium"
                  : "Low";

              return (
                <TableRow
                  key={idx}
                  className="hover:bg-base-50 transition-colors"
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="px-6">
                    {patient?.patientName || "N/A"}
                  </TableCell>
                  <TableCell className="px-6">
                    {patient?.patientEmail || "N/A"}
                  </TableCell>
                  <TableCell className="px-6">
                    $ {patient?.totalSpent || 0}
                  </TableCell>
                  <TableCell className="px-6">
                    {patient?.appointments || 0} <sub>Total</sub>
                  </TableCell>
                  <TableCell className="px-6">${avgSpend}</TableCell>
                  <TableCell className="px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full 
                         ${
                           loyaltyTier === "Gold"
                             ? "bg-yellow-100 text-yellow-700"
                             : loyaltyTier === "Silver"
                             ? "bg-gray-100 text-gray-700"
                             : "bg-orange-100 text-orange-700"
                         }`}
                    >
                      {loyaltyTier === "Gold" && <Star className="w-4 h-4" />}
                      {loyaltyTier === "Silver" && (
                        <Shield className="w-4 h-4" />
                      )}
                      {loyaltyTier === "Bronze" && (
                        <Medal className="w-4 h-4" />
                      )}
                      {loyaltyTier}
                    </span>
                  </TableCell>
                  <TableCell className="px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full 
                         ${
                           engagementScore === "High"
                             ? "bg-green-100 text-green-700"
                             : engagementScore === "Medium"
                             ? "bg-blue-100 text-blue-700"
                             : "bg-gray-100 text-gray-600"
                         }`}
                    >
                      {engagementScore === "High" && (
                        <Activity className="w-4 h-4" />
                      )}
                      {engagementScore === "Medium" && (
                        <BarChart className="w-4 h-4" />
                      )}
                      {engagementScore === "Low" && (
                        <Clock className="w-4 h-4" />
                      )}
                      {engagementScore}
                    </span>
                  </TableCell>
                  <TableCell className="px-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="bg-base-200 p-2 rounded-full border border-border w-fit cursor-pointer hover:bg-base-300">
                          <User className="text-gray-700" />
                        </div>
                      </DialogTrigger>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PatientInsights;
