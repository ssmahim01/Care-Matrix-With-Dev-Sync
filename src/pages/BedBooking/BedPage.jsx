import SectionHeader from "@/shared/Section/SectionHeader";
import { useState } from "react";
import BedCard from "./BedCard";
import BookingModal from "./BookingModal";
import BedDetailsModal from "./BedDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BedPage = () => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState("");

  // Fetch beds using useQuery
  const {
    data: beds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/beds`);
      console.log("Raw API Response:", data); // Debug: See all beds
      // Filter only "available" or "requested" beds
      const filteredBeds = data.filter(
        (bed) => bed.status === "available" || bed.status === "requested"
      );
      console.log("Filtered Beds:", filteredBeds); // Debug: See filtered result
      return filteredBeds;
    },
    // Optional: Add polling or refetch interval if needed
    // refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Handle showing bed details
  const handleShowDetails = (bed) => {
    setSelectedBed(bed);
    setIsDetailsModalOpen(true);
  };

  // Handle booking request
  const handleRequestBooking = (requestedBed) => {
    setSelectedBedType(requestedBed);
    setIsBookingModalOpen(true);
  };

  // Close booking modal
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedBedType("");
  };

  // Close details modal
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBed(null);
  };

  return (
    <div className="mt-16 mx-auto w-11/12 xl:w-10/12 max-w-screen-2xl">
      <SectionHeader
        className="text-center"
        title_1st_slice={"OUR"}
        title_2nd_slice={"AVAILABLE"}
        title_3rd_slice={"BEDS"}
        subTitle={
          "We are privileged to work with hundreds of future-thinking \n medical industries, ensuring the best services for patients."
        }
      />
      <div className="mt-6 sm:mt-8 lg:mt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Render skeleton BedCards while loading */}
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-lg p-4 flex flex-col items-center animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="h-5 bg-gray-300 rounded w-1/3" />
                    <div className="text-end space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-24" />
                      <div className="h-6 bg-gray-400 rounded w-20" />
                    </div>
                  </div>
                  <div className="w-full h-60 bg-gray-300 rounded-md" />
                  <div className="flex justify-between w-full space-x-2">
                    <div className="bg-gray-300 rounded-md h-10 w-1/2" />
                    <div className="bg-gray-300 rounded-md h-10 w-1/2" />
                  </div>
                </div>
              ))}
          </div>
        ) : beds.length === 0 ? (
          <div className="text-center text-gray-500">
            No available beds at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {beds.map((bed) => (
              <BedCard
                key={bed._id}
                title={bed.title}
                price={bed.price}
                image={bed.image}
                bed={bed}
                status={bed.status}
                onRequestBooking={handleRequestBooking}
                onShowDetails={handleShowDetails}
                isLoading-={isLoading}
              />
            ))}
          </div>
        )}
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        bedType={selectedBedType}
        refetch={refetch}
      />
      <BedDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        bed={selectedBed}
      />
    </div>
  );
};

export default BedPage;
