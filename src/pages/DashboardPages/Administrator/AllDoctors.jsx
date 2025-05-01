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
import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AvailabilityModal from "@/components/AvailabilityModal/AvailabilityModal";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { IoIosSearch } from "react-icons/io";
import { X } from "lucide-react";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const { consultants, status } = useSelector((state) => state.consultants);
  const search = useSelector((state) => state.consultants.search);
  const sort = useSelector((state) => state.consultants.sort);
  
  const [availabilityModal, setAvailabilityModal] = useState({});
  const [availableDate, setAvailableDate] = useState("");

  // Schema for availability modal (form3)
  const AvailabilityFormSchema = z.object({
    schedule: z
      .string()
      .min(1, "Please select a date")
      .refine(
        (date) => {
          const day = new Date(date).getDay();
          return day >= 1 && day <= 5;
        },
        { message: "Please select a Monday to Friday date" }
      ),
    shift: z.string().min(1, "Please select a shift"),
  });

  const form = useForm({
    resolver: zodResolver(AvailabilityFormSchema),
    defaultValues: {
      schedule: availabilityModal?.schedule || "",
      shift: availabilityModal?.shift || "",
    },
  });

  const handleChangeAvailability = (consultant) => {
    setAvailabilityModal(consultant);
    setAvailableDate(consultant?.schedule);
    document.getElementById("availability_modal").showModal();
  };

  // Handle sort by consultation fee
  const handleSortChange = (value) => {
    dispatch(setSort(value));
    dispatch(fetchAllDoctors({ search, sort: value }));
  };

  // Change search value
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(fetchAllDoctors({ search: e.target.value, sort }));
  };

  useEffect(() => {
    dispatch(fetchAllDoctors({ search, sort }));
  }, [dispatch, search, sort]);

  // Sync form with availabilityModal when it changes
  useEffect(() => {
    if (availabilityModal?._id) {
      form.reset({
        schedule: availabilityModal?.schedule || "",
        shift: availabilityModal?.shift || "",
      });
    }
  }, [availabilityModal, form]);

  return (
    <div className="px-5">
      <div className="flex flex-col">
        {/* Heading of the Table */}
        <DashboardPagesHeader
          title={"Manage Doctors"}
          subtitle={
            "View and manage doctor profiles and manage their schedules or fee"
          }
          icon={FaUserDoctor}
        />

        {/* Main Content */}
        <div className="flex gap-4 lg:flex-row flex-col items-center">
          {/* Search Input */}
          <div className="relative w-full flex xl:flex-1">
            <input
              className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
              value={search}
              onChange={handleSearch}
              type="text"
              required
              placeholder="Search by name or title"
            />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
            {/* shortcut hint */}
           {search && (
             <button
             onClick={() => dispatch(setSearch(""))}
             className="absolute top-[5px] right-1.5 text-[0.6rem] font-bold border border-gray-300 p-[4px] rounded-md text-gray-500 cursor-pointer"
           >
             <X className="w-4 h-4" />
           </button>
           )}
          </div>

          {/* Fee Sort */}
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[205px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className={"font-bold"}
                  value={consultants?.consultation_fee}
                >
                  {" "}
                  Consultation Fee
                </SelectItem>
                <SelectItem value="asc">Lowest To Highest</SelectItem>
                <SelectItem value="desc">Highest To Lowest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Title Filter */}
        </div>
      </div>

      {/* Request Table Data */}
      <div className="md:py-6 py-8 rounded-xl">
        <Table className={"*:w-full border *:rounded-xl"}>
          <TableCaption>A List Of All Doctors</TableCaption>
          <TableHeader>
            <TableRow className={"bg-gray-50 hover:bg-gray-50"}>
              <TableHead></TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead className={"text-xs"}>
                Consultation <br /> Fee
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "loading"
              ? Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 10 }).map((_, j) => (
                      <TableCell key={j}>
                        <div className="skeleton h-8 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : consultants?.map((consultant, index) => (
                  <ConsultantTableRow
                    key={consultant?._id || index}
                    consultant={consultant}
                    index={index}
                    dispatch={dispatch}
                    handleChangeAvailability={handleChangeAvailability}
                  />
                ))}
          </TableBody>
          <TableFooter>
            <TableRow className={"bg-gray-50 hover:bg-gray-50"}>
              <TableCell colSpan={10}>
                Total Doctors:{" "}
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
      {/* AvailabilityModal */}
      <AvailabilityModal form={form} availabilityModal={availabilityModal} />
    </div>
  );
};

export default AllDoctors;
