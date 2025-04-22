import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, DollarSign, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DoctorProfile({ doctor }) {
  return (
    <Card className="w-full border shadow-sm border-[#e5e7eb] rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 rounded-md">
              <AvatarImage
                src={doctor?.image || "/placeholder.svg"}
                alt={doctor?.name}
                className={"object-cover"}
              />
              <AvatarFallback className="rounded-md text-xl">
                {doctor?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-grow space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{doctor?.name}</h1>
              <p className="text-muted-foreground">
                {doctor?.title} • {doctor?.experience} experience
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
              {doctor?.services.map((service, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50">
                  {service}
                </Badge>
              ))}
            </div>

            <p className="text-sm w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
              {doctor?.bio}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 w-full md:w-11/12 lg:w-10/12">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Available: {doctor?.available_days.join(", ")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor?.shift}</span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Fee: {doctor?.consultation_fee}</span>
              </div>

              <div className="flex items-center gap-2 md:col-span-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
