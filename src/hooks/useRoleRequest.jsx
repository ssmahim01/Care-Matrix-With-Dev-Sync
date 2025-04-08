import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const useRoleRequest = () => {
    const { user } = useSelector((state) => state.auth);
    const [search, setSearch] = useState("");
    
    const {
      data: requestedData = [],
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["requestedData", user?.uid],
      queryFn: async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-requests/${user?.uid}?search=${encodeURIComponent(search)}`
        );
        return data.data;
      },
    });

    return [requestedData, refetch, isLoading, search, setSearch];
}

export {useRoleRequest};