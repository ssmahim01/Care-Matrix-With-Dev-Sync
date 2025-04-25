import { useEffect } from "react";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  FileText,
  Stethoscope,
  DollarSign,
} from "lucide-react";

const PatientDetailsModal = ({ patient, isOpen, onClose }) => {
  // Debug render and unmount
  useEffect(() => {
    console.log("PatientDetailsModal rendered");
    return () => console.log("PatientDetailsModal unmounted");
  }, []);

  // Debug close
  const handleClose = () => {
    console.log("PatientDetailsModal: Closing");
    onClose();
  };

  if (!isOpen || !patient) {
    console.warn("PatientDetailsModal: Not open or no patient data");
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Details
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Complete information about the patient
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <User className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-medium text-gray-900">
                  {patient.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <User className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium text-gray-900">
                  {patient.age ? `${patient.age} years` : "N/A"}
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {patient.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {patient.email || "N/A"}
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Date</p>
                <p className="font-medium text-gray-900">
                  {patient.date || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Time</p>
                <p className="font-medium text-gray-900">
                  {patient.time || "N/A"}
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Reason for Visit</p>
                <p className="font-medium text-gray-900">
                  {patient.reason || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <Stethoscope className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium text-gray-900">
                  {patient.doctorName || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {patient.doctorTitle || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-sky-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="font-medium text-gray-900">
                  {patient.consultationFee || "N/A"}
                </p>
              </div>
            </div>

            {patient.prescriptions?.length > 0 && (
              <>
                <hr className="border-gray-200" />
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">
                    Previous Prescriptions
                  </h3>
                  {patient.prescriptions
                    .slice(0, 10)
                    .map((prescription, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium text-gray-900">
                          {prescription.medicineName || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Take {prescription.frequency || 0} times per day
                        </p>
                        <p className="text-xs text-gray-400">
                          Prescribed on: {prescription.date || "N/A"}
                        </p>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
