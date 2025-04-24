import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Calendar, Clock, DollarSign, Mail } from "lucide-react";

export default function DoctorProfileDialog({
  openDialog,
  setOpenDialog,
  doctor,
}) {
  const {
    data: doctorData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["doctor-profile", doctor],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/firebase/doctor/${doctor}`
      );
      return data;
    },
    enabled: !!doctor,
  });

  if (isLoading) return "Loading...";

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent forceMount className="bg-base-200 max-h-150 overflow-auto">
        <Card className="mt-4 w-full border shadow-sm border-[#e5e7eb] rounded-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-shrink-0">
                <Avatar className="h-28 w-28 rounded-md">
                  <AvatarImage
                    src={doctorData?.image || "/placeholder.svg"}
                    alt={doctorData?.name}
                    className={"object-cover"}
                  />
                  <AvatarFallback className="rounded-md text-xl">
                    {doctorData?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-grow space-y-4">
                <div>
                  <h1 className="text-lg text-gray-700 font-bold">
                    {doctorData?.name}
                  </h1>
                  <p className="text-gray-600">
                    {doctorData?.title} • {doctorData?.experience} experience
                  </p>
                  <div className="mt-1 flex items-center gap-2 md:col-span-3">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {doctorData?.email}
                    </span>
                  </div>
                </div>

                <Separator className={"border-[1px]"} />
                <div className="flex flex-wrap gap-2 w-full md:w-[95%]">
                  {doctorData?.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {service}
                    </Badge>
                  ))}
                </div>

                <Separator className={"border-[1px]"} />
                <p className="text-sm w-full md:w-11/12">{doctorData?.bio}</p>
                <Separator />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Fee: {doctorData?.consultation_fee}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Schedule:{" "}
                      {doctorData?.schedule &&
                        format(
                          new Date(doctorData?.schedule),
                          "eeee, MMMM do, yyyy"
                        )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm flex flex-wrap">
                      Available: {doctorData?.available_days.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{doctorData?.shift}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
