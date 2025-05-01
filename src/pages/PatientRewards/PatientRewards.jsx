
import { Award, Heart, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/redux/auth/authActions";
import useRole from "@/hooks/useRole";
import { Link } from "react-router";

const PatientRewards = () => {
  const user = useAuthUser();
  const [role] = useRole();

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white pt-20 pb-24">
        <div className="container mx-auto md:px-6 text-center">
          <h1 className="lg:text-5xl text-4xl font-bold mb-3">
            Earn Rewards for a Healthier You
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay motivated with Care Matrix’s Gamification & Rewards System—turn
            healthy habits into exciting rewards!
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[2rem]"></div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto md:w-[86%] w-11/12 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Transform Your Health Journey
          </h2>
          <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
            Our Patient Health Gamification & Rewards System encourages you to
            take charge of your well-being while earning benefits along the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature 1: Healthy Habits */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Build Healthy Habits
            </h3>
            <p className="text-gray-600">
              Get rewarded for sticking to regular check-ups and following your
              medication schedule.
            </p>
          </div>

          {/* Feature 2: Better Outcomes */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Improve Health Outcomes
            </h3>
            <p className="text-gray-600">
              Consistent care leads to better health—our system keeps you on
              track.
            </p>
          </div>

          {/* Feature 3: Engagement */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Stay Engaged
            </h3>
            <p className="text-gray-600">
              Unlock exciting rewards and stay motivated on your health journey.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-14">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            How It Works
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            <div className="flex-1 bg-blue-50 p-6 rounded-lg">
              <span className="text-2xl font-bold text-blue-600">1</span>
              <h4 className="text-lg font-medium text-gray-800 mt-2">
                Track Your Habits
              </h4>
              <p className="text-gray-600 mt-1">
                Log your check-ups and medication adherence in the Care Matrix
                dashboard.
              </p>
            </div>
            <div className="flex-1 bg-blue-50 p-6 rounded-lg">
              <span className="text-2xl font-bold text-blue-600">2</span>
              <h4 className="text-lg font-medium text-gray-800 mt-2">
                Earn Points
              </h4>
              <p className="text-gray-600 mt-1">
                Accumulate points for every healthy action you complete.
              </p>
            </div>
            <div className="flex-1 bg-blue-50 p-6 rounded-lg">
              <span className="text-2xl font-bold text-blue-600">3</span>
              <h4 className="text-lg font-medium text-gray-800 mt-2">
                Redeem Rewards
              </h4>
              <p className="text-gray-600 mt-1">
                Exchange points for discounts, vouchers, or exclusive benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div
          className="mt-16 lg:pl-14 py-28 rounded-lg bg-cover bg-fixed bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/rewards-image.jpg')",
          }}
        >
          <h3 className="lg:text-left text-center md:text-3xl text-2xl font-bold text-white/90 mb-4">
            Ready to Start Earning?
          </h3>
          <p className="lg:text-left text-center text-white/95 font-medium text-base md:text-base mb-6 md:max-w-md lg:mx-0 md:mx-auto">
            Join Care Matrix today to track your health and unlock exclusive
            rewards!
          </p>
          {user && role === "patient" ? (
            <div className="flex flex-col sm:flex-row lg:justify-start justify-center items-center gap-4">
            <Link to="/dashboard/patient-overview">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium cursor-pointer">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/dashboard/patient/rewards">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-blue-50 hover:text-blue-600 px-6 py-3 rounded-md text-lg font-medium cursor-pointer">
                View Rewards
              </Button>
            </Link>
          </div>
          ) : (
            <div className="lg:text-left text-center">
              <p className="text-amber-500 md:text-base text-xs font-bold">Only logged in patients can view action buttons...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PatientRewards;
