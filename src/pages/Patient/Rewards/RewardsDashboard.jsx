import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useAuthUser } from "@/redux/auth/authActions";
import { Award, BatteryPlus, TicketCheck } from "lucide-react";
import RewardsSkeleton from "@/components/RewardsSkeleton/RewardsSkeleton";

const RewardsDashboard = () => {
  const user = useAuthUser();
  const queryClient = useQueryClient();
  const [selectedReward, setSelectedReward] = useState(null);

  // Fetch patient’s rewards data
  const { data: rewardsData, isLoading: rewardsLoading } = useQuery({
    queryKey: ["rewards", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/rewards/${user?.email}`
      );
      return res.data;
    },
  });

  // Fetch available rewards
  const { data: availableRewards, isLoading: rewardsListLoading } = useQuery({
    queryKey: ["available-rewards"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/rewards/available-rewards`
      );
      return res.data;
    },
  });

  // Mutation to redeem a reward
  const redeemMutation = useMutation({
    mutationFn: (rewardId) =>
      axios.post(`${import.meta.env.VITE_API_URL}/rewards/redeem-reward`, {
        userEmail: user?.email,
        rewardId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["rewards", user?.email]);
      toast.success(`Reward redeemed! Voucher: ${data.data.voucherCode}`);
      setSelectedReward(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to redeem reward");
    },
  });

  if (rewardsLoading || rewardsListLoading) return <RewardsSkeleton />;

  const handleRedeem = (rewardId) => {
    redeemMutation.mutate(rewardId);
  };

  return (
    <div className="lg:w-full w-11/12 mx-auto pb-8">
      <h2 className="text-2xl font-bold mb-3 flex gap-2 items-center">
        <Award className="w-6 h-6" />
        <span>Your Rewards</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Points Summary */}
        <Card className={"py-2 bg-base-200 shadow-md border border-base-300"}>
          <CardHeader>
            <CardTitle
              className={
                "flex gap-2 items-center border-b-2 border-base-300 pb-2"
              }
            >
              <BatteryPlus className="w-8 h-8" />
              <span className="text-lg">Points Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-blue-600">
              {rewardsData?.totalPoints || 0} Points
            </p>
            <p className="text-gray-600 mt-2">
              Earned from your booked appointments!
            </p>
          </CardContent>
        </Card>

        {/* Rewards List */}
        <Card className={"py-2 bg-base-200 shadow-md border border-base-300"}>
          <CardHeader>
            <CardTitle
              className={
                "flex gap-2 items-center border-b-2 border-base-300 pb-2"
              }
            >
              <TicketCheck className="w-7 h-7" />
              <span className="text-lg">Redeem Rewards</span>
            </CardTitle>

            <p className="text-gray-600 mt-2">
              Earn more award from book appointment!
            </p>
          </CardHeader>
          <CardContent>
            {availableRewards?.rewards.length > 0 ? (
              <ul className="space-y-3">
                {availableRewards.rewards.map((reward) => (
                  <li
                    key={reward._id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <p className="text-sm text-gray-600">
                        {reward.pointsRequired} Points
                      </p>
                    </div>
                    <Button
                      onClick={() => handleRedeem(reward._id)}
                      disabled={
                        rewardsData?.totalPoints < reward.pointsRequired
                      }
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Redeem
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No rewards available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Back to Home */}
      <div className="mt-4">
        <Link to="/">
          <Button
            variant="outline"
            className={
              "bg-sky-500 hover:bg-sky-600 hover:text-white/90 text-white font-bold cursor-pointer"
            }
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RewardsDashboard;
