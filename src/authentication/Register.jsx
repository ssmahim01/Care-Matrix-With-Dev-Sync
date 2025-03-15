import { Button } from "@/components/ui/button";
import { IoIosLogIn } from "react-icons/io";
import { Link } from "react-router";
import { useState } from "react";
const Register = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-base-200 fixed top-0 left-0 z-50">
      <div className="min-w-lg mx-auto p-6 bg-white border-2 shadow rounded-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <IoIosLogIn size={30} color="#000" />
          Register To{" "}
          <span>
            Care-<span className="text-[#0e6efd]">Matrix</span>
          </span>{" "}
        </h2>
        <form
          // action={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-black text-sm">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter Name"
              className="border rounded-lg border-gray-300 outline-none py-2 px-3 placeholder-gray-500 text-gray-500 focus:ring-1 focus:ring-[#848484]"
            />
          </div>
          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-black text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter Email"
              className="border rounded-lg border-gray-300 outline-none py-2 px-3 placeholder-gray-500 text-gray-500 focus:ring-1 focus:ring-[#848484]"
            />
          </div>
          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-semibold text-black text-sm"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter Password"
              className="border rounded-lg border-gray-300 outline-none py-2 px-3 placeholder-gray-500 text-gray-500 focus:ring-1 focus:ring-[#848484]"
            />
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
