import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location?.state);
  const paymentInfo = location?.state?.paymentData;
  console.log(paymentInfo);

  const handleBackToHome = () => {
    return navigate("/");
  };
  return (
    <div className="w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24 space-y-4 flex flex-col items-center justify-center">
      <div className="max-w-[800px] w-full min-h-[200px] border rounded-md bg-green-50 p-8 text-center flex flex-col items-center justify-center gap-2 ">
        <span className="text-green-700">
          <FaCheckCircle size={48}></FaCheckCircle>
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-green-700">
          Payment success
        </h2>

        <div className="w-full flex flex-col gap-2 mt-4">
          <div className="flex justify-between gap-2">
            <span>TransactionId:</span>
            <span>{paymentInfo.transactionId}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Amount:</span>
            <span>${paymentInfo.amount}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Payment Date:</span>
            <span>{paymentInfo.paymentDate}</span>
          </div>

          {/* appointment info  */}
          {/* divider  */}
          <div className="flex w-full flex-col">
            <div className="divider font-semibold text-base text-green-700">
              Appointment Details
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <span>Doctor:</span>
            <span>{paymentInfo.appointmentInfo.doctorName}</span>
          </div>

          <div className="flex justify-between gap-2">
            <span>Patient:</span>
            <span>{paymentInfo.appointmentInfo.name}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Age:</span>
            <span>{paymentInfo.appointmentInfo.age}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Date:</span>
            <span>{paymentInfo.appointmentInfo.date}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Time:</span>
            <span>{paymentInfo.appointmentInfo.time}</span>
          </div>
        </div>

        <button
          onClick={handleBackToHome}
          className="btn mt-4 hover:bg-green-700 hover:text-white"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;
