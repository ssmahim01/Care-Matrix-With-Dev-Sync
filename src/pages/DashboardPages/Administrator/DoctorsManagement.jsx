import DetailsModal from "@/components/RequestModals/DetailsModal";
import NoteModal from "@/components/RequestModals/NoteModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchDoctors,
  setSearch,
  setSort,
  updateDoctor,
} from "@/redux/doctors/doctorSlice";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookmarkX,
  BriefcaseMedical,
  EllipsisVertical,
  NotebookPen,
  NotebookTabs,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DoctorsManagement = () => {
  const dispatch = useDispatch();
  const [noteModal, setNoteModal] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState({});
  const { doctors, status } = useSelector((state) => state.doctors);
  const search = useSelector((state) => state.doctors.search);
  const sort = useSelector((state) => state.doctors.sort);

  // Schema for note modal (form2)
  const NoteFormSchema = z.object({
    note: z
      .string()
      .min(10, { message: "Note must be at least 10 characters." })
      .max(160, { message: "Note must not be longer than 160 characters." }),
  });

  // Schema for assign doctor (form)
  const DoctorFormSchema = z.object({
    experience: z
      .number()
      .min(0, "Experience cannot be negative")
      .max(50, "Experience cannot exceed 50 years"),
    consultation_fee: z
      .number()
      .min(0, "Fee cannot be negative")
      .max(100000, "Fee cannot exceed 100,000"),
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
    bio: z
      .string()
      .min(10, { message: "Bio must be at least 10 characters." })
      .max(160, { message: "Bio must not be longer than 160 characters." }),
  });

  const form = useForm({
    resolver: zodResolver(DoctorFormSchema),
    defaultValues: {
      experience: "",
      consultation_fee: "",
      schedule: "",
      shift: "",
      bio: "",
    },
  });

  const form2 = useForm({
    resolver: zodResolver(NoteFormSchema),
  });

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
      <div className="px-7">
        {!isFormOpen ? (
          <div className="w-full flex flex-col">
            <DashboardPagesHeader
              title={"Manage Doctor Requests"}
              subtitle={
                "View users requests for doctor role and assign users as doctors"
              }
              icon={BriefcaseMedical}
            />
            <div className="flex gap-4 md:flex-row-reverse flex-col-reverse w-full lg:w-9/12 xl:w-8/12 ">
              {/* Reset */}
              <div>
                <Button className={"cursor-pointer"}>Reset</Button>
              </div>{" "}
              {/* Department */}
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      className={"font-semibold"}
                      value={doctors?.department}
                    >
                      {" "}
                      Department
                    </SelectItem>
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
              {/* Search */}
              <div className="relative w-full flex xl:flex-1">
                <input
                  className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
                  placeholder="Search By Email..."
                  value={search}
                  onChange={handleSearchChange}
                />
                <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
                {/* shortcut hint */}
                <button
                  onClick={() => dispatch(setSearch(""))}
                  className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-300 p-[6px] rounded-md text-gray-500 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="md:text-4xl text-2xl font-bold text-base-content mb-2">
            Add Doctor
          </h2>
        )}
      </div>

      {!isFormOpen ? null : (
        <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
          Manage Doctors
        </h2>
      )}

      <div className="px-7 overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="p-4">No.</TableHead>
              <TableHead className="p-4">Image</TableHead>
              <TableHead className="p-4">Name</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="p-4">Contact Number</TableHead>
              <TableHead className="p-4">Role</TableHead>
              <TableHead className="p-4">Department</TableHead>
              <TableHead className="p-4">Request Moment</TableHead>
              <TableHead className="p-4">Shift</TableHead>
              <TableHead className="p-4">Status</TableHead>
              <TableHead className="p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {status === "loading"
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 11 }).map((_, j) => (
                      <TableCell key={j}>
                        <div className="skeleton h-8 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : doctors.map((doctor, index) => (
                  <TableRow key={doctor?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        className="w-14 h-14 rounded-md object-cover"
                        src={doctor?.userPhoto}
                        alt={doctor?.userName}
                      />
                    </TableCell>
                    <TableCell>{doctor?.userName}</TableCell>
                    <TableCell>{doctor?.userEmail}</TableCell>
                    <TableCell>{doctor?.contactNumber}</TableCell>
                    <TableCell>
                      <p className="flex gap-2 items-center">
                        <span
                          className={`rounded-full w-2 h-2 shadow-md ${
                            doctor?.status === "Pending" && "bg-amber-500"
                          } ${doctor?.status === "Assign" && "bg-sky-500"} ${
                            doctor?.status === "Reject" && "bg-rose-500"
                          }`}
                        />
                        <span>{doctor?.requestedRole}</span>
                      </p>
                    </TableCell>
                    <TableCell>{doctor?.department}</TableCell>
                    <TableCell>
                      {moment(doctor?.requestDate).fromNow()}
                    </TableCell>
                    <TableCell>{doctor?.shift}</TableCell>
                    <TableCell>
                      <p
                        className={`w-full border p-2 ${
                          doctor?.status === "Pending" && "badge text-amber-500"
                        } ${
                          doctor?.status === "Reject" && "badge text-error"
                        } ${
                          doctor?.status === "Assign" && "badge text-success"
                        }`}
                      >
                        {(doctor?.status === "Pending" && "Pending") ||
                          (doctor?.status === "Reject" && "Rejected") ||
                          (doctor?.status === "Assign" && "Assigned")}
                      </p>
                    </TableCell>
                    <TableCell className="lg:py-4 py-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="cursor-pointer border p-2"
                            size="icon"
                          >
                            <EllipsisVertical className="w-5 h-10" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer disabled:cursor-not-allowed focus:text-destructive flex gap-2 items-center"
                            onClick={() =>
                              handleDeleteDoctor(doctor?._id, doctor?.userEmail)
                            }
                          >
                            <BookmarkX className="w-4 h-4" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer disabled:cursor-not-allowed flex gap-2 items-center"
                            onClick={() => handleAddNote(doctor)}
                          >
                            <NotebookPen className="w-4 h-4" />
                            <span>Add Note</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer disabled:cursor-not-allowed flex gap-2 items-center"
                            onClick={() => handleDoctorDetails(doctor)}
                          >
                            <NotebookTabs className="w-4 h-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <NoteModal form2={form2} noteModal={noteModal} onSubmit={onSubmit} />
      <DetailsModal form={form} detailsModal={detailsModal} />
    </>
  );
};

export default DoctorsManagement;
