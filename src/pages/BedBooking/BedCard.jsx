import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BedCard = ({ bed, onRequestBooking, onShowDetails, isLoading }) => {
  const { title, price, image, status, details } = bed || {};

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="absolute right-3 top-3 z-10">
          <Badge
            className={cn(
              "px-2 py-1 text-xs font-medium",
              status === "available" &&
                "bg-green-100 text-green-800 hover:bg-green-100",
              status === "booked" && "bg-red-100 text-red-800 hover:bg-red-100",
              status === "requested" &&
                "bg-amber-100 text-amber-800 hover:bg-amber-100"
            )}
          >
            {status === "available" && (
              <Check className="mr-0.5 mt-[1px] h-3 w-3" />
            )}
            {status === "requested" && (
              <Loader2 className="mr-0.5 mt-[1px] h-3 w-3 animate-spin" />
            )}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        <div className="relative h-[180px] w-full">
          <img
            src={image || ""}
            alt={title}
            width={400}
            height={250}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <div className="text-right">
            <p className="text-xs text-gray-500">Room Tariff</p>
            <p className="text-lg font-bold text-[#0E82FD]">
              {price}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
        </div>

        <ul className="mb-4 space-y-1">
          {details.slice(0, 2).map((detail, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#0E82FD]" />
              {detail}
            </li>
          ))}
          {details.length > 2 && (
            <li className="text-xs text-gray-500">
              +{details.length - 2} more features
            </li>
          )}
        </ul>

        <div className="flex gap-2">
          <Button
            disabled={status !== "available"}
            onClick={() => onRequestBooking(bed)}
            className={cn(
              "flex-1 bg-[#0E82FD] cursor-pointer hover:bg-[#0e6efd]",
              status !== "available" && "opacity-70"
            )}
          >
            {status === "requested" ? "Requested" : "Book Now"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onShowDetails(bed)}
            className="border-blue-200 cursor-pointer text-[#0E82FD] hover:bg-blue-50 hover:text-[#0e6efd]"
          >
            <Info className="mr-1 h-4 w-4" />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BedCard;
