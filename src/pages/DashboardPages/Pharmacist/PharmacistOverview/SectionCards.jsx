import {
  ArrowDown,
  ArrowUp,
  Flag,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function SectionCards({
  totalBanners,
  totalActive,
  totalInActive,
  totalMedicines,
  totalInStockMedicines,
  totalLimitedStockMedicines,
  totalOutOFStockMedicines,
}) {
  // Calculate percentages
  const activeBannersPercentage =
    totalBanners > 0 ? ((totalActive / totalBanners) * 100).toFixed(1) : 0;
  const limitedStockPercentage =
    totalMedicines > 0
      ? ((totalLimitedStockMedicines / totalMedicines) * 100).toFixed(1)
      : 0;
  const inStockPercentage =
    totalMedicines > 0
      ? ((totalInStockMedicines / totalMedicines) * 100).toFixed(1)
      : 0;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Total Banners Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Total Banners
          </span>
          <div className="flex items-center text-xs font-medium text-emerald-500">
            <Flag className="h-3 w-3 mr-1" />
            {totalBanners} Total
          </div>
        </div>
        <div className="text-3xl font-bold mb-3">{totalBanners}</div>
        <div className="flex items-center text-sm font-medium mb-1">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>
            {totalActive} Active, {totalInActive} Inactive
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {activeBannersPercentage}% of banners currently active
        </div>
      </div>

      {/* Banner Status Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Active Banners
          </span>
          <div className="flex items-center text-xs font-medium text-emerald-500">
            <ArrowUp className="h-3 w-3 mr-1" />
            {activeBannersPercentage}%
          </div>
        </div>
        <div className="text-3xl font-bold mb-3">{totalActive}</div>
        <div className="flex items-center text-sm font-medium mb-1">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>Currently displayed</span>
        </div>
        <div className="text-xs text-gray-500">
          Out of {totalBanners} total banners
        </div>
      </div>

      {/* Total Medicines Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Total Medicines
          </span>
          <div className="flex items-center text-xs font-medium text-emerald-500">
            <Package className="h-3 w-3 mr-1" />
            {totalMedicines} Total
          </div>
        </div>
        <div className="text-3xl font-bold mb-3">{totalMedicines}</div>
        <div className="flex items-center text-sm font-medium mb-1">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>Full inventory tracking</span>
        </div>
        <div className="text-xs text-gray-500">
          {inStockPercentage}% of medicines fully stocked
        </div>
      </div>

      {/* Medicine Stock Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Limited Stock
          </span>
          <div className="flex items-center text-xs font-medium text-red-500">
            <ArrowDown className="h-3 w-3 mr-1" />
            {limitedStockPercentage}%
          </div>
        </div>
        <div className="text-3xl font-bold mb-3">
          {totalLimitedStockMedicines}
        </div>
        <div className="flex items-center text-sm font-medium mb-1">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>Requires attention</span>
        </div>
        <div className="text-xs text-gray-500">
          {totalInStockMedicines} medicines fully in stock
        </div>
      </div>
    </div>
  );
}
