import SectionHeader from "@/shared/Section/SectionHeader";
import { useState } from "react";
import BedCard from "./BedCard";
import BookingModal from "./BookingModal";
import BedDetailsModal from "./BedDetails";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BedPage = () => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState("");

// getting bed data from backend
  const axiosSecure = useAxiosSecure();
  const {
      data: bedData = [],
      refetch,
      isLoading,
  } = useQuery({
      queryKey: ["bedData"],
      queryFn: async () => {
          const { data } = await axiosSecure.get("/beds");
          return data;
      },
  });


  const handleShowDetails = (bed) => {
    setSelectedBed(bed);
    setIsDetailsModalOpen(true);
  };

  const handleRequestBooking = (bedType) => {
    setSelectedBedType(bedType);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedBedType("");
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBed(null);
  };

  return (
    <div className="mx-auto w-11/12 xl:w-10/12 max-w-screen-2xl">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {bedData.map((bed, index) => (
            <BedCard
              key={index}
              title={bed.title}
              price={bed.price}
              image={bed.image}
              bed={bed}
              onRequestBooking={handleRequestBooking}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        bedType={selectedBedType}
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