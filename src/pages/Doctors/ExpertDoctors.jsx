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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ExpertDoctors = () => {
  const [selectedSort, setSelectedSort] = useState("")
  const [search, setSearch] = useState("")
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

  return (
    <div>

        {/* section inner */}
        <div className="mx-auto px-4 py-10 md:py-14 lg:py-16">
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

            {/* filter category  */}
            {/* <Select value={category} onValueChange={(value) => {
              setCategory(value)
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categories " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select> */}

            {/* Sort Controls */}
            <Select value={selectedSort} onValueChange={(value) => {
              setSelectedSort(value)
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Fee (Ascending)</SelectItem>
                <SelectItem value="desc">Fee (Descending)</SelectItem>
              </SelectContent>
            </Select>

            <Button className="cursor-pointer" onClick={() => { setSelectedSort(""); setSearch(""); setCategory("") }}>Reset</Button>
          </div>

          {/* section content  */}
          <div className="mt-6 w-11/12 md:w-full mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
              : doctors.map((doctor) => (
                <Link key={doctor._id} to={`/doctors/${doctor._id}`}>
                  <DoctorCard doctor={doctor} />
                </Link>
              ))}
          </div>
        </div>

    </div>
  );
};

export default ExpertDoctors;


