import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import PaymentsTable from "./Billing&Payments/PaymentsTable";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import Swal from "sweetalert2";

function ManageBillings() {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch payment data
  const {
    data = {},
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments", page, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payments/all?page=${page}&search=${search}`
      );
      return data;
    },
  });

  // Handle payment deletion
  const handlePaymentDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the payment record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/payments/delete/${id}`);
        if (data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Payment record has been deleted successfully!",
            icon: "success",
          });
        }
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the payment record!",
          icon: "error",
          background: "#ffffff",
          color: "#000000",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  // Pagination Functions
  const handlePageChange = (pageNumber) => setPage(pageNumber);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    setPage((prev) => (prev < data.totalPages ? prev + 1 : prev));
  };

  if (isError) {
    return (
      <div className="p-7">
        <DashboardPagesHeader
          title="Payment Records"
          subtitle="View and Manage All Payment Records"
          icon={CreditCard}
        />
        <div className="text-center text-red-500">
          Error loading payments: {error.message || "Please try again later."}
        </div>
      </div>
    );
  }

  return (
    <div className="px-7">
      <div>
        <DashboardPagesHeader
          title="Payment Records"
          subtitle="Track and Manage All Patient Payment Histories & Records"
          icon={CreditCard}
        />

        {/* search options  */}
        <div className="flex justify-end items-center gap-4 mb-6">
          <div className="relative md:w-2/5">
            <input
              className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring  ring-gray-500"
              placeholder="Search Patient By Name or Number..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          </div>
          <div>
            <Button onClick={() => setSearch("")} className={"cursor-pointer"}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <PaymentsTable
          paymentsData={data?.payments}
          isLoading={isLoading}
          handlePaymentDelete={handlePaymentDelete}
          totalItems={data?.totalItems}
        />
      </motion.div>

      {/* Pagination */}
      <Pagination className="mt-4 flex flex-wrap">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={handlePrevPage}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <PaginationItem key={i}>
                <div className="w-8 h-8 skeleton rounded-md"></div>
              </PaginationItem>
            ))
          ) : (
            <>
              {/* Always show page 1 */}
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={page === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Show left ellipsis if needed */}
              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Show pages around current */}
              {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p !== 1 && p !== data.totalPages && Math.abs(p - page) <= 1
                )
                .map((pageNumber) => (
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
                ))}

              {/* Show right ellipsis if needed */}
              {page < data.totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Always show last page */}
              {data.totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={page === data.totalPages}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(data.totalPages);
                    }}
                  >
                    {data.totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ManageBillings;
