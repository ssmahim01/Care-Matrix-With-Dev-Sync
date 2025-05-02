import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  RotateCcw,
  ShoppingBag,
  Truck,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Ready for Pickup":
        return "bg-purple-100 text-purple-800";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800";
      case "Out for Delivery":
        return "bg-cyan-100 text-cyan-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5" />;
      case "Processing":
        return <Package className="h-5 w-5" />;
      case "Ready for Pickup":
        return <ShoppingBag className="h-5 w-5" />;
      case "Shipped":
        return <Truck className="h-5 w-5" />;
      case "Out for Delivery":
        return <Truck className="h-5 w-5" />;
      case "Delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      case "Canceled":
        return <AlertCircle className="h-5 w-5" />;
      case "Refunded":
        return <RotateCcw className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(
        status
      )}`}
    >
      {getStatusIcon(status)}
      <span className="font-medium text-sm">{status}</span>
    </div>
  );
};

export default StatusBadge;
