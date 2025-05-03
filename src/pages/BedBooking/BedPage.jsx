import SectionHeader from "@/shared/Section/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import BedCard from "./BedCard";
import BookingModal from "./BookingModal";
import BedDetailsModal from "./BedDetails";
import BedCardSkeleton from "./BedCardSkeleton";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import {
  setSelectedBed,
  setIsBookingModalOpen,
  setIsDetailsModalOpen,
  setSelectedBedType,
  resetBookingModal,
  resetDetailsModal
} from "@/redux/bed/bedsSlice";

const BedPage = () => {
  const dispatch = useDispatch();
  const { selectedBed, isBookingModalOpen, isDetailsModalOpen, selectedBedType } = useSelector(
    (state) => state.beds
  );
  const axiosPublic = useAxiosPublic();

  // Fetch beds using useQuery
  const {
    data: beds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/beds`);
      // Filter only "available" or "requested" beds
      const filteredBeds = data.filter(
        (bed) => bed.status === "available" || bed.status === "requested"
      );
      return filteredBeds;
    },
  });

  // Handle showing bed details
  const handleShowDetails = (bed) => {
    dispatch(setSelectedBed(bed));
    dispatch(setIsDetailsModalOpen(true));
  };

  // Handle booking request
  const handleRequestBooking = (requestedBed) => {
    dispatch(setSelectedBedType(requestedBed));
    dispatch(setIsBookingModalOpen(true));
  };

  // Close booking modal
  const closeBookingModal = () => {
    dispatch(resetBookingModal());
  };

  // Close details modal
  const closeDetailsModal = () => {
    dispatch(resetDetailsModal());
  };

  return (
    <div className="mt-16 md:mt-20 pb-10 mx-auto w-11/12 xl:w-10/12 max-w-screen-2xl">
      <SectionHeader
        className="text-center"
        title_1st_slice={"OUR"}
        title_2nd_slice={"AVAILABLE"}
        title_3rd_slice={"BEDS"}
        subTitle={
          "We are privileged to work with hundreds of future-thinking \n medical industries, ensuring the best services for patients."
        }
      />
      <div className="mt-6 sm:mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Render skeleton BedCards while loading */}
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <BedCardSkeleton key={index} />
              ))}
          </div>
        ) : beds.length === 0 ? (
          <div className="text-center text-gray-500">
            No available beds at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {beds?.map((bed) => (
              <BedCard
                key={bed._id}
                bed={bed}
                onRequestBooking={handleRequestBooking}
                onShowDetails={handleShowDetails}
                isLoading={isLoading}
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