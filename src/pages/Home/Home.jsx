import StatsSection from "@/components/Home/StatsSection";
import Faq from "./Faq";
import AboutUs from "@/components/Home/AboutUs";

import OurDepartments from "@/components/Home/OurDepartments";
import HowItWorks from "@/components/Home/HowItWorks";
import Doctors from "./Doctors";
import OurService from "@/components/Home/OurService";
import Specialties from "@/components/Home/Specialties";
import Hero from "@/components/Home/Hero";
import PatientReviews from "./Patient_Reviews/PatientReviews";
import WhyChooseUs from "./WhyChooseUs";
import Chat from "@/components/Home/Chat";
import EidGreetingSection from "./EidGreetingSection";

const Home = () => {
  return (
    <section className="w-full space-y-6">
      {/* Hero Section */}
      <div className="lg:pt-12 md:pt-8 pt-2 pb-8">
        <Hero />
      </div>
      
      {/* Eid Greeting */}
      <div className="hidden pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <EidGreetingSection />
      </div>

      {/* About us */}
      <div className="pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <AboutUs />
      </div>

      {/* Stats Section */}
      <div className="pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <StatsSection />
      </div>

      {/* Our Services */}
      <div className="pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <OurService />
      </div>

      {/* Introduction of Chat dashboard */}
      <div className="pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Chat />
      </div>

      {/* How It Works */}
      <div className="pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <HowItWorks />
      </div>

      {/* Our Departments */}
      <div className="lg:-mb-3 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <OurDepartments />
      </div>

      {/* Our Medical Experts */}
      <div className="lg:-mb-3 mx-auto lg:w-10/12 max-w-screen-2xl">
        <Doctors />
      </div>

      {/* Why choose us */}
      <div className="mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <WhyChooseUs />
      </div>

      {/* Patient Reviews */}
      <PatientReviews />

      {/* specialties */}
      <div className="-mt-5 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Specialties />
      </div>

      {/* FAQ */}
      <div className="mx-auto w-11/12 xl:w-10/12 max-w-screen-2xl">
        <Faq />
      </div>
    </section>
  );
};

export default Home;
