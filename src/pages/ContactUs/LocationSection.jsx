import { FaLocationDot } from "react-icons/fa6";

const LocationSection = () => {
  return (
    <div>
      {/* Section Heading */}
      <div className="space-y-2">
        <h1 className="text-[22px] md:text-[26px] font-extrabold tracking-wide">
          Our
          <span className="ml-2 text-[#0E82FD] tracking-wider underline underline-offset-4">
            Location
          </span>
        </h1>
        <h3 className="text-[13px] md:text-base text-[#464646] font-medium tracking-wider md:whitespace-pre-line">
          Your health, our priority — visit us with confidence
        </h3>
      </div>
      {/* Main Section */}
      <div className="flex flex-col lg:flex lg:flex-row-reverse gap-x-8 ">
        <div className="flex justify-center mt-8 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5575.326226871111!2d90.40063828790029!3d23.8142266908631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c6e16536e371%3A0xf1da9493f88d8f6a!2sCombined%20Military%20Hospital%20(CMH)!5e0!3m2!1sen!2sbd!4v1742117886958!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[300px] rounded-md"
          />
        </div>

        <div className="mt-8 flex flex-row flex-wrap gap-x-6 lg:flex lg:flex-col gap-y-6">
          <div>
            <div className="w-full text-gray-700">
              <h3 className="text-xl font-semibold text-primary mb-4">
                How to Get Here
              </h3>
              <h1 className="mb-2 flex gap-2 dark:text-white">
                <FaLocationDot className="mt-[4.5px]" /> Dhaka-1230, Airport
                Dhaka, Bangladesh
              </h1>
              <ul className="list-disc pl-5 space-y-2 dark:text-white">
                <li>Located just 5 minutes from the main highway.</li>
                <li>Near the Dhaka Airport & Railway Station Area.</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              Nearby Attractions
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-white">
              <li>Airport - 10 minutes walk</li>
              <li>Railway Station - 10 minutes drive</li>
              <li>Shopping Mall - 10 minutes walk</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
