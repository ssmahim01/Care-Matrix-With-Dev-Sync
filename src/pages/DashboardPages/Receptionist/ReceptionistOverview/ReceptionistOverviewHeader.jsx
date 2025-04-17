import { Badge } from "@/components/ui/badge";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, TrendingUp } from "lucide-react";
import { MdReport } from "react-icons/md";
import { format } from "date-fns";

const ReceptionistOverviewHeader = () => {
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
      <div>
        <DashboardPagesHeader
          title="Receptionist Overview"
          subtitle="View Doctor Appointments and Bed Availability to improve performance"
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
      
    </div>
  );
};

export default ReceptionistOverviewHeader;
