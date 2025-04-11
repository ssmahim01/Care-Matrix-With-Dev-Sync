import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReceptActivity = () => {
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

  return (
    <Card className="lg:col-span-3 xl:col-span-2 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-sm text-gray-500 mb-4">
          Latest appointment requests
        </p>
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
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
            <span className="text-xs text-green-500 bg-gray-100 px-2 py-1 rounded">
              {activity.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReceptActivity;
