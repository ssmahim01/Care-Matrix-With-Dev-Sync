import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ExpertDoctors from "@/pages/Doctors/ExpertDoctors";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Services from "@/pages/services/Services";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/doctors" element={<ExpertDoctors />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/services" element={ <Services /> }/>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
