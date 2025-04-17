import ConsultantTableRow from "@/components/ConsultantTableRow/ConsultantTableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  fetchAllDoctors,
  setSearch,
  setSort,
  updateAvailability,
} from "@/redux/doctors/consultantSlice";
import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  Ban,
  BriefcaseMedical,
  CalendarCheck,
  CalendarSearch,
  Captions,
  CircleCheckBig,
  CircleUserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const { consultants, status } = useSelector((state) => state.consultants);
  //   console.log(consultants);
  const search = useSelector((state) => state.consultants.search);
  const [availabilityModal, setAvailabilityModal] = useState({});
  const [availableDate, setAvailableDate] = useState("");
  const sort = useSelector((state) => state.consultants.sort);
  // console.log(search);
  
  // Schema for availability modal (form3)
  const AvailabilityFormSchema = z.object({
    schedule: z
      .string()
      .min(1, "Please select a date")
      .refine(
        (date) => {
          const day = new Date(date).getDay();
          return day >= 1 && day <= 5;
        },
        { message: "Please select a Monday to Friday date" }
      ),
    shift: z.string().min(1, "Please select a shift"),
  });

  const form = useForm({
    resolver: zodResolver(AvailabilityFormSchema),
    defaultValues: {
      schedule: availabilityModal?.schedule || "",
      shift: availabilityModal?.shift || "",
    },
  });

  const handleChangeAvailability = (consultant) => {
    setAvailabilityModal(consultant);
    setAvailableDate(consultant?.schedule);
    document.getElementById("availability_modal").showModal();
  };

  // Handle sort by consultation fee
  const handleSortChange = (value) => {
    dispatch(setSort(value));
    dispatch(fetchAllDoctors({ search, sort: value }));
  };

  // Change search value
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(fetchAllDoctors({ search: e.target.value, sort }));
  };

  useEffect(() => {
    dispatch(fetchAllDoctors({ search, sort }));
  }, [dispatch, search, sort]);

  // Sync form with availabilityModal when it changes
  useEffect(() => {
    if (availabilityModal?._id) {
      form.reset({
        schedule: availabilityModal?.schedule || "",
        shift: availabilityModal?.shift || "",
      });
    }
  }, [availabilityModal, form]);

  // Handle availability change
  const handleAvailability = async (data) => {
    // console.log("Submitted form", data);
    const id = availabilityModal?._id;
    if (!id) {
      toast.error("ID is missing");
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

    try {
      const updatedAvailability = {
        schedule: data.schedule,
        shift: data.shift,
        available_days: availableDays
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
    <div className="lg:w-full md:w-[95%] w-11/12 mx-auto">
      <div className="flex md:flex-row flex-col flex-wrap justify-between items-center">
        {/* Heading of the Table */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
            <FaUserDoctor className="text-2xl text-gray-800" />
            Manage Doctors
          </h2>
          <p className="text-gray-600 text-base ml-9 font-medium whitespace-pre-line">
            Show information of doctors
          </p>
        </div>

        <div className="flex gap-4 md:flex-row flex-col items-center">
          {/* Search Input */}
          <label className="input border">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              value={search}
              onChange={handleSearch}
              type="search"
              required
              placeholder="Search by name or title"
            />
          </label>

          {/* Sort Dropdown */}
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className={"font-bold"}
                  value={consultants?.consultation_fee}
                >
                  {" "}
                  Fee
                </SelectItem>
                <SelectItem value="asc">Lowest to Highest</SelectItem>
                <SelectItem value="desc">Highest to Lowest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Request Table Data */}
      <div className="md:py-6 py-8 rounded-xl">
        <Table
          className={
            "*:w-full *:rounded-xl border border-gray-200 dark:border-gray-700"
          }
        >
          <TableCaption>A list of all doctors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Consultation Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "loading"
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TableCell>
                      <div className="skeleton h-6 w-5 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-12 w-12 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-32 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-48 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-24 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-28 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-32 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-8 w-8 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              : consultants.map((consultant, index) => (
                  <ConsultantTableRow
                    key={consultant?._id || index}
                    consultant={consultant}
                    index={index}
                    dispatch={dispatch}
                    handleChangeAvailability={handleChangeAvailability}
                  />
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total Doctors:</TableCell>
              <TableCell>
                {status === "loading" ? (
                  <div className="skeleton w-8 h-4"></div>
                ) : (
                  consultants.length
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <dialog
        id="availability_modal"
        className="modal modal-middle z-[1000]"
      >
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
                  Update the schedule and shift for {availabilityModal.name}
                  .
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
                    onSubmit={form.handleSubmit(
                      (data) => handleAvailability(data),
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

                    <div className="flex md:flex-row flex-col gap-4 justify-between pt-3">
                      <Button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("availability_modal")
                            .close()
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
    </div>
  );
};

export default AllDoctors;
