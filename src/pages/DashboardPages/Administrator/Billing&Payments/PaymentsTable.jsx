import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreVertical, Eye, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Swal from "sweetalert2";
import { format } from "date-fns";
import moment from "moment";
import { capitalize } from "lodash";

const handleViewDetails = (payment) => {
  Swal.fire({
    title: "Appointment Details",
    html: `
      <div class="flex flex-col max-h-80 overflow-y-auto gap-4 text-left text-sm rounded-md">
        <!-- Patient Details -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Patient Details</h3>
          <div class="flex flex-col gap-2">
            <p><strong>Name:</strong> ${payment.appointmentInfo.name}</p>
            <p><strong>Email:</strong> ${payment.appointmentInfo.email}</p>
            <p><strong>Phone:</strong> ${payment.appointmentInfo.phone}</p>
            <p><strong>Age:</strong> ${payment.appointmentInfo.age}</p>
            <p><strong>Date:</strong> ${payment.appointmentInfo.date}</p>
            <p><strong>Time:</strong> ${payment.appointmentInfo.time}</p>
            <p><strong>Reason:</strong> ${
              payment.appointmentInfo.reason || "Not specified"
            }</p>
            <p><strong>Status:</strong> <span class="${
              payment.appointmentInfo.status === "pending"
                ? "text-yellow-600"
                : "text-green-600"
            } font-medium">${(payment.appointmentInfo.status)}</span></p>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200 my-4">

        <!-- Doctor Details -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Doctor Details</h3>
          <div class="flex flex-col gap-2">
            <p><strong>Name:</strong> ${payment.appointmentInfo.doctorName}</p>
            <p><strong>Title:</strong> ${payment.appointmentInfo.doctorTitle}</p>
            <p><strong>Doctor ID:</strong> ${payment.appointmentInfo.doctorId}</p>
            <p><strong>Consultation Fee:</strong> ${
              payment.appointmentInfo.consultationFee
            }</p>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-gray-200 my-4">

        <!-- Payment Details -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Payment Details</h3>
          <div class="flex flex-col gap-2">
            <p><strong>Payment Status: <span class="text-green-600">${payment.paymentStatus}<span/></strong>
            <p><strong>Amount:</strong> $${payment.amount.toFixed(2)}</p>
            <p><strong>Payment Date:</strong> ${moment(payment.paymentDate).format(
              "MMM D, YYYY, h:mm a"
            )}</p>
            <p><strong>Transaction ID:</strong> <span title="${
              payment.transactionId
            }">${(payment.transactionId)}</span></p>
            <p><strong>Created At:</strong> ${moment(payment.createdAt).format(
              "MMM D, YYYY, h:mm a"
            )}</p>
          </div>
        </div>
      </div>
    `,
    icon: "info",
    confirmButtonText: "OK",
    customClass: {
      popup: "rounded-lg",
      title: "text-xl",
      confirmButton: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md",
    },
  });
};

const PaymentsTable = ({ paymentsData, isLoading, handlePaymentDelete, totalItems }) => (
  <Table aria-label="Payment records table">
    <TableCaption>
      A List of All - {totalItems} Payment Records
    </TableCaption>
    <TableHeader>
      <TableRow className="bg-base-200 hover:bg-base-200">
        <TableHead>Patient Info</TableHead>
        <TableHead className="md:pr-">Doctor</TableHead>
        <TableHead className={"text-xs"}>
          Paid <br /> Amount
        </TableHead>
        <TableHead className={"text-xs"}>
          Payment <br /> Status
        </TableHead>
        <TableHead className={"text-xs"}>
          Payment <br /> Date
        </TableHead>
        <TableHead>Transaction ID</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 7 }).map((_, j) => (
              <TableCell key={j}>
                <div className="skeleton h-8 rounded w-full"></div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : paymentsData?.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={12}
            className="text-center font-medium text-gray-800 py-4 border-y"
          >
            No Payment Records Available
          </TableCell>
        </TableRow>
      ) : (
        paymentsData?.map((payment, idx) => (
          <TableRow key={idx}>
            {/* Patient Info */}
            <TableCell>
              <div className="flex flex-col font-medium text-sm">
                <span>
                  Name:{" "}
                  <span className="font-normal">
                    {payment?.appointmentInfo?.name}
                  </span>
                </span>
                <span>
                  Email:{" "}
                  <span className="font-normal">
                    {payment?.appointmentInfo?.email}
                  </span>
                </span>
                <span>
                  Phone:{" "}
                  <span className="font-normal">
                    {payment?.appointmentInfo?.phone}
                  </span>
                </span>
              </div>
            </TableCell>
            <TableCell className="md:pr-">
              <div className="flex flex-col">
                <span className="font-medium">
                  {payment?.appointmentInfo?.doctorName}
                </span>
                <span className="text-xs text-gray-500">
                  {payment?.appointmentInfo?.doctorTitle}
                </span>
              </div>
            </TableCell>
            <TableCell>${payment?.amount.toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xl font-medium ${
                    payment?.paymentStatus === "succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ●
                </span>
                <span className="capitalize font-medium">
                  {payment?.paymentStatus}
                </span>
              </div>
            </TableCell>
            <TableCell>
              {payment?.paymentDate
                ? format(new Date(payment.paymentDate), "dd MMM yyyy")
                : "N/A"}
            </TableCell>
            <TableCell>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="truncate max-w-[200px] inline-block">
                    {payment?.transactionId}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{payment?.transactionId}</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                      <MoreVertical
                        className="cursor-pointer text-gray-700"
                        aria-label="More actions"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(payment)}
                      className="cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handlePaymentDelete(payment?._id)}
                      className="cursor-pointer"
                    >
                      <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

export default PaymentsTable;
