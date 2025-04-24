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

const AllDoctors = () => {
  const dispatch = useDispatch();
  const { consultants, status } = useSelector((state) => state.consultants);
  //   console.log(consultants);
  const search = useSelector((state) => state.consultants.search);
  const [availabilityModal, setAvailabilityModal] = useState({});
  const [availableDate, setAvailableDate] = useState("");
  const sort = useSelector((state) => state.consultants.sort);
  // console.log(search);

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
    <div className="px-7">
      <div className="flex md:flex-row flex-col flex-wrap justify-between items-center">
        {/* Heading of the Table */}
        <DashboardPagesHeader
          title={"Manage Doctors"}
          subtitle={
            "View and manage doctor profiles and manage their schedules or fee"
          }
          icon={FaUserDoctor}
        />

        {/* Main Content */}
        <div className="flex gap-4 md:flex-row flex-col items-center">
          {/* Search Input */}
          <label className="input border">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              value={search}
              onChange={handleSearch}
              type="search"
              required
              placeholder="Search by name or title"
            />
          </label>

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
        <Table className={"*:w-full *:rounded-xl"}>
          <TableCaption>A List Of All Doctors</TableCaption>
          <TableHeader>
            <TableRow className={"bg-base-200 hover:bg-base-200"}>
              <TableHead>#</TableHead>
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
            <TableRow>
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

      <AvailabilityModal form={form} availabilityModal={availabilityModal} />
    </div>
  );
};

export default AllDoctors;
