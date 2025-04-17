import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import SectionCards from "./PharmacistOverview/SectionCards";
import SupplierChart from "./PharmacistOverview/SupplierChart";
import ManufacturerChart from "./PharmacistOverview/ManufacturerChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionRequirementChart } from "./PharmacistOverview/PrescriptionChart";
import StorageConditionsTable from "./PharmacistOverview/StorageConditionsTable";
import ManufacturersTable from "./PharmacistOverview/ManufacturersTable";
import SupplierTable from "./PharmacistOverview/SupplierTable";
import CategoryChart from "./PharmacistOverview/CategoryChart";

const PharmacistOverview = () => {
  const axiosPublic = useAxiosPublic();

  // Get Pharmacist-Stats
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pharmacist-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/pharmacist/stats`);
      return data;
    },
  });

  if (isLoading) return "Loading...";

  // Data For Charts
  const chartData =
    stats?.medicinesPerCategory?.map((item) => ({
      category: item.category,
      count: item.count,
    })) || [];

  const manufacturerChartData =
    stats?.medicinesPerManufacturer?.map((item) => ({
      manufacturer: item.manufacturer,
      count: item.count,
    })) || [];

  const supplierChartData =
    stats?.medicinesPerSupplier?.map((item) => ({
      supplier: item.supplier,
      count: item.count,
    })) || [];

  return (
    <div className="space-y-6 px-7">
      {/* Section Cards */}
      <SectionCards
        isLoading={isLoading}
        totalBanners={stats?.totalBanners}
        totalActive={stats?.totalActive}
        totalInActive={stats?.totalInActive}
        totalMedicines={stats?.totalMedicines}
        totalInStockMedicines={stats?.totalInStockMedicines}
        totalLimitedStockMedicines={stats?.totalLimitedStockMedicines}
        totalOutOFStockMedicines={stats?.totalOutOFStockMedicines}
        expiredCount={stats?.expiredCount}
        nearExpiryCount={stats?.nearExpiryCount}
      />
      {/* Category & Prescription Chart */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Medicines Per Category Chart */}
        <CategoryChart chartData={chartData} isLoading={isLoading} />
        {/* Prescription Chart */}
        <div className="lg:col-span-3 xl:col-span-2">
          <Card className="bg-white border border-gray-200 rounded-lg px-4 py-8 shadow-sm col-span-4">
            <CardHeader>
              {isLoading ? (
                <div className="skeleton h-8 w-48 mb-3"></div>
              ) : (
                <>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                    Prescription Requirements
                  </CardTitle>
                  <CardDescription className={"-mt-3 text-sm font-medium"}>
                    Medicines requiring prescription vs over-the-counter
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              <PrescriptionRequirementChart
                data={stats?.prescriptionStats}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Manufacturer & Supplier Table & Storage Condition Table */}
      <div className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* Manufacturer */}
        <Card className="lg:col-span-4 border shadow-none border-[#e5e7eb] w-full py-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
              Top Manufacturers & Suppliers
            </CardTitle>
            <CardDescription className={"-mt-3 text-sm font-medium"}>
              Distribution of medicines by manufacturer and supplier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manufacturers">
              <TabsList className="mb-4 border py-6 px-1">
                <TabsTrigger
                  className={"cursor-pointer py-2 px-8"}
                  value="manufacturers"
                >
                  Manufacturers
                </TabsTrigger>
                <TabsTrigger
                  className={"cursor-pointer py-2 px-8"}
                  value="suppliers"
                >
                  Suppliers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="manufacturers">
                <ManufacturersTable
                  medicinesPerManufacturer={stats?.medicinesPerManufacturer}
                />
              </TabsContent>
              <TabsContent value="suppliers">
                <SupplierTable
                  medicinesPerSupplier={stats?.medicinesPerSupplier}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* Supplier */}
        <Card className="lg:col-span-3 border shadow-none border-[#e5e7eb] w-full py-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
              Storage Conditions
            </CardTitle>
            <CardDescription className={"-mt-3 text-sm font-medium"}>
              Distribution of medicines by storage requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StorageConditionsTable
              storageConditionStats={stats?.storageConditionStats}
            />
          </CardContent>
        </Card>
      </div>
      {/* Manufacturers & Suppliers Charts */}
      <div className="hidden :::flex gap-6 items-center flex-col lg:flex-row w-full">
        {/* Medicines Per Manufacturer Chart */}
        {/* <ManufacturerChart
          manufacturerChartData={manufacturerChartData}
          isLoading={isLoading}
        /> */}
        {/* Medicines Per Supplier Chart */}
        {/* <SupplierChart
          supplierChartData={supplierChartData}
          isLoading={isLoading}
        /> */}
      </div>
    </div>
  );
};

export default PharmacistOverview;
