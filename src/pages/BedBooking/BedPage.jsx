import { useState } from "react";
import BedCard from "./BedCard";
import BedDetails from "./BedDetails";
import BookingModal from "./BookingModal";


// Placeholder images (replace with actual image URLs)
const bedData = [
  {
    title: "GENERAL",
    price: "₹ 3,500.00",
    image: "https://via.placeholder.com/300x150?text=General",
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
    price: "₹ 4,950.00",
    image: "https://via.placeholder.com/300x150?text=Twin+Sharing",
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
    price: "₹ 12,000.00",
    image: "https://via.placeholder.com/300x150?text=Single+Classic",
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
    price: "₹ 16,000.00",
    image: "https://via.placeholder.com/300x150?text=Deluxe+Single",
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
    price: "₹ 18,000.00",
    image: "https://via.placeholder.com/300x150?text=Prince+Suite",
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
    price: "₹ 23,000.00",
    image: "https://via.placeholder.com/300x150?text=Queen+Suite",
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
    price: "₹ 8,000.00",
    image: "https://via.placeholder.com/300x150?text=Executive+Ward",
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
    price: "₹ 6,500.00",
    image: "https://via.placeholder.com/300x150?text=Premium+Twin",
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
    price: "₹ 30,000.00",
    image: "https://via.placeholder.com/300x150?text=Royal+Suite",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState("");

  const handleShowDetails = (bed) => {
    if (selectedBed && selectedBed.title === bed.title) {
      setSelectedBed(null); // Hide details if the same card is clicked again
    } else {
      setSelectedBed(bed); // Show details for the clicked card
    }
  };

  const handleRequestBooking = (bedType) => {
    setSelectedBedType(bedType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBedType("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
        About various class of beds
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bedData.map((bed, index) => (
          <BedCard
            key={index}
            title={bed.title}
            price={bed.price}
            image={bed.image}
            bed={bed}
            onRequestBooking={handleRequestBooking}
            onShowDetails={handleShowDetails}
            isDetailsVisible={selectedBed && selectedBed.title === bed.title}
          />
        ))}
      </div>
      {selectedBed && (
        <BedDetails
          title={selectedBed.title}
          details={selectedBed.details}
          image={selectedBed.image}
          onRequestBooking={handleRequestBooking}
        />
      )}
      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        bedType={selectedBedType}
      />
    </div>
  );
};

export default BedPage;