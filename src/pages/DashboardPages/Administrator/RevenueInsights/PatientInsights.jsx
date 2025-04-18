import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  BarChart,
  Clock,
  Medal,
  Shield,
  Star,
  User,
} from "lucide-react";

const PatientInsights = ({ patients }) => {
  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Patient Insights
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Overview of patient engagement, spending patterns, and appointment
          trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Patient Table */}
    
      </CardContent>
    </Card>
  );
};

export default PatientInsights;
