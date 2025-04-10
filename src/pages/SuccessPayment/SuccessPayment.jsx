import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AppointmentInvoice from "../AppointmentInvoice/AppointmentInvoice";

const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentInfo = location?.state?.paymentData;

  const handleBackToHome = () => navigate("/");

  // If paymentInfo is not available, show a fallback message
  if (!paymentInfo) {
    return (
      <div className="w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24 space-y-6 flex flex-col items-center justify-center">
        <p className="text-red-500">Payment information not available.</p>
        <button
          onClick={handleBackToHome}
          className="btn mt-4 hover:bg-green-700 hover:text-white"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24 space-y-6 flex flex-col items-center justify-center">
      

      {/* Invoice Information */}
      <div className="w-full max-w-2xl border rounded-md shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-xl font-bold">Appointment Invoice</h1>
            <p className="text-gray-600">CareMatrix</p>
          </div>
          <div className="text-right">
            <img
              src="https://i.ibb.co.com/0p51x7fq/care-matrix-logo-mainlogo.png"
              alt="CareMatrix Logo"
              className="w-24 mb-2 ml-auto"
            />
            <p className="text-gray-600">Mirpur-10</p>
            <p className="text-gray-600">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Payment Details */}
        <h2 className="text-lg font-semibold mt-6 mb-4">Payment Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Transaction ID:</span>
            <span className="text-gray-800 w-3/5 text-right">{paymentInfo.transactionId}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Amount:</span>
            <span className="text-gray-800 w-3/5 text-right">${paymentInfo.amount}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Payment Date:</span>
            <span className="text-gray-800 w-3/5 text-right">{(paymentInfo.paymentDate.replace("T", ", ").slice(0, -5))}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Status:</span>
            <span className="text-gray-800 w-3/5 text-right">Successful</span>
          </div>
        </div>

        {/* Appointment Info */}
        <h2 className="text-lg font-semibold mt-6 mb-4">Appointment Info</h2>
        <div className="space-y-2">
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Doctor:</span>
            <span className="text-gray-800 w-3/5 text-right">{paymentInfo?.appointmentInfo?.doctorName}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Patient Name:</span>
            <span className="text-gray-800 w-3/5 text-right">{paymentInfo?.appointmentInfo?.name}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Age:</span>
            <span className="text-gray-800 w-3/5 text-right">{paymentInfo?.appointmentInfo?.age}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Date:</span>
            <span className="text-gray-800 w-3/5 text-right">{paymentInfo?.appointmentInfo?.date}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500 w-2/5">Time:</span>
            <span className="text-gray-800 w-3/5 text-right">{paymentInfo?.appointmentInfo?.time}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <PDFDownloadLink
          document={<AppointmentInvoice paymentInfo={paymentInfo} />}
          fileName={`appointment-invoice-${paymentInfo.transactionId}.pdf`}
        >
          {({ loading }) => (
            <button className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded">
              {loading ? "Generating PDF..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>

        <button
          onClick={handleBackToHome}
          className="btn border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white px-6 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;