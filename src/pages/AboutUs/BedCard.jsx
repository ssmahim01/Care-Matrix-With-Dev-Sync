import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BedCard = ({ title, price, image, onRequestBooking, onShowDetails, isDetailsVisible, bed }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">Room Tariff</p>
      <p className="text-xl font-bold">{price}/day</p>
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md my-2" />
      <div className="flex space-x-2">
        <button
          onClick={() => onRequestBooking(title)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Request for Booking
        </button>
        <button
          onClick={() => onShowDetails(bed)}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 flex items-center"
        >
          {isDetailsVisible ? (
            <>
              Hide Details <FaChevronUp className="ml-2" />
            </>
          ) : (
            <>
              More Details <FaChevronDown className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BedCard;