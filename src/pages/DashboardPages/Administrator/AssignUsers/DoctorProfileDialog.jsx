import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import {
  Briefcase,
  Calendar as CalendarIcon,
  DollarSign,
  Mail,
  MapPin,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
export default function DoctorProfileDialog({ open, setOpen, doctor }) {
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

  const [shift, setShift] = useState("");
  const [schedule, setSchedule] = useState(new Date());

  useEffect(() => {
    if (doctorData) {
      setShift(doctorData.shift);
      setSchedule(new Date(doctorData.schedule));
    }
  }, [doctorData]);

  if (isLoading || !doctorData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl p-6">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {doctorData?.name}
          </DialogTitle>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Image Section */}
          <div className="w-full">
            <img
              src={doctorData?.image}
              alt={doctorData?.name}
              className="rounded-2xl w-full h-80 shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 space-y-6">
            {/* Key Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <p className="text-lg font-semibold">{doctorData?.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <p>{doctorData?.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <p>{doctorData?.experience}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p>{doctorData?.chamber}</p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <p>{doctorData?.available_days?.join(", ")}</p>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <p>{doctorData?.consultation_fee}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <p>
                  {doctorData?.rating} ({doctorData?.vote} votes)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <p>Treated Patients: {doctorData?.treated_patients}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Bio</h3>
              <p className="text-sm text-foreground whitespace-pre-line">
                {doctorData?.bio}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <div className="grid grid-cols-2 gap-2">
                {doctorData?.services?.map((service, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 p-2 rounded-lg text-sm text-center"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Schedule</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="shift">Shift</Label>
                  <Input
                    id="shift"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    placeholder="e.g., Morning, Evening"
                  />
                </div>
                <div>
                  <Label>Schedule Date</Label>
                  <Calendar
                    mode="single"
                    selected={schedule}
                    onSelect={setSchedule}
                    className="mt-2"
                  />
                  {schedule && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {format(schedule, "PPP")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <Button
            onClick={() => {
              console.log("Updated Shift:", shift);
              console.log("Updated Schedule:", schedule?.toISOString());
              alert("Updated shift and schedule logged in console.");
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
