import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, DollarSign, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const DoctorOverviewTab = ({ stats, appointments, prescriptions }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Total Prescriptions"
          value={stats.totalPrescriptions}
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title={"Treated \n Patients"}
          value={stats.totalTreatedPatients}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />5 Recent Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-4"}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <TableRow key={appointment?._id}>
                      <TableCell className="font-medium">
                        {appointment?.name}
                      </TableCell>
                      <TableCell>{appointment?.date}</TableCell>
                      <TableCell>{appointment?.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment?.status === "Prescribed"
                              ? "default"
                              : "outline"
                          }
                          className={
                            appointment?.status === "Prescribed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : ""
                          }
                        >
                          {appointment?.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground py-4"
                    >
                      No Appointments Data Found!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Prescriptions */}
        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />5 Recent Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-4"}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Medicines</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions && prescriptions.length > 0 ? (
                  prescriptions.map((prescription) => (
                    <TableRow key={prescription._id}>
                      <TableCell className="font-medium">
                        {prescription.patientName}
                      </TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {prescription.medicines.map((medicine, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-blue-50"
                            >
                              {medicine}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground py-4"
                    >
                      No Prescriptions Data Found!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-6"}>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">
                {stats.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({stats.totalVote} reviews)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Revenue Per Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-6"}>
            <div className="text-2xl font-bold">
              ${stats.avgRevenuePerAppointment.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Patients
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-6"}>
            <div className="text-2xl font-bold">
              {stats.uniquePatientsTreated}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorOverviewTab;

const StatCard = ({ title, value, icon }) => {
  return (
    <Card
      className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="-mt-6">
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};
