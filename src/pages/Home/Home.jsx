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
import { Profiler } from "react";
import Blogs from "./Blogs_and_News/Blogs";
import { Testimonials } from "./Patient_Reviews/Testimonials";

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  // console.log(`${id} (${phase}): ${actualDuration.toFixed(2)}ms`);
}

const Home = () => {
  return (
    <section className="w-full space-y-6">
      {/* Hero Section */}
      <div className="pt-8 pb-8">
        {/* <Profiler id="Hero" onRender={onRenderCallback}> */}
        <Hero />
        {/* </Profiler> */}
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
      <div className="mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Chat />
      </div>

      {/* How It Works */}
      <div className="pb-10 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <HowItWorks />
      </div>

      {/* Our Departments */}
      <div className="lg:-mb-3 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        {/* <Profiler id="Department" onRender={onRenderCallback}> */}
        <OurDepartments />
        {/* </Profiler> */}
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
      {/* <Testimonials/> */}

      {/* specialties */}
      <div className="-mt-5 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <Specialties />
      </div>

      {/* blog  */}
      <div className="mx-auto pt-6 pb-16 w-11/12 xl:w-10/12 max-w-screen-2xl">
        <Blogs />
      </div>

      {/* FAQ */}
      <div className="mx-auto w-11/12 xl:w-10/12 max-w-screen-2xl">
        <Faq />
      </div>
    </section>
  );
};

export default Home;
