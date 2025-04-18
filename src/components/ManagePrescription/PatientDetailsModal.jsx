import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
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

export function PatientDetailsModal({ patient, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-teal-700">
            Patient Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the patient
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <User className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <User className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{patient.email}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Date</p>
                <p className="font-medium">{patient.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Time</p>
                <p className="font-medium">{patient.time}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Reason for Visit</p>
                <p className="font-medium">{patient.reason}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Stethoscope className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{patient.doctorName}</p>
                <p className="text-sm text-gray-500">{patient.doctorTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="font-medium">{patient.consultationFee}</p>
              </div>
            </div>

            {patient.prescriptions && patient.prescriptions.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Previous Prescriptions</h3>
                  {patient.prescriptions.map((prescription, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="font-medium">{prescription.medicineName}</p>
                      <p className="text-sm text-gray-500">
                        Take {prescription.frequency} times per day
                      </p>
                      <p className="text-xs text-gray-400">
                        Prescribed on: {prescription.date}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
