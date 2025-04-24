import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Ban,
  BriefcaseMedical,
  Calendar,
  CalendarCheck,
  CalendarSearch,
  Captions,
  CircleCheckBig,
  CircleUserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  fetchAllDoctors,
  updateAvailability,
} from "@/redux/doctors/consultantSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const AvailabilityModal = ({ form, availabilityModal }) => {
  const [availableDays, setAvailableDays] = useState([]);
  const [availableValue, setAvailableValue] = useState("");

  const dispatch = useDispatch();
  // Available Days handlers
  const handleAvailableDaysChange = (e) => {
    setAvailableValue(e.target.value);
  };

  const handleAvailableKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = availableValue.trim();
      if (trimmedValue && !availableDays.includes(trimmedValue)) {
        setAvailableDays([...availableDays, trimmedValue]);
        setAvailableValue("");
      }
    }
  };

  const removeAvailability = (availableToRemove) => {
    setAvailableDays(
      availableDays.filter((available) => available !== availableToRemove)
    );
  };

  // Handle availability change
  const handleAvailability = async (data) => {
    // console.log("Submitted form", data);
    const id = availabilityModal?._id;
    if (!id) {
      toast.error("ID is missing");
      return;
    }

    try {
      const updatedAvailability = {
        schedule: data.schedule,
        shift: data.shift,
        available_days: availableDays,
      };
      const result = await dispatch(
        updateAvailability({ id, updatedAvailability })
      ).unwrap();
      if (result) {
        toast.success("Updated the schedule and shift");
        form.reset();
        document.getElementById("availability_modal").close();
        dispatch(fetchAllDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to update schedule and shift");
    }
  };

  return (
    <dialog id="availability_modal" className="modal modal-middle z-[1000]">
      {availabilityModal && (
        <div className="w-full flex justify-center items-center">
          <div className="modal-box bg-white rounded-lg shadow-lg p-6">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-600 hover:text-gray-800"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BriefcaseMedical className="w-8 h-8 text-blue-600" />
                Manage Doctor Availability
              </h2>
              <p className="text-gray-600 text-sm font-medium ml-10">
                Update the schedule and shift for {availabilityModal.name}.
              </p>
            </div>
            <div className="divider my-4 border-gray-200"></div>

            <div className="space-y-4">
              {/* Doctor Info */}
              <div className="grid grid-cols-2 gap-4 pb-3">
                <div className="flex flex-wrap md:items-center gap-2">
                  <CircleUserRound className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-semibold text-gray-800">
                    {availabilityModal.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Captions className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-semibold text-gray-800">
                    {availabilityModal.title}
                  </span>
                </div>
              </div>

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) =>
                    handleAvailability(data)
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <CalendarSearch className="w-5 h-5 text-blue-600" />
                          Schedule (Monday - Friday)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <CalendarCheck className="w-5 h-5 text-blue-600" />
                          Shift
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-between border-gray-300 rounded-md"
                              >
                                {field.value || "Select a shift"}
                                <span className="ml-2">▼</span>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0 mt-3 mb-5 bg-white border-gray-300 rounded-md shadow-lg z-[1001]">
                            <div className="flex flex-col">
                              {[
                                {
                                  value: "Morning (6AM - 2PM)",
                                  label: "Morning (6AM - 2PM)",
                                },
                                {
                                  value: "Afternoon (2PM - 10PM)",
                                  label: "Afternoon (2PM - 10PM)",
                                },
                                {
                                  value: "Night (10PM - 6AM)",
                                  label: "Night (10PM - 6AM)",
                                },
                                { value: "Rotating", label: "Rotating" },
                              ].map((shift) => (
                                <Button
                                  type={"button"}
                                  key={shift.value}
                                  variant="ghost"
                                  className="w-full justify-start text-left px-4 py-2 hover:bg-gray-100"
                                  onClick={() => field.onChange(shift.value)}
                                >
                                  {shift.label}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-rose-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Available Days
                    </FormLabel>
                    <div className="w-full">
                      <div className="p-4 border rounded w-full">
                        <label className="block mb-2">
                          Enter Available Days (Press Enter or , to add){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2 border p-2 rounded">
                          {availableDays.map((available, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#1d2026] text-white font-medium rounded flex items-center gap-1"
                            >
                              {available}
                              <button
                                type="button"
                                className="ml-2 text-white/90 font-bold hover:cursor-pointer hover:text-rose-500"
                                onClick={() => removeAvailability(available)}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                          <input
                            type="text"
                            className="outline-none flex-1"
                            value={availableValue}
                            onChange={handleAvailableDaysChange}
                            onKeyDown={handleAvailableKeyDown}
                            placeholder="Add Available Days..."
                          />
                        </div>
                      </div>
                    </div>
                    <FormMessage className="text-rose-500 text-sm mt-1" />
                  </FormItem>

                  <div className="flex md:flex-row flex-col gap-4 justify-between pt-3">
                    <Button
                      type="button"
                      onClick={() =>
                        document.getElementById("availability_modal").close()
                      }
                      className="btn bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-md flex gap-2 items-center px-4 py-2"
                    >
                      <Ban className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex gap-2 items-center px-4 py-2"
                    >
                      <CircleCheckBig className="w-4 h-4" />
                      Update Availability
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default AvailabilityModal;
