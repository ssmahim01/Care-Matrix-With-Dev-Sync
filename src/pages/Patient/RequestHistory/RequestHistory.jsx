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
import axios from "axios";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import EmptyState from "@/pages/DashboardPages/PatientOverview/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const RequestHistory = () => {
  const [requestedData, refetch, , search, setSearch] = useRoleRequest();
  const [isLoading, setIsLoading] = useState(true);
  const [requestModal, setRequestModal] = useState({});

  const handleView = (request) => {
    setRequestModal(request);
    document.getElementById("request_modal").showModal();
  };

  const handleCancelRequest = async (id) => {
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

    return () => clearTimeout(timer);
  }, []);

  const pendingNote = (
    <>
      <p className="text-warning font-medium text-sm">
        Waiting for the administrator note...
      </p>
    </>
  );

  return (
    <div className="px-5">
      <div>
        {/* Heading of the Table */}
        <DashboardPagesHeader
          title={"Request History"}
          subtitle={"A complete record of all your previous requests"}
          icon={History}
        />

        <div className="flex justify-end">
          <div className="relative lg:w-2/6 md:w-2/5 w-11/12 ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role or shift..."
              className="border bg-transparent border-border py-1.5 pl-4 pr-[65px] outline-none w-full rounded-md"
            />

            <button className="bg-gray-200 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md hover:bg-gray-300 duration-300 group">
              <IoSearch className="text-[1.3rem] " />
            </button>
          </div>
        </div>
      </div>

      {/* Request Table Data */}
      {requestedData.length === 0 ? (
        <Card
          className={
            "mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
          }
        >
          <CardContent>
            <EmptyState
              icon={History}
              title="No Request History"
              description="You currently have no request history. Once you submit a request, it will appear here for easy tracking and reference."
              actionLabel="Make A Request"
              actionLink="/dashboard/patient/request-form"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="md:py-6 py-8 rounded-xl">
          <Table className={"*:w-full *:rounded-xl"}>
            <TableCaption>A list of your role upgrade requests</TableCaption>
            <TableHeader>
              <TableRow className={"bg-base-200 hover:bg-base-200"}>
                <TableHead></TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead className="text-xs">
                  Request <br /> Date
                </TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-xs">
                  Request <br /> Role
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 11 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="skeleton h-8 rounded w-full"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : requestedData?.map((request, index) => (
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
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>
                  Total Requests: {isLoading ? 0 : requestedData.length}
                </TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </div>
      )}

      <dialog id="request_modal" className="modal modal-middle">
        {requestModal && (
          <div className="overflow-auto w-full flex justify-center items-center">
            <div className="modal-box">
              <div className="flex justify-end">
                <Button
                  onClick={() =>
                    document.getElementById("request_modal").close()
                  }
                  className="cursor-pointer flex items-center gap-2"
                >
                  <CopyX className="w-4 h-4" />
                  <span>Close</span>
                </Button>
              </div>

              <Separator className={"border mt-4"} />

              <div className="flex mt-3 flex-col sm:flex-row sm:items-center gap-5">
                <figure className="w-24 h-24 sm:pr-2 sm:border-r">
                  <img
                    className="w-full h-full overflow-hidden rounded-full object-cover"
                    src={requestModal?.userPhoto}
                    alt={requestModal?.userName}
                  />
                </figure>
                <div>
                  {" "}
                  <h4 className="text-base truncate  text-gray-900 font-semibold">
                    Name:{" "}
                    <span className="text-gray-900 text-sm truncate  w-fit font-normal">
                      {requestModal?.userName}
                    </span>
                  </h4>
                  <h4 className="text-base truncate text-gray-900 font-semibold">
                    Email:{" "}
                    <span className="text-gray-900 text-sm truncate  w-fit font-normal">
                      {requestModal?.userEmail}
                    </span>
                  </h4>
                  <h4 className="text-base truncate text-gray-900 font-semibold">
                    Request Role:{" "}
                    <span className="text-gray-900 text-sm truncate w-fit  font-normal">
                      {requestModal?.requestedRole}
                    </span>
                  </h4>
                </div>
              </div>

              <Separator className={"border mt-2"} />

              <div className="mt-4 w-full space-y-1.5">
                <h4 className="text-base text-gray-900 font-semibold">
                  Shift:{" "}
                  <span className="text-gray-900 text-sm font-normal">
                    {requestModal?.shift}
                  </span>
                </h4>
                <h4 className="text-base text-gray-900 font-semibold">
                  Emergency Contact:{" "}
                  <span className="text-gray-900 text-sm font-normal">
                    {requestModal?.emergencyContact}
                  </span>
                </h4>
                <h4 className="text-base text-gray-900 font-semibold">
                  Available Moment:{" "}
                  <span className="text-gray-900 text-sm font-normal">
                    {new Date(requestModal?.availableDate).toLocaleString(
                      "en-UK"
                    )}
                  </span>
                </h4>
                <h4 className="text-base text-gray-900 font-semibold">
                  Address:{" "}
                  <span className="text-gray-900 text-sm font-normal">
                    {requestModal?.address}
                  </span>
                </h4>
                <h4 className="text-base text-gray-900 font-semibold">
                  Cover Letter:{" "}
                  <span className="text-gray-900 text-sm font-normal">
                    {requestModal?.coverLetter}
                  </span>
                </h4>{" "}
                <h4 className="text-base text-gray-900 font-semibold">
                  Administrator Note:{" "}
                  <p className="text-gray-700 font-semibold">
                    {requestModal?.adminNotes === ""
                      ? pendingNote
                      : requestModal?.adminNotes}
                  </p>
                </h4>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default RequestHistory;
