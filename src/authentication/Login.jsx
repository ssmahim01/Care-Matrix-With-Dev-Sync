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
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

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

  // default credentials
  const handleBadgeClick = (emailValue, passwordValue) => {
    setEmail(emailValue);
    setPassword(passwordValue);
  };

  // Login User functionality --->
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError("");

    try {
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
          email,
          password,
        }),
        {
          loading: "Signing in...",
          success: <b>Sign in Successful!</b>,
        }
      );

      if (response?.data?.message === "Login successful") {
        signInWithEmailAndPassword(auth, email, password).then(
          async (result) => {
            const user = result.user;
            if (user) {
              // Optionally update last login time
              await axios.patch(
                `${import.meta.env.VITE_API_URL}/users/last-login-at/${email}`,
                { lastLoginAt: new Date().toISOString() }
              );
              setLoading(false);
            }
          }
        );
      }
    } catch (error) {
      let errorMessage = "Login Failed!";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;

        // Handle lockout or failed attempts from backend response
        if (error.response.data.lockUntil) {
          const minutesLeft = Math.ceil(
            (error.response.data.lockUntil - Date.now()) / (60 * 1000)
          );
          errorMessage = `Too many failed attempts. Try again in ${minutesLeft} minutes.`;
        } else if (error.response.data.failedAttempts) {
          errorMessage = `Incorrect password. Attempts: ${error.response.data.failedAttempts}/4`;
        }
      }
      setLoading(false);
      setIsError(errorMessage);
    }
  };

  if (user) return navigate("/");

  return (
    <div className="bg-blue-100/20">
      <div className="mx-auto xl:w-10/12 min-h-screen px-4 py-12 flex flex-col md:flex-row gap-6 items-center justify-center max-w-screen-xl">
        {/* Image Div */}
        <div className="hidden lg:flex flex-col w-5/12">
          <img src={loginImg} alt="loginImg" className="w-full h-full" />
        </div>
        <div className="max-w-lg lg:max-w-md xl:max-w-xl mx-auto p-6 bg-white border border-border shadow rounded-lg">
          {/* Header & Logo */}
          <AuthHeader />
          {/* Default Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            className="flex gap-3 mt-5  justify-center items-center"
            viewport={{ once: true }}
          >
            <Badge
              className="cursor-pointer bg-blue-600"
              onClick={() =>
                handleBadgeClick("admin-care-matrix@gmail.com", "Admin@1234")
              }
            >
              Administrator
            </Badge>

            <Badge
              className="cursor-pointer bg-sky-500"
              onClick={() =>
                handleBadgeClick("doctor@carematrix.com", "Doctor123@")
              }
            >
              Doctor
            </Badge>

            <Badge
              className="cursor-pointer bg-cyan-500"
              onClick={() =>
                handleBadgeClick("patient@carematrix.com", "Patient123@")
              }
            >
              Patient
            </Badge>

            <Badge
              className="cursor-pointer bg-indigo-500"
              onClick={() =>
                handleBadgeClick("pharmacist@carematrix.com", "Pharmacist123@")
              }
            >
              Pharmacist
            </Badge>

            <Badge
              className="cursor-pointer bg-blue-400"
              onClick={() =>
                handleBadgeClick(
                  "receptionist@carematrix.com",
                  "Receptionist123@5"
                )
              }
            >
              Receptionist
            </Badge>
          </motion.div>
          {/* Use Default */}
          <div className="divider font-medium text-gray-800">
            Use Default Or Login By
          </div>
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  value={email}
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
                  value={password}
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
