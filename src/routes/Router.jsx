import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ExpertDoctors from "@/pages/Doctors/ExpertDoctors";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Login from "@/authentication/Login";
import Register from "@/authentication/Register";
import Services from "@/pages/services/Services";
import DoctorDetails from "@/pages/DoctorDetails/DoctorDetails";
import DetailsAboutUs from "@/pages/AboutUs/DetailsAboutUs";
import DashboardLayout from "@/layouts/DashboardLayout";
import Error from "@/ErrorPage/Error";
import AdministratorOverview from "@/pages/DashboardPages/Administrator/AdministratorOverview";

const Router = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="doctors" element={<ExpertDoctors />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="services" element={<Services />} />
        <Route path="about-us" element={<DetailsAboutUs />} />
      </Route>

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
      <Route path="/dashboard/administrator-overview" element={<AdministratorOverview />} />
      </Route>

      {/* Catch-all for 404 Error Page */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;