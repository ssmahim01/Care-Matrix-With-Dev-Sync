import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { itemVariants } from "@/lib/varients";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ReviewsPagination = ({
  filteredReviews,
  showLoadMore,
  currentPage,
  totalPages,
  handleLoadMore,
  setCurrentPage,
}) => {
  return (
    <div>
      {filteredReviews.length > 0 && (
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={itemVariants}
        >
          {showLoadMore && currentPage < totalPages ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="border-sky-200 text-sky-700 hover:bg-sky-50"
              >
                Load More Reviews
              </Button>
            </motion.div>
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1)
                        setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map(
                  (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ReviewsPagination;
