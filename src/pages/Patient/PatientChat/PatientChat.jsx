import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ChatDashboard from "@/pages/ChatDashboard/ChatDashboard";
import { useAuthUser } from "@/redux/auth/authActions";

const PatientChat = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();

  // Fetch patient details
  const {
    data: patient,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patient", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me/${user?.uid}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center items-center py-20">
        <span className="text-gray-600 font-semibold">Loading...</span>
    </div>;
  }

  if (error || !patient) {
    return <div>Error: Could not load patient details.</div>;
  }

  return (
    <div className="space-y-2">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Welcome, {patient.name}</h1>
        </CardHeader>
        <CardContent>
          <p>
            Manage your appointments and consult with doctors and pharmacists.
          </p>
        </CardContent>
      </Card>

      <ChatDashboard userId={patient._id} userRole="patient" />
    </div>
  );
};

export default PatientChat;
