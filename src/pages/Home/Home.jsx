import StatsSection from "@/components/Home/StatsSection";
import Faq from "./Faq";
import AboutUs from "@/components/Home/AboutUs";

import OurDepartments from "@/components/Home/OurDepartments";
import HowItWorks from "@/components/Home/HowItWorks";
import Doctors from "./Doctors";
import Specialties from "@/components/Home/Specialties";
import Hero from "@/components/Home/Hero";

const Home = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="pt-8 pb-24">
        <Hero />
      </div>

      {/* About us */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <AboutUs />
      </div>

      {/* Our Services */}

      {/* Our Departments */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <OurDepartments />
      </div>

      {/* Stats Section */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <StatsSection />
      </div>

      {/* How It Works */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <HowItWorks />
      </div>

      {/* Our Departments */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <OurDepartments />
      </div>

      {/* Clinic and Specialties
      <div className="pb-16 lg:w-4/5 w-11/12 mx-auto">
        <ClinicAndSpecialties />
      </div> */}

      {/* Our Medical Experts */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Doctors />
      </div>

      {/* Clinic and Specialties
      <div className="pb-16 lg:w-4/5 w-11/12 mx-auto">
        <ClinicAndSpecialties />
      </div> */}

      {/* Patient Reviews */}
      {/* <PatientReviews /> */}

      {/* specialties */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Specialties />
      </div>

      {/* FAQ */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Faq />
      </div>

      {/* Download Mobile App */}
    </section>
  );
};

export default Home;
