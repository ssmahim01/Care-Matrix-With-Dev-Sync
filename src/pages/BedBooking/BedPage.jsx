import SectionHeader from "@/shared/Section/SectionHeader";
import { useState } from "react";
import BedCard from "./BedCard";
import BookingModal from "./BookingModal";
import BedDetailsModal from "./BedDetails";


// Placeholder images (replace with actual image URLs)
const bedData = [
  {
    title: "GENERAL",
    price: "$25",
    image: "https://i.ibb.co/7dMRk97c/General.webp",
    details: [
      "Multiple beds in a shared ward",
      "Basic medical facilities",
      "Shared toilet and bathroom",
      "Nurse call system",
      "Ventilation with fans",
    ],
  },
  {
    title: "TWIN SHARING",
    price: "$45",
    image: "https://i.ibb.co/DdJ9gy2/Twin-Sharing.webp",
    details: [
      "2 beds in a room",
      "Air-conditioned",
      "Common Toilet",
      "Dedicated bed head panels with medical gases",
      "Dedicated Television sets",
      "Couch for each patient",
      "Nurse call systems",
    ],
  },
  {
    title: "SINGLE CLASSIC",
    price: "$35",
    image: "https://i.ibb.co/7xGjRbkG/Single-Classic.webp",
    details: [
      "Private room with 1 bed",
      "Air-conditioned",
      "Attached bathroom",
      "Dedicated bed head panels with medical gases",
      "Flat-screen TV",
      "Comfortable sofa for visitors",
      "Nurse call system",
      "Wi-Fi access",
    ],
  },
  {
    title: "DELUXE SINGLE",
    price: "$40",
    image: "https://i.ibb.co/9kKKXBfp/King-Suite.webp",
    details: [
      "Spacious private room with 1 bed",
      "Air-conditioned with temperature control",
      "Luxurious attached bathroom",
      "Advanced medical equipment",
      "Large LED TV",
      "Recliner for visitors",
      "Nurse call system",
      "High-speed Wi-Fi",
    ],
  },
  {
    title: "PRINCE SUITE",
    price: "$45",
    image: "https://i.ibb.co/pv4n1cNs/Prince-Suite.jpg",
    details: [
      "Premium private suite with 1 bed",
      "Air-conditioned with smart controls",
      "Designer bathroom with bathtub",
      "State-of-the-art medical facilities",
      "55-inch Smart TV",
      "Separate visitor lounge area",
      "Nurse call system",
      "Complimentary refreshments",
    ],
  },
  {
    title: "QUEEN SUITE",
    price: "$50",
    image: "https://i.ibb.co/2YWrtn3C/Queen-Suite.webp",
    details: [
      "Luxury private suite with 1 bed",
      "Air-conditioned with ambient lighting",
      "Spa-inspired bathroom with jacuzzi",
      "Top-tier medical equipment",
      "65-inch Smart TV with streaming services",
      "Dedicated visitor room",
      "24/7 nurse call system",
      "Personalized meal plans",
    ],
  },
  {
    title: "EXECUTIVE WARD",
    price: "$55",
    image: "https://i.ibb.co/gbKmRYXp/EXECUTIVE-WARD.jpg",
    details: [
      "Semi-private ward with 3 beds",
      "Air-conditioned",
      "Shared modern bathroom",
      "Basic medical equipment",
      "Small TV for entertainment",
      "Visitor seating area",
      "Nurse call system",
      "Daily housekeeping",
    ],
  },
  {
    title: "PREMIUM TWIN",
    price: "$60",
    image: "https://i.ibb.co/pBmmFjvL/PREMIUM-TWIN.jpg",
    details: [
      "2 beds in a premium room",
      "Air-conditioned with UV sanitization",
      "Shared bathroom with hot water",
      "Dedicated medical gas panels",
      "32-inch LED TV",
      "Comfortable visitor chairs",
      "Nurse call system",
      "Filtered drinking water",
    ],
  },
  {
    title: "ROYAL SUITE",
    price: "$100",
    image: "https://i.ibb.co/YFXyN1Zw/ROYAL-SUITE.jpg",
    details: [
      "Exclusive private suite with 1 bed",
      "Air-conditioned with voice control",
      "Luxury bathroom with steam shower",
      "Cutting-edge medical technology",
      "75-inch OLED TV with premium channels",
      "Private visitor suite with sofa bed",
      "24/7 nurse and concierge service",
      "Gourmet meal options",
    ],
  },
];

const BedPage = () => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState("");

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