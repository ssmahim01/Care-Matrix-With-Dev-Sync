import Footer from "@/shared/Footer/Footer";
import Navbar from "@/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
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
      <Toaster/>
    </div>
  );
};

export default MainLayout;
