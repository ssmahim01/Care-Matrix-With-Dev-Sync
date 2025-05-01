import auth from "@/firebase/firebase.config";
import { imgUpload } from "@/lib/imgUpload";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoCloseOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdDelete, MdDone, MdLocalPhone, MdOutlineMail } from "react-icons/md";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { useNavigate } from "react-router";
import AuthHeader from "./AuthHeader";
import NavigateTo from "./NavigateTo";
import SocialLogin from "./SocialLogin";
import IsError from "./IsError";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

const Register = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const userLoading = useAuthLoading();
  const dispatch = useDispatch();

  // states for name, email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // states for photo, phoneNumber
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(880);
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

  // Bangladeshi phone number validation
  const validateBangladeshiNumber = (number) => {
    const cleanNumber = number.replace(/[^\d+]/g, "");
    const bdNumberRegex = /^\8801[3-9][0-9]{8}$/;
    return bdNumberRegex.test(cleanNumber);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value && !validateBangladeshiNumber(value)) {
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., +880 1XNN-NNNNNN)"
      );
    } else {
      setIsError("");
    }
  };

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

  // Password Hints
  const hintList = [
    {
      text: "Minimum 8 characters required",
      type: "length",
    },
    {
      text: "Password must contain uppercase",
      type: "uppercase",
    },
    {
      text: "Password must contain numbers",
      type: "number",
    },
    {
      text: "Password must contain lowercase",
      type: "lowercase",
    },
    {
      text: "Password must contain symbols",
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

  // Create new user functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // // Show error is image not selected
    // if (!image) {
    //   setLoading(false);
    //   setIsError("Please Select An Image For Your Profile!");
    //   return;
    // }

    let imageUrl = "";

    if (image) {
      try {
        // Upload Image To imgBB
        const imgBbURL = await imgUpload(image);

        if (!imgBbURL) {
          setLoading(false);
          setIsError("Image Upload Failed! Try Again");
          return;
        }

        imageUrl = imgBbURL;
      } catch (error) {
        setLoading(false);
        setIsError("Image Upload Failed! Try Again");
        return;
      }
    } else {
      imageUrl = "https://i.ibb.co/4RS0VXvL/default-user-image.png";
    }

    // Password Validation
    if (
      !signal.lowercase ||
      !signal.uppercase ||
      !signal.number ||
      !signal.symbol ||
      !signal.length ||
      !signal.strong
    ) {
      setLoading(false);
      setIsError("Password Doesn't Meet All The Requirements");
      return;
    }

    // Phone Number Validation
    if (!validateBangladeshiNumber(phoneNumber)) {
      setLoading(false);
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., +880 1XNN-NNNNNN)"
      );
      return;
    }

    // user data
    const user = {
      email,
      name,
      image: imageUrl,
      password: strongPassword,
      phoneNumber,
    };

    // Create new user --->
    createUserWithEmailAndPassword(auth, user?.email, user?.password)
      .then((result) => {
        setIsError("");
        const currentUser = result?.user;
        updateProfile(currentUser, {
          displayName: user?.name,
          photoURL: user?.image,
        })
          .then(async () => {
            // userData for save in db
            const userData = {
              email: currentUser?.email,
              name: currentUser?.displayName,
              password: user?.password,
              photo: currentUser?.photoURL,
              phoneNumber: user?.phoneNumber,
              uid: currentUser?.uid,
              createdAt: new Date(
                currentUser?.metadata?.creationTime
              ).toISOString(),
              lastLoginAt: new Date(
                currentUser?.metadata?.lastSignInTime
              ).toISOString(),
            };
            dispatch(
              setUser({
                email: currentUser?.email,
                displayName: currentUser?.displayName,
                photoURL: currentUser?.photoURL,
                uid: currentUser?.uid,
                createdAt: currentUser?.metadata?.creationTime,
                lastLoginAt: currentUser?.metadata?.lastSignInTime,
              })
            );
            // save userData in db --->
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/users`,
              userData
            );
            // Show Success Modal
            if (data.data.insertedId) {
              navigate("/dashboard/profile");
              toast.success("Registration Complete! 🎉", {
                description: "Your Account successfully created",
                action: {
                  label: "Go to Dashboard",
                  onClick: () => {
                    navigate("/dashboard/patient-overview");
                  },
                },
                style: {
                  background: "white",
                  color: "black",
                  fontWeight: "bold",
                },
                duration: 5000,
                position: "top-right",
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            setIsError(error.message || "Registration Failed!");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        setIsError(
          error?.message.includes("Firebase:")
            ? error?.message.split("Firebase:")[1]
            : error?.message || "Registration Failed!"
        );
      });
  };

  if (user && userLoading) return navigate("/");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-100/20 px-4 py-12">
      {/* <Toaster /> */}
      <div className="max-w-lg lg:max-w-xl mx-auto p-6 bg-white border border-border shadow rounded-lg">
        {/* Header & Logo */}
        <AuthHeader />
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Name input */}
          <div>
            {/* Label */}
            <Label>Name</Label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <RiAccountCircleLine className="absolute top-[6.5px] left-3 text-[1.5rem] text-[#777777]" />
              <Input
                type="text"
                name="text"
                id="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />
            </div>
          </div>
          {/* Photo File */}
          <div className="w-full space-y-2">
            {/* Label */}
            <Label>
              Profile Photo{" "}
              <span className="text-[10px] mt-1 -ml-1">(Optional)</span>
            </Label>
            <input
              type="file"
              name="image"
              id="image_input"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview === "" ? (
              <div
                className="w-full md:w-[100%] flex items-center gap-3 border border-blue-200 py-[5.6px] rounded-lg px-4 cursor-pointer"
                onClick={handleUploadImage}
              >
                <FaFileUpload className="text-[1.5rem] text-gray-500" />
                <p className="text-gray-700 text-xs">
                  Browse To Upload Ranking Image File
                </p>
              </div>
            ) : (
              <div className="w-full border rounded-lg p-0.5 flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 pl-2">
                  <img
                    src={preview}
                    alt="Selected file preview"
                    className="mx-auto object-cover rounded-lg w-7 h-7"
                  />
                  {image && (
                    <div>
                      <p className="text-[10px] font-medium text-gray-700">
                        {image.name}
                      </p>
                      <p className="text-[9px] text-gray-500">
                        {(image.size / 1024).toFixed(2)} KB | {image.type}
                      </p>
                    </div>
                  )}{" "}
                </div>
                <MdDelete
                  className="text-[2rem] text-white bg-[#000000ad] p-1 rounded-r-lg mr-[1px] cursor-pointer"
                  onClick={() => {
                    setPreview("");
                    setImage(null);
                  }}
                />
              </div>
            )}
          </div>
          {/* Number input */}
          <div>
            {/* Label */}
            <Label>
              Phone Number{" "}
              <span className="text-[10px] mt-1 -ml-1">(Bangladeshi)</span>
            </Label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <MdLocalPhone className="absolute top-[6.5px] left-3 text-[1.5rem] text-[#777777]" />
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                required
                value={phoneNumber}
                onChange={handlePhoneChange}
                pattern="\8801[3-9][0-9]{8}"
                maxLength={13}
                placeholder="Phone Number"
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-5 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />
            </div>
          </div>
          {/* Email input */}
          <div>
            {/* Label */}
            <Label>Email</Label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <MdOutlineMail className="absolute top-[6.5px] left-3 text-[1.5rem] text-[#777777]" />
              <Input
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
            <Label>Password</Label>
            {/* Input with icon */}
            <div className="w-full mt-2 relative">
              <RiLockPasswordLine className="absolute top-[6.5px] left-3 text-[1.5rem] text-[#777777]" />
              <Input
                type={isEyeOpen ? "text" : "password"}
                id="password"
                name="password"
                value={strongPassword}
                placeholder="Password"
                onChange={handlePasswordChange}
                // onFocus={() => setIsDropdownOpen(true)}
                // onBlur={() => setIsDropdownOpen(false)}
                className="peer border-blue-200 border rounded-md outline-none pl-11 pr-12 py-3 w-full focus:ring ring-blue-200 transition-colors duration-300"
              />

              {isEyeOpen ? (
                <IoEyeOutline
                  className="absolute top-[6.5px] right-3 text-[1.5rem] text-[#777777] cursor-pointer"
                  onClick={() => setIsEyeOpen(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="absolute top-[6.5px] right-3 text-[1.5rem] text-[#777777] cursor-pointer"
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
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="-mt-3 cursor-pointer text-sm text-[#0E82FD] underline underline-offset-1 flex justify-end"
          >
            {!isDropdownOpen ? "View" : "Close"} Password Suggestions
          </button>
          {/* Error Message */}
          <IsError isError={isError} />
          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-sm py-[18px] border-none rounded-lg text-white text-lg mt-1 bg-[#0E82FD] hover:bg-[#0e72fd] duration-700 cursor-pointer disabled:text-gray-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* SocialLogin */}
        {/* <SocialLogin setIsError={setIsError} /> */}
        {/* Navigate to login */}
        <NavigateTo />
      </div>
    </div>
  );
};

export default Register;
