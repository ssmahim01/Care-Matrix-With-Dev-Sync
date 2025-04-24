import { useState } from "react";
import {
  MoreHorizontal,
  FileText,
  Pill,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { PatientDetailsModal } from "./PatientDetailsModal";
import { PrescriptionFormModal } from "./PrescriptionFormModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import useDoctorsAppointment from "@/hooks/useDoctorsAppointment";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";
import toast from "react-hot-toast";
import { PrescriptionViewModal } from "./PrescriptionViewModal";
import { FileDown } from "lucide-react";

// Sample patient data
// const approvedPatient = [
//   {
//     _id: "6802196aaa85b8c937058b8d",
//     name: "Bangla Rugii",
//     age: "21",
//     phone: "01835353634",
//     email: "patient@carematrix.com",
//     date: "2025-04-18",
//     time: "11:00am - 11:29am",
//     reason: "Acidity problem",
//     status: "approved",
//     doctorId: "680215f8aa85b8c937058b8b",
//     doctorName: "Doctor Bapparaj",
//     doctorTitle: "Cardiology",
//     consultationFee: "$20",
//     prescriptions: [],
//   },
//   {
//     _id: "6802196aaa85b8c937058b8e",
//     name: "Sarah Johnson",
//     age: "35",
//     phone: "01712345678",
//     email: "sarah@example.com",
//     date: "2025-04-19",
//     time: "09:30am - 10:00am",
//     reason: "Migraine headaches",
//     status: "approved",
//     doctorId: "680215f8aa85b8c937058b8c",
//     doctorName: "Doctor Anika Rahman",
//     doctorTitle: "Neurology",
//     consultationFee: "$25",
//     prescriptions: [],
//   },
//   {
//     _id: "6802196aaa85b8c937058b8f",
//     name: "Mohammed Ali",
//     age: "45",
//     phone: "01898765432",
//     email: "mali@example.com",
//     date: "2025-04-19",
//     time: "02:00pm - 02:30pm",
//     reason: "Joint pain",
//     status: "approved",
//     doctorId: "680215f8aa85b8c937058b8d",
//     doctorName: "Doctor Kamal Hossain",
//     doctorTitle: "Orthopedics",
//     consultationFee: "$30",
//     prescriptions: [],
//   },
//   {
//     _id: "6802196aaa85b8c937058b90",
//     name: "Fatima Begum",
//     age: "62",
//     phone: "01756789012",
//     email: "fatima@example.com",
//     date: "2025-04-20",
//     time: "10:30am - 11:00am",
//     reason: "Diabetes checkup",
//     status: "approved",
//     doctorId: "680215f8aa85b8c937058b8e",
//     doctorName: "Doctor Nasreen Akter",
//     doctorTitle: "Endocrinology",
//     consultationFee: "$35",
//     prescriptions: [],
//   },
//   {
//     _id: "6802196aaa85b8c937058b91",
//     name: "Rahul Das",
//     age: "28",
//     phone: "01634567890",
//     email: "rahul@example.com",
//     date: "2025-04-20",
//     time: "03:30pm - 04:00pm",
//     reason: "Skin rash",
//     status: "approved",
//     doctorId: "680215f8aa85b8c937058b8f",
//     doctorName: "Doctor Farhana Islam",
//     doctorTitle: "Dermatology",
//     consultationFee: "$22",
//     prescriptions: [],
//   },
//   {
//     _id: "6802196aaa85b8c937058b91",
//     name: "Rahul Das",
//     age: "28",
//     phone: "01634567890",
//     email: "rahul@example.com",
//     date: "2025-04-20",
//     time: "03:30pm - 04:00pm",
//     reason: "Skin rash",
//     status: "approved",
//     doctorId: "680215f8aa85b8c937058b8f",
//     doctorName: "Doctor Farhana Islam",
//     doctorTitle: "Dermatology",
//     consultationFee: "$22",
//     prescriptions: [],
//   },
// ];

export function PrescriptionTable() {
  const user = useAuthUser();
  const [search, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isPrescriptionViewModalOpen, setIsPrescriptionViewModalOpen] =
    useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filter = ["Approved", "Prescribed"];
  // const [appointments, isLoading, refetch] = useDoctorsAppointment(search);
  // console.log(appointments);
  const axiosSecure = useAxiosSecure();
  const { data: approvedPatient = [], refetch } = useQuery({
    queryKey: ["approvedPatient", user.email, search],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/appointments/doctors/${user.email}?filter=${filter}&search=${search}`
      );
      return data;
    },
  });
  // console.log(approvedPatient);

  const handleViewPrescription = async (patient) => {
    setSelectedPatient(patient);
    try {
      const { data } = await axiosSecure.get(`/prescriptions/${patient._id}`);
      setSelectedPrescription(data);
      setIsPrescriptionViewModalOpen(true);
    } catch (error) {
      toast.error("No prescriptions found for this patient");
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = approvedPatient.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(approvedPatient.length / itemsPerPage);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const handleGivePrescription = (patient) => {
    setSelectedPatient(patient);
    setIsPrescriptionModalOpen(true);
  };

  const handleDeletePatient = (patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // In a real application, you would call an API to delete the patient
    // For now, we'll just close the modal
    setIsDeleteModalOpen(false);
  };

  const handlePrescriptionSubmit = async (prescription) => {
    // console.log("Prescription submitted:", prescription);
    await toast.promise(axiosSecure.post("/prescriptions", prescription), {
      loading: "Prescribing patient...",
      success: <b>Prescription Given</b>,
      error: <b>Unable to prescribe</b>,
    });
    refetch();
    setIsPrescriptionModalOpen(false);
};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md ">
        <Table>
          <TableCaption>A List Of Approved Patients</TableCaption>

          <TableHeader className={"bg-base-200"}>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPatients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              currentPatients?.reverse().map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell className={"max-w-28 overflow-x-auto  text-wrap"}>
                    {patient.reason}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{patient.date}</span>
                      <span className="text-xs text-gray-500">
                        {patient.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{patient.doctorName}</span>
                      <span className="text-xs text-gray-500">
                        {patient.doctorTitle}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(patient)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {patient.status === "Prescribed" && (
                          <DropdownMenuItem
                            onClick={() => handleViewPrescription(patient)}
                          >
                            <FileDown className="mr-2 h-4 w-4" />
                            View Prescriptions
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleGivePrescription(patient)}
                        >
                          <Pill className="mr-2 h-4 w-4" />
                          Give Prescription
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                          onClick={() => handleDeletePatient(patient)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {approvedPatient.length > itemsPerPage && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}

      {/* Modals */}
      {selectedPatient && (
        <>
          <PatientDetailsModal
            patient={selectedPatient}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
          />
          <PrescriptionFormModal
            patient={selectedPatient}
            isOpen={isPrescriptionModalOpen}
            onClose={() => setIsPrescriptionModalOpen(false)}
            onSubmit={handlePrescriptionSubmit}
          />
          <DeleteConfirmationModal
            patient={selectedPatient}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
          />
        </>
      )}
      {selectedPatient && selectedPrescription && (
        <PrescriptionViewModal
          prescription={selectedPrescription}
          isOpen={isPrescriptionViewModalOpen}
          onClose={() => setIsPrescriptionViewModalOpen(false)}
        />
      )}
    </div>
  );
}
