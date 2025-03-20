import { FaTimes } from "react-icons/fa";

const BedDetailsModal = ({ isOpen, onClose, bed }) => {
  if (!isOpen || !bed) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold">{bed.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="text-lg sm:text-xl" />
          </button>
        </div>
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <img
            src={bed.image}
            alt={bed.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
          />
          <div>
            <h3 className="text-sm sm:text-base font-semibold">Details</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 text-xs sm:text-sm md:text-base">
              {bed.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedDetailsModal;