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
      <div className="pt-9">
        <Hero />
      </div>

      {/* About us */}
      <div className="py-16">
        <AboutUs />
      </div>
      {/* About us */}

      {/* Our Services */}

      {/* Our Departments */}
      <div className="md:pb-24 pt-12 pb-14">
        <OurDepartments />
      </div>

      {/* Stats Section */}
      <div className="md:pb-24 pb-12">
        <StatsSection />
      </div>

      {/* How It Works */}
      <div className="pb-24 lg:w-4/5 w-11/12 mx-auto">
        <HowItWorks />
      </div>

      {/* Our Departments */}
      <div className="md:pb-20 pb-14 lg:w-4/5 w-11/12 mx-auto">
        <OurDepartments />
      </div>

      {/* About us */}
      <div className="pb-12 lg:w-4/5 w-11/12 mx-auto">
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
      {/* specialties */}
      <div className="lg:w-4/5 w-11/12 mx-auto">
        <Specialties></Specialties>
      </div>
      {/* FAQ */}
      <Faq />

      {/* Download Mobile App */}
    </section>
  );
};

export default Home;
