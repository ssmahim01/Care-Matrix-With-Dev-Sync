import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ProductInsightsCard = ({ topSellingMedicines, totalItems }) => {
  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base">Product Insights</CardTitle>
      </CardHeader>
      <CardContent className={"-mt-5"}>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
            <span>Ciproxin is the top selling medicine with 25 units sold</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
            <span>
              Antibiotics (Ciproxin, Dalacin C, Zithromax) are the most popular
              category
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
            <span>
              Top 5 products account for{" "}
              {(
                (topSellingMedicines.reduce(
                  (acc, med) => acc + med.totalQty,
                  0
                ) /
                  totalItems) *
                100
              ).toFixed(1)}
              % of total sales
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductInsightsCard;
