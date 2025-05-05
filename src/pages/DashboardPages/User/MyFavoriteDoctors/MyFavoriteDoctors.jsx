import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useFavoriteDoctors from "@/hooks/useFavoriteDoctors";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { ClipboardPlus, Heart, MoreVertical, Star, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EmptyState from "../../PatientOverview/EmptyState";

const MyFavoriteDoctors = () => {
  const axiosSecure = useAxiosSecure();
  const [favoriteDoctors, refetch, isLoading] = useFavoriteDoctors();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = (_id) => {
    axiosSecure
      .delete(`/favorite-doctors/${_id}`)
      .then((res) => {
        if (res?.data?.deletedCount > 0) {
          toast.success("Doctor Removed successfully!", {
            position: "top-right",
          });
          refetch();
        }
      })
      .catch(() => {
        toast.error("Something went wrong! Please try again", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="px-5">
      <DashboardPagesHeader
        title={"Favorite Doctors"}
        subtitle={
          "Easily access and manage all your favorite doctors in one place"
        }
        icon={FaUserDoctor}
      />

      {isLoading || showSkeleton ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full overflow-hidden animate-pulse">
              <div className="h-32 bg-gray-200"></div>
              <CardContent className="pt-14 px-6 pb-4">
                <div className="absolute top-56">
                  <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="flex gap-2 mt-3">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-300 rounded w-16 mt-1"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-300 rounded w-20 mt-1"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-3 pb-6 flex justify-end">
                <div className="h-9 bg-gray-300 rounded w-36"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : favoriteDoctors.length === 0 ? (
        <Card className="mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg">
          <CardContent>
            <EmptyState
              icon={Heart}
              title="No Favorite Doctors"
              description="You haven’t added any doctors to your favorites yet. Browse and add doctors to easily find them later."
              actionLabel="Browse Doctors"
              actionLink="/doctors"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteDoctors?.map((doctor) => (
            <Card
              key={doctor?._id}
              className="w-full overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Doctor image with gradient overlay */}
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-sky-500"></div>
                  <div className="absolute -bottom-12 left-6">
                    <img
                      src={doctor?.doctorInfo.image || "/placeholder.svg"}
                      alt={doctor?.doctorInfo.name}
                      className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/20 hover:bg-white/30 rounded-full"
                        >
                          <MoreVertical className="h-5 w-5 text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/doctor-details/${doctor?.doctorInfo._id}`}
                            state={doctor?.doctorInfo._id}
                          >
                            <BiDetail className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/book-appointment/${doctor?.doctorInfo.name}`}
                            state={doctor?.doctorInfo.name}
                          >
                            <ClipboardPlus className="mr-2 h-4 w-4" />
                            <span>Book Appointment</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRemove(doctor?._id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Remove from Favorite</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Doctor info */}
                <div className="pt-14 px-6 pb-4">
                  <h3 className="text-xl font-bold mt-2">
                    {doctor?.doctorInfo.name}
                  </h3>
                  <div>
                    <p className="font-medium">
                      <span className="font-normal text-muted-foreground">
                        Consultation Fee:
                      </span>{" "}
                      ${doctor?.doctorInfo.consultation_fee}
                    </p>
                  </div>{" "}
                  <p className="text-muted-foreground">
                    {doctor?.doctorInfo.title}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="ml-1 font-medium">
                        {doctor?.doctorInfo.rating}
                      </span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {doctor?.doctorInfo.experience}
                    </Badge>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Available on
                      </p>
                      <p className="font-semibold">
                        {doctor?.doctorInfo.available_days.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 px-6 py-4 flex justify-end">
                <Button asChild variant={"outline"}>
                  <Link
                    to={`/book-appointment/${doctor?.doctorInfo.name}`}
                    state={doctor?.doctorInfo.name}
                  >
                    Book Appointment
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavoriteDoctors;
