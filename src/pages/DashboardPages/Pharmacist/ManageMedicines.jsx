import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { GiMedicines } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";

const ManageMedicines = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("All Medicines");
  const [page, setPage] = useState(1);

  const {
    data = { medicines: [], totalPages: 1 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-medicines", search, selectedCategory, page],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/pharmacy/manage-medicines?search=${encodeURIComponent(
          search
        )}&category=${encodeURIComponent(selectedCategory)}&page=${page}`
      );
      return data;
    },
  });

  const handlePageChange = (pageNumber) => setPage(pageNumber);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    setPage((prev) => (prev < data.totalPages ? prev + 1 : prev));
  };

  return (
    <div>
      <DashboardPagesHeader
        title={"Manage Medicines"}
        subtitle={"Track And Organize Medicine Inventory Efficiently"}
        icon={GiMedicines}
      />
      {/* Searchbar & add button */}
      <div className="flex justify-between gap-4 items-center flex-wrap mb-8">
        {/* Searchbar */}
        <div className="relative w-full sm:w-[80%] md:w-[70%] lg:w-[60%] product_search_input">
          <input
            className="px-4 py-2 border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search Medicines..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />

          {/* shortcut hint */}
          <div className="absolute top-[5px] right-1.5 text-[0.6rem] font-bold border border-gray-100 p-[8px] rounded-md text-gray-500">
            Ctrl + E
          </div>
        </div>
        {/* My Cart */}
        <div>
          {/* Buttons Container */}
          <div className="flex gap-4"></div>
        </div>
      </div>
      {/* Medicine Table */}
      <Table>
        <TableCaption>A List Of All Medicines</TableCaption>
        <TableHeader>
          <TableRow className={"bg-base-200 hover:bg-base-200"}>
            <TableHead>Image</TableHead>
            <TableHead>Brand || Generic Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Strength</TableHead>
            <TableHead>
              Price <sub className="text-[9px]">(BDT)</sub>
            </TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Manufacture</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 11 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="skeleton h-4 rounded w-full"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data?.medicines?.map((medicine, i) => (
                <TableRow key={medicine._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={medicine.imageURL}
                        alt="Medicine Image"
                        className="w-24 h-16"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {medicine.brandName || "N/A"} ||{" "}
                    {medicine.genericName || "N/A"}
                  </TableCell>
                  <TableCell>{medicine.category || "N/A"}</TableCell>
                  <TableCell>{medicine.dosageForm || "N/A"}</TableCell>
                  <TableCell>{medicine.strength || "N/A"}</TableCell>
                  <TableCell>
                    {medicine.price?.amount.toFixed(2) || "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        medicine.availabilityStatus === "In Stock"
                          ? "text-green-500"
                          : medicine.availabilityStatus === "Limited Stock"
                          ? "text-yellow-500"
                          : medicine.availabilityStatus === "Out of Stock"
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    >
                      ●
                    </span>{" "}
                    {medicine.availabilityStatus || "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(medicine.manufactureDate).toLocaleDateString() ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(medicine.expiryDate).toLocaleDateString() ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={
                            "bg-base-200 p-2 rounded border border-border w-fit"
                          }
                        >
                          <MoreVertical className="cursor-pointer text-gray-700" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" /> Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

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
              Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
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
          {data.totalPages > 5 && (
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

export default ManageMedicines;
