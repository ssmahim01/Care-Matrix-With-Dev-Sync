import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SkeletonChatDashboard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="skeleton h-8 w-1/3 rounded" />
        <div className="skeleton h-4 w-1/5 rounded mt-2" />
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4 h-[500px]">
        {/* Chat Partners List */}
        <div className="w-full lg:w-1/4 border-r">
          <div className="skeleton h-6 w-1/4 rounded mb-4" />
          <ul className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index} className="skeleton h-8 w-3/4 rounded" />
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="border-b p-2">
            <div className="skeleton h-6 w-1/3 rounded" />
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`skeleton h-10 rounded ${
                  index % 2 === 0 ? "w-1/2 ml-auto" : "w-1/3"
                }`}
              />
            ))}
          </div>
          <div className="border-t p-2 flex gap-2">
            <div className="skeleton h-10 w-full rounded" />
            <div className="skeleton h-10 w-20 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}