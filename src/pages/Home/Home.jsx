
import Doctors from "./Doctors";
import Faq from "./Faq";
import OurDepartments from "./../../components/Home/OurDepartments";
import StatsSection from "./../../components/Home/StatsSection";
import HowItWorks from "./../../components/Home/HowItWorks";
import PatientReviews from "./Patient_Reviews/PatientReviews";
import ClinicAndSpecialties from "./Clinic_and_Specialties/ClinicAndSpecialties";

const Home = () => {
  return (
    <section className="w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl">
      {/* Banner */}

      {/* About us */}

      {/* Our Services */}

      {/* Our Departments */}
      <section className="pt-12 pb-16">
        <OurDepartments />
      </section>

      {/* Upcoming Appointments */}
      <div className="pb-16">
        <HowItWorks />
      </div>

      {/* Clinic and Specialties */}
      <section className="pb-16">
        <ClinicAndSpecialties />
      </section>
      {/* Our Medical Experts */}
      <div className="pb-16">
        <Doctors />
      </div>

      {/* Why Book With Us */}

      {/* Patient Reviews */}
      <section className="pb-16">
        <PatientReviews />
      </section>

      {/* Stats Section */}
      <section className="pb-16">
        <StatsSection />
      </section>

      {/* FAQ */}
      <Faq />

      {/* Download Mobile App */}
    </section>
  );
};

export default Home;
