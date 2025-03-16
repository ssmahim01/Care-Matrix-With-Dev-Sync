import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";
import { IoIosLogIn } from "react-icons/io";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { MdDelete, MdOutlineMail } from "react-icons/md";
import { Link } from "react-router";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

const Register = () => {
  // states for name, email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // states for photo
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  // states for password
  const [password, setPassword] = useState("");
  // states for loading & error
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

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

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="max-w-md md:max-w-lg mx-auto p-6 bg-white border border-border shadow rounded-lg">
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
        <form
          // action={handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
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
                placeholder="Enter Your Name"
                className="peer border-border border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-gray-300 transition-colors duration-300"
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
                className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-border border rounded-md py-6 cursor-pointer"
                onClick={handleUploadImage}
              >
                <FaFileUpload className="text-[2rem] text-[#777777]" />
                <p className="text-gray-700">
                  Browse To Upload Ranking Image File
                </p>
              </div>
            ) : (
              <div className="relative w-full border border-border rounded-xl p-4">
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
                placeholder="Email address"
                className="peer border-border border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-gray-300 transition-colors duration-300"
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
              <RiLockPasswordLine className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="peer border-border border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-gray-300 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Register Button */}
          <Button disabled={loading} type="submit" className="mt-1">
            {loading ? "Registering..." : "Register"}
          </Button>
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
