import StatsSection from "@/components/Home/StatsSection";
import ClinicAndSpecialties from "./ClinicAndSpecialties";
import Faq from "./Faq";
import PatientReviews from "./PatientReviews";
import AboutUs from "@/components/Home/AboutUs";

import OurDepartments from "@/components/Home/OurDepartments";
import HowItWorks from "@/components/Home/HowItWorks";
import Doctors from "./Doctors";
import Hero from "@/components/Home/Hero";

const Home = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="pt-9">
      <Hero />
      </div>

        {/* Stats Section */}
        <div className="pb-20">
        <StatsSection />
      </div>

      {/* How It Works */}
      <div className="pb-20 lg:w-4/5 w-11/12 mx-auto">
        <HowItWorks />
      </div>

      {/* Our Services */}

      {/* Our Departments */}
      <div className="md:pb-20 pb-14 lg:w-4/5 w-11/12 mx-auto">
        <OurDepartments />
      </div>


      {/* Upcoming Appointments */}
      {/* About us */}
      <div className="py-8 lg:w-4/5 w-11/12 mx-auto">
        <AboutUs />
      </div>

      {/* Clinic and Specialties
      <div className="pb-16 lg:w-4/5 w-11/12 mx-auto">
        <ClinicAndSpecialties />
      </div> */}

      {/* Our Medical Experts */}
      <div className="pb-5 lg:w-4/5 w-11/12 mx-auto">
        <Doctors />
      </div>

      {/* Clinic and Specialties
      <div className="pb-16 lg:w-4/5 w-11/12 mx-auto">
        <ClinicAndSpecialties />
      </div> */}

      {/* Patient Reviews */}
      {/* <PatientReviews /> */}

      {/* FAQ */}
      <Faq />

      {/* Download Mobile App */}
    </section>
  );
};

export default Home;
