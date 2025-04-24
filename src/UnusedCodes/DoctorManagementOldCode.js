// import DoctorsTableRow from "@/components/DoctorsTableRow/DoctorsTableRow";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   fetchDoctors,
//   setSearch,
//   setSort,
//   updateDoctor,
// } from "@/redux/doctors/doctorSlice";
// import { BriefcaseMedical } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import NoteModal from "@/components/RequestModals/NoteModal";
// import DetailsModal from "@/components/RequestModals/DetailsModal";

// const DoctorsManagement = () => {
//   const dispatch = useDispatch();
//   const [noteModal, setNoteModal] = useState({});
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [detailsModal, setDetailsModal] = useState({});
//   const { doctors, status } = useSelector((state) => state.doctors);
//   const search = useSelector((state) => state.doctors.search);
//   const sort = useSelector((state) => state.doctors.sort);

//   // Schema for note modal (form2)
//   const NoteFormSchema = z.object({
//     note: z
//       .string()
//       .min(10, { message: "Note must be at least 10 characters." })
//       .max(160, { message: "Note must not be longer than 160 characters." }),
//   });

//   // Schema for assign doctor (form)
//   const DoctorFormSchema = z.object({
//     experience: z
//       .number()
//       .min(0, "Experience cannot be negative")
//       .max(50, "Experience cannot exceed 50 years"),
//     consultation_fee: z
//       .number()
//       .min(0, "Fee cannot be negative")
//       .max(100000, "Fee cannot exceed 100,000"),
//     schedule: z
//       .string()
//       .min(1, "Please select a date")
//       .refine(
//         (date) => {
//           const day = new Date(date).getDay();
//           return day >= 1 && day <= 5;
//         },
//         { message: "Please select a Monday to Friday date" }
//       ),
//     shift: z.string().min(1, "Please select a shift"),
//     bio: z
//       .string()
//       .min(10, { message: "Bio must be at least 10 characters." })
//       .max(160, { message: "Bio must not be longer than 160 characters." }),
//   });

//   const form = useForm({
//     resolver: zodResolver(DoctorFormSchema),
//     defaultValues: {
//       experience: "",
//       consultation_fee: "",
//       schedule: "",
//       shift: "",
//       bio: "",
//     },
//   });

//   const form2 = useForm({
//     resolver: zodResolver(NoteFormSchema),
//   });

//   const onSubmit = async (data) => {
//     const id = noteModal?._id;
//     if (!id) {
//       toast.error("Doctor ID is missing");
//       return;
//     }

//     try {
//       const result = await dispatch(
//         updateDoctor({ id, noteOfAdministrator: data.note })
//       ).unwrap();
//       if (result) {
//         toast.success("Note added successfully");
//         form2.reset();
//         document.getElementById("note_modal_01").close();
//         dispatch(fetchDoctors());
//       }
//     } catch (error) {
//       toast.error(error.message || "Failed to add note");
//     }
//   };

//   const handleAddNote = (doctor) => {
//     setNoteModal(doctor);
//     document.getElementById("note_modal_01").showModal();
//   };

//   const handleDoctorDetails = (doctor) => {
//     setDetailsModal(doctor);
//     document.getElementById("doctor_modal_02").showModal();
//   };

//   // Change search value
//   const handleSearchChange = (e) => {
//     dispatch(setSearch(e.target.value));
//     dispatch(fetchDoctors({ search: e.target.value, sort }));
//   };

//   // Handle sort of department
//   const handleFilterChange = (value) => {
//     dispatch(setSort(value));
//     dispatch(fetchDoctors({ search, sort: value }));
//   };

