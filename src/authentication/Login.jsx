import logo from "@/assets/logo.jpg";
import { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdError, MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import NavigateTo from "./NavigateTo";
import SocialLogin from "./SocialLogin";
import AuthHeader from "./AuthHeader";

const Login = () => {
  // states for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // states for loading & error & eyeOpen
  const [loading, setLoading] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isError, setIsError] = useState("");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-100/20 px-4 py-12">
      <div className="max-w-lg lg:max-w-xl mx-auto p-6 bg-white border border-border shadow rounded-lg">
        {/* Header & Logo */}
        <AuthHeader />
        {/* Register Form */}
        <form
          // onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
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
                onChange={(e) => setPassword(e.target.value)}
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
          </div>
          {/* Error Message */}
          {isError && (
            <div className="text-red-500 flex items-center justify-center gap-2 text-base py-[8px] bg-red-100/80 rounded-lg font-semibold text-center">
              <MdError size={20} />
              {isError}
            </div>
          )}
          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn border-none rounded-lg text-white text-lg xmt-1 bg-[#0E82FD] hover:bg-[#0e72fd] duration-700 cursor-pointer"
          >
            {loading ? "Login in..." : "Login"}
          </button>
        </form>

        {/* SocialLogin */}
        <SocialLogin />
        {/* Navigate to login */}
        <NavigateTo />
      </div>
    </div>
  );
};

export default Login;
