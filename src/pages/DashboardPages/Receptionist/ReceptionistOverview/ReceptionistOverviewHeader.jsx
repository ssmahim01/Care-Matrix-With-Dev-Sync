import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, Download, FileText, TrendingUp } from "lucide-react";
import { MdReport } from "react-icons/md";
import { format } from "date-fns";
// import RevenueByDayPDF from "./RavenueByDayPdf";
import RevenueByDayPDF from "../../Pharmacist/SalesReport/RavenueByDayPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ReceptionistOverviewHeader = ({ handleDownload, sortedRevenueData, fileName }) => {
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
      <div>
        <DashboardPagesHeader
          title="Receptionist Report"
          subtitle="View Doctor Appointments and Bed Availablity to improve performance"
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
        <PDFDownloadLink
          document={<RevenueByDayPDF sortedRevenueData={sortedRevenueData} />}
          fileName={fileName}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground gap-1"
        >
          {({ loading }) => (
            <>
              <FileText className="h-4 w-4" />
              {loading ? "Generating PDF..." : "PDF"}
            </>
          )}
        </PDFDownloadLink>

        {/* <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          CSV
        </Button> */}
        <Button
          onClick={handleDownload}
          size="sm"
          className="gap-1 hover:cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default ReceptionistOverviewHeader;
