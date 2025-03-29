import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RequestForm from "@/pages/RequestForm/RequestForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CornerUpRight, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const RoleRequest = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: requestedData = [], refetch } = useQuery({
    queryKey: ["requestedData", user?.uid],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-requests/${user?.uid}`
      );
      return data.data;
    },
  });

  // console.log(requestedData);

  const handleCancelRequest = async (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You will cancel this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
       const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/user-requests/status/${id}`
        );

        if(response.status === 200){
          refetch();
          toast.success("Status has been updated");
        }
      }
    });
  };

  const handleDeleteRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot retrieve this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/user-requests/${id}`
        );
        if (response.status === 200) {
          refetch();
          toast.success("Request has been deleted");
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="mb-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-3">
            <CornerUpRight className="text-4xl text-gray-800" />
            Upgrade Role
          </h2>
          <p className="text-gray-600 text-base ml-1 font-medium whitespace-pre-line">
            Request for change the role
          </p>
        </div>
      </div>

      {/* Request Form */}
      <RequestForm />

      {/* Requested Data */}
      <div className="py-8 overflow-x-auto rounded-xl">
        <Table
          className={
            "*:w-full *:rounded-xl border border-gray-200 dark:border-gray-700"
          }
        >
          <TableCaption>A list of your upgrade requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Request Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestedData.map((request, index) => (
              <TableRow
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                key={request?._id || index}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={request?.userPhoto}
                    alt={request?.userName}
                    className="w-full md:h-14 h-12 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {request?.userName}
                </TableCell>
                <TableCell>{request?.userEmail}</TableCell>
                <TableCell>{request?.contactNumber}</TableCell>
                <TableCell>{request?.shift}</TableCell>
                <TableCell>
                  {new Date(request?.requestDate).toLocaleDateString("en-UK")}
                </TableCell>
                <TableCell>{request?.department}</TableCell>
                <TableCell>{request?.requestedRole}</TableCell>
                <TableCell>
                  <div
                    className={`py-[2px] rounded-full text-white/90 font-bold ${
                      request?.status === "Pending" && "bg-amber-500"
                    } ${request?.status === "Reject" && "bg-rose-500"} ${
                      request?.status === "Assign" && "bg-green-600"
                    } ${request?.status === "Cancel" && "bg-red-500"}`}
                  >
                    <p className="text-center w-full px-3">
                      {request?.status === "Pending" && "Pending"}{" "}
                      {request?.status === "Reject" && "Rejected"}{" "}
                      {request?.status === "Assign" && "Assigned"}
                      {request?.status === "Cancel" && "Cancelled"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={"cursor-pointer"}
                        size="icon"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className={"flex gap-2 cursor-pointer items-center"}
                        onClick={() => handleView(request)}
                      >
                        <Eye className="h-5 w-5" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      disabled={request?.status === "Cancel"}
                        className="cursor-pointer disabled:cursor-not-allowed focus:text-destructive flex gap-2 items-center"
                        onClick={() => handleCancelRequest(request?._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Cancel</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer focus:text-destructive flex gap-2 items-center"
                        onClick={() => handleDeleteRequest(request?._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total Requests:</TableCell>
              <TableCell>{requestedData.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default RoleRequest;
