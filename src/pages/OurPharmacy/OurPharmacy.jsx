import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Medicines from "./Medicines";
import PharmacyNavbar from "./PharmacyNavbar";
import BannerPharma from "@/components/Pharmacy/BannerPharma";
import { medicine_categories } from "@/lib/pharmacy";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { GiMedicines } from "react-icons/gi";

const OurPharmacy = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("All Medicines");

  // Get medicines data
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines", search, selectedCategory, page],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/pharmacy/medicines?search=${encodeURIComponent(
          search
        )}&category=${encodeURIComponent(selectedCategory)}&page=${page}`
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
  // clear filter
  const handleClearFilter = () => {
    setSearch("");
    setCategory("All Medicines");
  };
  // change category
  const handleChangeCategory = (e) => {
    setCategory(e);
    setSearch("");
    setPage(1);
  };

  return (
    <>
      <div className="pt-6 rounded-lg">
        <BannerPharma />
      </div>
      <div className="w-11/12 mx-auto max-w-screen-2xl">
        {/* Pharmacy Navbar */}
        <div className="mt-12">
          <PharmacyNavbar search={search} setSearch={setSearch} />
        </div>
        {/* Medicines */}
        <div className="mt-6 flex flex-col lg:flex-row w-full gap-6">
          {/* categories */}
          <div className="w-full lg:w-4/12 xl:w-3/12 border rounded h-fit">
            <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
              {medicine_categories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChangeCategory(category.category_name)}
                  className={`rounded h-full grid place-content-stretch py-2 px-4 font-medium text-xl tracking-wider w-full text-left cursor-pointer 
                ${
                  selectedCategory === category?.category_name
                    ? "bg-blue-500/95 text-white"
                    : "bg-gray-100 opacity-90 hover:bg-gray-200 duration-300"
                }`}
                >
                  {category?.category_name}
                </button>
              ))}
            </div>
          </div>
          {/* medicines */}
          <div className="w-full lg:w-8/12 xl:w-9/12">
            {data.medicines?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <GiMedicines className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No Medicine Found</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Sorry, we couldn't find any medicines matching your criteria.
                  Try adjusting your filters.
                </p>
                <Button onClick={handleClearFilter} className="cursor-pointer">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Medicines medicines={data.medicines} isLoading={isLoading} />
            )}
          </div>
        </div>
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
    </>
  );
};

export default OurPharmacy;
