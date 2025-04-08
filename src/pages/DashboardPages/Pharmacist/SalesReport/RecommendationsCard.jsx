import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const RecommendationsCard = () => {
  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base">Recommendations</CardTitle>
      </CardHeader>
      <CardContent className={"-mt-5"}>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <TrendingUp className="h-3 w-3 text-amber-500" />
            </div>
            <span>Increase stock levels for top selling antibiotics</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <TrendingUp className="h-3 w-3 text-amber-500" />
            </div>
            <span>
              Consider bundle promotions for frequently purchased medicines
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <TrendingUp className="h-3 w-3 text-amber-500" />
            </div>
            <span>Monitor Lipitor inventory as it has lower sales volume</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
