import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ProfileSkeleton() {
  return (
    <div className="px-7 pb-12 animate-pulse">
      {/* Header */}
      <div className="space-y-1 mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 xl:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="border shadow-none border-[#e5e7eb]">
            <div className="h-28 bg-muted rounded-t-[12.8px]" />
            <CardContent className="pt-0 relative">
              <div className="flex flex-col items-center -mt-20">
                <Skeleton className="w-28 h-28 rounded-full border-4 border-background shadow-lg" />
                <div className="mt-4 text-center space-y-2">
                  <Skeleton className="h-4 w-32 mx-auto" />
                  <Skeleton className="h-5 w-20 mx-auto rounded-md" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 px-6 py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardFooter>
          </Card>

          {/* Account Info */}
          <Card className="border shadow-none border-[#e5e7eb] pt-6">
            <CardHeader className="py-0">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="space-y-4 p-4 px-6">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-px w-full bg-muted" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-px w-full bg-muted" />
              <Skeleton className="h-4 w-40" />
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6 pb-6">
              <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 xl:col-span-2">
          {/* Profile Progress */}
          <Card className="border shadow-none border-[#e5e7eb]">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="mt-6 pt-4 border shadow-none border-[#e5e7eb]">
            <CardHeader className="pb-3 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 flex justify-between py-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
