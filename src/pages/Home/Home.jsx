import StatsSection from "@/components/Home/StatsSection";
import ClinicAndSpecialties from "./ClinicAndSpecialties";
import Faq from "./Faq";
import PatientReviews from "./PatientReviews";
import AboutUs from "@/components/Home/AboutUs";

import OurDepartments from "@/components/Home/OurDepartments";
import HowItWorks from "@/components/Home/HowItWorks";
import Doctors from "./Doctors";

const Home = () => {
    return (
        <section className="lg:w-4/5 w-11/12 mx-auto">
            {/* Banner */}

      {/* About us */}
    <div className="py-16">
    <AboutUs/>
    </div>
            {/* About us */}


            {/* Our Services */}

            {/* Our Departments */}
            <div className="md:pb-24 pb-14">
            <OurDepartments />
            </div>

            {/* Stats Section */}
            <div className="md:pb-24 pb-12">
            <StatsSection />
            </div>

            {/* How It Works */}
            <div className="pb-8">
            <HowItWorks />
            </div>

            {/* Upcoming Appointments */}

            {/* Clinic and Specialties */}
            {/* <ClinicAndSpecialties /> */}
            
            {/* Our Medical Experts */}
           <div className="py-10 md:py-14 lg:py-16">
           <Doctors />
           </div>

            {/* Why Book With Us */}

            {/* Patient Reviews */}
            {/* <PatientReviews /> */}


            {/* Frequently Asked Questions */}
            <Faq></Faq>

            {/* Download Mobile App */}

        </section>
    );
};

export default Home;