//   useEffect(() => {
//     dispatch(fetchDoctors({ search, sort }));
//   }, [dispatch, search, sort]);

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         {!isFormOpen ? (
//           <div className="w-full flex justify-between items-center md:flex-row flex-col flex-wrap">
//             <div className="flex flex-col">
//               {/* Heading */}
//               <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
//                 <BriefcaseMedical className="text-3xl text-gray-800" />
//                 <span>Manage Doctor Requests</span>
//               </h2>
//               <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
//                 View requests for doctor and modify
//               </p>
//             </div>
//             <div className="flex gap-4 md:flex-row flex-col items-center">
//               <Select onValueChange={handleFilterChange}>
//                 <SelectTrigger className="w-[200px]">
//                   <SelectValue placeholder="Filter By" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {/* <SelectLabel>Department</SelectLabel> */}
//                     <SelectItem
//                       className={"font-bold"}
//                       value={doctors?.department}
//                     >
//                       {" "}
//                       Department
//                     </SelectItem>
//                     <SelectItem value="Emergency">Emergency</SelectItem>
//                     <SelectItem value="ICU">ICU</SelectItem>
//                     <SelectItem value="Surgery">Surgery</SelectItem>
//                     <SelectItem value="Pediatrics">Pediatrics</SelectItem>
//                     <SelectItem value="Cardiology">Cardiology</SelectItem>
//                     <SelectItem value="Neurology">Neurology</SelectItem>
//                     <SelectItem value="Oncology">Oncology</SelectItem>
//                     <SelectItem value="Radiology">Radiology</SelectItem>
//                     <SelectItem value="Laboratory">Laboratory</SelectItem>
//                     <SelectItem value="Pharmacy">Pharmacy</SelectItem>
//                     <SelectItem value="Administration">
//                       Administration
//                     </SelectItem>
//                     <SelectItem value="Maintenance">Maintenance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>

//               <label className="input border">
//                 <svg
//                   className="h-[1em] opacity-50"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                 >
//                   <g
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2.5"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <circle cx="11" cy="11" r="8"></circle>
//                     <path d="m21 21-4.3-4.3"></path>
//                   </g>
//                 </svg>
//                 <input
//                   value={search}
//                   onChange={handleSearchChange}
//                   type="search"
//                   required
//                   placeholder="Search by email..."
//                 />
//               </label>
//             </div>
//           </div>
//         ) : (
//           <h2 className="md:text-4xl text-2xl font-bold text-base-content mb-2">
//             Add Doctor
//           </h2>
//         )}
//       </div>

//       {!isFormOpen ? null : (
//         <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
//           Manage Doctors
//         </h2>
//       )}

//       <div className="rounded-sm overflow-x-auto w-full">
//         <table className="table border border-gray-200 border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border border-gray-200 *:text-gray-800 *:font-semibold">
//               <th className="p-4">No.</th>
//               <th className="p-4">Image</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Email</th>
//               <th className="p-4">Contact Number</th>
//               <th className="p-4">Role</th>
//               <th className="p-4">Department</th>
//               <th className="p-4">Request Moment</th>
//               <th className="p-4">Shift</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {status === "loading"
//               ? [...Array(5)].map((_, index) => (
//                   <tr key={index} className="border-t border-gray-200">
//                     <td className="p-4">
//                       <div className="skeleton h-6 w-4" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-10 w-10 rounded-md" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-24" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-32" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-24" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-20" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-28" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-20" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-16" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-4 w-20" />
//                     </td>
//                     <td className="p-4">
//                       <div className="skeleton h-8 w-8 rounded-md" />
//                     </td>
//                   </tr>
//                 ))
//               : doctors.map((doctor, index) => (
//                   <DoctorsTableRow
//                     key={doctor?._id}
//                     doctor={doctor}
//                     dispatch={dispatch}
//                     index={index}
//                     handleAddNote={handleAddNote}
//                     handleDoctorDetails={handleDoctorDetails}
//                   />
//                 ))}
//           </tbody>
//         </table>
//       </div>

//       <NoteModal form2={form2} noteModal={noteModal} onSubmit={onSubmit} />

//       <DetailsModal
//         form={form}
//         detailsModal={detailsModal}
//       />
//     </>
//   );
// };

// export default DoctorsManagement;


// import {
//     deleteDoctor,
//     deleteSpecificDoctor,
//   } from "@/redux/doctors/doctorSlice";
//   import {
//     BookmarkX,
//     EllipsisVertical,
//     NotebookPen,
//     NotebookTabs,
//   } from "lucide-react";
//   import toast from "react-hot-toast";
//   import Swal from "sweetalert2";
//   import { TableCell } from "../ui/table";
//   import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
//   } from "../ui/dropdown-menu";
//   import { Button } from "../ui/button";
//   import moment from "moment";
  
//   const DoctorsTableRow = ({
//     doctor,
//     index,
//     dispatch,
//     handleAddNote,
//     handleDoctorDetails,
//   }) => {
//     const handleDeleteDoctor = async (id, email) => {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "You cannot retrieve this doctor!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, remove!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           const response = await dispatch(deleteDoctor(id));
//           const removeDoctor = await dispatch(deleteSpecificDoctor(email));
//           if (response && removeDoctor) {
//             toast.success("Doctor has been removed");
//           }
//         }
//       });
//     };
  
//     return (
//       <>
//         <tr
//           className={`${
//             index % 2 === 0 ? "bg-white" : "bg-gray-50"
//           } hover:shadow-lg hover:bg-gray-100 transition duration-200 text-gray-700 font-semibold border border-gray-200`}
//         >
//           <th>{index + 1}</th>
//           <td>
//             <img
//               className="w-14 h-14 rounded-md object-cover"
//               src={doctor?.userPhoto}
//               alt={doctor?.userName}
//             />
//           </td>
//           <td>{doctor?.userName}</td>
//           <td>{doctor?.userEmail}</td>
//           <td>{doctor?.contactNumber}</td>
//           <td>
//             <p className="flex gap-2 items-center">
//               <span
//                 className={`rounded-full w-2 h-2 shadow-md ${
//                   doctor?.status === "Pending" && "bg-amber-500"
//                 } ${doctor?.status === "Assign" && "bg-sky-500"} ${
//                   doctor?.status === "Reject" && "bg-rose-500"
//                 }`}
//               ></span>
//               <span>{doctor?.requestedRole}</span>
//             </p>
//           </td>
//           <td>{doctor?.department}</td>
//           <td>{moment(doctor?.requestDate).fromNow()}</td>
//           <td>{doctor?.shift}</td>
//           <td>
//             <p
//               className={`w-full border p-2 ${
//                 doctor?.status === "Pending" && "badge text-amber-500"
//               } ${doctor?.status === "Reject" && "badge text-error"} ${
//                 doctor?.status === "Assign" && "badge text-success"
//               }`}
//             >
//               {(doctor?.status === "Pending" && "Pending") ||
//                 (doctor?.status === "Reject" && "Rejected") ||
//                 (doctor?.status === "Assign" && "Assigned")}
//             </p>
//           </td>
//           <TableCell className={"lg:py-4 py-10"}>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="cursor-pointer border p-2"
//                   size="icon"
//                 >
//                   <EllipsisVertical className="w-5 h-10" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem
//                   className="cursor-pointer disabled:cursor-not-allowed focus:text-destructive flex gap-2 items-center"
//                   onClick={() => handleDeleteDoctor(doctor?._id, doctor?.userEmail)}
//                 >
//                   <BookmarkX className="w-4 h-4" />
//                   <span>Remove</span>
//                 </DropdownMenuItem>
  
//                 <DropdownMenuItem
//                   className="cursor-pointer disabled:cursor-not-allowed flex gap-2 items-center"
//                   onClick={() => handleAddNote(doctor)}
//                 >
//                   <NotebookPen className="w-4 h-4" />
//                   <span>Add Note</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="cursor-pointer disabled:cursor-not-allowed flex gap-2 items-center"
//                   onClick={() => handleDoctorDetails(doctor)}
//                 >
//                   <NotebookTabs className="w-4 h-4" />
//                   <span>View Details</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </TableCell>
//         </tr>
//       </>
//     );
//   };
  
//   export default DoctorsTableRow;