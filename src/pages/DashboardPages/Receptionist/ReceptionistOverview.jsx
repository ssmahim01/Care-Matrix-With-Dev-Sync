import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReceptionistOverviewHeader from "./ReceptionistOverview/ReceptionistOverviewHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReceptionistOverview = () => {
  const [overviewData, setOverviewData] = useState({
    totalAppointments: 0,
    totalPendingAppointments: 0,
    totalApprovedAppointments: 0,
    upcomingAppointments: 0,
    appointmentStatusBreakdown: [],
    appointmentsPerDoctor: [],
    appointmentsPerDate: [],
    appointmentsPerReason: [],
    totalBeds: 0,
    totalAvailableBeds: 0,
    totalOccupiedBeds: 0,
    totalRequestedBeds: 0,
    bedStatusBreakdown: [],
    bedsPerType: [],
    totalBedBookings: 0,
    totalPendingBedBookings: 0,
    totalApprovedBedBookings: 0,
    upcomingAdmissions: 0,
    bedBookingStatusBreakdown: [],
    bedBookingsPerType: [],
    bedBookingsPerAdmissionDate: [],
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/receptionist/stats`
        );
        setOverviewData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
    fetchOverviewData();
  }, []);

  // Sample recent activity data (since the API doesn't provide this directly, we'll mock it for now)
  const recentActivity = [
    {
      patient: "Kuddus ali",
      type: "Appointment",
      details: "Dr. Daniel Lee",
      status: "pending",
    },
    {
      patient: "Jorina",
      type: "Bed request",
      details: "ROYAL SUITE",
      status: "pending",
    },
  ];

  // Data for Appointment Overview bar charts
  const appointmentOverviewData = [
    {
      name: "Doctor Appointments",
      value: overviewData.totalApprovedAppointments,
    },
    { name: "Bed Requests", value: overviewData.totalApprovedBedBookings },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 px-7 md:gap-8">
      {/* Header */}
      {/* Sales Report Header */}
      <ReceptionistOverviewHeader
      //   handleDownload={handleDownload}
      //   sortedRevenueData={sortedRevenueData}
      //   fileName={`Sales_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`}
      />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
          {/* All Tablist */}
          <TabsList className="border py-6 px-1">
            <TabsTrigger
              value="overview"
              className={"cursor-pointer py-2 px-4"}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className={"cursor-pointer py-2 px-4"}
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className={"cursor-pointer py-2 px-4"}
            >
              Bed Requests
            </TabsTrigger>
          </TabsList>
          {/* 1st Tab Content */}
          
          {/* 2nd Tab Content */}
          
          {/* 3rd Tab Content */}
       
          {/* 4th Tab Content */}
         
        </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Patients
            </CardTitle>
            <svg
              className="w-5 h-5 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {overviewData.totalAppointments + overviewData.totalBedBookings}
            </p>
            <p className="text-sm text-gray-500">Registered in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Appointments
            </CardTitle>
            <svg
              className="w-5 h-5 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {overviewData.totalPendingAppointments}
            </p>
            <p className="text-sm text-gray-500">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-sm font-medium text-gray-600">
              Doctor Appointments
            </CardTitle>
            <svg
              className="w-5 h-5 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {overviewData.totalApprovedAppointments}
            </p>
            <p className="text-sm text-gray-500">Scheduled with doctors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-sm font-medium text-gray-600">
              Bed Requests
            </CardTitle>
            <svg
              className="w-5 h-5 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9-2h-2m-6 0H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-2"
              ></path>
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {overviewData.totalPendingBedBookings}
            </p>
            <p className="text-sm text-gray-500">Pending bed allocations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Appointment Overview */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Appointment Overview</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentOverviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4a9c9a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 mb-4">
                Latest appointment requests
              </p>
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-semibold">
                        {activity.patient[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.patient}</p>
                      <p className="text-xs text-gray-500">
                        {activity.type}: {activity.details}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {activity.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistOverview;
