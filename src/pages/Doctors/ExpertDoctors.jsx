// import Doctors from "../Home/Doctors";

// const ExpertDoctors = () => {
//   return (
//     <div className="lg:w-4/5 w-11/12 mx-auto">
//       <Doctors />
//     </div>
//   );
// };

// export default ExpertDoctors;

import SectionHeader from "@/shared/Section/SectionHeader";
import { easeIn, motion } from "framer-motion";

import React, { useState } from "react";

import DoctorCardSkeleton from "../Doctors/DoctorCardSkeleton";
import useDoctors from "@/hooks/useDoctors";
import { Link } from "react-router";
import DoctorCard from "@/components/DoctorCard";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaUserDoctor } from "react-icons/fa6";

const ExpertDoctors = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("")
  const [doctors, isLoading] = useDoctors(search, selectedSort);

  // console.log(doctors);
  // Skeleton loader component inside the same file
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white p-4 rounded-xl shadow">
      <div className="bg-gray-300 h-32 w-full rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
  // handle clear filter
  const handleClearFilter = () => {
    setSearch("");
    setSelectedSort("");
  };

  return (
    <div>
      {/* section inner */}
      <div className="w-11/12 lg:w-10/12 mt-10 mx-auto max-w-screen-2xl py-12">
        {/* section-header */}
        <SectionHeader
          title_1st_slice={"OUR"}
          title_2nd_slice={"EXPERT"}
          title_3rd_slice={"DOCTORS"}
          subTitle={
            "  Meet our highly skilled team of expert doctors, dedicated to \n providing top-quality medical care with a personalized approach to ensure your well-being."
          }
        />

        <div className="flex justify-center gap-4 my-6 items-center flex-wrap">
          {/* Searchbar */}
          <div className="relative max-w-[400px] w-full flex xl:flex-1">
            <input
              className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
              placeholder="Search with doctor name or department..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          </div>

          {/* Sort Controls */}
          <Select
            value={selectedSort}
            onValueChange={(value) => {
              setSelectedSort(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Fee (Lowest to highest)</SelectItem>
              <SelectItem value="desc">Fee (Highest to lowest)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="cursor-pointer"
            onClick={() => {
              setSelectedSort("");
              setSearch("");
              setCategory("");
            }}
          >
            Reset
          </Button>
        </div>

        {/* section content  */}
        {doctors.length < 1 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <FaUserDoctor className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Doctor Found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Sorry, we couldn't find any doctors matching your criteria. Try
              adjusting your filters.
            </p>
            <Button onClick={handleClearFilter} className="cursor-pointer">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="mt-6 w-11/12 md:w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : doctors?.map((doctor) => (
                  <Link key={doctor._id} to={`/doctors/${doctor._id}`}>
                    <DoctorCard doctor={doctor} />
                  </Link>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDoctors;
