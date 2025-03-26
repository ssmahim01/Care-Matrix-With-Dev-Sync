import SectionHeader from "@/shared/Section/SectionHeader";
import { useState } from "react";
import BedCard from "./BedCard";
import BookingModal from "./BookingModal";
import BedDetailsModal from "./BedDetails";

import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import useBeds from "@/hooks/useBeds";
import axios from "axios";

const BedPage = () => {

  // const [ beds, isLoading, refetch ] = useBeds([""]);



  const [selectedBed, setSelectedBed] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState("");

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
  });

  // console.log(selectedBedType);

// getting bed data from backend
  // const axiosPublic = useAxiosPublic()
  // const {
  //     data: bedData = [],
  //     refetch,
  //     isLoading,
  // } = useQuery({
  //     queryKey: ["bedData"],
  //     queryFn: async () => {
  //         const { data } = await axiosPublic.get("/beds");
  //         return data;
  //     },
  // });


  const handleShowDetails = (bed) => {
    setSelectedBed(bed);
    setIsDetailsModalOpen(true);
  };

  const handleRequestBooking = (requestedBed) => {
    setSelectedBedType(requestedBed);
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
          {beds.map((bed, index) => (
            <BedCard
              key={index}
              title={bed.title}
              price={bed.price}
              image={bed.image}
              bed={bed}
              status={bed.status}
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