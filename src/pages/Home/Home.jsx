import StatsSection from "@/components/Home/StatsSection";
import Faq from "./Faq";
<<<<<<< HEAD
import OurDepartments from "./../../components/Home/OurDepartments";
import StatsSection from "./../../components/Home/StatsSection";
import HowItWorks from "./../../components/Home/HowItWorks";
import PatientReviews from "./PatientReviews";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
=======
import AboutUs from "@/components/Home/AboutUs";

import OurDepartments from "@/components/Home/OurDepartments";
import HowItWorks from "@/components/Home/HowItWorks";
import Doctors from "./Doctors";
import OurService from "@/components/Home/OurService";
import Specialties from "@/components/Home/Specialties";
import Hero from "@/components/Home/Hero";
import ClinicAndSpecialties from "./Clinic_and_Specialties/ClinicAndSpecialties";
import PatientReviews from "./Patient_Reviews/PatientReviews";
>>>>>>> fb6faf04ae332685716db3efff4a068ff7b740be

const Home = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
     <div className="pt-9">
     <Hero />
     </div>

      {/* About us */}
    <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
    <AboutUs/>
    </div>
            {/* About us */}

      {/* Our Services */}
      <div className="pb-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <OurService />
      </div>

      {/* Our Departments */}
      <div className="md:pb-24 pb-14">
        <OurDepartments />
      </div>

      {/* Stats Section */}
       {/* Stats Section */}
       <div className="md:pb-24 pb-12">
        <StatsSection />
      </div>

<<<<<<< HEAD
            {/* Clinic and Specialties */}
            <ClinicAndSpecialties />
            
            {/* Why Book With Us */}
            <WhyChooseUs></WhyChooseUs>
            
      {/* Clinic and Specialties */}
      <div className="pb-16">
        <ClinicAndSpecialties />
=======
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
>>>>>>> fb6faf04ae332685716db3efff4a068ff7b740be
      </div>

      {/* Clinic and Specialties
      <div className="pb-16 lg:w-4/5 w-11/12 mx-auto">
        <ClinicAndSpecialties />
      </div> */}

      {/* Our Medical Experts */}
      <div className="pb-5 lg:w-4/5 w-11/12 mx-auto">
        <Doctors />
      </div>

      {/* Clinic and Specialties */}
      <div className="pb-16 lg:w-4/5 w-11/12 mx-auto">
        <ClinicAndSpecialties />
      </div>

      {/* Patient Reviews */}
      <PatientReviews />
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
