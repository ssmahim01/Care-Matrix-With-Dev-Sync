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
import { MoreVertical, Eye, Trash } from "lucide-react"; // Using lucide-react for consistency
import moment from "moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";







const handleViewDetails = (payment) => {
    // open a modal  to show details 
    Swal.fire({
      title: "Payment Details",
      html: `
       <div classname="flex flex-col gap-2">
        <p><strong>Patient:</strong> ${payment.appointmentInfo.name}</p>
        <p><strong>Doctor:</strong> ${payment.appointmentInfo.doctorName}</p>
        <p><strong>Amount:</strong> $${payment.amount}</p>
        <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
        <p><strong>Payment Date:</strong> ${moment(payment.paymentDate).format("MMM D, YYYY, h:mm a")}</p>
       <div/>
      `,
      icon: "info",
    });
    // console.log(payment)
  };

const PaymentsTable = ({
  paymentsData,
  isLoading,
    handlePaymentDelete,
}) => (
  <Table aria-label="Payment records table">
    <TableCaption>A List of All Payment Records</TableCaption>
    <TableHeader>
      <TableRow className="bg-base-200 hover:bg-base-200">
        <TableHead>Customer</TableHead>
        <TableHead>Doctor Info</TableHead>
        <TableHead className="text-xs">
          Total <br /> Amount
        </TableHead>
        <TableHead className="text-xs">
          Payment <br /> Status
        </TableHead>
        <TableHead className="text-xs">
          <span>Transaction ID</span>
        </TableHead>
        <TableHead>Payment Date</TableHead>
        <TableHead>Appointment Details</TableHead>
        <TableHead />
        <TableHead>Appointment Status</TableHead>
        <TableHead className="text-right text-xs">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 12 }).map((_, j) => (
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
            <TableCell>
              <div>
                <h1 className="font-normal">
                  <span className="font-semibold">Name:</span>{" "}
                  {payment?.appointmentInfo?.name}
                </h1>
                <h1 className="font-normal">
                  <span className="font-semibold">Email:</span>{" "}
                  {payment?.appointmentInfo?.email}
                </h1>
                <h1 className="font-normal">
                  <span className="font-semibold">Phone:</span>{" "}
                  {payment?.appointmentInfo?.phone}
                </h1>
                <h1 className="font-normal">
                  <span className="font-semibold">Age:</span>{" "}
                  {payment?.appointmentInfo?.age}
                </h1>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <h1 className="font-normal">
                  <span className="font-semibold">Name:</span>{" "}
                  {payment?.appointmentInfo?.doctorName}
                </h1>
                <h1 className="font-normal">
                  <span className="font-semibold">Title:</span>{" "}
                  {payment?.appointmentInfo?.doctorTitle}
                </h1>
              </div>
            </TableCell>
            <TableCell>${payment?.amount.toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xl font-medium rounded ${
                    payment?.paymentStatus === "succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ●
                </span>
                <span className="font-medium">{payment?.paymentStatus}</span>
              </div>
            </TableCell>
            <TableCell>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <div className="mt-1 text-xs flex flex-col font-medium gap-1.5 w-[70px]">
                    <span className="truncate">{payment?.transactionId}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="space-y-1.5 flex flex-col text-sm cursor-pointer">
                  <div className="mt-1 text-xs flex flex-col font-medium gap-1.5">
                    <span>{payment?.transactionId}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>
              {payment?.paymentDate
                ? new Date(payment.paymentDate).toLocaleString().split(",")[0]
                : "N/A"}{" "}
              <br />
              <span className="mt-[1px] text-xs">
                {payment?.paymentDate
                  ? new Date(payment.paymentDate).toLocaleString().split(",")[1]
                  : "N/A"}
              </span>
            </TableCell>
            <TableCell className="max-w-28 overflow-x-auto">
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <div>
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      {payment?.appointmentInfo?.date}
                    </div>
                    <div>
                      <span className="font-semibold">Time:</span>{" "}
                      {payment?.appointmentInfo?.time}
                    </div>
                    <div>
                      <span className="font-semibold">Reason:</span>{" "}
                      {payment?.appointmentInfo?.reason}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="space-y-1.5 flex flex-col text-sm cursor-pointer">
                  <div>
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      {payment?.appointmentInfo?.date}
                    </div>
                    <div>
                      <span className="font-semibold">Time:</span>{" "}
                      {payment?.appointmentInfo?.time}
                    </div>
                    <div>
                      <span className="font-semibold">Reason:</span>{" "}
                      {payment?.appointmentInfo?.reason}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell />
            <TableCell>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xl font-medium rounded ${
                    payment?.appointmentInfo?.status === "pending"
                      ? "text-yellow-600"
                      : payment?.appointmentInfo?.status === "confirmed"
                      ? "text-green-600"
                      : payment?.appointmentInfo?.status === "canceled"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  ●
                </span>
                <span className="font-medium">
                  {payment?.appointmentInfo?.status}
                </span>
              </div>
            </TableCell>
            <TableCell className="flex justify-end">
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
                    </TableCell>
           
           
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

export default PaymentsTable;
