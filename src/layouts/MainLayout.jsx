import Navbar from "@/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            {/* Shared Navbar component */}
            <Navbar />
            {/* All contents wrapping inside of the outlet*/}
            <div className="min-h-[calc(100vh-313px)] py-8 bg-[#f0f7fe]">
            <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;