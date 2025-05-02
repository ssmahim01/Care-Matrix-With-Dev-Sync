import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  BriefcaseMedical,
  Calendar,
  Clock,
  DollarSign,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const InfoModal = ({ openDialog, setOpenDialog, consultant }) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent forceMount className="bg-base-200 max-h-150 overflow-auto">
        <div className="flex flex-col -mb-4">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
            <BriefcaseMedical className="text-2xl text-gray-800" />
            <span>Doctor Info</span>
          </h2>
          <p className="text-gray-600 text-base ml font-medium whitespace-pre-line">
            The information of doctor are shown here
          </p>
        </div>

        <Card className="mt-4 w-full border shadow-sm border-[#e5e7eb] rounded-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-shrink-0">
                <Avatar className="h-28 w-28 rounded-md">
                  <AvatarImage
                    src={consultant?.image || "/placeholder.svg"}
                    alt={consultant?.name}
                    className={"object-cover"}
                  />
                  <AvatarFallback className="rounded-md text-xl">
                    {consultant?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-grow space-y-4">
                <div>
                  <h1 className="text-lg text-gray-700 font-bold">
                    {consultant?.name}
                  </h1>
                  <p className="text-gray-600">
                    {consultant?.title} • {consultant?.experience} experience
                  </p>
                  <div className="mt-1 flex items-center gap-2 md:col-span-3">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {consultant?.email}
                    </span>
                  </div>
                </div>

                <Separator className={"border-[1px]"} />
                <div className="flex flex-wrap gap-2 w-full md:w-[95%]">
                  {consultant?.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {service}
                    </Badge>
                  ))}
                </div>

                <Separator className={"border-[1px]"} />
                <p className="text-sm w-full md:w-11/12">{consultant?.bio}</p>
                <Separator />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Fee: {consultant?.consultation_fee}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Schedule:{" "}
                      {consultant?.schedule &&
                        format(
                          new Date(consultant?.schedule),
                          "eeee, MMMM do, yyyy"
                        )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Available: {consultant?.available_days.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{consultant?.shift}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
