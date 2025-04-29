import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SkeletonChatDashboard() {
  return (
    <Card className="shadow-md border border-gray-200 mt-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <div className="skeleton h-8 w-1/2 rounded" />
          <div className="skeleton h-4 w-1/3 rounded mt-2" />
        </div>
        <div className="skeleton h-4 w-1/5 rounded" />
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4 h-[640px]">
        {/* Chat Partners List */}
        <div className="w-full lg:w-1/4 border-r">
          <div className="skeleton h-6 w-1/4 rounded mb-2" />
          <div className="skeleton h-4 w-3/4 rounded mb-4" />
          <ul className="space-y-2 overflow-y-scroll lg:h-[560px] h-44 py-4 pl-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 rounded cursor-pointer"
              >
                <div className="skeleton w-14 h-14 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton h-4 w-3/4 rounded mb-1" />
                  <div className="flex items-center gap-2">
                    <div className="skeleton h-4 w-1/2 rounded" />
                    <div className="skeleton w-5 h-5 rounded-full" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="skeleton w-14 h-14 rounded-full" />
              <div className="flex flex-col">
                <div className="skeleton h-5 w-1/3 rounded mb-1" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
            </div>
            <div className="skeleton w-10 h-10 rounded-full" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                {index === 1 && (
                  <div className="flex justify-center">
                    <div className="skeleton h-4 w-1/4 rounded" />
                  </div>
                )}
                <div
                  className={`flex items-start gap-2 ${
                    index % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  {index % 2 !== 0 && (
                    <div className="skeleton w-8 h-8 rounded-full" />
                  )}
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="skeleton h-4 w-20 rounded mb-1" />
                    <div
                      className={`skeleton h-10 rounded ${
                        index % 2 === 0 ? "w-1/2" : "w-1/3"
                      }`}
                    />
                    <div className="skeleton h-3 w-12 rounded mt-1" />
                  </div>
                  {index % 2 === 0 && (
                    <div className="skeleton w-8 h-8 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t p-2 flex gap-2">
            <div className="skeleton h-10 flex-1 rounded" />
            <div className="skeleton h-10 w-10 rounded" />
            <div className="skeleton h-10 w-20 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
