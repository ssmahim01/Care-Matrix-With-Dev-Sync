import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const MessageCardSkeleton = () => {
  return (
    <Card className="border shadow-sm border-[#e5e7eb] w-full py-4 rounded-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="skeleton h-4 w-32 rounded" />
            <div className="flex items-center space-x-2">
              <div className="skeleton h-3 w-3 rounded-full" />
              <div className="skeleton h-3 w-28 rounded" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="skeleton h-3 w-3 rounded-full" />
              <div className="skeleton h-3 w-24 rounded" />
            </div>
          </div>
          <div className="skeleton h-8 w-8 rounded-lg" />
        </div>
      </CardHeader>

      <CardContent className="-mt-6 space-y-2">
        <div className="skeleton h-3 w-[90%] rounded" />
        <div className="skeleton h-3 w-[80%] rounded" />
      </CardContent>

      <CardFooter className="-mt-1">
        <div className="flex flex-col items-end w-full space-y-1">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-3 w-36 rounded" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessageCardSkeleton;
