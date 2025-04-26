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

const handleViewDetails = (payment) => {
  Swal.fire({
    title: "Payment Details",
    html: `
       <div classname="flex flex-col gap-2">
        <p><strong>Patient:</strong> ${payment.appointmentInfo.name}</p>
        <p><strong>Doctor:</strong> ${payment.appointmentInfo.doctorName}</p>
        <p><strong>Amount:</strong> $${payment.amount}</p>
        <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
        <p><strong>Payment Date:</strong> ${moment(payment.paymentDate).format(
          "MMM D, YYYY, h:mm a"
        )}</p>
       <div/>
      `,
    icon: "info",
  });
};

const PaymentsTable = ({ paymentsData, isLoading, handlePaymentDelete }) => (
  <Table aria-label="Payment records table">
    <TableCaption>A List of All Payment Records</TableCaption>
    <TableHeader>
      <TableRow className="bg-base-200 hover:bg-base-200">
        <TableHead>Patient Info</TableHead>
        <TableHead>Doctor</TableHead>
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
      ) : paymentsData.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={12}
            className="text-center font-medium text-gray-800 py-4 border-y"
          >
            No Payment Records Available
          </TableCell>
        </TableRow>
      ) : (
        paymentsData.map((payment, idx) => (
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
            <TableCell>
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
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <div className="bg-base-200 p-2 rounded border border-border w-fit">
                      <MoreVertical className="cursor-pointer" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(payment)}
                    >
                      <Eye className="w-4 h-4 mr-2" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handlePaymentDelete(payment?._id)}
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
