import React from "react";

const HeroDoctorSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-[10px] items-center justify-between w-full bg-white p-[10px] rounded-md animate-pulse border border-gray-200">
      {/* Left section with image and info */}
      <div className="flex items-center gap-[15px]">
        <div className="w-[50px] h-[50px] rounded-full bg-gray-300 skeleton"></div>
        <div className="space-y-2">
          <div className="h-[12px] w-[100px] bg-gray-300 rounded-md skeleton"></div>
          <div className="h-[16px] w-[140px] bg-gray-400 rounded-md skeleton"></div>
        </div>
      </div>

      {/* Right section with fee, rating, and button */}
      <div className="flex flex-col gap-2 items-end">
        <div className="flex items-center gap-[10px]">
          <div className="h-[20px] w-[80px] bg-gray-300 rounded-full skeleton"></div>
          <div className="h-[20px] w-[70px] bg-gray-300 rounded-full skeleton"></div>
        </div>
        <div className="h-[28px] w-[130px] bg-gray-400 rounded-md skeleton"></div>
      </div>
    </div>
  );
};

export default HeroDoctorSkeleton;
