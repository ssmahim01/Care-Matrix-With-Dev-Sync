import { Card, CardContent, CardHeader } from "../ui/card";

const RewardsSkeleton = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="skeleton w-6 h-6 rounded-full"></div>
        <div className="skeleton w-32 h-8"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points Summary Skeleton */}
        <Card className="py-2">
          <CardHeader>
            <div className="skeleton w-24 h-6"></div>
          </CardHeader>
          <CardContent>
            <div className="skeleton w-32 h-10 mb-2"></div>
            <div className="skeleton w-48 h-4"></div>
          </CardContent>
        </Card>

        {/* Rewards List Skeleton */}
        <Card className="py-2">
          <CardHeader>
            <div className="skeleton w-32 h-6"></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="skeleton w-24 h-4"></div>
                      <div className="skeleton w-16 h-3"></div>
                    </div>
                    <div className="skeleton w-20 h-10"></div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Back to Home Skeleton */}
      <div className="mt-4">
        <div className="skeleton w-32 h-10"></div>
      </div>
    </div>
  );
};

export default RewardsSkeleton;
