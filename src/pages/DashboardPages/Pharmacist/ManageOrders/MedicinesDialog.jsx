import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { GiMedicines } from "react-icons/gi";
import { FaEye } from "react-icons/fa";

const MedicinesDialog = ({ isOpen, setIsOpen, medicines, totalPrice }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className={"p-0"}>
      <DialogTrigger>
        <Button variant={"outline"} className={"cursor-pointer"}>
          <FaEye className="text-slate-700" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4 pt-0 p-4 max-h-[600px] mt-3 overflow-y-auto">
          <h2 className="text-xl font-semibold flex items-center gap-2 mt-2">
            <GiMedicines /> Ordered Medicines List
          </h2>
          <Separator />
          <ul>
            {medicines.map((medicine) => (
              <li
                key={medicine.medicineId}
                className="flex justify-between py-2 border-b"
              >
                <div>
                  <h3 className="font-medium">{medicine.medicineName}</h3>
                  <p className="text-sm text-slate-500">
                    Quantity: {medicine.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Price: ${medicine.price}</p>
                  <p className="text-sm text-slate-500">
                    Subtotal: ${medicine.subtotal}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <h3 className="font-medium">Total Price</h3>
            <p className="font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicinesDialog;
