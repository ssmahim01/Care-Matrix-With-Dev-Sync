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

// Move the main component content here
export function StaffManagement() {
  // const [showFilters, setShowFilters] = useState(false);
  // const [activeFilters, setActiveFilters] = useState({ role: [] });
  const [page, setPage] = useState(1);
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users", page],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page}`);
      return data;
    },
  });

    // Pagination Functions
    const handlePageChange = (pageNumber) => setPage(pageNumber);
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => {
      setPage((prev) => (prev < data.totalPages ? prev + 1 : prev));
    };

  // const [staff, setStaff] = useState(data);
  // const [filteredStaff, setFilteredStaff] = useState(staff);

  // // Update staff when data changes
  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     setStaff(data);
  //   }
  // }, [data]);

  // // Update filtered staff when data or filters change
  // useEffect(() => {
  //   if (!staff) {
  //     setFilteredStaff(null);
  //     return;
  //   }

  //   if (!staff || !Array.isArray(staff)) {
  //     setFilteredStaff([]);
  //     return;
  //   }

  //   let result = [...staff]

  //   // Apply role filters
  //   if (activeFilters.role.length > 0) {
  //     result = result.filter((member) =>
  //       activeFilters.role.includes(member.role)
  //     );
  //   }

  //   setFilteredStaff(result);
  // }, [staff, activeFilters]);

  // const handleSearch = async (e) => {
  //   const search = e.target.value.toLowerCase();

  //   if (search.trim() === "") {
  //     refetch();
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/user-requests/search?name=${search}`,
  //     )
  //     const newStaff = response.data.filter(dat=> dat.requestedRole !== "Doctor")
  //     setStaff(newStaff)
  //   } catch (error) {
  //     console.error(
  //       "Error searching staff, falling back to client-side search:",
  //       error
  //     );
  //     // Fallback to client-side filtering if the search endpoint fails
  //     const filtered = staff.filter(
  //       (member) =>
  //         member?.name.toLowerCase().includes(search) ||
  //         member?.email.toLowerCase().includes(search) ||
  //         member?.role.toLowerCase().includes(search),
  //     )
  //     setStaff(filtered)
  //   }
  // };

  // const handleFilterChange = (filters) => {
  //   setActiveFilters(filters);
  // };

  return (
    <div className="space-y-6">
      <Tabs>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <section className="shadow-md border px-4 py-2 rounded-2xl">
            <div className="flex gap-2 items-center">
              <span className="font-medium">Total Users:</span>
              <span className="text-sm">{data.totalItems || 0}</span>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                //  onChange={handleSearch}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              // onClick={() => setShowFilters(!showFilters)}
              // className={activeFilters.role.length > 0 ? "bg-primary/10" : ""}
              // aria-expanded={showFilters}
            >
              <Filter
                className={`h-4 w-4 ${
                  ""
                  // activeFilters.role.length > 0 ? "text-primary" : ""
                }`}
              />
              <span className="sr-only">Toggle filters</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              // onClick={async () => {
              //   setStaff(null);
              //   await delay(500);
              //   refetch();
              // }}
              // disabled={isLoading}
            >
              {/* <RefreshCw className={`h-4 w-4 ${staff ? "" : "animate-spin"}`} /> */}
              <span className="sr-only">Refresh</span>
            </Button>
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

        <TabsContent className="mt-6">
          <StaffTable
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
