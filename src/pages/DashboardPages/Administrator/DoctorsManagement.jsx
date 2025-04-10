import DoctorsTableRow from "@/components/DoctorsTableRow/DoctorsTableRow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  assignDoctor,
  convertRole,
  fetchDoctors,
  rejectDoctor,
  setSearch,
  setSort,
  updateDoctor,
  updateSchedule,
} from "@/redux/doctors/doctorSlice";
import {
  BadgePlus,
  Ban,
  BriefcaseMedical,
  CalendarDays,
  CalendarSearch,
  CircleCheckBig,
  CircleUser,
  CircleUserRound,
  CopyX,
  Cross,
  HeartPulse,
  Mail,
  NotebookPen,
  PhoneCall,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const DoctorsManagement = () => {
  const dispatch = useDispatch();
  const [noteModal, setNoteModal] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState({});
  const { doctors, status } = useSelector((state) => state.doctors);
  const search = useSelector((state) => state.doctors.search);
  const sort = useSelector((state) => state.doctors.sort);

  const FormSchema = z.object({
    note: z
      .string()
      .min(10, {
        message: "Note must be at least 10 characters.",
      })
      .max(160, {
        message: "Note must not be longer than 160 characters.",
      }),
    availableDate: z.string().min(1, "Date is required"),
  });

  const form2 = useForm({
    resolver: zodResolver(FormSchema),
  });

  // Initialize form with default values from detailsModal
  const form3 = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      availableDate: "",
    },
  });

  // Sync form with detailsModal when it changes
  useEffect(() => {
    if (detailsModal?._id) {
      form3.reset({
        availableDate: detailsModal.joiningDate || "",
      });
    }
  }, [detailsModal, form3]);

  const onSubmit = async (data) => {
    const id = noteModal?._id;
    if (!id) {
      toast.error("Doctor ID is missing");
      return;
    }

    try {
      const result = await dispatch(
        updateDoctor({ id, noteOfAdministrator: data.note })
      ).unwrap();
      if (result) {
        toast.success("Note added successfully");
        form2.reset();
        document.getElementById("note_modal_01").close();
        dispatch(fetchDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to add note");
    }
  };

  const handleReject = async () => {
    const id = detailsModal?._id;
    if (!id) {
      toast.error("User ID is missing");
      return;
    }

    try {
      const result = await dispatch(rejectDoctor(id)).unwrap();
      if (result) {
        toast.success("Rejected the request");
        document.getElementById("doctor_modal_02").close();
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
    // if (!data.availableDate) {
    //   toast.error("Please change the schedule!");
    //   return;
    // }

    try {
      const response = await dispatch(assignDoctor(id)).unwrap();
      const update_role = await dispatch(convertRole(email)).unwrap();
      const schedule = await dispatch(updateSchedule({id, updatedSchedule: data.availableDate}))

      if (response && update_role && schedule) {
        toast.success("Assigned the doctor & updated schedule");
        form3.reset();
        document.getElementById("doctor_modal_02").close();
        dispatch(fetchDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign the user");
    }
  };

  const handleAddNote = (doctor) => {
    setNoteModal(doctor);
    document.getElementById("note_modal_01").showModal();
  };

  const handleDoctorDetails = (doctor) => {
    setDetailsModal(doctor);
    document.getElementById("doctor_modal_02").showModal();
  };

  // Change search value
  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(fetchDoctors({ search: e.target.value, sort }));
  };

  // Handle sort of department
  const handleFilterChange = (value) => {
    dispatch(setSort(value));
    dispatch(fetchDoctors({ search, sort: value }));
  };

  useEffect(() => {
    dispatch(fetchDoctors({ search, sort }));
  }, [dispatch, search, sort]);

  return (
    <>
      <div className="flex justify-between items-center">
        {!isFormOpen ? (
          <div className="w-full flex justify-between items-center md:flex-row flex-col flex-wrap">
            <div className="flex flex-col">
              {/* Heading */}
              <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                <BriefcaseMedical className="text-3xl text-gray-800" />
                <span>Manage Doctors</span>
              </h2>
              <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
                View requests for doctor and modify
              </p>
            </div>
            <div className="flex gap-4 md:flex-row flex-col items-center">
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter By Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="ICU">ICU</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Radiology">Radiology</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="Administration">
                      Administration
                    </SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

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
                  onChange={handleSearchChange}
                  type="search"
                  required
                  placeholder="Search by email..."
                />
              </label>
            </div>
          </div>
        ) : (
          <h2 className="md:text-4xl text-2xl font-bold text-base-content mb-2">
            Add Doctor
          </h2>
        )}
        {/* <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="lg:w-1/6 md:w-2/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2"
        >
          <span
            className={`absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out rounded-md group-hover:mt-0 group-hover:ml-0 ${
              !isFormOpen ? "bg-primary" : ""
            }`}
          ></span>
          <span
            className={`absolute inset-0 w-full h-full rounded-md ${
              isFormOpen ? "bg-neutral" : "bg-teal-500"
            }`}
          ></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100"></span>
          <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
            {isFormOpen ? "Close Form" : "Add Doctor"}
          </span>
        </button> */}
      </div>

      {!isFormOpen ? null : (
        <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
          Manage Doctors
        </h2>
      )}

      <div className="rounded-sm overflow-x-auto w-full">
        <table className="table border border-gray-200 border-collapse">
          <thead>
            <tr className="bg-gray-50 border border-gray-200 *:text-gray-800 *:font-semibold">
              <th className="p-4">No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Contact Number</th>
              <th className="p-4">Role</th>
              <th className="p-4">Department</th>
              <th className="p-4">Request Date</th>
              <th className="p-4">Shift</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading"
              ? [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-4">
                      <div className="skeleton h-6 w-4" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-10 w-10 rounded-md" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-32" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-28" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-16" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-8 w-8 rounded-md" />
                    </td>
                  </tr>
                ))
              : doctors.map((doctor, index) => (
                  <DoctorsTableRow
                    key={doctor?._id}
                    doctor={doctor}
                    dispatch={dispatch}
                    index={index}
                    handleAddNote={handleAddNote}
                    handleDoctorDetails={handleDoctorDetails}
                  />
                ))}
          </tbody>
        </table>
      </div>

      <dialog id="note_modal_01" className="modal modal-middle">
        {noteModal && (
          <div className="w-full flex justify-center items-center">
            <div className="modal-box">
              <div className="flex flex-col">
                {/* Heading Of The Modal */}
                <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                  <NotebookPen className="text-3xl text-gray-800" />
                  <span>Add Note For Doctor</span>
                </h2>
                <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
                  This note will send to the doctor
                </p>
              </div>
              <div className="divider"></div>

              <Form {...form2}>
                <form
                  onSubmit={form2.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <figure className="w-44 h-44 mx-auto mt-3">
                    <img
                      className="w-full h-full border-4 border-muted overflow-hidden rounded-full object-cover"
                      src={noteModal?.userPhoto}
                      alt={noteModal?.userName}
                    />
                  </figure>

                  <div className="divider"></div>

                  <div className="w-full space-y-3">
                    <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                      User Name: <CircleUser className="w-5 h-5" />
                      <span className="text-gray-700 font-semibold">
                        {noteModal?.userName}
                      </span>
                    </h4>

                    <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                      User Email: <Mail className="w-4 h-4" />
                      <span className="text-gray-700 font-semibold">
                        {noteModal?.userEmail}
                      </span>
                    </h4>

                    <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                      Request Date: <CalendarDays className="w-4 h-4" />
                      <span className="text-gray-700 font-semibold">
                        {new Date(noteModal?.requestDate).toLocaleDateString(
                          "en-UK"
                        )}
                      </span>
                    </h4>

                    <FormField
                      control={form2.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="w-11/12">
                          <FormLabel className="text-lg font-bold">
                            Note:
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write brief note for doctor"
                              className="resize-none h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            You can <span>Add</span> note with mention the
                            doctor name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="py-3 flex md:flex-row flex-col flex-wrap justify-between items-center">
                      <Button
                        type="button"
                        onClick={() =>
                          document.getElementById("note_modal_01").close()
                        }
                        className="md:px-14 px-10 btn bg-rose-500 text-base text-white font-bold rounded-md flex gap-2 items-center"
                      >
                        <CopyX className="w-4 h-4" />
                        <span>Close</span>
                      </Button>

                      <Button
                        type="submit"
                        className="md:px-14 px-10 btn bg-teal-600 text-base text-white font-bold rounded-md flex gap-2 items-center"
                      >
                        <BadgePlus className="w-6 h-6" />
                        <span>Add Note</span>
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </dialog>

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
                  The full details of doctor is show here
                </p>
              </div>
              <div className="divider"></div>

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
                  <div className="grid grid-cols-2 gap-3">
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

                <Form {...form3}>
                  <form
                    onSubmit={form3.handleSubmit(handleAssign)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form3.control}
                      name="availableDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <CalendarSearch className="w-4 h-4 inline" />
                            <span className="font-bold">Change Schedule</span>
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
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-5 flex md:flex-row flex-col flex-wrap justify-between items-center">
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
                        onClick={handleAssign}
                        className="btn bg-sky-600 hover:bg-sky-700 text-base text-white font-bold rounded-md flex gap-2 items-center"
                      >
                        <CircleCheckBig className="w-4 h-4" />
                        <span>Assign Doctor</span>
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default DoctorsManagement;
