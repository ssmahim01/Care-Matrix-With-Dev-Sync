import loginImg from "@/assets/loginPage.png";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthHeader from "./AuthHeader";
import IsError from "./IsError";
import NavigateTo from "./NavigateTo";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthUser } from "@/redux/auth/authActions";
import auth from "@/firebase/firebase.config";
import axios from "axios";

const Login = () => {
  const user = useAuthUser();
  const navigate = useNavigate();

  // states for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // states for loading & error & eyeOpen
  const [loading, setLoading] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isError, setIsError] = useState("");

  // Login User functionality --->
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError("");
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const currentUser = result.user;
        // Update lastLoginAt Time
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/last-login-at/${
            currentUser.email
          }`,
          {
            lastLoginAt: new Date(
              currentUser?.metadata?.lastSignInTime
            ).toISOString(),
          }
        );
      })
      .catch((error) => {
        setIsError(
          error?.message.includes("Firebase:")
            ? error?.message.split("Firebase:")[1]
            : error?.message || "Login Failed!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user) return navigate("/");

  return (
    <div className="bg-blue-100/20">
      <div className="w-11/12 mx-auto xl:w-10/12 min-h-screen px-4 py-12 flex flex-col md:flex-row gap-6 items-center justify-center max-w-screen-xl">
        {/* Image Div */}
        <div className="hidden lg:flex flex-col w-5/12">
          {/* <div className="mb-4">
            <button className="btn border-none btn-sm text-base font-medium bg-blue-400 text-white ">
              Go Back!
            </button>
          </div> */}
          <img src={loginImg} alt="loginImg" className="w-full h-full" />
        </div>
        <div className="max-w-lg lg:max-w-md xl:max-w-xl mx-auto p-6 bg-white border border-border shadow rounded-lg">
          {/* Header & Logo */}
          <AuthHeader />
          {/* Register Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            {/* Email input */}
            <div>
              {/* Label */}
              <label
                htmlFor="email"
                className="text-[16px] text-text font-[600]"
              >
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
            <IsError isError={isError} />
            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn border-none rounded-lg text-white text-lg mt-1 bg-[#0E82FD] hover:bg-[#0e72fd] duration-700 cursor-pointer disabled:text-gray-700"
            >
              {loading ? "Login in..." : "Login"}
            </button>
          </form>

          {/* SocialLogin */}
          <SocialLogin setIsError={setIsError} />
          {/* Navigate to login */}
          <NavigateTo />
        </div>
      </div>
    </div>
  );
};

export default Login;
