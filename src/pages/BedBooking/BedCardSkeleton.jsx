const BedCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300">
      <div className="relative">
        <div className="absolute right-3 top-3 z-10">
          <div className="h-6 w-16 rounded-full bg-gray-400 skeleton" />
        </div>

        <div className="relative h-[180px] w-full bg-gray-200 skeleton">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="h-6 w-2/4 rounded bg-gray-200 skeleton" />
          <div className="text-right space-y-1">
            <div className="h-3 w-16 rounded bg-gray-200 skeleton" />
            <div className="h-5 w-20 rounded bg-gray-200 skeleton" />
          </div>
        </div>

        <ul className="mb-4 mt-6 space-y-2">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#0E82FD]" />
            <div className="h-4 w-32 rounded bg-gray-200 skeleton" />
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#0E82FD]" />
            <div className="h-4 w-28 rounded bg-gray-200 skeleton" />
          </li>
          <li className="h-3 w-20 rounded bg-gray-200 skeleton" />
        </ul>

        <div className="flex gap-2">
          <div className="h-10 w-2/3 rounded bg-gray-200 skeleton" />
          <div className="h-10 w-1/3 rounded bg-gray-200 skeleton" />
        </div>
      </div>
    </div>
  );
};

export default BedCardSkeleton;
