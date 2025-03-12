import StatsSection from "@/components/Home/StatsSection";
import ClinicAndSpecialties from "./ClinicAndSpecialties";
import Faq from "./Faq";
import PatientReviews from "./PatientReviews";
import OurDepartments from "@/components/Home/OurDepartments";
import HowItWorks from "@/components/Home/HowItWorks";
import Doctors from "./Doctors";

const Home = () => {
  return (
    <section className="lg:w-4/5 w-11/12 mx-auto">
      {/* Banner */}

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
      <div className="pb-8">
        <HowItWorks />
      </div>

      {/* Upcoming Appointments */}

      {/* Clinic and Specialties */}
      <div className="pb-16">
        <ClinicAndSpecialties />
      </div>

      {/* Our Medical Experts */}
      <div className="pb-16">
        <Doctors />
      </div>

      {/* Clinic and Specialties */}
      <div className="pb-16">
        <ClinicAndSpecialties />
      </div>

      {/* Patient Reviews */}
      {/* <PatientReviews /> */}

      {/* FAQ */}
      <Faq />

      {/* Download Mobile App */}
    </section>
  );
};

export default Home;
