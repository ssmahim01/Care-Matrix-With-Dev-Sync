import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

import { useQuery } from "@tanstack/react-query";
import { Eye, MoreVertical, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AddMedicine from "@/components/Modal/AddMedicine";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { medicine_categories } from "@/lib/pharmacy";
import { Link } from "react-router";
import { toast } from "sonner";

const ManageMedicines = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [setOpen, setIsOpen] = useState(false);
  const [selectedCategory, setCategory] = useState("All Medicines");

  const {
    data = { medicines: [], totalPages: 1 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-medicines", search, selectedCategory, page, sort],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/pharmacy/manage-medicines?search=${encodeURIComponent(
          search
        )}&category=${encodeURIComponent(
          selectedCategory
        )}&sort=${sort}&page=${page}`
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

  // Sort Options
  const sortOptions = {
    "price-asc": "Original Price (asc)",
    "price-desc": "Original Price (desc)",
    "discountedPrice-asc": "Discounted Price (asc)",
    "discountedPrice-desc": "Discounted Price (desc)",
    "manufactureDate-asc": "Manufacture Date (asc)",
    "manufactureDate-desc": "Manufacture Date (desc)",
    "expiryDate-asc": "Expiry Date (asc)",
    "expiryDate-desc": "Expiry Date (desc)",
  };

  // Medicine Delete Function
  const handleMedicineDelete = async (id) => {
    toast("Are you sure? This will permanently delete the medicine", {
      action: {
        label: "Yes, Delete",
        onClick: async () => {
          try {
            const { data } = await axios.delete(
              `${import.meta.env.VITE_API_URL}/pharmacy/delete-medicine/${id}`
            );
            if (data.data.deletedCount) {
              refetch();
              toast.success("Medicine has been deleted successfully!", {
                position: "top-right",
              });
            }
          } catch (error) {
            toast.error(error.message || "Failed to delete the medicine.", {
              position: "top-right",
            });
          }
        },
      },
      cancel: {
        label: "No",
      },
      position: "top-right",
    });
  };

  return (
    <div className="px-5">
      <DashboardPagesHeader
        title={"Manage Medicines"}
        subtitle={"Track And Organize Medicine Inventory Efficiently"}
        icon={GiMedicines}
      />
      {/* Searchbar & Select & Add button */}
      <div className="flex justify-between gap-4 items-center flex-wrap mb-8">
        {/* Searchbar */}
        <div className="relative w-full flex xl:flex-1">
          <input
            className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search Medicines..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />

          {/* shortcut hint */}
          <div className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-100 p-[6px] rounded-md text-gray-500">
            Ctrl + E
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          {/* Select Category */}
          <div className="flex flex-1 w-full">
            <Select value={selectedCategory} onValueChange={setCategory}>
              <SelectTrigger className="w-[100%] md:w-[150px] lg:w-[200px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {medicine_categories.map((item, i) => (
                  <SelectItem key={i} value={item.category_name}>
                    {item.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Sort By */}
          <div className="flex flex-1 w-full">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[100%] md:w-[150px] lg:w-[200px]">
                <SelectValue placeholder="Sort By">
                  {sort ? sortOptions[sort] : "Sort By"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sortOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Reset & Add Button */}
          <div className="flex items-center flex-wrap gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                setCategory("");
                setSearch("");
                setSort("");
              }}
            >
              Reset
            </Button>
            {/* <Button>Add Category</Button> */}
            <AddMedicine
              isOpen={setOpen}
              setIsOpen={setIsOpen}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
      {/* Medicine Table */}
      <Table>
        <TableCaption>A List Of All Medicines</TableCaption>
        <TableHeader>
          <TableRow className={"bg-base-200 hover:bg-base-200"}>
            <TableHead>Image</TableHead>
            <TableHead className={"text-[11px] font-semibold"}>
              Brand <br /> Name
            </TableHead>
            <TableHead className={"text-[11px] font-semibold"}>
              Generic <br /> Name
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Strength</TableHead>
            <TableHead className={"text-[11px] font-semibold"}>
              Main || <br /> Discount Price{" "}
              <sub className="text-[9px]">(BDT)</sub>
            </TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Manufacture</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 13 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="skeleton h-8 rounded w-full"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data?.medicines?.map((medicine) => (
                <TableRow key={medicine._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={medicine?.imageURL}
                        alt="Medicine Image"
                        className="min-w-24 h-16 object-cover"
                      />
                      <AvatarFallback className="max-w-24 h-16 rounded">
                        {medicine?.brandName?.[0] || "M"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell>{medicine?.brandName || "N/A"}</TableCell>
                  <TableCell className={"max-w-[100px]"}>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <div className="truncate">
                          {medicine?.genericName || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>{medicine?.genericName || "N/A"}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={"max-w-[80px]"}>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <div className="truncate">
                          {medicine?.category || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>{medicine?.category || "N/A"}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{medicine?.dosageForm || "N/A"}</TableCell>
                  <TableCell className={"max-w-[40px]"}>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <div className="truncate">
                          {medicine?.strength || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>{medicine?.strength || "N/A"}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={"cursor-pointer"}>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <span>
                          ৳{medicine?.price?.amount || "N/A"} || ৳
                          {medicine?.price?.discount?.discountedAmount || "NA"}
                        </span>
                      </TooltipTrigger>
                      {medicine?.price?.discount && (
                        <TooltipContent>
                          <div className="text-sm">
                            <p>
                              <strong>Currency:</strong> BDT
                            </p>
                            <p>
                              <strong>Discounted Amount:</strong> ৳
                              {medicine?.price?.discount?.discountedAmount}
                            </p>
                            <p>
                              <strong>Valid Until:</strong>{" "}
                              {medicine?.price?.discount?.validUntil}
                            </p>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        medicine.availabilityStatus === "In Stock"
                          ? "text-green-500 mr-1"
                          : medicine.availabilityStatus === "Limited Stock"
                          ? "text-yellow-500 mr-1"
                          : medicine.availabilityStatus === "Out of Stock"
                          ? "text-red-500 mr-1"
                          : "text-gray-500 mr-1"
                      }
                    >
                      ●
                    </span>
                    {medicine?.availabilityStatus || "N/A"}
                  </TableCell>
                  <TableCell className={"truncate max-w-[60px] cursor-pointer"}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{medicine?.manufacturer?.name || "N/A"}</span>
                      </TooltipTrigger>
                      {medicine?.manufacturer?.name && (
                        <TooltipContent
                          className={"space-y-1.5 flex flex-col text-sm"}
                        >
                          <span>
                            <strong>Name:</strong>{" "}
                            {medicine?.manufacturer?.name}
                          </span>
                          <span>
                            <strong>Location:</strong>{" "}
                            {medicine?.manufacturer?.location}
                          </span>
                          <span>
                            <strong>Phone:</strong>{" "}
                            {medicine?.manufacturer?.contact}
                          </span>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell className={"truncate max-w-[80px] cursor-pointer"}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{medicine?.supplier?.name || "N/A"}</span>
                      </TooltipTrigger>
                      {medicine?.supplier.name && (
                        <TooltipContent
                          className={"space-y-1.5 flex flex-col text-sm"}
                        >
                          <span>
                            <strong>Name:</strong> {medicine?.supplier?.name}
                          </span>
                          <span>
                            <strong>Location:</strong>{" "}
                            {medicine?.supplier?.location}
                          </span>
                          <span>
                            <strong>Phone:</strong>{" "}
                            {medicine?.supplier?.contact}
                          </span>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {(medicine?.manufactureDate &&
                      new Date(
                        medicine?.manufactureDate
                      ).toLocaleDateString()) ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {(medicine?.expiryDate &&
                      new Date(medicine?.expiryDate).toLocaleDateString()) ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className={"cursor-pointer"}>
                        <div
                          className={
                            "bg-base-200 p-2 rounded border border-border w-fit"
                          }
                        >
                          <MoreVertical className="cursor-pointer text-gray-700" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/medicine/${medicine._id}`}>
                          <DropdownMenuItem className={"cursor-pointer"}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>{" "}
                        </Link>
                        {/* <DropdownMenuItem className={"cursor-pointer"}>
                          <Pencil className="w-4 h-4 mr-2" /> Update Valid Until
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"cursor-pointer"}>
                          <Pencil className="w-4 h-4 mr-2" /> Update Medicine
                          Price
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"cursor-pointer"}>
                          <Pencil className="w-4 h-4 mr-2" /> Update
                          Availability
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          className={"cursor-pointer"}
                          onClick={() => handleMedicineDelete(medicine?._id)}
                        >
                          <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                          Medicine
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
