import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

const StatusTracker = ({ currentStatus }) => {
  const statuses = [
    "Pending",
    "Processing",
    "Ready for Pickup",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  // Find the index of the current status
  const currentIndex = statuses.indexOf(currentStatus);

  // If status is Canceled or Refunded, show special tracker
  if (currentStatus === "Canceled" || currentStatus === "Refunded") {
    return (
      <div className="relative">
        <div className="flex items-center justify-between w-full">
          {statuses.map((status, index) => (
            <div key={status} className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                  ${
                    index === 0
                      ? "bg-gray-200 border-gray-300"
                      : "bg-gray-100 border-gray-200"
                  }`}
              >
                {index === 0 ? (
                  currentStatus === "Canceled" ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <RotateCcw className="h-4 w-4 text-orange-500" />
                  )
                ) : (
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                )}
              </div>
              <p
                className={`text-xs mt-1 text-center ${
                  index === 0 ? "font-medium" : "text-muted-foreground"
                }`}
              >
                {status}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
        <div className="mt-4 p-3 border border-red-200 bg-red-50 rounded-md text-center">
          {currentStatus === "Canceled" ? (
            <p className="text-red-700 text-sm">This order has been canceled</p>
          ) : (
            <p className="text-orange-700 text-sm">
              This order has been refunded
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full">
        {statuses.map((status, index) => {
          // Determine if this status is active, completed, or upcoming
          const isCompleted = currentIndex > index;
          const isActive = currentIndex === index;
          const isUpcoming = currentIndex < index;

          return (
            <div key={status} className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                  ${
                    isCompleted
                      ? "bg-green-100 border-green-500"
                      : isActive
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : isActive ? (
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                )}
              </div>
              <p
                className={`text-xs mt-1 text-center 
                  ${
                    isCompleted
                      ? "text-green-700 font-medium"
                      : isActive
                      ? "text-blue-700 font-medium"
                      : "text-muted-foreground"
                  }`}
              >
                {status}
              </p>
            </div>
          );
        })}
      </div>
      <div className="absolute top-[14.5px] left-2 right-2.5 h-0.5 bg-gray-200" />
      <div
        className="absolute top-[14.5px] left-2 h-0.5 bg-green-500"
        style={{
          width: `${
            currentIndex === 0
              ? 0
              : currentIndex >= statuses.length - 1
              ? 100
              : (currentIndex / (statuses.length - 1)) * 100
          }%`,
        }}
      ></div>
    </div>
  );
};

export default StatusTracker;
