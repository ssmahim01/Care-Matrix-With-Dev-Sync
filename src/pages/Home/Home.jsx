import ClinicAndSpecialties from "./ClinicAndSpecialties";
import OurDepartments from "./../../components/Home/OurDepartments";
import StatsSection from "./../../components/Home/StatsSection";
import HowItWorks from "./../../components/Home/HowItWorks";
import PatientReviews from "./PatientReviews";

const Home = () => {
  return (
    <section className="w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl">
      {/* Banner */}

      {/* About us */}

      {/* Our Services */}

      {/* Our Departments */}
      <div className="pt-12 pb-16">
        <OurDepartments />
      </div>

      {/* Upcoming Appointments */}
      <div className="pb-16">
        <HowItWorks />
      </div>

      {/* Clinic and Specialties */}
      <div className="pb-16">
        <ClinicAndSpecialties />
      </div>
      {/* Our Medical Experts */}

      {/* Why Book With Us */}

      {/* Patient Reviews */}
      <div className="pb-16">
        <PatientReviews />
      </div>

      {/* Stats Section */}
      <div className="pb-16">
        <StatsSection />
      </div>

      {/* Frequently Asked Questions */}

      {/* Download Mobile App */}
    </section>
  );
};

export default Home;
