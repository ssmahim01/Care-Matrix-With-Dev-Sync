import { Card, CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import { BedDouble } from "lucide-react";
import { LuBedSingle } from "react-icons/lu";
import { toast } from "sonner";
import EmptyState from "../../PatientOverview/EmptyState";
import BedBookingCard from "./BedBookingCard";
import SkeletonBedBookingCard from "./SkeletonBookingCard";

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

  const handleBedDelete = (id, bedId) => {
    toast("Are you sure you want to cancel this booking?", {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            const { data } = await axiosSecure.delete(
              `/bed-booking/delete/${id}`
            );
            if (data.deletedCount) {
              await axiosSecure.patch(`/beds/status/${bedId}`, {
                status: "available",
              });

              refetch();
              toast.success("Bed booking canceled successfully!", {
                position: "top-right",
              });
            }
          } catch (error) {
            toast.error("Failed to delete the bed booking!", {
              description: error?.message,
              position: "top-right",
            });
          }
        },
      },
      cancel: {
        label: "Cancel",
      },
      position: "top-right",
    });
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
        ) : bed_booking?.length > 0 ? (
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
                actionLink="/available-beds"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MyBedRequests;
