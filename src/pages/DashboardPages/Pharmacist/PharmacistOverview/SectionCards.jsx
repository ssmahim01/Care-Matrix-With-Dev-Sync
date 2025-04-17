import {
  ArrowDown,
  ArrowUp,
  Banknote,
  CheckCircle,
  Clock,
  Flag,
  Package,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

export default function SectionCards({
  isLoading,
  totalBanners,
  totalActive,
  totalInActive,
  totalMedicines,
  totalInStockMedicines,
  totalLimitedStockMedicines,
  totalOutOFStockMedicines,
  expiredCount,
  nearExpiryCount,
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Total Medicines Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-10 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-3 w-28"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">
                Total Medicines
              </span>
              <div className="flex items-center text-xs font-medium text-emerald-500">
                <Package className="h-3 w-3 mr-1" />
                {totalMedicines} Total
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-3">{totalMedicines}</div>
            <div className="flex items-center text-sm font-medium mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Full inventory tracking</span>
            </div>
            <div className="text-xs text-gray-500">
              {inStockPercentage}% of medicines fully stocked
            </div>
          </>
        )}
      </div>
      {/* Medicine Stock Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-10 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-3 w-28"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">
                Limited Stock
              </span>
              <div className="flex items-center text-xs font-medium text-red-500">
                <ArrowDown className="h-3 w-3 mr-1" />
                {limitedStockPercentage}%
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-3">
              {totalLimitedStockMedicines}
            </div>
            <div className="flex items-center gap-3 text-sm font-medium mb-1">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-base">{totalInStockMedicines}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-base">{totalLimitedStockMedicines}</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-base">{totalOutOFStockMedicines}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              In Stock / Limited / Out of Stock
            </div>
          </>
        )}
      </div>
      {/* Total Banners Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-10 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-3 w-28"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">
                Total Banners
              </span>
              <div className="flex items-center text-xs font-medium text-emerald-500">
                <Flag className="h-3 w-3 mr-1" />
                {totalBanners} Total
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-3">{totalBanners}</div>
            <div className="flex items-center text-sm font-medium mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>
                {totalActive} Active, {totalInActive} Inactive
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {activeBannersPercentage}% of banners currently active
            </div>
          </>
        )}
      </div>
      {/* Expiry Status Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {isLoading ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-10 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-3 w-28"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">
                Expiry Status
              </span>
              <div className="flex items-center text-xs font-medium text-emerald-500">
                <Banknote className="h-5 w-5 mr-1" />
              </div>
            </div>
            <div className="flex items-center gap-3 text-2xl mt-5 font-medium mb-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <span className="text-3xl font-extrabold">
                    {expiredCount}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <span className="text-3xl font-extrabold">
                    {nearExpiryCount}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-xl text-gray-500 font-medium">
              Expired / Near Expiry
            </div>
          </>
        )}
      </div>
    </div>
  );
}
