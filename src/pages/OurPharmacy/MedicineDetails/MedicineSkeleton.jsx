import React from "react";

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const CircleSkeleton = ({ size = "w-10 h-10" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${size}`} />
);

const MedicineSkeleton = () => {
  return (
    <div className="pt-24 pb-12 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden bg-white">
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <SkeletonBox className="w-20 h-6 bg-gray-300" />
              <SkeletonBox className="w-32 h-6 bg-gray-300" />
            </div>
            <SkeletonBox className="w-full h-100 lg:h-110" />
          </div>

          {/* Product Details (Desktop only) */}
          <div className="hidden lg:block border border-gray-200 rounded-lg p-4">
            <SkeletonBox className="w-32 h-5 mb-4" />
            <div className="grid grid-cols-2 gap-y-2">
              {[...Array(6)].map((_, index) => (
                <React.Fragment key={index}>
                  <SkeletonBox className="w-20 h-4" />
                  <SkeletonBox className="w-24 h-4" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Medicine Name */}
          <div>
            <SkeletonBox className="w-1/5 h-9 mb-2" />
            <SkeletonBox className="w-2/6 h-5 mb-2" />
            <SkeletonBox className="w-24 h-6" />
          </div>

          <SkeletonBox className="h-px my-4 bg-gray-300" />

          {/* Price + Countdown */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <SkeletonBox className="w-20 h-9" />
              <SkeletonBox className="w-16 h-5" />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CircleSkeleton size="w-4 h-4" />
                <SkeletonBox className="w-20 h-3.5" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded p-2 text-center">
                    <SkeletonBox className="w-6 h-6 mx-auto" />
                    <SkeletonBox className="w-10 h-3 mt-1 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <SkeletonBox className="w-24 h-4" />
            <SkeletonBox className="h-4" />
            <SkeletonBox className="h-4" />
          </div>

          <SkeletonBox className="h-px my-4 bg-gray-300" />

          {/* Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-md overflow-hidden">
              <SkeletonBox className="w-10 h-10" />
              <SkeletonBox className="w-12 h-10" />
              <SkeletonBox className="w-10 h-10" />
            </div>
            <CircleSkeleton />
            <SkeletonBox className="flex-1 h-11 rounded-md" />
          </div>

          {/* Product Details (Mobile only) */}
          <div className="lg:hidden border border-gray-200 rounded-lg p-4">
            <SkeletonBox className="w-32 h-5 mb-4" />
            <div className="grid grid-cols-2 gap-y-2">
              {[...Array(6)].map((_, index) => (
                <React.Fragment key={index}>
                  <SkeletonBox className="w-20 h-4" />
                  <SkeletonBox className="w-24 h-4" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Manufacturer & Supplier */}
          <div>
            <div className="grid grid-cols-2 gap-2">
              <SkeletonBox className="h-10" />
              <SkeletonBox className="h-10" />
            </div>
            <div className="p-4 border rounded-md mt-2">
              <SkeletonBox className="w-44 h-4 mb-2" />
              <SkeletonBox className="w-32 h-3.5 mb-2" />
              <SkeletonBox className="w-26 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineSkeleton;
