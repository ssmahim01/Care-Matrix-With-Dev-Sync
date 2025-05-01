import HealthCare from "./HeathCare";
import MoreAboutUs from "./MoreAboutUs";
import TeamSection from "./Team-section";



const DetailsAboutUs = () => {
  return (
    <div className="pt-16 pb-8 md:pt-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
      <MoreAboutUs />
      <HealthCare />
      <TeamSection />
    </div>
  );
};

export default DetailsAboutUs;
