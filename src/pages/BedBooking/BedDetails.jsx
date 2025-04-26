import { FaCheckDouble, FaTimes } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Adjust the path based on your project structure

const BedDetailsModal = ({ isOpen, onClose, bed }) => {
  if (!bed) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-3 sm:p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
            {bed.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <img
            src={bed.image}
            alt={bed.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
          />
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-xl sm:text-base font-semibold">Details</h3>
              <p className="text-xl font-bold">{bed.price}/day</p>
            </div>
            <ul className="list-none mt-2 text-xs sm:text-sm md:text-base text-gray-700">
              {bed.details.map((detail, index) => (
                <li key={index} className="flex gap-2 items-center">
                  <FaCheckDouble className="text-[#0E82FD]" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BedDetailsModal;
