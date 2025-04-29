import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorStatsApi = createApi({
  reducerPath: "doctorStatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getDoctorStats: builder.query({
      query: (email) => `/doctor-stats/${email}`,
    }),
  }),
});

export const { useGetDoctorStatsQuery } = doctorStatsApi;
