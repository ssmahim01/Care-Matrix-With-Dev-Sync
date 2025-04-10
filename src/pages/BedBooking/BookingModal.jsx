import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea for the booking reason
import { useAuthUser } from "@/redux/auth/authActions";
import toast from "react-hot-toast";
import axios from "axios";

const BookingModal = ({ isOpen, onClose, bedType, refetch }) => {
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      patientName: "",
      age: "",
      contactNumber: "",
      admissionDate: "",
      bookingReason: "", // Add default value for the new field
    },
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You're not authorized to do this action");
      return;
    }

    const bedBookingInfo = {
      bedTitle: bedType?.title,
      bedImg: bedType?.image,
      bedPrice: bedType?.price,
      bedId: bedType?._id,
      ...data,
      time: new Date(),
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      authorEmail: user?.email,
      status: "pending",
    };

    try {
      // Step 1: Post booking info
      await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/bed-booking`, bedBookingInfo),
        {
          loading: "Sending booking request...",
          success: "Booking request sent!",
          error: "Failed to send booking request",
        }
      );

      // Step 2: Update bed status
      await toast.promise(
        axios.patch(`${import.meta.env.VITE_API_URL}/beds/status/${bedType?._id}`, {
          status: "requested",
        }),
        {
          loading: "Updating bed status...",
          success: "Bed status updated!",
          error: "Failed to update bed status",
        }
      );

      // Step 3: Refetch data
      console.log("Triggering refetch...");
      await refetch(); // Ensure refetch completes
      reset();
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred during booking");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-3 sm:p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg md:text-xl font-bold">
            Booking for {bedType?.title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div className="space-y-1">
            <Label htmlFor="patientName" className="block text-xs sm:text-sm font-medium text-gray-700">
              Patient Name
            </Label>
            <Input
              type="text"
              id="patientName"
              {...register("patientName", {
                required: "Patient name is required",
                minLength: { value: 2, message: "Patient name must be at least 2 characters" },
              })}
              className="text-sm sm:text-base"
            />
            {errors.patientName && (
              <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="age" className="block text-xs sm:text-sm font-medium text-gray-700">
              Age
            </Label>
            <Input
              type="number"
              id="age"
              {...register("age", {
                required: "Age is required",
                min: { value: 1, message: "Age must be at least 1" },
                max: { value: 150, message: "Age cannot be more than 150" },
              })}
              className="text-sm sm:text-base"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="contactNumber" className="block text-xs sm:text-sm font-medium text-gray-700">
              Contact Number
            </Label>
            <Input
              type="tel"
              id="contactNumber"
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: { value: /^[0-9]{11}$/, message: "Contact number must be a valid 11-digit number" },
              })}
              className="text-sm sm:text-base"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="admissionDate" className="block text-xs sm:text-sm font-medium text-gray-700">
              Preferred Admission Date
            </Label>
            <Input
              type="date"
              id="admissionDate"
              {...register("admissionDate", {
                required: "Admission date is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate >= today || "Admission date must be today or in the future";
                },
              })}
              className="text-sm sm:text-base"
            />
            {errors.admissionDate && (
              <p className="text-red-500 text-xs mt-1">{errors.admissionDate.message}</p>
            )}
          </div>
          {/* New Booking Reason Field */}
          <div className="space-y-1">
            <Label htmlFor="bookingReason" className="block text-xs sm:text-sm font-medium text-gray-700">
              Booking Reason
            </Label>
            <Textarea
              id="bookingReason"
              {...register("bookingReason", {
                required: "Booking reason is required",
                minLength: { value: 5, message: "Booking reason must be at least 5 characters" },
                maxLength: { value: 40, message: "Booking reason cannot exceed 40 characters" },
              })}
              className="text-sm sm:text-base"
              placeholder="e.g., Surgery, Emergency Care, Recovery"
            />
            {errors.bookingReason && (
              <p className="text-red-500 text-xs mt-1">{errors.bookingReason.message}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto text-sm sm:text-base bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;