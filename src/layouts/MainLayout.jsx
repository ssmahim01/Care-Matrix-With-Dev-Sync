import Footer from "@/shared/Footer/Footer";
import Navbar from "@/shared/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-6 space-y-6">
        {/* Spinner Circle + Logo */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-[#009EE4] animate-spin" />
          <img
            src={
              "https://i.ibb.co.com/r1ZQS6t/Screenshot-2025-04-21-141051.png"
            }
            alt="Care Matrix Logo"
            className="absolute inset-0 ml-[7.5px] w-10 h-10 m-auto rounded-full"
          />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-700 max-w-xl">
          Streamline Healthcare <br /> Management With Care Matrix
        </h1>

        {/* Subheading */}
        <p className="text-sm text-gray-500 max-w-xl -mt-3">
          Join 100+ healthcare facilities using Care Matrix to streamline
          appointments, <br /> manage records, and coordinate staff — all in one
          platform.
        </p>

        {/* Optional Loading Animation */}
        <p className="text-xs text-gray-400 flex items-center gap-1 -mt-4">
          Loading Healthcare
          <span className="animate-bounce text-[#009EE4] text-4xl -mt-2">
            .
          </span>
          <span className="animate-bounce [animation-delay:200ms] text-[#009EE4] text-4xl -mt-2">
            .
          </span>
          <span className="animate-bounce [animation-delay:400ms] text-[#009EE4] text-4xl -mt-2">
            .
          </span>
        </p>
      </div>
    ); // Your fancy HMS loader here
  }

  return (
    <div>
      {/* Shared Navbar component */}
      <Navbar />
      {/* All contents wrapping inside of the outlet*/}
      <div className="min-h-[calc(100vh-313px)] py-8">
        <Outlet />
      </div>
      {/* Shared Footer component */}
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
