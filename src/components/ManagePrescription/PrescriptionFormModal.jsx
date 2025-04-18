import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export function PrescriptionFormModal({ patient, isOpen, onClose, onSubmit }) {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "", frequency: "", instructions: "" },
  ]);

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: medicines.length + 1,
        name: "",
        frequency: "",
        instructions: "",
      },
    ]);
  };

  const handleRemoveMedicine = (id) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((medicine) => medicine.id !== id));
    }
  };

  const handleMedicineChange = (id, field, value) => {
    setMedicines(
      medicines.map((medicine) =>
        medicine.id === id ? { ...medicine, [field]: value } : medicine
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prescription = {
      patientId: patient._id,
      patientName: patient.name,
      doctorId: patient.doctorId,
      doctorName: patient.doctorName,
      date: new Date().toISOString().split("T")[0],
      medicines: medicines.map(({ id, ...rest }) => rest),
    };

    onSubmit(prescription);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-teal-700">
            Create Prescription
          </DialogTitle>
          <DialogDescription>
            Prescribe medication for {patient.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Medications</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMedicine}
                className={"cursor-pointer"}
              >
                Add Medicine
              </Button>
            </div>

            {medicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="space-y-3 p-3 border rounded-md"
              >
                <div className="grid gap-2">
                  <Label htmlFor={`medicine-${medicine.id}`}>
                    Medicine Name
                  </Label>
                  <Input
                    id={`medicine-${medicine.id}`}
                    placeholder="Enter medicine name"
                    value={medicine.name}
                    onChange={(e) =>
                      handleMedicineChange(medicine.id, "name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`frequency-${medicine.id}`}>
                    Frequency (per day)
                  </Label>
                  <Select
                    value={medicine.frequency}
                    onValueChange={(value) =>
                      handleMedicineChange(medicine.id, "frequency", value)
                    }
                    required
                  >
                    <SelectTrigger id={`frequency-${medicine.id}`}>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 time per day</SelectItem>
                      <SelectItem value="2">2 times per day</SelectItem>
                      <SelectItem value="3">3 times per day</SelectItem>
                      <SelectItem value="4">4 times per day</SelectItem>
                      <SelectItem value="0.5">Every other day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`instructions-${medicine.id}`}>
                    Special Instructions
                  </Label>
                  <Textarea
                    id={`instructions-${medicine.id}`}
                    placeholder="Take after meals, etc."
                    value={medicine.instructions}
                    onChange={(e) =>
                      handleMedicineChange(
                        medicine.id,
                        "instructions",
                        e.target.value
                      )
                    }
                    className="resize-none"
                    rows={2}
                  />
                </div>

                {medicines.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveMedicine(medicine.id)}
                    className="w-full mt-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Prescription</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
