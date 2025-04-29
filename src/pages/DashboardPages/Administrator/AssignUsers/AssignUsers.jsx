import { Button } from "@/components/ui/button";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import AssignUsersTable from "./AssignUsersTable";
import { IoIosSearch } from "react-icons/io";
import { UserPlus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import AssignUserForm from "./AssignUserForm";
import { useQuery } from "@tanstack/react-query";
import AssignDoctorForm from "./AssignDoctorForm";
import axios from "axios";
// import { Toaster } from "sonner";

const AssignUsers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isDoctorFormOpen, setIsDoctorFormOpen] = useState(false);
  const [sort, setSort] = useState("createdAt-desc");

  const sortOptions = {
    "createdAt-desc": "Created At (Newest)",
    "createdAt-asc": "Created At (Oldest)",
    "lastLoginAt-desc": "Login At (Newest)",
    "lastLoginAt-asc": "Login At (Oldest)",
  };

  // Get all assigned users data
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["assigned-users", page, sort, search, selectedRole],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/firebase/users?page=${page}&sort=${sort}&search=${search}&role=${selectedRole}`
      );
      return data;
    },
  });

  // Pagination Functions
  const handlePageChange = (pageNumber) => setPage(pageNumber);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    setPage((prev) => (prev < data.totalPages ? prev + 1 : prev));
  };

  if (error) return "Error While Fetching Data";

  return (
    <div className="px-5">
      {/* <Toaster /> */}

      <DashboardPagesHeader
        title={"Assign New Users"}
        subtitle={
          "Easily add and manage assigned users with specific roles like Doctor, Pharmacist, Receptionist, \n or Admin. View existing assignments and onboard new team members in one place."
        }
        icon={UserPlus}
      />

      {/* Searchbar & Select & Add button */}
      <div className="flex justify-between gap-2 items-center flex-wrap">
        {/* Searchbar */}
        <div className="relative w-full flex xl:flex-1">
          <input
            className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search Users..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          {/* shortcut hint */}
          <button
            onClick={() => setSearch("")}
            className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-300 p-[6px] rounded-md text-gray-500 cursor-pointer"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {/* Select Role */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit"
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter By Role" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value={"administrator"}>
                  {"Administrator"}
                </SelectItem>
                <SelectItem value={"pharmacist"}>{"Pharmacist"}</SelectItem>
                <SelectItem value={"receptionist"}>{"Receptionist"}</SelectItem>
                <SelectItem value={"doctor"}>{"Doctor"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Sort By */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit text-xs"
              value={sort}
              onValueChange={setSort}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort By" className="text-xs">
                  {sortOptions[sort] || "Sort By"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-fit">
                {Object.entries(sortOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value} className={"text-xs"}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Reset & Add Button */}
          <div className="flex items-center flex-wrap gap-2">
            <Button
              onClick={() => {
                setSearch("");
                setSelectedRole("");
                setSort("createdAt-desc");
              }}
              className={"cursor-pointer"}
            >
              Reset
            </Button>
            <Button
              disabled={isDoctorFormOpen}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={"cursor-pointer"}
            >
              Assign New User
            </Button>
            <Button
              disabled={isFormOpen}
              onClick={() => setIsDoctorFormOpen(!isDoctorFormOpen)}
              className={"cursor-pointer"}
            >
              Assign Doctor
            </Button>
          </div>
        </div>
      </div>
      {/* Assign User Form */}
      {isFormOpen && (
        <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
          <AssignUserForm refetch={refetch} setIsFormOpen={setIsFormOpen} />
        </div>
      )}
      {/* Assign Doctor Form */}
      {isDoctorFormOpen && (
        <div className={`${isDoctorFormOpen ? "visible" : "hidden"} mt-4`}>
          <AssignDoctorForm
            refetch={refetch}
            setIsDoctorFormOpen={setIsDoctorFormOpen}
          />
        </div>
      )}
      {/* User Table */}
      <AssignUsersTable
        users={data?.users}
        isLoading={isLoading}
        refetch={refetch}
      />
      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              className={"cursor-pointer"}
              onClick={handlePrevPage}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {isLoading
            ? // Skeleton Loader
              Array.from({ length: 3 }).map((_, i) => (
                <PaginationItem key={i}>
                  <div className="w-8 h-8 skeleton rounded-md"></div>
                </PaginationItem>
              ))
            : // Page Numbers
              Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={pageNumber === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

          {/* Ellipsis */}
          {data?.totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              className={"cursor-pointer"}
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AssignUsers;
