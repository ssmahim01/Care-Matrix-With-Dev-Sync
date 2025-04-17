import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, CircleDollarSign, Download, TrendingUp} from "lucide-react";
import { format } from "date-fns";

const RevenueInsightsHeader = () => {
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
      <div>
        <DashboardPagesHeader
          title="Revenue Insights"
          subtitle={
            "Get a complete overview of clinic earnings, top-performing doctors, \n and financial trends."
          }
          icon={CircleDollarSign}
        />
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {currentDate}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3" />
            Last 30 days
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          PDF
        </Button>
        <Button size="sm" className="gap-1 hover:cursor-pointer">
          <Download className="h-4 w-4" />
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default RevenueInsightsHeader;
