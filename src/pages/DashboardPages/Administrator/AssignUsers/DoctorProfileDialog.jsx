import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import axios from "axios";

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
    return null; // or you can return a loading spinner/modal if you want
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{doctorData?.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <img
              src={doctorData?.image}
              alt={doctorData?.name}
              className="rounded-2xl w-full h-64 object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold">{doctorData?.title}</h3>
              <p className="text-sm text-muted-foreground">
                {doctorData?.email}
              </p>
              <p>
                <strong>Experience:</strong> {doctorData?.experience}
              </p>
              <p>
                <strong>Chamber:</strong> {doctorData?.chamber}
              </p>
              <p>
                <strong>Available Days:</strong>{" "}
                {doctorData?.available_days?.join(", ")}
              </p>
              <p>
                <strong>Consultation Fee:</strong>{" "}
                {doctorData?.consultation_fee}
              </p>
              <p>
                <strong>Rating:</strong> {doctorData?.rating} ⭐ (
                {doctorData?.vote} votes)
              </p>
              <p>
                <strong>Treated Patients:</strong>{" "}
                {doctorData?.treated_patients}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div>
              <Label>Bio</Label>
              <Textarea readOnly value={doctorData?.bio} className="mt-1" />
            </div>

            <div>
              <Label>Services</Label>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                {doctorData?.services?.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            {/* Editable Schedule */}
            <div className="space-y-2">
              <Label htmlFor="shift">Shift</Label>
              <Input
                id="shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              />

              <Label>Schedule Date</Label>
              <Calendar
                mode="single"
                selected={schedule}
                onSelect={setSchedule}
                className="rounded-md border"
              />
              {schedule && (
                <p className="text-sm text-muted-foreground">
                  Selected: {format(schedule, "PPP")}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
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
