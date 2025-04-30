// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Star, GraduationCap, Clock } from "lucide-react";
import { Link } from "react-router";
import { DollarSign } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full border-sky-100 hover:shadow-md transition-shadow overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-sky-100">
              <AvatarImage
                className={"object-cover scale-105"}
                src={doctor.image}
                alt={doctor.name}
              />
              <AvatarFallback className="bg-sky-100 text-sky-800 text-xl">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold text-sky-800 mt-3">
              {doctor.name}
            </h3>
            <p className="text-sky-600">{doctor.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sky-700">{doctor.rating}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 text-sky-500 mt-0.5" />
              <div>
                <div className="font-medium text-sky-800">Education</div>
                <div className="text-sky-600">{doctor.education}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="h-4 w-4 text-sky-500 mt-0.5" />
              <div>
                <div className="font-medium text-sky-800">Experience</div>
                <div className="text-sky-600">{doctor.experience}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-sky-500 mt-0.5" />
              <div>
                <div className="font-medium text-sky-800">Availability</div>
                <div className="text-sky-600">{doctor.availability}</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Link to={`/book-appointment/${doctor.name}`}>
            <Button className="w-full bg-sky-600 hover:bg-sky-700 cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" /> Book Appointment
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
