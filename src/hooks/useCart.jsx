import React, { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const loading = useAuthLoading();

  const {
    data: cart = [],
    isLoading: cartLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, cartLoading, refetch];
};

export default useCart;
