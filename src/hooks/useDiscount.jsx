import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosPublic } from "./useAxiosPublic";
import { useAuthUser } from "@/redux/auth/authActions";

const useDiscount = () => {
  const user = useAuthUser();
  const axiosPublic = useAxiosPublic();
  const {
    data: discount = 0,
    isLoading: discountLoading,
    refetch,
  } = useQuery({
    queryKey: ["discount", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosPublic(`/users/discount/${user?.email}`);
      return res.data.discountVoucher;
    },
  });
  return [discount, discountLoading, refetch];
};

export default useDiscount;
