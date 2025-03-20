import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BedCard = ({ title, price, image, onRequestBooking, onShowDetails, isDetailsVisible, bed }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
     <div className="flex justify-between items-center w-full">
     <h3 className="text-lg font-semibold">{title}</h3>
     <div>
     <p className="text-gray-500 text-end">Room Tariff</p>
     <p className="text-xl font-bold">{price}/day</p>
     </div>
     </div>
      <img src={image} alt={title} className="w-full h-60 object-cover rounded-md my-2 transition-transform duration-300 hover:scale-105" />
      <div className="flex justify-between w-full space-x-2 my-1">
        <button
          onClick={() => onRequestBooking(title)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Request for Bed Booking
        </button>
        <button
          onClick={() => onShowDetails(bed)}
          className="border border-blue-600 text-blue-600 px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-100 flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
        >
          More Details 
        </button>
      </div>
    </div>
  );
};

export default BedCard;