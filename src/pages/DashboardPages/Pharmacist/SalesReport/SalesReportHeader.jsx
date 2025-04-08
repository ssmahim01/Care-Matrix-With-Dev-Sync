import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, Download, FileText, TrendingUp } from "lucide-react";
import { MdReport } from "react-icons/md";
import { format } from "date-fns";

const SalesReportHeader = () => {
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
      <div>
        <DashboardPagesHeader
          title="Sales Report"
          subtitle="View medicine sales performance and revenue insights"
          icon={MdReport}
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
          <FileText className="h-4 w-4" />
          PDF
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          CSV
        </Button>
        <Button size="sm" className="gap-1">
          <TrendingUp className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default SalesReportHeader;
