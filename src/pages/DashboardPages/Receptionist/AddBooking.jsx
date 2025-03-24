import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AddBooking({ isOpen, setIsOpen, refetch }) {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const bookingData = {
      ...data,
      authorName: "Wolverine K !!", // Hardcoded; replace with actual user data
      authorImage: "https://lh3.googleusercontent.com/a/ACg8ocIs-7PoUHyGa8noBY5-xwxHWiRHt7", // Hardcoded
      authorEmail: "sayed0162714@gmail.com", // Hardcoded
      time: new Date().toISOString(),
      status: "pending",
    };

    await toast.promise(axiosSecure.post("/bookings", bookingData), {
      loading: "Adding Booking...",
      success: <b>Booking Added Successfully!</b>,
      error: <b>Unable to Add!</b>,
    });

    setLoading(false);
    setIsOpen(false);
    refetch();
    reset();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Booking Request</DialogTitle>
            <DialogDescription>
              Enter details to request a new bed booking.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="bedType">Bed Type</Label>
              <Input
                id="bedType"
                type="text"
                name="bedType"
                placeholder="e.g., Queen Suite"
                defaultValue=""
                required
                {...register("bedType")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                type="text"
                name="patientName"
                placeholder="e.g., MD Abul"
                defaultValue=""
                required
                {...register("patientName")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                name="age"
                placeholder="e.g., 30"
                defaultValue=""
                required
                {...register("age")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                placeholder="e.g., 01010101212"
                defaultValue=""
                required
                {...register("contactNumber")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="admissionDate">Admission Date</Label>
              <Input
                id="admissionDate"
                type="date"
                name="admissionDate"
                defaultValue=""
                required
                {...register("admissionDate")}
              />
            </div>
            <div className="flex justify-end">
              <Button className="cursor-pointer" disabled={loading}>
                {loading ? "Adding Booking..." : "Add Booking"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddBooking;