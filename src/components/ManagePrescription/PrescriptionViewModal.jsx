import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrescriptionPDF } from "./PrescriptionPDF";

export function PrescriptionViewModal({ prescription, isOpen, onClose }) {
  const [isClient, setIsClient] = useState(false);

  // Handle client-side rendering for react-pdf
  useState(() => {
    setIsClient(true);
  });

  if (!prescription) return null;

  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Prescription Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">Patient Information</h3>
              <p className="text-sm text-gray-600">
                Name: {prescription?.patientInfo?.name}
              </p>
              <p className="text-sm text-gray-600">
                Age: {prescription?.patientInfo?.age}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {prescription?.patientInfo?.phone}
              </p>
              <p className="text-sm text-gray-600">
                Email: {prescription?.patientInfo?.email}
              </p>
              <p className="text-sm text-gray-600 max-w-52 overflow-x-auto">
                Reason:{" "}
                <span className="text-black font-semibold ">
                  {prescription?.patientInfo?.reason}
                </span>{" "}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Doctor Information</h3>
              <p className="text-sm text-gray-600">
                Name: {prescription?.patientInfo.doctorName}
              </p>
              <p className="text-sm text-gray-600">
                Specialty: {prescription?.patientInfo.doctorTitle}
              </p>
              <p className="text-sm text-gray-600">
                Date: {prescription?.date || prescription.patientInfo.date}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Prescribed Medicines</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medicine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instructions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prescription?.medicines.map((medicine, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {medicine.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {medicine.frequency} times daily
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {medicine.instructions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            {isClient && (
              <PDFDownloadLink
                document={<PrescriptionPDF prescription={prescription} />}
                fileName={`prescription-${prescription?.patientInfo.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}.pdf`}
                className="inline-flex"
              >
                {({ loading }) => (
                  <Button disabled={loading}>
                    <Download className="mr-2 h-4 w-4" />
                    {loading ? "Preparing PDF..." : "Download Prescription"}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
