import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ExpertDoctors from "@/pages/Doctors/ExpertDoctors";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Login from "@/authentication/Login";
import Register from "@/authentication/Register";
import Services from "@/pages/services/Services";
import DetailsAboutUs from "@/pages/AboutUs/DetailsAboutUs";
import DashboardLayout from "@/layouts/DashboardLayout";

const Router = () => {
  return (
    <>
    {/* Main Routes */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/doctors" element={<ExpertDoctors />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/services" element={ <Services /> }/>
          <Route path="/about-us" element={ <DetailsAboutUs /> }/>
        </Route>
      </Routes>
      {/* Authentication Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Dashboard Routes */}
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Upcoming... */}
        </Route>
      </Routes>
    </>
  );
};

export default Router;
