import { Card, CardContent } from "@/components/ui/card";

const ProductDetails = ({
  dosageForm,
  category,
  batchNumber,
  manufactureDate,
  expiryDate,
  storageConditions,
}) => {
  return (
    <Card className={"border shadow-none border-[#e5e7eb] w-full"}>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-2">Product Details</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-[#7F7F88]">Dosage Form</div>
          <div>{dosageForm || "N/A"}</div>

          <div className="text-[#7F7F88]">Category</div>
          <div>{category || "N/A"}</div>

          <div className="text-[#7F7F88]">Batch Number</div>
          <div>{batchNumber || "N/A"}</div>

          <div className="text-[#7F7F88]">Manufacture Date</div>
          <div>{manufactureDate}</div>

          <div className="text-[#7F7F88]">Expiry Date</div>
          <div>{expiryDate}</div>

          <div className="text-[#7F7F88]">Storage</div>
          <div>{storageConditions || "N/A"}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
