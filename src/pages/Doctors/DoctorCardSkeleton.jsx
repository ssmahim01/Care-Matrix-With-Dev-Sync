import React from "react";

const DoctorCardSkeleton = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg group border border-border block animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full h-full bg-gray-300 rounded-lg skeleton"></div>

      {/* Skeleton Content */}
      <div className="w-full flex items-center justify-center flex-col bg-white text-center p-4 absolute -bottom-0 md:-bottom-14 z-10 transition-all duration-300 group-hover:bottom-0">
        <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-2 skeleton"></div>{" "}
        {/* Skeleton Title */}
        <div className="w-3/4 h-6 bg-gray-300 rounded-md mb-4 skeleton"></div>{" "}
        {/* Skeleton Name */}
        <div className="w-full h-10 bg-gray-300 rounded-md skeleton"></div>{" "}
        {/* Skeleton Button */}
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;
