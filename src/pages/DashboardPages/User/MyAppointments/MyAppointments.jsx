import React, { useEffect, useState } from "react";
import {
  Calendar,
  CalendarPlus,
  ClipboardPlus,
  Clock,
  CreditCard,
  FileText,
  MoreVertical,
  Trash,
  User,
  Users,
} from "lucide-react";
import { BiDetail } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import useMyAppointments from "@/hooks/useMyAppointments";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AppointmentDetailsModal from "@/components/Modal/AppointmentDetailsModal ";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileDown } from "lucide-react";
import { PrescriptionViewModal } from "@/components/ManagePrescription/PrescriptionViewModal";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import EmptyState from "../../PatientOverview/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import AddReviewAppointment from "./AddReviewAppointment";
import { MdReviews } from "react-icons/md";
import { useAuthUser } from "@/redux/auth/authActions";
import axios from "axios";

const MyAppointments = () => {
  const [sortDate, setSortDate] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [appointments, refetch, isLoading] = useMyAppointments(
    sortDate,
    search,
    category
  );
  const axiosSecure = useAxiosSecure();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
  });
  const user = useAuthUser();

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isPrescriptionViewModalOpen, setIsPrescriptionViewModalOpen] =
    useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteAppointment = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/appointments/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Appointment has been canceled.",
                "success"
              );
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Appointment has not been canceled.", "error");
          });
      }
    });
  };

  const handleDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleSortByDate = (value) => {
    // console.log("sort by ", value);
    setSortDate(value);
  };

  //   console.log("Sort by ", sortDate);
  const handleViewPrescription = async (appointment) => {
    setSelectedPatient(appointment);
    try {
      const { data } = await axiosSecure.get(
        `/prescriptions/${appointment._id}`
      );
      setSelectedPrescription(data);
      setIsPrescriptionViewModalOpen(true);
    } catch (error) {
      toast.error("No prescriptions found for this patient");
    }
  };

  const CardSkeleton = () => {
    return (
      <Card className="border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg">
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-32 rounded-md" />
              <Skeleton className="h-8 w-40 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const department = formData.get("department");
    const comment = formData.get("comment");
    const date = new Date();

    // You already have rating tracked in `newReview.rating`
    const rating = newReview.rating;

    const review = {
      name,
      department,
      rating,
      comment,
      helpful: 0,
      date,
      avatar: user.photoURL,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/review/add`,
        review
      );
      if (res.data)
        return toast.success(res.data.message, {
          description: "Check the review list",
        });
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
      setReviewDialog(false);
    }

    form.reset();
    setReviewDialog(false);
  };

  return (
    <div className="p-7 pt-0">
      <div className="flex flex-col md:flex-row justify-between">
        <DashboardPagesHeader
          title={"My Appointments"}
          subtitle={
            "All your appointments upcoming, current, and past in one place!"
          }
          icon={ClipboardPlus}
        />
      </div>
      <div className="flex gap-3 justify-between mb-6 items-center flex-wrap">
        {/* Searchbar */}
        <div className="relative w-full flex xl:flex-1">
          <input
            className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search with patient or doctor name..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
        </div>

        {/* Sort category  */}
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categories " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Controls */}
        <Select
          value={selectedSort}
          onValueChange={(value) => {
            handleSortByDate(value);
            setSelectedSort(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Date (Newest to oldest)</SelectItem>
            <SelectItem value="desc">Date (Oldest to newest)</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="cursor-pointer"
          onClick={() => {
            setSortDate("");
            setSelectedSort("");
            setSearch("");
            setCategory("");
          }}
        >
          Reset
        </Button>
      </div>

      {isLoading || showSkeleton ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : appointments?.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {appointments
            ?.slice()
            .reverse()
            .map((appointment) => (
              <Card
                key={appointment?._id}
                className={
                  "border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
                }
              >
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Patient:</span>
                          <span className="text-sm">
                            {appointment?.name || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Date:</span>
                          <span className="text-sm">{appointment?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Time:</span>
                          <span className="text-sm">
                            {appointment?.time || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Doctor:</span>
                          <span className="text-sm">
                            {appointment?.doctorName || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Specialty:
                          </span>
                          <span className="text-sm">
                            {appointment?.doctorTitle || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Fee:</span>
                          <span className="text-sm">
                            {appointment?.consultationFee || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t flex justify-between">
                      <div>
                        <span className="text-sm font-medium">
                          Reason for Visit:
                        </span>
                        <p className="text-sm mt-1">
                          {appointment?.reason || "No reason provided"}
                        </p>
                      </div>
                      <div>
                        <Badge
                          className={
                            appointment?.status === "Prescribed"
                              ? "bg-blue-500 text-white shadow-sm"
                              : "bg-white text-black shadow-sm border"
                          }
                        >
                          {appointment?.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-end items-end gap-2">
                      <Button
                        onClick={() => handleDetails(appointment)}
                        className={"cursor-pointer"}
                        variant="outline"
                        size={"sm"}
                      >
                        View Details
                      </Button>

                      {appointment.status === "Approved" ? (
                        <Button
                          onClick={() =>
                            handleDeleteAppointment(appointment._id)
                          }
                          className={"cursor-pointer"}
                          size={"sm"}

                        >
                          Cancel Appointment
                        </Button>
                      ) : (
                        <div className="flex flex-col-reverse md:flex-row items-end gap-2">
                          <Button
                            onClick={() => handleViewPrescription(appointment)}
                            className={
                              "cursor-pointer"
                            }
                            size={"sm"}

                          >
                            View Prescription
                          </Button>
                          <Button
                            onClick={() => setReviewDialog(true)}
                            size={"sm"}
                            className={"cursor-pointer  bg-blue-500 hover:bg-blue-600"}
                          >
                            Review
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarPlus}
          title="No Appointments Yet"
          description="You don't have any scheduled appointments. Book a consultation with one of our specialists."
          actionLabel="Book An Appointment"
          actionLink="/doctors"
        />
      )}

      {/* Modal */}
      {selectedAppointment && (
        <AppointmentDetailsModal
          open={openModal}
          onOpenChange={setOpenModal}
          appointment={selectedAppointment}
        />
      )}
      {selectedPatient && selectedPrescription && (
        <PrescriptionViewModal
          prescription={selectedPrescription}
          isOpen={isPrescriptionViewModalOpen}
          onClose={() => setIsPrescriptionViewModalOpen(false)}
        />
      )}

      {reviewDialog && (
        <AddReviewAppointment
          reviewDialog={reviewDialog}
          setReviewDialog={() => setReviewDialog(false)}
          handleSubmitReview={handleSubmitReview}
          newReview={newReview}
          setNewReview={setNewReview}
        />
      )}
    </div>
  );
};

export default MyAppointments;
