
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, UserRound } from "lucide-react";

export default function SpecialtyCard({
  icon,
  title,
  description,
  patientCount,
  doctorCount,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full border-sky-100 hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
        <CardContent className="p-6 h-full grid place-content-stretch">
          <div className="bg-sky-50 p-3 rounded-full w-fit mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-sky-800 mb-2">{title}</h3>
          <p className="text-sky-600 mb-4">{description}</p>
          <div className="flex items-center gap-4 text-sm text-sky-700">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-sky-500" />
              <span>{patientCount.toLocaleString()}+ Patients</span>
            </div>
            <div className="flex items-center">
              <UserRound className="h-4 w-4 mr-1 text-sky-500" />
              <span>{doctorCount} Doctors</span>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter className="p-6 pt-0">
          <Button
            variant="ghost"
            className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 p-0"
          >
            Learn more <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter> */}
      </Card>
    </motion.div>
  );
}
