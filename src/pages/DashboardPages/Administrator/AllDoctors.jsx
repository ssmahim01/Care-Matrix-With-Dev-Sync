import ConsultantTableRow from "@/components/ConsultantTableRow/ConsultantTableRow";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  fetchAllDoctors,
  setSearch,
  setSort,
} from "@/redux/doctors/consultantSlice";
import { useEffect } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const { consultants, status } = useSelector((state) => state.consultants);
  //   console.log(consultants);
  const search = useSelector((state) => state.consultants.search);
  const sort = useSelector((state) => state.consultants.sort);
  // console.log(search);

  // Handle sort by consultation fee
  const handleSortChange = (value) => {
    dispatch(setSort(value));
    dispatch(fetchAllDoctors({ search, sort: value }));
  };

  useEffect(() => {
    dispatch(fetchAllDoctors({ search, sort }));
  }, [dispatch, search, sort]);

  return (
    <div className="lg:w-full md:w-[95%] w-11/12 mx-auto">
      <div className="flex md:flex-row flex-col flex-wrap justify-between items-center">
        {/* Heading of the Table */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
            <FaUserDoctor className="text-2xl text-gray-800" />
            All Doctors
          </h2>
          <p className="text-gray-600 text-base ml-9 font-medium whitespace-pre-line">
            Show information of doctors
          </p>
        </div>

        <div className="flex gap-4 md:flex-row flex-col items-center">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search by name or title..."
              className="border bg-transparent border-gray-300 py-2 pl-4 pr-[65px] outline-none w-full rounded-md focus:border-blue-500"
            />
            <button className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md hover:bg-gray-400 group">
              <IoSearch className="text-[1.3rem] group-hover:text-gray-200" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className={"font-bold"}
                  value={consultants?.consultation_fee}
                >
                  {" "}
                  Fee
                </SelectItem>
                <SelectItem value="asc">Lowest to Highest</SelectItem>
                <SelectItem value="desc">Highest to Lowest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Request Table Data */}
      <div className="md:py-6 py-8 rounded-xl">
        <Table
          className={
            "*:w-full *:rounded-xl border border-gray-200 dark:border-gray-700"
          }
        >
          <TableCaption>A list of all doctors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Consultation Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "loading"
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TableCell>
                      <div className="skeleton h-6 w-5 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-12 w-12 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-32 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-48 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-24 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-20 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-28 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-4 w-32 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-8 w-8 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              : consultants.map((consultant, index) => (
                  <ConsultantTableRow
                    key={consultant?._id || index}
                    consultant={consultant}
                    index={index}
                  />
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total Doctors:</TableCell>
              <TableCell>
                {status === "loading" ? (
                  <div className="skeleton w-8 h-4"></div>
                ) : (
                  consultants.length
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* <dialog id="request_modal" className="modal modal-middle">
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
                  Administrator Note:{" "}
                  <p className="text-gray-700 font-semibold">
                    {requestModal?.adminNotes === ""
                      ? pendingNote
                      : requestModal?.adminNotes}
                  </p>
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
      </dialog> */}
    </div>
  );
};

export default AllDoctors;
