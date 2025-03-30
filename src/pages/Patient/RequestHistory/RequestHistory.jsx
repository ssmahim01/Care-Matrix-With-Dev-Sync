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
import { useEffect, useState } from "react";
import RequestTableRow from "@/components/RequestTableRow/RequestTableRow";
import { useRoleRequest } from "@/hooks/useRoleRequest";
import { CopyX, History } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

const RequestHistory = () => {
  const [requestedData, refetch] = useRoleRequest();
  const [isLoading, setIsLoading] = useState(true);
  const [requestModal, setRequestModal] = useState({});

  const handleView = (request) => {
    // console.log(request);
    setRequestModal(request);
    document.getElementById("request_modal").showModal();
  };

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
    <div className="lg:w-full md:w-[95%] w-11/12 mx-auto">
      <div className="flex md:flex-row flex-col flex-wrap justify-between items-center">
        {/* Heading of the Table */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
            <History className="text-3xl text-gray-800" />
            Request History
          </h2>
          <p className="text-gray-600 text-base ml-9 font-medium whitespace-pre-line">
            History of all sent requests
          </p>
        </div>

        <div className="lg:w-2/6 md:w-2/5 md:mt-0 mt-4 w-11/12 md:mx-0 mx-auto relative">
          <input
            type="text"
            placeholder="Search by role or shift..."
            className="border bg-transparent border-border py-3 pl-4 pr-[65px] outline-none w-full rounded-md"
          />

          <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md hover:bg-gray-400 group">
            <IoSearch className="text-[1.3rem]  group-hover:text-gray-200" />
          </span>
        </div>
      </div>

      {/* Request Table Data */}
      <div className="md:py-6 py-8 rounded-xl">
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
                  <RequestTableRow
                    key={request?._id || index}
                    request={request}
                    index={index}
                    handleCancelRequest={handleCancelRequest}
                    handleDeleteRequest={handleDeleteRequest}
                    handleView={handleView}
                  />
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

      <dialog id="request_modal" className="modal modal-middle">
        {requestModal && (
          <div className="w-full flex justify-center items-center">
            <div className="modal-box">
              <h2 className="md:text-3xl text-2xl font-bold text-center">
                Details Of Upgrade Request
              </h2>
              <div className="divider md:w-11/12 mx-auto"></div>

              <figure className="w-44 h-44 mx-auto mt-3">
                <img
                  className="w-full h-full border-4 border-muted overflow-hidden rounded-full object-cover"
                  src={requestModal?.userPhoto}
                  alt={requestModal?.userName}
                />
              </figure>

              <div className="divider"></div>

              <div className="w-full space-y-3">
                <h4 className="text-lg text-gray-900 font-bold">
                  Name:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.userName}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Email:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.userEmail}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Request Role:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.requestedRole}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Emergency Contact:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.emergencyContact}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Shift:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.shift}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Available Moment:{" "}
                  <span className="text-gray-700 font-semibold">
                    {new Date(requestModal?.availableDate).toLocaleString(
                      "en-UK"
                    )}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Address:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.address}
                  </span>
                </h4>

                <h4 className="text-lg text-gray-900 font-bold">
                  Cover Letter:{" "}
                  <span className="text-gray-700 font-semibold">
                    {requestModal?.coverLetter}
                  </span>
                </h4>

                <div className="py-3">
                  <button
                    onClick={() =>
                      document.getElementById("request_modal").close()
                    }
                    className="md:px-14 px-10 btn bg-rose-500 text-base text-white font-bold rounded-md flex gap-2 items-center"
                  >
                    <CopyX className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default RequestHistory;
