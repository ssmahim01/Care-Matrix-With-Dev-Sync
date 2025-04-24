import { useState } from "react";
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

  const generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substring(2, 9);
  };

  const handleAddMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        id: generateUniqueId(),
        name: "",
        frequency: "",
        instructions: "",
      },
    ]);
  };

  const handleRemoveMedicine = (id) => {
    if (medicines.length > 1) {
      setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
    }
  };

  const handleMedicineChange = (id, field, value) => {
    setMedicines((prev) =>
      prev.map((medicine) =>
        medicine.id === id ? { ...medicine, [field]: value } : medicine
      )
    );
  };

  const handleClose = () => {
    setMedicines([{ id: 1, name: "", frequency: "", instructions: "" }]);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prescription = {
      appointmentId: patient._id,
      patientInfo: patient,
      date: new Date().toISOString().split("T")[0],
      medicines: medicines?.map(({ id, ...rest }) => rest),
    };

    onSubmit(prescription);
    setMedicines([{ id: 1, name: "", frequency: "", instructions: "" }]);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Create Prescription</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Prescribe medication for {patient?.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Medications</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMedicine}
                className="cursor-pointer"
              >
                Add Medicine
              </Button>
            </div>

            {medicines.map((medicine) => (
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save Prescription</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
