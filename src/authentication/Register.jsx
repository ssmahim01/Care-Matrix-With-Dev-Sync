import logo from "@/assets/logo.jpg";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoCloseOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdDelete, MdDone, MdLocalPhone, MdOutlineMail } from "react-icons/md";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router";

const Register = () => {
  // states for name, email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // states for photo
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  // states for password
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [strongPassword, setStrongPassword] = useState("");
  // states for loading & error
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

  // Password Validation Functionality
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setStrongPassword(password);

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setSignal({
      lowercase: hasLowerCase,
      uppercase: hasUpperCase,
      number: hasNumber,
      symbol: hasSymbol,
      length: password.length >= 8,
      strong:
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSymbol &&
        password.length >= 8,
    });
  };

  // Password Hinst
  const hintList = [
    {
      text: "Minimum number of characters is 8.",
      type: "length",
    },
    {
      text: "Password should contain uppercase.",
      type: "uppercase",
    },
    {
      text: "Password should contain numbers.",
      type: "number",
    },
    {
      text: "Password should contain lowercase.",
      type: "lowercase",
    },

    {
      text: "Password should contain special characters.",
      type: "symbol",
    },
  ];

  // Image Upload Functionality
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return console.error("Pls select an image for your profile");
    }
    const user = { name, email, password: strongPassword };
    console.table(user);
  };
  // console.log({
  //   name,
  //   email,
  //   image
  // })

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-100/20 px-4 py-12">
      <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 bg-white border border-border shadow rounded-lg">
        {/* Header & Logo */}
        <div>
          <div>
            <img src={logo} alt="Care-Matrix logo" className="w-44" />
          </div>
          <div className="mt-6">
            <h1 className="text-2xl -ml-[4px] font-bold tracking-wider flex items-center gap-1">
              <IoIosLogIn className="mt-[2px]" size={35} /> Create Your Account!
            </h1>
            <p className="text-[15px] tracking-wide mt-1 text-gray-800">
              Unlock Seamless Healthcare Management with Care-Matrix{" "}
              <span className="text-gray-500">——</span> Your Gateway to Smarter,
              Faster, and More Efficient Care.
            </p>
          </div>
        </div>
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Name input */}
          <div>
            {/* Label */}
            <label htmlFor="name" className="text-[16px] text-text font-[600]">
              Name
            </label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <RiAccountCircleLine className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
              <input
                type="text"
                name="text"
                id="text"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />
            </div>
          </div>
          {/* Photo File */}
          <div className="w-full">
            <input
              type="file"
              name="image"
              id="image_input"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview === "" ? (
              <div
                className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                onClick={handleUploadImage}
              >
                <FaFileUpload className="text-[2rem] text-[#777777]" />
                <p className="text-gray-700">
                  Browse To Upload Ranking Image File
                </p>
              </div>
            ) : (
              <div className="relative w-full border border-blue-200 rounded-xl p-4">
                <img
                  src={preview}
                  alt="Selected file preview"
                  className="mx-auto object-cover rounded-full w-24 h-24"
                />
                <MdDelete
                  className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                  onClick={() => {
                    setPreview("");
                    setImage(null);
                  }}
                />
                {image && (
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      {image.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(image.size / 1024).toFixed(2)} KB | {image.type}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Number input */}
          <div>
            {/* Label */}
            <label
              htmlFor="number"
              className="text-[16px] text-text font-[600]"
            >
              Phone Number
            </label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <MdLocalPhone className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
              <input
                type="number"
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Phone Number"
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />
            </div>
          </div>
          {/* Email input */}
          <div>
            {/* Label */}
            <label htmlFor="email" className="text-[16px] text-text font-[600]">
              Email
            </label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <MdOutlineMail className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />
            </div>
          </div>
          {/* Password input */}
          <div>
            {/* Label */}
            <label
              htmlFor="password"
              className="text-[16px] text-text font-[600]"
            >
              Password
            </label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <RiLockPasswordLine className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
              <input
                type={isEyeOpen ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                onFocus={() => setIsDropdownOpen(true)}
                // onBlur={() => setIsDropdownOpen(false)}
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-12 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />

              {isEyeOpen ? (
                <IoEyeOutline
                  className="absolute top-3.5 right-3 text-[1.5rem] text-[#777777] cursor-pointer"
                  onClick={() => setIsEyeOpen(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="absolute top-3.5 right-3 text-[1.5rem] text-[#777777] cursor-pointer"
                  onClick={() => setIsEyeOpen(true)}
                />
              )}
            </div>

            {/* Password hint dropdown positioned below */}
            {isDropdownOpen && (
              <div className="bg-white shadow rounded-md py-3 px-4 mt-1 w-full transition-all duration-700">
                {/* <h3 className="text-gray-900 text-center font-[600] text-base">
                  Your password must contain
                </h3> */}
                <div className="w-full mt-2 flex flex-col items-center gap-[6px]">
                  {hintList?.map((hint, index) => (
                    <div
                      key={index}
                      className={`text-[14px] flex items-center gap-[8px] font-medium w-fit ${
                        signal[hint.type] ? "text-blue-500" : "text-gray-700"
                      }`}
                    >
                      {signal[hint.type] ? (
                        <MdDone className="text-[1rem]" />
                      ) : (
                        <IoCloseOutline className="text-[1rem] mt-[2px]" />
                      )}
                      {hint.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn border-none rounded-lg text-white text-lg xmt-1 bg-[#0E82FD] hover:bg-[#0e72fd] duration-700 cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* SocialLogin */}
        {/* <SocialLogin /> */}
        {/* Navigate to login */}
        <div className="mt-4 text-center text-sm text-gray-900">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-black cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
