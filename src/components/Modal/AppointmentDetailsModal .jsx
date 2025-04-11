// src/components/Modal/AppointmentDetailsModal.jsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  const AppointmentDetailsModal = ({ open, onOpenChange, appointment }) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              More information about this appointment.
            </DialogDescription>
          </DialogHeader>
  
          <div className="space-y-2 text-sm">
            <p><strong>Patient:</strong> {appointment?.name}</p>
            <p><strong>Doctor:</strong> {appointment?.doctorName}</p>
            <p><strong>Age:</strong> {appointment?.age}</p>
            <p><strong>Phone:</strong> {appointment?.phone}</p>
            <p><strong>Email:</strong> {appointment?.email}</p>
            <p><strong>Status:</strong> {appointment?.status.charAt(0).toUpperCase() + appointment?.status.slice(1)}</p>
            <p><strong>Date:</strong> {appointment?.date}</p>
            <p><strong>Time:</strong> {appointment?.time}</p>
            <p><strong>Reason:</strong> {appointment?.reason}</p>
          </div>
  
          <div className="flex justify-end">
            <Button className="cursor-pointer" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AppointmentDetailsModal;
  