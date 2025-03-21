import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const BookingModal = ({ isOpen, onClose, bedType }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    contactNumber: "",
    admissionDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Request:", { bedType, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold">Booking for {bedType}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="text-lg sm:text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="patientName" className="block text-xs sm:text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-xs sm:text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-xs sm:text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="admissionDate" className="block text-xs sm:text-sm font-medium text-gray-700">
              Preferred Admission Date
            </label>
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-400 text-sm sm:text-base w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;