import { useState } from "react";

const ContactUsForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setMessage] = useState("");

  const formData = {
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
  };

  // Post Message In Database -->
  try {
    console.log("posted in db");
  } catch (error) {
    console.log(error?.message);
  }

  console.table(formData);

  return (
    <form className="pt-[20px]">
      <div className="flex flex-col sm:flex-row items-center gap-[30px]">
        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
          <label className="text-[1rem] text-gray-900 font-[400]">
            First Name
          </label>
          <input
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-700 transition-colors duration-300"
          />
        </div>

        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
          <label className="text-[1rem] text-gray-900 font-[400]">
            Last Name
          </label>
          <input
            type="text"
            required
            onChange={(e) => setLastName(e.target.value)}
            className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-700 transition-colors duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-[30px] mt-10">
        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
          <label className="text-[1rem] text-gray-900 font-[400]">
            Email Address
          </label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-700 transition-colors duration-300"
          />
        </div>

        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
          <label className="text-[1rem] text-gray-900 font-[400]">
            Phone Number
          </label>
          <input
            type="number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="peer border-gray-300 border-b outline-none focus:border-[#0E82FD] w-full text-gray-700 transition-colors duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[5px] w-full mt-10">
        <label className="text-[1rem] text-gray-900 font-[400]">
          Write Message
        </label>
        <textarea
          required
          onChange={(e) => setMessage(e.target.value)}
          className="peer min-h-[100px] border-gray-300 border-b resize-none outline-none w-full text-gray-700 transition-colors focus:border-[#0E82FD] duration-300"
        />
      </div>

      <div className="w-full flex items-center justify-end mt-3">
        <button className="btn border-none hover:bg-[#46a0ff] text-[1rem] duration-700 bg-[#0E82FD] text-white mt-4 relative group">
          <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
            Send Message
          </span>
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
