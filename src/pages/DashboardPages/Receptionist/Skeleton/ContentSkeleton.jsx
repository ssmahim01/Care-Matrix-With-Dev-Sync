import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBox } from "../ReceptionistOverviewSkeleton";


const ContentSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-4 xl:col-span-5 border shadow-none border-[#e5e7eb] w-full py-6">
        <CardHeader>
          <SkeletonBox className="h-5 w-32 mb-2" />
          {/* <SkeletonBox className="h-4 w-60" /> */}
        </CardHeader>
        <CardContent className="px-6">
          <div className="w-full h-[300px] relative rounded-md bg-gray-100 overflow-hidden animate-pulse">
            {/* Vertical grid lines */}
            <div className="absolute top-0 left-[10%] w-px h-full bg-gray-200" />
            <div className="absolute top-0 left-[30%] w-px h-full bg-gray-200" />
            <div className="absolute top-0 left-[50%] w-px h-full bg-gray-200" />
            <div className="absolute top-0 left-[70%] w-px h-full bg-gray-200" />
            <div className="absolute top-0 left-[90%] w-px h-full bg-gray-200" />

            {/* Horizontal grid lines */}
            <div className="absolute top-[25%] left-0 w-full h-px bg-gray-200" />
            <div className="absolute top-[50%] left-0 w-full h-px bg-gray-200" />
            <div className="absolute top-[75%] left-0 w-full h-px bg-gray-200" />

            {/* Simulated chart lines */}
            {/* <svg
              className="absolute w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#a5b4fc"
                strokeWidth="2"
                // points="0,80 20,60 40,70 60,50 80,30 100,40"
              />
              <polyline
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                // points="0,70 20,65 40,55 60,35 80,20 100,25"
              />
            </svg> */}
          </div>
        </CardContent>
      </Card>

      {/* recent activity */}
      <Card className="lg:col-span-3 xl:col-span-2 border shadow-none border-[#e5e7eb] w-full py-6">
        <CardHeader>
          <SkeletonBox className="h-5 w-32 mb-2" />
          {/* <SkeletonBox className="h-4 w-48" /> */}
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-full">
            <div className="w-full h-[300px] relative rounded-md bg-gray-100 overflow-hidden animate-pulse">
              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentSkeleton;
