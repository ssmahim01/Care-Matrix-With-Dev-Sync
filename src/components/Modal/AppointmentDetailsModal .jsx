import { Button } from "@/components/ui/button";

const AppointmentDetailsModal = ({ open, onOpenChange, appointment }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-10">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Appointment Details</h2>
          <p className="text-sm text-gray-500">
            More information about this appointment.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p><strong>Patient:</strong> {appointment?.name}</p>
          <p><strong>Doctor:</strong> {appointment?.doctorName}</p>
          <p><strong>Age:</strong> {appointment?.age}</p>
          <p><strong>Phone:</strong> {appointment?.phone}</p>
          <p><strong>Email:</strong> {appointment?.email}</p>
          <p><strong>Status:</strong> {appointment?.status?.charAt(0).toUpperCase() + appointment?.status?.slice(1)}</p>
          <p><strong>Date:</strong> {appointment?.date}</p>
          <p><strong>Time:</strong> {appointment?.time}</p>
          <p><strong>Reason:</strong> {appointment?.reason}</p>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
