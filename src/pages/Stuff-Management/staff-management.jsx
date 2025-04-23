import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { StaffTable } from "./staff-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function StaffManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt-desc");
  const [selectedRole, setSelectedRole] = useState("");

  const sortOptions = {
    "createdAt-desc": "Created At (Newest)",
    "createdAt-asc": "Created At (Oldest)",
    "lastLoginAt-desc": "Login At (Newest)",
    "lastLoginAt-asc": "Login At (Oldest)",
  };

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users", page, search],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/users?page=${page}&search=${search}&role=${selectedRole}`
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        {/* Searchbar & Select & Reset button */}
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
                  <SelectItem value={"receptionist"}>
                    {"Receptionist"}
                  </SelectItem>
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
            </div>
          </div>
        </div>
      </div>

      {/* <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="transform transition-transform duration-300 ease-in-out">
            <StaffFilters
              staff={staff}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div> */}

      <StaffTable
        users={data?.users}
        isLoading={isLoading}
        refetch={refetch}
        totalUsers={data?.totalItems}
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
}
