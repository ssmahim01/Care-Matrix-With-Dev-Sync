import {
  Ban,
  BriefcaseMedical,
  CalendarCheck,
  CalendarSearch,
  CircleCheckBig,
  CircleUserRound,
  Cross,
  Gem,
  HandCoins,
  HeartPulse,
  Mail,
  Notebook,
  PhoneCall,
  X,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  addDoctor,
  assignDoctor,
  changeRole,
  convertRole,
  deleteSpecificDoctor,
  fetchDoctors,
  rejectDoctor,
} from "@/redux/doctors/doctorSlice";
import { useDispatch } from "react-redux";
import { Textarea } from "../ui/textarea";

const DetailsModal = ({ form, detailsModal }) => {
  const [serviceValue, setServiceValue] = useState("");
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();

  // Services handlers
  const handleServiceChange = (e) => {
    setServiceValue(e.target.value);
  };

  const handleServiceKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = serviceValue.trim();
      if (trimmedValue && !services.includes(trimmedValue)) {
        setServices([...services, trimmedValue]);
        setServiceValue("");
      }
    }
  };

  const removeServices = (serviceToRemove) => {
    setServices(services.filter((service) => service !== serviceToRemove));
  };

  const handleReject = async () => {
    const id = detailsModal?._id;
    if (!id) {
      toast.error("User ID is missing");
      return;
    }

    const email = detailsModal?.userEmail;
    if (!email) {
      toast.error("User email is missing");
      return;
    }

    try {
      const result = await dispatch(rejectDoctor(id)).unwrap();
      const deleteDoctor = await dispatch(deleteSpecificDoctor(email)).unwrap();
      const convertPatient = await dispatch(changeRole(email)).unwrap();
      if (result && deleteDoctor && convertPatient) {
        toast.success("Rejected the request");
        document.getElementById("doctor_modal_02").close();
        form.reset();
        setServices([]);
        dispatch(fetchDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to reject the user");
    }
  };

  const handleAssign = async (data) => {
    const id = detailsModal?._id;
    if (!id) {
      toast.error("User ID is missing");
      return;
    }

    const email = detailsModal?.userEmail;
    if (!email) {
      toast.error("User email is missing");
      return;
    }

    const selectedDate = new Date(data.schedule);
    const dayOfWeek = selectedDate.toLocaleString("en-US", { weekday: "long" });
    let availableDays = [];

    if (data.shift === "Rotating") {
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];
      const selectedDayIndex = daysOfWeek.indexOf(dayOfWeek);
      availableDays = daysOfWeek.slice(
        Math.max(0, selectedDayIndex - 1),
        Math.min(daysOfWeek.length, selectedDayIndex + 2)
      );
    } else {
      availableDays = [dayOfWeek];
    }

    const doctorData = {
      id,
      name: detailsModal?.userName,
      email: detailsModal?.userEmail,
      image: detailsModal?.userPhoto,
      schedule: data.schedule,
      shift: data.shift,
      title: detailsModal?.department,
      experience: `${data.experience}+ years`,
      consultation_fee: `$${data.consultation_fee}`,
      available_days: availableDays,
      services,
      bio: data.bio,
    };

    try {
      const save_doctor = await dispatch(addDoctor(doctorData)).unwrap();
      const update_role = await dispatch(convertRole(email)).unwrap();
      const change_status = await dispatch(assignDoctor(id)).unwrap();

      if (save_doctor && update_role && change_status) {
        toast.success("Assigned the doctor");
        document.getElementById("doctor_modal_02").close();
        setServices([]);
        form.reset();
        dispatch(fetchDoctors());
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error(error.message || "Failed to assign the doctor");
    }
  };

  return (
    <dialog id="doctor_modal_02" className="modal modal-middle">
      {detailsModal && (
        <div className="w-full flex justify-center items-center">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-6">
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                <BriefcaseMedical className="text-3xl text-gray-800" />
                <span>Details of Doctor</span>
              </h2>
              <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
                The full details of doctor are shown here
              </p>
            </div>
            <div className="divider"></div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAssign)}
                className="space-y-4"
              >
                <div className="flex gap-y-2 flex-col">
                  <figure className="w-48 h-48 mx-auto">
                    <img
                      className="w-full h-full border-4 border-sky-500 overflow-hidden rounded-full object-cover"
                      src={detailsModal?.userPhoto}
                      alt={detailsModal?.userName}
                    />
                  </figure>
                  <div className="divider"></div>

                  <div className="space-y-2">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                      <h4 className="flex gap-2 items-center font-semibold">
                        <CircleUserRound className="w-4 h-4" />
                        <span className="text-base text-gray-800">
                          {detailsModal?.userName}
                        </span>
                      </h4>
                      <p className="flex gap-2 items-center font-semibold">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm text-gray-800">
                          {detailsModal?.userEmail}
                        </span>
                      </p>
                      <p className="flex gap-2 items-center font-semibold">
                        <PhoneCall className="w-4 h-4" />
                        <span className="text-base text-gray-800">
                          {detailsModal?.emergencyContact}
                        </span>
                      </p>
                      <p className="flex gap-2 items-center font-semibold">
                        <HeartPulse className="w-4 h-4" />
                        <span className="text-base text-gray-800">
                          {detailsModal?.requestedRole}
                        </span>
                      </p>
                    </div>
                    <p className="flex gap-2 items-center font-semibold">
                      <Cross className="w-4 h-4" />
                      <span className="text-gray-900 font-bold">
                        Department:{" "}
                      </span>
                      <span className="text-base text-gray-800">
                        {detailsModal?.department}
                      </span>
                    </p>
                  </div>

                  <div className="divider"></div>
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Gem className="w-5 h-5 text-blue-600" />
                          Experience (years)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="Write experience of this doctor"
                            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consultation_fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <HandCoins className="w-5 h-5 text-blue-600" />
                          Consultation Fee ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="Provide fee of doctor"
                            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

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
                                  type="button"
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

                  {/* Services Field */}
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                      <BriefcaseMedical className="w-5 h-5 text-blue-600" />
                      Services
                    </FormLabel>
                    <div className="w-full">
                      <div className="p-4 border rounded w-full">
                        <label className="block mb-2">
                          Enter Services (Press Enter or , to add){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2 border p-2 rounded">
                          {services.map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
                            >
                              {service}
                              <button
                                type="button"
                                className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
                                onClick={() => removeServices(service)}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                          <input
                            type="text"
                            className="outline-none flex-1"
                            value={serviceValue}
                            onChange={handleServiceChange}
                            onKeyDown={handleServiceKeyDown}
                            placeholder="Add Services..."
                          />
                        </div>
                      </div>
                    </div>
                    <FormMessage className="text-rose-500 text-sm mt-1" />
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="w-11/12">
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Notebook className="w-5 h-5 text-blue-600" />
                          Bio
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write bio for doctor"
                            className="resize-none h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-5 flex flex-wrap justify-between md:items-center">
                    <Button
                      type="button"
                      onClick={handleReject}
                      className="btn bg-rose-500 hover:bg-rose-700 text-base text-white font-bold rounded-md flex gap-2 items-center"
                    >
                      <Ban className="w-4 h-4" />
                      <span>Reject</span>
                    </Button>
                    <Button
                      type="submit"
                      className="btn bg-sky-600 hover:bg-sky-700 text-base text-white font-bold rounded-md flex gap-2 items-center"
                    >
                      <CircleCheckBig className="w-4 h-4" />
                      <span>Assign Doctor</span>
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default DetailsModal;
