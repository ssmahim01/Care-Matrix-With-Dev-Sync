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
import RequestForm from "@/pages/RequestForm/RequestForm";
import axios from "axios";
import { CornerUpRight } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRoleRequest } from "@/hooks/useRoleRequest";
import { useEffect, useState } from "react";
import RequestTableRow from "@/components/RequestTableRow/RequestTableRow";

const RoleRequest = () => {
  const [requestedData, refetch] = useRoleRequest();
  const [isLoading, setIsLoading] = useState(true);

  const handleCancelRequest = async (id) => {
    // console.log(id);
    setIsLoading(true);

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

        if (response.status === 200) {
          refetch();
          setIsLoading(false);
          toast.success("Status has been updated");
        }
      }
    });
  };

  const handleDeleteRequest = async (id) => {
    setIsLoading(true);

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
          setIsLoading(false);
          toast.success("Request has been deleted");
        }
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4 lg:w-full w-11/12 mx-auto">
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

      {/* Requested Table Data */}
      <div className="py-8 rounded-xl">
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
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TableCell>
                      <div className="skeleton h-4 w-4" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-12 w-12 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-28" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
              : requestedData.map((request, index) => (
                 <RequestTableRow key={request?._id || index} request={request} index={index} handleCancelRequest={handleCancelRequest} handleDeleteRequest={handleDeleteRequest} />
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total Requests:</TableCell>
              <TableCell>
                {isLoading ? (
                  <div className="skeleton w-8 h-4"></div>
                ) : (
                  requestedData.length
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default RoleRequest;
