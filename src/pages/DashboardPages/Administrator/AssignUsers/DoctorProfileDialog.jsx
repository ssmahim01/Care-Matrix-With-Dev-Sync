import { useState } from "react";
import { format } from "date-fns";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  CalendarIcon,
  DollarSign,
  Star,
  Clock,
  Heart,
  Activity,
  Stethoscope,
  Thermometer,
  Clipboard,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const doctorData = {
//   name: "Dr. Sarah Johnson",
//   title: "Cardiologist Specialist",
//   email: "dr.sarah@example.com",
//   experience: "15+ years of experience",
//   chamber: "Heart Care Center, New York",
//   available_days: ["Monday", "Wednesday", "Friday"],
//   consultation_fee: "$150",
//   rating: 4.8,
//   vote: 243,
//   treated_patients: 1500,
//   bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She completed her medical degree from Harvard Medical School and residency at Mayo Clinic. Dr. Johnson specializes in preventive cardiology and heart failure management.",
//   services: [
//     "Cardiac Consultation",
//     "ECG",
//     "Echocardiography",
//     "Stress Test",
//     "Holter Monitoring",
//     "Cardiac Rehabilitation",
//   ],
//   image: "/placeholder.svg?height=200&width=200",
// };

// Map services to icons
const serviceIcons = {
  "Cardiac Consultation": <Heart className="h-5 w-5" />,
  ECG: <Activity className="h-5 w-5" />,
  Echocardiography: <Stethoscope className="h-5 w-5" />,
  "Stress Test": <Activity className="h-5 w-5" />,
  "Holter Monitoring": <Thermometer className="h-5 w-5" />,
  "Cardiac Rehabilitation": <Heart className="h-5 w-5" />,
};

export default function DoctorProfileDialog({
  open = true,
  onOpenChange = () => {},
  doctor,
}) {
  const {
    data: doctorData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["doctor-profile", doctor],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/firebase/doctor/${doctor}`
      );
      return data;
    },
    enabled: !!doctor,
  });

  const [schedule, setSchedule] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {doctorData?.name}
        </DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-5xl lg:max-w-[800px] p-0 overflow-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-sm transform scale-110"></div>
              <img
                src={doctorData?.image || "/placeholder.svg"}
                alt={doctorData?.name}
                className="relative rounded-full w-28 h-28 border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{doctorData?.name}</h2>
              <p className="text-blue-100">{doctorData?.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(doctorData?.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-blue-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {doctorData?.rating} ({doctorData?.vote} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content with tabs */}
        <div className="p-0">
          <Tabs
            defaultValue="overview"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-6">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Key Information */}
                  <Card
                    className={
                      "border shadow-sm border-[#e5e7eb] w-full rounded-lg"
                    }
                  >
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold">
                        Doctor Information
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Briefcase className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Experience
                            </p>
                            <p className="font-medium">
                              {doctorData?.experience}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Chamber
                            </p>
                            <p className="font-medium">{doctorData?.chamber}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Available Days
                            </p>
                            <p className="font-medium">
                              {doctorData?.available_days.join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Consultation Fee
                            </p>
                            <p className="font-medium">
                              {doctorData?.consultation_fee}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Treated Patients
                            </p>
                            <p className="font-medium">
                              {doctorData?.treated_patients}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Mail className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Email
                            </p>
                            <p className="font-medium">{doctorData?.email}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Bio */}
                  <Card
                    className={
                      "border shadow-sm border-[#e5e7eb] w-full rounded-lg"
                    }
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Biography</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {doctorData?.bio}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Specializations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-50">
                            Cardiology
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            Heart Disease
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            Preventive Care
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            Cardiac Surgery
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="services" className="mt-0">
                <Card
                  className={
                    "border shadow-sm border-[#e5e7eb] w-full rounded-lg"
                  }
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Services Offered
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctorData?.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-100 transition-colors"
                        >
                          <div className="mr-4 bg-white p-3 rounded-full shadow-sm">
                            {serviceIcons[service] || (
                              <Clipboard className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{service}</p>
                            <p className="text-sm text-muted-foreground">
                              Available
                            </p>
                          </div>
                          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
      <DialogFooter className="mt-6"></DialogFooter>
    </Dialog>
  );
}
