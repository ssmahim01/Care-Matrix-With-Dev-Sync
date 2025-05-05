import useAxiosSecure from "@/hooks/useAxiosSecure";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LuBedSingle } from "react-icons/lu";
import Swal from "sweetalert2";
import { useAuthUser } from "@/redux/auth/authActions";
import BedBookingCard from "./BedBookingCard";
import SkeletonBedBookingCard from "./SkeletonBookingCard";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "../../PatientOverview/EmptyState";
import { BedDouble } from "lucide-react";

function MyBedRequests() {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();

  // Fetching bed data
  const {
    data: bed_booking = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my_bed_booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bed-booking/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Handle bed deletion
  const handleBedDelete = async (id, bedId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the bed booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/bed-booking/delete/${id}`);
        if (data.deletedCount) {
          //   change the bed status to available
          await toast.promise(
            axiosSecure.patch(`/beds/status/${bedId}`, { status: "available" }),
            {
              loading: "Updating bed status...",
              success: <b>Bed Status Updated Successfully!</b>,
              error: <b>Could not update bed status.</b>,
            }
          );

          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Bed booking has been deleted successfully!",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the bed booking!",
          icon: "error",
          background: "#ffffff",
          color: "#000000",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  return (
    <div className="px-5">
      <DashboardPagesHeader
        title={"My Bed Bookings"}
        subtitle={
          "Easily track, view, and manage all your bed booking requests in one place"
        }
        icon={LuBedSingle}
      />
      {/* Bookings Card */}
      <div className="space-y-4 my-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => <SkeletonBedBookingCard key={i} />)
        ) : bed_booking.length > 0 ? (
          bed_booking?.map((booking, i) => (
            <BedBookingCard
              key={i}
              booking={booking}
              handleBedDelete={handleBedDelete}
            />
          ))
        ) : (
          <Card className="mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg">
            <CardContent>
              <EmptyState
                icon={BedDouble}
                title="No Bed Bookings Yet"
                description="You haven’t booked any beds yet. Find available hospital beds and manage your reservations here"
                actionLabel="Book A Bed"
                actionLink="/our-available-beds"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MyBedRequests;
