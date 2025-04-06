import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManufacturerSupplier = ({ manufacturer, supplier }) => {
  return (
    <Tabs defaultValue="manufacturer">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="manufacturer">Manufacturer</TabsTrigger>
        <TabsTrigger value="supplier">Supplier</TabsTrigger>
      </TabsList>
      {/* Manufacturer */}
      <TabsContent value="manufacturer" className="p-4 border rounded-md mt-2">
        <div className="space-y-2">
          <h3 className="font-medium">{manufacturer?.name || "N/A"}</h3>
          <p className="text-sm text-[#7F7F88]">
            {manufacturer?.location || "N/A"}
          </p>
          <p className="text-sm">{manufacturer?.contact || "N/A"}</p>
        </div>
      </TabsContent>
      {/* Supplier */}
      <TabsContent value="supplier" className="p-4 border rounded-md mt-2">
        <div className="space-y-2">
          <h3 className="font-medium">{supplier?.name || "N/A"}</h3>
          <p className="text-sm text-[#7F7F88]">
            {supplier?.location || "N/A"}
          </p>
          <p className="text-sm">{supplier?.contact || "N/A"}</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ManufacturerSupplier;
